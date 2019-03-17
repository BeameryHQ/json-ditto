'use strict';

const assert           = require('assert');

const plugins          = require('../../ditto/plugins/index');

describe('getLanguageCode plugin', function(){

	it('should return correct language code', function(){
		assert.equal(plugins.getLanguageCode("ENGLISH"), "en");
		assert.equal(plugins.getLanguageCode("   AssaMesE"), "as");
		assert.equal(plugins.getLanguageCode("   latin    "), "la");
		assert.ok(plugins.getLanguageCode("atin") !== "la");
	});

	it('should return null if no valid language code is found', function(){
		assert.equal(plugins.getLanguageCode("amazonas"), null);
		assert.equal(plugins.getLanguageCode("blabloom"), null);
	});

    it('should return null if no valid arguments are passed', function(){
        assert.equal(plugins.getLanguageCode(), null);
        assert.equal(plugins.getLanguageCode(true), null);
        assert.equal(plugins.getLanguageCode(null), null);
        assert.equal(plugins.getLanguageCode({}), null);
        assert.equal(plugins.getLanguageCode(undefined), null);
    });
});



