'use strict';

const URL      = require('url');
const urlUtils = require('beam-uri');

const BANNED_URLS = [
  "linkedin.com/profile/view",
  "linkedin.com/profile"
]
/**
 * @function cleanURI
 * @description Clean a URI from special characters, HTML tags and trailing dots and commas
 *
 * @param {String} source the URI we want to clean out
 * @returns {String}
 */
function cleanURI(source, service) {

	if (!!source && typeof(source) === "string") {

    // Replace all spaces with nothing, and truncate to 400 chars,
    // or URL.parse will blow out and loop on 100% cpu :(
    source = source.replace(/\s/g, '').trim().substr(0,400);

    // We should not process messaging links (e.g., Skype) , as they don't need http
    if(service === 'messaging') return source;

    try {
		// Check if the source is a twitter username
		if (/(^|[^@\w])@(\w{1,15})\b/g.test(source)) source = `http://twitter.com/${source.replace('@', '')}`
		// Check if the url passed does not contain http://
		if (URL.parse(source).protocol === null) source = "http://" + source;
		// Check if its a Linkedin URI and get the canonical URI
		if (!!urlUtils.getDomain(source) && urlUtils.getDomainName(source).toLowerCase() == "linkedin") {
      source = urlUtils.getCanonicalLinkedinUrl(source);
      // Handle edge case where linkedin profile url is malformed
      if (BANNED_URLS.includes(source.replace(/^(https?|ftp):\/\/(www.)?/, ""))){
        source = null;
      }
		}
    } finally {
        // Check if the URI is not validated and remove it !
        if (urlUtils.isValidURI(source)) {
          try {
            return decodeURI(source);
          } catch(err) { return null; }
        } else return null;
    }
	} else return null;

}

module.exports = cleanURI;
