'use strict';

module.exports = {
	"name"                    : "firstName",
	"default_name"            : "nonExistingProperty||>>this_should_be_the_firstName",
	"nickname"                : "nickname||>>nickname_not_found",
	"isNickNameFound"         : "nickname||>>%false",
    "isDynamicDefault"        : "nickname||firstName",
	"fullName"                : "@concatName(firstName|lastName)",
	"fullNameDefault"         : "@concatName(firstName|*!fullName)",
	"fullNameDefaultHardcoded": "@concatName(firstName|lastName|*>>default)",
	"completeName"            : "@concatName(firstName|!fullName)",
	"displayName"             : "!fullName",
    "email": {
        "value": "email"
    },
    "links": "links",
    "social_links": [{
        "output"       : [],
        "innerDocument": "!links",
        "required": ["value"],
        "mappings"     : {
            "value": "$value",
            "type": ">>test",
            "order": "$key",
            "social": ">>%true"
        }
    },{
        "output"       : [],
        "innerDocument": "social",
        "required": ["value"],
        "mappings"     : {
            "value"  : "value",
            "service": "service",
            "type": ">>social"
        }
    }],
    "website_addresses_keyless": {
        "output": [],
        "innerDocument": "linksv2.values",
        "prerequisite": "!!innerResult.value",
        "mappings": {
            "value": "value??type#==#>>website",
            "type": ">>other",
        }
    },
    "website_addresses": {
        "output": {},
        "innerDocument": "linksv2.values",
        "key": "id",
        "prerequisite": "!!innerResult.value && !!innerResult.keys && !!innerResult.keys.length",
        "mappings": {
            "value": "value??keys[0]#==#>>f5e32a6faaa7ead6ba201e8fa25733ee",
            "type": ">>other",
            "keys": "keys"
        }
    },
    "social_media_addresses": {
        "output": [],
        "innerDocument": "linksv2.values",
        "prerequisite": "!!innerResult.value",
        "requirements": ["@uniqueArray(!social_media_addresses|>>value)", "@transformTwitterHandle(!social_media_addresses)"],
        "mappings": {
            "value": "value??type#==#>>social"
        }
    },
    "messaging": {
        "output": [],
        "innerDocument": "linksv2.values",
        "prerequisite": "!!innerResult.value",
        "mappings": {
            "service": "@getLinkService(value|service)",
            "type"   : "@getLinkType(value|@getLinkService(value,service))",
            "value"  : "@cleanURI(value|@getLinkType(value,@getLinkService(value,service)))??@getLinkType(value|@getLinkService(value,service))#==#>>messaging"
        }
    },
    "social_links_objects": {
        "output"       : {},
        "innerDocument": "!links",
        "key": "@generateId($value)",
        "mappings" : {
            "value": "$value"
        }
    },
    "experience_primary": {
        "values": {
            "output"       : {},
            "innerDocument": "!",
            "key"          : "@generateId(title|company)",
            "mappings"     : {
		            "id"              : "@generateId(title|company)",
                "role"            : "title",
                "organisationName": "company"
            }
        }
    },
    "experience": {
        "output": [],
        "innerDocument": "work",
        "mappings": {
            "name"     : "companyName",
            "role"     : "title",
            "startDate": "@parseDate(startDate)",
            "current"  : "current"
        }
    },
    "primaryExperience": "!experience[0]",
    "primaryRole": "!experience[0].role",
    "experiences": {
        "output": [],
        "innerDocument": "work",
        "value": "companyName"
    },
    "experience_object": {
        "values": {
            "output": {},
            "innerDocument": "work",
            "key": "@generateId(companyName|title)",
            "mappings": {
				"id": "@generateId(companyName|title)",
                "name": "companyName",
                "role": "title",
                "startDate": "startDate",
                "current": "current"
            }
        }
    },
    "education": {
        "output": [],
        "innerDocument": "json.education",
        "mappings": {
            "universityName": "$key",
            "degree": "degree",
            "location": "location"
        }
    },
    "education_object": {
        "output": {},
        "key": "@generateId($key|degree)",
        "innerDocument": "json.education",
        "mappings": {
            "degree": "degree",
            "location": "location",
            "universityName": "universityName"
        }
    },
    "primaryPhoto": "@createURL(>>http://photo.com/|!fullName)"
}
