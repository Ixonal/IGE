
using("IGE.Control");
using("IGE.Exceptions");

define("IGE.Control.IGEKeybindHandler").assign({
  defaults: {
    target: document
  },

  keybinds: null,
  panel: null,

  //constructor
  IGEKeybindHandler: function(options) {
    var _this = this,
        target;

    if(typeof(options) !== "object") options = {};

    if(typeof(options.panel) !== "object" || !options.panel.IGEPanel) {
      throw new IGEInvalidTypeException("No panel entered for IGEKeybindHandler", _this);
    }

    _this.keybinds = [];

    target = (options.target ? options.target : _this.defaults.target)

    _this.panel = options.panel;

    //setting up the keybinding function
    $(target).keydown(function(event) {
      var currentBind = _this.keybinds[event.which];

      if(currentBind &&                     //make sure there is a bind for that key
         currentBind.IGEKeybind) {          //make sure this is a proper keybind
        currentBind.keydown();
      }
    });

    $(target).keyup(function(event) {
      var currentBind = _this.keybinds[event.which];

      if(currentBind &&                     //make sure there is a bind for that key
         currentBind.IGEKeybind) {          //make sure this is a proper keybind
        currentBind.keyup();
      }
    });

    return _this;
  },

  //destructor
  _IGEKeybindHandler: function() {
    delete this.keybinds;
  },

  //add a keybind
  bind: function(keybind) {
    if(!keybind.IGEKeybind) {
      throw new IGEInvalidTypeException("bind takes an IGEKeybind object.", this);
    }

    this.keybinds[keybind.keycode] = keybind;
    keybind.handler = this;

    return this;
  },

  //remove a keybind
  unbind: function(keybind) {
    if(!keybind.IGEKeybind) {
      throw new IGEInvalidTypeException("unbind takes an IGEKeybind object.", this);
    }

    this.keybinds[keybind.keycode] = null;
    keybind.handler = null;

    return this;
  },

  //rebind a keybind to a new key
  rebind: function(keybind, keycode) {
    if(!keybind.IGEKeybind) {
      throw new IGEInvalidTypeException("rebind takes an IGEKeybind object and a numeric keycode", this);
    }
    if(typeof(keycode) !== "number") {
      throw new IGEInvalidTypeException("rebind takes an IGEKeybind object and a numeric keycode", this);
    }

    try {
      this.unbind(keybind);
      keybind.keycode = keycode;
      this.bind(keybind);
    } catch(e) {
      this.panel.displayError("An error occurred while rebinding a key.");
      throw e;
    }

    return this;
  },

  getKeyToKeycode: function(key) {
    return IGE.Control.IGEKeybindHandler.getKeyToKeycode(key);
  },

  getKeycodeToKey: function(keycode) {
    return IGE.Control.IGEKeybindHandler.getKeycodeToKey(keycode);
  }

});


IGE.Control.IGEKeybindHandler.getKeyToKeycode = function(key) {
  if(typeof(key) !== "string") return undefined;

  return IGE.Control.IGEKeybindHandler.keyToKeycode[key];
}

IGE.Control.IGEKeybindHandler.getKeycodeToKey = function(keycode) {
  if(typeof(keycode) !== "number") return undefined;

  return IGE.Control.IGEKeybindHandler.keycodeToKey[keycode];
}


IGE.Control.IGEKeybindHandler.keyToKeycode = {
  "backspace": 8,
  "tab": 9,
  "enter": 13,
  "shift": 16,
  "ctrl": 17,
  "alt": 18,
  "pause/break": 19,
  "caps lock": 20,
  "escape": 27,
  "space": 32,
  "page up": 33,
  "page down": 34,
  "end": 35,
  "home": 36,
  "left arrow": 37,
  "up arrow": 38,
  "right arrow": 39,
  "down arrow": 40,
  "insert": 45,
  "delete": 46,
  "0": 48,
  "1": 49,
  "2": 50,
  "3": 51,
  "4": 52,
  "5": 53,
  "6": 54,
  "7": 55,
  "8": 56,
  "9": 57,
  "a": 65,
  "b": 66,
  "c": 67,
  "d": 68,
  "e": 69,
  "f": 70,
  "g": 71,
  "h": 72,
  "i": 73,
  "j": 74,
  "k": 75,
  "l": 76,
  "m": 77,
  "n": 78,
  "o": 79,
  "p": 80,
  "q": 81,
  "r": 82,
  "s": 83,
  "t": 84,
  "u": 85,
  "v": 86,
  "w": 87,
  "x": 88,
  "y": 89,
  "z": 90,
  "left window": 91,
  "right window": 92,
  "select": 93,
  "numpad 0": 96,
  "numpad 1": 97,
  "numpad 2": 98,
  "numpad 3": 99,
  "numpad 4": 100,
  "numpad 5": 101,
  "numpad 6": 102,
  "numpad 7": 103,
  "numpad 8": 104,
  "numpad 9": 105,
  "multiply": 106,
  "add": 107,
  "subtract": 109,
  "decimal point": 110,
  "divide": 111,
  "f1": 112,
  "f2": 113,
  "f3": 114,
  "f4": 115,
  "f5": 116,
  "f6": 117,
  "f7": 118,
  "f8": 119,
  "f9": 120,
  "f10": 121,
  "f11": 122,
  "f12": 123,
  "num lock": 144,
  "scroll lock": 145,
  "semi-colon": 186,
  "equal sign": 187,
  "comma": 188,
  "dash": 189,
  "period": 190,
  "forward slash": 191,
  "grave accent": 192,
  "open bracket": 219,
  "back slash": 220,
  "close braket": 221,
  "single quote": 222
},

IGE.Control.IGEKeybindHandler.keycodeToKey = [
                     //keycode:
  undefined,         //1
  undefined,         //2
  undefined,         //3
  undefined,         //4
  undefined,         //5
  undefined,         //6
  undefined,         //7
  "backspace",       //8
  "tab",             //9
  undefined,         //10
  undefined,         //11
  undefined,         //12
  "enter",           //13
  undefined,         //14
  undefined,         //15
  "shift",           //16
  "control",         //17
  "alt",             //18
  "pause/break",     //19
  "caps-lock",       //20
  undefined,         //21
  undefined,         //22
  undefined,         //23
  undefined,         //24
  undefined,         //25
  undefined,         //26
  "escape",          //27
  undefined,         //28
  undefined,         //29
  undefined,         //30
  undefined,         //31
  "space",           //32
  "page-up",         //33
  "page-down",       //34
  "end",             //35
  "home",            //36
  "left arrow",      //37
  "up arrow",        //38
  "right arrow",     //39
  "down arrow",      //40
  undefined,         //41
  undefined,         //42
  undefined,         //43
  undefined,         //44
  "insert",          //45
  "delete",          //46
  undefined,         //47
  "0",               //48
  "1",               //49
  "2",               //50
  "3",               //51
  "4",               //52
  "5",               //53
  "6",               //54
  "7",               //55
  "8",               //56
  "9",               //57
  undefined,         //58
  undefined,         //59
  undefined,         //60
  undefined,         //61
  undefined,         //62
  undefined,         //63
  undefined,         //64
  "a",               //65
  "b",               //66
  "c",               //67
  "d",               //68
  "e",               //69
  "f",               //70
  "g",               //71
  "h",               //72
  "i",               //73
  "j",               //74
  "k",               //75
  "l",               //76
  "m",               //77
  "n",               //78
  "o",               //79
  "p",               //80
  "q",               //81
  "r",               //82
  "s",               //83
  "t",               //84
  "u",               //85
  "v",               //86
  "w",               //87
  "x",               //88
  "y",               //89
  "z",               //90
  "left window",     //91
  "right window",    //92
  "select",          //93
  undefined,         //94
  undefined,         //95
  "numpad 0",        //96
  "numpad 1",        //97
  "numpad 2",        //98
  "numpad 3",        //99
  "numpad 4",        //100
  "numpad 5",        //101
  "numpad 6",        //102
  "numpad 7",        //103
  "numpad 8",        //104
  "numpad 9",        //105
  "multiply",        //106
  "add",             //107
  undefined,         //108
  "subtract",        //109
  "decimal point",   //110
  "divide",          //111
  "f1",              //112
  "f2",              //113
  "f3",              //114
  "f4",              //115
  "f5",              //116
  "f6",              //117
  "f7",              //118
  "f8",              //119
  "f9",              //120
  "f10",             //121
  "f11",             //122
  "f12",             //123
  undefined,         //124
  undefined,         //125
  undefined,         //126
  undefined,         //127
  undefined,         //128
  undefined,         //129
  undefined,         //130
  undefined,         //131
  undefined,         //132
  undefined,         //133
  undefined,         //134
  undefined,         //135
  undefined,         //136
  undefined,         //137
  undefined,         //138
  undefined,         //139
  undefined,         //140
  undefined,         //141
  undefined,         //142
  undefined,         //143
  "num lock",        //144
  "scroll lock",     //145
  undefined,         //146
  undefined,         //147
  undefined,         //148
  undefined,         //149
  undefined,         //150
  undefined,         //151
  undefined,         //152
  undefined,         //153
  undefined,         //154
  undefined,         //155
  undefined,         //156
  undefined,         //157
  undefined,         //158
  undefined,         //159
  undefined,         //160
  undefined,         //161
  undefined,         //162
  undefined,         //163
  undefined,         //164
  undefined,         //165
  undefined,         //166
  undefined,         //167
  undefined,         //168
  undefined,         //169
  undefined,         //170
  undefined,         //171
  undefined,         //172
  undefined,         //173
  undefined,         //174
  undefined,         //175
  undefined,         //176
  undefined,         //177
  undefined,         //178
  undefined,         //179
  undefined,         //180
  undefined,         //181
  undefined,         //182
  undefined,         //183
  undefined,         //184
  undefined,         //185
  "semi-colon",      //186
  "equal",           //187
  "comma",           //188
  "dash",            //189
  "period",          //190
  "forward slash",   //191
  "grave accent",    //192
  undefined,         //193
  undefined,         //194
  undefined,         //195
  undefined,         //196
  undefined,         //197
  undefined,         //198
  undefined,         //199
  undefined,         //200
  undefined,         //201
  undefined,         //202
  undefined,         //203
  undefined,         //204
  undefined,         //205
  undefined,         //206
  undefined,         //207
  undefined,         //208
  undefined,         //209
  undefined,         //210
  undefined,         //211
  undefined,         //212
  undefined,         //213
  undefined,         //214
  undefined,         //215
  undefined,         //216
  undefined,         //217
  undefined,         //218
  "open bracket",    //219
  "backslash",       //220
  "close bracket",   //221
  "single quote"     //222
]

unusing("IGE.Control");
unusing("IGE.Exceptions");
