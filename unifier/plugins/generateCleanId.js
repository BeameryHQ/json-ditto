'use strict';

const crypto = require('crypto');
const _      = require('lodash');

/**
 * @function generateCleanId
 * @description Create an md5 hash based on concatentating passed String Values
 * Since we might be passing one or more (n) strings, we will use `arguments`
 *
 * @returns {String} result the concatenated cleaned string
 */
function generateCleanId() {

	let idFields = _.remove(_.flatten(_.values(arguments)), _.isString);

	if (!!idFields && !!idFields.length) {
		let cleanedSourceString =    idFields.join(' ')
									 .toString().replace(/[`~$^*¦_|+\=?;:'"<>\{\}\[\]\\\/]/gi, '')
					                 .replace(/[\n\t\r]/g,"")
					                 .replace(/^[,.\s]+|[,.\s]+$/g, "")
					                 .replace(/\s\s+/g,' ')
					                 .toLowerCase().trim();
	    return crypto.createHash('md5').update(cleanedSourceString).digest("hex")
	} else return null;
}

module.exports = generateCleanId;
