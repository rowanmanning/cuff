(function () {
    'use strict';

    var createDomElement = require('./dom-element').createDomElement;

    // Create a Window mock
    exports.createWindow = function () {
        return {
            document: createDomElement('body')
        };
    };

} ());