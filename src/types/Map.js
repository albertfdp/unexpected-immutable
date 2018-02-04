const { is, Map, OrderedMap, Set } = require('immutable');

const MapType = {
  name: 'Map',
  base: 'object',
  identify: value => Map.isMap(value) && !OrderedMap.isOrderedMap(value),
  getKeys: function(obj) {
    return obj.keySeq().toArray();
  },
  prefix: function(output, value) {
    return output.jsKeyword(this.name).text('({');
  },
  suffix: function(output) {
    return output.text('})');
  },
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

    const keys = this.getKeys(collection);

    if (collection.size === 0) {
      return output.append(prefixOutput).append(suffixOutput);
    }

    const type = this;
    const inspectedItems = keys.map((key, idx) => {
      let propertyOutput = output.clone();
      const value = collection.get(key);

      let inspectedValue = inspect(value);
      if (value && value._expectIt) {
        inspectedValue = output.clone().block(inspectedValue);
      }
      propertyOutput.property(key, inspectedValue);
      propertyOutput.amend(type.delimiter(output.clone(), idx, keys.length));

      return propertyOutput;
    });

    const maxLineLength =
      output.preferredWith - (depth === Infinity ? 0 : depth) * 2 - 2;
    let width = 0;
    const compact =
      inspectedItems.length > 5 ||
      inspectedItems.every(item => {
        if (item.isMultiline()) {
          return false;
        }

        width += item.size().width;
        return width < maxLineLength;
      });

    const itemsOutput = output.clone();
    if (compact) {
      let currentLineLength = 0;
      inspectedItems.forEach((item, idx) => {
        const size = item.size();
        currentLineLength += size.width + 1;
        if (idx > 0) {
          if (size.height === 1 && currentLineLength < maxLineLength) {
            itemsOutput.sp();
          } else {
            itemsOutput.nl();
            currentLineLength = size.width;
          }

          if (size.height > 1) {
            currentLineLength = maxLineLength;
          }
        }
        itemsOutput.append(item);
      });
    } else {
      inspectedItems.forEach((item, idx) => {
        if (idx > 0) {
          itemsOutput.nl();
        }
        itemsOutput.append(item);
      });
    }

    output.append(prefixOutput);
    if (this.forceMultipleLines || itemsOutput.isMultiline()) {
      if (!prefixOutput.isEmpty()) {
        output.nl();
      }
      if (this.indent) {
        output.indentLines().i();
      }
      output.block(itemsOutput);
      if (this.indent) {
        output.indentLines();
      }
      if (!suffixOutput.isEmpty()) {
        output.nl();
      }
    } else {
      output
        .sp(prefixOutput.isEmpty() ? 0 : 1)
        .append(itemsOutput)
        .sp(suffixOutput.isEmpty() ? 0 : 1);
    }
    output.append(suffixOutput);
  },
  diff: function(actual, expected, output, diff, inspect, equal) {
    output.inline = true;
    const prefixOutput = this.prefix(output.clone(), actual);
    const suffixOutput = this.suffix(output.clone(), actual);
    const actualKeys = this.getKeys(actual);
    const expectedKeys = this.getKeys(expected);
    const keys = Set([...actualKeys, ...expectedKeys]).toArray();

    output.append(prefixOutput).nl(prefixOutput.isEmpty() ? 0 : 1);

    if (this.indent) {
      output.indentLines();
    }

    const type = this;
    keys.forEach((key, idx) => {
      output.nl(idx > 0 ? 1 : 0).i().block(function() {
        let valueOutput;
        const annotation = output.clone();
        const conflicting = !equal(actual.get(key), expected.get(key));
        let isInlineDiff = false;
        if (conflicting) {
          if (!expected.has(key)) {
            annotation.error('should be removed');
            isInlineDiff = true;
          } else if (!actual.has(key)) {
            this.error('// missing').sp();
            valueOutput = output.clone().appendInspected(expected.get(key));
            isInlineDiff = true;
          } else {
            const keyDiff = diff(actual.get(key), expected.get(key));
            if (!keyDiff || (keyDiff && !keyDiff.inline)) {
              annotation.shouldEqualError(expected.get(key));
              if (keyDiff) {
                annotation.nl(2).append(keyDiff);
              }
            } else {
              isInlineDiff = true;
              valueOutput = keyDiff;
            }
          }
        } else {
          isInlineDiff = true;
        }

        if (!valueOutput) {
          valueOutput = inspect(actual.get(key), conflicting ? Infinity : null);
        }

        valueOutput.amend(
          type.delimiter(output.clone(), idx, actualKeys.length)
        );
        if (!isInlineDiff) {
          valueOutput = output.clone().block(valueOutput);
        }
        this.property(key, valueOutput);
        if (!annotation.isEmpty()) {
          this.sp().annotationBlock(annotation);
        }
      });
    });

    if (this.indent) {
      output.outdentLines();
    }

    return output.nl(suffixOutput.isEmpty() ? 0 : 1).append(suffixOutput);
  }
};

module.exports = MapType;
