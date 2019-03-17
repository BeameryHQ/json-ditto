'use strict';

const assert           = require('assert');
const _                = require('lodash');
const debug            = require('debug')('tests:generateFullExperience')
const dittoInterface = require('../../ditto/ditto');
const plugins          = require('../../ditto/plugins/index');

describe('generateFullExperience', function(){
    const testMappings = {
      "experience":  "@generateFullExperience(data.experience)"

    };


	it('should reset the "organisationId" if "organisationName" is present in the input', function() {
        const testData = {
            data: {
                experience:{
                  organisationName: 'Microsoft'
                }
            }
        };
        return new dittoInterface().unify(testData, testMappings).then((result) => {
            debug({result});
            assert.equal(result.organisationId, null);
        });
    });


	it('should NOT reset the "organisationId" if "organisationName" is NOT present in the input', function() {
        const testData = {
            data: {
                experience:{
                  role: 'CEO'
                }
            }
        };
        return new dittoInterface().unify(testData, testMappings).then((result) => {
            debug({result});
            assert.equal(result.organisationName, void 0);
            assert.equal(result.organisationId, void 0);
        });
    });


});
