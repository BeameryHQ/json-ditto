"use strict";

/*
 * @description The mapping file between the Google API and the sherlock model
 * The key represents the Google field name and the value is the mapped sherlock field name
 * If the value is an object this means that the Google field is an object and we need to map
 * the internal fields as well
 *
 * SPECIAL: keys that start with ^^ mean that they do not exist in Google but will be hardoded
 * in sherlock e.g. type field for social links, chat and websites
 * @returns {Object}
 */

module.exports = {
    "id"         : "@generateUUID(>>id)",
    "fullName"   : "data.profile.displayName",
    "firstName"  : "data.profile.name.givenName",
    "lastName"   : "data.profile.name.familyName",
    "gender"     : "data.profile._json.gender",
    "links"       : {
        "values" : {
            "output": {},
            "key": "@generateIdForLinks(data.profile._json.link)",
            "required": ["value"],
            "mappings"     : {
                "id"      : "@generateIdForLinks(data.profile._json.link)",
                "type"    : ">>social",
                "username": "data.profile._json.id",
                "userId"  : "data.profile.id",
                "value"    : "@cleanURI(data.profile._json.link|@getLinkType(value,@getLinkService(value,service)))",
                "service" : ">>google"
            }
        },
        "keys" : {
            "output": [],
            "innerDocument": "!values",
            "$push": true,
            "mappings": {
                "$value": "id"
            }
        }
    },
    "photos" : {
        "values" : {
            "output": {},
            "key": "@generateId(data.profile._json.picture)",
            "required": ["value"],
            "mappings"     : {
                "id"   : "@generateId(data.profile._json.picture)",
                "value": "data.profile._json.picture",
                "type" : ">>google"
            }
        },
        "keys" : {
            "output": [],
            "innerDocument": "!values",
            "$push": true,
            "mappings": {
                "$value": "id"
            }
        }
    },
    "emails" : {
        "values" : {
            "output": {},
            "key": "@generateId(value)",
            "innerDocument": "data.profile.emails",
            "required": ["value"],
            "mappings"     : {
               "id"   : "@generateId(value)",
               "value": "@cleanEmail(value)",
               "type" : ">>google"
            }
        },
        "keys" : {
            "output": [],
            "innerDocument": "!values",
            "$push": true,
            "mappings": {
                "$value": "id"
            }
        }
    },
    "createdAt": "@!new Date()",
    "creationSource": {
        "value": "source"
    }
}
