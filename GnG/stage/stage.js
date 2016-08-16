// Base class for anything that moves
(function () {
  if (typeof GnG === "undefined") { window.GnG = {}; }

  var Stage = GnG.Stage = function (attrs) {
    this.game = attrs.game;
    this.seed = this.game.seed;
    this.worldPos = v(attrs.worldPos); // expects [x, y, z]
    this.type = attrs.type || "DESERT";  // dungeon, forest, etc.
    this.tileKeys = [];
    this.tiles = {};

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
        // random has problems with x = -13 or y = -17 or x = -1 or y = -3...
        var random = ((x + 13) * (y + 17) * self.seed * (self.worldPos.x + 1) * (self.worldPos.y + 3)).toString();
        if ( x + y > 36) { console.log(random); }
        var randType = Stage.Sampler[ Math.abs(self.game.rand(random) % 11) ];
        // if ( x === 0 || y === 0 || x === 19 || y === 19 ) { randType = 'FLOOR' };   // temporary.
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
        var tileKey = x.toString() + "," + y.toString();
        self.tileKeys.push(tileKey);
        self.tiles[tileKey] = tile;
      }
    }
    // build stage edges;
    self.buildEdges(o.worldPos, o.seed);
  };

  Stage.prototype.buildEdges = function (worldPos, seed) {
    var self = this;
    var nw = worldPos, // get 4 corners of stage
        ne = worldPos.plus(v([1, 0])),
        se = worldPos.plus(v([1, -1])),
        sw = worldPos.plus(v([0, -1]));

    // define edge from corners
    var northString = GnG.Util.seedRand(nw, ne, seed); // is a number
    for (var i = 0; i < 20; i++) {
      var posString = i + ",0";
      var randType = Stage.Sampler[ (northString + i) % 11 ];
      var tile = new GnG.Tile({
        game: self.game,
        seed: seed,
        worldPos: worldPos,
        stageX: i, stageY: 0,
        x: i * self.game.square,
        y: 0,
        stageType: self.type,
        type: randType,
      });
      this.tiles[posString] = tile;
    }
    // east edge
    var eastString = GnG.Util.seedRand(ne, se, seed);
    for (var j = 0; j < 20; j++) {
      var psEast = "19," + j;
      var rtEast = Stage.Sampler[ (eastString + j) % 11 ];
      var tileEast = new GnG.Tile({
        game: self.game,
        seed: seed,
        worldPos: worldPos,
        stageX: 19, stageY: j,
        x: 19 * self.game.square,
        y: j * self.game.square,
        stageType: self.type,
        type: rtEast,
      });
      this.tiles[psEast] = tileEast;
    }
    // south edge
    var southString = GnG.Util.seedRand(se, sw, seed);
    for (var k = 0; k < 20; k++) {
      var psSouth = k + ",19";
      var rtSouth = Stage.Sampler[ (southString + k) % 11 ];
      var tileSouth = new GnG.Tile({
        game: self.game,
        seed: seed,
        worldPos: worldPos,
        stageX: k, stageY: 19,
        x: k * self.game.square,
        y: 19 * self.game.square,
        stageType: self.type,
        type: rtSouth,
      });
      this.tiles[psSouth] = tileSouth;
    }
    // west edge
    var westString = GnG.Util.seedRand(sw, nw, seed);
    for (var l = 0; l < 20; l++) {
      var psWest = "0," + l;
      var rtWest = Stage.Sampler[ (westString + l) % 11 ];
      var tileWest = new GnG.Tile({
        game: self.game,
        seed: seed,
        worldPos: worldPos,
        stageX: 0, stageY: l,
        x: 0,
        y: l * self.game.square,
        stageType: self.type,
        type: rtWest,
      });
      this.tiles[psWest] = tileWest;
    }
  };

  Stage.prototype.draw = function (ctx) {
    var self = this;
    this.tileKeys.forEach(function (key) { self.tiles[key].draw(ctx); });
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
              [cx+1, cy], [cx, cy], [cx-1, cy],
              [cx+1, cy-1], [cx, cy-1], [cx, cy+1] ];
  };

  // Stage.build = {
  //   // a build object that holds different functions for building stages;
  //   random: function () {};
  //   interior: {};
  //   exterior: {};
  // };
})();
