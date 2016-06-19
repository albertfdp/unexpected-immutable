const { Seq } = require('immutable')

const SeqType = {
  name: 'Seq',
  base: 'Collection',
  identify: value => Seq.isSeq(value)
}

module.exports = SeqType
