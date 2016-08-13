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

  MovingObject.prototype.isCollidedWith = function (that) {
    // rectangle collision
    return ( this.pos.x < that.pos.x + that.size &&
             this.pos.x + this.size > that.x &&
             this.pos.y < that.pos.y + that.size &&
             this.pos.y + this.size > that.pos.y
           );
  };

  MovingObject.prototype.collideWith = function (that) {
    if ( that.type === 'FLOOR' ) {}
    if ( that.type !== 'FLOOR' ) {
      // get relative vector; then eject player towards the nearest open space.
      var rv = that.pos.minus(this.pos);
      var ev; // ejection vector;
      if ( Math.abs(rv.x) > Math.abs(rv.y) ) {
        var evX = rv.x > 0 ? rv.x - this.size : this.size + rv.x;
        ev = v([evX, 0]);
      } else {
        var evY = rv.y > 0 ? rv.y - this.size : this.size + rv.y;
        ev = v([0, evY]);
      }

      this.pos = this.pos.plus(ev);
    }
  };

})();
