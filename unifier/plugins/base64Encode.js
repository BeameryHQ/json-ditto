'use strict';

const _ = require('lodash');

/**
 * @function base64Encode
 * @description base64 encode a text string
 * @param {String} input
 * @returns {String}
 */
function base64Encode(input) {
    if (_.isString(input) && !!input) {
        return Buffer.from(input).toString('base64')
    } else return null;
}

module.exports = base64Encode;
