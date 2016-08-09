(function () {
  if (typeof GnG === "undefined") { window.GnG = {}; }

  var GameView = GnG.GameView = function (game, dims, ctx) {
    this.game = game;
    this.dims = dims;
    this.ctx = ctx;
  };

  GameView.prototype.bindKeyHandlers = function () {
    if(key.isPressed("w")) { window.game.player.keybindings("w"); } // up move([0, -1]);
    if(key.isPressed("a")) { window.game.player.keybindings("a"); } // down move([-1, 0])
    if(key.isPressed("s")) { window.game.player.keybindings("s"); } // left move([0, 1]);
    if(key.isPressed("d")) { window.game.player.keybindings("d"); } // right move([1, 0])
    if(key.isPressed("q")) { console.log("Q POWER"); }
    if(key.isPressed("e")) { console.log("E POWER"); }
    if(key.isPressed("x")) { console.log(window.game.player.stats.hp); }
    if(key.isPressed("c")) { console.log("CROUCH"); }
    if(key.isPressed("i")) { console.log("OPEN INVENTORY"); }
    if(key.isPressed("z")) { console.log("fire missile"); }
    if(key.isPressed("p")) { window.game.pause = true; }
    if(key.isPressed("o")) { window.game.pause = false; }
    if(key.isPressed("enter")) { window.game.pause = false; }
  };

  GameView.prototype.start = function (canvasEl) {
    var ctx = canvasEl.getContext("2d");

    window.setInterval( function () {
      GameView.prototype.bindKeyHandlers();
      this.game.step();
      this.game.draw(this.ctx);
    }, 25);

  };

})();
