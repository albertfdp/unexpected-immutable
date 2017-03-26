const { OrderedSet } = require('immutable');

const OrderedSetType = {
  name: 'OrderedSet',
  base: 'Collection',
  identify: value => OrderedSet.isOrderedSet(value)
};

module.exports = OrderedSetType;
