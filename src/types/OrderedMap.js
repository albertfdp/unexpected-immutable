const { OrderedMap } = require('immutable')

const OrderedMapType = {
  name: 'OrderedMap',
  base: 'Map',
  identify: value => OrderedMap.isOrderedMap(value)
}

module.exports = OrderedMapType
