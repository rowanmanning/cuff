/* global define, window */
(function (root, doc) {
    'use strict';

    // Loop over an array
    function each (arr, fn) {
        var i, len = arr.length;
        for (i = 0; i < len; i += 1) {
            fn(arr[i], i, arr);
        }
    }

    // Apply a function to each item in an array
    function map (arr, fn) {
        var mapped = [];
        each(arr, function (val, i) {
            mapped.push(fn(val, i, arr));
        });
        return mapped;
    }

    // Filter an array
    function filter (arr, fn) {
        var filtered = [];
        each(arr, function (val, i) {
            if (fn(val, i, arr)) {
                filtered.push(val);
            }
        });
        return filtered;
    }

    // Find an element with a given attribute
    function getElementsByAttribute (attr, ctx) {
        ctx = ctx || doc;
        if (ctx.querySelectorAll) {
            return ctx.querySelectorAll('[' + attr + ']');
        }
        return filter(ctx.getElementsByTagName('*'), function (el) {
            var attrVal = el.getAttribute(attr);
            return (attrVal !== null && attrVal !== '');
        });
    }

    // Trim whitespace from a string
    function trim (str) {
        return str.replace(/^\s+|\s+$/g, '');
    }

    // Binder
    var binder = {

        // Control attribute
        CONTROL_ATTR: 'data-control',

        // Control storage
        controls: {},

        // Bind a control to an element
        bind: function (el, name) {
            return binder.controls[name](el);
        },

        // Bind multiple controls to an element
        bindMany: function (el, names) {
            return map(names, function (name) {
                return binder.bind(el, name);
            });
        },

        // Find control elements
        find: function (ctx) {
            return getElementsByAttribute(binder.CONTROL_ATTR, ctx);
        },

        // Find control elements and bind associated controls
        findAndBind: function (ctx) {
            each(binder.find(ctx), function (el) {
                binder.bindMany(el, trim(el.getAttribute(binder.CONTROL_ATTR)).split(/\s+/));
            });
        }

    };

    // AMD
    if (typeof define !== 'undefined' && define.amd) {
        define([], function () {
            return binder;
        });
    }
    // CommonJS
    else if (typeof module !== 'undefined' && module.exports) {
        module.exports = binder;
    }
    // Script tag
    else {
        root.binder = binder;
    }

} (this, window.document));