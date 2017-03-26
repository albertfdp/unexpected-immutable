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
      return new List(data);
    case 'Map': {
      const keyValue = data.reduce(
        (previous, current) => {
          previous[current] = (previous[current] || 0) + 1;
          return previous;
        },
        {}
      );
      return new Map(keyValue);
    }
    case 'OrderedMap': {
      const keyValue = data.reduce(
        (previous, current) => {
          previous[current] = (previous[current] || 0) + 1;
          return previous;
        },
        {}
      );
      return new OrderedMap(keyValue);
    }
    case 'OrderedSet':
      return new OrderedSet(data);
    case 'Seq':
      return new Seq(data);
    case 'Set':
      return new Set(data);
    case 'Stack':
      return new Stack(data);
    default:
      return new Collection(data);
  }
};

module.exports = CollectionFactory;
