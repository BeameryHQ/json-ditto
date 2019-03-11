"use strict";
var mappings =  {
    "facebook"                      : require('./services/facebook'),
    "facebook_raw"                  : require('./services/facebook_raw'),
    "linkedin"                      : require('./services/linkedin'),
    "linkedin_raw"                  : require('./services/linkedin_raw'),
    "github"                        : require('./services/github'),
    "github_raw"                    : require('./services/github_raw'),
    "google"                        : require('./services/google'),
    "google_raw"                    : require('./services/google_raw')
};

module.exports = mappings;
