'use strict';

const generateId          = require('./generateId');
const getLanguageFromCode = require('./getLanguageFromCode');

/**
 * @function generateIdFromLanguageCode
 * @description Lanaugage id generation is done on the value of the language. This function will generate the id from a language ISO code
 * by doing a lookup first on the language valuye then generate the id from that one
 *
 * @param {String} languageCode The language code
 * @return {String}
 */

function generateIdFromLanguageCode(languageCode) {

	if (!languageCode || typeof(languageCode) !== "string") return null;

    return generateId(getLanguageFromCode(languageCode));
}

module.exports = generateIdFromLanguageCode;
