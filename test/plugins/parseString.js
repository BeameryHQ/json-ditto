'use strict';

const _                = require('lodash');
const assert           = require('assert');

const plugins          = require('../../ditto/plugins/index');

describe('parseString plugin', function(){

    it('should return a string from a non-string value', function(){
        assert.equal(plugins.parseString(12311231.00), "12311231");
        assert.equal(plugins.parseString(12311211), "12311211");
        assert.equal(plugins.parseString(false), "false");
    });

    it('should return null if no valid arguments are passed', function(){
        assert.equal(plugins.getLinkType(), null);
        assert.equal(plugins.getLinkType(true), null);
        assert.equal(plugins.getLinkType(null), null);
        assert.equal(plugins.getLinkType({}), null);
        assert.equal(plugins.getLinkType(undefined), null);
    });

});
