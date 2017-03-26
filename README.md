# unexpected-immutable

[![Join the chat at https://gitter.im/albertfdp/unexpected-immutable](https://badges.gitter.im/albertfdp/unexpected-immutable.svg)](https://gitter.im/albertfdp/unexpected-immutable?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![Build Status](https://travis-ci.org/albertfdp/unexpected-immutable.svg?branch=master)](https://travis-ci.org/albertfdp/unexpected-immutable)

This plugin provides a set of  [unexpected](https://unexpected.js.org) types and assertions for [immutable-js](http://facebook.github.io/immutable-js/) library for JavaScript collections.

![unexpected-immutable-watermelons](http://i.giphy.com/fQa7ew7maOC5y.gif)
> An unexpected immutable watermelon

## Documentation

Read [the documentation](https://albertfdp.github.io/unexpected-immutable/)

## Installation

Install via [npm](http://npmjs.org/):

```bash
$ npm install unexpected unexpected-immutable
```

You can use this plugin as any other unexpected plugins:

```javascript
const unexpected = require('unexpected')
const unexpectedImmutable = require('unexpected-immutable')

const expect = unexpected.clone().use(unexpectedImmutable)

```

### Prior art

Inspired by:

* [chai-immutable](https://github.com/astorije/chai-immutable)

## License

MIT
