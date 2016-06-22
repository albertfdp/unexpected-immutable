const unexpected = require('unexpected')
const unexpectedImmutable = require('../src')

const expect = unexpected.clone().use(unexpectedImmutable)

expect.addAssertion('<any> to inspect as <string>', (expect, subject, value) => {
  expect(expect.inspect(subject).toString(), 'to equal', value)
})

expect.addAssertion('<array> to produce a diff of <string>', (expect, subject, value) => {
  expect.errorMode = 'bubble'
  expect(expect.diff(
    subject[0],
    subject[1]
  ).diff.toString(), 'to equal', value)
})

module.exports = expect
