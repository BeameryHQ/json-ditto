'use strict';

const Joi     = require('joi');
const URL     = require('url');
const urlUtils = require('beam-uri');

/**
 * @function getLinkService
 * @description Identify if the service provider of the link
 *
 * @param {String}  source  the link URI we wish to examine
 * @param {String}  service the link service name
 * @returns {String}
 */

function getLinkService(source, service) {

    if (!source || typeof(source) !== "string" || !Joi.validate(source, Joi.string().email({errorLevel: true})).error ) return null;
    if (!!service) return service.replace(/\s\s+/g, "").trim().toLowerCase();

    // Check if the source is a twitter username
    if (URL.parse(source).protocol === null && /(^|[^@\w])@(\w{1,15})\b/g.test(source)) source = `http://twitter.com/${source.replace('@', '')}`
        // Check if the url passed does not contain http://
    if (URL.parse(source).protocol === null) source = "http://" + source;
    return urlUtils.getDomainName(source.replace(/\s\s+/g, "").trim().toLowerCase());
}

module.exports = getLinkService;
