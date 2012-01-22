
using("IGE");

//IGERotationalPlatform class definition
define("IGE.IGERotationalPlatform").extend("IGEMovingPlatform").assign({

  //constructor
  IGERotationalPlatform: function(options) {
    this.IGEMovingPlatform(options);

    return this;
  },

  //destructor
  _IGERotationalPlatform: function() {
    this._IGEMovingPlatform();
  }
});

unusing("IGE");
