
using("IGE");

//IGESolidDirs class definition
define("IGESolidDirs").assign({
  top: false,
  bottom: false,
  left: false,
  right: false,

  //IGESolidDirs constructor
  IGESolidDirs: function(options) {
    if(typeof(options) === "boolean") {
      this.top = options;
      this.left = options;
      this.right = options;
      this.bottom = options;
    } else {
      if(typeof(options.top) === "boolean") this.top = options.top;
      if(typeof(options.bottom) === "boolean") this.bottom = options.bottom;
      if(typeof(options.left) === "boolean") this.left = options.left;
      if(typeof(options.right) === "boolean") this.right = options.right;
    }
  },

  //IGESolidDirs destructor
  _IGESolidDirs: function() {
    delete this;
  }
});

unusing("IGE");
