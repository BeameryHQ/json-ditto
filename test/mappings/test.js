const _ = require('lodash');

module.exports = {
    "name": "firstName",
    "default_name": "nonExistingProperty||>>this_should_be_the_firstName",
    "nickname": "nickname||>>nickname_not_found",
    "isNickNameFound": "nickname||>>%false",
    "isDynamicDefault": "nickname||firstName",
    "fullName": "@concatName(firstName|middleName||>>AbdelMuti|lastName)",
    "fullNameDefaultHardcoded": "@concatName(nonExistingProperty)||>>default",
    "fullName_withNotFoundMiddle": "@concatName(firstName|fullName.middleName|lastName)",
    "fullNameDefault": "!fullName_withNotFoundMiddle",
    "completeName": "@concatName(firstName|!fullName)",
    "displayName": "!fullName",
    "email": {
        "value": "email"
    },
    "links": "links",
    "social_links_objectified": [{
        "output": {},
        "innerDocument": "links",
        "required": ["value"],
        "key": "!",
        "mappings": {
            "value": "!",
            "type": ">>test",
            "order": "$key",
            "social": ">>%true"
        }
    }, {
        "output": {},
        "innerDocument": "social",
        "required": ["value"],
        "key": "value",
        "mappings": {
            "value": "value",
            "service": "service",
            "type": ">>social"
        }
    }],
    "social_links": [{
        "output": [],
        "innerDocument": "links",
        "required": ["value"],
        "mappings": {
            "value": "!",
            "type": ">>test",
            "order": "$key",
            "social": ">>%true"
        }
    }, {
        "output": [],
        "innerDocument": "social",
        "required": ["value"],
        "mappings": {
            "value": "value",
            "service": "service",
            "type": ">>social"
        }
    }],
    "messaging": {
        "output": [],
        "innerDocument": "linksv2.values",
        "required": ["value"],
        "mappings": {
            "service": "@getLinkService(value|service)",
            "type": "@getLinkType(value|@getLinkService(value,service))",
            "value": "@cleanURI(value|@getLinkType(value,@getLinkService(value,service)))??@getLinkType(value|@getLinkService(value,service))#===#>>messaging"
        }
    },
    "website_addresses_keyless": {
        "output": [],
        "innerDocument": "linksv2.values",
        "required": ["value"],
        "mappings": {
            "value": "value??type#===#>>website",
            "type": ">>other",
        }
    },
    "website_addresses": {
        "output": {},
        "innerDocument": "linksv2.values",
        "required": ["value"],
        "prerequisite": "!!innerResult.value && !!innerResult.keys && !!innerResult.keys.length",
        "key": "id",
        "mappings": {
            "value": "value??keys[0]#===#>>f5e32a6faaa7ead6ba201e8fa25733ee",
            "type": ">>other",
            "keys": "keys"
        }
    },
    "social_media_addresses": {
        "output": [],
        "innerDocument": "linksv2.values",
        "required": ["value"],
        "requirements": ["@uniqueArray(!|>>value)"],
        "mappings": {
            "value": "@transformTwitterHandle(value)??service#===#>>twitter"
        }
    },
    "social_links_objects": {
        "output": {},
        "innerDocument": "links",
        "key": "@generateId(!)",
        "mappings": {
            "value": "!"
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
    "experience_primary": {
        "values": {
            "output": {},
            "key": "@generateId(title|company)",
            "mappings": {
                "id": "@generateId(title|company)",
                "role": "title",
                "organisationName": "company"
            }
        }
    },
    "primaryExperience": "!experience[0]",
    "primaryRole": "!experience[0].role",
    "experiences": {
        "output": [],
        "innerDocument": "work",
        "$push": true,
        "mappings": {
            "$value": "companyName"
        }
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
        "innerDocument": "json.education",
        "key": "@generateId($key|degree)",
        "mappings": {
            "degree": "degree",
            "location": "location",
            "universityName": "universityName"
        }
    },
    // "volunteer": {
    //     "output": [],
    //     "innerDocument": "volunteer",
    //     "value": "@concatName(organisation|>> at |title)"
    // },
    "primaryPhoto": "@createURL(>>http://photo.com/|!fullNameDefault)",
    "createdAt": "@!new Date('2019').toISOString()"
}
