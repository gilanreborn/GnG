// Base class for anything that moves
(function () {
  if (typeof GnG === "undefined") {
    window.GnG = {};
  }

  var Player = GnG.Player = function (attrs) {
    this.img = new Image();
    this.img.src = '/'; //path to assets
    this.type = "PLAYER";
    this.pos = attrs.pos; //Expect pos to be array of 2 elements
    this.vel = attrs.vel;
    this.radius = attrs.radius;
    this.color = attrs.color;
    this.game = attrs.game;
    this.stats = { spd: 0, str: 0, hp: 100, };
    this.skills = {}; // special abilities?
    this.gear = {}; // equipment.
    this.powers = {}; // the attacks and abilities;
    this.keyBindings = {}; // keybindings for attacks, etc.
    this.inventory = {};
  };

  GnG.Util.inherits(Player, GnG.MovingObject);

  Player.prototype.move = function (dir) {
    var posX = this.pos[0] + dir[0];
    var posY = this.pos[1] + dir[1];

    this.pos = this.game.bounds([posX, posY]); // ensure the player stays in bounds.
  };

  Player.prototype.draw = function () {
    ctx.drawImage(this.img, this.pos[0] - 20, this.pos[1] - 20, 40, 40);
  };

})();
