'use strict';

var _                  = require('lodash');
const assert           = require('assert');

const plugins          = require('../../ditto/plugins/index');

describe('extractName plugin', function(){

    it('should extract correctly a first name', function(){
        assert.equal(plugins.extractName("ahmad abdel mouti mohammad assaf", "firstName"), "ahmad");
        assert.equal(plugins.extractName("     ahmad      abdel mouti mohammad assaf", "firstName"), "ahmad");
        assert.equal(plugins.extractName("     Ahmad      abdel mouti mohammad assaf", "firstName"), "Ahmad");
    });

    it('should extract correctly a last name', function(){
        assert.equal(plugins.extractName("ahmad abdel mouti mohammad assaf", "lastName"), "assaf");
        assert.equal(plugins.extractName("     ahmad      abdel mouti mohammad     assaf    ", "lastName"), "assaf");
        assert.equal(plugins.extractName("     ahmad      abdel mouti mohammad     Assaf    ", "lastName"), "Assaf");
    });

    it('should extract correctly middle names', function(){
        assert.deepEqual(plugins.extractName("ahmad abdelmouti mohammad assaf", "middleName"), ["abdelmouti", "mohammad"]);
        assert.deepEqual(plugins.extractName("    ahmad abdelmouti     mohammad       assaf", "middleName"), ["abdelmouti", "mohammad"]);
        assert.deepEqual(plugins.extractName("    ahmad abdelmOUti     Mohammad       assaf", "middleName"), ["abdelmOUti", "Mohammad"]);
        assert.deepEqual(plugins.extractName("    ahmad abdelmOUti            assaf", "middleName"), ["abdelmOUti"]);
    });

    it('should return null if no valid arguments are passed', function(){
        assert.equal(plugins.extractName(), null);
        assert.equal(plugins.extractName(true), null);
        assert.equal(plugins.extractName({}), null);
        assert.equal(plugins.extractName(["test"]), null);
        assert.equal(plugins.extractName("ahmad abdel mouti mohammad assaf"), null);
        assert.equal(plugins.extractName("ahmad abdel mouti mohammad assaf", "first"), null);
        assert.equal(plugins.extractName("ahmad abdel mouti mohammad assaf", undefined), null);
        assert.equal(plugins.extractName("ahmad abdel mouti mohammad assaf", null), null);
        assert.equal(plugins.extractName("ahmad abdel mouti mohammad assaf", ["firstName"]), null);
        assert.equal(plugins.extractName(undefined), null);
    });

});
