
using("IGE");
using("IGE.Graphics");

//IGEPlayerCharacter class definition
define("IGE.IGEPlayerCharacter").extend("IGECharacter").assign({
  defaults: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    gravity: 0,
    maxSpeed: 0,
    accelleration: 0,
    friction: 0,
    solidDirs: false,
    strata: IGEStrata.moderate,
    hitpoints: 1,
    id: "IGEPlayerCharacter",
    panel: "DEFAULT",
    verbose: false
  },

  //IGEPlayerCharacter constructor
  IGEPlayerCharacter: function(options) {
    this.IGECharacter(options);

    this.debug("IGEPlayerCharacter construction finished.")

    return this;
  },

  //IGEPlayerCharacter destructor
  _IGEPlayerCharacter: function() {
    this._IGECharacter();
  }
});

unusing("IGE");
unusing("IGE.Graphics");