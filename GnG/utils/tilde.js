// global tilde objects
(function () {
  if ( typeof ƒ === "undefined" ) { window.ƒ = {}; }

  window.ƒ = function () {
    this.v = function (arg) { // vectorizes array
      if ( Array.isArray(arg) ) {
        return new Vector({ arr: arg });
      }
    };
  };
})();
