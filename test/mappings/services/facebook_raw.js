"use strict";

/*
 * @description The mapping file between the Facebook API and the sherlock model
 * The key represents the Facebook field name and the value is the mapped sherlock field name
 * If the value is an object this means that the Facebook field is an object and we need to map
 * the internal fields as well
 *
 * SPECIAL: keys that start with ^^ mean that they do not exist in Facebook but will be hardoded
 * in sherlock e.g. type field for social links, chat and websites
 * @returns {Object}
 */

module.exports = {
    "id"          : "@generateUUID(>>id)",
    "fullName"    : "@concatName(data.first_name|data.last_name)",
    "firstName"   : "data.first_name",
    "lastName"    : "data.last_name",
    "gender"      : "data.gender",
    "birthday"    : "data.birthday",
    "links"       : {
        "values" : {
            "output": {},
            "key": "@generateIdForLinks(data.link)",
            "required": ["value"],
            "mappings"     : {
                "id"      : "@generateIdForLinks(data.link)",
                "type"    : ">>social",
                "value"   : "data.link",
                "service" : ">>facebook",
                "username": "data.id",
                "userId"  : "data.id"
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
            "key": "@generateId(data.email)",
            "required": ["value"],
            "mappings"     : {
                "id"   : "@generateId(data.email)",
                "value": "@cleanEmail(data.email)",
                "type" : ">>facebook"
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
    "experience": {
        "values" : {
			"output"       : {},
			"key"          : "@generateId(position.name|employer.name)",
			"innerDocument": "data.work",
			"required"     : ["id"],
            "mappings"     : {
                "id"              : "@generateId(position.name|employer.name)",
                "startDate"       : "@parseDate(start_date)",
                "endDate"         : "@parseDate(end_date)",
                "organisationName": "@cleanString(employer.name)",
                "location"        : "location.name",
                "role"            : "@cleanString(position.name)"
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
			"key"          : "@generateId(school.name|type)",
			"innerDocument": "data.education",
			"required"     : ["id"],
            "mappings"     : {
                "id"              : "@generateId(school.name|type)",
                "organisationName": "@cleanString(school.name)",
                "endDate"         : "@parseDate(year.name)",
                "level"           : "@cleanString(type)",
                "degree"          : "@cleanString(type)"
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
			"output"       : {},
			"key"          : "@generateId(data.picture.data.url)",
			"required"     : ["value"],
			"mappings"     : {
                "id"   : "@generateId(data.picture.data.url)",
                "value": "data.picture.data.url"
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
