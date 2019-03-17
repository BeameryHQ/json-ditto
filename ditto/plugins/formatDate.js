'use strict';

const _ = require('lodash');
const moment = require('moment');

/**
 * @function formatDate
 * @description Format a date according to parameters
 * @param {Date} date
 * @param {String} [format] Format of the date.
 * @param {Boolean} [isUtc=true] If timezone should be utc or not
 * @returns {String}
 */
function formatDate(date, format, isUtc=true) {
    const convertedDate = moment(date);
    if (convertedDate.isValid() && date) {
        if (isUtc) return convertedDate.utc().format(format);
        return convertedDate.format(format);
    }
    return date;
}

module.exports = formatDate;
