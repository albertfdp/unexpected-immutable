Asserts that the keyed collection contains all of the passed-in keys.

```js
const collection = new Map({
  1: 'foo',
  2: 'bar'
});

expect(collection, 'to have keys', [ 1, 2 ]);
```
