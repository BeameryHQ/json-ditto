'use strict';

const assert           = require('assert');

const plugins          = require('../../ditto/plugins/index');

describe('generateId plugin', function(){

	it('should generate a valid id', function() {
		assert.equal(plugins.generateId("ahmad abdel mouti mohammad assaf", "firstName"), "0507d1431d3e9ad5b16e32ec64495df8");
		assert.equal(plugins.generateId("ahmad AbdEl mouti MOHAMMAD assaf", "fiRSTName"), "0507d1431d3e9ad5b16e32ec64495df8");
		assert.equal(plugins.generateId(["test"]), "098f6bcd4621d373cade4e832627b4f6");
		assert.equal(plugins.generateId("ahmad abdel mouti mohammad assaf"), "b55969000c21c7448df5f57ae51de823");
        assert.equal(plugins.generateId("ahmad abdel mouti mohammad assaf", undefined), "b55969000c21c7448df5f57ae51de823");
        assert.equal(plugins.generateId("ahmad abdel mouti mohammad assaf", null), "b55969000c21c7448df5f57ae51de823");
        assert.equal(plugins.generateId("ahmad abdel mouti mohammad assaf", ["firstName"]), "0507d1431d3e9ad5b16e32ec64495df8");
    });

    it('should return null if no valid arguments are passed', function(){
        assert.equal(plugins.generateId(), null);
        assert.equal(plugins.generateId(true), null);
        assert.equal(plugins.generateId({}), null);
        assert.equal(plugins.generateId(undefined), null);
    });
});



