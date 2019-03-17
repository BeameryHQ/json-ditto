'use strict';

const assert           = require('assert');

const plugins          = require('../../ditto/plugins/index');

describe('generateIdFromLanguageCode plugin', function(){

	it('should return null if no valid arguments are passed', function(){
		assert.equal(plugins.generateIdFromLanguageCode("en"), "ba0a6ddd94c73698a3658f92ac222f8a");
		assert.equal(plugins.generateIdFromLanguageCode("AS"), "4e9c612f638bb88514ef8327b6bc02af");
		assert.equal(plugins.generateIdFromLanguageCode("La"), "f4b418eba9c0b3d4901880b743cbbaff");
	});

	it('should return null if no valid language code is found', function(){
		assert.equal(plugins.generateIdFromLanguageCode("qq"), null);
		assert.equal(plugins.generateIdFromLanguageCode("311"), null);
		assert.equal(plugins.generateIdFromLanguageCode(999), null);
	});

    it('should return null if no valid arguments are passed', function(){
        assert.equal(plugins.generateIdFromLanguageCode(), null);
        assert.equal(plugins.generateIdFromLanguageCode(true), null);
        assert.equal(plugins.generateIdFromLanguageCode(null), null);
        assert.equal(plugins.generateIdFromLanguageCode({}), null);
        assert.equal(plugins.generateIdFromLanguageCode(undefined), null);
    });
});



