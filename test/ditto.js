'use strict';

var _                = require('lodash');
const assert         = require('assert');
const crypto         = require('crypto');
const fs             = require('fs');
const path           = require('path');

const ditto        = require('../ditto/ditto');

describe('ditto Interface', function(){

    let dummySample   = require('./samples/test');
    let dummyResult   = require('./results/test');
    let dummyMappings = require('./mappings/test');

    let dummyPlugin   = {
      transformTwitterHandle: (target) => {
          const twitterHandle = target.match(/^https?:\/\/(www\.)?twitter\.com\/(#!\/)?([^\/]+)(\/\w+)*$/);
          return !!twitterHandle ? `@${twitterHandle[3]}` : null;
      }
    };

    before(function(){
        return new ditto(dummyMappings, dummyPlugin).unify(dummySample).then((result) => {
            this.result = result;
        });
    });

    it('should be able to map an object with a direct flat mapping', function(){
        assert.strictEqual(this.result.name, dummyResult.name);
    });

    it('should be able to map an object with a default hardcoded value if a mapping value is not found', function(){
        assert.strictEqual(this.result.nickname, "nickname_not_found");
        assert.strictEqual(this.result.isNickNameFound, false);
    });

    it('should be able to map an object with a default value extracted from the mapping if a mapping value is not found', function(){
        assert.strictEqual(this.result.isDynamicDefault, this.result.name);
    });

    it('should be able to combine two or more strings', function(){
        assert.strictEqual(this.result.fullName, dummyResult.fullName);
    });

    it('should be able to combine two or more strings one of which is an already extracted value', function(){
        assert.strictEqual(this.result.completeName, dummyResult.completeName);
    });

    it('should be able to assign a new value based on an already mapped one', function(){
        assert.strictEqual(this.result.displayName, "Ahmad Ahmad AbdelMuti Assaf");
    });

    it('should be able to allow for duplicate values without flattening/compacting them', function(){
        assert.strictEqual(this.result.fullName, "Ahmad Ahmad AbdelMuti Assaf");
    });

    it('should be able to apply a condition on an output path', function(){
        assert.equal(this.result.social_media_addresses.length, 1);
    });

    it('should be able to apply multiple conditions on an output path', function(){
        assert.equal(this.result.social_media_addresses.length, 1);
        assert.deepStrictEqual(this.result.social_media_addresses[0], {"value": "@ahmadaassaf"});
    });

    it('should be able to map nested/sub object', function(){
        assert.deepStrictEqual(this.result.email, dummyResult.email);
    });

    it('should be able to assign a value based on the value of an iterating object', function(){
        assert.strictEqual(this.result.social_links[0].value, "http://a.com");
    });

    it('should be able to assign a value based on the key of an iterating object', function(){
        assert.strictEqual(this.result.social_links[0].type, "test");
    });

    it('should be able to assign a value based on a hard-coded string', function(){
        assert.strictEqual(this.result.social_links[0].order, 0);
    });

    it('should be able to assign a boolean value based on a hard-coded boolean', function(){
        assert.strictEqual(this.result.social_links[0].social, true);
    });

    it('should be able to assign a default hardcoded value based if an extracted value from a path does not exist', function(){
        assert.strictEqual(this.result.default_name, "this_should_be_the_firstName");
    });

    it('should be able to assign a value only if a condition is met', function(){
        assert.strictEqual(this.result.social_media_addresses[0].value, "@ahmadaassaf");
        assert.strictEqual(this.result.website_addresses_keyless.length, 3);
    });

    it('should be able to assign a value only if the prerequisite value is valid', function(){
        assert.strictEqual(this.result.website_addresses["f5e32a6faaa7ead6ba201e8fa25733ee"].value, "http://klout.com/ahmadassaf");
    });

    it('should be able to map an object based on iterating one or more target paths', function(){
        assert.deepStrictEqual(this.result.social_links, dummyResult.social_links);
    });

    it('should be able to map an object based on iterating one or more target paths with the id generated on elements in the root document', function(){
        assert.deepStrictEqual(this.result.experience_primary, dummyResult.experience_primary);
    });

    it('should be able to map an array of objects based on iterating over an already mapped set of values', function(){
        assert.deepStrictEqual(this.result.social_links, dummyResult.social_links);
    });

    it('should be able hash a defined value as the key of a mapped object', function(){
        assert.strictEqual(_.keys(this.result.social_links_objects)[0]
            , "388495550d157e5c5d299b7ecfeb1c2d");
    });

    it('should be able to map an object of objects based on iterating over an already mapped set of values', function(){
        assert.deepStrictEqual(this.result.social_links_objects, dummyResult.social_links_objects);
    });

    it('should be able to apply a function on a nested object', function(){
        assert.equal(this.result.experience_object.values["894b6152a9dde92713a40590f6f4d5b8"].id, "894b6152a9dde92713a40590f6f4d5b8");
    });

    it('should return a default value if found without executing the function defined', function(){
		assert.strictEqual(this.result.fullNameDefault, "Ahmad Assaf");
		assert.strictEqual(this.result.fullNameDefaultHardcoded, "default");
    });

    it('should be able to create an array of values by iterating over a set of objects', function(){
        assert.equal(this.result.experiences.length, 2);
        assert.equal(this.result.experiences[0], 'beamery');
        assert.equal(this.result.experiences[1], 'SAP');
    });

    it('should be able hash a defined value as they key of a mapped object based on multiple values', function(){
        assert.strictEqual(_.keys(this.result.experience_object.values)[0]
            , "894b6152a9dde92713a40590f6f4d5b8");
    });

    it('should be able to call nested function calls', function(){
        assert.deepStrictEqual(this.result.messaging, dummyResult.messaging);
        assert.deepStrictEqual(this.result.messaging[0].type, "messaging");
    });

    it('should be able to assign a value based on a condition that includes nested function calls', function(){
        assert.deepStrictEqual(this.result.messaging[0].value, "ahmad.a.assaf");
        assert.deepStrictEqual(this.result.messaging.length, 1);
    });

    it('should be able to create an array of objects by iterating over a nested/sub object', function(){
        assert.deepStrictEqual(this.result.education, dummyResult.education);
    });

    it('should be able to create an array of objects by iterating over multiple objects in the source document', function(){
        assert.equal(this.result.social_links.length, 5);
    });

    it('should be able to ignore parsing objects that have a false/null/undefined values', function(){
        assert.equal(this.result.social_links.length, 5);
    });

    it('should be able to create an object value based on the iterating key of an object', function(){
        assert.strictEqual(this.result.education[0].universityName, "telecomParisTech");
    });

    it('should be able to create an object where they key is a combination of a previous object key and other value(s)', function(){
        assert.strictEqual(_.keys(this.result.education_object)[0], "6ea8c4cf5c35861ba3b690f93828e44f");
    });

    it('should be able to create a value by combining a string with an exsiting mapped value (string templates)', function(){
        assert.strictEqual(this.result.primaryPhoto, "http://photo.com/ahmadassaf");
    });

    it('should be able to create an object based on selecting an array element from an existing object', function(){
        assert.deepEqual(this.result.primaryExperience, dummyResult.primaryExperience);
    });

    it('should cover all the cases defined by the ditto interface', function(){
        assert.deepStrictEqual(this.result, dummyResult);
    });

    it('should be able to parse a unicode string', function(){
        const badObj = { data : {
            links: {
                values: {
                    ciao: {
                        id: "ciao",
                        bio:` `,
                        value:" this is a value",
                        type: "social"
                    }
                }
            }
        }};

        return new ditto({
            "social_media_addresses": {
                "output": [],
                "innerDocument": "data.links.values",
                "prerequisite": "!!innerResult.value",
                "required": ["value"],
                "mappings": {
                    "value": "value??type#===#>>social"
                }
            }
        }).unify(badObj).then((result) => {
            assert.deepEqual(result, { social_media_addresses: [ { value: ' this is a value' } ] });
        });


    });

    const plugins = require('../ditto/plugins/index');

    describe('ditto Plugins', function(){
        _.each(plugins, function(plugin, pluginName) {
            const plugintTestPath = path.join(__dirname, `./plugins/${pluginName}.js`);
            if (!fs.existsSync(plugintTestPath)) {
                console.error(`\x1b[31m No valid test is found for ditto Plugin: ${pluginName}`);
            } else {
                require(plugintTestPath);
            }
        });
    });
});
