const Immutable = require('immutable');
const expect = require('../../test/unexpected-immutable');
const { CollectionFactory, types } = require('../utils');

const { n, string, integer, pickone } = require('chance-generators')(131);
const stringArrays = n(string, integer({ min: 1, max: 20 }));

const arrayLikeTypes = types.filter(
  type => !['Map', 'OrderedMap'].includes(type)
);

describe('Immutable types', () => {
  arrayLikeTypes.forEach(type => {
    let fruitCollection;

    describe(`with ${type}`, () => {
      beforeEach(() => {
        fruitCollection = CollectionFactory(type, ['apple', 'banana']);
      });

      it(`inspects the ${type} instance correctly`, () => {
        expect(
          fruitCollection,
          'to inspect as',
          `Immutable${type}([ 'apple', 'banana' ])`
        );
      });

      describe('with empty collections', () => {
        let emptyCollection;

        beforeEach(() => {
          emptyCollection = CollectionFactory(type, []);
        });

        it(`inspects the ${type} instance correctly`, () => {
          expect(emptyCollection, 'to inspect as', `Immutable${type}([])`);
        });
      });

      describe('with large collections', () => {
        let largeCollection;
        const items = [...Array(15).keys()];

        beforeEach(() => {
          largeCollection = CollectionFactory(type, items);
        });

        it(`inspects the ${type} instance correctly`, () => {
          expect(
            largeCollection,
            'to inspect as',
            `Immutable${type}([ ${items.join(', ')} ])`
          );
        });
      });

      describe('with Immutable.is value equality check', () => {
        let foo, bar;

        beforeEach(() => {
          foo = CollectionFactory(type, ['foo', 'bar']);
          bar = CollectionFactory(type, ['foo', 'bar']);
        });

        it('fails for Object.is', () => {
          expect(Object.is(foo, bar), 'to be', false);
        });

        it('succeeds with Immutable.is', () => {
          // to equal uses `Immutable.is` for value equality check
          expect(Immutable.is(foo, bar), 'to be', true);
          expect(foo, 'to equal', bar);
        });
      });

      it(`diffs two ${type} instances correctly`, () => {
        expect(
          [fruitCollection, CollectionFactory(type, ['banana', 'strawberry'])],
          'to produce a diff of',
          `Immutable${type}([\n` +
            `  'apple', // should be removed\n` +
            `  'banana'\n` +
            `  // missing 'strawberry'\n` +
            '])'
        );
      });
    });
  });
});
