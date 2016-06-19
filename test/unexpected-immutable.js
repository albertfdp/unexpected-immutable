const unexpected = require('unexpected')
const unexpectedImmutable = require('../src')

const expect = unexpected.clone().use(unexpectedImmutable)

module.exports = expect
