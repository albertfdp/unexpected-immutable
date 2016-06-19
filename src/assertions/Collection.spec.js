const expect = require('../../test/unexpected-immutable')
const { CollectionFactory, types } = require('../utils')
const {
  LIST,
  MAP,
  SEQ,
  SET,
  ORDERED_MAP,
  ORDERED_SET,
  STACK
} = require('../utils/types')

describe('Collection assertions', () => {
  types.forEach(type => {
    const emptyCollection = CollectionFactory(type, [])
    const fruitCollection = CollectionFactory(type, [ 'apple', 'banana', 'strawberry', 'apple' ])

    describe(`with type ${type}`, () => {
      describe('to be empty assertion', () => {
        it('should succeed', () => {
          expect(emptyCollection, 'to be empty')
        })

        it('should fail', () => {
          expect(
            () => expect(fruitCollection, 'to be empty'),
            'to throw'
          )
        })

        describe('with the not flag', () => {
          it('should succeed', () => {
            expect(fruitCollection, 'not to be empty')
          })
        })
      })

      describe('non-empty assertion', () => {
        it('should succeed', () => {
          expect(fruitCollection, 'to be non-empty')
        })
      })
    })

    describe('to have length assertion', () => {
      it('should succeed', () => {
        if (type === 'List' || type === 'Stack' || type === 'Seq') {
          expect(fruitCollection, 'to have size', 4)
        } else {
          expect(fruitCollection, 'to have size', 3)
        }
      })

      it('works with the length fallback', () => {
        if (type === 'List' || type === 'Stack' || type === 'Seq') {
          expect(fruitCollection, 'to have size', 4)
        } else {
          expect(fruitCollection, 'to have size', 3)
        }
      })

      describe('with the not flag', () => {
        it('should succeed', () => {
          if (type === 'List' || type === 'Stack' || type === 'Seq') {
            expect(fruitCollection, 'to have size', 4)
          } else {
            expect(fruitCollection, 'to have size', 3)
          }
        })

        it('works with the length fallback', () => {
          if (type === 'List' || type === 'Stack' || type === 'Seq') {
            expect(fruitCollection, 'to have size', 4)
          } else {
            expect(fruitCollection, 'to have size', 3)
          }
        })
      })
    })
  })

  types.filter(type => type !== MAP && type !== ORDERED_MAP)
    .forEach(type => {
      const emptyCollection = CollectionFactory(type, [])
      const fruitCollection = CollectionFactory(type, [ 'apple', 'banana', 'strawberry', 'apple' ])

      describe('to contain assertion', () => {
        it('should succeed', () => {
          expect(fruitCollection, 'to contain', 'apple')
        })

        it('should fail with a diff', () => {
          const expectedOutput = expectedOutputForType(type)
          expect(
            () => expect(fruitCollection, 'to contain', 'pears'),
            'to throw',
            expectedOutput
          )
        })

        describe('with the not flag', () => {
          it('should succeed', () => {
            expect(fruitCollection, 'not to contain', 'melons')
          })

          it('should fail with a diff', () => {
            const expectedOutput = expectedOutputForTypeWithNot(type)
            expect(
              () => expect(fruitCollection, 'not to contain', 'apple'),
              'to throw',
              expectedOutput
            )
          })
        })
      })
    })
})

const expectedOutputForType = type => {
  switch (type) {
    case LIST:
    case SEQ:
    case STACK:
      return (
        `expected ${type}([ 'apple', 'banana', 'strawberry', 'apple' ]) to contain \'pears\'\n` +
          `\n` +
          `${type}([\n` +
          `  'apple',\n` +
          `  'banana',\n` +
          `  'strawberry',\n` +
          `  'apple'\n` +
          `  // missing 'pears'\n` +
          `])`
      )
    case SET:
    case ORDERED_SET:
      return (
        `expected ${type}([ 'apple', 'banana', 'strawberry' ]) to contain \'pears\'\n` +
        `\n` +
        `${type}([\n` +
        `  'apple',\n` +
        `  'banana',\n` +
        `  'strawberry'\n` +
        `  // missing 'pears'\n` +
        `])`
      )
    default:
      return ''
  }
}

const expectedOutputForTypeWithNot = type => {
  switch (type) {
    case LIST:
    case SEQ:
    case STACK:
      return (
        `expected ${type}([ 'apple', 'banana', 'strawberry', 'apple' ]) not to contain \'apple\'\n` +
        `\n` +
        `${type}([\n` +
        `  'apple', // should be removed\n` +
        `  'banana',\n` +
        `  'strawberry',\n` +
        `  'apple' // should be removed\n` +
        `])`
      )
    case SET:
    case ORDERED_SET:
      return (
        `expected ${type}([ 'apple', 'banana', 'strawberry' ]) not to contain \'apple\'\n` +
        `\n` +
        `${type}([\n` +
        `  'apple', // should be removed\n` +
        `  'banana',\n` +
        `  'strawberry'\n` +
        `])`
      )
    default:
      return ''
  }
}
