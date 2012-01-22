
with(namespace("General.Notification",
               "IGE.Graphics",
               "IGE.Audio")) {


//IGEArea class definition
define("IGE.IGEArea").extend(Observer, Observable).assign({
  posNum: null,         //numerical representation of the current position of this area
  posCopy: null,        //copy of the curret position of this area
  center: null,         //the center of this area
  id: null,             //unique identifyer of this IGEArea
  imageHandler: null,   //the associated IGEImageHandler
  soundHandler: null,   //the associated IGESoundHandler
  displayElement: null, //the HTML element associated with this area
  panel: null,          //the associated IGEPanel
  parent: null,         //this area's parent object
  preUpdateFunc: null,  //functions to do before updating
  postUpdateFunc: null, //functions to do after updating
  isVerbose: null,      //whether or not this object displays copious amounts of debug data
  friction: null,       //vector containing friction coefficients for this area
  frictionCopy: null,   //copy of the friction vector
  modifiers: null,      //list of modifiers for this area

  defaults: {           //default values for IGEArea
    x:0,
    y:0,
    width: 0,
    height: 0,
    friction: 0,
    strata: IGEStrata.moderate,
    id: "IGEArea",
    panel: "DEFAULT",
    parent: null,
    verbose: false
  },

  //IGEArea constructor
  IGEArea: function(options) {
    if(!options) options = {};
    var _this = this;

    //console.log(IGEImage);

    //might have to find a faster way to factor in defaults
    $.extend(options, $.extend({}, _this.defaults, options));

    _this.isVerbose = options.verbose;

    //call super class constructors
    _this.Observable();
    _this.Observer();

    //locating the associated game panel
    if(typeof(options.panel) === "string") {
      _this.panel = getIGEPanel(options.panel);
    } else if(typeof(options.panel) === "object") {
      if(options.panel.IGEPanel !== null) {
        _this.panel = options.panel;
      } else {
        _this.panel = null;
      }
    } else {
      _this.panel = null;
    }

    //setting this area's id
    _this.id = options.id;
    if(_this.id === _this.defaults.id) _this.id += IGE.IGEArea.IGE_AREA_INDEX;
    IGE.IGEArea.IGE_AREA_INDEX++;
    _this.debug("IGEArea: set id to " + _this.id + ".");

    //initializing the posNum object
    _this.posNum = {
      x: options.x,
      y: options.y,
      width: options.width,
      height: options.height
    }

    //initializing the posCopy object
    _this.posCopy = {
      x: null,
      y: null,
      width: null,
      height: null
    }

    //initializing the center copy
    _this.center = new IGEPoint(_this.posNum.x + (_this.posNum.width / 2),
                                _this.posNum.y + (_this.posNum.height / 2));

    //using divs as the base display element
    _this.displayElement = $(document.createElement("div"));
    _this.displayElement.addClass("IGEArea");
    _this.displayElement.attr("id", _this.id);
    _this.displayElement.css("z-index", options.strata);
    _this.debug("IGEArea: display element for " + _this.id + " has been created.");


    _this.modifiers = [];


    //set up the friction vector
    if(typeof(options.friction) === "number") {
      _this.friction = new IGEVector(options.friction, options.friction);

    } else if(typeof(options.friction) === "object" &&
              typeof(options.friction.horizontal) === "number" &&
              typeof(options.friction.vertical) === "number") {
      _this.friction = new IGEVector(options.friction.horizontal, options.friction.vertical);

    } else if(typeof(options.friction) === "object" &&
              options.friction.IGEVector) {
      _this.friction = options.friction;
    } else {

      _this.friction = new IGEVector(0, 0);
    }
    _this.debug("IGEObject: friction values hae been set.");

    _this.frictionCopy = new IGEVector(0, 0);


    //initializing this area's image and sound handlers
    //using("IGE.Graphics");
    //using("IGE.Audio");
    with(IGE.Graphics) {
      _this.imageHandler = new IGEImageHandler({area: _this});
    }
    with(IGE.Audio) {
      _this.soundHandler = new IGESoundHandler({area: _this});
    }
    _this.debug("IGEArea: image and sound handlers for " + _this.id + " have been created.");
    //unusing("IGE.Graphics");
    //unusing("IGE.Audio");

    //setting up pre and post update function holders
    _this.preUpdateFunc = [];
    _this.postUpdateFunc = [];

    _this.parent = options.parent;


    //registering this area's initial position
    _this.setPos();
    _this.setWidth();
    _this.setHeight();
    
    _this.debug("IGEArea construction finished");

    return this;
  },

  //IGEArea destructor
  _IGEArea: function() {
    this._Observer();
    this._Observable();
  },


  setPos: function(x, y) {
    var _this = this;

    if(typeof(x) === "number") {
      _this.posNum.x = x;
    }

    if(typeof(y) === "number") {
      _this.posNum.y = y;
    }

    _this.getDisplayElement().css("left", _this.posNum.x + "px")
                             .css("bottom", _this.posNum.y + "px");
  },

  setWidth: function(width) {
    if(typeof(width) === "number") {
      this.posNum.width = width;
    }

    this.getDisplayElement().css("width", this.posNum.width + "px");
  },

  setHeight: function(height) {
    if(typeof(height) === "number") {
      this.posNum.height = height;
    }

    this.getDisplayElement().css("height", this.posNum.height + "px");
  },


  getPos: function() {
    var _this = this,
        index,
        modifier;

    with(namespace("IGE.Modification")) {

      _this.posCopy.x = _this.posNum.x;
      _this.posCopy.y = _this.posNum.y;
      _this.posCopy.width = _this.posNum.width;
      _this.posCopy.height = _this.posNum.height;

      for(index in _this.modifiers) {

        //factor in x modifications
        if(_this.modifiers[index].x) {
          modifier = _this.modifiers[index].x;
          switch(modifier.type) {
            case IGEModifier.add:
              _this.posCopy.x += modifier.value;
              break;
            case IGEModifier.subtract:
              _this.posCopy.x -= modifier.value;
              break;
            case IGEModifier.multiply:
              _this.posCopy.x *= modifier.value;
              break;
            case IGEModifier.divide:
              _this.posCopy.x /= modifier.value;
              break;
            case IGEModifier.replace:
              _this.posCopy.x = modifier.value;
              break;
          }
        }

        //factor in y modifications
        if(_this.modifiers[index].y) {
          modifier = _this.modifiers[index].y;
          switch(modifier.type) {
            case IGEModifier.add:
              _this.posCopy.y += modifier.value;
              break;
            case IGEModifier.subtract:
              _this.posCopy.y -= modifier.value;
              break;
            case IGEModifier.multiply:
              _this.posCopy.y *= modifier.value;
              break;
            case IGEModifier.divide:
              _this.posCopy.y /= modifier.value;
              break;
            case IGEModifier.replace:
              _this.posCopy.y = modifier.value;
              break;
          }
        }

        //factor in width modifications
        if(_this.modifiers[index].width) {
          modifier = _this.modifiers[index].width;
          switch(modifier.type) {
            case IGEModifier.add:
              _this.posCopy.width += modifier.value;
              break;
            case IGEModifier.subtract:
              _this.posCopy.width -= modifier.value;
              break;
            case IGEModifier.multiply:
              _this.posCopy.width *= modifier.value;
              break;
            case IGEModifier.divide:
              _this.posCopy.width /= modifier.value;
              break;
            case IGEModifier.replace:
              _this.posCopy.width = modifier.value;
              break;
          }
        }

        //factor in height modifications
        if(_this.modifiers[index].height) {
          modifier = _this.modifiers[index].height;
          switch(modifier.type) {
            case IGEModifier.add:
              _this.posCopy.height += modifier.value;
              break;
            case IGEModifier.subtract:
              _this.posCopy.height -= modifier.value;
              break;
            case IGEModifier.multiply:
              _this.posCopy.height *= modifier.value;
              break;
            case IGEModifier.divide:
              _this.posCopy.height /= modifier.value;
              break;
            case IGEModifier.replace:
              _this.posCopy.height = modifier.value;
              break;
          }
        }
      }

      _this.getDisplayElement().css("width", _this.posCopy.width + "px");
      _this.getDisplayElement().css("height", _this.posCopy.height + "px");

    }

    return _this.posCopy;
  },

  addModifier: function(modifier) {
    var _this = this;

    if(typeof(modifier) !== "object" && modifier.IGEModifier) {
      throw new IGEInvalidTypeException("addModifier takes an IGEModifier object", _this);
    }

    _this.modifiers.splice(_this.modifiers.length, 0, modifier);

    modifier.activate(_this);
  },


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
    } else if(typeof(modifier) === "object" && modifier.IGEModifier) {
      for(index in _this.modifiers) {
        if(_this.modifiers[index] === modifier) {
          _this.modifiers[index].deactivate(_this);
          _this.modifiers.splice(index, 1);
          return _this;
        }
      }
    } else {
      _this.displayError("removeModifier takes an IGEModifier object or string");
      throw new IGEInvalidTypeException("removeModifier takes an IGEModifier object or string", _this);
    }

    return _this;
  },

  //returns the x and y position of the center of this area
  getCenter: function() {
    var _this = this,
        pos = _this.getPos();

    _this.center.setX(pos.x + (pos.width / 2));
    _this.center.setY(pos.y + (pos.height / 2));

    return _this.center;
  },

  getFriction: function() {
    var _this = this,
        index,
        modifier;

    _this.frictionCopy.setX(_this.friction.getX());
    _this.frictionCopy.setY(_this.friction.getY());

    for(index in _this.modifiers) {
      if(_this.modifiers[index].frictionHorizontal) {
        modifier = _this.modifiers[index].frictionHorizontal;
        switch(modifier.type) {
          case IGEObjectModifier.add:
            _this.frictionCopy.addX(modifier.value);
            break;
          case IGEObjectModifier.subtract:
            _this.frictionCopy.subtractX(modifier.value);
            break;
          case IGEObjectModifier.multiply:
            _this.frictionCopy.multiplyX(modifier.value);
            break;
          case IGEObjectModifier.divide:
            _this.frictionCopy.divideX(modifier.value);
            break;
          case IGEObjectModifier.replace:
            _this.frictionCopy.setX(modifier.value);
            break;
        }
      }

      if(_this.modifiers[index].frictionVerticle) {
        modifier = _this.modifiers[index].frictionVerticle;
        switch(modifier.type) {
          case IGEObjectModifier.add:
            _this.frictionCopy.addY(modifier.value);
            break;
          case IGEObjectModifier.subtract:
            _this.frictionCopy.subtractY(modifier.value);
            break;
          case IGEObjectModifier.multiply:
            _this.frictionCopy.multiplyY(modifier.value);
            break;
          case IGEObjectModifier.divide:
            _this.frictionCopy.divideY(modifier.value);
            break;
          case IGEObjectModifier.replace:
            _this.frictionCopy.setY(modifier.value);
            break;
        }
      }
    }

    return _this.frictionCopy;
  },

  //returns whether or not this area is above another area
  isAbove: function(area) {
    return this.isAboveOffset(area, 0);
  },

  //returns whether or not this area is above another area given a vertical offset
  isAboveOffset: function(area, offset) {
    if(!area.IGEArea) return false;

    var posA = this.getPos(),
        posB = area.getPos();

    return (posA.y + offset) >= (posB.y + posB.height);
  },

  //returns whether or not this area is below another area
  isBelow: function(area) {
    return this.isBelowOffset(area, 0);
  },

  //returns whether or not this area is below another area given a vertical offset
  isBelowOffset: function(area, offset) {
    if(!area.IGEArea) return false;

    var posA = this.getPos(),
        posB = area.getPos();

    return (posA.y + posA.height + offset) <= (posB.y);
  },

  //returns whether or not this area is to the left of another area
  isLeftOf: function(area) {
    return this.isLeftOfOffset(area, 0);
  },

  //returns whether or not this area is to the left of another area given a horizontal offset
  isLeftOfOffset: function(area, offset) {
    if(!area.IGEArea) return false;

    var posA = this.getPos(),
        posB = area.getPos();

    return (posA.x + posA.width + offset) <= (posB.x);
  },

  //returns whether or not this area is to the right of another area
  isRightOf: function(area) {
    return this.isRightOfOffset(area, 0);
  },

  //returns whether or not this area is to the right of another area given a horizontal offset
  isRightOfOffset: function(area, offset) {
    if(!area.IGEArea) return false;

    var posA = this.getPos(),
        posB = area.getPos();

    return (posA.x + offset) >= (posB.x + posB.width);
  },

  //returns whether or not this area intersects with another area
  intersects: function(area) {
    return this.intersectsOffset(area, 0, 0);
  },

  //returns whether or not this area intersects with another area given a horizontal and vertical offset
  intersectsOffset: function(area, offsetX, offsetY) {
    return this.intersectsYOffset(area, offsetY) && this.intersectsXOffset(area, offsetX);
  },

  //returns whether or not this area intersects along the Y-axis with another given area
  intersectsY: function(area) {
    return this.intersectsYOffset(area, 0);
  },

  //returns whether or not this area intersects along the Y-axis with another given area and vertical offset
  intersectsYOffset: function(area, offset) {
    if(typeof(area) !== "object" || !area.IGEArea || typeof(offset) !== "number") {
      throw new IGEInvalidTypeException("intersectsYOffset takes an IGEArea and numeric offset.", this);
    }

    var posA = this.getPos(),
        posB = area.getPos();

//    return ((posA.y + offset) >= (posB.y) && (posA.y + offset) <= (posB.y + posB.height)) ||
//           ((posA.y + posA.height + offset) >= (posB.y) && (posA.y + posA.height + offset) <= (posB.y + posB.height));

    return ((posA.y + offset) <= (posB.y) && (posA.y + posA.height + offset) >= (posB.y)) ||
           ((posA.y + offset) >= (posB.y) && (posA.y + offset) <= (posB.y + posB.height));
  },

  //returns whether or not this area intersects along the X-axis with another given area
  intersectsX: function(area) {
    return this.intersectsXOffset(area, 0);
  },

  //returns whether or not this area intersects along the X-axis with another given area and horizontal offset
  intersectsXOffset: function(area, offset) {
    if(typeof(area) !== "object" || !area.IGEArea || typeof(offset) !== "number") {
      throw new IGEInvalidTypeException("intersectsXOffset takes an IGEArea and numeric offset.", this);
    }

    var posA = this.getPos(),
        posB = area.getPos();

//    return ((posA.x + offset) >= (posB.x) && (posA.x + offset) <= (posB.x + posB.width)) ||
//           ((posA.x + posA.width + offset) >= (posB.x) && (posA.x + posA.width + offset) <= (posB.x + posB.width));

    return ((posA.x + offset) <= (posB.x) && (posA.x + posA.width + offset) >= (posB.x)) ||
           ((posA.x + offset) >= (posB.x) && (posA.x + offset) <= (posB.x + posB.width));
  },

  getParent: function() {
    return this.parent;
  },

  setParent: function(newParent) {
    if(!newParent.IGEArea) return null;

    this.parent = newParent;

    return this;
  },

  getImageHandler: function() {
    return this.imageHandler;
  },

  getSoundHandler: function() {
    return this.soundHandler;
  },


  getID: function() {
    return this.id;
  },


  getDisplayElement: function() {
    return this.displayElement;
  },


  //tells the panel to display an error
  displayError: function(message) {
    if(this.panel) {
      this.panel.displayError(message);
    }
  },


  //tells the panel to display a warning
  displayWarning: function(message) {
    if(this.panel) {
      this.panel.displayWarning(message);
    }
  },


  //tells the panel to display information
  displayInfo: function(message) {
    if(this.panel) {
      this.panel.displayInfo(message);
    }
  },

  //updates this area
  update: function() {
    var _this = this,
        index;

    for(index in _this.preUpdateFunc) {
      _this.preUpdateFunc[index]();
    }

    _this.updateState();

    for(index in _this.postUpdateFunc) {
      _this.postUpdateFunc[index]();
    }
  },

  //things to do before object state is updated
  updateInit: function(func) {
    if(typeof(func) !== "function") {
      throw new IGEInvalidTypeException("updateInit takes a function argument", this);
    }

    this.preUpdateFunc.push(func);

    return this;
  },

  //updates the state of this area
  //meant to be overridden
  updateState: function() {},

  //things to do after object state is updated
  updateFinal: function(func) {
    if(typeof(func) !== "function") {
      throw new IGEInvalidTypeException("updateFinal takes a function argument", this);
    }

    this.postUpdateFunc.push(func);

    return this;
  },

  //how this area interacts with another area
  //called before movement is made
  //meant to be overridden
  interactWith: function(area) {
    if(!area.IGEArea) return null;

    return this;
  },


  //what happens when this are impacts another area
  //(usually movable object runs into a solid edge of another object)
  //called before movement is actually made
  //meant to be overridden
  impact: function(area) {
    if(!area.IGEArea) return null;

    return this;
  },


  //shows the area
  show: function() {
    this.getDisplayElement().show();
    return this;
  },

  //hides the area
  hide: function() {
    this.getDisplayElement().hide();
    return this;
  },

  //returns whether or not the area is hidden
  isShown: function() {
    return (this.getDisplayElement().css("display") !== "none");
  },

  debug: function(message) {
    if(this.isVerbose) {
      this.displayInfo(message);
    }
  }
}).statics({
  IGE_AREA_INDEX: 0
});

//IGE.IGEArea.IGE_AREA_INDEX = 0;
//var IGE_AREA_INDEX = 0;

}

//unusing("General.Notification");
//unusing("IGE.Graphics");
