const { Stack } = require('immutable');

const StackType = {
  name: 'Stack',
  base: 'Collection',
  identify: value => Stack.isStack(value)
};

module.exports = StackType;
