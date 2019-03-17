# Plugins

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