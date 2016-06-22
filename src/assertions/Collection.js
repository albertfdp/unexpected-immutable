const collectionAssertions = function (expect) {
  expect.addAssertion(
    [
      '<Collection|Map> [not] to have size <number>',
      '<Collection|Map> [not] to have length <number>'
    ],
    (expect, subject, length) => {
      if (!expect.flags.not) {
        expect.errorMode = 'nested'
      }
      expect(subject.size, '[not] to be', length)
    }
  )

  expect.addAssertion(
    [
      '<Collection|Map> [not] to be empty'
    ],
    (expect, subject) => expect(subject, '[not] to have size', 0)
  )

  expect.addAssertion(
    [
      '<Collection|Map> to be non-empty'
    ],
    (expect, subject) => expect(subject, 'not to be empty')
  )

  expect.addAssertion(
    [
      '<Collection> [not] to contain <any+>',
      '<Collection> [not] to include <any+>'
    ],
    (expect, subject, value) => {
      expect.withError(() => {
        expect(subject.contains(value), '[not] to be true')
      }, () => {
        expect.fail({
          diff: function (output, diff, inspect, equal) {
            output.inline = true
            expect.subjectType.prefix(output, subject)
            output.nl().indentLines()

            let subjectElements = []
            subject.forEach(element => {
              subjectElements.push(element)
            })

            subjectElements.forEach((element, idx) => {
              output
                .i()
                .block(function () {
                  this.appendInspected(element)
                  expect.subjectType.delimiter(this, idx, subjectElements.length)
                  if (expect.flags.not && element === value) {
                    this.sp().annotationBlock(function () {
                      this.error('should be removed')
                    })
                  }
                }).nl()
            })

            if (!expect.flags.not) {
              output
                .i()
                .block(function () {
                  this.annotationBlock(function () {
                    this.error('missing').sp().appendInspected(value)
                  })
                }).nl()
            }

            output.outdentLines()
            expect.subjectType.suffix(output, subject)
            return output
          }
        })
      })
    }
  )
}

module.exports = collectionAssertions
