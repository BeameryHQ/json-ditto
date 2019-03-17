'use strict';

var _                  = require('lodash');
const assert           = require('assert');

const plugins          = require('../../ditto/plugins/index');

describe('CleanURI plugin', function(){

    it('should return null if the URI is not valid', function(){
        assert.equal(plugins.cleanURI("http://my:::test.asp?name=st%C3%A5le&car=saab"), null);
        assert.equal(plugins.cleanURI("...///<<><>"), null);
        assert.equal(plugins.cleanURI("https://www.linkedin.com/profile/view"), null);
        assert.equal(plugins.cleanURI("http://www.linkedin.com/profile/view"), null);
        assert.equal(plugins.cleanURI("https://linkedin.com/profile/view"), null);
        assert.equal(plugins.cleanURI("http://linkedin.com/profile/view"), null);
        assert.equal(plugins.cleanURI("http://www.linkedin.com/profile?viewProfile=&key=38795600&authToken=TlUF&authType=name&trk=api*a102401*s102401"), null);

        assert.equal(plugins.cleanURI("linkedin.com/profile/view"), null);
    });

    it('should correctly clean a URI and decode it', function(){
        assert.equal(plugins.cleanURI("http://mytest.asp?name=st%C3%A5le&car=saab"), "http://mytest.asp?name=ståle&car=saab");
    });

    it('should not blow out the cpu when parsing too long content', function(){
        assert.ok(plugins.cleanURI(`I think I will be a good fit for this role as I already work  within a fellowship and liaise day to day
        with fellows and colleagues. I have a strong personality which I channel to build a strong rapport with the surrounding
        teams and external associates. I have strong organisational skills I am pro-active and happy to take decisions independently.
        I thrive on getting a task done to the best of my abilities even when under pressure. I currently organise all of our Panel meetings
        there are 23 across the year as well as this any other important committee meetings in the academy calendar these include
        the MacRobert Awards committee, The Awards Committee, The Operating Committees Group, the Membership Committee as well as assisting
         with the organisation of the biggest event in the academy calendar the annual Awards dinner, where I work very closely with our events
         team. I am a team player and I use this skill when working closely with others including finance our programmes teams, events, policy,
         and the majority of the office. I am wanted to progress within the role that I am currently in and this role of Fellowship Operations
         assistant would enable me to do this effectively.`));

    })

    it('should correctly detect missing HTTP protocol and add it', function(){
        assert.equal(plugins.cleanURI("mytest.asp?name=st%C3%A5le&car=saab"), "http://mytest.asp?name=ståle&car=saab");
        assert.equal(plugins.cleanURI("mytest?name=st%C3%A5le&car=saab"), null);
    });

    it('should correctly detect a Twitter handle and correct the url', function(){
        assert.equal(plugins.cleanURI("@ahmadaassaf"), "http://twitter.com/ahmadaassaf");
        assert.equal(plugins.cleanURI("ahmadaassaf"), null);
    });

    it('should correctly detect a Skype handle and correct the url', function(){
        assert.equal(plugins.cleanURI("ahmad.a.assaf", "messaging"), "ahmad.a.assaf");
        assert.equal(plugins.cleanURI("  ahmadaassaf  ", "messaging"), "ahmadaassaf");
    });

    it('should correctly detect a linkedin URL and canonicalize it', function(){
    	assert.equal(plugins.cleanURI("linkedin.com/pub/ahmadassaf?refId=extension"), "https://www.linkedin.com/in/ahmadassaf");
        assert.equal(plugins.cleanURI("http://LINKEDIN.com/pub/koko-klai/a7/576/b50?trk=biz_employee_pub"), "https://www.linkedin.com/in/koko-klai-b50576a7");
        assert.equal(plugins.cleanURI("https://sy.linkedin.com/pub/koko-klai/a7/576/b50?trk=biz_employee_pub"), "https://www.linkedin.com/in/koko-klai-b50576a7");
    });

    it('should return null if no valid string is passed as a parameter', function(){
        assert.equal(plugins.cleanURI(true), null);
        assert.equal(plugins.cleanURI({}), null);
        assert.equal(plugins.cleanURI(["test"]), null);
        assert.equal(plugins.cleanURI(undefined), null);
    });

});
