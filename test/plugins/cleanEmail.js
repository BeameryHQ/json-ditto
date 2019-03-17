'use strict';

var _                  = require('lodash');
const assert           = require('assert');

const plugins          = require('../../ditto/plugins/index');

describe('CleanEmail plugin', function(){

    it('should correctly clean an email and strip any un-needed spaces and lowercase it', function(){
        assert.equal(plugins.cleanEmail("AHMAD.A.assaf@gmail.com"), "ahmad.a.assaf@gmail.com");
        assert.equal(plugins.cleanEmail("     AHMAD.A.assaf@gmail.com"), "ahmad.a.assaf@gmail.com");
        assert.equal(plugins.cleanEmail("AHMAD.A.assaf@gmail.com     "), "ahmad.a.assaf@gmail.com");
        assert.equal(plugins.cleanEmail("     AHMAD.A.assaf@gmail.com    "), "ahmad.a.assaf@gmail.com");
        assert.equal(plugins.cleanEmail("A   HMA   D.A.a   ssaf@g   mail.com"), "ahmad.a.assaf@gmail.com");
    });

    it('should return null if no valid string is found', function(){
        assert.equal(plugins.cleanEmail("     "), null);
    });

    it('should return null if no valid string is passed as a parameter', function(){
        assert.equal(plugins.cleanEmail(true), null);
        assert.equal(plugins.cleanEmail({}), null);
        assert.equal(plugins.cleanEmail(["test"]), null);
        assert.equal(plugins.cleanEmail(undefined), null);
    });

});
