'use strict';

/**
 * @function createURL
 * @description Create a url from passed parameteres
 *
 * @param {String} url the main url base
 * @param {String} source the string to concatinate to the base url
 * @returns {String}
 */
function createURL(url, source) {
	if (!!url && typeof(url) == "string") {
		return !!source && typeof(source) == "string" ? (url + source).replace(/\s/g, "").toLowerCase().trim() : url.replace(/\s/g, "").toLowerCase().trim();
	} else return null;
}

module.exports = createURL;
