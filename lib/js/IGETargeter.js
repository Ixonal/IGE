
using("IGE");

define("IGE.IGETargeter", "abstract").assign({
  target: null,
  targetX: null,
  targetY: null,

  setTarget: function(target, targetY) {
    var _this = this;

    if(typeof(target) === "object" && target.IGEArea) {
      _this.target = target;
      _this.targetX = target.getCenter().x;
      _this.targetY = target.getCenter().y;
    } else if(typeof(target) === "number" && typeof(targetY) === "number") {
      _this.target = null;
      _this.targetX = target;
      _this.targetY = targetY;
    } else {
      throw IGEError("Invalid target set.");
    }

    return _this;
  },

  getTarget: function() {
    if(this.target) return this.target;

    return {targetX: this.targetX, targetY: this.targetY};
  },

  moveToTarget: abstractFunction()
});

unusing("IGE");
