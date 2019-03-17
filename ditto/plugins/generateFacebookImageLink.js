'use strict';

/**
 * @function generateFacebookImageLink
 * @description Generate a link for the Facebook profile photo based on the facebook ID
 *
 * @param {String} Facebook profile ID
 * @returns {String}
 */
function generateFacebookImageLink(id) {
	if (!!id && typeof(id) === "string") {
    	return "http://graph.facebook.com/" + id + "/picture?type=large"
	} else return null;
}

module.exports = generateFacebookImageLink;
