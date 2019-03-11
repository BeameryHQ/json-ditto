'use strict';

const _ = require("lodash");

/**
 * @function concatName
 * @description Concatinate a string with one or more other strings separated by a space
 * Since we might be passing one or more (n) strings, we will use `arguments`
 * @returns {String}
 */
function concatName() {

	let name = _.remove(_.flatten(_.values(arguments)), _.isString);
	return  !!name && !!name.length ? name.join(' ').replace(/\s\s+/g,' ').trim() : null;
}

module.exports = concatName;
