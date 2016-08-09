(function () {
  if (typeof GnG === "undefined") { window.GnG = {}; }

  var Mouse = GnG.Mouse = function (attrs) {
    this.pos = {
      x: 0,
      y: 0,
    };
  };

  // GnG.Util.inherits(Player, GnG.MovingObject);
  document.onmousemove = updateMousePos;
  document.onclick = mouseClick;

  function updateMousePos(e) {
    var mouse = window.GnG.Mouse;
    mouse.pos = { x: e.pageX, y: e.pageY, };
  }

  function mouseClick(e) {
    window.game.player.keybindings("click");
  }

  Mouse.gamePos = function () {
    var mouse = window.GnG.Mouse;
    // sidebar width 300px hardcoded
    return { x: mouse.pos.x - 300, y: mouse.pos.y };
  };
})();
