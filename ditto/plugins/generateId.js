'use strict';

const _      = require('lodash');
const crypto = require('crypto');

/**
 * @function generateId
 * @description Create an md5 hash based on concatentating passed String Values
 * This function will take multiple arguments that will be extracted via the `arguments` keyword
 *
 * @returns {String}
 */
function generateId() {

	const idFields = _.remove(_.flatten(_.values(arguments)), _.isString);

	// TODO: re-add the regex .replace(/\s\s+/g,' ') to the chain to make sure we have a properly cleaned string
	return  !!idFields && !!idFields.length ?  crypto.createHash('md5').update(idFields.join(' ').toLowerCase().trim()).digest("hex") : null;
}

module.exports = generateId;
