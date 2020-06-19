
const _  = require('lodash');
const comparator = require('./comparator');

module.exports = class Extractor {

    constructor(plugins, transformer){
        this.plugins = plugins;
        this.transformer = transformer;
    }

    async extract (document, path, output) {

        const extractor = this;

        if (_.isNil(path)) return;

        if (path === '!') return document;

        if (_.startsWith(path, '>>')) {
            return _.startsWith(path, '>>%') ? eval(path.replace('>>%', '')) : path.replace('>>', '');
        } else if (_.startsWith(path, '!')) {
            return _.get(output, path.replace('!', ''));
        } else if (/\|\|/.test(path) && !path.includes('??') ) {
            let pathWithDefault = path.split(/\|\|/);
            let _extractedValue = await extractor.extract(document, pathWithDefault[0], output);
            let _defaultValue = await extractor.extract(document, `${pathWithDefault[1]}`, output);

            if (!!_extractedValue) {
                return _extractedValue 
            } else return await extractor.extract(document, `${pathWithDefault[1]}`, output);
        } else if (path.includes('??') ){

            const parameters = _.zipObject(['source', 'targetValue', 'comparator', 'comparison', 'condition'], path.match(/(.+?)\?\?(.+?)\#(.*)\#(.+)/));
            const _comparator = await extractor.transformer.transform(document, parameters.comparator, output);
            const _condition = await extractor.transformer.transform(document, parameters.condition, output);
            
            return comparator(parameters.comparison, _comparator, _condition) ? await extractor.transformer.transform(document, parameters.targetValue, output) : null;

        } else return _.get(document, path);
    }

}