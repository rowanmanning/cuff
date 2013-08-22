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
