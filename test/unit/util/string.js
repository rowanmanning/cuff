/* jshint maxlen: 200 */
/* global describe, it */
'use strict';

var assert = require('proclaim');

describe('util/string', function () {
    var str = require('../../../lib/util/string');

    it('should be an object', function () {
        assert.isObject(str);
    });

    it('should have a trim function', function () {
        assert.isFunction(str.trim);
    });

    describe('.trim()', function () {
        it('should strip whitespace from the beginning and end of a string', function () {
            assert.strictEqual(str.trim(' foo '), 'foo');
            assert.strictEqual(str.trim('   foo   '), 'foo');
            assert.strictEqual(str.trim(' \n\t foo \n\t '), 'foo');
        });
    });
});
