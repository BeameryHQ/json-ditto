'use strict';

const _ = require('lodash');

/**
 * Simple wrapper for lodash `get`.
 *
 * @example {a: {b: 1}} => ['a', 'b'] => 1
 *
 * @param {Object} object The object to query.
 * @param {Array|String} path Path of the property to get.
 * @returns {any} The value returned or undefined.
 */

function getValueAtPath(object, path) {
  return _.get(object, path);
}

module.exports = getValueAtPath;
