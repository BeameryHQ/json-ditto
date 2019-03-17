'use strict';

const human = require('humanparser');

/**
 * @function extractName
 * @description Extract the first name of a contact as it is a required field
 *
 * @param {String} fullName the contact fullname
 * @param {String} position the position of the name to extract (firstName, lastName, middleName)
 * @returns {String/Array} Returns the extracted firstName or lastName as Strings or the middleName(s) as an array
 */

function extractName(fullName, position) {

	const ALLOWED_POSITIONS = ["firstName", "middleName", "lastName"];

	if (!!fullName && typeof(fullName) === "string"
		&& !!position && ALLOWED_POSITIONS.indexOf(position) > -1) {

		const name = human.parseName(fullName);

		switch(position) {
			case "firstName": return name.firstName;
			case "lastName": return name.lastName;
			case "middleName": return name.middleName ? name.middleName.split(' ') : [] ;
		}
	} else return null;
}

module.exports = extractName;
