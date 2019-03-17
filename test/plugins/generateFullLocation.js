'use strict';

const assert           = require('assert');
const _                = require('lodash');
const debug            = require('debug')('tests:generateFullLocation')
const dittoInterface = require('../../ditto/ditto');
const plugins          = require('../../ditto/plugins/index');

describe('generateFullLocation', function(){
    const testMappings = {
      "location":  "@generateFullLocation(data.location)"

    };

    /**
     * Helper function to ensure that in every case we set 'null' values on the values we can't provide,
     * to be sure to keep the location object coherent, in case this was going to update data set from the autocomplete,
     * which also provides the below keys
     */
    const assertNullValues = ( location, propertyToBeNull ) => propertyToBeNull.forEach( prop => {
        assert.ok(location[prop] === null, `${prop} is not "null"`)
    });

	it('should generate a valid address object with only country', function() {
        const testData = {
            data: {
                location:{
                  country: 'Spain'
                }
            }
        };
        return new dittoInterface().unify(testData, testMappings).then((result) => {
            debug({result});
            assert.equal(result.location.address, `${testData.data.location.country}`);
            assertNullValues(result.location, [ 'geometry', 'postalCode' ]);
        });
    });

	it('should generate a valid address object with city and country', function() {

      const testData = {
            data: {
                location:{
                  city: 'Barcelone',
                  country: 'Spain'
                }
            }
        };
        return new dittoInterface().unify(testData, testMappings).then((result) => {
            debug(result);
            assert.equal(result.location.address, `${testData.data.location.city}, ${testData.data.location.country}`);
            assertNullValues(result.location, [ 'geometry', 'postalCode' ]);

        });
    });

    it('should extract a valid country code', function() {

      const testData = {
            data: {
                location:{
                  city: 'Barcelone',
                  country: 'Spain'
                }
            }
        };
        return new dittoInterface().unify(testData, testMappings).then((result) => {
            debug(result);
            assert.equal(result.location.address, `${testData.data.location.city}, ${testData.data.location.country}`);
            assert.equal(result.location.countryCode, 'es');

        });
    });

	it('should generate a blank address object with only city', function() {
        const testData = {
            data: {
                location:{
                  city: 'Barcelone'
                }
            }
        };
        return new dittoInterface().unify(testData, testMappings).then((result) => {
            debug(result);
            assert.equal(Object.keys(result).length, 0);
        });
    });
});
