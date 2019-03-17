'use strict';

const _ = require('lodash');

/**
 * @function concatName
 * @description Clean a string from special characters, HTML tags and trailing dots and commas
 *
 * @param {String} source the string we want to clean out
 * @returns {String}
 */
function cleanString(source) {

    if (_.isString(source) && !!source) {
        const cleanedString = source.toString().replace(/[`~$^*¦|+\=?;,:<>\{\}\[\]\\\/]/gi, '')
            .replace(/^(\.+)/g, "")
            .replace(/\.(?=\.+$)/g, "")
            .replace(/\s\s+/g, "")
            .trim();
        return !cleanedString.length ? null : cleanedString;
    } else return null;
}

module.exports = cleanString;
