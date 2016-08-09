/* Game (lib/game.js)
Holds collections of the movingObjects, bullets, and your ship.
#step method calls #move on all the objects, and #checkCollisions checks for colliding objects.
#draw(ctx) draws the game.
Keeps track of dimensions of the space; wraps objects around when they drift off the screen.
*/

(function () {
  if (typeof GnG === "undefined") { window.GnG = {}; }

  var SIZE = Math.min(window.innerWidth, window.innerHeight);
  var SQUARE = SIZE / 20;
  var DIM_X = window.innerWidth;
  var DIM_Y = window.innerHeight;
  var GAME_DIRS = { UP: [0, -1], DOWN: [0, 1], LEFT: [-1, 0], RIGHT: [1, 0] };

  var Game = GnG.Game = function (options) {
    this.size = SIZE;
    this.square = SQUARE; // size of one square on the grid
    this.dim_x = SIZE || DIM_X;
    this.dim_y = SIZE || DIM_Y;
    this.seed = 1;
    this.stage = new GnG.Stage({ game: this, worldPos: [1, 1, 1], });
    this.player = new GnG.Player({ pos: [500, 500], game: this, });
    this.mouse = {}; // for handling the mousePos.

    this.textObjects = [];
    this.movingObjects = [this.player]; // move to stage?
    this.visualFX = [];

    this.counter = 50;
    this.score = 0;
    this.pause = false;

    this.start();
  };

  Game.dim_x = function () { return window.innerWidth; };
  Game.dim_y = function () { return window.innerHeight; };

  Game.prototype.start = function () {
    this.buildStage();
    this.reset();
  };

  Game.prototype.buildStage = function () {
    this.stage.buildFromSeed(this.seed);
  };

  Game.prototype.reset = function () {
    // this.movingObjects = [];
  };

  Game.prototype.addText = function (attrs) {
    attrs.game = this;
    var text = new GnG.Text(attrs);
    this.textObjects.push(text);
  };

  Game.prototype.addFX = function (attrs) {
    attrs.game = this;
    var fx = new GnG.VisualEffect(attrs);
    this.visualFX.push(fx);
  };

  Game.prototype.allObjects = function (attrs) {
    return this.movingObjects;
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, DIM_X, DIM_Y); //this will empty the canvas

    this.stage.draw(ctx);
    this.allObjects().forEach(function (object) { object.draw(ctx); });
    this.textObjects.forEach(function (text) { text.draw(ctx); });
    this.visualFX.forEach(function (effect) { effect.draw(ctx); });
  };

  Game.prototype.moveObjects = function () {
    this.movingObjects.forEach(function (object) { object.move(); });
  };

  Game.prototype.updateTextObjects = function () {
    this.textObjects.forEach(function (text) { text.update(); });
  };

  Game.prototype.cleanUp = function () {
    this.movingObjects.forEach(function (object) {
      if (GnG.Util.offScreen(object)) { this.remove(object); }
    }.bind(this));
  };

  Game.prototype.getBounds = function () { return [DIM_X, DIM_Y]; };

  Game.prototype.bounds = function (pos) {
    var origX = pos[0];
    var origY = pos[1];

    if (origX >= DIM_X) { origX = DIM_X; }
    if (origX <= 0) { origX = 0; }
    if (origY >= DIM_Y) { origY = DIM_Y; }
    if (origY <= 0) { origY = 0; }

    return [origX, origY];
  };

  Game.prototype.checkCollisions = function () {};

  Game.prototype.step = function () {
    if (!this.pause) {
      this.updateTextObjects();
      this.moveObjects();
      this.checkCollisions();
      this.cleanUp();
    }
  };

  Game.prototype.remove = function (object) {
    var i = this.movingObjects.indexOf(object);
    return this.movingObjects.splice(i, 1); // use splice to delete elements at index i...
  };

  Game.prototype.removeText = function (object) {
    var i = this.textObjects.indexOf(object);
    return this.textObjects.splice(i, 1);
  };

  Game.prototype.removeFX = function (object) {
    var i = this.visualFX.indexOf(object);
    return this.visualFX.splice(i, 1);
  };

  Game.prototype.destroy = function (object) {};

  Game.prototype.spawnObjects = function () {};

  Game.prototype.spawn = function (spawn) {};

})();
