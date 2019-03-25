const _  = require('lodash');
const assert = require('assert');

/**
 * @function map
 *
 * @description Start the unification process based on the manual mapping files
 * @param {Object} document the database document to be unified
 * @param {Function} callback the callback function to be executed after the unification is done
 */
async function map(document, mappings, plugins) {

    function processMappings(document, mappings, output, isIterable = false) {
        if (!mappings) return document;
        else if (isIterable) {
            return document.map(function(_document) {
                return processMappings(_document, mappings);
            });
        } else if (typeof mappings === 'string') {
            return applyTransformation(document, mappings, output);
        } else if (mappings.hasOwnProperty('output')) {
            let innerDocument = _.get(document, mappings.innerDocument.replace(/.\*/, ''), null);
            if (mappings.innerDocument.endsWith('*')) {
                innerDocument = _.values(innerDocument);
            }
            let _output = processMappings(innerDocument, mappings.mappings, output, true);
            if (mappings.hasOwnProperty('required')) {
                mappings.required.forEach(_required => {
                    _output = _output.filter(_result => {
                        return !!_result[_required];
                    });
                });
            }
            if (_.isPlainObject(mappings.output)) {
                let keys = [];
                _output.forEach(element => { keys.push(element.$key) && delete element['$$key'] });
                _output = _.zipObject(keys, _output);
            }
            return _output;
        } else {
            const output = {};
            _.each(mappings, (value, key) => {
                if (mappings.hasOwnProperty(key)) {
                    let _output = processMappings(document, value, output);
                    output[key] = _output;
                }
            })
            return output;
        }

        function applyTransformation(document, path, output) {
            console.log("applyTransformation =====>");
            console.log("document",document);
            console.log("path",path);
            if (path.includes('??'))  {
                return getValue(document, path, output);
            } else if (_.startsWith(path, '$'))  {
                return eval(path);
            } else if (_.startsWith(path, '@!')) {
                return eval(path.replace('@!', ''));
            } else if (_.startsWith(path, '@')) {

                let paramteresValues = [];

                let functionParameteres  = path.match(/.+?\((.*)\)/);
                let functionCall         = path.split('(')[0].replace('@', '');

                if (!!functionParameteres) {

                    const paramteresArray = _.compact(functionParameteres[1].split('|'));
                    const _defaultValue = applyTransformation(document, _.last(paramteresArray).replace('*', '').replace(',', '|'), output);

                    if ( _.last(paramteresArray).includes('*') && !!_defaultValue) {
                        return _defaultValue;
                    } else {
                        paramteresValues = _.map(paramteresArray, function(param){ return applyTransformation(document, param.replace(',', '|'), output) });
                    }
                }

                if (!!_.compact(paramteresValues).length && plugins[functionCall]) {
                    return plugins[functionCall](...paramteresValues);
                }

            } else return getValue(document, path, output);
        }

        function getValue(document, path, output) {
            if (!path) return;

            if (path === '!') return document;

            if (_.startsWith(path, '$')) {
                return eval(path);
            } else if (_.startsWith(path, '>>')) {
                return _.startsWith(path, '>>%') ? eval(path.replace('>>%', '')) : path.replace('>>', '');
            } else if (_.startsWith(path, '!')) {
                return _.get(output, path.replace('!', ''));
            } else if (/\|\|/.test(path) && !path.includes('??') ) {
                let pathWithDefault = path.split(/\|\|/);
                return getValue(document, pathWithDefault[0]) || getValue(`${pathWithDefault[1]}`);
            } else if (path.includes('??') ){
                let parameters = _.zipObject(['source', 'targetValue', 'comparator', 'comparison', 'condition'],
                    path.match(/(.+?)\?\?(.+?)\#(.*)\#(.+)/));

                const firstValue = applyTransformation(document, parameters.comparator, output);
                const secondValue = applyTransformation(document, parameters.condition, output);

                const isValidValue = operation(parameters.comparison, firstValue, secondValue);
                console.log("parameters", parameters);
                console.log("firstValue", firstValue);
                console.log("secondValue", secondValue);
                console.log("isValidValue", isValidValue);
                console.log("document", document);
                return isValidValue ? applyTransformation(document, parameters.targetValue, output) : null;
            } else {
                return _.get(document, path);
            }

            /**
             * Runs a comparison ( === , ==, !==, != ) against the given values
             * @param {string} op
             * @param {*} value1
             * @param {*} value2
             */
            function operation(op, value1, value2) {
                switch(op){
                    case '===':
                        return value1 === value2;
                    case '==':
                        return value1 == value2;
                    case '!==':
                        return value1 !== value2;
                    case '!=':
                        return value1 != value2;
                }
                return false;
            }
        }
    }
    return processMappings(document, mappings);
}

 module.exports = map;