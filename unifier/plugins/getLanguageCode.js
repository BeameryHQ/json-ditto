'use strict';

const _ = require('lodash');

/**
 * @function getLanguageCode
 * @description Get the language code and normalize as the well the displayName of the language
 *
 * @param {String} source the language display name
 * @returns {String} the langauage ISO code
 */
function getLanguageCode(source) {

	if (!source || typeof(source) !== "string") return null;

     let languages = require('./data/languages.json')

        let languageCode = null;

        _.filter(languages, function(languageObject){
           _.each(_.words(languageObject.name), function(language){
               if (language.toLowerCase() == source.replace(/\s\s+/g,"").trim().toLowerCase()) {
                    languageCode = languageObject.code;
                    return;
               }
            });
        });
        return languageCode;
}

module.exports = getLanguageCode;
