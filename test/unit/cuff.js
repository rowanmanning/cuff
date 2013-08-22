/* jshint maxlen: 200 */
/* global afterEach, beforeEach, describe, it */
'use strict';

var assert = require('proclaim');
var sinon = require('sinon');
var createDomElement = require('../mock/dom-element').createDomElement;

describe('cuff', function () {
    var cuff = require('../../lib/cuff');
    var dom = require('../../lib/util/dom');

    afterEach(function () {
        cuff.controls = {};
    });

    it('should be a function', function () {
        assert.isFunction(cuff);
    });

    it('should be the same as the findAndBind function', function () {
        assert.strictEqual(cuff, cuff.findAndBind);
    });

    it('should have a controls property', function () {
        assert.isObject(cuff.controls);
    });

    it('should have a CONTROL_ATTR property', function () {
        assert.strictEqual(cuff.CONTROL_ATTR, 'data-control');
    });

    it('should have a bind function', function () {
        assert.isFunction(cuff.bind);
    });

    it('should have a bindMany function', function () {
        assert.isFunction(cuff.bindMany);
    });

    it('should have a find function', function () {
        assert.isFunction(cuff.find);
    });

    it('should have a findAndBind function', function () {
        assert.isFunction(cuff.findAndBind);
    });

    describe('.bind()', function () {
        it('should call the expected control with the given element', function () {
            var el = createDomElement();
            var ctrl = {};
            cuff.controls.foo = sinon.stub().returns(ctrl);
            cuff.controls.bar = sinon.spy();
            cuff.bind(el, 'foo');
            assert.isTrue(cuff.controls.foo.withArgs(el).calledOnce);
            assert.isFalse(cuff.controls.bar.called);
        });

        it('should return the result of calling the control function', function () {
            var el = createDomElement();
            var ctrl = {};
            cuff.controls.foo = sinon.stub().returns(ctrl);
            assert.strictEqual(cuff.bind(el, 'foo'), ctrl);
        });
    });

    describe('.bindMany()', function () {
        beforeEach(function () {
            sinon.stub(cuff, 'bind');
        });

        afterEach(function () {
            cuff.bind.restore();
        });

        it('should call all of the expected controls with the given element', function () {
            var el = createDomElement();
            var ctrl = {};
            cuff.bind.returns(ctrl);
            cuff.bindMany(el, ['foo', 'bar', 'baz']);
            assert.isTrue(cuff.bind.withArgs(el, 'foo').calledOnce);
            assert.isTrue(cuff.bind.withArgs(el, 'bar').calledOnce);
            assert.isTrue(cuff.bind.withArgs(el, 'baz').calledOnce);
            assert.isFalse(cuff.bind.withArgs(el, 'qux').called);
        });

        it('should return an array of the results from the control functions', function () {
            var el = createDomElement();
            var ctrl = {};
            cuff.bind.returns(ctrl);
            assert.deepEqual(cuff.bindMany(el, ['foo', 'bar', 'baz']), [ctrl, ctrl, ctrl]);
        });
    });

    describe('.find()', function () {
        var els, prevControlAttr;

        beforeEach(function () {
            prevControlAttr = cuff.CONTROL_ATTR;
            cuff.CONTROL_ATTR = 'ctrl';
            els = [createDomElement(), createDomElement(), createDomElement()];
            sinon.stub(dom, 'getElementsByAttribute').withArgs('ctrl').returns(els);
        });

        afterEach(function () {
            cuff.CONTROL_ATTR = prevControlAttr;
            dom.getElementsByAttribute.restore();
        });

        it('should return the expected DOM elements', function () {
            var found = cuff.find();
            assert.strictEqual(found, els);
        });
    });

    describe('.find() with context', function () {
        var ctx, els, prevControlAttr;

        beforeEach(function () {
            prevControlAttr = cuff.CONTROL_ATTR;
            cuff.CONTROL_ATTR = 'ctrl';
            ctx = createDomElement();
            els = [createDomElement(), createDomElement(), createDomElement()];
            sinon.stub(dom, 'getElementsByAttribute').withArgs('ctrl', ctx).returns(els);
        });

        afterEach(function () {
            cuff.CONTROL_ATTR = prevControlAttr;
            dom.getElementsByAttribute.restore();
        });

        it('should return the expected DOM elements', function () {
            var found = cuff.find(ctx);
            assert.strictEqual(found, els);
        });
    });

    describe('.findAndBind()', function () {
        var els, prevControlAttr;

        beforeEach(function () {
            prevControlAttr = cuff.CONTROL_ATTR;
            cuff.CONTROL_ATTR = 'ctrl';
            els = [createDomElement(), createDomElement(), createDomElement()];
            sinon.stub(cuff, 'find').returns(els);
            sinon.stub(cuff, 'bindMany');
        });

        afterEach(function () {
            cuff.find.restore();
            cuff.bindMany.restore();
        });

        it('should bind all of the expected controls on each found element', function () {
            els[0].getAttribute.withArgs('ctrl').returns('foo bar');
            els[1].getAttribute.withArgs('ctrl').returns('baz');
            els[2].getAttribute.withArgs('ctrl').returns('   qux   quux   ');
            cuff.findAndBind();
            assert.isTrue(cuff.find.calledOnce);
            assert.isTrue(cuff.bindMany.withArgs(els[0], ['foo', 'bar']).calledOnce);
            assert.isTrue(cuff.bindMany.withArgs(els[1], ['baz']).calledOnce);
            assert.isTrue(cuff.bindMany.withArgs(els[2], ['qux', 'quux']).calledOnce);
        });
    });

    describe('.findAndBind() with context', function () {
        var ctx, els, prevControlAttr;

        beforeEach(function () {
            prevControlAttr = cuff.CONTROL_ATTR;
            cuff.CONTROL_ATTR = 'ctrl';
            ctx = createDomElement();
            els = [createDomElement(), createDomElement(), createDomElement()];
            sinon.stub(cuff, 'find').returns(els);
            sinon.stub(cuff, 'bindMany');
        });

        afterEach(function () {
            cuff.find.restore();
            cuff.bindMany.restore();
        });

        it('should bind all of the expected controls on each found element', function () {
            els[0].getAttribute.withArgs('ctrl').returns('foo bar');
            els[1].getAttribute.withArgs('ctrl').returns('baz');
            els[2].getAttribute.withArgs('ctrl').returns('   qux   quux   ');
            cuff.findAndBind(ctx);
            assert.isTrue(cuff.find.withArgs(ctx).calledOnce);
            assert.isTrue(cuff.bindMany.withArgs(els[0], ['foo', 'bar']).calledOnce);
            assert.isTrue(cuff.bindMany.withArgs(els[1], ['baz']).calledOnce);
            assert.isTrue(cuff.bindMany.withArgs(els[2], ['qux', 'quux']).calledOnce);
        });
    });
});
