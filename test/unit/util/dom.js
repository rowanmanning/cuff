/* jshint maxlen: 200 */
/* global afterEach, beforeEach, describe, global, it */
'use strict';

var assert = require('proclaim');
var sinon = require('sinon');
var createDomElement = require('../../mock/dom-element').createDomElement;
var createWindow = require('../../mock/window').createWindow;

describe('util/dom', function () {
    var dom = require('../../../lib/util/dom');
    var els;
    var prevWindow;

    beforeEach(function () {
        els = [createDomElement(), createDomElement(), createDomElement()];
        els[0].getAttribute.withArgs('foo').returns(null);
        els[1].getAttribute.withArgs('foo').returns('bar');
        els[2].getAttribute.withArgs('foo').returns('');
        prevWindow = global.window;
        global.window = createWindow();
    });

    afterEach(function () {
        global.window = prevWindow;
    });

    it('should be an object', function () {
        assert.isObject(dom);
    });

    it('should have a getElementsByAttribute function', function () {
        assert.isFunction(dom.getElementsByAttribute);
    });

    describe('.getElementsByAttribute()', function () {

        it('should return the expected DOM elements', function () {
            global.window.document.querySelectorAll = sinon.stub().withArgs('[foo]').returns(els);
            var found = dom.getElementsByAttribute('foo');
            assert.strictEqual(found, els);
        });

        it('should return the expected DOM elements when `querySelectorAll` is unavailable', function () {
            delete global.window.document.querySelectorAll;
            global.window.document.getElementsByTagName = sinon.stub().withArgs('*').returns(els);
            var found = dom.getElementsByAttribute('foo');
            assert.deepEqual(found, [els[1]]);
        });
    });

    describe('.getElementsByAttribute() with context', function () {
        var ctx;

        beforeEach(function () {
            ctx = createDomElement();
        });

        it('should return the expected DOM elements', function () {
            ctx.querySelectorAll = sinon.stub().withArgs('[foo]').returns(els);
            var found = dom.getElementsByAttribute('foo', ctx);
            assert.strictEqual(found, els);
        });

        it('should return the expected DOM elements when `querySelectorAll` is unavailable', function () {
            delete ctx.querySelectorAll;
            ctx.getElementsByTagName = sinon.stub().withArgs('*').returns(els);
            var found = dom.getElementsByAttribute('foo', ctx);
            assert.deepEqual(found, [els[1]]);
        });
    });
});
