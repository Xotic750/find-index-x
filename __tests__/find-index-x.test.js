import findIndex from '../src/find-index-x';

const itHasDoc = typeof document !== 'undefined' && document ? it : xit;

describe('findIndex', function() {
  let list;

  beforeEach(function() {
    list = [5, 10, 15, 20];
  });

  it('should throw when target is null or undefined', function() {
    expect.assertions(3);
    expect(function() {
      findIndex();
    }).toThrowErrorMatchingSnapshot();

    expect(function() {
      findIndex(void 0);
    }).toThrowErrorMatchingSnapshot();

    expect(function() {
      findIndex(null);
    }).toThrowErrorMatchingSnapshot();
  });

  it('should have a length of 2', function() {
    expect.assertions(1);
    expect(findIndex).toHaveLength(2);
  });

  it('should find item key by predicate', function() {
    expect.assertions(1);
    const result = findIndex(list, function(item) {
      return item === 15;
    });
    expect(result).toBe(2);
  });

  it('should return -1 when nothing matched', function() {
    expect.assertions(1);
    const result = findIndex(list, function(item) {
      return item === 'a';
    });
    expect(result).toBe(-1);
  });

  it('should throw TypeError when function was not passed', function() {
    expect.assertions(1);
    expect(function() {
      list.findIndex();
    }).toThrowErrorMatchingSnapshot();
  });

  it('should receive all three parameters', function() {
    expect.assertions(9);
    const index = findIndex(list, function(value, idx, arr) {
      expect(list[idx]).toBe(value);
      expect(list).toStrictEqual(arr);

      return false;
    });
    expect(index).toBe(-1);
  });

  it('should work with the context argument', function() {
    expect.assertions(1);
    const context = {};
    findIndex(
      [1],
      function() {
        /* eslint-disable-next-line babel/no-invalid-this */
        expect(this).toBe(context);
      },
      context,
    );
  });

  it('should work with an array-like object', function() {
    expect.assertions(1);
    const obj = {
      0: 1,
      1: 2,
      2: 3,
      length: 3,
    };

    const foundIndex = findIndex(obj, function(item) {
      return item === 2;
    });

    expect(foundIndex).toBe(1);
  });

  it('should work with an array-like object with negative length', function() {
    expect.assertions(1);
    const obj = {
      0: 1,
      1: 2,
      2: 3,
      length: -3,
    };

    const foundIndex = findIndex(obj, function(item) {
      throw new Error(`should not reach here ${item}`);
    });

    expect(foundIndex).toBe(-1);
  });

  it('should work with a sparse array', function() {
    expect.assertions(3);
    // noinspection JSConsecutiveCommasInArrayLiteral
    const obj = [1, , void 0]; /* eslint-disable-line no-sparse-arrays */
    expect(1 in obj).toBe(false);
    const seen = [];
    const foundIndex = findIndex(obj, function(item, idx) {
      seen.push([idx, item]);

      return typeof item === 'undefined' && idx === 2;
    });
    expect(foundIndex).toBe(2);

    expect(seen).toStrictEqual([
      [0, 1],
      [1, void 0],
      [2, void 0],
    ]);
  });

  it('should work with a sparse array-like object', function() {
    expect.assertions(2);
    const obj = {
      0: 1,

      2: void 0,
      length: 3.2,
    };

    const seen = [];
    const foundIndex = findIndex(obj, function(item, idx) {
      seen.push([idx, item]);

      return false;
    });

    expect(foundIndex).toBe(-1);

    expect(seen).toStrictEqual([
      [0, 1],
      [1, void 0],
      [2, void 0],
    ]);
  });

  it('should work with strings', function() {
    expect.assertions(2);
    const seen = [];
    const foundIndex = findIndex('abc', function(item, idx) {
      seen.push([idx, item]);

      return false;
    });

    expect(foundIndex).toBe(-1);
    expect(seen).toStrictEqual([
      [0, 'a'],
      [1, 'b'],
      [2, 'c'],
    ]);
  });

  it('should work with arguments', function() {
    expect.assertions(2);
    const obj = (function() {
      return arguments;
    })('a', 'b', 'c');

    const seen = [];
    const foundIndex = findIndex(obj, function(item, idx) {
      seen.push([idx, item]);

      return false;
    });

    expect(foundIndex).toBe(-1);
    expect(seen).toStrictEqual([
      [0, 'a'],
      [1, 'b'],
      [2, 'c'],
    ]);
  });

  itHasDoc('should work wih DOM elements', function() {
    expect.assertions(1);
    const fragment = document.createDocumentFragment();
    const div = document.createElement('div');
    fragment.appendChild(div);
    const callback = jasmine.createSpy('callback');
    findIndex(fragment.childNodes, callback);
    expect(callback).toHaveBeenCalledWith(div, 0, fragment.childNodes);
  });
});
