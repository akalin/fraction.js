'use strict';

// Assume only that T, the type of n and d, is an integral domain.
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
