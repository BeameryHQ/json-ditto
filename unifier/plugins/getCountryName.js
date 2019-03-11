'use strict';

const _ = require('lodash');

/**
 * @function getCountryName
 * @description Get the country name given the country ISO3 code provided
 *
 * @param {String} countryCode The ISO3 Country Code
 * @returns {String} The country name
 */
function getCountryName(countryCode) {

    if (!countryCode) return null;

    const countries = require('./data/countriesKB')

    return _.get(_.filter(countries, _country => {
        return (_.has(_country, 'alpha3Code') && _country.alpha3Code.toLowerCase() === countryCode.toLowerCase())
    })[0], 'name', null);

}

module.exports = getCountryName;
