'use strict';

module.exports = {
  "name": "Ahmad",
  "default_name": "this_should_be_the_firstName",
  "nickname": "nickname_not_found",
  "isNickNameFound": false,
  "isDynamicDefault": "Ahmad",
  "fullName": "Ahmad Ahmad AbdelMuti Assaf",
  "fullNameDefault": "Ahmad Assaf",
  "fullNameDefaultHardcoded": "default",
  "fullName_withNotFoundMiddle"     : "Ahmad Assaf",
  "completeName": "Ahmad Ahmad Ahmad AbdelMuti Assaf",
  "displayName": "Ahmad Ahmad AbdelMuti Assaf",
  "email": {
    "value": "ahmad.a.assaf@gmail.com"
  },
  "links": [
    "http://a.com",
    "http://b.com",
    "http://c.com"
  ],
  "messaging": [{
    "service": "skype",
    "type": "messaging",
    "value": "ahmad.a.assaf"
  }],
  "social_links": [{
    "value": "http://a.com",
    "type": "test",
    "order": 0,
    "social": true
  }, {
    "value": "http://b.com",
    "type": "test",
    "order": 1,
    "social": true
  }, {
    "value": "http://c.com",
    "type": "test",
    "order": 2,
    "social": true
  }, {
    "value": "http://github.com/ahmadassaf",
    "service": "github",
    "type": "social"
  }, {
    "value": "http://twitter.com/ahmadaassaf",
    "service": "twitter",
    "type": "social"
  }],
  "social_links_objectified": {
    "http://a.com": {
      "value": "http://a.com",
      "type": "test",
      "order": 0,
      "social": true
    },
    "http://b.com": {
      "value": "http://b.com",
      "type": "test",
      "order": 1,
      "social": true
    },
    "http://c.com": {
      "value": "http://c.com",
      "type": "test",
      "order": 2,
      "social": true
    },
    "http://github.com/ahmadassaf": {
      "value": "http://github.com/ahmadassaf",
      "service": "github",
      "type": "social"
    },
    "http://twitter.com/ahmadaassaf": {
      "value": "http://twitter.com/ahmadaassaf",
      "service": "twitter",
      "type": "social"
    }
  },
  "website_addresses_keyless": [{
    "value": "https://gravatar.com/ahmadassaf",
    "type": "other"
  }, {
    "value": "http://klout.com/ahmadassaf",
    "type": "other"
  }, {
    "value": "http://ahmadassaf.com",
    "type": "other"
  }],
  "website_addresses": {
    "f5e32a6faaa7ead6ba201e8fa25733ee": {
      "value": "http://klout.com/ahmadassaf",
      "type": "other",
      "keys": [
        "f5e32a6faaa7ead6ba201e8fa25733ee"
      ]
    }
  },
  "social_media_addresses": [{
    "value": "@ahmadaassaf"
  }],
  "social_links_objects": {
    "388495550d157e5c5d299b7ecfeb1c2d": {
      "value": "http://a.com"
    },
    "715af3fd14408eda374ef3bcb23c10b6": {
      "value": "http://b.com"
    },
    "e5bd27f12c3d3e03d1c4463bf0dfa035": {
      "value": "http://c.com"
    }
  },
  "experience": [{
    "name": "beamery",
    "role": "Data Scientist",
    "startDate": new Date("2015-08-28T00:00:00.000Z"),
    "current": true
  }, {
    "name": "SAP",
    "role": "Associate Researcher",
    "current": false
  }],
  "experience_primary": {
    "values": {
      "cd094dd92fe6ec408206c38421d0c835": {
        "id": "cd094dd92fe6ec408206c38421d0c835",
        "role": "Data Scientist",
        "organisationName": "Beamery"
      }
    }
  },
  "primaryExperience": {
    "name": "beamery",
    "role": "Data Scientist",
    "startDate": new Date("2015-08-28T00:00:00.000Z"),
    "current": true
  },
  "primaryRole": "Data Scientist",
  "experiences": [
    "beamery",
    "SAP"
  ],
  "experience_object": {
    "values": {
      "894b6152a9dde92713a40590f6f4d5b8": {
        "id": "894b6152a9dde92713a40590f6f4d5b8",
        "name": "beamery",
        "role": "Data Scientist",
        "startDate": "2015-08-28",
        "current": true
      },
      "31465d14a616920720fac760c503ada7": {
        "id": "31465d14a616920720fac760c503ada7",
        "name": "SAP",
        "role": "Associate Researcher",
        "current": false
      }
    }
  },
  "education": [{
    "universityName": "telecomParisTech",
    "degree": "phd",
    "location": "france"
  }, {
    "universityName": "st-andrews",
    "degree": "masters"
  }],
  "education_object": {
    "6ea8c4cf5c35861ba3b690f93828e44f": {
      "degree": "phd",
      "location": "france"
    },
    "e4cf0b80ab478731917804503b2f3fc3": {
      "degree": "masters",
      "universityName": "University of St.Andrews"
    }
  },
  "primaryPhoto": "http://photo.com/ahmadassaf",
  "createdAt": "2019-01-01T00:00:00.000Z"
}
