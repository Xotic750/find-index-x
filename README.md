<a
  href="https://travis-ci.org/Xotic750/find-index-x"
  title="Travis status">
<img
  src="https://travis-ci.org/Xotic750/find-index-x.svg?branch=master"
  alt="Travis status" height="18">
</a>
<a
  href="https://david-dm.org/Xotic750/find-index-x"
  title="Dependency status">
<img src="https://david-dm.org/Xotic750/find-index-x/status.svg"
  alt="Dependency status" height="18"/>
</a>
<a
  href="https://david-dm.org/Xotic750/find-index-x?type=dev"
  title="devDependency status">
<img src="https://david-dm.org/Xotic750/find-index-x/dev-status.svg"
  alt="devDependency status" height="18"/>
</a>
<a
  href="https://badge.fury.io/js/find-index-x"
  title="npm version">
<img src="https://badge.fury.io/js/find-index-x.svg"
  alt="npm version" height="18">
</a>
<a
  href="https://www.jsdelivr.com/package/npm/find-index-x"
  title="jsDelivr hits">
<img src="https://data.jsdelivr.com/v1/package/npm/find-index-x/badge?style=rounded"
  alt="jsDelivr hits" height="18">
</a>
<a
  href="https://bettercodehub.com/results/Xotic750/find-index-x"
  title="bettercodehub score">
<img src="https://bettercodehub.com/edge/badge/Xotic750/find-index-x?branch=master"
  alt="bettercodehub score" height="18">
</a>
<a
  href="https://coveralls.io/github/Xotic750/find-index-x?branch=master"
  title="Coverage Status">
<img src="https://coveralls.io/repos/github/Xotic750/find-index-x/badge.svg?branch=master"
  alt="Coverage Status" height="18">
</a>

<a name="module_find-index-x"></a>

## find-index-x

This method returns the index of the first element in the array that satisfies the provided testing function.

<a name="exp_module_find-index-x--module.exports"></a>

### `module.exports` ⇒ <code>number</code> ⏏

Like `findIndex`, this method returns an index in the array, if an element
in the array satisfies the provided testing function. Otherwise -1 is returned.

**Kind**: Exported member  
**Returns**: <code>number</code> - Returns index of positively tested element, otherwise -1.  
**Throws**:

- <code>TypeError</code> If array is `null` or `undefined`-
- <code>TypeError</code> If `callback` is not a function.

| Param     | Type                  | Description                                                                                             |
| --------- | --------------------- | ------------------------------------------------------------------------------------------------------- |
| array     | <code>Array</code>    | The array to search.                                                                                    |
| callback  | <code>function</code> | Function to execute on each value in the array, taking three arguments: `element`, `index` and `array`. |
| [thisArg] | <code>\*</code>       | Object to use as `this` when executing `callback`.                                                      |

**Example**

```js
import findIndex from 'find-index-x';

function isPrime(element, index, array) {
  let start = 2;
  while (start <= Math.sqrt(element)) {
    if (element % start < 1) {
      return false;
    }

    start += 1;
  }

  return element > 1;
}

console.log(findIndex([4, 6, 8, 12, 14], isPrime)); // -1, not found
console.log(findIndex([4, 6, 7, 12, 13], isPrime)); // 2
```
