"use strict";

/*
 * @description The mapping file between the Facebook API and the sherlock model
 * The key represents the Facebook field name and the value is the mapped sherlock field name
 * If the value is an object this means that the Facebook field is an object and we need to map
 * the internal fields as well
 * @returns {Object}
 */

module.exports = {
    "id"          : "@generateUUID(>>id)",
    "firstName"   : "data.profile.name.givenName",
    "lastName"    : "data.profile.name.familyName",
    "fullName"    : "@concatName(data.profile.name.givenName|data.profile.name.familyName)",
    "gender"      : "data.profile.gender",
    "birthday"    : "data.profile.birthday",
    "links"       : {
        "values" : {
            "output": {},
            "key": "@generateIdForLinks(data.profile.profileUrl)",
            "innerDocument": "!",
            "required": ["value"],
            "mappings"     : {
                "id"      : "@generateIdForLinks(data.profile.profileUrl)",
                "type"    : ">>social",
                "value"  : "@cleanURI(data.profile.profileUrl|@getLinkType(value,@getLinkService(value,service)))",
                "service" : ">>facebook",
                "username": "data.profile.id",
                "userId"   : "data.profile.id"
            }
        },
        "keys" : {
            "output": [],
            "innerDocument": "!links.values",
            "value": "id"
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
                "type" : ">>facebook"
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
            "key": "@generateId(data.profile.id)",
            "innerDocument": "!",
            "required": ["value"],
            "mappings"     : {
                "id"       : "@generateId(data.profile.id)",
                "type"     : ">>facebook",
                "value"    : "@generateFacebookImageLink(data.profile.id)"
            }
        },
        "keys" : {
            "output": [],
            "innerDocument": "!photos.values",
            "value": "id"
        }
    },
    "experience": {
        "values" : {
			"output"       : {},
			"key"          : "@generateId(position.name|employer.name)",
			"innerDocument": "data.profile._json.work",
			"required"     : ["id"],
            "mappings"     : {
                "id"              : "@generateId(position.name|employer.name)",
                "startDate"       : "@parseDate(start_date)",
                "endDate"         : "@parseDate(end_date)",
                "organisationName": "@cleanString(employer.name)",
                "role"            : "@cleanString(position.name)"
            }
        },
        "keys" : {
            "output": [],
            "innerDocument": "!experience.values",
            "value": "id"
        }
    },
    "education" : {
        "values" : {
			"output"       : {},
			"key"          : "@generateId(school.name|type)",
			"innerDocument": "data.profile._json.education",
			"required"     : ["id"],
            "mappings"     : {
                "id"              : "@generateId(school.name|type)",
                "organisationName": "@cleanString(school.name)",
                "level"           : "@cleanString(type)",
                "degree"          : "@cleanString(type)",
                "endDate"         : "@parseDate(year.name)"
            }
        },
        "keys" : {
            "output": [],
            "innerDocument": "!education.values",
            "value": "id"
        }
    },
    "createdAt": "@!new Date()",
    "creationSource": {
        "value": "source"
    }
}
