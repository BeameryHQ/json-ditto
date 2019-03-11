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

/*
 *  The Google API call to get response with current structure
 *  https://www.googleapis.com/oauth2/v1/userinfo
 */

module.exports = {
    "id"         : "@generateUUID(>>id)",
    "fullName"   : "name",
    "firstName"  : "data.given_name",
    "lastName"   : "data.family_name",
    "gender"     : "data.gender",
    "links"       : {
        "values" : {
            "output": {},
            "key": "@generateIdForLinks(data.link)",
            "innerDocument": "!",
            "required": ["value"],
            "mappings"     : {
                "id"      : "@generateIdForLinks(data.link)",
                "type"    : ">>social",
                "username": "data.id",
                "userId"  : "data.id",
                "value"    : "@cleanURI(data.link|@getLinkType(value,@getLinkService(value,service)))",
                "service" : ">>google"
            }
        },
        "keys" : {
            "output": [],
            "innerDocument": "!links.values",
            "value": "id"
        }
    },
    "photos" : {
        "values" : {
            "output": {},
            "key": "@generateId(data.picture)",
            "innerDocument": "!",
            "required": ["value"],
            "mappings"     : {
                "id"   : "@generateId(data.picture)",
                "value": "data.picture",
                "type" : ">>google"
            }
        },
        "keys" : {
            "output": [],
            "innerDocument": "!photos.values",
            "value": "id"
        }
    },
    "emails" : {
        "values" : {
            "output": {},
            "key": "@generateId(data.email)",
            "innerDocument": "!",
            "required": ["value"],
            "mappings"     : {
                "id"   : "@generateId(data.email)",
                "value": "@cleanEmail(data.email)",
                "type" : ">>google"
            }
        },
        "keys" : {
            "output": [],
            "innerDocument": "!emails.values",
            "value": "id"
        }
    },
    "createdAt": "@!new Date()",
    "creationSource": {
        "value": "source"
    }
}
