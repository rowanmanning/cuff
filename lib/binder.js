'use strict';

var arr = require('./util/array');
var str = require('./util/string');
var dom = require('./util/dom');

var binder = module.exports = findAndBind;

binder.CONTROL_ATTR = 'data-control';
binder.controls = {};

binder.findAndBind = findAndBind;
binder.find = find;
binder.bindMany = bindMany;
binder.bind = bind;

// Find control elements and bind associated controls
function findAndBind (ctx) {
    arr.each(binder.find(ctx), function (el) {
        binder.bindMany(el, str.trim(el.getAttribute(binder.CONTROL_ATTR)).split(/\s+/));
    });
}

// Find control elements
function find (ctx) {
    return dom.getElementsByAttribute(binder.CONTROL_ATTR, ctx);
}

// Bind multiple controls to an element
function bindMany (el, names) {
    return arr.map(names, function (name) {
        return binder.bind(el, name);
    });
}

// Bind a control to an element
function bind (el, name) {
    return binder.controls[name](el);
}
