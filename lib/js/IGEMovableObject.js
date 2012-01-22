
using("IGE");
using("IGE.Graphics");

define("IGE.IGEMovableObject").extend("IGEObject").assign({
  defaults: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    strata: IGEStrata.moderate,
    solidDirs: false,
    gravity: 0,
    maxSpeed: 0,
    accelleration: 0,
    friction: 0,
    id: "IGEMovableObject",
    panel: "DEFAULT",
    verbose: false
  },

  gravity: null,            //gravity vector placed on this object
  gravityCopy: null,        //copy of this object's gravity values
  accelleration: null,      //how fast horizontally and vertically this object can speed up
  accellerationCopy: null,  //copy of this object's accelleration values
  maxSpeed: null,           //the maximum speed this object can travel horizontally and vertically
  maxSpeedCopy: null,       //copy of this object's max speed values
  movement: null,           //current moving vector for this object
  stableHorizontal: null,   //what this object is stable on moving horizontally
  stableVertical: null,     //what this object is stable on moving vertically
  moveLeft: false,          //sets this object as moving left
  moveRight: false,         //sets this object as moving right
  moveUp: false,            //sets this object as moving up
  moveDown: false,          //sets this object as moving down
  

  //IGEMovableObject constructor
  IGEMovableObject: function(options) {
    var _this = this;

    _this.IGEObject(options);

    //initialize the movement vector
    _this.movement = new IGEVector(0, 0);

    _this.getDisplayElement().addClass("IGEMovableObject");

    //initialize the gravity vector
    if(typeof(options.gravity) === "number") {
      _this.gravity = new IGEVector(options.gravity, options.gravity);
    } else if(typeof(options.gravity) === "object" &&
              typeof(options.gravity.horizontal) === "number" &&
              typeof(options.gravity.vertical) === "number") {
      _this.gravity = new IGEVector(options.gravity.horizontal, options.gravity.vertical);
    } else if(typeof(options.gravity) === "object" &&
              options.gravity.IGEVector) {
      _this.gravity = options.gravity;
    } else {
      _this.displayError("Invalid gravity specified for " + _this.id + ": " + options.gravity);
      throw new IGEInvalidTypeException("Invalid gravity specified for " + _this.id + ": " + options.gravity, _this);
    }
    _this.debug("IGEMovableObject: gravity vector has been set.");

    _this.gravityCopy = new IGEVector(0, 0);



    //initialize the accelleration vector
    if(typeof(options.accelleration) === "number") {
      _this.accelleration = new IGEVector(options.accelleration, options.accelleration);

    } else if(typeof(options.accelleration) === "object" &&
              typeof(options.accelleration.horizontal) === "number" &&
              typeof(options.accelleration.vertical) === "number") {
      _this.accelleration = new IGEVector(options.accelleration.horizontal, options.accelleration.vertical);

    } else if(typeof(options.accelleration) === "object" &&
              options.accelleration.IGEVector) {
      _this.accelleration = options.accelleration;
      
    } else {
      this.displayError("Invalid accelleration specified for " + _this.id + ": " + options.accelleration);
      throw new IGEInvalidTypeException("Invalid accelleration specified for " + _this.id + ": " + options.accelleration, _this);
    }
    _this.debug("IGEMovableObject: accelleration vector has been set.");

    _this.accellerationCopy = new IGEVector(0, 0);



    //initialize the max speed vector
    if(typeof(options.maxSpeed) === "number") {
      _this.maxSpeed = new IGEVector(options.maxSpeed, options.maxSpeed);

    } else if(typeof(options.maxSpeed) === "object" &&
              typeof(options.maxSpeed.horizontal) === "number" &&
              typeof(options.maxSpeed.vertical) === "number") {
      _this.maxSpeed = new IGEVector(options.maxSpeed.horizontal, options.maxSpeed.vertical);

    } else if(typeof(options.maxSpeed) === "object" &&
              options.maxSpeed.IGEVector) {
      _this.maxSpeed = options.maxSpeed;
    } else {
      _this.displayError("Invalid maximum speed specified for " + _this.id + ": " + options.maxSpeed);
      throw new IGEInvalidTypeException("Invalid maximum speed specified for " + _this.id + ": " + options.maxSpeed, _this);
    }
    _this.debug("IGEMovableObject: maximum speed values have been set.");

    _this.maxSpeedCopy = new IGEVector(0, 0);

    _this.debug("IGEMovableObject construction finished.");

    return _this;
  },

  //IGEMovableObject destructor
  _IGEMovableObject: function() {
    this._IGEObject();
  },


  getGravity: function() {
    //using("IGE.Modification");

    var _this = this,
        index,
        modifier;

    with(namespace("IGE.Modification")) {

      _this.gravityCopy.setX(_this.gravity.getX());
      _this.gravityCopy.setY(_this.gravity.getY());

      for(index in _this.modifiers) {
        if(_this.modifiers[index].gravityHorizontal) {
          modifier = _this.modifiers[index].gravityHorizontal;
          switch(modifier.type) {
            case IGEObjectModifier.add:
              _this.gravityCopy.addX(modifier.value);
              break;
            case IGEObjectModifier.subtract:
              _this.gravityCopy.subtractX(modifier.value);
              break;
            case IGEObjectModifier.multiply:
              _this.gravityCopy.multiplyX(modifier.value);
              break;
            case IGEObjectModifier.divide:
              _this.gravityCopy.divideX(modifier.value);
              break;
            case IGEObjectModifier.replace:
              _this.gravityCopy.setX(modifier.value);
              break;
          }
        }

        if(_this.modifiers[index].gravityVertical) {
          modifier = _this.modifiers[index].gravityVertical;
          switch(modifier.type) {
            case IGEObjectModifier.add:
              _this.gravityCopy.addY(modifier.value);
              break;
            case IGEObjectModifier.subtract:
              _this.gravityCopy.subtractY(modifier.value);
              break;
            case IGEObjectModifier.multiply:
              _this.gravityCopy.multiplyY(modifier.value);
              break;
            case IGEObjectModifier.divide:
              _this.gravityCopy.divideY(modifier.value);
              break;
            case IGEObjectModifier.replace:
              _this.gravityCopy.setY(modifier.value);
              break;
          }
        }
      }

    }

    //unusing("IGE.Modification");

    return _this.gravityCopy;
  },


  getAccelleration: function() {

    //using("IGE.Modification");

    var _this = this,
        index,
        modifier;

    with(namespace("IGE.Modification")) {

      _this.accellerationCopy.setX(_this.accelleration.getX());
      _this.accellerationCopy.setY(_this.accelleration.getY());

      for(index in _this.modifiers) {
        if(_this.modifiers[index].accellerationHorizontal) {
          modifier = _this.modifiers[index].accellerationHorizontal;
          switch(modifier.type) {
            case IGEModifier.add:
              _this.accellerationCopy.addX(modifier.value);
              break;
            case IGEModifier.subtract:
              _this.accellerationCopy.subtractX(modifier.value);
              break;
            case IGEModifier.multiply:
              _this.accellerationCopy.multiplyX(modifier.value);
              break;
            case IGEModifier.divide:
              _this.accellerationCopy.divideX(modifier.value);
              break;
            case IGEModifier.replace:
              _this.accellerationCopy.setX(modifier.value);
              break;
          }
        }

        if(_this.modifiers[index].accellerationVerticle) {
          modifier = _this.modifiers[index].accellerationVerticle;
          switch(modifier.type) {
            case IGEModifier.add:
              _this.accellerationCopy.addY(modifier.value);
              break;
            case IGEModifier.subtract:
              _this.accellerationCopy.subtractY(modifier.value);
              break;
            case IGEModifier.multiply:
              _this.accellerationCopy.multiplyY(modifier.value);
              break;
            case IGEModifier.divide:
              _this.accellerationCopy.divideY(modifier.value);
              break;
            case IGEModifier.replace:
              _this.accellerationCopy.setY(modifier.value);
              break;
          }
        }
      }
    }

    //unusing("IGE.Modification");

    return _this.accellerationCopy;
  },


  getMaxSpeed: function() {
    //using("IGE.Modification");

    var _this = this,
        index,
        modifier;

    with(namespace("IGE.Modification")) {

      _this.maxSpeedCopy.setX(_this.maxSpeed.getX());
      _this.maxSpeedCopy.setY(_this.maxSpeed.getY());

      for(index in _this.modifiers) {
        if(_this.modifiers[index].maxSpeedHorizontal) {
          modifier = _this.modifiers[index].maxSpeedHorizontal;
          switch(modifier.type) {
            case IGEModifier.add:
              _this.maxSpeedCopy.addX(modifier.value);
              break;
            case IGEModifier.subtract:
              _this.maxSpeedCopy.subtractX(modifier.value);
              break;
            case IGEModifier.multiply:
              _this.maxSpeedCopy.multiplyX(modifier.value);
              break;
            case IGEModifier.divide:
              _this.maxSpeedCopy.divideX(modifier.value);
              break;
            case IGEModifier.replace:
              _this.maxSpeedCopy.setX(modifier.value);
              break;
          }
        }

        if(_this.modifiers[index].maxSpeedVerticle) {
          modifier = _this.modifiers[index].maxSpeedVerticle;
          switch(modifier.type) {
            case IGEModifier.add:
              _this.maxSpeedCopy.addY(modifier.value);
              break;
            case IGEModifier.subtract:
              _this.maxSpeedCopy.subtractY(modifier.value);
              break;
            case IGEModifier.multiply:
              _this.maxSpeedCopy.multiplyY(modifier.value);
              break;
            case IGEModifier.divide:
              _this.maxSpeedCopy.divideY(modifier.value);
              break;
            case IGEModifier.replace:
              _this.maxSpeedCopy.setY(modifier.value);
              break;
          }
        }
      }

    }

    //unusing("IGE.Modification");

    return _this.maxSpeedCopy;
  },

  
  updateState: function() {
    this.updatePosition();
  },

  updatePosition: function() {
    var _this = this,
        index,
        position = _this.getPos(),
        siblings = _this.parent.getChildren(),
        sibling;

    //factor in gravity
    _this.factorGravity();

    //factor in friction
    _this.factorFriction();

    //factor in which direction to accellerate towards
    _this.factorMovementFlags();

    //factor in maximum speeds
    _this.factorMaxSpeed();

    //check for any intersections with other areas
    for(index in siblings) {
      sibling = siblings[index];
      if(sibling != _this) {

        _this.checkForIntersectionDown(sibling);
        _this.checkForIntersectionUp(sibling);
        _this.checkForIntersectionLeft(sibling);
        _this.checkForIntersectionRight(sibling);
       
      }
    }

    _this.checkIfFallOff();

    //update to the new position
    _this.setPos(position.x + _this.movement.getX(), position.y + _this.movement.getY());
  },


  factorMovementFlags: function() {
    var _this = this,
        accelleration = _this.getAccelleration();

    if(_this.movingLeft) {
      _this.movement.subtractX(accelleration.getX());
    }

    if(_this.movingRight) {
      _this.movement.addX(accelleration.getX());
    }

    if(_this.movingUp) {
      _this.movement.addY(accelleration.getY());
    }

    if(_this.movingDown) {
      _this.movement.subtractY(accelleration.getY());
    }
  },


  factorFriction: function() {
    var _this = this,
        stableFriction,
        frictionAdjustment;

    //factoring friction for vertical stable object
    if(_this.stableVertical) {
      stableFriction = _this.stableVertical.getFriction();
      frictionAdjustment = stableFriction.getX();
      if(_this.movement.getX() > 0) {
        if(_this.movement.getX() > frictionAdjustment) {
          //_this.movement.horizontal -= frictionAdjustment;
          _this.movement.subtractX(frictionAdjustment);
        } else {
          _this.movement.setX(0);
        }
      } else if(_this.movement.getX() < 0) {
        if(Math.abs(_this.movement.getX()) > frictionAdjustment) {
          //_this.movement.horizontal += frictionAdjustment;
          _this.movement.addX(frictionAdjustment);
        } else {
          _this.movement.setX(0);
          //_this.movement.horizontal = 0;
        }
      }
    }

    //factoring friction for horizontal stable object
    if(_this.stableHorizontal) {
      stableFriction = _this.stableHorizontal.getFriction();
      frictionAdjustment = stableFriction.getY();
      if(_this.movement.getY() > 0) {
        if(_this.movement.getY() > frictionAdjustment) {
          _this.movement.subtractY(frictionAdjustment);
        } else {
          _this.movement.setY(0);
        }
      } else if(_this.movement.getY() < 0) {
        if(Math.abs(_this.movement.getY()) > frictionAdjustment) {
          _this.movement.addY(frictionAdjustment);
        } else {
          _this.movement.setY(0);
        }
      }
    }

    //factoring friction for level
    stableFriction = _this.getParent().getFriction();
    frictionAdjustment = stableFriction.getY();
    if(_this.movement.getY() > 0) {
      if(_this.movement.getY() > frictionAdjustment) {
        _this.movement.subtractY(frictionAdjustment);
      } else {
        _this.movement.setY(0);
      }
    } else if(_this.movement.getY() < 0) {
      if(Math.abs(_this.movement.getY()) > frictionAdjustment) {
        _this.movement.addY(frictionAdjustment);
      } else {
        _this.movement.setY(0);
      }
    }
    frictionAdjustment = stableFriction.getX();
    if(_this.movement.getX() > 0) {
      if(_this.movement.getX() > frictionAdjustment) {
        _this.movement.subtractX(frictionAdjustment);
      } else {
        _this.movement.setX(0);
      }
    } else if(_this.movement.getX() < 0) {
      if(Math.abs(_this.movement.getX()) > frictionAdjustment) {
        _this.movement.addX(frictionAdjustment);
      } else {
        _this.movement.setX(0);
      }
    }

    
  },


  factorGravity: function() {
    var _this = this,
        gravity = _this.getGravity();

    if(_this.stableHorizontal) {
      _this.movement.setX(0);
    }  else {
      _this.movement.addX(-1 * gravity.getX());
    }

    if(_this.stableVertical) {
      _this.movement.setY(0);
    } else {
      _this.movement.addY(-1 * gravity.getY());
    }
  },


  factorMaxSpeed: function() {
    var _this = this,
        maxSpeed = _this.getMaxSpeed();

    if(_this.movement.getX() < -1 * maxSpeed.getX()) {
      _this.movement.setX(-1 * maxSpeed.getX());
    }

    if(_this.movement.getX() > maxSpeed.getX()) {
      _this.movement.setX(maxSpeed.getX());
    }

    if(_this.movement.getY() > maxSpeed.getY()) {
      _this.movement.sexY(maxSpeed.getY());
    }
    
    if(_this.movement.getY() < -1 * maxSpeed.getY()) {
      _this.movement.setY(-1 * maxSpeed.getY());
    }
  },


  checkForIntersectionDown: function(sibling) {
    var _this = this,
        movement = _this.movement,
        siblingPosition = sibling.getPos(),
        position = _this.getPos();

    //are we above or below a sibling?
    if(_this.intersectsXOffset(sibling, movement.getX())) {

      //above one sibling, are we going to run into it?
      if(_this.isAbove(sibling) &&
          (_this.intersectsYOffset(sibling, movement.getY()) ||
           _this.isBelowOffset(sibling, movement.getY()))) {

        _this.interactWith(sibling);
        sibling.interactWith(_this);

        //are we running into a solid edge or not?
        if(sibling.IGEObject && sibling.getSolidDirs().top) {
          _this.impact(sibling);

          _this.movement.setY(0);
          _this.setPos(position.x, siblingPosition.y + siblingPosition.height);
          
          //will gravity hold us there?
          if(_this.gravity.getY() > 0) {
            _this.stableVertical = sibling;
          }
        } else {
          //is the sibling a sector?
          if(sibling.IGESector) {
            sibling.activate(_this);
          }
        }
      }
    }
  },


  checkForIntersectionUp: function(sibling) {
    var _this = this,
        movement = _this.movement,
        siblingPosition = sibling.getPos(),
        position = _this.getPos();

    //are we above or below a sibling?
    if(_this.intersectsXOffset(sibling, movement.getX())) {

      //below one sibling, are we going to run into it?
      if(_this.isBelow(sibling) &&
          (_this.intersectsYOffset(sibling, movement.getY()) ||
           _this.isAboveOffset(sibling, movement.getY()))) {

        _this.interactWith(sibling);
        sibling.interactWith(_this);

        //are we running into a solid edge or not?
        if(sibling.IGEObject && sibling.getSolidDirs().bottom) {
          _this.impact(sibling);

          _this.movement.setY(0);
          _this.setPos(position.x, siblingPosition.y - position.height);


          //will gravity hold us there?
          if(_this.gravity.getY() < 0) {
            _this.stableVertical = sibling;
          }
        } else {
          //is the sibling a sector?
          if(sibling.IGESector) {
            sibling.activate(_this);
          }
        }
      }
    }
  },


  checkForIntersectionLeft: function(sibling) {
    var _this = this,
        movement = _this.movement,
        siblingPosition = sibling.getPos(),
        position = _this.getPos();

    //are we left or right of a sibling?
    if(_this.intersectsYOffset(sibling, movement.getY())) {

      //above one sibling, are we going to run into it?
      if(_this.isRightOf(sibling) &&
          (_this.intersectsXOffset(sibling, movement.getX()) ||
           _this.isLeftOfOffset(sibling, movement.getX()))) {

        _this.interactWith(sibling);
        sibling.interactWith(_this);

        //are we running into a solid edge or not?
        if(sibling.IGEObject && sibling.getSolidDirs().right) {
          _this.impact(sibling);

          _this.movement.setX(0);
          _this.setPos(siblingPosition.x + siblingPosition.width, position.y);
          
          //will gravity hold us there?
          if(_this.gravity.getX() > 0) {
            _this.stableHorizontal = sibling;
          }
        } else {
          //is the sibling a sector?
          if(sibling.IGESector) {
            sibling.activate(_this);
          }
        }
      }
    }
  },


  checkForIntersectionRight: function(sibling) {
    var _this = this,
        movement = _this.movement,
        siblingPosition = sibling.getPos(),
        position = _this.getPos();

    //are we left or right of the sibling?
    if(_this.intersectsYOffset(sibling, movement.getY())) {

      //left of one sibling, are we going to run into it?
      if(_this.isLeftOf(sibling) &&
          (_this.intersectsXOffset(sibling, movement.getX()) ||
           _this.isRightOfOffset(sibling, movement.getX()))) {

        _this.interactWith(sibling);
        sibling.interactWith(_this);

        //are we running into a solid edge or not?
        if(sibling.IGEObject && sibling.getSolidDirs().left) {
          _this.impact(sibling);

          _this.movement.setX(0);
          _this.setPos(siblingPosition.x - position.width, position.y);
          
          //will gravity hold us there?
          if(_this.gravity.getX() < 0) {
            _this.stableHorizontal = sibling;
          }
        } else {
          //is the sibling a sector?
          if(sibling.IGESector) {
            sibling.activate(_this);
          }
        }
      }
    }
  },


  checkIfFallOff: function() {
    var _this = this;

    //stable on something to the right or left
    if(_this.stableHorizontal) {
      if(!_this.intersectsYOffset(_this.stableHorizontal, _this.movement.getY())) {
        _this.stableHorizontal = null;
      }
    }

    //stable on something to the top or bottom
    if(_this.stableVertical) {
      if(!_this.intersectsXOffset(_this.stableVertical, _this.movement.getX())) {
        _this.stableVertical = null;
      }
    }
  }
});

unusing("IGE");
unusing("IGE.Graphics");
