// Base class for anything that moves
(function () {
  if (typeof GnG === "undefined") {
    window.GnG = {};
  }

  var Player = GnG.Player = function (attrs) {
    this.game = attrs.game;
    this.size = this.game.square;
    this.img = new Image();
    this.img.src = './GnG/assets/player.jpg'; //path to assets
    this.type = "PLAYER";
    this.pos = attrs.pos || [10 * this.size, 10 * this.size, 10]; // [x, y, z]
    this.vel = attrs.vel || [0, 0];
    this.radius = attrs.radius || 10;
    this.color = attrs.color;
    this.stats = { spd: 0, str: 0, hp: 100, };
    this.skills = {}; // special abilities?
    this.gear = {}; // equipment.
    this.powers = {}; // the attacks and abilities;
    this.keyBindings = {}; // keybindings for attacks, etc.
    this.inventory = {};
  };

  GnG.Util.inherits(Player, GnG.MovingObject);

  Player.prototype.move = function (dir) {
    var d = dir || [0, 0];
    // this.pos[0] = this.pos[0] || 10;
    // this.pos[1] = this.pos[1] || 10;
    var posX = this.pos[0] + d[0];
    var posY = this.pos[1] + d[1];

    this.pos = this.game.bounds([posX, posY]); // ensure the player stays in bounds.
  };

  Player.prototype.draw = function () {
    var s = this.size;
    ctx.drawImage(this.img, this.pos[0] - s/2, this.pos[1] - s/2, s, s);
  };

})();
