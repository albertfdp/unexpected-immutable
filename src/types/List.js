const { List } = require('immutable');

const ListType = {
  name: 'ImmutableList',
  base: 'ImmutableCollection',
  identify: value => List.isList(value)
};

module.exports = ListType;
