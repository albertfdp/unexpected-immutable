const unexpected = require('unexpected');
const unexpectedImmutable = require('../src');
const unexpectedCheck = require('unexpected-check');
const { pickone } = require('chance-generators')(131);

const { CollectionFactory, types } = require('../src/utils');

const expect = unexpected.clone().use(unexpectedImmutable).use(unexpectedCheck);

expect
  .addAssertion('<any> to inspect as <string>', (expect, subject, value) => {
    expect(expect.inspect(subject).toString(), 'to equal', value);
  })
  .addAssertion(
    '<array> to produce a diff of <string>',
    (expect, subject, value) => {
      expect.errorMode = 'bubble';
      expect(
        expect.diff(subject[0], subject[1]).diff.toString(),
        'to equal',
        value
      );
    }
  )
  .addAssertion(
    '<array> succeed when asserting <array> <assertion>',
    (expect, subject, value) => {
      return expect(
        type => {
          expect.errorMode = 'bubble';
          expect.shift(CollectionFactory(type, value));
        },
        'to be valid for all',
        pickone(subject)
      );
    }
  )
  .addAssertion(
    '<array> fail when asserting <array> <assertion>',
    (expect, subject, value) => {
      return expect(
        type => {
          expect(
            () => expect.shift(CollectionFactory(type, value)),
            'to throw'
          );
        },
        'to be valid for all',
        pickone(subject)
      );
    }
  );

module.exports = expect;
