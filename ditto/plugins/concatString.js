'use strict';

const _ = require("lodash");

/**
 * @function concatString
 * @description Concatinate a string with one or more other strings
 * @returns {String}
 */
function concatString() {

	let string = _.remove(_.flatten(_.values(arguments)), _.isString);
	return !!string && !!string.length ? string.join('').trim() : null;
}

module.exports = concatString;
