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
    /**
     * Remove all specified keys from an object, no matter how deep they are.
     * The removal is done in place, so run it on a copy if you don't want to modify the original object.
     * This function has no limit so circular objects will probably crash the browser
     *
     * @param obj The object from where you want to remove the keys
     * @param keys An array of property names (strings) to remove
     */

    // Make sure we remove Ditto built in keys
    hoover(result, ['$$key']);
    return _(result).omitBy([_.isNil, isEmptyObject]).value();
}

module.exports = postMap;