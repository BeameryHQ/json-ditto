
const _  = require('lodash');

const Extractor = require('./extractor');

module.exports = class Transformer {

    constructor(plugins){
        this.plugins = plugins;
        this.extractor = new Extractor(plugins, this);
    }

    transform (document, path, output, $key) {

        const transformer = this;

        if (path.includes('??'))  {
            return transformer.extractor.extract(document, path, output);
        } else if (_.startsWith(path, '$'))  {
            return eval(path);
        } else if (_.startsWith(path, '@!')) {
            return eval(path.replace('@!', ''));
        } else if (_.startsWith(path, '@')) {

            const parameters = _.zipObject(['name', 'arguments'], path.split(/\((.*)\)/).filter(Boolean));
            const functionCall = parameters.name.replace('@', '');
            const paramteresValues = _.map(parameters.arguments.split('|'), param => {
                return transformer.transform(document, param.replace(',', '|'), output, $key)
            }).filter(Boolean);

            if (paramteresValues.length && transformer.plugins[functionCall]) {
                return transformer.plugins[functionCall](...paramteresValues);
            }

        }
        return transformer.extractor.extract(document, path, output);
    }
}