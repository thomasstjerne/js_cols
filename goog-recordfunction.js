// Copyright 2010 The Closure Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
var assert = require('assert');
/**
 * @fileoverview Helper class for recording the calls of a function.
 *
 * Example:
 * <pre>
 * var stubs = new exports.PropertyReplacer();
 *
 * function tearDown() {
 *   stubs.reset();
 * }
 *
 * function testShuffle() {
 *   stubs.set(Math, 'random', exports.recordFunction(Math.random));
 *   var arr = shuffle([1, 2, 3, 4, 5]);
 *   assertSameElements([1, 2, 3, 4, 5], arr);
 *   assertEquals(4, Math.random.getCallCount());
 * }
 *
 * function testOpenDialog() {
 *   stubs.set(goog.ui, 'Dialog',
 *       exports.recordConstructor(goog.ui.Dialog));
 *   openConfirmDialog();
 *   var lastDialogInstance = goog.ui.Dialog.getLastCall().getThis();
 *   assertEquals('confirm', lastDialogInstance.getTitle());
 * }
 * </pre>
 *
 

goog.provide('exports.FunctionCall');
goog.provide('exports.recordConstructor');
goog.provide('exports.recordFunction');

goog.require('exports.asserts');

*/
/**
 * Wraps the function into another one which calls the inner function and
 * records its calls. The recorded function will have 3 static methods:
 * {@code getCallCount}, {@code getCalls} and {@code getLastCall} but won't
 * inherit the original function's prototype and static fields.
 *
 * @param {!Function=} opt_f The function to wrap and record. Defaults to
 *     {@link goog.nullFunction}.
 * @return {!Function} The wrapped function.
 */
exports.recordFunction = function(opt_f) {
  var f = opt_f ;
  var calls = [];

  function recordedFunction() {
    try {
      var ret = f.apply(this, arguments);
      calls.push(new exports.FunctionCall(f, this, arguments, ret, null));
      return ret;
    } catch (err) {
      calls.push(new exports.FunctionCall(f, this, arguments, undefined,
          err));
      throw err;
    }
  }

  /**
   * @return {number} Total number of calls.
   */
  recordedFunction.getCallCount = function() {
    return calls.length;
  };

  /**
   * Asserts that the function was called {@code expected} times.
   * @param {number} expected The expected number of calls.
   */
  recordedFunction.assertCallCount = function(expected) {
    var actual = calls.length;
    assert.equal(
        expected, actual, 'Expected ' + expected + ' call(s), but was ' + actual + '.');
  };

  /**
   * @return {!Array.<!exports.FunctionCall>} All calls of the recorded
   *     function.
   */
  recordedFunction.getCalls = function() {
    return calls;
  };


  /**
   * @return {exports.FunctionCall} Last call of the recorded function or
   *     null if it hasn't been called.
   */
  recordedFunction.getLastCall = function() {
    return calls[calls.length - 1] || null;
  };

  /**
   * Returns and removes the last call of the recorded function.
   * @return {exports.FunctionCall} Last call of the recorded function or
   *     null if it hasn't been called.
   */
  recordedFunction.popLastCall = function() {
    return calls.pop() || null;
  };

  /**
   * Resets the recorded function and removes all calls.
   */
  recordedFunction.reset = function() {
    calls.length = 0;
  };

  return recordedFunction;
};


/**
 * Same as {@link exports.recordFunction} but the recorded function will
 * have the same prototype and static fields as the original one. It can be
 * used with constructors.
 *
 * @param {!Function} ctor The function to wrap and record.
 * @return {!Function} The wrapped function.
 
exports.recordConstructor = function(ctor) {
  var recordedConstructor = exports.recordFunction(ctor);
  recordedConstructor.prototype = ctor.prototype;
  goog.mixin(recordedConstructor, ctor);
  return recordedConstructor;
};

*/

/**
 * Struct for a single function call.
 * @param {!Function} func The called function.
 * @param {!Object} thisContext {@code this} context of called function.
 * @param {!Arguments} args Arguments of the called function.
 * @param {*} ret Return value of the function or undefined in case of error.
 * @param {*} error The error thrown by the function or null if none.
 * @constructor
 */
exports.FunctionCall = function(func, thisContext, args, ret, error) {
  this.function_ = func;
  this.thisContext_ = thisContext;
  this.arguments_ = Array.prototype.slice.call(args);
  this.returnValue_ = ret;
  this.error_ = error;
};


/**
 * @return {!Function} The called function.
 */
exports.FunctionCall.prototype.getFunction = function() {
  return this.function_;
};


/**
 * @return {!Object} {@code this} context of called function. It is the same as
 *     the created object if the function is a constructor.
 */
exports.FunctionCall.prototype.getThis = function() {
  return this.thisContext_;
};


/**
 * @return {!Array} Arguments of the called function.
 */
exports.FunctionCall.prototype.getArguments = function() {
  return this.arguments_;
};


/**
 * Returns the nth argument of the called function.
 * @param {number} index 0-based index of the argument.
 * @return {*} The argument value or undefined if there is no such argument.
 */
exports.FunctionCall.prototype.getArgument = function(index) {
  return this.arguments_[index];
};


/**
 * @return {*} Return value of the function or undefined in case of error.
 */
exports.FunctionCall.prototype.getReturnValue = function() {
  return this.returnValue_;
};


/**
 * @return {*} The error thrown by the function or null if none.
 */
exports.FunctionCall.prototype.getError = function() {
  return this.error_;
};