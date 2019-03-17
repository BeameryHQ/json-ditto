'use strict';

var _                  = require('lodash');
const assert           = require('assert');

const dittoInterface = require('../../ditto/ditto');
const plugins          = require('../../ditto/plugins/index');

describe('getLinkType plugin', function(){

    it('should return a correct link type from a link URI', function(){
        assert.equal(plugins.getLinkType("http://facebook.com/ahmad.a.assaf"), "social");
        assert.equal(plugins.getLinkType("https://linkedin.com/in/ahmadassaf"), "social");
        assert.equal(plugins.getLinkType("https://wwww.linkedin.com/in/ahmadassaf"), "social");
        assert.equal(plugins.getLinkType("https://twitter.com/ahmadaassaf"), "social");
        assert.equal(plugins.getLinkType("https://google.com/ahmadaassaf"), "website");
        assert.equal(plugins.getLinkType("https://ahmadassaf.com/"), "website");
    });

    it('should return a correct link type from a twitter handle', function(){
        assert.equal(plugins.getLinkType("@ahmadaassaf"), "social");
        assert.equal(plugins.getLinkType("    @ahmadaassaf   "), "social");
    });

    it('should return a correct link type of messaging when a service is passed', function(){
        assert.equal(plugins.getLinkType("ahmad.a.assaf", "skype"), "messaging");
        assert.equal(plugins.getLinkType("@ahmadaassaf", "qq"), "messaging");
        assert.equal(plugins.getLinkType("@ahmadaassaf", "twitter"), "social");
    });

    it('should return a correct link type considering the "service"', function(){
        assert.equal(plugins.getLinkType("ahmad.a.assaf", "skype"), "messaging");
    });


    it('should return null if no valid arguments are passed', function(){
        assert.equal(plugins.getLinkType(), null);
        assert.equal(plugins.getLinkType(true), null);
        assert.equal(plugins.getLinkType(null), null);
        assert.equal(plugins.getLinkType({}), null);
        assert.equal(plugins.getLinkType(undefined), null);
    });

});
