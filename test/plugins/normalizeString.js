'use strict';

var _                  = require('lodash');
const assert           = require('assert');

const plugins          = require('../../ditto/plugins/index');

describe('normalizeString plugin', function(){

    it('should correctly clean a string and strip any un-needed characters', function(){
        assert.equal(plugins.normalizeString("...///T<<><>"), "t");
        assert.equal(plugins.normalizeString("...///      tEsT     <<><>"), "test");
        assert.equal(plugins.normalizeString(",,Test......"), "test.");
        assert.equal(plugins.normalizeString(".Test,,,,....."), "test.");
        assert.equal(plugins.normalizeString(" Test      "), "test");
    });

    it('should return null if no valid string is found', function(){
        assert.equal(plugins.normalizeString("...///<<><>"), null);
    });

    it('should return null if no valid string is passed as a parameter', function(){
        assert.equal(plugins.normalizeString(true), null);
        assert.equal(plugins.normalizeString({}), null);
        assert.equal(plugins.normalizeString(["test"]), null);
        assert.equal(plugins.normalizeString(undefined), null);
    });

});
