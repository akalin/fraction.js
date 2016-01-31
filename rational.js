'use strict';

// Assume only that T, the type of n and d, is a GCD domain, which is
// optionally ordered.
function Rational(n, d) {
  if (d.equals(d.constructor.ZERO)) {
    throw new Error('zero denominator');
  }

  // Assume that gcd(n, 0) == gcd(0, n) == n for any n. Also assume,
  // if T are ordered, that n.gcd(d) has the correct value only up to
  // sign.
  var gcd = n.gcd(d);
  n = n.divide(gcd);
  d = d.divide(gcd);

  // Don't assume that T is ordered.
  if (n.signum && d.signum && d.signum() < 0) {
    n = n.negate();
    d = d.negate();
  }

  this._n = n;
  this._d = d;
}

Rational.prototype.numerator = function() {
  return this._n;
};

Rational.prototype.denominator = function() {
  return this._d;
};

Rational.prototype.toString = function(arg) {
  return '(' + this._n.toString(arg) + ')/(' + this._d.toString(arg) + ')';
};

Rational.prototype.equals = function(val) {
  return this._n.equals(val._n) && this._d.equals(val._d)
};

Rational.prototype.negate = function() {
  // TODO: Avoid unneeded GCD calculation here.
  return new Rational(this._n.negate(), this._d);
};

Rational.prototype.reciprocate = function() {
  // TODO: Avoid unneeded GCD calculation here.
  return new Rational(this._d, this._n);
};

Rational.prototype.add = function(val) {
  var a = this._n, b = this._d, c = val._n, d = val._d;
  return new Rational(a.multiply(d).add(b.multiply(c)), b.multiply(d));
};

Rational.prototype.subtract = function(val) {
  var a = this._n, b = this._d, c = val._n, d = val._d;
  return new Rational(a.multiply(d).subtract(b.multiply(c)), b.multiply(d));
};

Rational.prototype.multiply = function(val) {
  // TODO: Optimize GCD calculation here.
  return new Rational(this._n.multiply(val._n), this._d.multiply(val._d));
};

Rational.prototype.divide = function(val) {
  // TODO: Optimize GCD calculation here.
  return new Rational(this._n.multiply(val._d), this._d.multiply(val._n));
};

Rational.prototype.pow = function(exponent) {
  // TODO: Avoid unneeded GCD calculation here.
  if (exponent < 0) {
    return new Rational(this._d.pow(-exponent), this._n.pow(-exponent));
  }
  // This maps (0/1)^0 to ((0^0)/1), so we remain agnostic to the
  // behavior of 0^0 in T.
  return new Rational(this._n.pow(exponent), this._d.pow(exponent));
};

// The functions below can only be used if T is ordered.

Rational.prototype.signum = function() {
  // Force return value to -1, 0, or +1.
  var ns = this._n.signum();
  if (ns < 0) {
    return -1;
  } else if (ns > 0) {
    return +1;
  } else {
    return 0;
  }
};

Rational.prototype.compareTo = function(val) {
  var a = this._n, b = this._d, c = val._n, d = val._d;
  var s = a.multiply(d).compareTo(b.multiply(c));
  // Force return value to -1, 0, or +1.
  if (s < 0) {
    return -1;
  } else if (s > 0) {
    return +1;
  } else {
    return 0;
  }
};

Rational.prototype.abs = function() {
  // TODO: Avoid unneeded GCD calculation here.
  return new Rational(this._n.abs(), this._d);
};

Rational.prototype.min = function(val) {
  return (this.compareTo(val) <= 0) ? this : val;
};

Rational.prototype.max = function(val) {
  return (this.compareTo(val) >= 0) ? this : val;
};

// TODO: Add floor, ceil, round, and toMixed methods.
