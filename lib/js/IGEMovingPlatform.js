
using("IGE");

define("IGE.IGEMovingPlatform").extend("IGEMovableObject").assign({

  //constructor
  IGEMovingPlatform: function(options) {
    this.IGEMovableObject(options);

    return this;
  },

  //destructor
  _IGEMovingPlatform: function() {
    this._IGEMovableObject();
  }
});

unusing("IGE");
