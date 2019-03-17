'use strict';

const _ = require('lodash');

const languages = require('./data/languages.json')

/**
 * @function getLanguageFromCode
 * @description Get the language displayName from Code
 *
 * @param {String} source the langauage code
 * @returns {String}
 */
function getLanguageFromCode(source) {

	if (!source || typeof(source) !== "string") return null;

    const language = languages.find($ => $.code === source.replace(/\s\s+/g,"").trim().toLowerCase()) || { code:'', name: null, nativeName: '' };
    return language.name;
}

module.exports = getLanguageFromCode;
