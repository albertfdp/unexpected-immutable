const {
  Collection,
  List,
  Map,
  OrderedSet,
  OrderedMap,
  Seq,
  Set,
  Stack
} = require('immutable');

const CollectionFactory = (type, data) => {
  switch (type) {
    case 'List':
      return List(data);
    case 'Map': {
      const keyValue = data.reduce((previous, current) => {
        previous[current] = (previous[current] || 0) + 1;
        return previous;
      }, {});
      return Map(keyValue);
    }
    case 'OrderedMap': {
      const keyValue = data.reduce((previous, current) => {
        previous[current] = (previous[current] || 0) + 1;
        return previous;
      }, {});
      return OrderedMap(keyValue);
    }
    case 'OrderedSet':
      return OrderedSet(data);
    case 'Seq':
      return Seq(data);
    case 'Set':
      return Set(data);
    case 'Stack':
      return Stack(data);
    default:
      return Collection(data);
  }
};

module.exports = CollectionFactory;
