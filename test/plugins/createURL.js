'use strict';

var _                  = require('lodash');
const assert           = require('assert');

const plugins          = require('../../ditto/plugins/index');

describe('createURL plugin', function(){

    it('should create a url from passed parameters', function(){
        assert.equal(plugins.createURL("http://linkedin.com", "/in/ahmadassaf"), "http://linkedin.com/in/ahmadassaf");
        assert.equal(plugins.createURL("http://linkedin.com", "/in/AHMADASSAF"), "http://linkedin.com/in/ahmadassaf");
        assert.equal(plugins.createURL("http://LinKEDIN.com", "    /in/AHMADASSAF   "), "http://linkedin.com/in/ahmadassaf");
        assert.equal(plugins.createURL("http://LinKEDIN.com"), "http://linkedin.com");
        assert.equal(plugins.createURL("http://LinKEDIN.com     "), "http://linkedin.com");
    });

    it('should return null if no valid string is passed as a parameter', function(){
        assert.equal(plugins.createURL(), null);
        assert.equal(plugins.createURL(true), null);
        assert.equal(plugins.createURL({}), null);
        assert.equal(plugins.createURL(["test"]), null);
        assert.equal(plugins.createURL(undefined), null);
    });

});
