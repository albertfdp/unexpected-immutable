const { OrderedSet, Set } = require('immutable');

const SetType = {
  name: 'Set',
  base: 'Collection',
  identify: value => Set.isSet(value) && !OrderedSet.isOrderedSet(value)
};

module.exports = SetType;
