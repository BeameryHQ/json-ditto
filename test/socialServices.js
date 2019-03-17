'use strict';

const _                = require('lodash');
const assert           = require('assert');

const ditto          = require('../ditto/ditto');

const propToExclude    = ['createdAt', 'updatedAt'];

/**
 * Assert a contact match, removing Date field that can't be asserted with exact match
 * @param result
 * @param fileImportJsonResult
 */
function assertContact(result, fileImportJsonResult) {
    assert.deepStrictEqual(_.omit(result, propToExclude), _.omit(fileImportJsonResult, propToExclude));
}

describe('External Services Unification', function(){

    const socialServices = ["facebook", "facebook_raw", "github", "github_raw", "google", "linkedin", "linkedin_raw"];

    _.each(socialServices, function(service){

        let contactJSONSample  = require(`./samples/services/${service}`);
        let contactJSONResult  = require(`./results/services/${service}`);
        let contactJSONMapping = require(`./mappings/services/${service}`);

        it(`should unify correctly ${service} JSON response`, function(){
            return new ditto().unify(contactJSONSample, contactJSONMapping).then((result) => {
                assertContact(_.omit(result, "id"), _.omit(contactJSONResult, "id"));
            });
        });
    });
});