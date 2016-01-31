'use strict';

// Assume only that T, the type of n and d, is an integral domain,
// which is optionally ordered.
function Fraction(n, d) {
  if (d.equals(d.constructor.ZERO)) {
    throw new Error('zero denominator');
  }

  this._n = n;
  this._d = d;
}

Fraction.prototype.numerator = function() {
  return this._n;
};

Fraction.prototype.denominator = function() {
  return this._d;
};

// Assume only that T.toString() takes a single optional argument.
Fraction.prototype.toString = function(arg) {
  return '(' + this._n.toString(arg) + ')/(' + this._d.toString(arg) + ')';
};

Fraction.prototype.equals = function(val) {
  var a = this._n, b = this._d, c = val._n, d = val._d;
  return a.multiply(d).equals(b.multiply(c));
};

Fraction.prototype.negate = function() {
  return new Fraction(this._n.negate(), this._d);
};

Fraction.prototype.reciprocate = function() {
  return new Fraction(this._d, this._n);
};

Fraction.prototype.add = function(val) {
  var a = this._n, b = this._d, c = val._n, d = val._d;
  return new Fraction(a.multiply(d).add(b.multiply(c)), b.multiply(d));
};

Fraction.prototype.subtract = function(val) {
  var a = this._n, b = this._d, c = val._n, d = val._d;
  return new Fraction(a.multiply(d).subtract(b.multiply(c)), b.multiply(d));
};

Fraction.prototype.multiply = function(val) {
  return new Fraction(this._n.multiply(val._n), this._d.multiply(val._d));
};

Fraction.prototype.divide = function(val) {
  return new Fraction(this._n.multiply(val._d), this._d.multiply(val._n));
};

Fraction.prototype.pow = function(exponent) {
  if (exponent < 0) {
    return new Fraction(this._d.pow(-exponent), this._n.pow(-exponent));
  }
  // This maps (0/n)^0 to ((0^0)/1), so we remain agnostic to the
  // behavior of 0^0 in T.
  return new Fraction(this._n.pow(exponent), this._d.pow(exponent));
};

// The functions below can only be used if T is ordered.

Fraction.prototype.signum = function() {
  // Force return value to -1, 0, or +1.
  var ns = this._n.signum();
  if (ns == 0) {
    return 0;
  }
  var ds = this._d.signum();
  return ((ns > 0) == (ds > 0)) ? +1 : -1;
};

Fraction.prototype.compareTo = function(val) {
  var a = this._n, b = this._d, c = val._n, d = val._d;
  var s = ((b.signum() > 0) == (d.signum() > 0)) ? +1 : -1;
  s *= a.multiply(d).compareTo(b.multiply(c));
  // Force return value to -1, 0, or +1.
  if (s < 0) {
    return -1;
  } else if (s > 0) {
    return +1;
  } else {
    return 0;
  }
};

Fraction.prototype.abs = function() {
  return new Fraction(this._n.abs(), this._d.abs());
};
