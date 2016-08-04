(function () {
  if (typeof GnG === "undefined") { window.GnG = {}; }

  var Tile = GnG.Tile = function (attrs) {
    this.x = attrs.x;
    this.y = attrs.y;
    this.z = this.getZ();
    this.seed = this.game.seed;
    this.worldPos = attrs.worldPos; // expects [x, y, z]
    this.type = attrs.type || "TILE";  // stone, water, etc.
    this.pos = attrs.pos; // expects [x, y, z] ?
    this.color = this.getColor();
  };

  // GnG.Util.inherits(Player, GnG.MovingObject);

  Tile.prototype.buildFromSeed = function (o) {
    var self = this;
    for (var x = 0; x < 20; x++) {
      for (var y = 0; y < 20; y++) {
        var tile = new GnG.Tile({ seed: o.seed, worldPos: o.worldPos, x: x, y: y });
        self.tiles.push(tile);
      }
    }
  };

  Tile.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x * 20, this.y * 20, 20, 20) // xpos, ypos, width, height
    ctx.fill();
  };

  Tile.prototype.getColor = function () {
    // very naiive tile colorizer.
    return ((this.x * this.y * this.worldPos[0] * this.seed) % 268435456).toString(16);
  };
})();
