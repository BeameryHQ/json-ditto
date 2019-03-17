'use strict';

const assert           = require('assert');

const plugins          = require('../../ditto/plugins/index');

describe('getLanguageFromCode plugin', function(){

	it('should return correct language code', function(){
		assert.equal(plugins.getLanguageFromCode("en"), "English");
		assert.equal(plugins.getLanguageFromCode("   As"), "Assamese");
		assert.equal(plugins.getLanguageFromCode("   LA    "), "Latin");
	});

	it('should return null if no valid language code is found', function(){
		assert.equal(plugins.getLanguageFromCode("amazonas"), null);
		assert.equal(plugins.getLanguageFromCode("blabloom"), null);
	});

    it('should return null if no valid arguments are passed', function(){
        assert.equal(plugins.getLanguageFromCode(), null);
        assert.equal(plugins.getLanguageFromCode(true), null);
        assert.equal(plugins.getLanguageFromCode(null), null);
        assert.equal(plugins.getLanguageFromCode({}), null);
        assert.equal(plugins.getLanguageFromCode(undefined), null);
    });
});



