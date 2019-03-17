'use strict';

/**
 * @function parseString
 * @description Convert a value into a string by concatenating it with an empty space
 * Known issue is that we will lose double precision when converting to string (check the tests)
 *
 * @param {String} source the string we wish to transform
 * @returns {String}
 */
function parseString(source) {

    return (typeof(source) === "boolean" || !!source) ? "" + source : null;

}

module.exports = parseString;
