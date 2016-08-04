(function () {
  if (typeof GnG === "undefined") { window.GnG = {}; }

  var Mouse = GnG.Mouse = function (attrs) {
    this.pos = { x: 0, y: 0, };
    this.offset = {
      x: window.canvasEl.getBoundingClientRect.left,
      y: window.canvasEl.getBoundingClientRect.top,
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
    debugger;
  }
})();
