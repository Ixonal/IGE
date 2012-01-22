
define("SMWGame").assign({
  panel: null,

  miku: null,

  levels: null,
  currentLevel: null,

  SMWGame: function(options) {
    var _this = this;

    _this.panel = new IGEPanel({
      framesPerSecond: 36,
      console: {x: 0, y: 0, width: 800, height: 100},
      verbose: false
    })

    _this.miku = new IGEPlayerCharacter({
      x: 200,
      y: 300,
      width: 35,
      height: 90,
      solidDirs: true,
      gravity: {
        horizontal: 0,
        vertical: 1
      },
      accelleration: {
        horizontal: 2.5,
        vertical: 1
      },
      maxSpeed: {
        horizontal: 15,
        vertical: 75
      },
      id: "Miku",
      verbose: false
    });
  },

  _SMQGame: function() {
    
  },

  start: function() {
    
  }
});
