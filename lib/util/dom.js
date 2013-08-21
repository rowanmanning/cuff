/* global window */
'use strict';

var arr = require('./array');

// Find an element with a given attribute
exports.getElementsByAttribute = function (attr, ctx) {
    ctx = ctx || window.document;
    if (ctx.querySelectorAll) {
        return ctx.querySelectorAll('[' + attr + ']');
    }
    return arr.filter(ctx.getElementsByTagName('*'), function (el) {
        var attrVal = el.getAttribute(attr);
        return (attrVal !== null && attrVal !== '');
    });
};
