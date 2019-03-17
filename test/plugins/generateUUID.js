'use strict';

const assert           = require('assert');

const plugins          = require('../../ditto/plugins/index');

describe('generateUUID plugin', function(){

	it('should generate a valid UUID', function() {
		assert.ok(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(plugins.generateUUID()));
	});
});



