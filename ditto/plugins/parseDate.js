'use strict';

/**
 * @function parseDate
 * @description Accepts a string or a Date object as input,
 * check it's validity, and either return it as Date object, or returns null
 *
 * @param {String} date the date we wish to transform
 * @param {String} month the month if found to be added to the parsed date
 * @param {String} day the day if found to be added to the parsed date
 * @returns {Date}
 */

 function isValid(value) {
     return !!value;
 }

function parseDate(date, month, day) {

	if (!date || date ==='notKnown') return null;

    if (month) {
        date = [ date, month, day ].filter(isValid).join('-').concat(' GMT');
    }
    // Try to parse the date, and get the timestamp
    const timestamp = Date.parse(date);
    return !!isNaN(timestamp) ? null : new Date(timestamp)
}

module.exports = parseDate;
