
using("IGE.Control");

define("IGE.Control.IGEKeybind").assign({
  defaults: {
    keycode: 0,
    keydown: function() {},
    keyup: function() {},
    description: "empty bind"
  },

  keycode: null,
  keydown: null,
  keyup: null,
  description: null,
  handler: null,

  //constructor
  IGEKeybind: function(options) {
    if(typeof(options)!=="object") options = {};

    var _this = this,
        keycode = (typeof(options.keycode)==="number"?options.keycode:_this.defaults.keycode),
        keydown = (typeof(options.keydown)==="function"?options.keydown:_this.defaults.keydown),
        keyup = (typeof(options.keyup)==="function"?options.keyup:_this.defaults.keyup),
        description = (typeof(options.description)==="string"?options.description:_this.defaults.description);


    _this.keycode = keycode;
    _this.keydown = keydown;
    _this.keyup = keyup;
    _this.description = description;

    return this;
  },

  _IGEKeybind: function() {

  },

  unbind: function() {
    if(this.handler) {
      return this.handler.unbind(this);
    } else {
      return null;
    }
  }
});

unusing("IGE.Control");