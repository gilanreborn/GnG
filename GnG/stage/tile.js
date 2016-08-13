(function () {
  if (typeof GnG === "undefined") { window.GnG = {}; }

  var Tile = GnG.Tile = function (attrs) {
    this.x = attrs.x;
    this.y = attrs.y;
    this.z = this.getZ();
    this.stageX = attrs.stageX;
    this.stageY = attrs.stageY;
    this.game = attrs.game;
    this.seed = this.game.seed;
    this.worldPos = v(attrs.worldPos); // expects [x, y, z]
    this.type = attrs.type || "TILE";  // stone, water, etc.
    this.pos = attrs.pos || v([this.x, this.y, this.z]); // expects [x, y, z] ?
    this.size = this.game.square; // avoid floats where possible
    this.color = this.getColor();
  };

  // GnG.Util.inherits(Player, GnG.MovingObject);

  Tile.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    var s = this.size;
    ctx.fillRect(this.x, this.y, s, s); // xpos, ypos, width, height
    ctx.fill();
  };

  Tile.prototype.getZ = function () {
    return 10; //placeholder...
  };

  Tile.prototype.getColor = function () {
    // very naiive tile colorizer.
    // if stage has walls, walls are where x is 0 or 20 || y is 0 or 20, plus some extras?
    // build stage in layers, first floor, then walls, then room objects?
    // current formulation not good for building sections of things. very sharp.
    // want a more blobby approach.  Perhaps values fall within some range?
    // threshold values...
    switch (this.type) {
      case "FLOOR": { return '#ffaa00'; } // orange
      case "WALL": { return '#993300'; } // brown
      case "DOOR": { return '#aaaaaa'; } // gray
      case "SPECIAL": { return '#0000ee'; } //blue
      default: { return '#000000'; } // black!
    }
  };
})();
