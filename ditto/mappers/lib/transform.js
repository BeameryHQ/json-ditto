
const _  = require('lodash');

module.exports = class Transformer {

    constructor(plugins){
        this.plugins = plugins;
    }

    transform (document, path, output, $key) {

        const transformer = this;

        if (path.includes('??'))  {
            return transformer.extract(document, path, output);
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
                const _defaultValue = transformer.transform(document, _.last(paramteresArray).replace('*', '').replace(',', '|'), output, $key);

                if ( _.last(paramteresArray).includes('*') && !!_defaultValue) {
                    return _defaultValue;
                } else {
                    paramteresValues = _.map(paramteresArray, function(param){ return transformer.transform(document, param.replace(',', '|'), output, $key) });
                }
            }

            if (!!_.compact(paramteresValues).length && transformer.plugins[functionCall]) {
                return transformer.plugins[functionCall](...paramteresValues);
            }

        } else return transformer.extract(document, path, output);
    }

    extract (document, path, output) {

        const transformer = this;

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
            return transformer.extract(document, pathWithDefault[0]) || transformer.extract(document, `${pathWithDefault[1]}`);
        } else if (path.includes('??') ){
            let parameters = _.zipObject(['source', 'targetValue', 'comparator', 'comparison', 'condition'],
                path.match(/(.+?)\?\?(.+?)\#(.*)\#(.+)/));

            const firstValue = transformer.transform(document, parameters.comparator, output);
            const secondValue = transformer.transform(document, parameters.condition, output);

            const isValidValue = operation(parameters.comparison, firstValue, secondValue);

            return isValidValue ? transformer.transform(document, parameters.targetValue, output) : null;

        } else return _.get(document, path);

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