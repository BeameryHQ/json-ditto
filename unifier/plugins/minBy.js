'use strict';

const _ = require('lodash');

/**
 * Return the min value (numerical or by character code) in array.
 * If only array is passed it is assumed that array is of numbers or strings.
 * If path is passed it is assumed that array is of objects, and value that
 * path resolves to is used.
 *
 * @example [1,2] => 1
 *
 * @param {Array} array - Description.
 * @param {string=} path - Path to prop in object.
 * @returns {any} Min value or undefined.
 */
function minBy(array, path = undefined) {
  if (!_.isArray(array)) {
    return undefined;
  }

  return _.minBy(array, path);
}

module.exports = minBy;
