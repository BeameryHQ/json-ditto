'use strict';
const _ = require('lodash');
const axios = require('axios');

const API_ENDPOINT = 'https://standardization-api-dot-beamery-data.uc.r.appspot.com/api/role_title/standardisation/v1/standardise/';

/**
 * @function standardizedRoleTitle
 * @description standardize the role title by using the role title standardization api
 *
 * @param {String} source role title string
 * @returns {String}
 */
async function standardizedRoleTitle(roleTitle) {
    
    if (_.isString(roleTitle) && !!roleTitle) {
        try {
            const response = await axios.get(`${API_ENDPOINT}${roleTitle}`);
            return response.data;
          } catch (error) {
            return null
          }
    } else return null;
}
module.exports = standardizedRoleTitle;