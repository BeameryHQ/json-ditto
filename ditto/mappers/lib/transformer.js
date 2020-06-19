
const _  = require('lodash');

const Extractor = require('./extractor');

module.exports = class Transformer {

    constructor(plugins){
        this.plugins = plugins;
        this.extractor = new Extractor(plugins, this);
    }

    async transform (document, path, output, $key) {

        const transformer = this;

        if (path.includes('??'))  {
            return await transformer.extractor.extract(document, path, output);
        } else if (_.startsWith(path, '$'))  {
            return isNaN(parseInt(eval(path))) ? eval(path) : parseInt(eval(path));
        } else if (_.startsWith(path, '@!')) {
            return eval(path.replace('@!', ''));
        } else if (_.startsWith(path, '@')) {

            const parameters = _.zipObject(['name', 'arguments'], path.split(/\((.*)\)/).filter(Boolean));
            const functionCall = parameters.name.replace('@', '');

            const paramteresValues = await Promise.all(
                parameters.arguments.split('|').map(async param => {
                    return await transformer.transform(document, param.replace(',', '|'), output, $key);
                })
            );

            if (paramteresValues.length && transformer.plugins[functionCall]) {
                return await transformer.plugins[functionCall](...paramteresValues);
            }

        }
        return await transformer.extractor.extract(document, path, output);
    }
}