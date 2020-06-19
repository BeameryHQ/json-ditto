const _  = require('lodash');

const Transformer = require('./lib/transformer');

/**
 * @function map
 *
 * @description Start the unification process based on the manual mapping files
 * @param {Object} document the database document to be unified
 * @param {Function} callback the callback function to be executed after the unification is done
 */
async function map(document, mappings, plugins) {

    const transformer = new Transformer(plugins);
    async function processMappings(document, mappings, output, options = {isIterable: false}) {
        
        if (!mappings) return document;

        else if (options.isIterable) {
            return await Promise.all(Object.keys(document).map(async(key, index) => {
                return await processMappings(document[key], mappings, output, {isIterable: false, key});
            }));
        } else if (typeof mappings === 'string') {
            let _result = await transformer.transform(document, mappings, output, _.get(options, 'key'));
            return _result;
        } else if (mappings.hasOwnProperty('output')) {
            let _output, _innerDocument = '!', options = {};
            if (mappings.hasOwnProperty('innerDocument')) {
                options['isIterable'] = true;
                _innerDocument = mappings.innerDocument;
            }
            const _transformedInnerDocument = await transformer.transform(document, _innerDocument, output);
            _output = await processMappings(_transformedInnerDocument, mappings.mappings, output, options);
            if (mappings.hasOwnProperty('required')) {
                _output = _.last(_.map(mappings.required, _required => { return _.filter(_.flatten([_output]), _required) }));
            }
            if (_.isPlainObject(mappings.output)) {
                const __output = _.flattenDeep([_output]);
                _output = _.zipObject(_.map(__output, $ => { return $.$$key}), __output);
            } else if (mappings.hasOwnProperty('$push')) {
                _output = _.compact(_output.map($ => {return $.$value}));
            }
            return _output;

        } else {
            const output = {};
            const reducer = (input, func) => {
                return _.reduce(input,(accumulator, currentValue) => func(accumulator,currentValue))
            }

            for (const path of Object.keys(mappings)) {
                if (mappings.hasOwnProperty(path)) {
                    const mapping = mappings[path];
                    if (mapping.hasOwnProperty('key')) {
                        mapping.mappings['$$key'] = mapping.key;
                    }
                    let _output = await processMappings(document, mapping, output, options);
                    if (Array.isArray(mapping)) {
                        _output = Array.isArray(mapping[0].output) ? reducer(_output, _.concat) : reducer(_output, _.merge);
                    }
                    if (mapping.hasOwnProperty('requirements')) {
                        for (const requirement of Object.keys(mapping.requirements)) {
                            _output = await transformer.transform(_output, mapping.requirements[requirement]);
                        }
                    }
                    if (!_.isNil(_output)) output[path] = _output;
                }
            }

            return output;
        }
    }

    return await processMappings(document, mappings);
}

 module.exports = map;