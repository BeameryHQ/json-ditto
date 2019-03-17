'use strict';

const assert           = require('assert');

const plugins          = require('../../ditto/plugins/index');

describe('generateFacebookImageLink plugin', function(){

	it('should generate a valid facebook image link', function() {
		assert.equal(plugins.generateFacebookImageLink("0507d1431d3e9ad5b16e32ec64495df8"), "http://graph.facebook.com/0507d1431d3e9ad5b16e32ec64495df8/picture?type=large");
		assert.equal(plugins.generateFacebookImageLink("ahmad.a.assaf"), "http://graph.facebook.com/ahmad.a.assaf/picture?type=large");
		assert.equal(plugins.generateFacebookImageLink("0507d1431d3e9ad5b16e32ec64495df8", "firstName"), "http://graph.facebook.com/0507d1431d3e9ad5b16e32ec64495df8/picture?type=large");
	});

  it('should return null if no valid arguments are passed', function(){
      assert.equal(plugins.generateFacebookImageLink(), null);
      assert.equal(plugins.generateFacebookImageLink(true), null);
      assert.equal(plugins.generateFacebookImageLink({}), null);
      assert.equal(plugins.generateFacebookImageLink(undefined), null);
  });
});



