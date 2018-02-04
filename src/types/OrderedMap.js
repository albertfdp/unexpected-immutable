const { OrderedMap } = require('immutable');

const OrderedMapType = {
  name: 'ImmutableOrderedMap',
  base: 'ImmutableMap',
  identify: value => OrderedMap.isOrderedMap(value)
};

module.exports = OrderedMapType;
