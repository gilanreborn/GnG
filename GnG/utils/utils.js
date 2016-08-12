// Utility code, vector math
(function () {
  if (typeof GnG === "undefined") { window.GnG = {}; }

  var Util = GnG.Util = {};

  Util.inherits = function (childClass, parentClass) {
    var Surrogate = function () {};

    Surrogate.prototype = parentClass.prototype;
    childClass.prototype = new Surrogate();
    childClass.prototype.constructor = childClass;
  };

  Util.inBounds = function (position) {
    var pos = v(position);
    if (pos.x < 0) { return false; }
    if (pos.y < 0) { return false; }
    if (pos.x > GnG.Game.dim_x()) { return false; }
    if (pos.y > GnG.Game.dim_y()) { return false; }
    return true;
  };

  Util.offScreen = function (obj) {
    var halfOff = game.square / 2;
    if ( obj.pos.x < -halfOff ) { return 'WEST'; }
    if ( obj.pos.x > game.size + halfOff ) { return 'EAST'; }
    if ( obj.pos.y < -halfOff ) { return 'NORTH'; }
    if ( obj.pos.y > game.size + halfOff ) { return 'SOUTH'; }
    return false;
  };

})();
