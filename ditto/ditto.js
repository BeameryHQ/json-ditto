'use strict';

const _              = require('lodash');
const assert         = require('assert');

let defaultPlugins   = require('./plugins/index');

class Ditto {

    // TODO: Fix this when we have a supportive Node version for ES6 default parameters
    constructor(mappings, plugins) {

        this.mappings = mappings;
        this.plugins  = plugins ? _.merge(defaultPlugins, plugins) : defaultPlugins;
    }

    /**
     * @function addPlugins
     *
     * @description Add extra set of plugins to the default ones
     * @param {Object} plugins the extra plugins passed to be added to the default set of ditto plugins
     */
    addPlugins(plugins) {

        assert.ok(plugins, 'The ditto function should have a valid array of plugins defined to be set');

        this.plugins = _.merge(defaultPlugins, plugins);
    }

    /**
     * @function unify
     *
     * @description Start the unification process
     * @param {Object} document the database document to be unified
     * @param {Object} mappings the mapping JSON schema
     * @param {Function} callback the callback function to be executed after the unification is done
     */
    async unify(document, mappings) {

        const _preMap = require('./mappers/premap');
        const _map = require('./mappers/map');
        const _postMap = require('./mappers/postmap');

        /**
         * Check if we pass arguments to the unify function. This will mean that we have a generic class the
         * implements this interface and will be used with various mappers and documents
         * We will pass each time we call the unify a new mapping file and a document to be mapped and not rely on the
         * global ones defined on initialization
         */

        if (document) {
            this.document = document;
        }
        if (mappings) {
            this.mappings = mappings;
        }

        assert.ok(this.document, 'The ditto does not have a valid source document to unify');
        assert.ok(this.mappings, 'The ditto does not have a valid mapping set defined');

        const preMap = await _preMap(this.document);
        const map = await _map(preMap, this.mappings, this.plugins);
        const postMap = await _postMap(map);

        return postMap;
    }
}

module.exports = Ditto;
