'use strict';

const assert           = require('assert');

const plugins          = require('../../ditto/plugins/index');

describe('concatWithComma plugin', function(){

	it('should encode strings', function() {
        assert.equal(plugins.concatWithComma('leandro', '1', '2'), 'leandro, 1, 2');
        assert.equal(plugins.concatWithComma(null), null);
        assert.equal(plugins.concatWithComma('', '', ''), null);
	});
});
