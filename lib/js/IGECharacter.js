
using("IGE");
using("IGE.Exceptions");
using("IGE.Graphics");

//IGECharacter class definition
define("IGE.IGECharacter", "abstract").extend("IGEMovableObject", "IGETargeter").assign({
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
    id: "IGECharacter",
    panel: "DEFAULT",
    verbose: false
  },

  currentHitpoints: null,
  maximumHitpoints: null,

  //IGECharacter constructor
  IGECharacter: function(options) {
    var _this = this;

    _this.IGEMovableObject(options);

    _this.getDisplayElement().addClass("IGECharacter");

    _this.currentHitpoints = options.hitpoints;
    _this.maximumHitpoints = options.hitpoints;
    _this.debug("IGECharacter: hitpoints have been set to " + options.hitpoints);

    _this.debug("IGECharacter construction finished.");

    return _this;
  },

  //IGECharacter destructor
  _IGECharacter: function() {
    this._IGEMovableObject();
  },

  setMaximumHitpoints: function(to) {
    if(typeof(to) !== "number") {
      throw new IGEInvalidTypeException("setMaximumHitpoints takes a number.", this);
    }

    this.maximumHitpoints = to;
  },

  getMaximumHitpoints: function() {
    return this.maximumHitpoints;
  },

  setCurrentHitpoints: function(to) {
    if(typeof(to) !== "number") {
      throw new IGEInvalidTypeException("setCurrentHitpoints takes a number.", this);
    }

    this.currentHitpoints = to;
  },

  getCurrentHitpoints: function() {
    return this.currentHitpoints;
  },

  receiveDamage: function(amount) {
    if(typeof(amount) !== "number") {
      throw new IGEInvalidTypeException("receiveDamage takes a number.", this);
    }

    this.currentHitpoints -= amount;
  }
});

unusing("IGE");
unusing("IGE.Exceptions");
unusing("IGE.Graphics");
