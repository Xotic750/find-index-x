/**
 * @file
 * <a href="https://travis-ci.org/Xotic750/find-index-x"
 * title="Travis status">
 * <img
 * src="https://travis-ci.org/Xotic750/find-index-x.svg?branch=master"
 * alt="Travis status" height="18">
 * </a>
 * <a href="https://david-dm.org/Xotic750/find-index-x"
 * title="Dependency status">
 * <img src="https://david-dm.org/Xotic750/find-index-x.svg"
 * alt="Dependency status" height="18"/>
 * </a>
 * <a
 * href="https://david-dm.org/Xotic750/find-index-x#info=devDependencies"
 * title="devDependency status">
 * <img src="https://david-dm.org/Xotic750/find-index-x/dev-status.svg"
 * alt="devDependency status" height="18"/>
 * </a>
 * <a href="https://badge.fury.io/js/find-index-x" title="npm version">
 * <img src="https://badge.fury.io/js/find-index-x.svg"
 * alt="npm version" height="18">
 * </a>
 *
 * This method returns the index of the first element in the array that satisfies the
 * provided testing function. Otherwise -1 is returned.
 *
 * Requires ES3 or above.
 *
 * @version 1.0.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module find-index-x
 */

/* eslint strict: 1, max-statements: 1, id-length: 1, no-sparse-arrays: 1 */

/* global require, module */

;(function () { // eslint-disable-line no-extra-semi

  'use strict';

  var toLength = require('to-length-x');
  var toObject = require('to-object-x');
  var isString = require('is-string');
  var assertIsCallable = require('assert-is-callable-x');
  var requireObjectCoercible = require('require-object-coercible-x');
  var pFindIndex = Array.prototype.findIndex;

  var implemented = pFindIndex && ([, 1].findIndex(function (item, idx) {
    return idx === 0;
  }) === 0);

  var findIdx;
  if (implemented) {
    findIdx = function findIndex(array, callback) {
      requireObjectCoercible(array);
      var args = [callback];
      if (arguments.length > 2) {
        args.push(arguments[2]);
      }
      return pFindIndex.apply(array, args);
    };
  } else {
    findIdx = function findIndex(array, callback) {
      var object = toObject(array);
      assertIsCallable(callback);
      var length = toLength(object.length);
      if (length < 1) {
        return -1;
      }
      var thisArg;
      if (arguments.length > 2) {
        thisArg = arguments[2];
      }
      var isStr = isString(object);
      var index = 0;
      while (index < length) {
        var item = isStr ? object.charAt(index) : object[index];
        if (callback.call(thisArg, item, index, object)) {
          return index;
        }
        index += 1;
      }
      return -1;
    };
  }

  /**
   * Like `findIndex`, this method returns an index in the array, if an element
   * in the array satisfies the provided testing function. Otherwise -1 is returned.
   *
   * @param {Array} array The array to search.
   * @throws {TypeError} If array is `null` or `undefined`-
   * @param {Function} callback Function to execute on each value in the array,
   *  taking three arguments: `element`, `index` and `array`.
   * @throws {TypeError} If `callback` is not a function.
   * @param {*} [thisArg] Object to use as `this` when executing `callback`.
   * @return {number} Returns index of positively tested element, otherwise -1.
   * @example
   * var findLastIndex = require('find-index-x');
   *
   * function isPrime(element, index, array) {
   *   var start = 2;
   *   while (start <= Math.sqrt(element)) {
   *     if (element % start++ < 1) {
   *       return false;
   *     }
   *   }
   *   return element > 1;
   * }
   *
   * console.log(findIndex([4, 6, 8, 12, 14], isPrime)); // -1, not found
   * console.log(findIndex([4, 6, 7, 12, 13], isPrime)); // 2
   */
  module.exports = findIdx;
}());
