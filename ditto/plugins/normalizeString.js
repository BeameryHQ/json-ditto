'use strict';

const _           = require('lodash');

const cleanString = require('./cleanString');

/**
 * @function normalizeString
 * @description normalizeString a string from special characters, HTML tags and trailing dots and commas and lower case it
 *
 * @param {String} source the string we want to clean out
 * @returns {String}
 */
function normalizeString(source) {

    if (_.isString(source) && !!source) {
    	return !!cleanString(source) ? cleanString(source).toLowerCase() : null;
    } else return null;
}

module.exports = normalizeString;
