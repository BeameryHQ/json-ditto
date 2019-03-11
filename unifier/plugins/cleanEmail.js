'use strict';

const _ = require('lodash');

/**
 * @function cleanEmail
 * @description normalize an email by converting it into an all lowercase
 * This will be extended in te future by doing more robust email validation
 *
 * @param {String} source the string we want to clean out
 * @returns {String}
 */
function cleanEmail(source) {
    if (_.isString(source) && !!source) {
        let cleanedEmail = source.toLowerCase()
        .replace(/\s\s+/g, "")
        .trim();
        return !cleanedEmail.length ? null : cleanedEmail;
    } else return null;
}

module.exports = cleanEmail;
