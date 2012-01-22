
using("IGE");
using("IGE.Graphics");

define("IGELevel").extend("IGEArea").assign({
  defaults: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    strata: IGEStrata.moderate,
    panel: "DEFAULT",
    id: "IGELevel"
  },

  children: null,

  //constructor
  IGELevel: function(options) {
    var _this = this,
        index;

    _this.IGEArea(options);

    _this.children = {};

    _this.getDisplayElement().addClass("IGELevel");

    if(typeof(options.areas) === "object") {
      if($.isArray(options.areas)) {
        for(index in options.areas) {
          _this.add(options.areas[index]);
        }
      } else {
        _this.add(options.areas);
      }
    }

    return _this;
  },

  //destructor
  _IGELevel: function() {
    this._IGEArea();

    delete this.areas;
  },


  //adds an IGEArea to this level
  add: function(area) {
    var _this = this;

    if(typeof(area) !== "object" || !area.IGEArea) {
      throw new IGE.Exceptions.IGEInvalidTypeException("add takes only IGEArea objects.", _this);
    }

    _this.getDisplayElement().append(area.getDisplayElement());
    _this.children[area.getID()] = area;
    _this.addObserver(area);
    area.setParent(_this);

    return _this;
  },

  getChildren: function() {
    return this.children;
  },

  //adjusts the world's size to fit the objects
  pack: function() {
    var _this = this,
        index,
        panelPosition = this.panel.getPos(),
        childPosition,
        highestX,
        highestY;

    //find the extremes
    for(index in _this.children) {
      childPosition = _this.children[index].getPos();

      //getting initial positions
      if(!highestX) highestX = childPosition.x + childPosition.width;
      if(!highestY) highestY = childPosition.y + childPosition.height;

      if(childPosition.x + childPosition.width > highestX) {
        highestX = childPosition.x + childPosition.width;
      }
      if(childPosition.y + childPosition.height > highestY){
        highestY = childPosition.y + childPosition.height;
      }
    }

    //make sure the level is at least the size of the panel
    if(highestX < panelPosition.width) highestX = panelPosition.width;
    if(highestY < panelPosition.height) highestY = panelPosition.height;

    //stretch the level tto fit the extremes
    _this.setWidth(highestX);
    _this.setHeight(highestY);

    return _this;
  },

  update: function() {
    this.notify();
  },

  preLoad: function() {},

  postLoad: function() {}
});

unusing("IGE");
unusing("IGE.Graphics");
