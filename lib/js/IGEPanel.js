
using("IGE");
using("IGE.Graphics");

//IGEPanel class definition
define("IGE.IGEPanel").extend("IGEArea").assign({
  defaults: {
    x: 0,
    y: 0,
    width: 800,
    height: 600,
    strata: IGEStrata.moderate,
    id: "IGEPanel",
    container: "body",
    framesPerSecond: 30
  },

  updateTimer: null,           //timer object used to call updates at a specified interval
  gameObjects: null,           //array containing all game objects for this panel
  gameObjectElement: null,     //the element where game objects are put
  userInterfaceObjects: null,  //array containing all user interface objects for this panel
  userInterfaceElement: null,  //the element where user interface objects are put
  paused: false,               //whether or not the game is paused
  gameOver: false,             //whether or not the game has ended
  framesPerSecond: null,       //desired frames per second for this panel
  updateInterval: null,        //the interval used to update the game state
  keybindHandler: null,        //the keybind handler
  console: null,               //the console associated with this panel
  level: null,                 //the level currently loaded into this panel
  focusObject: null,           //object that the panel will follow
  
  //IGEPanel constructor
  IGEPanel: function(options) {
    var _this = this;

    if(typeof(options) !== "object") options = {};
    _this.defaults.container = $(_this.defaults.container);
    options.panel = _this;


    _this.IGEArea(options);

    _this.gameObjects = [];
    _this.userInterfaceObjects = [];

    with(namespace("IGE")) {
      if(typeof(options.console) === "object") {
        if(options.console.IGEConsole) {
          _this.console = options.console;
        } else {
          options.console.panel = _this;
          _this.console = new IGEConsole(options.console);
        }
      }
      _this.debug("IGEPanel: console has been created.");
    }

    
    _this.framesPerSecond = options.framesPerSecond;
    _this.updateInterval = (1 / _this.framesPerSecond) * 1000;
    _this.debug("IGEPanel: update interval has been set to " + _this.updateInterval + ".");

    _this.gameObjectElement = $(document.createElement("div"));
    _this.gameObjectElement.css("overflow", "hidden");
    _this.gameObjectElement.css("z-index", "1");
    _this.gameObjectElement.addClass("GameObjectElement");
    _this.userInterfaceElement = $(document.createElement("div"));
    _this.userInterfaceElement.css("overflow", "hidden");
    _this.userInterfaceElement.css("z-index", "2");
    _this.userInterfaceElement.addClass("UserInterfaceElement");
    _this.displayElement.append(_this.gameObjectElement);
    _this.displayElement.append(_this.userInterfaceElement);

    _this.getDisplayElement().addClass("IGEPanel");

    
    options.container.append(_this.displayElement);

    //using("IGE.Control");
    with(IGE.Control) {
    _this.keybindHandler = new IGEKeybindHandler({panel: _this});
    _this.debug("IGEPanel: keybind handler has been created.");
    }
    //unusing("IGE.Control");

    _this.focusObject = (typeof(options.focus)==="object"&&options.focus.IGEArea?options.focus:null);
    _this.debug("IGEPanel: focus object has been identified.");


    if(!IGE_PANELS["DEFAULT"]) IGE_PANELS["DEFAULT"] = _this;
    IGE_PANELS[_this.id] = _this;

    _this.debug("IGEPanel construction finished.")

    return _this;
  },

  //IGEPanel destructor
  _IGEPanel: function() {
    this._IGEObject();
  },


  setFocusObject: function(to) {
    if(typeof(to) !== "object" || !to.IGEArea) return null;
    this.focusObject = to;
    return this;
  },

  //updates the game state
  update: function(obj, state) {
    if(!this.paused) {
      this.notify();

      if(this.focusObject) {
        this.updateView();
      }
    }
  },

  //updates where the view on the current level is
  //only functions if there is a focus object
  updateView: function() {
    var _this = this,
        panelPosition,
        levelPosition,
        focusCenter,
        adjustedX,
        adjustedY;

    if(!_this.focusObject) return null;

    panelPosition = _this.getPos();
    levelPosition = _this.level.getPos();
    focusCenter = _this.focusObject.getCenter();
    adjustedY = (panelPosition.height / 2) - focusCenter.getY();
    adjustedX = (panelPosition.width / 2) - focusCenter.getX();
    if(adjustedY > 0) adjustedY = 0;
    if(adjustedX > 0) adjustedX = 0;
    if(adjustedX + levelPosition.width < panelPosition.width) {
      adjustedX = panelPosition.width - levelPosition.width;
    }
    if(adjustedY + levelPosition.height < panelPosition.height) {
      adjustedY = panelPosition.height - levelPosition.height;
    }

    _this.level.setPos(adjustedX, adjustedY);

    return this;
  },

  add: function(resource) {
    if(resource.IGEObject || resource.IGESector) return this.addGameResource(resource);
    else if(resource.IGEUserInterfaceObject) return this.addUserInterfaceResource(resource);
    else return null;
  },

  addGameResource: function(resource) {
    if(!resource.IGEObject && !resource.IGESector) return null;
    this.addObserver(resource);
    this.gameObjects.push(resource);

    this.gameObjectElement.append(resource.displayElement);
    
    return this;
  },

  addUserInterfaceResource: function(resource) {
    if(!resource.IGEUserInterfaceObject) return null;
    this.addObserver(resource);
    this.userInterfaceObjects.push(resource);

    this.userInterfaceElement.append(resource.displayElement);

    return this;
  },

  //to be more compatible with levels
  getChildren: function() {
    return this.gameObjects;
  },

  //returns all game objects added directly to this panel
  getGameObjects: function() {
    return this.gameObjects;
  },

  //returns all user interface objects added to this panel
  getUserInterfaceObjects: function() {
    return this.userInterfaceObjects;
  },

  getConsole: function() {
    return this.console;
  },

  start: function() {
    var _this = this;

    _this.updateTimer = setInterval(function() {
      _this.update();
    }, _this.updateInterval);
  },

  pause: function() {
    this.paused = true;
  },

  unpause: function() {
    this.paused = false;
  },

  pauseToggle: function() {
    this.paused = !this.paused;
  },

  //loads an IGELevel object into the panel
  loadLevel: function(level) {
    var _this = this;

    if(!level.IGELevel) {
      throw new IGEInvalidTypeException("loadLevel takes an IGELevel object.", _this);
    }

    //only one level can be loaded at a time
    if(_this.level) {
      try {
        _this.unloadLevel();
      } catch(e) {
        _this.displayError("Caught an error when unloading old level.");
        throw e;
      }
    }

    level.preLoad();

    _this.gameObjectElement.append(level.getDisplayElement());
    _this.addObserver(level);
    _this.level = level;
    _this.level.pack();

    level.postLoad();

    return _this;
  },

  unloadLevel: function() {
    var _this = this;

    if(!_this.level) {
      throw new IGERemovalException("There is no level to unload.", _this);
    }

    _this.removeObserver(_this.level);
    _this.getDisplayElement().remove(_this.level.getDisplayElement());
    _this.level = null;

    return _this;
  },

  getKeybindHandler: function() {
    return this.keybindHandler;
  },

  displayError: function(message) {
    if(this.console) {
      this.console.error(message);
    }
  },

  displayWarning: function(message) {
    if(this.console) {
      this.console.warning(message);
    }
  },

  displayInfo: function(message) {
    if(this.console) {
      this.console.info(message);
    }
  }
});

var IGE_PANELS = {};

function getIGEPanel(id) {
  return IGE_PANELS[id];
}

unusing("IGE");
unusing("IGE.Graphics");