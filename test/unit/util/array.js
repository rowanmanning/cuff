/* jshint maxlen: 200 */
/* global beforeEach, describe, it */
'use strict';

var assert = require('proclaim');
var sinon = require('sinon');

describe('util/array', function () {
    var arr = require('../../../lib/util/array');

    it('should be an object', function () {
        assert.isObject(arr);
    });

    it('should have an each function', function () {
        assert.isFunction(arr.each);
    });

    it('should have a map function', function () {
        assert.isFunction(arr.map);
    });

    it('should have a filter function', function () {
        assert.isFunction(arr.filter);
    });

    describe('.each()', function () {
        var array, fn;

        beforeEach(function () {
            array = [1, 2, 3];
            fn = sinon.spy();
        });

        it('should call the given function with each item in the array', function () {
            arr.each(array, fn);
            assert.strictEqual(fn.callCount, array.length);
            assert.deepEqual(fn.getCall(0).args, [array[0], 0, array]);
            assert.deepEqual(fn.getCall(1).args, [array[1], 1, array]);
            assert.deepEqual(fn.getCall(2).args, [array[2], 2, array]);
        });

        it('should return the original array unmodified', function () {
            assert.strictEqual(arr.each(array, fn), array);
        });
    });

    describe('.map()', function () {
        var array, fn;

        beforeEach(function () {
            array = [1, 2, 3];
            fn = sinon.spy(function (val) {
                return val + 1;
            });
        });

        it('should call the given function with each item in the array', function () {
            arr.map(array, fn);
            assert.strictEqual(fn.callCount, array.length);
            assert.deepEqual(fn.getCall(0).args, [array[0], 0, array]);
            assert.deepEqual(fn.getCall(1).args, [array[1], 1, array]);
            assert.deepEqual(fn.getCall(2).args, [array[2], 2, array]);
        });

        it('should return the expected array of values', function () {
            assert.deepEqual(arr.map(array, fn), [2, 3, 4]);
        });
    });

    describe('.filter()', function () {
        var array, fn;

        beforeEach(function () {
            array = [1, 2, 3, 4, 5];
            fn = sinon.spy(function (val) {
                return (val % 2 === 0);
            });
        });

        it('should call the given function with each item in the array', function () {
            arr.filter(array, fn);
            assert.strictEqual(fn.callCount, array.length);
            assert.deepEqual(fn.getCall(0).args, [array[0], 0, array]);
            assert.deepEqual(fn.getCall(1).args, [array[1], 1, array]);
            assert.deepEqual(fn.getCall(2).args, [array[2], 2, array]);
            assert.deepEqual(fn.getCall(3).args, [array[3], 3, array]);
            assert.deepEqual(fn.getCall(4).args, [array[4], 4, array]);
        });

        it('should return the expected array of values', function () {
            assert.deepEqual(arr.filter(array, fn), [2, 4]);
        });
    });

});
