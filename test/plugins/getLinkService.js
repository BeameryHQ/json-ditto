'use strict';

const assert           = require('assert');

const plugins          = require('../../ditto/plugins/index');

describe('getLinkService plugin', function(){

	it('should generate a valid link service', function() {
		assert.equal(plugins.getLinkService("http://globo.com/eget/eros/elementum.js?ut=ut&odio=at&cras=dolor&mi=quis&pede=odio&malesuada=consequat&in=varius&imperdiet=integer&et=ac&commodo=leo&vulputate=pellentesque&justo=ultrices&in=mattis&blandit=odio&ultrices=donec&enim=vitae&lorem=nisi&ipsum=nam&dolor=ultrices&sit=libero&amet=non"), "globo");
		assert.equal(plugins.getLinkService("http://Facebook.com/ahmad.a.assaf     "), "facebook");
		assert.equal(plugins.getLinkService("FACEBOOK.com?refid=extension"), "facebook");
	});

	it('should generate a valid link service overriding the extraction from the source', function() {
		assert.equal(plugins.getLinkService("http://ahmadassaf.com", "facebook"), "facebook");
		assert.equal(plugins.getLinkService("http://Facebook.com/ahmad.a.assaf     ", "linkEDIN"), "linkedin");
		assert.equal(plugins.getLinkService("FACEBOOK.com?refid=extension", "FACEBOOK"), "facebook");
	});

	it('should generate a valid link service for a link with missing HTTP protocol', function() {
		assert.equal(plugins.getLinkService("ahmadassaf.com"), "ahmadassaf");
		assert.equal(plugins.getLinkService("http://ahmadassaf.com     "), "ahmadassaf");
		assert.equal(plugins.getLinkService("ahmadassaf.com?refid=extension"), "ahmadassaf");
	});

	it('should generate a valid link id for a canonical linkeidn url', function() {
		assert.equal(plugins.getLinkService("http://linkedin.com/pub/ahmadassaf"), "linkedin");
		assert.equal(plugins.getLinkService("http://linkedin.com/pub/ahmadassaf?ref=extension"), "linkedin");
		assert.equal(plugins.getLinkService("linkedin.com/pub/ahmadassaf"), "linkedin");
	});


	it('should generate a valid id for a twitter handle', function() {
		assert.equal(plugins.getLinkService("@ahmadaassaf"), "twitter");
		assert.equal(plugins.getLinkService("@ahmadaassaf    "), "twitter");
		assert.equal(plugins.getLinkService("    @ahmadaassaf   "), "twitter");
	});

	it('should return null if called on an email address', function() {
		assert.equal(plugins.getLinkService("cocoagems@github.io"), null )
    assert.equal(plugins.getLinkService("http://github.io/user:@ahmadassaf"), "github" )
	});

    it('should return null if no valid arguments are passed', function(){
        assert.equal(plugins.getLinkService(), null);
        assert.equal(plugins.getLinkService(true), null);
        assert.equal(plugins.getLinkService(null), null);
        assert.equal(plugins.getLinkService({}), null);
        assert.equal(plugins.getLinkService(undefined), null);
        assert.equal(plugins.getLinkService("ahmadassaf"), null);
    });
});



