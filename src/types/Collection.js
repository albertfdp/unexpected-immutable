const { is } = require('immutable');

const DEFAULT_DEPTH = 3;

const CollectionType = {
  name: 'Collection',
  base: 'array-like',
  indent: true,
  identify: false,
  equal: function(a, b) {
    /**
     * Immutable data structures should only contain other immutable
     * data structures to be considered immutable and work against `equal()`.
     * http://facebook.github.io/immutable-js/docs/#/is
     */
    return is(a, b);
  },
  inspect: function(collection, depth, output, inspect) {
    const prefixOutput = this.prefix(output.clone(), collection);
    const suffixOutput = this.suffix(output.clone(), collection);

    if (collection.size === 0) {
      return output.append(prefixOutput).append(suffixOutput);
    }

    if (depth === 1 && collection.size > 10) {
      return output.append(prefixOutput).text('...').append(suffixOutput);
    }

    let inspectedItems = [];
    collection.forEach(item => {
      inspectedItems.push(inspect(item));
    });

    const currentDepth = DEFAULT_DEPTH - Math.min(DEFAULT_DEPTH, depth);
    let maxLineLength =
      output.preferredWith - 20 - currentDepth * output.indentationWidth - 2;
    let width = 0;
    const multipleLines =
      this.forceMultipleLines ||
      inspectedItems.some(item => {
        if (item.isMultiline()) {
          return true;
        }

        const size = item.size();
        width += size.width;
        return width > maxLineLength;
      });

    let type = this;
    inspectedItems.forEach(function(item, idx) {
      item.amend(type.delimiter(output.clone(), idx, inspectedItems.length));
    });

    if (multipleLines) {
      // TODO
    } else {
      output.append(prefixOutput).sp(prefixOutput.isEmpty() ? 0 : 1);

      inspectedItems.forEach((item, idx) => {
        output.append(item);

        const isLastIndex = idx === inspectedItems.length - 1;
        if (!isLastIndex) {
          output.sp();
        }
      });
      output.sp(suffixOutput.isEmpty() ? 0 : 1).append(suffixOutput);
    }
  },
  diff: function(actual, expected, output, diff, inspect, equal) {
    output.inline = true;
    const prefixOutput = this.prefix(output.clone(), actual);
    const suffixOutput = this.suffix(output.clone(), actual);

    output.append(prefixOutput).nl(prefixOutput.isEmpty() ? 0 : 1);

    if (this.indent) {
      output.indentLines();
    }

    const type = this;
    let idx = 0;
    actual.forEach(actualElement => {
      output.nl(idx > 0 ? 1 : 0).i().block(function() {
        this.appendInspected(actualElement);
        type.delimiter(this, idx, actual.size);
        if (!expected.includes(actualElement)) {
          this.sp().annotationBlock(function() {
            this.error('should be removed');
          });
        }
      });
      idx += 1;
    });

    expected.forEach(expectedElement => {
      if (!actual.includes(expectedElement)) {
        output.nl(idx > 0 ? 1 : 0).i().annotationBlock(function() {
          this.error('missing').sp().appendInspected(expectedElement);
        });
        idx += 1;
      }
    });

    if (this.indent) {
      output.indentLines();
    }

    output.nl(suffixOutput.isEmpty() ? 0 : 1).append(suffixOutput);

    return output;
  },
  prefix: function(output, value) {
    return output.jsKeyword(this.name).text('([');
  },
  suffix: function(output) {
    return output.text('])');
  }
};

module.exports = CollectionType;
