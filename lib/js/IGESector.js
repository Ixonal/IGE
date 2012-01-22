
using("IGE");
using("IGE.Graphics");

//IGESector class definition
define("IGE.IGESector").extend("IGEArea").assign({
  defaults: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    strata: IGEStrata.background1,
    id: "IGESector"
  },

  containedObjects: null,

  //IGESector constructor
  IGESector: function(options) {
    this.IGEArea(options);

    this.containedObjects = {};

    if(typeof(options.enter) === "function") {
      this.objectEnter = options.enter;
    }

    if(typeof(options.leave) === "function") {
      this.objectLeave = options.leave;
    }

    return this;
  },

  //IGESector destructor
  _IGESector: function() {
    this._IGEArea();

    delete this.containedObjects;
  },

  include: function(area) {
    if(typeof(area) !== "object" || !area.IGEArea) {
      throw new IGEInvalidTypeException("include takes IGEArea objects.", this);
    }

    if(!this.containedObjects[area.id]) {
      this.containedObjects[area.id] = area;
      this.objectEnter(area);
    }
  },

  exclude: function(area) {
    if(typeof(area) !== "object" || !area.IGEArea) {
      throw new IGEInvalidTypeException("exclude takes IGEArea objects.", this);
    }

    if(this.containedObjects[area.id]) {
      delete this.containedObjects[area.id];
      this.objectLeave(area);
    }
  },

  objectEnter: function(area) {},

  objectLeave: function(area) {},

  activate: function(area) {
    if(typeof(area) !== "object" || !area.IGEArea) {
      throw new IGEInvalidTypeException("activate takes IGEArea objects.", this);
    }

    if(!this.containedObjects[area.id]) {
      this.include(area);
    }
  },

  update: function() {
    var index;

    for(index in this.containedObjects) {
      if(!this.intersects(this.containedObjects[index])) {
        this.exclude(this.containedObjects[index]);
      }
    }
  }
});

unusing("IGE");
unusing("IGE.Graphics");
