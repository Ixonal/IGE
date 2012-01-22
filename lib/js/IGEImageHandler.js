
using("General.Notification");
using("IGE");
using("IGE.Graphics");

//IGEImageHandler class definition
define("IGE.Graphics.IGEImageHandler").extend("Observer").assign({
  images: null,
  animations: null,
  area: null,

  //IGEImageHandler constructor
  IGEImageHandler: function(options) {
    var _this = this;

    if(typeof(options) !== "object") options = {};

    _this.area = options.area

    _this.images = {};
    _this.animations = {};

    return _this;
  },

  //IGEImageHandler destructor
  _IGEImageHandler: function() {
    delete this.images;
  },

  getArea: function() {
    return this.area;
  },

  setBackgroundColor: function(background) {
    this.area.getDisplayElement().css("background-color", background);
  },

  setBackgroundImage: function(background) {
    this.area.getDisplayElement().css("background-image", "url('" + background + "')");
  },

  addImage: function(image) {
    var _this = this;

    if(typeof(image) !== "object" || !image.IGEImage) {
      throw  new IGEInvalidTypeException("addImage takes only IGEImage objects.", _this);
    }

    if(_this.images[image.id]) {
      try {
        _this.removeImage(image.id);
      } catch(e) {
        _this.area.displayError("Caught an error while removing pre-existing image.");
        throw e;
      }
    }

    _this.images[image.id] = image;
    _this.area.getDisplayElement().append(image.getDisplayElement());
    image.handler = _this;

    return _this;
  },

  removeImage: function(image) {
    var _this = this,
        imageID;

    if(typeof(image) === "string") {
      imageID = image;
    } else if(typeof(image) === "object" && image.IGEImage) {
      imageID = image.id;
    } else {
      throw new IGERemovalException("Unable to determine the id of image to remove.", _this);
    }

    if(_this.images[imageID]) {
      _this.images[imageID].handler = null;
      _this.area.getDisplayElement().remove(_this.images[imageID].getDisplayElement());
      delete _this.images[imageID];
    }

    return _this;
  },

  getImage: function(image) {
    if(typeof(image) === "string") {
      return this.images[image];
    } else if(typeof(image) === "object" && image.IGEImage) {
      return image;
    } else return undefined;
  },

  addAnimation: function(animation) {
    var _this = this;

    if(typeof(animation) !== "object" || !animation.IGEAnimation) {
      throw new IGEInvalidTypeException("addAnimation takes an IGEAnimation object.", _this);
    }

    if(_this.animations[animation.id]) {
      try {
        _this.removeAnimation(animation.id);
      } catch(e) {
        _this.area.displayError("Caught an error while removing pre-existing animation.");
        throw e;
      }
    }

    _this.animations[animation.id] = animation;
    animation.handler = _this;

    return _this;
  },

  getAnimation: function(animation) {
    if(typeof(animation) === "string") {
      return this.animations[animation];
    } else if(typeof(image) === "object" && animation.IGEAnimation) {
      return animation;
    } else return undefined;
  },

  removeAnimation: function(animation) {
    var _this = this,
        animationID;

    if(typeof(animation) === "string") {
      animationID = animation;
    } else if(typeof(image) === "object" && animation.IGEAnimation) {
      animationID = animation.id;
    } else {
      throw new IGERemovalException("Unable to determine the id of animatione to remove.", _this);
    }

    if(_this.animations[animationID]) {
      _this.animations[animationID].handler = null;
      delete _this.animations[animationID];
    }

    return _this;
  }
});

unusing("IGE");
unusing("IGE.Graphics");
unusing("General.Notification");

