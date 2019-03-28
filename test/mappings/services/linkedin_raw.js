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
    "id"       : "@generateUUID(>>id)",
    "fullName" : "data.formattedName",
    "firstName": "data.firstName",
    "lastName": "data.lastName",
    "links"       : {
        "values" : {
            "output": {},
            "key": "@generateIdForLinks(data.publicProfileUrl)",
            "required": ["value"],
            "mappings"     : {
                "id"      : "@generateIdForLinks(data.publicProfileUrl)",
                "type"     : ">>social",
                "value"  : "@cleanURI(data.publicProfileUrl|@getLinkType(value,@getLinkService(value,service)))",
                "service"  : ">>linkedin",
                "username" : "data.id",
                "userId"   : "data.id",
                "bio"      : "data.summary",
                "following": "data.numConnections"
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
            "key": "@generateId(data.emailAddress)",
            "required": ["value"],
            "mappings"     : {
                "id"   : "@generateId(data.emailAddress)",
                "value": "@cleanEmail(data.emailAddress)",
                "type" : ">>linkedin"
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
    "location": {
        "address"    : "data.location.name",
        "countryCode": "data.location.country.code"
    },
    "experience": {
        "values" : {
			"output"       : {},
			"innerDocument": "data.positions.values",
			"key"          : "@generateId(title|company.name)",
			"required"     : ["id"],
            "mappings"     : {
                "id"              : "@generateId(title|company.name)",
                "startDate"       : "@parseDate(startDate.year|startDate.month)",
                "endDate"         : "@parseDate(endDate.year|endDate.month)",
                "description"     : "summary",
                "role"            : "@cleanString(title)",
                "current"         : "isCurrent",
                "organisationName": "@cleanString(company.name)"
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
    "education" : {
        "values" : {
			"output"       : {},
			"key"          : "@generateId(schoolName|type|fieldOfStudy)",
			"innerDocument": "data.educations.values",
			"required"     : ["id"],
            "mappings"     : {
                "id"              : "@generateId(schoolName|type|fieldOfStudy)",
                "startDate"       : "@parseDate(startDate.year|startDate.month)",
                "endDate"         : "@parseDate(endDate.year|endDate.month)",
                "degree"          : "@cleanString(degree)",
                "major"           : "fieldOfStudy",
                "description"     : "@cleanString(notes)",
                "level"           : "@cleanString(type)",
                "organisationName": "@cleanString(schoolName)"
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
    "languages" : {
        "values" : {
            "output": {},
            "key": "@generateId(language.name)",
            "innerDocument": "data.languages.values",
            "required": ["value"],
            "mappings"     : {
                "id"   : "@generateId(language.name)",
                "value": "language.name"
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
            "key": "@generateId(!)",
            "innerDocument": "data.pictureUrls.values",
            "required": ["value"],
            "mappings"     : {
                "id"   : "@generateId(!)",
                "value": "!"
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
