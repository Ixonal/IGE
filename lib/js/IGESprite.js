
//

using("IGE");
using("IGE.Graphics");

//IGESprite class definition
define("IGE.Graphics.IGESprite").extend("IGEImage").assign({
  defaults: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    strata: IGEStrata.moderate,
    id: "IGESprite",
    panel: "DEFAULT",
    source: "",
    spriteLeft: 0,
    spriteTop: 0
  },

  spriteTop: null,
  spriteLeft: null,

  //constructor
  IGESprite: function(options) {
    var _this = this,
        index;

    _this.IGEImage(options);

    _this.getDisplayElement().addClass("IGESprite");

    _this.setSpriteTop(options.spriteTop);
    _this.setSpriteLeft(options.spriteLeft);

    return _this;
  },

  //destructor
  _IGESprite: function() {
    this._IGEImage();
  },

  setSpriteTop: function(to) {
    if(typeof(to) !== "number") return null;

    this.spriteTop = -1 * to;

    this.updateSprite();

    return this;
  },

  setSpriteLeft: function(to) {
    if(typeof(to) !== "number") return null;

    this.spriteLeft = -1 * to;

    this.updateSprite();

    return this;
  },

  updateSprite: function() {
    var _this = this;

    _this.getDisplayElement().css("background", "url('" + _this.source +
                                  "') " + _this.spriteLeft + "px " +
                                  _this.spriteTop + "px no-repeat");

    return _this;
  }
});

unusing("IGE");
unusing("IGE.Graphics");
