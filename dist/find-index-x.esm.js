var _this = this;

function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }

import attempt from 'attempt-x';
import toLength from 'to-length-x';
import toObject from 'to-object-x';
import assertIsFunction from 'assert-is-function-x';
import splitIfBoxedBug from 'split-if-boxed-bug-x';
var pFindIndex = typeof Array.prototype.findIndex === 'function' && Array.prototype.findIndex;
var isWorking;

if (pFindIndex) {
  var testArr = [];
  testArr.length = 2;
  testArr[1] = 1;
  var res = attempt.call(testArr, pFindIndex, function (item, idx) {
    _newArrowCheck(this, _this);

    return idx === 0;
  }.bind(this));
  isWorking = res.threw === false && res.value === 0;

  if (isWorking) {
    res = attempt.call(1, pFindIndex, function (item, idx) {
      _newArrowCheck(this, _this);

      return idx === 0;
    }.bind(this));
    isWorking = res.threw === false && res.value === -1;
  }

  if (isWorking) {
    isWorking = attempt.call([], pFindIndex).threw;
  }

  if (isWorking) {
    res = attempt.call('abc', pFindIndex, function (item) {
      _newArrowCheck(this, _this);

      return item === 'c';
    }.bind(this));
    isWorking = res.threw === false && res.value === 2;
  }

  if (isWorking) {
    res = attempt.call(function getArgs() {
      /* eslint-disable-next-line prefer-rest-params */
      return arguments;
    }('a', 'b', 'c'), pFindIndex, function (item) {
      _newArrowCheck(this, _this);

      return item === 'c';
    }.bind(this));
    isWorking = res.threw === false && res.value === 2;
  }
}
/**
 * Like `findIndex`, this method returns an index in the array, if an element
 * in the array satisfies the provided testing function. Otherwise -1 is returned.
 *
 * @param {Array} array - The array to search.
 * @throws {TypeError} If array is `null` or `undefined`-.
 * @param {Function} callback - Function to execute on each value in the array,
 *  taking three arguments: `element`, `index` and `array`.
 * @throws {TypeError} If `callback` is not a function.
 * @param {*} [thisArg] - Object to use as `this` when executing `callback`.
 * @returns {number} Returns index of positively tested element, otherwise -1.
 */


var findIdx;

if (isWorking) {
  findIdx = function findIndex(array, callback) {
    var args = [callback];

    if (arguments.length > 2) {
      /* eslint-disable-next-line prefer-rest-params,prefer-destructuring */
      args[1] = arguments[2];
    }

    return pFindIndex.apply(array, args);
  };
} else {
  findIdx = function findIndex(array, callback) {
    var object = toObject(array);
    assertIsFunction(callback);
    var iterable = splitIfBoxedBug(object);
    var length = toLength(iterable.length);

    if (length < 1) {
      return -1;
    }

    var thisArg;

    if (arguments.length > 2) {
      /* eslint-disable-next-line prefer-rest-params,prefer-destructuring */
      thisArg = arguments[2];
    }

    var index = 0;

    while (index < length) {
      if (callback.call(thisArg, iterable[index], index, object)) {
        return index;
      }

      index += 1;
    }

    return -1;
  };
}

var fi = findIdx;
export default fi;

//# sourceMappingURL=find-index-x.esm.js.map