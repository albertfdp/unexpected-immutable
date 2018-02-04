const {
  is,
  Map,
  OrderedMap,
  List,
  Set,
  OrderedSet,
  Seq,
  Stack
} = require('immutable');

const RecordType = {
  name: 'ImmutableRecord',
  base: 'object',
  identify: record => {
    // FIXME
    // in immutable@4.0.0 it will be possible to
    // Record.isRecord(record)
    return (
      record &&
      typeof record.toJS === 'function' &&
      !List.isList(record) &&
      !Set.isSet(record) &&
      !OrderedSet.isOrderedSet(record) &&
      !Seq.isSeq(record) &&
      !Stack.isStack(record) &&
      !Map.isMap(record) &&
      !OrderedMap.isOrderedMap(record)
    );
  },
  equal: function(a, b) {
    return is(a, b);
  },
  inspect: function(record, depth, output, inspect) {
    return output.text('new Record(').append(inspect(record.toJS())).text(')');
  },
  diff: function(actual, expected, output, diff) {
    return diff(actual.toJS(), expected.toJS());
  }
};

module.exports = RecordType;
