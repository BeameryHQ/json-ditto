/**
 * Remove all specified keys from an object, no matter how deep they are.
 * The removal is done in place, so run it on a copy if you don't want to modify the original object.
 * This function has no limit so circular objects will probably crash the browser
 *
 * @param obj The object from where you want to remove the keys
 * @param keys An array of property names (strings) to remove
 */
module.exports = function hoover(obj, keys) {
    var index;
    for (var prop in obj) {
        // check that this is objects own property not from prototype prop inherited
        if (obj.hasOwnProperty(prop)) {
            switch(typeof(obj[prop])) {
                case 'string':
                    index = keys.indexOf(prop);
                    if(index > -1) {
                        delete obj[prop];
                    }
                    break;
                case 'object':
                    index = keys.indexOf(prop);
                    if (index > -1) {
                        delete obj[prop];
                    } else {
                        hoover(obj[prop], keys);
                    }
                    break;
            }
        }
    }
}