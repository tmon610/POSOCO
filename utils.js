// https://stackoverflow.com/questions/11379361/how-to-sort-an-array-of-objects-with-multiple-field-values-in-javascript
function dynamicSort(property) {
    return function (obj1,obj2) {
        return obj1[property] > obj2[property] ? 1
            : obj1[property] < obj2[property] ? -1 : 0;
    }
}

function dynamicSortMultiple() {
    //save the arguments object as it will be overwritten note that arguments object is an array-like object consisting of the names of the properties to sort by
    var props = arguments;
    return function (obj1, obj2) {
        var i = 0, result = 0, numberOfProperties = props.length;
        //try getting a different result from 0 (equal)
        //as long as we have extra properties to compare
        while (result === 0 && i < numberOfProperties) {
            result = dynamicSort(props[i])(obj1, obj2);
            i++;
        }
        return result;
    }
}