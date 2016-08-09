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
    // if (obj.pos.vector[0] < 0 || obj.pos.vector[0] > GnG.Game.dim_x()) // GnG.Game.DIM_X)
    //   { return true; }
    // if (obj.pos.vector[1] < 0 || obj.pos.vector[1] > GnG.Game.dim_y() + 100) // GnG.Game.DIM_Y)
    //   { return true; }
    return false;
  };

})();
