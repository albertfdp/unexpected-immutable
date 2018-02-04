const { Stack } = require('immutable');

const StackType = {
  name: 'ImmutableStack',
  base: 'ImmutableCollection',
  identify: value => Stack.isStack(value)
};

module.exports = StackType;
