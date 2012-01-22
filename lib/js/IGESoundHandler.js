
using("IGE");
using("IGE.Audio");
using("General.Notification");

//IGESoundHandler class definition
define("IGE.Audio.IGESoundHandler").extend("Observer").assign({
  sounds: null,
  soundsCopy: null,

  //IGESoundHandler constructor
  IGESoundHandler: function(options) {
    this.sounds = {};
    this.soundsCopy = {};

    return this;
  },

  //IGESoundHandler destructor
  _IGESoundHandler: function() {
    delete this.sounds;
    delete this.soundsCopy;
  },

  //plays a sound with a given ID
  play: function(soundID) {
    this.sounds[soundID].play();
  },

  //adds a sound to the handler
  addSound: function(sound) {
    var _this = this;

    if(typeof(sound) !== "object" ||
       !sound.IGESound) throw new IGESoundException("Attempt to add an invalid sound.");

    if(_this.sounds[sound.id]) {
      _this.removeSound(sound.id);
    }

    _this.sounds[sound.id] = sound;
    sound.handler = _this;

    return _this;
  },

  //removes a sound from the handler
  removeSound: function(sound) {
    var _this = this,
        soundID;

    if(typeof(sound) === "string") {
      soundID = sound;
    } else if(typeof(sound) === "object" && sound.IGESound) {
      soundID = sound.id;
    } else {
      throw new IGESoundException("Unable to determine the id of sound to remove.");
    }

    if(_this.sounds[soundID]) {
      _this.sounds[soundID].handler = null;
      delete _this.sounds[soundID];
    }

    return _this;
  },

  //returns an array containing every sound
  //associated with this handler
  getSounds: function() {
    return $.extend(this.soundsCopy, this.sounds);
  },

  //returns the sound object specified by the given string
  getSound: function(sound) {
    if(typeof(sound) === "string") {
      return this.sounds[sound];
    } else if(typeof(sound) === "object" && sound.IGESound) {
      return sound;
    } else return undefined;
  }
});

unusing("IGE");
unusing("IGE.Audio");
unusing("General.Notification");
