'use strict';

const _                = require('lodash');
const assert           = require('assert');

const dittoInterface = require('../../ditto/ditto');
const plugins          = require('../../ditto/plugins/index');


const isValidDate = (input) => !isNaN(Date.parse(input));

describe('parseDate plugin', function(){

    it('should return null for not date strings', function(){
        assert.equal(plugins.parseDate('notKnown'), null);
    });

    it('should return a valid date for ISO date strings', function(){
        assert.ok(isValidDate(plugins.parseDate('2017-01-30T11:04:04.277Z')));
    });

    it('should return a valid date for "full contact" date format', function(){

        const result = plugins.parseDate('2014-10');

        assert.ok(isValidDate(result));
        assert.equal(result.getMonth() + 1, 10);
        assert.equal(result.getFullYear(), 2014);

    });

    it('should parse the provided "month" argument', function(){

        const result = plugins.parseDate(2016, 6);

        assert.ok(isValidDate(result));
        assert.equal(result.getMonth() + 1, 6)
    });

    it('should parse the provided "day" argument', function(){

        const result = plugins.parseDate(2018, 10, 16);

        assert.ok(isValidDate(result));
        assert.equal(result.getMonth() + 1, 10);
        assert.equal(result.getFullYear(), 2018);
        assert.equal(result.getDate(), 16);
    });

    it('should default the month if not provided as an argument', function(){

        const result = plugins.parseDate(2016);

        assert.ok(isValidDate(result));
        assert.equal(result.getMonth() + 1, 1);
    });

    it('should not set null or undefined values when no item present', function(){

        const testMap = {
            "testDate": "@parseDate(data.testDate.year|data.testDate.month)"
        };
        const dummySample = {
            data: {
                testDate: {
                    year: 2016,
                    month: 7
                }
            }
        };

        return new dittoInterface().unify(dummySample, testMap).then((result) => {
            assert.equal(result.testDate.getFullYear(), 2016);
            assert.equal(result.testDate.getMonth()+1, 7);
        });
    });

});
