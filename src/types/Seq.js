const { Seq } = require('immutable');

const SeqType = {
  name: 'ImmutableSeq',
  base: 'ImmutableCollection',
  identify: value => Seq.isSeq(value)
};

module.exports = SeqType;
