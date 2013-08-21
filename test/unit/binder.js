/* jshint maxlen: 200 */
/* global afterEach, beforeEach, describe, it */
'use strict';

var assert = require('proclaim');
var sinon = require('sinon');
var createDomElement = require('../mock/dom-element').createDomElement;

describe('binder', function () {
    var binder = require('../../lib/binder');
    var dom = require('../../lib/util/dom');

    afterEach(function () {
        binder.controls = {};
    });

    it('should be a function', function () {
        assert.isFunction(binder);
    });

    it('should be the same as the findAndBind function', function () {
        assert.strictEqual(binder, binder.findAndBind);
    });

    it('should have a controls property', function () {
        assert.isObject(binder.controls);
    });

    it('should have a CONTROL_ATTR property', function () {
        assert.strictEqual(binder.CONTROL_ATTR, 'data-control');
    });

    it('should have a bind function', function () {
        assert.isFunction(binder.bind);
    });

    it('should have a bindMany function', function () {
        assert.isFunction(binder.bindMany);
    });

    it('should have a find function', function () {
        assert.isFunction(binder.find);
    });

    it('should have a findAndBind function', function () {
        assert.isFunction(binder.findAndBind);
    });

    describe('.bind()', function () {
        it('should call the expected control with the given element', function () {
            var el = createDomElement();
            var ctrl = {};
            binder.controls.foo = sinon.stub().returns(ctrl);
            binder.controls.bar = sinon.spy();
            binder.bind(el, 'foo');
            assert.isTrue(binder.controls.foo.withArgs(el).calledOnce);
            assert.isFalse(binder.controls.bar.called);
        });

        it('should return the result of calling the control function', function () {
            var el = createDomElement();
            var ctrl = {};
            binder.controls.foo = sinon.stub().returns(ctrl);
            assert.strictEqual(binder.bind(el, 'foo'), ctrl);
        });
    });

    describe('.bindMany()', function () {
        beforeEach(function () {
            sinon.stub(binder, 'bind');
        });

        afterEach(function () {
            binder.bind.restore();
        });

        it('should call all of the expected controls with the given element', function () {
            var el = createDomElement();
            var ctrl = {};
            binder.bind.returns(ctrl);
            binder.bindMany(el, ['foo', 'bar', 'baz']);
            assert.isTrue(binder.bind.withArgs(el, 'foo').calledOnce);
            assert.isTrue(binder.bind.withArgs(el, 'bar').calledOnce);
            assert.isTrue(binder.bind.withArgs(el, 'baz').calledOnce);
            assert.isFalse(binder.bind.withArgs(el, 'qux').called);
        });

        it('should return an array of the results from the control functions', function () {
            var el = createDomElement();
            var ctrl = {};
            binder.bind.returns(ctrl);
            assert.deepEqual(binder.bindMany(el, ['foo', 'bar', 'baz']), [ctrl, ctrl, ctrl]);
        });
    });

    describe('.find()', function () {
        var els, prevControlAttr;

        beforeEach(function () {
            prevControlAttr = binder.CONTROL_ATTR;
            binder.CONTROL_ATTR = 'ctrl';
            els = [createDomElement(), createDomElement(), createDomElement()];
            sinon.stub(dom, 'getElementsByAttribute').withArgs('ctrl').returns(els);
        });

        afterEach(function () {
            binder.CONTROL_ATTR = prevControlAttr;
            dom.getElementsByAttribute.restore();
        });

        it('should return the expected DOM elements', function () {
            var found = binder.find();
            assert.strictEqual(found, els);
        });
    });

    describe('.find() with context', function () {
        var ctx, els, prevControlAttr;

        beforeEach(function () {
            prevControlAttr = binder.CONTROL_ATTR;
            binder.CONTROL_ATTR = 'ctrl';
            ctx = createDomElement();
            els = [createDomElement(), createDomElement(), createDomElement()];
            sinon.stub(dom, 'getElementsByAttribute').withArgs('ctrl', ctx).returns(els);
        });

        afterEach(function () {
            binder.CONTROL_ATTR = prevControlAttr;
            dom.getElementsByAttribute.restore();
        });

        it('should return the expected DOM elements', function () {
            var found = binder.find(ctx);
            assert.strictEqual(found, els);
        });
    });

    describe('.findAndBind()', function () {
        var els, prevControlAttr;

        beforeEach(function () {
            prevControlAttr = binder.CONTROL_ATTR;
            binder.CONTROL_ATTR = 'ctrl';
            els = [createDomElement(), createDomElement(), createDomElement()];
            sinon.stub(binder, 'find').returns(els);
            sinon.stub(binder, 'bindMany');
        });

        afterEach(function () {
            binder.find.restore();
            binder.bindMany.restore();
        });

        it('should bind all of the expected controls on each found element', function () {
            els[0].getAttribute.withArgs('ctrl').returns('foo bar');
            els[1].getAttribute.withArgs('ctrl').returns('baz');
            els[2].getAttribute.withArgs('ctrl').returns('   qux   quux   ');
            binder.findAndBind();
            assert.isTrue(binder.find.calledOnce);
            assert.isTrue(binder.bindMany.withArgs(els[0], ['foo', 'bar']).calledOnce);
            assert.isTrue(binder.bindMany.withArgs(els[1], ['baz']).calledOnce);
            assert.isTrue(binder.bindMany.withArgs(els[2], ['qux', 'quux']).calledOnce);
        });
    });

    describe('.findAndBind() with context', function () {
        var ctx, els, prevControlAttr;

        beforeEach(function () {
            prevControlAttr = binder.CONTROL_ATTR;
            binder.CONTROL_ATTR = 'ctrl';
            ctx = createDomElement();
            els = [createDomElement(), createDomElement(), createDomElement()];
            sinon.stub(binder, 'find').returns(els);
            sinon.stub(binder, 'bindMany');
        });

        afterEach(function () {
            binder.find.restore();
            binder.bindMany.restore();
        });

        it('should bind all of the expected controls on each found element', function () {
            els[0].getAttribute.withArgs('ctrl').returns('foo bar');
            els[1].getAttribute.withArgs('ctrl').returns('baz');
            els[2].getAttribute.withArgs('ctrl').returns('   qux   quux   ');
            binder.findAndBind(ctx);
            assert.isTrue(binder.find.withArgs(ctx).calledOnce);
            assert.isTrue(binder.bindMany.withArgs(els[0], ['foo', 'bar']).calledOnce);
            assert.isTrue(binder.bindMany.withArgs(els[1], ['baz']).calledOnce);
            assert.isTrue(binder.bindMany.withArgs(els[2], ['qux', 'quux']).calledOnce);
        });
    });
});
