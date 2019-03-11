'use strict';

const _ = require("lodash");

/**
 * @function concatString
 * @description Concatinate a string with one or more other strings
 * @returns {String}
 */
function concatString() {

	let name = _.remove(_.flatten(_.values(arguments)), _.isString);
	return  !!name && !!name.length ? name.join('').trim() : null;
}

module.exports = concatString;
