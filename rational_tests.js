'use strict';

// TODO: Check that rationals are in canonical form.

describe('rational', function() {
  // From fraction_tests.js.
  beforeEach(function() {
    jasmine.addCustomEqualityTester(bigIntegerEquality);
  });

  it('construction and accessors', function() {
    var n = new BigInteger('12345');
    var d = new BigInteger('-67890');
    var r = new Rational(n, d);

    expect(r.numerator()).toEqual(new BigInteger('-823'));
    expect(r.denominator()).toEqual(new BigInteger('4526'));
  });

  it('zero constructor', function() {
    var n = new BigInteger('0');
    var d = new BigInteger('-67890');
    var r = new Rational(n, d);

    expect(r.numerator()).toEqual(new BigInteger('0'));
    expect(r.denominator()).toEqual(new BigInteger('1'));
  });

  it('toString', function() {
    var n = new BigInteger('12345');
    var d = new BigInteger('-67890');
    var r = new Rational(n, d);

    // Should be reduced.
    expect(r.toString()).toEqual('(-823)/(4526)');
    expect(r.toString(15)).toEqual('(-39d)/(151b)');
  });

  var newBigRational = function(n, d) {
    return new Rational(new BigInteger(n.toString()),
                        new BigInteger(d.toString()));
  };

  it('zero denominator', function() {
    expect(function() {
      newBigRational(1, 0);
    }).toThrow(new Error('zero denominator'))
  });

  var cZero = [
    newBigRational(0, 1),
    newBigRational(0, 2),
    newBigRational(0, -1),
    newBigRational(0, -2)
  ];

  var cOneHalf = [
    newBigRational(1, 2),
    newBigRational(-1, -2)
  ];

  var cMinusOneHalf = [
    newBigRational(-1, 2),
    newBigRational(1, -2)
  ];

  var cOne = [
    newBigRational(1, 1),
    newBigRational(-1, -1)
  ];

  var cMinusOne = [
    newBigRational(1, -1),
    newBigRational(-1, 1)
  ];

  var cTwo = [
    newBigRational(2, 1),
    newBigRational(-2, -1)
  ];

  var cMinusTwo = [
    newBigRational(2, -1),
    newBigRational(-2, 1)
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
    var rZero1 = newBigRational(0, 1);
    var rZero2 = newBigRational(0, -1);
    expect(rZero1.negate()).toEqual(rZero1);
    expect(rZero2.negate()).toEqual(rZero2);

    var rOne1 = newBigRational(1, 1);
    var rOne2 = newBigRational(-1, -1);
    var rMinusOne1 = newBigRational(-1, 1);
    var rMinusOne2 = newBigRational(1, -1);
    expect(rOne1.negate()).toEqual(rMinusOne1);
    expect(rOne2.negate()).toEqual(rMinusOne2);
    expect(rMinusOne1.negate()).toEqual(rOne1);
    expect(rMinusOne2.negate()).toEqual(rOne2);
  });

  it('reciprocate', function() {
    var rZero = newBigRational(0, 1);
    expect(function() {
      rZero.reciprocate();
    }).toThrow(new Error('zero denominator'))

    var r = newBigRational(1, -2);
    expect(r.reciprocate()).toEqual(newBigRational(-2, 1));
  });

  it('add', function() {
    var r1 = newBigRational(1, -2);
    var r2 = newBigRational(-3, 4);

    var r = r1.add(r2);
    expect(r).toEqual(newBigRational(-5, 4));
  });

  it('subtract', function() {
    var r1 = newBigRational(1, -2);
    var r2 = newBigRational(-3, 4);

    var r = r1.subtract(r2);
    expect(r).toEqual(newBigRational(1, 4));
  });

  it('multiply', function() {
    var r1 = newBigRational(1, -2);
    var r2 = newBigRational(-3, 4);

    var r = r1.multiply(r2);
    expect(r).toEqual(newBigRational(3, 8));
  });

  it('divide', function() {
    var r1 = newBigRational(1, -2);
    var r2 = newBigRational(-3, 4);

    expect(function() {
      r1.divide(newBigRational(0, 1));
    }).toThrow(new Error('zero denominator'))

    var r = r1.divide(r2);
    expect(r).toEqual(newBigRational(2, 3));
  });

  it('pow', function() {
    var r = newBigRational(1, -2);
    expect(r.pow(0)).toEqual(newBigRational(1, 1));
    expect(r.pow(9)).toEqual(newBigRational(-1, 512));
    expect(r.pow(-9)).toEqual(newBigRational(-512, 1));

    var rZero = newBigRational(0, 5);
    expect(rZero.pow(0)).toEqual(newBigRational(1, 1));

    expect(function() {
      newBigRational(0, 1).pow(-1);
    }).toThrow(new Error('zero denominator'))
  });

  it('signum', function() {
    var r1 = newBigRational(0, 1);
    expect(r1.signum()).toEqual(0);
    var r2 = newBigRational(0, -1);
    expect(r2.signum()).toEqual(0);

    var r3 = newBigRational(1, 1);
    expect(r3.signum()).toEqual(1);
    var r4 = newBigRational(-1, -1);
    expect(r4.signum()).toEqual(1);

    var r5 = newBigRational(1, -1);
    expect(r5.signum()).toEqual(-1);
    var r6 = newBigRational(-1, 1);
    expect(r6.signum()).toEqual(-1);
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
    var rZero1 = newBigRational(0, 1);
    var rZero2 = newBigRational(0, -1);
    expect(rZero1.abs()).toEqual(rZero1);
    expect(rZero2.abs()).toEqual(rZero1);

    var rOne1 = newBigRational(1, 1);
    var rOne2 = newBigRational(-1, -1);
    expect(rOne1.abs()).toEqual(rOne1);
    expect(rOne2.abs()).toEqual(rOne1);

    var rMinusOne1 = newBigRational(-1, 1);
    var rMinusOne2 = newBigRational(1, -1);
    expect(rMinusOne1.abs()).toEqual(rOne1);
    expect(rMinusOne2.abs()).toEqual(rOne1);
  });

  it('min and max', function() {
    var r1 = newBigRational(1, -2);
    var r2 = newBigRational(-3, 4);
    expect(r1.min(r2)).toBe(r2);
    expect(r1.max(r2)).toBe(r1);
  });
});
