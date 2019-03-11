"use strict";

const Unifier    = require('./unifier/unifier');
const mappings   = require('./mappings/mappings');
const unifiers   = require('./unifier/unifiers');

function unifier() {

    const _unifier = new Unifier();

    /**
    * Get results of the unification functions
    *
    * @function unify
    * @param {Object} document the original document to be mapped
    * @param {Function} callback the callback from the processing function
    */

    this.start = function (document, customService){
        // service is the name of the unification service e.g., fullContact, linkedin, facebook, etc.
        const service = customService || document.source;
        /**
         * Instead of initializing everytime a separate object, if the unifier object is not defined
         * this means that the unification will be done in a standard fashion using a specific mapping file
         * We need to set the mapping and just call the main unification function
         */
        return !!unifiers[service] ?  unifiers[service]() : _unifier.unify(document, mappings[service]);

    }
}

module.exports  = unifier;
