'use strict';

var _                  = require('lodash');
const assert           = require('assert');

const plugins          = require('../../ditto/plugins/index');

describe('concatName plugin', function(){

    it('should concatinate two or more strings', function(){
        assert.equal(plugins.concatName("String 1", "String 2"), "String 1 String 2");
        assert.equal(plugins.concatName("String 1", " ", "String 2"), "String 1 String 2");
        assert.equal(plugins.concatName(["test"]), "test");
        assert.equal(plugins.concatName("test"), "test");
        assert.equal(plugins.concatName("test", {}, undefined), "test");
        assert.equal(plugins.concatName({}, undefined, "test"), "test");
    });

    it('should conserve inner spaces in the strings but trim extra spaces on the begining and end', function(){
        assert.equal(plugins.concatName("String   1", "String 2"), "String 1 String 2");
        assert.equal(plugins.concatName("  String 1", "String 2  "), "String 1 String 2");
        assert.equal(plugins.concatName("String   1", "String   2"), "String 1 String 2");
        assert.equal(plugins.concatName("   String 1   ", "   String 2   "), "String 1 String 2");
        assert.equal(plugins.concatName("String   1", " ", "  String   2"), "String 1 String 2");
    });

    it('should accept an array as one the arguments passed', function(){
        assert.equal(plugins.concatName("String 1", ["middle string 1", "middle string2"], "String 2"), "String 1 middle string 1 middle string2 String 2");
        assert.equal(plugins.concatName("String 1", [" middle string 1", " middle string 2 "], "String 2"), "String 1 middle string 1 middle string 2 String 2");
        assert.equal(plugins.concatName("String 1", " ", ["middle string 1", " ", "middle string2"], " ", ["String 2"]), "String 1 middle string 1 middle string2 String 2");
        assert.equal(plugins.concatName("String 1", " ", ["middle string 1", "middle string 2"], "String 2"), "String 1 middle string 1 middle string 2 String 2");
    });

    it('should return null if no valid arguments are passed as a parameter', function(){
        assert.equal(plugins.concatName(true), null);
        assert.equal(plugins.concatName({}, {}, undefined), null);
        assert.equal(plugins.concatName(undefined), null);
        assert.equal(plugins.concatName(undefined, undefined), null);
    });
});
