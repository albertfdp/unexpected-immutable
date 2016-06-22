const Immutable = require('immutable')
const expect = require('../../test/unexpected-immutable')
const { CollectionFactory, types } = require('../utils')

const arrayLikeTypes = types.filter(type => ![ 'Map', 'OrderedMap' ].includes(type))

describe('Immutable types', () => {
  arrayLikeTypes.forEach(type => {
    const fruitCollection = CollectionFactory(type, [ 'apple', 'banana' ])

    describe(`with ${type}`, () => {
      it(`inspects the ${type} instance correctly`, () => {
        expect(fruitCollection, 'to inspect as', `${type}([ 'apple', 'banana' ])`)
      })

      describe('with Immutable.is value equality check', () => {
        const foo = CollectionFactory(type, [ 'foo', 'bar' ])
        const bar = CollectionFactory(type, [ 'foo', 'bar' ])

        it('fails for Object.is', () => {
          expect(Object.is(foo, bar), 'to be', false)
        })

        it('succeeds with Immutable.is', () => {
          // to equal uses `Immutable.is` for value equality check
          expect(Immutable.is(foo, bar), 'to be', true)
          expect(foo, 'to equal', bar)
        })
      })

      it(`diffs two ${type} instances correctly`, () => {
        expect([ fruitCollection, CollectionFactory(type, [ 'banana', 'strawberry' ]) ],
        'to produce a diff of',
          `${type}([\n` +
          `  'apple', // should be removed\n` +
          `  'banana'\n` +
          `  // missing 'strawberry'\n` +
          '])'
        )
      })
    })
  })
})
