'use strict';

module.exports = {
    "name": "firstName",
    "default_name": "nonExistingProperty||>>this_should_be_the_firstName",
    "nickname": "nickname||>>nickname_not_found",
    "isNickNameFound": "nickname||>>%false",
    "isDynamicDefault": "nickname||firstName",
    "fullName": "@concatName(firstName|middleName|lastName)",
	"fullNameDefaultHardcoded": "@concatName(firstName|lastName|*>>default)",
    "fullName_withNotFoundMiddle": "@concatName(firstName|fullName.middleName|lastName)",
    "fullNameDefault": "@concatName(firstName|*!fullName_withNotFoundMiddle)",
    "completeName": "@concatName(firstName|!fullName)",
    "displayName": "!fullName",
    "email": {
        "value": "email"
    },
    "links": "links",
    "website_addresses": {
        "output": {},
        "innerDocument": "linksv2.values.*",
        "prerequisite": "!!innerResult.value && !!innerResult.keys && !!innerResult.keys.length",
        "mappings": {
            "$$key": "id",
            "value": "value??keys[0]#==#>>f5e32a6faaa7ead6ba201e8fa25733ee",
            "type": ">>other",
            "keys": "keys"
        }
    },
    "social_links_objects": {
        "output"       : {},
        "innerDocument": "links",
        "mappings" : {
            "$$key": "@generateId(!)",
            "value": "!"
        }
    },
    "experience_object": {
        "values": {
            "output": {},
            "innerDocument": "work",
            "mappings": {
                "$$key": "@generateId(companyName|title)",
				"id": "@generateId(companyName|title)",
                "name": "companyName",
                "role": "title",
                "startDate": "startDate",
                "current": "current"
            }
        }
    },
    "website_addresses_keyless": {
        "output": [],
        "innerDocument": "linksv2.values.*",
        "required": ["value"],
        "mappings": {
            "value": "value??type#==#>>website",
            "type": ">>other",
        }
    },
    "social_media_addresses": {
        "output": [],
        "innerDocument": "linksv2.values.*",
        "required": ["value"],
        "requirements": ["@uniqueArray(social_media_addresses|>>value)", "@transformTwitterHandle(value)"],
        "mappings": {
            "value": "value??type#==#>>social"
        }
    },
    "messaging": {
        "output": [],
        "innerDocument": "linksv2.values.*",
        "required": ["value"],
        "mappings": {
            "service": "@getLinkService(value|service)",
            "type": "@getLinkType(value|@getLinkService(value,service))",
            "value": "@cleanURI(value|@getLinkType(value,@getLinkService(value,service)))??@getLinkType(value|@getLinkService(value,service))#==#>>messaging"
        }
    },
    "experience": {
        "output": [],
        "innerDocument": "work",
        "mappings": {
            "name": "companyName",
            "role": "title",
            "startDate": "@parseDate(startDate)",
            "current": "current"
        }
    },
    "primaryExperience": "!experience[0]",
    "primaryRole": "!experience[0].role",
    "experiences": {
        "output": [],
        "innerDocument": "work",
        "value": "companyName"
    },
    "volunteer": {
        "output": [],
        "innerDocument": "volunteer",
        "value": "@concatName(organisation|>> at |title)"
    },
    "primaryPhoto": "@createURL(>>http://photo.com/|!fullNameDefault)"
}
