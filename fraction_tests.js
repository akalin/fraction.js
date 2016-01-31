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

  it('equals', function() {
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

  it('negate', function() {
    var fZero1 = newBigFraction(0, 1);
    var fZero2 = newBigFraction(0, -1);
    expect(fZero1.negate()).toEqual(fZero1);
    expect(fZero2.negate()).toEqual(fZero2);

    var fOne1 = newBigFraction(1, 1);
    var fOne2 = newBigFraction(-1, -1);
    var fMinusOne1 = newBigFraction(-1, 1);
    var fMinusOne2 = newBigFraction(1, -1);
    expect(fOne1.negate()).toEqual(fMinusOne1);
    expect(fOne2.negate()).toEqual(fMinusOne2);
    expect(fMinusOne1.negate()).toEqual(fOne1);
    expect(fMinusOne2.negate()).toEqual(fOne2);
  });

  it('reciprocate', function() {
    var fZero = newBigFraction(0, 1);
    expect(function() {
      fZero.reciprocate();
    }).toThrow(new Error('zero denominator'))

    var f = newBigFraction(1, -2);
    expect(f.reciprocate()).toEqual(newBigFraction(-2, 1));
  });

  it('add', function() {
    var f1 = newBigFraction(1, -2);
    var f2 = newBigFraction(-3, 4);

    var f = f1.add(f2);
    expect(f).toEqual(newBigFraction(10, -8));
  });

  it('subtract', function() {
    var f1 = newBigFraction(1, -2);
    var f2 = newBigFraction(-3, 4);

    var f = f1.subtract(f2);
    expect(f).toEqual(newBigFraction(-2, -8));
  });

  it('multiply', function() {
    var f1 = newBigFraction(1, -2);
    var f2 = newBigFraction(-3, 4);

    var f = f1.multiply(f2);
    expect(f).toEqual(newBigFraction(-3, -8));
  });

  it('divide', function() {
    var f1 = newBigFraction(1, -2);
    var f2 = newBigFraction(-3, 4);

    expect(function() {
      f1.divide(newBigFraction(0, 1));
    }).toThrow(new Error('zero denominator'))

    var f = f1.divide(f2);
    expect(f).toEqual(newBigFraction(4, 6));
  });

  it('pow', function() {
    var f = newBigFraction(2, -2);
    expect(f.pow(0)).toEqual(newBigFraction(1, 1));
    expect(f.pow(9)).toEqual(newBigFraction(512, -512));
    expect(f.pow(-9)).toEqual(newBigFraction(-512, 512));

    var fZero = newBigFraction(0, 5);
    expect(fZero.pow(0)).toEqual(newBigFraction(1, 1));

    expect(function() {
      newBigFraction(0, 1).pow(-1);
    }).toThrow(new Error('zero denominator'))
  });

  it('signum', function() {
    var f1 = newBigFraction(0, 1);
    expect(f1.signum()).toEqual(0);
    var f2 = newBigFraction(0, -1);
    expect(f2.signum()).toEqual(0);

    var f3 = newBigFraction(1, 1);
    expect(f3.signum()).toEqual(1);
    var f4 = newBigFraction(-1, -1);
    expect(f4.signum()).toEqual(1);

    var f5 = newBigFraction(1, -1);
    expect(f5.signum()).toEqual(-1);
    var f6 = newBigFraction(-1, 1);
    expect(f6.signum()).toEqual(-1);
  });

  it('compareTo', function() {
    for (var i = 0; i < cs.length; ++i) {
      for (var j = 0; j < cs.length; ++j) {
        var expectedCompareTo;
        if (i < j) {
          expectedCompareTo = -1;
        } else if (i > j) {
          expectedCompareTo = +1;
        } else {
          expectedCompareTo = 0;
        }
        for (var k = 0; k < cs[i].length; ++k) {
          for (var l = 0; l < cs[j].length; ++l) {
            expect(cs[i][k].compareTo(cs[j][l])).toEqual(expectedCompareTo);
          }
        }
      }
    }
  });

  it('abs', function() {
    var fZero1 = newBigFraction(0, 1);
    var fZero2 = newBigFraction(0, -1);
    expect(fZero1.abs()).toEqual(fZero1);
    expect(fZero2.abs()).toEqual(fZero1);

    var fOne1 = newBigFraction(1, 1);
    var fOne2 = newBigFraction(-1, -1);
    expect(fOne1.abs()).toEqual(fOne1);
    expect(fOne2.abs()).toEqual(fOne1);

    var fMinusOne1 = newBigFraction(-1, 1);
    var fMinusOne2 = newBigFraction(1, -1);
    expect(fMinusOne1.abs()).toEqual(fOne1);
    expect(fMinusOne2.abs()).toEqual(fOne1);
  });
});
