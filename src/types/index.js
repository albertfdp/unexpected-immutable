const CollectionType = require('./Collection')
const ListType = require('./List')
const MapType = require('./Map')
const OrderedMap = require('./OrderedMap')
const OrderedSetType = require('./OrderedSetType')
const SeqType = require('./Seq')
const SetType = require('./Set')
const StackType = require('./Stack')

const types = {
  installInto: function (expect) {
    expect.addType(CollectionType)
    expect.addType(ListType)
    expect.addType(MapType)
    expect.addType(OrderedMap)
    expect.addType(OrderedSetType)
    expect.addType(SeqType)
    expect.addType(SetType)
    expect.addType(StackType)
  }
}

module.exports = types
