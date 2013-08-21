'use strict';

var sinon = require('sinon');

// Create a DOMElement mock
exports.createDomElement = function (tagName) {
    return {
        tagName: (tagName || 'div').toUpperCase(),
        getElementsByTagName: sinon.stub(),
        getAttribute: sinon.stub(),
        querySelectorAll: sinon.stub()
    };
};
