Asserts that the target collection has a property `name`. You can extend it with another
optional assertion to test the property `value`:

```js
const collection = new Map({
  1: 'foo',
  2: 'bar'
});

expect(collection, 'to have property', 1);
expect(collection, 'to have property', 1, 'to equal', 'foo');
```
