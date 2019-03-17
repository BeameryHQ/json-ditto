'use strict';

var _                  = require('lodash');
const assert           = require('assert');

const plugins          = require('../../ditto/plugins/index');

describe('CleanString plugin', function(){

    it('should correctly clean a string and strip any un-needed characters', function(){
        assert.equal(plugins.cleanString("...///T<<><>"), "T");
        assert.equal(plugins.cleanString("...///      tEsT     <<><>"), "tEsT");
        assert.equal(plugins.cleanString(",,Test......"), "Test.");
        assert.equal(plugins.cleanString(".Test,,,,....."), "Test.");
        assert.equal(plugins.cleanString(" Test      "), "Test");
    });

    it('should return null if no valid string is found', function(){
        assert.equal(plugins.cleanString("...///<<><>"), null);
    });

    it('should return null if no valid string is passed as a parameter', function(){
        assert.equal(plugins.cleanString(true), null);
        assert.equal(plugins.cleanString({}), null);
        assert.equal(plugins.cleanString(["test"]), null);
        assert.equal(plugins.cleanString(undefined), null);
    });

});
