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

  it('equals', function() {
    var cZero = [
      newBigFraction(0, 1),
      newBigFraction(0, 2),
      newBigFraction(0, -1),
      newBigFraction(0, -2)
    ];

    var cOneHalf = [
      newBigFraction(1, 2),
      newBigFraction(-1, -2)
    ];

    var cMinusOneHalf = [
      newBigFraction(-1, 2),
      newBigFraction(1, -2)
    ];

    var cOne = [
      newBigFraction(1, 1),
      newBigFraction(-1, -1)
    ];

    var cMinusOne = [
      newBigFraction(1, -1),
      newBigFraction(-1, 1)
    ];

    var cTwo = [
      newBigFraction(2, 1),
      newBigFraction(-2, -1)
    ];

    var cMinusTwo = [
      newBigFraction(2, -1),
      newBigFraction(-2, 1)
    ];

    var cs = [cMinusTwo, cMinusOne, cMinusOneHalf,
              cZero, cOneHalf, cOne, cTwo];

    for (var i = 0; i < cs.length; ++i) {
      for (var j = 0; j < cs.length; ++j) {
        var expectedEquals = (i == j);
        for (var k = 0; k < cs[i].length; ++k) {
          for (var l = 0; l < cs[j].length; ++l) {
            expect(cs[i][k].equals(cs[j][l])).toEqual(expectedEquals);
          }
        }
      }
    }
  });
});