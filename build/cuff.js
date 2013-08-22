/*
 * Cuff 0.0.0
 *
 * Cuff is a small utility for binding UI controls to DOM elements.
 * https://github.com/rowanmanning/cuff
 *
 * Copyright 2013, Rowan Manning.
 * Licensed under the MIT license.
 *
 */
(function(e){if("function"==typeof bootstrap)bootstrap("cuff",e);else if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else if("undefined"!=typeof ses){if(!ses.ok())return;ses.makeCuff=e}else"undefined"!=typeof window?window.cuff=e():global.cuff=e()})(function(){var define,ses,bootstrap,module,exports;
return (function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0].call(u.exports,function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){
'use strict';

var arr = require('./util/array');
var str = require('./util/string');
var dom = require('./util/dom');

var cuff = module.exports = findAndBind;

cuff.CONTROL_ATTR = 'data-control';
cuff.controls = {};

cuff.findAndBind = findAndBind;
cuff.find = find;
cuff.bindMany = bindMany;
cuff.bind = bind;

// Find control elements and bind associated controls
function findAndBind (ctx) {
    arr.each(cuff.find(ctx), function (el) {
        cuff.bindMany(el, str.trim(el.getAttribute(cuff.CONTROL_ATTR)).split(/\s+/));
    });
}

// Find control elements
function find (ctx) {
    return dom.getElementsByAttribute(cuff.CONTROL_ATTR, ctx);
}

// Bind multiple controls to an element
function bindMany (el, names) {
    return arr.map(names, function (name) {
        return cuff.bind(el, name);
    });
}

// Bind a control to an element
function bind (el, name) {
    return cuff.controls[name](el);
}

},{"./util/array":2,"./util/dom":3,"./util/string":4}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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

},{"./array":2}],4:[function(require,module,exports){
'use strict';

// Trim whitespace from a string
exports.trim = function (str) {
    return str.replace(/^\s+|\s+$/g, '');
};

},{}]},{},[1])(1)
});
;
