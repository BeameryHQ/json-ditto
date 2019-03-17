const _  = require('lodash');

/**
 * @function map
 *
 * @description Start the unification process based on the manual mapping files
 * @param {Object} document the database document to be unified
 * @param {Function} callback the callback function to be executed after the unification is done
 */
async function map(document, mappings, plugins) {

    /**
     * @function processMappings
     *
     * @description Process the mappings file and map it to the actual values
     * Check if the key is static or dynamic assignment. Static assignment assigns directly the
     * the hardcoded value into the result object after removing the extra >> signs
     * Otherwise, check if the path of the object exists. If so, check if the values have to be
     * added in an array (push) or just simple object assignment
     * If a prerequisite is defined then we will only assign the value if the prerequisite has passed
     *
     * @param {Object} document the object document we want to map
     * @param {Object} result the object representing the result file
     * @param {Object} mappings the object presenting the mappings between target document and mapped one
     */
    function processMappings(mappings, document, result, parentKey) {

        _.each(mappings, function(path, key) {

            key = parentKey ? `${parentKey}.${key}` : key;

            // The path can be multiple definitions for retreiving the same piece of information from multiple places
            // here we check for that and construct the appropriate document and mappings objects to deal with it
            if (_.isArray(path)) {
                _.each(path, function(subPath){
                    var subMapping = {};
                    subMapping[key] = subPath;
                    return processMappings(subMapping, document, result);
                });
            }

            // Check if the path presents a flat object with a value that can be accessible directly with an _.get
            if (!_.isPlainObject(path)) {
                let value = applyTransformation(key, path, document.$key, document.$value);

                // here we check if the parent key of the value is not defined and only define it at least one value is there
                // this resolves the issue of having an empty object defined e.g. location: {}
                // the check if (!_.isUndefined(value)) will make sure we have null values to be picked up
                // by our postMapper rather than having if (!_.isUndefined(value) && !!value) :)
                if (_.isString(value)) {
                    if (!!value.length) _.set(result, key, value);
                } else if (!_.isUndefined(value) && !_.isNull(value)) _.set(result, key, value);

            } else {

                // Check if the object is a nested object of objects or array of objects or not
                if (!path.output) {
                    // Instantiate the empty object in the desired key and pass it to the recursive function
                    return processMappings(path, document, result, key);

                } else {

                    // Reaching here we now know for sure that we will be creating a set of objects (array or object of objects)
                    // Assign the result object with its correct type defined in the path output
                    if (!_.has(result, key)) _.set(result, key, path.output)

                    _.each(applyTransformation('', path.innerDocument), function($value, $key) {

                        // first we need to check if we will be pushing objects or just plain items to an array
                        // This can be done by checking if we define a mappings object or not
                        if (path.mappings) {

                            var innerResult = {};
                            var processingDocument = path.innerDocument === '!' ? document : _.merge(_.cloneDeep($value), {$value: $value, $key: $key});

                            processMappings(path.mappings, processingDocument, innerResult);

                            if (_.isArray(path.required) &&
                                _.find(path.required, requiredPath => _.isNil(_.get(innerResult, requiredPath)))){
                                    innerResult = null;
                            }

                            parseMappings(result, innerResult, path, key, $value, $key);

                        } else {
                            // reaching here means that we are pushing only to a flat array and not an object
                            if (_.startsWith(path.value, '@')) {
                                _.updateWith(result, key, function(theArray){ return applyTransformation(key, path.value) }, []);
                                return false;
                            } else return _.updateWith(result, key, function(theArray){ theArray.push($value[path.value]); return theArray }, []);
                        }

                        // here we are breaking out of the each if we have defined the innerDocument as the parent document
                        if (path.innerDocument === '!') return false;
                    });

                    function parseMappings(result, innerResult, path, key, $value, $key) {
                        // based on the type of the result [] or {} we will either push or assign with key
                        if (!!innerResult) {
                            if (_.isArray(_.get(result,key))) {
                                if (!!path.prerequisite) {
                                    if (!!eval(path.prerequisite)) _.updateWith(result, key, function(theArray){ theArray.push(innerResult); return theArray }, []);
                                } else _.updateWith(result, key, function(theArray){ theArray.push(innerResult); return theArray }, []);
                            } else {
                                let fullPath = `${key}.${applyTransformation(key, path['key'], $key, $value)}`;
                                if (!!path.prerequisite) {
                                    if (!!eval(path.prerequisite)) _.set(result, fullPath, innerResult);
                                } else _.set(result, fullPath, innerResult);
                            }
                        }

                        // After assigning the innerResult we need to make sure that there are no requirements on it (e.g., unique array)
                        if (!!path.requirements) {
                            _.each(path.requirements, function(requirement){
                                _.set(result, key, applyTransformation(key, requirement, $key, $value));
                            });
                        }
                        return;
                    }
                }
            }
        });

        /** @function applyTransformation
         * @description Apply a tranformation function on a path
         *
         * @param  {String} path the path to pass for the _.get to retrieve the value
         * @param {String} key the key of the result object that will contain the new mapped value
         */
        function applyTransformation(key, path, $key, $value) {

            if (path.includes('??'))  {
                return getValue(path, $value);
            } else if (_.startsWith(path, '$'))  {
                return eval(path);
            } else if (_.startsWith(path, '@!')) {
                return eval(path.replace('@!', ''));
            } else if (_.startsWith(path, '@')) {

                /**
                 * The parts in the string function are split into:
                 * before the @ is the first paramteres passed to the function
                 * the function name is anything after the @ and the () if exists
                 * the paramteres are anything inside the () separated by a |
                 */
                let paramteresArray, paramteresValues = [];

                // Regular expression to extract any text between ()
                let functionParameteres  = path.match(/.+?\((.*)\)/);
                let functionCall         = path.split('(')[0].replace('@', '');

                // Now we want to split the paramteres by a | in case we pass more than one param
                // We also need to check if we are assigning a default value for that function denoted by a *
                if (!!functionParameteres) {

                    // We need to check if the function parameters have inlined functions that we need to execute
                    paramteresArray = _.compact(functionParameteres[1].split('|'));

                    if (_.last(paramteresArray).includes('*') && !! applyTransformation(key, _.last(paramteresArray).replace('*', '').replace(',', '|'), $key, $value)) {
                        return applyTransformation(key, _.last(paramteresArray).replace('*', '').replace(',', '|'), $key, $value)
                    } else {
                        // we compact the array here to remove any undefined objects that are not caught by the _.get in the map function
                        paramteresValues = _.union(paramteresValues, _.map(paramteresArray, function(param){ return _.startsWith(param, '$') ? eval(param) : applyTransformation(key, param.replace(',', '|'), $key, $value) }));
                    }
                }

                // Extract the function call and the first parameter
                // Now the paramteres array contains the PATH for each element we want to pass to the @function
                // We need now to actually get the actual values of these paths
                // If the getValues fails that means that we are passing a hardocded value, so pass it as is

                // Only execute the function if the parameters array is not empty
                if (!!_.compact(paramteresValues).length && plugins[functionCall]) {
                    return plugins[functionCall].apply(null, paramteresValues);
                }

            } else return getValue(path, $value);
        }

        /**
         * @function getValue
         * @description This function will get the value using the _.get by inspecting the scope of the get
         * The existence of the ! will define a local scope in the result object rather than the document
            *
            * The Flat structure can contain the following cases:
            *  - starts with !: This will denote that the contact on which the _.get will be on a previously extracted
            *    value in the result file
            *  - starts with >>: This means a hardcoded value e.g., >>test -> test
            *  - contains @: This means that a function will be applied on the value before the @ sign
            *    The functions first parameter will be the value before the @ and any additional parameters will be defined
            *    between the parenthesis e.g., name@strip(','') -- will call --> strip(name, ',')
            *  - contains %: This will denote a casting function to the value using eval
            *    e.g., >>%true -> will be a true as a boolean and not as a string
            *  - contains ?? means that a condition has to be applied before assigning the value. The condition to apply
            *    is the one defined after the ->
            *
        * @param  {String} path the path to pass for the _.get to retrieve the value
        * @return {Object} result the object representing the result file
        */
        function getValue(path, subDocument) {

            if (!path) return;

            if (path === '!') return document;

            if (_.startsWith(path, '>>')) {
                return _.startsWith(path, '>>%') ? eval(path.replace('>>%', '')) : path.replace('>>', '');
            } else if (_.startsWith(path, '!')) {
                return _.get(result, path.replace('!', ''));
            } else if (/\|\|/.test(path) && !path.includes('??') ) {
                let pathWithDefault = path.split(/\|\|/);
                return getValue(pathWithDefault[0], subDocument) || getValue(`${pathWithDefault[1]}`);
            } else if (path.includes('??') ){
                // First we need to get the value the condition is checking against .. and get the main value only if it is truthy
                let parameters = _.zipObject(['source', 'targetValue', 'comparator', 'comparison', 'condition'],
                    path.match(/(.+?)\?\?(.+?)\#(.*)\#(.+)/));

                // Run a comparison between the values, and if fails skip the current data
                const firstValue = applyTransformation('', parameters.comparator, '', JSON.stringify(subDocument));
                const secondValue = applyTransformation('', parameters.condition, '', JSON.stringify(subDocument))
                let isValidValue = operation(parameters.comparison, firstValue, secondValue);

                return isValidValue ? applyTransformation(null, parameters.targetValue, null, subDocument) : null;
            } else {
                // Here we check if the subDocument is a string (which indicates we need to get the value from a sub-path)
                // We check for it to be a string because otherwise it can be the index of an array in the _.map()
                return _.isPlainObject(subDocument) ? _.get(subDocument, path) :  _.get(document, path);
            }

            /**
             * Runs a comparison ( === , ==, !==, != ) against the given values
             * @param {string} op
             * @param {*} value1
             * @param {*} value2
             */
            function operation(op, value1, value2){
                switch(op){
                    case '===':
                        return value1 === value2;
                    case '==':
                        return value1 == value2;
                    case '!==':
                        return value1 !== value2;
                    case '!=':
                        return value1 != value2;
                }
                return false;
            }
        }
    }

    var output = {}
    processMappings(mappings, document, output);
    return output;
}

 module.exports = map;