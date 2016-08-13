// global tilde objects
(function () {
  if ( typeof Vector === "undefined" ) { window.Vector = {}; }

  var Vector = window.Vector = function (arr) {
    this.vector = arr;
    this.x = this.vector ? this.vector[0] : 1;
    this.y = this.vector ? this.vector[1] : 1;
    this.isVector = true;
  };

  Vector.prototype.length = function () {
    var sq = this.vector.reduce(function (pre, cur) { return pre + cur*cur; }, 0);
    return Math.sqrt(sq);
  };

  Vector.prototype.plus = function (vector) {
    var v = Array.isArray(vector) ? new Vector(vector) : vector;
    var result = [];
    for (var i = 0; i < v.vector.length; i++) { result.push(this.vector[i] + v.vector[i]); }
    return new Vector(result);
  };

  Vector.prototype.times = function (s) {
    if ( typeof s !== "number" ) { throw "can only multiply by scalar"; }
    var result = [];
    for (var i = 0; i < this.vector.length; i++) { result.push(this.vector[i] * s); }
    return new Vector(result);
  };

  Vector.prototype.minus = function (vector) {
    var v = Array.isArray(vector) ? new Vector(vector) : vector;
    var result = [];
    for (var i = 0; i < v.vector.length; i++) { result.push(this.vector[i] - v.vector[i]); }
    return new Vector(result);
  };

  Vector.prototype.normalize = function () {
    var l = this.length();
    if ( l === 0 ) { return new Vector([0, 0]); }
    return this.times(1/l);
  };

  v = function (arg) { // vectorizes array
    if ( Array.isArray(arg) ) { return new Vector(arg); }
    return arg;
  };
})();
