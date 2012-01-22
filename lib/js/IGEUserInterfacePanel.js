
using("IGE");
using("IGE.UI");
using("IGE.Graphics");

//IGEUserInterfaccePanel class definition
define("IGE.UI.IGEUserInterfacePanel").extend("IGEUserInterfaceObject").assign({
  defaults: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    strata: IGEStrata.moderate,
    id: "IGEUserInterfacePanel",
    panel: "DEFAULT"
  },

  userInterfaceObjects: null,

  IGEUserInterfacePanel: function(options) {
    var _this = this;

    _this.IGEUserInterfaceObject(options);

    _this.userInterfaceObjects = {};

    _this.displayElement.addClass("IGEUserInterfacePanel");

    return _this;
  },

  _IGEUserInterfacePanel: function() {
    this._IGEUserInterfaceObject();
  },

  addObject: function(uiObject) {
    var _this = this;

    if(typeof(uiObject) !== "object" || !uiObject.IGEUserInterfaceObject) return null;

    if(_this.userInterfaceObjects[uiObject.id]) {
      if(!_this.removeObject(uiObject.id)) {
        return null;
      }
    }

    _this.displayElement.append(uiObject.displayElement);
    _this.addObserver(uiObject);
    _this.userInterfaceObjects[uiObject.id] = uiObject;

    return _this;
  },

  removeObject: function(uiObject) {
    var _this = this,
        objectID;

    if(typeof(uiObject) === "string") {
      objectID = uiObject;
    } else if(typeof(uiObject) === "object" && uiObject.IGEUserInterfaceObject) {
      objectID = uiObject.id;
    } else return null;

    if(_this.userInterfaceObjects[objectID]) {
      _this.getDisplayElement().remove(_this.userInterfaceObjects[objectID].getDisplayElement());
      delete _this.userInterfaceObjects[objectID];
    }

    return _this;
  },

  getObject: function(uiObject) {
    if(typeof(uiObject) === "string") {
      return this.userInterfaceObjects[uiObject];
    } else if(typeof(uiObject) === "object" && uiObject.IGEUserInterfaceObject) {
      return uiObject;
    } else {
      return null;
    }
  }
});

unusing("IGE");
unusing("IGE.UI");
unusing("IGE.Graphics");
