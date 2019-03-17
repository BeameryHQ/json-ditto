'use strict';

const assert           = require('assert');

const plugins          = require('../../ditto/plugins/index');

describe('generateIdForLinks plugin', function(){

    it('should generate a valid link id', function() {
        assert.equal(plugins.generateIdForLinks("http://ahmadassaf.com"), "05d6c6c022a21e9bb169754b78c1e289");
        assert.equal(plugins.generateIdForLinks("http://ahmadassaf.com     "), "05d6c6c022a21e9bb169754b78c1e289");
        assert.equal(plugins.generateIdForLinks("       http://ahmadassaf.com     "), "05d6c6c022a21e9bb169754b78c1e289");
        assert.equal(plugins.generateIdForLinks("       http://ahmadassaf.  com     "), "05d6c6c022a21e9bb169754b78c1e289");
        assert.equal(plugins.generateIdForLinks("http://AHMADASSAF.com"), "05d6c6c022a21e9bb169754b78c1e289");
        assert.equal(plugins.generateIdForLinks("http://AHMADAssAF.com"), "05d6c6c022a21e9bb169754b78c1e289");
        assert.equal(plugins.generateIdForLinks("http://ahmadassaf.com?refid=extension"), "439b66339ad38ff4064d1d0e9eff1ae1");
    });

    it('should generate a valid link id for a link with missing HTTP protocol', function() {
        assert.equal(plugins.generateIdForLinks("ahmadassaf.com"), "05d6c6c022a21e9bb169754b78c1e289");
        assert.equal(plugins.generateIdForLinks("http://ahmadassaf.com     "), "05d6c6c022a21e9bb169754b78c1e289");
        assert.equal(plugins.generateIdForLinks("ahmadassaf.com?refid=extension"), "439b66339ad38ff4064d1d0e9eff1ae1");
    });

    it('should generate a valid link id for a canonical linkeidn url', function() {
        assert.equal(plugins.generateIdForLinks("http://linkedin.com/pub/ahmadassaf"), "eff585427879a3fd62cfe884fa5d8068");
        assert.equal(plugins.generateIdForLinks("http://linkedin.com/pub/ahmadassaf?ref=extension"), "eff585427879a3fd62cfe884fa5d8068");
        assert.equal(plugins.generateIdForLinks("linkedin.com/pub/ahmadassaf"), "eff585427879a3fd62cfe884fa5d8068");
    });


    it('should generate a valid id for a twitter handle', function() {
        assert.equal(plugins.generateIdForLinks("@ahmadaassaf"), "c1c9635aac4c64af6bc2d4e688f5bbf4");
        assert.equal(plugins.generateIdForLinks("@ahmadaassaf    "), "c1c9635aac4c64af6bc2d4e688f5bbf4");
        assert.equal(plugins.generateIdForLinks("    @ahmadaassaf   "), "c1c9635aac4c64af6bc2d4e688f5bbf4");
    });

    it('should return null if no valid arguments are passed', function(){
        assert.equal(plugins.generateIdForLinks(), null);
        assert.equal(plugins.generateIdForLinks(true), null);
        assert.equal(plugins.generateIdForLinks(null), null);
        assert.equal(plugins.generateIdForLinks({}), null);
        assert.equal(plugins.generateIdForLinks(undefined), null);
        assert.equal(plugins.generateIdForLinks("ahmadassaf"), null);
    });
});



