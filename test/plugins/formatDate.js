'use strict';

const _ = require('lodash');
const assert = require('assert');
const moment = require('moment');

const plugins = require('../../ditto/plugins/index');

describe('formatDate plugin', function () {

    it('should convert dates to strings without format', function () {
        const dateString = '2018-01-01';
        assert.equal(plugins.formatDate(new Date(dateString)), '2018-01-01T00:00:00Z');
        assert.equal(plugins.formatDate(moment(dateString)), '2018-01-01T00:00:00Z');
        assert.equal(plugins.formatDate(dateString), '2018-01-01T00:00:00Z');
    });

    it('should convert dates to strings depending on format', function () {
        const format = 'YYYY/MM/DD';
        const dateString = '2018-01-01';
        assert.equal(plugins.formatDate(new Date(dateString), format), '2018/01/01');
        assert.equal(plugins.formatDate(moment(dateString), format), '2018/01/01');
        assert.equal(plugins.formatDate(dateString, format), '2018/01/01');
    });

    it('should return itself if no valid date is found', function () {
        assert.equal(plugins.formatDate(''), '');
        assert.equal(plugins.formatDate(null), null);
        assert.equal(plugins.formatDate(undefined), undefined);
        assert.equal(plugins.formatDate('2018-50-50'), '2018-50-50');
    });

    it('should convert dates to string when is not UTC', function () {
        const format = null;
        const dateString = '2018-01-01';
        const isUtc = false;
        assert.equal(plugins.formatDate(new Date(dateString), format, isUtc), '2018-01-01T00:00:00+00:00');
        assert.equal(plugins.formatDate(new Date(dateString), format, isUtc), '2018-01-01T00:00:00+00:00');
        assert.equal(plugins.formatDate(new Date(dateString), format, isUtc), '2018-01-01T00:00:00+00:00');
        assert.equal(plugins.formatDate(new Date(dateString), format, isUtc), '2018-01-01T00:00:00+00:00');
    });

});
