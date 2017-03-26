const { List } = require('immutable');

const ListType = {
  name: 'List',
  base: 'Collection',
  identify: value => List.isList(value)
};

module.exports = ListType;
