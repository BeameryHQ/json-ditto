'use strict';

const _ = require('lodash');

/**
 * @function uniqueArray
 * @description Ensure array elements are unique
 *
 * @param {Array}  target the target Array we will ensure its uniqueness
 * @returns {Array}
 */
function uniqueArray(target, key) {

  if (!target || !target.length) return [];

  return !!key ?  _.uniqBy(target, key) : _.uniq(target);
}

module.exports = uniqueArray;
