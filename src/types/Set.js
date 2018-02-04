const { OrderedSet, Set } = require('immutable');

const SetType = {
  name: 'ImmutableSet',
  base: 'ImmutableCollection',
  identify: value => Set.isSet(value) && !OrderedSet.isOrderedSet(value)
};

module.exports = SetType;
