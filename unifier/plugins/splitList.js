'use strict';

const _ = require('lodash');

/**
 * @function splitList
 * @description Split a list of items into an array
 *
 * @param {String|null} input string to split
 * @returns {String|null}
 */
function splitList(input) {
    if (typeof input === 'string') {
        return input.split(/\s*(?:,|\sand\s)\s*/gi);
    } else {
        return null;
    }
}

module.exports = splitList;
