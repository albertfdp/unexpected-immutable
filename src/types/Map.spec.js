const Immutable = require('immutable');
const expect = require('../../test/unexpected-immutable');
const { CollectionFactory, types } = require('../utils');

const { n, string, integer, array, pickone } = require('chance-generators')(
  131
);
const stringArrays = n(string, integer({ min: 1, max: 20 }));

const mapLikeTypes = types.filter(type => ['Map', 'OrderedMap'].includes(type));

describe('Map type', () => {
  mapLikeTypes.forEach(type => {
    const fruitCollection = CollectionFactory(type, ['apple', 'banana']);

    describe(`with ${type}`, () => {
      it(`inspects the ${type} instance correctly`, () => {
        expect(
          fruitCollection,
          'to inspect as',
          `${type}({\n` + `  apple: 1,\n` + `  banana: 1\n` + '})'
        );
      });
    });

    describe('with Immutable.is value equality check', () => {
      const foo = CollectionFactory(type, ['foo', 'bar']);
      const bar = CollectionFactory(type, ['foo', 'bar']);

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
        `${type}({\n` +
          `  apple: 1, // should be removed\n` +
          `  banana: 1\n` +
          `  // missing strawberry: 1\n` +
          '})'
      );
    });
  });

  describe('to have keys assertion', () => {
    let collection;

    beforeEach(() => {
      collection = stringArrays();
    });

    it('should succeed', () => {
      expect(
        mapLikeTypes,
        'succeed when asserting',
        collection,
        'to have keys',
        pickone(collection)()
      );
    });

    it('should fail', () => {
      expect(mapLikeTypes, 'fail when asserting', collection, 'to have keys', [
        pickone(collection)(),
        'foobar'
      ]);
    });
  });

  describe('to have property assertion', () => {
    let collection;

    beforeEach(() => {
      collection = stringArrays();
    });

    it('should succeed', () => {
      expect(
        mapLikeTypes,
        'succeed when asserting',
        collection,
        'to have property',
        pickone(collection)(),
        'to equal',
        1
      );
    });

    it('should succeed with not', () => {
      expect(
        mapLikeTypes,
        'succeed when asserting',
        collection,
        'not to have property',
        'foobar'
      );
    });

    it('should fail', () => {
      expect(
        mapLikeTypes,
        'fail when asserting',
        collection,
        'to have property',
        pickone(collection)(),
        'to equal',
        2
      );
    });
  });

  it('diffs two complex immutable objects', () => {
    const a = Immutable.Map({
      numbers: Immutable.List([0, 1, 2, 3, 4]),
      names: Immutable.Map({ foo: 1, bar: 1 })
    });

    const b = Immutable.Map({
      extraKey: 'What?',
      numbers: Immutable.List([0, 2, 3, 4, 5]),
      names: Immutable.Map({ foo: 1, bar: 5 })
    });

    expect(
      [a, b],
      'to produce a diff of',
      `Map({\n` +
        `  numbers: List([\n` +
        `    0,\n` +
        `    1, // should be removed\n` +
        `    2,\n` +
        `    3,\n` +
        `    4\n` +
        `    // missing 5\n` +
        `  ]),\n` +
        `  names: Map({\n` +
        `    foo: 1,\n` +
        `    bar: 1 // should equal 5\n` +
        `  })\n` +
        `  // missing extraKey: 'What?'\n` +
        `})`
    );
  });
});
