'use strict';

const assert           = require('assert');

const plugins          = require('../../unifier/plugins/index');

describe('concatString plugin', function(){

	it('should encode strings', function() {
        assert.equal(plugins.concatString("leandro", "1", "2"), "leandro12");
        assert.equal(plugins.concatString(null), null);
        assert.equal(plugins.concatString("", "", ""), "");
	});
});
