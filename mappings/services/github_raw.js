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
    "fullName" : "data.name",
    "firstName": "@extractName(data.name|>>firstName)",
    "links"       : {
        "values" : [{
            "output": {},
            "key": "@generateIdForLinks(data.html_url)",
            "innerDocument": "!",
            "required": ["value"],
            "mappings"     : {
                "id"      : "@generateIdForLinks(data.html_url)",
                "type"     : ">>social",
                "value"    : "@cleanURI(data.html_url|@getLinkType(value,@getLinkService(value,service)))",
                "service"  : ">>github",
                "username" : "data.login",
                "userId"   : "@parseString(data.id)",
                "following": "data.following",
                "followers": "data.followers"
            }
        },{
            "output": {},
            "innerDocument": "!",
            "key": "@generateId(data.blog)",
            "required": ["value"],
            "mappings"     : {
                "id"      : "@generateId(data.blog)",
                "type"     : ">>website",
                "value"    : "data.blog"
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
            "key": "@generateId(data.company)",
            "innerDocument": "!",
            "required": ["organisationName"],
            "mappings"     : {
                "id"              : "@generateId(data.company)",
                "organisationName": "@cleanString(data.company)"
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
            "key": "@generateId(data.email)",
            "innerDocument": "!",
            "required": ["value"],
            "mappings"     : {
                "id"   : "@generateId(data.email)",
                "value": "@cleanEmail(data.email)",
                "type" : ">>github"
            }
        },
        "keys" : {
            "output": [],
            "innerDocument": "!emails.values",
            "value": "id"
        }
    },
    "photos" : {
        "values" : {
            "output": {},
            "key": "@generateId(data.avatar_url)",
            "innerDocument": "!",
            "required": ["value"],
            "mappings"     : {
                "id"   : "@generateId(data.avatar_url)",
                "value": "data.avatar_url"
            }
        },
        "keys" : {
            "output": [],
            "innerDocument": "!photos.values",
            "value": "id"
        }
    },
    "location": {
        "address": "data.location"
    },
    "createdAt": "@!new Date()",
    "creationSource": {
        "value": "source"
    }
}
