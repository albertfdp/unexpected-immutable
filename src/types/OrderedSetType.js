const { OrderedSet } = require('immutable');

const OrderedSetType = {
  name: 'ImmutableOrderedSet',
  base: 'ImmutableCollection',
  identify: value => OrderedSet.isOrderedSet(value)
};

module.exports = OrderedSetType;
