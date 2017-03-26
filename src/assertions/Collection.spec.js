const expect = require('../../test/unexpected-immutable');
const { n, string, integer, pickone } = require('chance-generators')(131);

const { CollectionFactory, types } = require('../utils');
const {
  LIST,
  MAP,
  ORDERED_MAP,
  ORDERED_SET,
  SEQ,
  SET,
  STACK
} = require('../utils/types');

const stringArrays = n(string, integer({ min: 1, max: 20 }));

describe('Collection assertions', () => {
  let collection;

  beforeEach(() => {
    collection = stringArrays();
  });

  describe('to be empty assertion', () => {
    it('should succeed', () => {
      expect(types, 'succeed when asserting', [], 'to be empty');
    });

    it('should fail', () => {
      expect(types, 'fail when asserting', collection, 'to be empty');
    });

    describe('with the not flag', () => {
      it('should succeed', () => {
        expect(types, 'succeed when asserting', collection, 'not to be empty');
      });
    });
  });

  describe('non-empty assertion', () => {
    it('should succeed', () => {
      expect(types, 'succeed when asserting', collection, 'to be non-empty');
    });

    it('should fail', () => {
      expect(types, 'fail when asserting', [], 'to be non-empty');
    });
  });

  describe('to have size assertion', () => {
    it('should succeed', () => {
      expect(
        types,
        'succeed when asserting',
        collection,
        'to have size',
        collection.length
      );
    });

    it('should fail', () => {
      expect(
        types,
        'fail when asserting',
        collection,
        'to have size',
        collection.length + 1
      );
    });

    describe('with the not flag', () => {
      it('should succeed', () => {
        expect(
          types,
          'succeed when asserting',
          collection,
          'not to have size',
          0
        );
      });
    });
  });

  describe('to contain assertion', () => {
    let item;
    let typeSubset;

    beforeEach(() => {
      item = pickone(collection)();
      typeSubset = types.filter(type => type !== MAP && type !== ORDERED_MAP);
    });

    it('should succeed', () => {
      expect(
        typeSubset,
        'succeed when asserting',
        collection,
        'to contain',
        item
      );
    });

    it('should fail with a diff', () => {
      expect(
        type => {
          expect(
            () =>
              expect(
                CollectionFactory(type, [
                  'apple',
                  'banana',
                  'strawberry',
                  'apple'
                ]),
                'to contain',
                'pears'
              ),
            'to throw',
            expectedOutputForType(type)
          );
        },
        'to be valid for all',
        pickone(typeSubset)
      );
    });

    describe('with the not flag', () => {
      it('should succeed', () => {
        expect(
          typeSubset,
          'succeed when asserting',
          collection,
          'not to contain',
          'melons'
        );
      });

      it('should fail with a diff', () => {
        expect(
          type => {
            expect(
              () =>
                expect(
                  CollectionFactory(type, [
                    'apple',
                    'banana',
                    'strawberry',
                    'apple'
                  ]),
                  'not to contain',
                  'apple'
                ),
              'to throw',
              expectedOutputForTypeWithNot(type)
            );
          },
          'to be valid for all',
          pickone(typeSubset)
        );
      });
    });
  });
});

const expectedOutputForType = type => {
  switch (type) {
    case LIST:
    case SEQ:
    case STACK:
      return `expected ${type}([ 'apple', 'banana', 'strawberry', 'apple' ]) to contain 'pears'\n` +
        `\n` +
        `${type}([\n` +
        `  'apple',\n` +
        `  'banana',\n` +
        `  'strawberry',\n` +
        `  'apple'\n` +
        `  // missing 'pears'\n` +
        '])';
    case SET:
    case ORDERED_SET:
      return `expected ${type}([ 'apple', 'banana', 'strawberry' ]) to contain 'pears'\n` +
        `\n` +
        `${type}([\n` +
        `  'apple',\n` +
        `  'banana',\n` +
        `  'strawberry'\n` +
        `  // missing 'pears'\n` +
        '])';
    default:
      return '';
  }
};

const expectedOutputForTypeWithNot = type => {
  switch (type) {
    case LIST:
    case SEQ:
    case STACK:
      return `expected ${type}([ 'apple', 'banana', 'strawberry', 'apple' ]) not to contain 'apple'\n` +
        `\n` +
        `${type}([\n` +
        `  'apple', // should be removed\n` +
        `  'banana',\n` +
        `  'strawberry',\n` +
        `  'apple' // should be removed\n` +
        '])';
    case SET:
    case ORDERED_SET:
      return `expected ${type}([ 'apple', 'banana', 'strawberry' ]) not to contain 'apple'\n` +
        `\n` +
        `${type}([\n` +
        `  'apple', // should be removed\n` +
        `  'banana',\n` +
        `  'strawberry'\n` +
        '])';
    default:
      return '';
  }
};
