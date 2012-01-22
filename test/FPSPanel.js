
using("IGE");
using("IGE.UI");

define("FPSPanel").extend("IGEUserInterfaceLabel").assign({
  defaults: {
    y: 0,
    x: 0,
    width: 75,
    height: 25,
    interval: 250,
    id: "FPSPanel",
    panel: "DEFAULT",
    text: "fps"
  },
  fpsLabel: null,
  interval: null,
  timer: null,
  frameCount: 0,

  FPSPanel: function(options) {
    var _this = this;

    if(!options) options = {};

    _this.IGEUserInterfaceLabel(options);

    _this.interval = options.interval;
    _this.timer = setInterval(function() {
      var intervalCorrection = 1000 / _this.interval,
          fps = _this.frameCount * intervalCorrection;

      _this.frameCount = 0;

      _this.setText(fps + " fps");
    }, _this.interval);

    return _this;
  },

  _FPSPanel: function() {
    this._IGEUserInterfaceLabel();
  },

  update: function(obj, state) {
    this.frameCount++;
  },

  updateFPS: function() {
    var _this = this,
        intervalCorrection = 1000 / _this.interval;

    _this.displayElement.text(intervalCorrection);
  }
});

unusing("IGE");
unusing("IGE.UI");