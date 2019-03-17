'use strict';

const _                = require('lodash');
const assert           = require('assert');

const plugins          = require('../../ditto/plugins/index');

describe('uniqueArray plugin', function(){


    it('should return a unique array if no key was not passed', function(){
        assert.deepStrictEqual(plugins.uniqueArray([1,2,3,4,3]), [1,2,3,4]);
        assert.deepStrictEqual(plugins.uniqueArray([1,2,3,4,3], null), [1,2,3,4]);
        assert.deepStrictEqual(plugins.uniqueArray(["a", "b", "b"]), ["a", "b"]);
        assert.deepStrictEqual(plugins.uniqueArray([{key: "a"}, {key: "b"}, {key: "b"}]), [{key: "a"}, {key: "b"}, {key: "b"}]);
    });

    it('should return a unqiue array based on a passed key', function(){
        assert.deepStrictEqual(plugins.uniqueArray([{key: "a"}, {key: "b"}, {key: "b"}], "key"), [{key: "a"}, {key: "b"}]);
    });

    it('should return an empty array if no valid arguments are passed', function(){
        assert.deepStrictEqual(plugins.uniqueArray(null), []);
        assert.deepStrictEqual(plugins.uniqueArray(), []);
        assert.deepStrictEqual(plugins.uniqueArray([]), []);
    });

});
