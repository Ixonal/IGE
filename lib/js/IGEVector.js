
using("IGE.Util");

define("IGE.Util.IGEVector").assign({
  x: null,
  y: null,
  unit: null,

  IGEVector: function(x, y) {
    if(typeof(x) !== "number" || typeof(y) !== "number") {
      throw new IGEInvalidTypeException("IGEVector: x and y must be numeric types.", this);
    }
    
    this.x = x;
    this.y = y;
  },

  _IGEVector: function() {
    delete this.x;
    delete this.y;
    delete this.unit;
  },

  getX: function() {
    return this.x;
  },

  setX: function(x) {
    if(typeof(x) !== "number") {
      throw new IGEInvalidTypeException("setX: value must be a number, got " + typeof(x) + ".", this);
    }

    this.x = x;
    return this;
  },

  addX: function(value) {
    if(typeof(value) !== "number") {
      throw new IGEInvalidTypeException("addX: value must be a number, got " + typeof(value) + ".", this);
    }

    this.x += value;
    return this;
  },

  subtractX: function(value) {
    if(typeof(value) !== "number") {
      throw new IGEInvalidTypeException("subtractX: value must be a number, got " + typeof(value) + ".", this);
    }

    this.x -= value;
    return this;
  },

  multiplyX: function(value) {
    if(typeof(value) !== "number") {
      throw new IGEInvalidTypeException("multiplyX: value must be a number, got " + typeof(value) + ".", this);
    }

    this.x *= value;
    return this;
  },

  divideX: function(value) {
    if(typeof(value) !== "number") {
      throw new IGEInvalidTypeException("divideX: value must be a number, got " + typeof(value) + ".", this);
    }

    this.x /= value;
    return this;
  },

  getY: function() {
    return this.y
  },

  setY: function(y) {
    if(typeof(y) !== "number") {
      throw new IGEInvalidTypeException("setY: value must be a number, got " + typeof(y) + ".", this);
    }

    this.y = y;
    return this;
  },

  addY: function(value) {
    if(typeof(value) !== "number") {
      throw new IGEInvalidTypeException("addY: value must be a number, got " + typeof(value) + ".", this);
    }

    this.y += value;
    return this;
  },


  subtractY: function(value) {
    if(typeof(value) !== "number") {
      throw new IGEInvalidTypeException("subtractY: value must be a number, got " + typeof(value) + ".", this);
    }

    this.y -= value;
    return this;
  },

  multiplyY: function(value) {
    if(typeof(value) !== "number") {
      throw new IGEInvalidTypeException("multiplyY: value must be a number, got " + typeof(value) + ".", this);
    }

    this.y *= value;
    return this;
  },

  divideY: function(value) {
    if(typeof(value) !== "number") {
      throw new IGEInvalidTypeException("divideY: value must be a number, got " + typeof(value) + ".", this);
    }

    this.y /= value;
    return this;
  },

  add: function(vector) {
    if(typeof(value) !== "object" || !vector.IGEVector) {
      throw new IGEInvalidTypeException("add: value must be an IGEVector object.", + this);
    }

    this.addX(vector.getX());
    this.addY(vector.getY());

    return this;
  },

  subtract: function(vector) {
    if(typeof(value) !== "object" || !vector.IGEVector) {
      throw new IGEInvalidTypeException("subtract: value must be an IGEVector object.", + this);
    }

    this.subtractX(vector.getX());
    this.subtractY(vector.getY());

    return this;
  },

  multiply: function(vector) {
    if(typeof(value) !== "object" || !vector.IGEVector) {
      throw new IGEInvalidTypeException("multiply: value must be an IGEVector object.", + this);
    }

    this.multiplyX(vector.getX());
    this.multiplyY(vector.getY());

    return this;
  },

  divide: function(vector) {
    if(typeof(value) !== "object" || !vector.IGEVector) {
      throw new IGEInvalidTypeException("divide: value must be an IGEVector object.", + this);
    }

    this.divideX(vector.getX());
    this.divideY(vector.getY());

    return this;
  },

  unitVector: function() {
    var _this = this,
        magnitude = _this.magnitude();

    if(!_this.unit) {
      _this.unit = new IGEVector(0, 0);
    }

    _this.unit.setX(_this.getX() / magnitude);
    _this.unit.setY(_this.getY() / magnitude);

    return _this.unit;
  },

  magnitude: function() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  },

  directionRad: function() {
    return Math.atan(this.y / this.x);
  },

  directionDeg: function() {
    return this.directionRad() * (180 / Math.PI);
  }
});

using("IGE.Util");
