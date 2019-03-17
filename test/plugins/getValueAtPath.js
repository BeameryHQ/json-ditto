
'use strict';

const assert = require('assert');
const { getValueAtPath } = require('../../ditto/plugins');

describe('getValueAtPath', function () {

    it('should return value at path specified in array or string', function() {
        assert.equal(getValueAtPath({a: {b: 1}}, ['a', 'b']), 1);
        assert.equal(getValueAtPath({a: {b: 1}}, 'a.b'), 1);
    });

    it('should return undefined if no value at path', function() {
        assert.equal(getValueAtPath({a: {b: 1}}, ['a', 'b', 'c']), undefined);
        assert.equal(getValueAtPath({a: {b: 1}}, 'a.b.c'), undefined);
    });

});
