
//IGEAnimation class definition
define("IGE.Graphics.IGEAnimation").assign({
  defaults: {
    interval: 1000,
    repeat: -1
  },

  id: null,
  images: null,
  cursor: null,
  interval: null,
  maximumRepeat: null,
  currentRepeat: null,
  timer: null,
  handler: null,

  //constructor
  IGEAnimation: function(options) {
    var _this = this,
        index;

    if(typeof(options) !== "object") options = {};

    if(typeof(options.id) === "string") {
      _this.id = options.id;
    } else {
      _this.id = "IGEAnimation" + IGE.Graphics.IGEAnimation.index;
    }
    IGE.Graphics.IGEAnimation.index++;

    if(typeof(options.repeat) === "number") {
      _this.maximumRepeat = options.repeat;
    } else {
      _this.maximumRepeat = _this.defaults.repeat;
    }
    _this.currentRepeat = 0;

    _this.images = [];

    if(typeof(options.images) === "object") {
      if(options.images.IGEImage) {           //single IGEImage object
        _this.addImage(options.images);
      } else {                                //array of IGEImage objects
        for(index in options.images) {
          _this.addImage(options.images[index]);
        }
      }
    }

    _this.interval = (typeof(options.interval)==="number"?options.interval:_this.defaults.interval);

    _this.cursor = 0;
    
    return this;
  },

  //destructor
  _IGEAnimation: function() {
    
  },

  addImage: function(image) {
    if(!image.IGEImage) return null;

    var _this = this;

    _this.images.splice(_this.images.length, 0, image);

    return _this;
  },

  //removes the first instance of an image from the animation
  removeImage: function(image) {
    var _this = this,
        imageID,
        index;

    if(typeof(image) === "string") {
      imageID = image;
    } else if(typeof(image) === "object" && image.IGEImage) {
      imageID = image.id;
    } else {
      return null;
    }

    for(index in _this.images) {
      if(_this.images[index].id === imageID) {
        _this.images.splice(index, 1);
        break;
      }
    }

    return _this;
  },

  start: function() {
    var _this = this,
        index;

    if(!_this.handler) return;


    for(index in _this.images) {
      _this.images[index].hide();
    }

    _this.currentRepeat = 0;

    _this.showNextImage();

    _this.timer = setInterval(function() {
      _this.showNextImage();
    }, _this.interval);
  },

  stop: function() {
    clearInterval(this.timer);
  },

  showNextImage: function() {
    var _this = this,
        lastImage;

    lastImage = _this.images[_this.cursor];

    _this.cursor++;
    if(_this.cursor == _this.images.length) {
      _this.cursor = 0;
      _this.currentRepeat++;
    }

    if(_this.maximumRepeat > 0 && _this.currentRepeat > _this.maximumRepeat) {
      _this.stop();
    }

    _this.images[_this.cursor].show();
    lastImage.hide();
  },

  getCurrentImage: function() {
    return this.images[this.cursor];
  }
});

IGE.Graphics.IGEAnimation.index = 0;
