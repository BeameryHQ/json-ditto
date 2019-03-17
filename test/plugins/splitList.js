'use strict';

const assert           = require('assert');

const plugins          = require('../../ditto/plugins/index');

describe('splitList plugin', function(){

	it('should encode strings', function() {
        assert.deepEqual(plugins.splitList("leandro"), ["leandro"]);
        assert.deepEqual(plugins.splitList(null), null);
        assert.deepEqual(plugins.splitList(123), null);
        assert.deepEqual(plugins.splitList("a,b,c"), ["a", "b", "c"]);
        assert.deepEqual(plugins.splitList("a, b and c"), ["a", "b", "c"]);
        assert.deepEqual(plugins.splitList("a, b             and c"), ["a", "b", "c"]);
	});
});
