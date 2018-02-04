const collectionAssertions = function(expect) {
  expect.addAssertion(
    [
      '<ImmutableCollection|ImmutableMap> [not] to have size <number>',
      '<ImmutableCollection|ImmutableMap> [not] to have length <number>'
    ],
    (expect, subject, length) => {
      if (!expect.flags.not) {
        expect.errorMode = 'nested';
      }
      expect(subject.size, '[not] to be', length);
    }
  );

  expect.addAssertion(
    ['<ImmutableCollection|ImmutableMap> [not] to be empty'],
    (expect, subject) => expect(subject, '[not] to have size', 0)
  );

  expect.addAssertion(
    ['<ImmutableCollection|ImmutableMap> to be non-empty'],
    (expect, subject) => expect(subject, 'not to be empty')
  );

  expect.addAssertion(
    ['<ImmutableMap|ImmutableOrderedMap> [not] to have keys <array>'],
    (expect, subject, value) => {
      expect(subject.hasIn(value), '[not] to be true');
    }
  );

  expect.addAssertion(
    [
      '<ImmutableMap|ImmutableOrderedMap|ImmutableRecord> [not] to have property <string>'
    ],
    (expect, subject, property) => {
      return expect(subject.get(property), '[not] to be undefined');
    }
  );

  expect.addAssertion(
    ['<ImmutableRecord> [not] to satisfy <object>'],
    (expect, subject, object) => {
      return expect(subject.toJS(), '[not] to satisfy', object);
    }
  );

  expect.addAssertion(
    ['<ImmutableRecord> [not] to equal <object>'],
    (expect, subject, object) => {
      return expect(subject.toJS(), '[not] to equal', object);
    }
  );

  expect.addAssertion(
    [
      '<ImmutableMap|ImmutableOrderedMap|ImmutableRecord> [not] to have property <string> <assertion?>'
    ],
    (expect, subject, property) => {
      expect.shift(subject.get(property));
    }
  );

  expect.addAssertion(
    [
      '<ImmutableCollection> [not] to contain <any+>',
      '<ImmutableCollection> [not] to include <any+>'
    ],
    (expect, subject, value) => {
      expect.withError(
        () => {
          expect(subject.contains(value), '[not] to be true');
        },
        () => {
          expect.fail({
            diff: function(output, diff, inspect, equal) {
              output.inline = true;
              expect.subjectType.prefix(output, subject);
              output.nl().indentLines();

              let subjectElements = [];
              subject.forEach(element => {
                subjectElements.push(element);
              });

              subjectElements.forEach((element, idx) => {
                output
                  .i()
                  .block(function() {
                    this.appendInspected(element);
                    expect.subjectType.delimiter(
                      this,
                      idx,
                      subjectElements.length
                    );
                    if (expect.flags.not && element === value) {
                      this.sp().annotationBlock(function() {
                        this.error('should be removed');
                      });
                    }
                  })
                  .nl();
              });

              if (!expect.flags.not) {
                output
                  .i()
                  .block(function() {
                    this.annotationBlock(function() {
                      this.error('missing').sp().appendInspected(value);
                    });
                  })
                  .nl();
              }

              output.outdentLines();
              expect.subjectType.suffix(output, subject);
              return output;
            }
          });
        }
      );
    }
  );
};

module.exports = collectionAssertions;
