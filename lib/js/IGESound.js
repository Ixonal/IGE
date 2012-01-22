//IGESound class requires Sound Manager 2 to play sounds

using("IGE");
using("IGE.Audio");

//IGESound class definition
define("IGE.Audio.IGESound").assign({
  id: null,
  source: null,
  handler: null,
  soundManagerReady: false,
  soundObject: null,

  //constructor
  IGESound: function(options) {
    var _this = this;
    
    if(!typeof(options) === "object") {
      throw new IGEInvalidTypeException("IGESound constructor expected Object", _this);
    }

    _this.id = options.id;
    _this.source = options.source;

    if(typeof(_this.id) !== "string") {
      _this._IGESound();
      throw new IGEInvalidIdException("IGESound constructor requires a valid String id to be set.", _this);
    }

    if(typeof(_this.source) !== "string") {
      _this._IGESound();
      throw new IGEInvalidSourceException("IGESound constructor requires a valid String source to be set.", _this);
    }

    if(options.handler && options.handler.IGESoundHandler) {
      options.handler.addSound(_this);
    }

    soundManager.onready(function() {
      _this.soundManagerReady = true;
      _this.preload();
    });

    return _this;
  },

  //destructor
  _IGESound: function() {

    if(this.soundObject) {
      this.soundObject.destruct();
    }

    delete this.id;
    delete this.source;
    delete this.handler;
    delete this.soundObject;
  },

  //plays this sound, as long as it is attached to a sound handler
  //and the player is ready
  play: function() {
    if(this.soundManagerReady &&
       this.handler) {
      this.soundObject.play();
    }
  },

  //mute this sound
  mute: function() {
    this.soundObject.mute();
  },

  //unmute this sound
  unmute: function() {
    this.soundObject.unmute();
  },

  //stop this sound
  stop: function() {
    this.soundObject.stop();
  },

  //pause this sound
  pause: function() {
    this.soundObject.pause();
  },

  //unpause this sound
  unpause: function() {
    this.soundObject.resume();
  },

  //loads up the sound to be played later
  preload: function() {
    if(this.soundManagerReady) {
      this.soundObject = soundManager.createSound({
        id: this.id,
        url: this.source,
        autoLoad: true
      });
    }
  }
});

unusing("IGE");
unusing("IGE.Audio");
