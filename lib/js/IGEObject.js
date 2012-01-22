
using("IGE");
using("IGE.Graphics");

//IGEObject class definition
define("IGE.IGEObject").extend("IGEArea").assign({
  defaults: {
    y: 0,
    x: 0,
    width: 0,
    height: 0,
    strata: IGEStrata.moderate,
    solidDirs: false,
    friction: 0,
    id: "IGEObject",
    panel: "DEFAULT",
    verbose: false
  },

  solidDirs: null,     //IGESolidDirs object, determines which faces are solid
  solidDirsCopy: null,
  modifiers: null,

  //IGEObject constructor
  IGEObject: function(options) {
    var _this = this;

    if(typeof(options) !== "object") options = {};

    _this.IGEArea(options);

    _this.getDisplayElement().addClass("IGEObject");

    _this.solidDirs = new IGESolidDirs((typeof(options.solidDirs) === "object" &&
                                       options.solidDirs.IGESolidDirs) ||
                                       typeof(options.solidDirs) === "boolean"?
                                         options.solidDirs:
                                         _this.defaults.solidDirs);
    _this.solidDirsCopy = new IGESolidDirs(false);
    _this.debug("IGEObject: solid directions have been set.");



    _this.debug("IGEObject construction finished.");

    return this;
  },

  //IGEObject destructor
  _IGEObject: function() {
    this._IGEArea();
  },

  getSolidDirs: function() {
    using("IGE.Modification");

    var _this = this,
        index,
        modifier,
        sdc = _this.solidDirsCopy;

    sdc.top = _this.solidDirs.top;
    sdc.left = _this.solidDirs.left;
    sdc.right = _this.solidDirs.right;
    sdc.bottom = _this.solidDirs.bottom;

    for(index in _this.modifiers) {
      if(_this.modifiers[index].solidDirsTop) {
        modifier = _this.modifiers[index].solidDirsTop;
        if(modifier.type === IGEModifier.replace) {
          sdc.top = modifier.value;
        }
      }

      if(_this.modifiers[index].solidDirsLeft) {
        modifier = _this.modifiers[index].solidDirsTop;
        if(modifier.type === IGEModifier.replace) {
          sdc.left = modifier.value;
        }
      }

      if(_this.modifiers[index].solidDirsRight) {
        modifier = _this.modifiers[index].solidDirsTop;
        if(modifier.type === IGEModifier.replace) {
          sdc.right = modifier.value;
        }
      }

      if(_this.modifiers[index].solidDirsBottom) {
        modifier = _this.modifiers[index].solidDirsTop;
        if(modifier.type === IGEModifier.replace) {
          sdc.bottom = modifier.value;
        }
      }
    }

    unusing("IGE.Modification");

    return sdc;
  },

//  addModifier: function(modifier) {
//    var _this = this;
//
//    if(typeof(modifier) !== "object" && modifier.IGEObjectModifier) {
//      throw new IGEInvalidTypeException("addModifier takes an IGECharacterModifier object", _this);
//    }
//
//    _this.modifiers.splice(_this.modifiers.length, 0, modifier);
//
//    modifier.activate(_this);
//  },

  //removes a modifier from this character.
  //takes either a string of the class name
  //(in which case it removes the first modifier that matches),
  //or the particular object to be removed
  removeModifier: function(modifier) {
    var _this = this,
        index;

    if(typeof(modifier) === "string") {
      for(index in _this.modifiers) {
        if(_this.modifiers[index][modifier]) {
          _this.modifiers[index].deactivate(_this);
          _this.modifiers.splice(index, 1);
          return _this;
        }
      }
    } else if(typeof(modifier) === "object" && modifier.IGEObjectModifier) {
      for(index in _this.modifiers) {
        if(_this.modifiers[index] === modifier) {
          _this.modifiers[index].deactivate(_this);
          _this.modifiers.splice(index, 1);
          return _this;
        }
      }
    } else {
      _this.displayError("removeModifier takes an IGEObjectModifier object or string");
      throw new IGEInvalidTypeException("removeModifier takes an IGEObjectModifier object or string", _this);
    }

    return _this;
  }
});

unusing("IGE");
unusing("IGE.Graphics");
