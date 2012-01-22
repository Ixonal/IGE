
using("IGE.Util");

define("IGE.Util.IGEPoint").assign({
  x: null,
  y: null,

  IGEPoint: function(x, y) {
    if(typeof(x) !== "number" || typeof(y) !== "number") {
      throw new IGEInvalidTypeException("IGEPoint: x and y must be numberic types.", this);
    }

    this.x = x;
    this.y = y;
  },

  _IGEPoint: function() {

  },

  getX: function() {
    return this.x;
  },

  getY: function() {
    return this.y;
  },

  setX: function(x) {
    if(typeof(x) !== "number") {
      throw new IGEInvalidTypeException("x must be a number, got " + typeof(x) + ".", this);
    }

    this.x = x;
    return this;
  },

  setY: function(y) {
    if(typeof(y) !== "number") {
      throw new IGEInvalidTypeException("y must be a number, got " + typeof(y) + ".", this);
    }

    this.y = y;
    return this;
  },

  distance: function(point) {
    if(typeof(point) !== "object" || !point.IGEPoint) {
      throw new IGEInvalidTypeException("distance takes an IGEPoint object.", this);
    }

    return Math.sqrt(Math.pow(point.getX() - this.x, 2) + Math.pow(point.getY() - this.y, 2));
  }
});

using("IGE.Util");
