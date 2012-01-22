
using("IGE");
using("IGE.Graphics");

define("IGE.IGELevelViewer").extend("IGEPanel").assign({
  defaults: {
    x: 0,
    y: 0,
    width: 800,
    height: 600,
    strata: IGEStrata.moderate,
    id: "IGEPanel",
    container: "body",
    framesPerSecond: 35,
    scrollIncrement: 25
  },

  moveUp: false,
  moveLeft: false,
  moveRight: false,
  moveDown: false,
  scrollIncrement: null,

  IGELevelViewer: function(options) {
    var _this = this,
        kh,
        upBind = new IGEKeybind({
          keycode: IGEKeybindHandler.getKeyToKeycode("up arrow"),
          keydown: function() {
            _this.moveUp = true;
          },
          keyup: function() {
            _this.moveUp = false;
          },
          description: "Move the view upwards"
        }),
        leftBind = new IGEKeybind({
          keycode: IGEKeybindHandler.getKeyToKeycode("left arrow"),
          keydown: function() {
            _this.moveLeft = true;
          },
          keyup: function() {
            _this.moveLeft = false;
          },
          description: "Move the view left"
        }),
        rightBind = new IGEKeybind({
          keycode: IGEKeybindHandler.getKeyToKeycode("right arrow"),
          keydown: function() {
            _this.moveRight = true;
          },
          keyup: function() {
            _this.moveRight = false;
          },
          description: "Move the view right"
        }),
        downBind = new IGEKeybind({
          keycode: IGEKeybindHandler.getKeyToKeycode("down arrow"),
          keydown: function() {
            _this.moveDown = true;
          },
          keyup: function() {
            _this.moveDown = false;
          },
          description: "Move the view down"
        });

    if(typeof(options) !== "object") options = {};

    _this.IGEPanel(options);

    _this.getDisplayElement().addClass("IGELevelViewer");

    _this.scrollIncrement = typeof(options.scrollIncrement) === "number"?
                              options.scrollIncrement:
                              _this.defaults.scrollIncrement;

    _this.focusObject = {};

    kh = _this.getKeybindHandler();
    kh.bind(upBind);
    kh.bind(leftBind);
    kh.bind(rightBind);
    kh.bind(downBind);


    return _this;
  },

  _IGELevelViewer: function() {

  },

  updateView: function() {
    if(typeof(this.level) !== "object" || !this.level.IGELevel) {
      return;
    }

    var levelPos = this.level.getPos(),
        xChange = 0,
        yChange = 0;

    if(this.moveUp) {
      yChange -= this.scrollIncrement;
    }
    if(this.moveLeft) {
      xChange += this.scrollIncrement;
    }
    if(this.moveRight) {
      xChange -= this.scrollIncrement;
    }
    if(this.moveDown) {
      yChange += this.scrollIncrement;
    }

    this.level.setPos(levelPos.x + xChange, levelPos.y + yChange);
  }
});

unusing("IGE");
unusing("IGE.Graphics");
