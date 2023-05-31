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
    function processMappings(document, mappings, output, options = {isIterable: false}) {

        if (!mappings) return document;

        else if (options.isIterable) {
            return _.map(document, (_document, key) => {
                return processMappings(_document, mappings, output, {isIterable: false, key});
            });
        } else if (typeof mappings === 'string') {
            return transformer.transform(document, mappings, output, _.get(options, 'key'));
        } else if (mappings.hasOwnProperty('output')) {
            let _output, _innerDocument = '!', options = {};
            if (mappings.hasOwnProperty('innerDocument')) {
                options['isIterable'] = true;
                _innerDocument = mappings.innerDocument;
            }
            _output = processMappings(transformer.transform(document, _innerDocument, output), mappings.mappings, output, options);
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
            const reducer = (input, fn) => {
                return _.reduce(input,(accumulator, currentValue) => fn(accumulator,currentValue))
            }
            _.each(mappings, (mapping, path) => {
                if (mappings.hasOwnProperty(path)) {
                    if (mapping.hasOwnProperty('key')) {
                        mapping.mappings['$$key'] = mapping.key;
                    }
                    let _output = processMappings(document, mapping, output, options);
                    if (Array.isArray(mapping)) {
                        _output = Array.isArray(mapping[0].output) ? reducer(_output, _.concat) : reducer(_output, _.merge);
                    }
                    if (mapping.hasOwnProperty('requirements')) {
                        _.each(mapping.requirements, requirement => {
                            _output = transformer.transform(_output, requirement);
                        });
                    }

                    if (!_.isNil(_output)) output[path] = _output;
                }
            });

            return output;
        }
    }

    return processMappings(document, mappings);
}

 module.exports = map;