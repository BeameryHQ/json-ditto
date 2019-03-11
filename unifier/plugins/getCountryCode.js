'use strict';

const _ = require('lodash');

/**
 * @function getCountryCode
 * @description Get the language code and normalize as the well the displayName of the language
 *
 * @param {String} countryCode the ISO2 country code
 * @param {String} country the country name <optional>
 * @returns {String} the ISO3 country code
 */
function getCountryCode(countryCode, country) {

    if (!countryCode && !country) return null;

    let countries = require('./data/countriesKB')

    // Check if we don't have the ISO2 country code but have a country
    if (!countryCode) {
        return _.get(_.filter(countries, _country => {
            return _country.name.toLowerCase() === country.toLowerCase()
        })[0], 'alpha3Code', null);
    }

    return _.get(_.filter(countries, _country => {
        return _country.alpha2Code.toLowerCase() === countryCode.toLowerCase()
    })[0], 'alpha3Code', null);

}

module.exports = getCountryCode;
