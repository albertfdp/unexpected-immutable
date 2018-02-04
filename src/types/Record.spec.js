const Immutable = require('immutable');
const expect = require('../../test/unexpected-immutable');

const ABRecord = new Immutable.Record({
  a: 1,
  b: 2
});

describe('Record type', () => {
  describe('with Immutable.is value equality check', () => {
    let a;
    let b;

    beforeEach(() => {
      a = new ABRecord();
      b = new ABRecord();
    });

    it('fails for Object.is', () => {
      expect(Object.is(a, b), 'to be', false);
    });

    it('succeeds with Immutable.is', () => {
      expect(Immutable.is(a, b), 'to be', true);
      expect(a, 'to equal', b);
    });

    it('diffs to Records correctly', () => {
      const b = new ABRecord({ a: 3 });

      expect(
        [a, b],
        'to produce a diff of',
        `{\n` + `  a: 1, // should equal 3\n` + `  b: 2\n` + `}`
      );
    });
  });

  describe('to have property', () => {
    it('suceeds', () => {
      const a = new ABRecord();

      expect(a, 'to have property', 'a');
    });

    it('suceeds with assertion', () => {
      const a = new ABRecord();

      expect(a, 'to have property', 'a', 'to equal', 1);
    });

    it('fails with assertion', () => {
      const a = new ABRecord();

      expect(
        () => expect(a, 'to have property', 'a', 'to equal', 2),
        'to throw'
      );
    });

    it('suceeds with not', () => {
      const a = new ABRecord();

      expect(a, 'not to have property', 'd');
    });

    it('fails', () => {
      const a = new ABRecord();

      expect(
        () => expect(a, 'to have property', 'd', 'to equal', 3),
        'to throw'
      );
    });
  });
});
