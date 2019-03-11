"use strict";

/*
 * @description The mapping file between the Linkedin API and the sherlock model
 * The key represents the Linkedin field name and the value is the mapped sherlock field name
 * If the value is an object this means that the Linkedin field is an object and we need to map
 * the internal fields as well
 *
 * SPECIAL: keys that start with ^^ mean that they do not exist in Linkedin but will be hardoded
 * in sherlock e.g. type field for social links, chat and websites
 * @returns {Object}
 */

module.exports = {
    "id"            :  "@generateUUID(>>id)",
    "fullName"      :  "@concatName(data.profile.name.givenName|data.profile.name.familyName)",
    "firstName"      : "data.profile.name.givenName",
    "lastName"       : "data.profile.name.familyName",
    "links"       : {
        "values" : {
            "output": {},
            "key": "@generateIdForLinks(data.profile._json.publicProfileUrl)",
            "innerDocument": "!",
            "required": ["value"],
            "mappings"     : {
                "id"       : "@generateIdForLinks(data.profile._json.publicProfileUrl)",
                "type"     : ">>social",
                "value"    : "@cleanURI(data.profile._json.publicProfileUrl|type)",
                "service"  : ">>linkedin",
                "username" : "data.profile.id",
                "userId"   : "data.profile.id",
                "bio"      : "data.profile._json.summary",
                "following": "data.profile._json.numConnections"
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
                "type" : ">>linkedin"
            }
        },
        "keys" : {
            "output": [],
            "innerDocument": "!emails.values",
            "value": "id"
        }
    },
    "location": {
        "address"    : "data.profile._json.location.name",
        "countryCode": "data.profile._json.location.country.code"
    },
    "experience": {
        "values" : {
			"output"       : {},
			"key"          : "@generateId(title|company.name)",
			"innerDocument": "data.profile._json.positions.values",
			"required"     : ["id"],
            "mappings"     : {
                "id"              : "@generateId(title|company.name)",
                "startDate"       : "@parseDate(startDate.year|startDate.month)",
                "endDate"         : "@parseDate(endDate.year|endDate.month)",
                "organisationName": "@cleanString(company.name)",
                "description"     : "summary",
                "role"            : "@cleanString(title)",
                "current"         : "isCurrent"
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
			"key"          : "@generateId(schoolName|type|fieldOfStudy)",
			"innerDocument": "data.profile._json.educations.values",
			"required"     : ["id"],
            "mappings"     : {
                "id"              : "@generateId(schoolName|type|fieldOfStudy)",
                "startDate"       : "@parseDate(startDate.year|startDate.month)",
                "endDate"         : "@parseDate(endDate.year|endDate.month)",
                "degree"          : "@cleanString(degree)",
                "major"           : "@cleanString(fieldOfStudy)",
                "description"     : "notes",
                "level"           : "@cleanString(type)",
                "organisationName": "@cleanString(schoolName)"
            }
        },
        "keys" : {
            "output": [],
            "innerDocument": "!education.values",
            "value": "id"
        }
    },
    "languages" : {
        "values" : {
            "output": {},
            "key": "@generateId(language.name)",
            "innerDocument": "data.profile._json.languages.values",
            "required": ["value"],
            "mappings"     : {
                "id"   : "@generateId(language.name)",
                "value": "language.name"
            }
        },
        "keys" : {
            "output": [],
            "innerDocument": "!languages.values",
            "value": "id"
        }
    },
    "photos" : {
        "values" : {
            "output": {},
            "key": "@generateId(data.profile._json.pictureUrl)",
            "innerDocument": "!",
            "required": ["value"],
            "mappings"     : {
                "id"   : "@generateId(data.profile._json.pictureUrl)",
                "value": "data.profile._json.pictureUrl"
            }
        },
        "keys" : {
            "output": [],
            "innerDocument": "!photos.values",
            "value": "id"
        }
    },
    "createdAt": "@!new Date()",
    "creationSource": {
        "value": "source"
    }
}
