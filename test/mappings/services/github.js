"use strict";

/*
 * @description The mapping file between the Github API and the sherlock model
 * The key represents the Github field name and the value is the mapped sherlock field name
 * If the value is an object this means that the Github field is an object and we need to map
 * the internal fields as well
 *
 * SPECIAL: keys that start with ^^ mean that they do not exist in Github but will be hardoded
 * in sherlock e.g. type field for social links, chat and websites
 * @returns {Object}
 */

module.exports = {
    "id"       : "@generateUUID(>>id)",
    "fullName" : "data.profile.displayName",
    "firstName": "@extractName(data.profile.displayName|>>firstName)",
    "links"       : {
        "values" : [{
            "output": {},
            "key": "@generateIdForLinks(data.profile.profileUrl)",
            "innerDocument": "!",
            "required": ["value"],
            "mappings"     : {
                "id"      : "@generateIdForLinks(data.profile.profileUrl)",
                "type"     : ">>social",
                "value"    : "@cleanURI(data.profile.profileUrl|@getLinkType(value,@getLinkService(value,service)))",
                "service"  : ">>github",
                "username" : "data.profile.username",
                "userId"   : "data.profile.id",
                "following": "data.profile._json.following",
                "followers": "data.profile._json.followers"
            }
        },{
            "output": {},
            "key": "@generateId(data.profile._json.blog)",
            "innerDocument": "!",
            "required": ["value"],
            "mappings"     : {
                "id"      : "@generateId(data.profile._json.blog)",
                "type"     : ">>website",
                "value"    : "data.profile._json.blog"
            }
        }],
        "keys" : {
            "output": [],
            "innerDocument": "!links.values",
            "value": "id"
        }
    },
    "experience": {
        "values" : {
            "output": {},
            "key": "@generateId(data.profile._json.company)",
            "innerDocument": "!",
            "required": ["organisationName"],
            "mappings"     : {
                "id"              : "@generateId(data.profile._json.company)",
                "organisationName": "@cleanString(data.profile._json.company)"
            }
        },
        "keys" : {
            "output": [],
            "innerDocument": "!experience.values",
            "value": "id"
        }
    },
    "emails" : {
        "values" : {
            "output": {},
            "key": "@generateId(data.profile._json.email)",
            "innerDocument": "!",
            "required": ["value"],
            "mappings"     : {
                "id"   : "@generateId(data.profile._json.email)",
                "value": "@cleanEmail(data.profile._json.email)",
                "type" : ">>github"
            }
        },
        "keys" : {
            "output": [],
            "innerDocument": "!emails.values",
            "value": "id"
        }
    },
    "location": {
        "address": "data.profile._json.location"
    },
    "createdAt": "@!new Date()",
    "creationSource": {
        "value": "source"
    }
}
