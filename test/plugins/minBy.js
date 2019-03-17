'use strict';

const assert = require('assert');
const { minBy } = require('../../ditto/plugins');

describe('minBy', function () {

    it('should return min value from array if no path specified and items are numbers', function () {
        assert.equal(minBy([1, 3, 2]), 1);
    });

    it('should return lowest value by code of first character if array values are strings', function() {
        assert.equal(minBy(['bbb', 'afdd', 'ffaaa']), 'afdd');
    });

    it('should, when given array of objects and path, return prop with lowest value at path', function() {
        const arr = [ { a: { a: 3} }, { a: { a: 2} }, { a: { a: 1} }];
        assert.deepEqual(minBy(arr, 'a.a'), { a: { a: 1} });
    });

    it('should return undefined if given wrong or empty input in place of array argument', function() {
        assert.equal(minBy({a: 'a'}), undefined);
        assert.equal(minBy([]), undefined);
        assert.equal(minBy('string'), undefined);
    });

});
