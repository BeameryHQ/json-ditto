'use strict';

const _ = require("lodash");

/**
 * @description A string is considered valid if is a string and is not empty
 * @param {String} str 
 */
const isValidString = (str) => {
    return _.isString(str) && !_.isEmpty(str);
};

/**
 * @function concatWithComma
 * @description Concatinate a string with one or more other strings and join
 * them using comma and space.
 * @returns {String}
 */
function concatWithComma() {
    const strings = _.filter(_.flatten(_.values(arguments)), isValidString);
    return _.join(strings, ', ').trim() || null;
}

module.exports = concatWithComma;