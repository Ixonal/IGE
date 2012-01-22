
using("IGE");

//IGECircuitPlatform class deffinition
define("IGE.IGECircuitPlatform").extend("IGEMovingPlatform").assign({

  //constructor
  IGECircuitPlatform: function(options) {
    this.IGEMovingPlatform(options);

    return this;
  },

  //destructor
  _IGECircuitPlatform: function() {
    this._IGEMovingPlatform();
  }
});

unusing("IGE");
