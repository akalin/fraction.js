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
