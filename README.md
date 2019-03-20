
[![NPM](https://nodei.co/npm/json-ditto.png?downloads=true)](https://npmjs.org/package/json-ditto)

[![David](https://img.shields.io/david/BeameryHQ/json-ditto.svg)](https://david-dm.org/BeameryHQ/json-ditto)
[![David](https://img.shields.io/david/dev/BeameryHQ/json-ditto.svg)](https://david-dm.org/BeameryHQ/json-ditto)
[![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/json-ditto.svg)](https://snyk.io/test/github/BeameryHQ/Ditto?targetFile=package.json)
[![Code Climate maintainability](https://img.shields.io/codeclimate/maintainability/BeameryHQ/Ditto.svg)](https://codeclimate.com/github/BeameryHQ/Ditto/)
[![Code Climate coverage](https://img.shields.io/codeclimate/coverage/BeameryHQ/Ditto.svg)](https://codeclimate.com/github/BeameryHQ/Ditto/)
[![Try json-ditto on RunKit](https://badge.runkitcdn.com/json-ditto.svg)](https://runkit.com/ahmadassaf/json-ditto)
[![CircleCI (all branches)](https://img.shields.io/circleci/project/github/BeameryHQ/json-ditto.svg?style=flat)](https://circleci.com/gh/BeameryHQ/json-ditto)

# Ditto

JSON (JavaScript Object Notation) is a lightweight data-interchange format. It is easy for humans to read and write. It is easy for machines to parse and generate. When dealing with data integration problems, the need to translate JSON from external formats to adhere to an internal representation become a vital task. Ditto was created to solve the issue of unifying external data representation.

Ditto parses a mapping file (see [mapping rules](https://github.com/BeameryHQ/Ditto#mapping-rules)) and produces a JSON output from the input data to match the output definition. Ditto has three main mapping steps as shown in the diagram below where the output of each step is fed as input to the next one:

 - **_preMap**: Start the pre-mapping process which runs before the main mapping process to transform the input data
 - **_map**: Start the unification process based on the manual mapping files. This is the step where the mapping file is read and the data is mapped accordingly
 - **_postMap**: Start the post-mapping process which will run after the main mapping is done and transform the mapping result (output)

<p align="center">
  <img src="https://user-images.githubusercontent.com/550726/54499781-810c9a00-490d-11e9-9003-54259ba1dd99.png">
</p>

# How to use Ditto

Ditto exposes a class that can be instantiated with a mapping file and/or plugins list. You can either use the `unify` method with the document you wish to unify with the mappings and plugins passed to the constructor.

```javascript
const Ditto = require('json-ditto');

// This is valid JSON mapping file that maps to the mapping rules below
const myCustomMappings = require('./myMappingFile');

// Create a new mapper that will always use the "myCustomMappings" file
const myCustomMapper = new Ditto(myCustomMappings);

// Call the unify function that will read the "documentToBeUnified" and transforms it via the mapping file
myCustomMapper.unify(documentToBeUnified).then((result) => {
    .....
});
```

or you can create a default instance and pass the document with the mappings to the `unify` function.

```javascript
const Ditto = require('json-ditto');

// This is valid JSON mapping file that maps to the mapping rules below
const myCustomMappings = require('./myMappingFile');

// Call the unify function that will read the "documentToBeUnified" and transforms it via the mapping file passed to the constructor
return new Ditto.unify(myCustomMappings, documentToBeUnified).then((result) => {
    .....
});
```

By default, you can use the built-in plugins provided with Ditto using the syntax defined below in your mapping. However, if you wish to register additional plugins you can use the following `addPlugins` method or you can pass the plugins to the constructor directly via `new Ditto(myCustomMappings, myCustomPlugins)`.

> Note: Adding plugins extends and will not overwrite the default plugins

## addPlugins(plugins)
Add extra set of plugins to the default ones

| Param | Type | Description |
| --- | --- | --- |
| plugins | <code>Object</code> | the extra plugins passed to be added to the default set of Ditto plugins |

## `_map`

The `_map` function is the main processing step. It takes in the mapping file and processes the rules inside to transform the input object.

The mapping file has to be defined with specific rules that abide with main mapping function. The mapping function contains the following methods:

### processMappings(document, result, mappings)

Process the mappings file and map it to the actual values. It is the entry point to parse the mapping and input files.

| Param | Type | Description |
| --- | --- | --- |
| document | `Object` | the object document we want to map |
| result | `Object` | the object representing the result file |
| mappings | `Object` | the object presenting the mappings between target document and mapped one |


### applyTransformation(path, key)

Apply a transformation function on a path. A transformation is a function that is defined in the mapping file with the `@` symbol and is declared in the `plugins` folder.

| Param | Type | Description |
| --- | --- | --- |
| path | `String` | the path to pass for the _.get to retrieve the value |
| key | `String` | the key of the result object that will contain the new mapped value |

An example plug-in:

```javascript
'use strict';

const _ = require('lodash');

module.exports = function aggregateExperience(experience) {

    let totalExperience = 0;

    _.each(experience.values, function(experience){
        if (!!experience.experienceDuration) totalExperience += experience.experienceDuration
    })

    return totalExperience === 0 ? null : totalExperience;
};
```
As you can see from the example above, a plug-in is nothing more than a simple JavaScript function that can take 0+ arguments. These arguments are passed in the mapping file and are separated by `|`. For example: `@concatName(firstName|lastName)`. The following examples demonstrate the abilities of plug-ins and their definitions:

> arguments can be defined using any syntax acceptable by the `getValue` function described below

 - `@concatName(firstName|lastName)`: call the function `concatName` with the values `firstName` and `lastName` extracted from their paths in the input file by calling the `getValue()` function on them
 - `@concatName(firstName|>>this_is_my_last_name)`: call the function `concatName` with the `firstName` argument extracted from the path input file and passing the hard-coded value `this_is_my_last_name` that will be passed as a string
 - `@concatName(firstName|lastName|*>>default)`: call the function `concatName` with three arguments. `firstName` and `lastName` and a default value. Default values are arguments that have a `*` perpended to them. Default arguments follow as well the syntax for `getValue` function and can be either hard-coded or extracted from the input file or the result file.

> If you are passing a number of arguments that you might not exactly know their number, we recommend using the `arguments` built-in JavaScript keyword to extract the arguments passed and process them accordingly

```javascript
function concatName() {
	return _.flatten(_.values(arguments)).join(' ').replace(/\s\s+/g,' ').trim();
}
```

### Functions in Functions

Sometimes you may want to pass the value of a function into another function as a parameter. You can do this easily by calling the function name inside the arguments. However, an important to thing to note is that inner function calls, if they contain more than one parameter, then the paramteres have to be separated by a comma `,` rather than the traditional `|`.

Examples:

```javascript
"type"   : "@getLinkType(value|@getLinkService(value,service))",
"value"  : "@cleanURI(value|@getLinkType(value,@getLinkService(value,service)))",
```

### Plugins Activation

The plugins are activated in the `/ditto/plugins/plugins.js` file by adding the plugin name (corresponds exactly to the file name `.js` of the definition) in the `plugins` array.
The plugin will be reuqired and exported to be used in the main `mapping` function in the interface.

```javascript
'use strict';

module.exports = {
	aggregateExperience              : require('./aggregateExperience'),
	assignIds                        : require('./assignIds'),
	assignUniqueIds                  : require('./assignUniqueIds')
	....
```

### getValue(path) ⇒ `Object`

**Returns**: `Object` - result the object representing the result file

| Param | Type | Description |
| --- | --- | --- |
| path | `String` | the path to pass for the _.get to retrieve the value |

This function will get the value using the `_.get` by inspecting the scope of the get. The `getValue` works on two scopes:

 - The **input** file which is the main file we wish to transform
 - The **result** file which is the file that contains the result of transforming the input file. Often, we need to reference the result file in our mapping. We do that by prepending the path with `!` so it defines a local scope in the result object rather than the input document.

The formats acceptable by the `getValue` are:

- Starts with `!`: This will denote that the contact on which the `_.get` will be on a previously extracted value in the result file
- Starts with `>>`: This means a hard-coded value e.g., `>>test` -> `test`
- Starts with `@`: This means that a function will be applied on the value before the `@` sign
- Starts with `@!`: We are passing a built-in JavaScript function that will be executed e.g., `@!New Date()`
- Contains `%`: This will denote a casting function to the value using eval e.g., `>>%true` -> will be a true as a boolean and not as a string
- contains `||`: This means a fall-back to a value .. the value is anything which can be either **hard-coded** value e.g., `something_falsy||>>test` -> `test` or a reference to a path
- Contains `??`: This means that we are applying a condition before we assign the value
- Contains `*`: If appended before the last parameter, this acts as a default value for the function and the value of that value will be assigned automatically

### Conditional Assignment

Conditional assignment is what happens when a `??` is present in the mapping path. This is very useful as it restricts assigning the value unless a condition is met.

Example: `value: value??keys[0]#==#>>f5e32a6faaa7ead6ba201e8fa25733ee`

This will mean that we want to assign `value` path from the input document to the result document only if the `key[0]` element (the first element in the key array in the input document) is equal to the hardcoded string `"f5e32a6faaa7ead6ba201e8fa25733ee"`

## Mapping Rules:

Mapping "flat" structures is straightforward. For example:

```javascript
	"name"                    : "firstName",
	"nickname"                : "nickname>>nickname_not_found",
	"fullName"                : "@concatName(firstName|lastName)",
	"fullNameDefault"         : "@concatName(firstName|*!fullName)",
	"fullNameDefaultHardcoded": "@concatName(firstName|lastName|*>>default)",
	"completeName"            : "@concatName(firstName|!fullName)",
	"displayName"             : "!fullName",
    "email": {
        "value": "email"
    }
```

In here we are parsing directly flat structure and creating objects out of them. For example, we will not have the `email` value defined as an object `email:{value:"test@email.com"}` instead of what it was in the input file as `email:"test@email.com"`

However, things can become a bit more complex when we trying to create complex objects like arrays or objects. Defining these structures requires defining various extra parameters in the mapping file:

 - `output`: This will define the output path type whether it is an array `[]` or an object `{}`
 - `key`: This is a required filed only when the output is set to be an object `{}` as objects assigned needs to have a key defined
 - `innerDocument`: Since we are creating a "collection" we are most probably looping inside of a collection as well. The `innerDocument` property tells the mapper on which collection to loop. However, if the `innerResult` is set to `!` then this mean that the `innerDocument` scope is the current input document root.
 - `prerequisite` (optional): This defines a condition that has to be met before a parsed result is pushed or assigned to the collection. The prerequisite works on the already extracted result, so it will be defined for example as `!!innerResult.value` whereas the `!!innerResult` is taken always with context to the mapping
 - `required` (optional): Similar to `prerequisite` this defines a condition that has to be met before the result is pushed. However, this examines the data after it has been porcessed while the `prerequisite` works directly on the `innerResult` object.
 - `requirements` (optional): Simlar to required, this works on the result after it has been assigned. For example, this can be a check to make sure that the resulting array or object contains unique values
 - `mappings`: This defines how you want to map each object that will be pushed to the collection. The mappings here are relative to the `innerDocument` path. For example, if the `innerDocument` is defined as `experience` and the mappings object has `name: "companyName"` that means that `companyName` is a property inside of `experience` object.

**Mapping**

```javascript
"social_media_addresses": {
    "output": [],
    "innerDocument": "linksv2.values",
    "prerequisite": "!!innerResult.value",
    "requirements": ["@uniqueArray(!social_media_addresses|>>value)", "@transformTwitterHandle(!social_media_addresses)"],
    "mappings": {
        "value": "value??type#==#>>social"
    }
}
```

**Result**

```javascript
"social_media_addresses": [{
    "value": "@ahmadaassaf"
}]
```

## Mapping FAQs:

 - How can i point the Ditto to a deep nested Object ?
 > Ditto uses Lodash's `_.get` which means that you can pass any path in form of a String or an Array e.g., `a.b.c[0].d` or `[a, b, c[0], d]`

 - How can i iterate over a nested Object ?
 > To iterate over a sub-path, you need to define an `innerDocument`. The inner document path is again parsed with the `_.get` so it can be as complex as it can get. However, as the structure of the Ditto requires that an `innerDocument` has to be defined when creating an array or Object of Objects, you can refer to the current document root with **!**

 - I see some paths prefixed with `!` .. what does that mean ?
 > Sometimes you need to access already parsed values (as in values in your result file). This is seen for example when we are trying to create the `keys` array from the already generated ids. In that case, the **!** prefixed path e.g., `!links.values` will refer to the already extracted `links.values` Object in the result file

 - If i want to extract data from multiple places for the same Object, how can i do that ?
 > Ditto allows to specify multiple Objects to be set as a parsing target. For example, if we are creating an Object and you to have the `values` extracted from multiple places then you define your `values` as an array of objects where each Object will have output, innerDocument, etc. (you can check the `contacts.v2.js` sample mappping file). However, if you are creating an Object without `values` then your direct mapping will be an array of Object (check `test.js` sample mapping file and see the `social_links` mapping)

 - If i am creating an Object of Object, each Object should have a key. How can i define that ?
 > For object of objects (i believe you have defined the output as `{}`) then you need to define a `key` object. The `key` object is an array where you define that various targets that will be parsed as a key. The key is defined either as a relative path to the currently parsed Object or as a function call e.g., `"key": "@generateId($key|degree)"`

 - If i am iterating on an array or an object, can i have access to the array value and index, or the object key ?
 > Yes, definitely. These variables can be access via the `$value` which referrs to teh value of the object or the array or the `$key` which refers to the Object key or the array element index

 - In functions, how can i pass a string ?
 > In the same way we hardcode values by appending `>>` you can pass any String to the function. e.g., `@getImageLink(>>http://photo.com/|!fullName)` where we pass the url `http://photo.com` as a first parameter

### Check the test files for complete use cases coverage

## Plugins

<dl>
<dt><a href="#base64Encode">base64Encode(input)</a> ⇒ <code>String</code></dt>
<dd><p>base64 encode a text string</p>
</dd>
<dt><a href="#cleanEmail">cleanEmail(source)</a> ⇒ <code>String</code></dt>
<dd><p>normalize an email by converting it into an all lowercase
This will be extended in te future by doing more robust email validation</p>
</dd>
<dt><a href="#concatName">concatName(source)</a> ⇒ <code>String</code></dt>
<dd><p>Clean a string from special characters, HTML tags and trailing dots and commas</p>
</dd>
<dt><a href="#cleanURI">cleanURI(source)</a> ⇒ <code>String</code></dt>
<dd><p>Clean a URI from special characters, HTML tags and trailing dots and commas</p>
</dd>
<dt><a href="#concatName">concatName()</a> ⇒ <code>String</code></dt>
<dd><p>Concatinate a string with one or more other strings separated by a space
Since we might be passing one or more (n) strings, we will use <code>arguments</code></p>
</dd>
<dt><a href="#concatString">concatString()</a> ⇒ <code>String</code></dt>
<dd><p>Concatinate a string with one or more other strings</p>
</dd>
<dt><a href="#isValidString">isValidString(str)</a></dt>
<dd><p>A string is considered valid if is a string and is not empty</p>
</dd>
<dt><a href="#concatWithComma">concatWithComma()</a> ⇒ <code>String</code></dt>
<dd><p>Concatinate a string with one or more other strings and join
them using comma and space.</p>
</dd>
<dt><a href="#createURL">createURL(url, source)</a> ⇒ <code>String</code></dt>
<dd><p>Create a url from passed parameteres</p>
</dd>
<dt><a href="#extractName">extractName(fullName, position)</a> ⇒ <code>String/Array</code></dt>
<dd><p>Extract the first name of a contact as it is a required field</p>
</dd>
<dt><a href="#formatDate">formatDate(date, [format], [isUtc])</a> ⇒ <code>String</code></dt>
<dd><p>Format a date according to parameters</p>
</dd>
<dt><a href="#generateCleanId">generateCleanId()</a> ⇒ <code>String</code></dt>
<dd><p>Create an md5 hash based on concatentating passed String Values
Since we might be passing one or more (n) strings, we will use <code>arguments</code></p>
</dd>
<dt><a href="#generateFacebookImageLink">generateFacebookImageLink(Facebook)</a> ⇒ <code>String</code></dt>
<dd><p>Generate a link for the Facebook profile photo based on the facebook ID</p>
</dd>
<dt><a href="#generateId">generateId()</a> ⇒ <code>String</code></dt>
<dd><p>Create an md5 hash based on concatentating passed String Values
This function will take multiple arguments that will be extracted via the <code>arguments</code> keyword</p>
</dd>
<dt><a href="#generateIdForLinks">generateIdForLinks(source)</a> ⇒ <code>String</code></dt>
<dd><p>Create an md5 hash based on concatentating passed String Values for links
The function cleans the URIs before creating the MD5 hash</p>
</dd>
<dt><a href="#generateIdFromLanguageCode">generateIdFromLanguageCode(languageCode)</a> ⇒ <code>String</code></dt>
<dd><p>Lanaugage id generation is done on the value of the language. This function will generate the id from a language ISO code
by doing a lookup first on the language valuye then generate the id from that one</p>
</dd>
<dt><a href="#generateUUID">generateUUID()</a> ⇒ <code>String</code></dt>
<dd><p>Create an random UUID value</p>
</dd>
<dt><a href="#getCountryCode">getCountryCode(countryCode, country)</a> ⇒ <code>String</code></dt>
<dd><p>Get the language code and normalize as the well the displayName of the language</p>
</dd>
<dt><a href="#getCountryName">getCountryName(countryCode)</a> ⇒ <code>String</code></dt>
<dd><p>Get the country name given the country ISO3 code provided</p>
</dd>
<dt><a href="#getLanguageCode">getLanguageCode(source)</a> ⇒ <code>String</code></dt>
<dd><p>Get the language code and normalize as the well the displayName of the language</p>
</dd>
<dt><a href="#getLanguageFromCode">getLanguageFromCode(source)</a> ⇒ <code>String</code></dt>
<dd><p>Get the language displayName from Code</p>
</dd>
<dt><a href="#getLinkService">getLinkService(source, service)</a> ⇒ <code>String</code></dt>
<dd><p>Identify if the service provider of the link</p>
</dd>
<dt><a href="#getLinkType">getLinkType(source)</a> ⇒ <code>String</code></dt>
<dd><p>Identify if the link is for a social website</p>
</dd>
<dt><a href="#getValueAtPath">getValueAtPath(object, path)</a> ⇒ <code>any</code></dt>
<dd><p>Simple wrapper for lodash <code>get</code>.</p>
</dd>
<dt><a href="#minBy">minBy(array, [path])</a> ⇒ <code>any</code></dt>
<dd><p>Return the min value (numerical or by character code) in array.
If only array is passed it is assumed that array is of numbers or strings.
If path is passed it is assumed that array is of objects, and value that
path resolves to is used.</p>
</dd>
<dt><a href="#normalizeString">normalizeString(source)</a> ⇒ <code>String</code></dt>
<dd><p>normalizeString a string from special characters, HTML tags and trailing dots and commas and lower case it</p>
</dd>
<dt><a href="#parseDate">parseDate(date, month, day)</a> ⇒ <code>Date</code></dt>
<dd><p>Accepts a string or a Date object as input,
check it&#39;s validity, and either return it as Date object, or returns null</p>
</dd>
<dt><a href="#parseString">parseString(source)</a> ⇒ <code>String</code></dt>
<dd><p>Convert a value into a string by concatenating it with an empty space
Known issue is that we will lose double precision when converting to string (check the tests)</p>
</dd>
<dt><a href="#splitList">splitList(input)</a> ⇒ <code>String</code> | <code>null</code></dt>
<dd><p>Split a list of items into an array</p>
</dd>
<dt><a href="#uniqueArray">uniqueArray(target)</a> ⇒ <code>Array</code></dt>
<dd><p>Ensure array elements are unique</p>
</dd>
</dl>

<a name="base64Encode"></a>

## base64Encode(input) ⇒ <code>String</code>
base64 encode a text string

**Kind**: global function

| Param | Type |
| --- | --- |
| input | <code>String</code> |

<a name="cleanEmail"></a>

## cleanEmail(source) ⇒ <code>String</code>
normalize an email by converting it into an all lowercase
This will be extended in te future by doing more robust email validation

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| source | <code>String</code> | the string we want to clean out |

<a name="concatName"></a>

## concatName(source) ⇒ <code>String</code>
Clean a string from special characters, HTML tags and trailing dots and commas

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| source | <code>String</code> | the string we want to clean out |

<a name="cleanURI"></a>

## cleanURI(source) ⇒ <code>String</code>
Clean a URI from special characters, HTML tags and trailing dots and commas

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| source | <code>String</code> | the URI we want to clean out |

<a name="concatName"></a>

## concatName() ⇒ <code>String</code>
Concatinate a string with one or more other strings separated by a space
Since we might be passing one or more (n) strings, we will use `arguments`

**Kind**: global function
<a name="concatString"></a>

## concatString() ⇒ <code>String</code>
Concatinate a string with one or more other strings

**Kind**: global function
<a name="isValidString"></a>

## isValidString(str)
A string is considered valid if is a string and is not empty

**Kind**: global function

| Param | Type |
| --- | --- |
| str | <code>String</code> |

<a name="concatWithComma"></a>

## concatWithComma() ⇒ <code>String</code>
Concatinate a string with one or more other strings and join
them using comma and space.

**Kind**: global function
<a name="createURL"></a>

## createURL(url, source) ⇒ <code>String</code>
Create a url from passed parameteres

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | the main url base |
| source | <code>String</code> | the string to concatinate to the base url |

<a name="extractName"></a>

## extractName(fullName, position) ⇒ <code>String/Array</code>
Extract the first name of a contact as it is a required field

**Kind**: global function
**Returns**: <code>String/Array</code> - Returns the extracted firstName or lastName as Strings or the middleName(s) as an array

| Param | Type | Description |
| --- | --- | --- |
| fullName | <code>String</code> | the contact fullname |
| position | <code>String</code> | the position of the name to extract (firstName, lastName, middleName) |

<a name="formatDate"></a>

## formatDate(date, [format], [isUtc]) ⇒ <code>String</code>
Format a date according to parameters

**Kind**: global function

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| date | <code>Date</code> |  |  |
| [format] | <code>String</code> |  | Format of the date. |
| [isUtc] | <code>Boolean</code> | <code>true</code> | If timezone should be utc or not |

<a name="generateCleanId"></a>

## generateCleanId() ⇒ <code>String</code>
Create an md5 hash based on concatentating passed String Values
Since we might be passing one or more (n) strings, we will use `arguments`

**Kind**: global function
**Returns**: <code>String</code> - result the concatenated cleaned string
<a name="generateFacebookImageLink"></a>

## generateFacebookImageLink(Facebook) ⇒ <code>String</code>
Generate a link for the Facebook profile photo based on the facebook ID

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| Facebook | <code>String</code> | profile ID |

<a name="generateId"></a>

## generateId() ⇒ <code>String</code>
Create an md5 hash based on concatentating passed String Values
This function will take multiple arguments that will be extracted via the `arguments` keyword

**Kind**: global function
<a name="generateIdForLinks"></a>

## generateIdForLinks(source) ⇒ <code>String</code>
Create an md5 hash based on concatentating passed String Values for links
The function cleans the URIs before creating the MD5 hash

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| source | <code>String</code> | the URI we want to clean out |

<a name="generateIdFromLanguageCode"></a>

## generateIdFromLanguageCode(languageCode) ⇒ <code>String</code>
Lanaugage id generation is done on the value of the language. This function will generate the id from a language ISO code
by doing a lookup first on the language valuye then generate the id from that one

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| languageCode | <code>String</code> | The language code |

<a name="generateUUID"></a>

## generateUUID() ⇒ <code>String</code>
Create an random UUID value

**Kind**: global function
<a name="getCountryCode"></a>

## getCountryCode(countryCode, country) ⇒ <code>String</code>
Get the language code and normalize as the well the displayName of the language

**Kind**: global function
**Returns**: <code>String</code> - the ISO3 country code

| Param | Type | Description |
| --- | --- | --- |
| countryCode | <code>String</code> | the ISO2 country code |
| country | <code>String</code> | the country name <optional> |

<a name="getCountryName"></a>

## getCountryName(countryCode) ⇒ <code>String</code>
Get the country name given the country ISO3 code provided

**Kind**: global function
**Returns**: <code>String</code> - The country name

| Param | Type | Description |
| --- | --- | --- |
| countryCode | <code>String</code> | The ISO3 Country Code |

<a name="getLanguageCode"></a>

## getLanguageCode(source) ⇒ <code>String</code>
Get the language code and normalize as the well the displayName of the language

**Kind**: global function
**Returns**: <code>String</code> - the langauage ISO code

| Param | Type | Description |
| --- | --- | --- |
| source | <code>String</code> | the language display name |

<a name="getLanguageFromCode"></a>

## getLanguageFromCode(source) ⇒ <code>String</code>
Get the language displayName from Code

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| source | <code>String</code> | the langauage code |

<a name="getLinkService"></a>

## getLinkService(source, service) ⇒ <code>String</code>
Identify if the service provider of the link

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| source | <code>String</code> | the link URI we wish to examine |
| service | <code>String</code> | the link service name |

<a name="getLinkType"></a>

## getLinkType(source) ⇒ <code>String</code>
Identify if the link is for a social website

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| source | <code>String</code> | the link URI we wish to examine |

<a name="getValueAtPath"></a>

## getValueAtPath(object, path) ⇒ <code>any</code>
Simple wrapper for lodash `get`.

**Kind**: global function
**Returns**: <code>any</code> - The value returned or undefined.

| Param | Type | Description |
| --- | --- | --- |
| object | <code>Object</code> | The object to query. |
| path | <code>Array</code> \| <code>String</code> | Path of the property to get. |

**Example**
```js
{a: {b: 1}} => ['a', 'b'] => 1
```
<a name="minBy"></a>

## minBy(array, [path]) ⇒ <code>any</code>
Return the min value (numerical or by character code) in array.
If only array is passed it is assumed that array is of numbers or strings.
If path is passed it is assumed that array is of objects, and value that
path resolves to is used.

**Kind**: global function
**Returns**: <code>any</code> - Min value or undefined.

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array</code> | Description. |
| [path] | <code>string</code> | Path to prop in object. |

**Example**
```js
[1,2] => 1
```
<a name="normalizeString"></a>

## normalizeString(source) ⇒ <code>String</code>
normalizeString a string from special characters, HTML tags and trailing dots and commas and lower case it

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| source | <code>String</code> | the string we want to clean out |

<a name="parseDate"></a>

## parseDate(date, month, day) ⇒ <code>Date</code>
Accepts a string or a Date object as input,
check it's validity, and either return it as Date object, or returns null

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| date | <code>String</code> | the date we wish to transform |
| month | <code>String</code> | the month if found to be added to the parsed date |
| day | <code>String</code> | the day if found to be added to the parsed date |

<a name="parseString"></a>

## parseString(source) ⇒ <code>String</code>
Convert a value into a string by concatenating it with an empty space
Known issue is that we will lose double precision when converting to string (check the tests)

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| source | <code>String</code> | the string we wish to transform |

<a name="splitList"></a>

## splitList(input) ⇒ <code>String</code> \| <code>null</code>
Split a list of items into an array

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| input | <code>String</code> \| <code>null</code> | string to split |

<a name="uniqueArray"></a>

## uniqueArray(target) ⇒ <code>Array</code>
Ensure array elements are unique

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| target | <code>Array</code> | the target Array we will ensure its uniqueness |
