// Base class for anything that moves
(function () {
  if (typeof GnG === "undefined") {
    window.GnG = {};
  }

  var MovingObject = GnG.MovingObject = function (attrs) {
    this.pos = attrs.pos; //Expect pos to be array of 2 elements
    this.vel = attrs.vel;
    this.radius = attrs.radius;
    this.color = attrs.color;
    this.game = attrs.game;
  };

  MovingObject.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
  };

  MovingObject.prototype.move = function (ctx) {
    var origX = this.pos[0];
    var origY = this.pos[1];

    var dx = this.vel[0];
    var dy = this.vel[1];

    var posX = origX + dx;
    var posY = origY + dy;

    this.pos = [posX, posY];
  };

  MovingObject.prototype.approach = function (obj, str) {
    var impulse = [0, 0];
    var targetPos = obj.pos;

    if (this.pos[0] > targetPos[0]) { impulse[0] = -str; } else { impulse[0] = str; }
    if (this.pos[1] > targetPos[1]) { impulse[1] = -str; } else { impulse[1] = str; }

    return impulse;
  };

  MovingObject.prototype.avoid = function (obj, str) {
    var impulse = [0, 0];
    var targetPos = obj.pos;

    if (this.pos[0] < targetPos[0]) { impulse[0] = -str; } else { impulse[0] = str; }
    if (this.pos[1] < targetPos[1]) { impulse[1] = -str; } else { impulse[1] = str; }

    return impulse;
  };

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    //dont calculate if they're far apart to optimize (nothing has radius > 80?)
    if (Math.abs(this.pos[0] - otherObject.pos[0] > 160 || Math.abs(this.pos[1] - otherObject.pos[1] > 180))) {
      return false;
    }
    // if theyre near, get the exact distance.
    var distObjs = GnG.Util.dist(this.pos, otherObject.pos);
    return distObjs < (this.radius + otherObject.radius);
  };

  MovingObject.prototype.collideWith = function (otherObject) {
  };

})();
