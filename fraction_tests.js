'use strict';

describe('fraction', function() {
  var bigIntegerEquality = function(first, second) {
    if (first instanceof BigInteger && second instanceof BigInteger) {
      return first.equals(second);
    }
  };

  beforeEach(function() {
    jasmine.addCustomEqualityTester(bigIntegerEquality);
  });

  it('construction and accessors', function() {
    var n = new BigInteger('12345');
    var d = new BigInteger('-67890');
    var f = new Fraction(n, d);

    expect(f.numerator()).toEqual(n);
    expect(f.denominator()).toEqual(d);
  });

  it('toString', function() {
    var n = new BigInteger('12345');
    var d = new BigInteger('-67890');
    var f = new Fraction(n, d);

    // Shouldn't be reduced.
    expect(f.toString()).toEqual('(12345)/(-67890)');
    expect(f.toString(15)).toEqual('(39d0)/(-151b0)');
  });

  var newBigFraction = function(n, d) {
    return new Fraction(new BigInteger(n.toString()),
                        new BigInteger(d.toString()));
  };

  it('zero denominator', function() {
    expect(function() {
      newBigFraction(1, 0);
    }).toThrow(new Error('zero denominator'))
  });
});
