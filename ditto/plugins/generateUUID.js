'use strict';

const uuid  = require('uuid');

/**
 * @function generateUUID
 * @description Create an random UUID value
 * @returns {String}
 */
function generateUUID() {
    return uuid.v4();
}

module.exports = generateUUID;
