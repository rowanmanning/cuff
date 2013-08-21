'use strict';

// Loop over an array
exports.each = function (arr, fn) {
    var i, len = arr.length;
    for (i = 0; i < len; i += 1) {
        fn(arr[i], i, arr);
    }
    return arr;
};

// Apply a function to each item in an array
exports.map = function (arr, fn) {
    var mapped = [];
    exports.each(arr, function (val, i) {
        mapped.push(fn(val, i, arr));
    });
    return mapped;
};

// Filter an array
exports.filter = function (arr, fn) {
    var filtered = [];
    exports.each(arr, function (val, i) {
        if (fn(val, i, arr)) {
            filtered.push(val);
        }
    });
    return filtered;
};
