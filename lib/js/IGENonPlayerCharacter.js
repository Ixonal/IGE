
using("IGE");

//IGEPlayerCharacter class definition
define("IGE.IGENonPlayerCharacter").extend("IGECharacter").assign({

  //IGEPlayerCharacter constructor
  IGENonPlayerCharacter: function(options) {
    this.IGECharacter(options);

    return this;
  },

  //IGEPlayerCharacter destructor
  _IGENonPlayerCharacter: function() {
    this._IGECharacter();
  }
});

unusing("IGE");