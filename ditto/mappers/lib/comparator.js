module.exports = function comperator(operation, firstValue, secondValue) {

    // Make sure we always apply strict comparison
    if (operation === '==' || operation === '!=') {
        operation = operation.replace('=', '==');
    }

   switch(operation) {
       case '===':
           return firstValue === secondValue;
       case '==':
           return firstValue === secondValue;
       case '!==':
           return firstValue !== secondValue;
       case '!=':
           return firstValue !== secondValue;
       case '>':
           return firstValue > secondValue;
       case '<':
           return firstValue < secondValue;
       case '<=':
           return firstValue <= secondValue;
       case '>=':
           return firstValue >= secondValue;
   }
   return false;

}