Asserts that values of the target are equivalent ot the values of the `Collection`.

**Important**: Immutable data structures should **only** contain other immutable data structures (unlike `Array`s and `Object`s) to be considered immutable and properly work against `to equal`).


```js
const foo = new List([ 1, 2, 3 ]);
const bar = new List([ 1, 2, 3 ]);

expect(foo, 'to equal', bar);
```
