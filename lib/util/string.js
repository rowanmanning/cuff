'use strict';

// Trim whitespace from a string
exports.trim = function (str) {
    return str.replace(/^\s+|\s+$/g, '');
};
