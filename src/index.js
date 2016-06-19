const assertions = require('./assertions')
const types = require('./types')

const unexpectedImmutable = {
  name: 'unexpected-immutable',

  installInto: function (expect) {
    types.installInto(expect)
    assertions.installInto(expect)
  }
}

module.exports = unexpectedImmutable
