'use strict';

const crypto   = require('crypto');

const cleanUri = require('./cleanURI')
/**
 * @function generateIdForLinks
 * @description Create an md5 hash based on concatentating passed String Values for links
 * The function cleans the URIs before creating the MD5 hash
 *
 * @param {String} source the URI we want to clean out
 * @returns {String}
 */
function generateIdForLinks(source, type) {

  let cleanedSource;

	try {
		cleanedSource = cleanUri(source, type);
	} finally {
		// Check if the URI is not validated and remove it !
		if (!!cleanedSource) {
			return crypto.createHash('md5').update(cleanedSource.toLowerCase()).digest("hex");
		} else {
			return null;
		}
	}

}

module.exports = generateIdForLinks;
