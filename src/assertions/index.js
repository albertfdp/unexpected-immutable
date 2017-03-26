const collectionAssertions = require('./Collection');

const assertions = {
  installInto: function(expect) {
    collectionAssertions(expect);
  }
};

module.exports = assertions;
