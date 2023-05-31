const _  = require('lodash');
const hoover = require('./lib/hoover');

/**
 * @function postMap
 *
 * @description Start the post-mapping process which will run after the main mapping is done
 * @param {Object} document the object document we want to map
 * @param {Object} result the object representing the result file
 */
async function postMap(result) {
    function isEmptyObject(value, key) {
        return _.isPlainObject(value) && _.isEmpty(value) ? true : false;
    }

    // Make sure we remove Ditto built in keys
    hoover(result, ['$$key']);
    return _(result).omitBy(_.isNil).omitBy(isEmptyObject).value();
}

module.exports = postMap;