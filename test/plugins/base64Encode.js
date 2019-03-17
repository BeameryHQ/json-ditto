'use strict';

const assert           = require('assert');

const plugins          = require('../../ditto/plugins/index');

describe('base64Encode plugin', function(){

	it('should encode strings', function() {
        assert.equal(plugins.base64Encode("leandro"), "bGVhbmRybw==");
        assert.equal(plugins.base64Encode(null), null);
        assert.equal(plugins.base64Encode('áccẽntz̧'), "w6FjY+G6vW50esyn");
	});
});
