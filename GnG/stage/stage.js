// Base class for anything that moves
(function () {
  if (typeof GnG === "undefined") { window.GnG = {}; }

  var Stage = GnG.Stage = function (attrs) {
    this.game = attrs.game;
    this.seed = this.game.seed;
    this.worldPos = v(attrs.worldPos); // expects [x, y, z]
    this.type = attrs.type || "STAGE";  // dungeon, forest, etc.
    this.tiles = [];

    this.buildFromSeed({ seed: this.seed, worldPos: this.worldPos, });
  };

  Stage.Types = ['DESERT', 'ROCKY', 'URBAN', 'CAVE', 'OASIS', 'DUNGEON'];
  Stage.Sampler = ['FLOOR', 'FLOOR', 'FLOOR', 'FLOOR', 'FLOOR', 'FLOOR',
                    'WALL', 'WALL', 'WALL', 'DOOR', 'SPECIAL'];
  // GnG.Util.inherits(Player, GnG.MovingObject);

  Stage.prototype.buildFromSeed = function (o) {
    var self = this;
    self.type = 'CAVE'; // self.Types[seed % 10]
    // set own type from worldpos.
    // default to 'open desert...'
    // build stage walls from seed.
    // build stage features from seed.
    // build stage paths from seed.
    // populate stage
    for (var x = 0; x < 20; x++) {
      for (var y = 0; y < 20; y++) {
        var random = ((x + 13) * (y + 17) * self.seed * (self.worldPos.x + 1) * (self.worldPos.y + 3)).toString();
        var randType = Stage.Sampler[ self.game.rand(random) % 11 ];
        var tile = new GnG.Tile({
          game: self.game,
          seed: o.seed,
          worldPos: o.worldPos,
          stageX: x, stageY: y,
          x: x * self.game.square,
          y: y * self.game.square,
          stageType: self.type,
          type: randType,
        });
        self.tiles.push(tile);
      }
    }
  };

  Stage.prototype.draw = function (ctx) {
    this.tiles.forEach(function (tile) { tile.draw(ctx); });
  };

  Stage.prototype.coords = function (obj) {
    var pos = v(obj.pos);
    var xTile = Math.floor(pos.x / game.square);
    var yTile = Math.floor(pos.y / game.square);
    return [xTile, yTile];
  };

  Stage.prototype.adjacentCoords = function (c1, c2) {
    // if x's are within 1 and y's are within 1, return true.
    if ( (Math.abs(c1[0] - c2[0]) <= 1) && (Math.abs(c1[1] - c2[1]) <= 1) ) { return true; }
    return false;
  };

  Stage.prototype.adjacentSquares = function (coords) {
    var cx = coords[0];
    var cy = coords[1];
    return [ [cx+1, cy+1], [cx, cy+1], [cx-1, cy+1],
              [cx+1, cy], [cx-1, cy],
              [cx+1, cy-1], [cx, cy-1], [cx, cy+1] ];
  };
})();
