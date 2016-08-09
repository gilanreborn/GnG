//player
(function () {
  if (typeof GnG === "undefined") { window.GnG = {}; }

  var DIRS = { UP: [0, -1], DOWN: [0, 1], LEFT: [-1, 0], RIGHT: [1, 0] };

  var Player = GnG.Player = function (attrs) {
    this.game = attrs.game;
    this.size = this.game.square;
    this.img = new Image();
    this.img.src = './GnG/assets/player.jpg'; //path to assets
    this.type = "PLAYER";
    this.pos = v(attrs.pos) || v([10 * this.size, 10 * this.size, 10]); // [x, y, z]
    this.vel = v(attrs.vel) || v([0, 0]);
    this.orientation = v(attrs.orientation) || v([1, 0]);
    this.radius = attrs.radius || 10;
    this.color = attrs.color;
    this.stats = { spd: 3, str: 0, hp: 100, };
    this.skills = {}; // special abilities?
    this.gear = {}; // equipment.
    this.powers = {}; // the attacks and abilities;
    this.keybindings = function (key) {
      var self = this;
      switch (key) {
        case "w": { self.velocity("UP"); break; }
        case "a": { self.velocity("LEFT"); break; }
        case "s": { self.velocity("DOWN"); break; }
        case "d": { self.velocity("RIGHT"); break; }
        case "click": {
          var mousePos = window.GnG.Mouse.gamePos();
          console.log("click logged at " + mousePos.x + " " + mousePos.y);
          break; }
      }
    };
    this.inventory = {};
  };

  GnG.Util.inherits(Player, GnG.MovingObject);

  Player.prototype.velocity = function (dir) {
    var vvv = DIRS[dir] || [0, 0];
    this.vel = this.vel.plus(vvv);
  };

  Player.prototype.move = function () { //account for player orientation too
    var vvv = this.vel.normalize().times(this.stats.spd);
    this.pos = this.pos.plus(vvv);
    this.vel = v([0, 0]);
  };

  Player.prototype.draw = function () {
    var s = this.size;
    if ( this.pos.isVector ) {
      ctx.drawImage(this.img, this.pos.x - s/2, this.pos.y - s/2, s, s);
    }
  };

})();
