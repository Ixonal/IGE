/*
Copyright (C) 2011 by Benjamin McGregor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/


//set the URL of the sound manager flash files
soundManager.url = "./lib/flash/soundmanager2/";
soundManager.debugMode = false;
soundManager.debugFlash = false;
soundManager.flashVersion = 9;
soundManager.useHTML5Audio = true;


/*
Copyright (C) 2011 by Benjamin McGregor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

//Observable class definition
define("General.Notification.Observable", "abstract").assign({
  observers: null,
  state: null,

  //constructor
  Observable: function() {
    this.observers = [];
    this.state = {
      observable: this
    }
  },

  //destructor
  _Observable: function() {
    delete this.observers;
    delete this.state;
  },

  //add an observer to watch this observable
  addObserver: function(observer) {
    if(!observer.Observer) return null;

    this.observers.splice(0, 0, observer);

    return this;
  },

  removeObserver: function(observer) {
    var _this = this,
        index;

    if(!observer.Observer) return null;

    for(index in _this.observers) {
      if(_this.observers[index] === observer) {
        _this.observers.splice(index, 1);
      }
    }

    return _this;
  },

  //notify observers of changes
  notify: function() {
    var _this = this,
        index;

    for(index in _this.observers) {
      if(_this.observers[index].update !== null) {
        _this.observers[index].update(_this, _this.state);
      }
    }
  }
});
/*
Copyright (C) 2011 by Benjamin McGregor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

//Observer class deffinition
define("General.Notification.Observer", "abstract").assign({

  //a call made to update the observer
  update: function(observable, state) {
    throw Error("Unimplemented update fired.");
  }
});
/*
Copyright (C) 2011 by Benjamin McGregor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

define("IGE.Exceptions.IGEException").assign({
  text: null,
  context: null,

  IGEException: function(text, context) {
    this.text = text;
    this.context = typeof(context)==="object"?context:null;
  },

  toString: function() {
    return "IGEException: " + this.text;
  },

  getContext: function() {
    return this.context;
  }
});
/*
Copyright (C) 2011 by Benjamin McGregor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

using("IGE.Exceptions");

define("IGE.Exceptions.IGEInvalidIdException").extend("IGEException").assign({
  IGEInvalidIdException: function(text, context) {
    this.IGEException(text, context);
  },

  toString: function() {
    return "IGEInvalidIdException: " + this.text;
  }
});

unusing("IGE.Exceptions");
/*
Copyright (C) 2011 by Benjamin McGregor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

using("IGE.Exceptions");

define("IGEInvalidSourceException").extend("IGEException").assign({
  IGEInvalidSourceException: function(text, context) {
    this.IGEException(text, context);
  },

  toString: function() {
    return "IGEInvalidSourceException: " + this.text;
  }
});

unusing("IGE.Exceptions");
/*
Copyright (C) 2011 by Benjamin McGregor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

using("IGE.Exceptions");

define("IGE.Exceptions.IGEInvalidTypeException").extend("IGEException").assign({
  IGEInvalidTypeException: function(text, context) {
    this.IGEException(text, context);
  },

  toString: function() {
    return "IGEInvalidTypeException: " + this.text;
  }
});

unusing("IGE.Exceptions");
/*
Copyright (C) 2011 by Benjamin McGregor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

using("IGE.Exceptions");

define("IGERemovalException").extend("IGEException").assign({
  IGERemovalException: function(text, context) {
    this.IGEException(text, context);
  },

  toString: function() {
    return "IGERemovalException: " + this.text;
  }
});

unusing("IGE.Exceptions");
/*
Copyright (C) 2011 by Benjamin McGregor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

using("IGE.Exceptions");

define("IGE.Exceptions.IGEImageException").extend("IGEException").assign({
  IGEImageException: function(text, context) {
    this.IGEException(text, context);
  },

  toString: function() {
    return "IGEImageException: " + this.text;
  }
});

unusing("IGE.Exceptions");
/*
Copyright (C) 2011 by Benjamin McGregor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

using("IGE.Exceptions");

define("IGE.Exceptions.IGESoundException").extend("IGEException").assign({
  IGESoundException: function(text, context) {
    this.IGEException(text, context);
  },

  toString: function() {
    return "IGESoundException: " + this.text;
  }
});

unusing("IGE.Exceptions");
/*
Copyright (C) 2011 by Benjamin McGregor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

using("IGE.Exceptions");

define("IGE.Exceptions.IGEUnimplementedException").extend("IGEException").assign({
  IGEUnimplementedException: function(text, context) {
    this.IGEException(text, context);
  },

  toString: function() {
    return "IGEUnimplementedException: " + this.text + 
           (typeof(this.context) === "object"?": " + this.context.constructor.name:"");
  }
});

unusing("IGE.Exceptions");
/*
Copyright (C) 2011 by Benjamin McGregor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

using("IGE.Util");

define("IGE.Util.IGEPoint").assign({
  x: null,
  y: null,

  IGEPoint: function(x, y) {
    if(typeof(x) !== "number" || typeof(y) !== "number") {
      throw new IGEInvalidTypeException("IGEPoint: x and y must be numberic types.", this);
    }

    this.x = x;
    this.y = y;
  },

  _IGEPoint: function() {

  },

  getX: function() {
    return this.x;
  },

  getY: function() {
    return this.y;
  },

  setX: function(x) {
    if(typeof(x) !== "number") {
      throw new IGEInvalidTypeException("x must be a number, got " + typeof(x) + ".", this);
    }

    this.x = x;
    return this;
  },

  setY: function(y) {
    if(typeof(y) !== "number") {
      throw new IGEInvalidTypeException("y must be a number, got " + typeof(y) + ".", this);
    }

    this.y = y;
    return this;
  },

  distance: function(point) {
    if(typeof(point) !== "object" || !point.IGEPoint) {
      throw new IGEInvalidTypeException("distance takes an IGEPoint object.", this);
    }

    return Math.sqrt(Math.pow(point.getX() - this.x, 2) + Math.pow(point.getY() - this.y, 2));
  }
});

using("IGE.Util");
/*
Copyright (C) 2011 by Benjamin McGregor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

using("IGE.Util");

define("IGE.Util.IGEVector").assign({
  x: null,
  y: null,
  unit: null,

  IGEVector: function(x, y) {
    if(typeof(x) !== "number" || typeof(y) !== "number") {
      throw new IGEInvalidTypeException("IGEVector: x and y must be numeric types.", this);
    }
    
    this.x = x;
    this.y = y;
  },

  _IGEVector: function() {
    delete this.x;
    delete this.y;
    delete this.unit;
  },

  getX: function() {
    return this.x;
  },

  setX: function(x) {
    if(typeof(x) !== "number") {
      throw new IGEInvalidTypeException("setX: value must be a number, got " + typeof(x) + ".", this);
    }

    this.x = x;
    return this;
  },

  addX: function(value) {
    if(typeof(value) !== "number") {
      throw new IGEInvalidTypeException("addX: value must be a number, got " + typeof(value) + ".", this);
    }

    this.x += value;
    return this;
  },

  subtractX: function(value) {
    if(typeof(value) !== "number") {
      throw new IGEInvalidTypeException("subtractX: value must be a number, got " + typeof(value) + ".", this);
    }

    this.x -= value;
    return this;
  },

  multiplyX: function(value) {
    if(typeof(value) !== "number") {
      throw new IGEInvalidTypeException("multiplyX: value must be a number, got " + typeof(value) + ".", this);
    }

    this.x *= value;
    return this;
  },

  divideX: function(value) {
    if(typeof(value) !== "number") {
      throw new IGEInvalidTypeException("divideX: value must be a number, got " + typeof(value) + ".", this);
    }

    this.x /= value;
    return this;
  },

  getY: function() {
    return this.y
  },

  setY: function(y) {
    if(typeof(y) !== "number") {
      throw new IGEInvalidTypeException("setY: value must be a number, got " + typeof(y) + ".", this);
    }

    this.y = y;
    return this;
  },

  addY: function(value) {
    if(typeof(value) !== "number") {
      throw new IGEInvalidTypeException("addY: value must be a number, got " + typeof(value) + ".", this);
    }

    this.y += value;
    return this;
  },


  subtractY: function(value) {
    if(typeof(value) !== "number") {
      throw new IGEInvalidTypeException("subtractY: value must be a number, got " + typeof(value) + ".", this);
    }

    this.y -= value;
    return this;
  },

  multiplyY: function(value) {
    if(typeof(value) !== "number") {
      throw new IGEInvalidTypeException("multiplyY: value must be a number, got " + typeof(value) + ".", this);
    }

    this.y *= value;
    return this;
  },

  divideY: function(value) {
    if(typeof(value) !== "number") {
      throw new IGEInvalidTypeException("divideY: value must be a number, got " + typeof(value) + ".", this);
    }

    this.y /= value;
    return this;
  },

  add: function(vector) {
    if(typeof(value) !== "object" || !vector.IGEVector) {
      throw new IGEInvalidTypeException("add: value must be an IGEVector object.", + this);
    }

    this.addX(vector.getX());
    this.addY(vector.getY());

    return this;
  },

  subtract: function(vector) {
    if(typeof(value) !== "object" || !vector.IGEVector) {
      throw new IGEInvalidTypeException("subtract: value must be an IGEVector object.", + this);
    }

    this.subtractX(vector.getX());
    this.subtractY(vector.getY());

    return this;
  },

  multiply: function(vector) {
    if(typeof(value) !== "object" || !vector.IGEVector) {
      throw new IGEInvalidTypeException("multiply: value must be an IGEVector object.", + this);
    }

    this.multiplyX(vector.getX());
    this.multiplyY(vector.getY());

    return this;
  },

  divide: function(vector) {
    if(typeof(value) !== "object" || !vector.IGEVector) {
      throw new IGEInvalidTypeException("divide: value must be an IGEVector object.", + this);
    }

    this.divideX(vector.getX());
    this.divideY(vector.getY());

    return this;
  },

  unitVector: function() {
    var _this = this,
        magnitude = _this.magnitude();

    if(!_this.unit) {
      _this.unit = new IGEVector(0, 0);
    }

    _this.unit.setX(_this.getX() / magnitude);
    _this.unit.setY(_this.getY() / magnitude);

    return _this.unit;
  },

  magnitude: function() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  },

  directionRad: function() {
    return Math.atan(this.y / this.x);
  },

  directionDeg: function() {
    return this.directionRad() * (180 / Math.PI);
  }
});

using("IGE.Util");
/*
Copyright (C) 2011 by Benjamin McGregor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

using("IGE.Modification");

define("IGE.Modification.IGEModifier", "abstract").assign({
  duration: null,

  activate: abstractFunction(),

  deactivate: abstractFunction()
});


IGE.Modification.IGEModifier.add = 1;
IGE.Modification.IGEModifier.subtract = 2;
IGE.Modification.IGEModifier.multiply = 3;
IGE.Modification.IGEModifier.divide = 4;
IGE.Modification.IGEModifier.replace = 5;

unusing("IGE.Modification");
/*
Copyright (C) 2011 by Benjamin McGregor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

using("IGE.Graphics");

IGE.Graphics.IGEStrata = {
  background1: 5,
  background2: 10,
  far: 15,
  semiFar: 20,
  moderate: 25,
  semiNear: 40,
  near: 50
}
/*
Copyright (C) 2011 by Benjamin McGregor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

with(namespace("General.Notification",
               "IGE.Graphics",
               "IGE.Audio")) {


//IGEArea class definition
define("IGE.IGEArea").extend(Observer, Observable).assign({
  posNum: null,         //numerical representation of the current position of this area
  posCopy: null,        //copy of the curret position of this area
  center: null,     //copy of the center of this area
  id: null,             //unique identifyer of this IGEArea
  imageHandler: null,   //the associated IGEImageHandler
  soundHandler: null,   //the associated IGESoundHandler
  displayElement: null, //the HTML element associated with this area
  panel: null,          //the associated IGEPanel
  parent: null,         //this area's parent object
  preUpdateFunc: null,  //functions to do before updating
  postUpdateFunc: null, //functions to do after updating
  isVerbose: null,      //whether or not this object displays copious amounts of debug data
  friction: null,
  frictionCopy: null,
  modifiers: null,

  defaults: {           //default values for IGEArea
    x:0,
    y:0,
    width: 0,
    height: 0,
    friction: 0,
    strata: IGEStrata.moderate,
    id: "IGEArea",
    panel: "DEFAULT",
    parent: null,
    verbose: false
  },

  //IGEArea constructor
  IGEArea: function(options) {
    if(!options) options = {};
    var _this = this;

    //console.log(IGEImage);

    //might have to find a faster way to factor in defaults
    $.extend(options, $.extend({}, _this.defaults, options));

    _this.isVerbose = options.verbose;

    //call super class constructors
    _this.Observable();
    _this.Observer();

    //locating the associated game panel
    if(typeof(options.panel) === "string") {
      _this.panel = getIGEPanel(options.panel);
    } else if(typeof(options.panel) === "object") {
      if(options.panel.IGEPanel !== null) {
        _this.panel = options.panel;
      } else {
        _this.panel = null;
      }
    } else {
      _this.panel = null;
    }

    //setting this area's id
    _this.id = options.id;
    if(_this.id === _this.defaults.id) _this.id += IGE.IGEArea.IGE_AREA_INDEX;
    IGE.IGEArea.IGE_AREA_INDEX++;
    _this.debug("IGEArea: set id to " + _this.id + ".");

    //initializing the posNum object
    _this.posNum = {
      x: options.x,
      y: options.y,
      width: options.width,
      height: options.height
    }

    //initializing the posCopy object
    _this.posCopy = {
      x: null,
      y: null,
      width: null,
      height: null
    }

    //initializing the center copy
    _this.center = new IGEPoint(_this.posNum.x + (_this.posNum.width / 2),
                                _this.posNum.y + (_this.posNum.height / 2));

    //using divs as the base display element
    _this.displayElement = $(document.createElement("div"));
    _this.displayElement.addClass("IGEArea");
    _this.displayElement.attr("id", _this.id);
    _this.displayElement.css("z-index", options.strata);
    _this.debug("IGEArea: display element for " + _this.id + " has been created.");


    _this.modifiers = [];


    //set up the friction vector
    if(typeof(options.friction) === "number") {
      _this.friction = new IGEVector(options.friction, options.friction);

    } else if(typeof(options.friction) === "object" &&
              typeof(options.friction.horizontal) === "number" &&
              typeof(options.friction.vertical) === "number") {
      _this.friction = new IGEVector(options.friction.horizontal, options.friction.vertical);

    } else if(typeof(options.friction) === "object" &&
              options.friction.IGEVector) {
      _this.friction = options.friction;
    } else {

      _this.friction = new IGEVector(0, 0);
    }
    _this.debug("IGEObject: friction values hae been set.");

    _this.frictionCopy = new IGEVector(0, 0);


    //initializing this area's image and sound handlers
    //using("IGE.Graphics");
    //using("IGE.Audio");
    with(IGE.Graphics) {
      _this.imageHandler = new IGEImageHandler({area: _this});
    }
    with(IGE.Audio) {
      _this.soundHandler = new IGESoundHandler({area: _this});
    }
    _this.debug("IGEArea: image and sound handlers for " + _this.id + " have been created.");
    //unusing("IGE.Graphics");
    //unusing("IGE.Audio");

    //setting up pre and post update function holders
    _this.preUpdateFunc = [];
    _this.postUpdateFunc = [];

    _this.parent = options.parent;


    //registering this area's initial position
    _this.setPos();
    _this.setWidth();
    _this.setHeight();
    
    _this.debug("IGEArea construction finished");

    return this;
  },

  //IGEArea destructor
  _IGEArea: function() {
    this._Observer();
    this._Observable();
  },


  setPos: function(x, y) {
    var _this = this;

    if(typeof(x) === "number") {
      _this.posNum.x = x;
    }

    if(typeof(y) === "number") {
      _this.posNum.y = y;
    }

    _this.getDisplayElement().css("left", _this.posNum.x + "px")
                             .css("bottom", _this.posNum.y + "px");
  },

  setWidth: function(width) {
    if(typeof(width) === "number") {
      this.posNum.width = width;
    }

    this.getDisplayElement().css("width", this.posNum.width + "px");
  },

  setHeight: function(height) {
    if(typeof(height) === "number") {
      this.posNum.height = height;
    }

    this.getDisplayElement().css("height", this.posNum.height + "px");
  },


  getPos: function() {
    var _this = this,
        index,
        modifier;

    with(namespace("IGE.Modification")) {

      _this.posCopy.x = _this.posNum.x;
      _this.posCopy.y = _this.posNum.y;
      _this.posCopy.width = _this.posNum.width;
      _this.posCopy.height = _this.posNum.height;

      for(index in _this.modifiers) {

        //factor in x modifications
        if(_this.modifiers[index].x) {
          modifier = _this.modifiers[index].x;
          switch(modifier.type) {
            case IGEModifier.add:
              _this.posCopy.x += modifier.value;
              break;
            case IGEModifier.subtract:
              _this.posCopy.x -= modifier.value;
              break;
            case IGEModifier.multiply:
              _this.posCopy.x *= modifier.value;
              break;
            case IGEModifier.divide:
              _this.posCopy.x /= modifier.value;
              break;
            case IGEModifier.replace:
              _this.posCopy.x = modifier.value;
              break;
          }
        }

        //factor in y modifications
        if(_this.modifiers[index].y) {
          modifier = _this.modifiers[index].y;
          switch(modifier.type) {
            case IGEModifier.add:
              _this.posCopy.y += modifier.value;
              break;
            case IGEModifier.subtract:
              _this.posCopy.y -= modifier.value;
              break;
            case IGEModifier.multiply:
              _this.posCopy.y *= modifier.value;
              break;
            case IGEModifier.divide:
              _this.posCopy.y /= modifier.value;
              break;
            case IGEModifier.replace:
              _this.posCopy.y = modifier.value;
              break;
          }
        }

        //factor in width modifications
        if(_this.modifiers[index].width) {
          modifier = _this.modifiers[index].width;
          switch(modifier.type) {
            case IGEModifier.add:
              _this.posCopy.width += modifier.value;
              break;
            case IGEModifier.subtract:
              _this.posCopy.width -= modifier.value;
              break;
            case IGEModifier.multiply:
              _this.posCopy.width *= modifier.value;
              break;
            case IGEModifier.divide:
              _this.posCopy.width /= modifier.value;
              break;
            case IGEModifier.replace:
              _this.posCopy.width = modifier.value;
              break;
          }
        }

        //factor in height modifications
        if(_this.modifiers[index].height) {
          modifier = _this.modifiers[index].height;
          switch(modifier.type) {
            case IGEModifier.add:
              _this.posCopy.height += modifier.value;
              break;
            case IGEModifier.subtract:
              _this.posCopy.height -= modifier.value;
              break;
            case IGEModifier.multiply:
              _this.posCopy.height *= modifier.value;
              break;
            case IGEModifier.divide:
              _this.posCopy.height /= modifier.value;
              break;
            case IGEModifier.replace:
              _this.posCopy.height = modifier.value;
              break;
          }
        }
      }

      _this.getDisplayElement().css("width", _this.posCopy.width + "px");
      _this.getDisplayElement().css("height", _this.posCopy.height + "px");

    }

    return _this.posCopy;
  },

  addModifier: function(modifier) {
    var _this = this;

    if(typeof(modifier) !== "object" && modifier.IGEModifier) {
      throw new IGEInvalidTypeException("addModifier takes an IGEModifier object", _this);
    }

    _this.modifiers.splice(_this.modifiers.length, 0, modifier);

    modifier.activate(_this);
  },


  //removes a modifier from this character.
  //takes either a string of the class name
  //(in which case it removes the first modifier that matches),
  //or the particular object to be removed
  removeModifier: function(modifier) {
    var _this = this,
        index;

    if(typeof(modifier) === "string") {
      for(index in _this.modifiers) {
        if(_this.modifiers[index][modifier]) {
          _this.modifiers[index].deactivate(_this);
          _this.modifiers.splice(index, 1);
          return _this;
        }
      }
    } else if(typeof(modifier) === "object" && modifier.IGEModifier) {
      for(index in _this.modifiers) {
        if(_this.modifiers[index] === modifier) {
          _this.modifiers[index].deactivate(_this);
          _this.modifiers.splice(index, 1);
          return _this;
        }
      }
    } else {
      _this.displayError("removeModifier takes an IGEModifier object or string");
      throw new IGEInvalidTypeException("removeModifier takes an IGEModifier object or string", _this);
    }

    return _this;
  },

  //returns the x and y position of the center of this area
  getCenter: function() {
    var _this = this,
        pos = _this.getPos();

    _this.center.setX(pos.x + (pos.width / 2));
    _this.center.setY(pos.y + (pos.height / 2));

    return _this.center;
  },

  getFriction: function() {
    var _this = this,
        index,
        modifier;

    _this.frictionCopy.setX(_this.friction.getX());
    _this.frictionCopy.setY(_this.friction.getY());

    for(index in _this.modifiers) {
      if(_this.modifiers[index].frictionHorizontal) {
        modifier = _this.modifiers[index].frictionHorizontal;
        switch(modifier.type) {
          case IGEObjectModifier.add:
            _this.frictionCopy.addX(modifier.value);
            break;
          case IGEObjectModifier.subtract:
            _this.frictionCopy.subtractX(modifier.value);
            break;
          case IGEObjectModifier.multiply:
            _this.frictionCopy.multiplyX(modifier.value);
            break;
          case IGEObjectModifier.divide:
            _this.frictionCopy.divideX(modifier.value);
            break;
          case IGEObjectModifier.replace:
            _this.frictionCopy.setX(modifier.value);
            break;
        }
      }

      if(_this.modifiers[index].frictionVerticle) {
        modifier = _this.modifiers[index].frictionVerticle;
        switch(modifier.type) {
          case IGEObjectModifier.add:
            _this.frictionCopy.addY(modifier.value);
            break;
          case IGEObjectModifier.subtract:
            _this.frictionCopy.subtractY(modifier.value);
            break;
          case IGEObjectModifier.multiply:
            _this.frictionCopy.multiplyY(modifier.value);
            break;
          case IGEObjectModifier.divide:
            _this.frictionCopy.divideY(modifier.value);
            break;
          case IGEObjectModifier.replace:
            _this.frictionCopy.setY(modifier.value);
            break;
        }
      }
    }

    return _this.frictionCopy;
  },

  //returns whether or not this area is above another area
  isAbove: function(area) {
    return this.isAboveOffset(area, 0);
  },

  //returns whether or not this area is above another area given a vertical offset
  isAboveOffset: function(area, offset) {
    if(!area.IGEArea) return false;

    var posA = this.getPos(),
        posB = area.getPos();

    return (posA.y + offset) >= (posB.y + posB.height);
  },

  //returns whether or not this area is below another area
  isBelow: function(area) {
    return this.isBelowOffset(area, 0);
  },

  //returns whether or not this area is below another area given a vertical offset
  isBelowOffset: function(area, offset) {
    if(!area.IGEArea) return false;

    var posA = this.getPos(),
        posB = area.getPos();

    return (posA.y + posA.height + offset) <= (posB.y);
  },

  //returns whether or not this area is to the left of another area
  isLeftOf: function(area) {
    return this.isLeftOfOffset(area, 0);
  },

  //returns whether or not this area is to the left of another area given a horizontal offset
  isLeftOfOffset: function(area, offset) {
    if(!area.IGEArea) return false;

    var posA = this.getPos(),
        posB = area.getPos();

    return (posA.x + posA.width + offset) <= (posB.x);
  },

  //returns whether or not this area is to the right of another area
  isRightOf: function(area) {
    return this.isRightOfOffset(area, 0);
  },

  //returns whether or not this area is to the right of another area given a horizontal offset
  isRightOfOffset: function(area, offset) {
    if(!area.IGEArea) return false;

    var posA = this.getPos(),
        posB = area.getPos();

    return (posA.x + offset) >= (posB.x + posB.width);
  },

  //returns whether or not this area intersects with another area
  intersects: function(area) {
    return this.intersectsOffset(area, 0, 0);
  },

  //returns whether or not this area intersects with another area given a horizontal and vertical offset
  intersectsOffset: function(area, offsetX, offsetY) {
    return this.intersectsYOffset(area, offsetY) && this.intersectsXOffset(area, offsetX);
  },

  //returns whether or not this area intersects along the Y-axis with another given area
  intersectsY: function(area) {
    return this.intersectsYOffset(area, 0);
  },

  //returns whether or not this area intersects along the Y-axis with another given area and vertical offset
  intersectsYOffset: function(area, offset) {
    if(typeof(area) !== "object" || !area.IGEArea || typeof(offset) !== "number") {
      throw new IGEInvalidTypeException("intersectsYOffset takes an IGEArea and numeric offset.", this);
    }

    var posA = this.getPos(),
        posB = area.getPos();

//    return ((posA.y + offset) >= (posB.y) && (posA.y + offset) <= (posB.y + posB.height)) ||
//           ((posA.y + posA.height + offset) >= (posB.y) && (posA.y + posA.height + offset) <= (posB.y + posB.height));

    return ((posA.y + offset) <= (posB.y) && (posA.y + posA.height + offset) >= (posB.y)) ||
           ((posA.y + offset) >= (posB.y) && (posA.y + offset) <= (posB.y + posB.height));
  },

  //returns whether or not this area intersects along the X-axis with another given area
  intersectsX: function(area) {
    return this.intersectsXOffset(area, 0);
  },

  //returns whether or not this area intersects along the X-axis with another given area and horizontal offset
  intersectsXOffset: function(area, offset) {
    if(typeof(area) !== "object" || !area.IGEArea || typeof(offset) !== "number") {
      throw new IGEInvalidTypeException("intersectsXOffset takes an IGEArea and numeric offset.", this);
    }

    var posA = this.getPos(),
        posB = area.getPos();

//    return ((posA.x + offset) >= (posB.x) && (posA.x + offset) <= (posB.x + posB.width)) ||
//           ((posA.x + posA.width + offset) >= (posB.x) && (posA.x + posA.width + offset) <= (posB.x + posB.width));

    return ((posA.x + offset) <= (posB.x) && (posA.x + posA.width + offset) >= (posB.x)) ||
           ((posA.x + offset) >= (posB.x) && (posA.x + offset) <= (posB.x + posB.width));
  },

  getParent: function() {
    return this.parent;
  },

  setParent: function(newParent) {
    if(!newParent.IGEArea) return null;

    this.parent = newParent;

    return this;
  },

  getImageHandler: function() {
    return this.imageHandler;
  },

  getSoundHandler: function() {
    return this.soundHandler;
  },


  getID: function() {
    return this.id;
  },


  getDisplayElement: function() {
    return this.displayElement;
  },


  //tells the panel to display an error
  displayError: function(message) {
    if(this.panel) {
      this.panel.displayError(message);
    }
  },


  //tells the panel to display a warning
  displayWarning: function(message) {
    if(this.panel) {
      this.panel.displayWarning(message);
    }
  },


  //tells the panel to display information
  displayInfo: function(message) {
    if(this.panel) {
      this.panel.displayInfo(message);
    }
  },

  //updates this area
  update: function() {
    var _this = this,
        index;

    for(index in _this.preUpdateFunc) {
      _this.preUpdateFunc[index]();
    }

    _this.updateState();

    for(index in _this.postUpdateFunc) {
      _this.postUpdateFunc[index]();
    }
  },

  //things to do before object state is updated
  updateInit: function(func) {
    if(typeof(func) !== "function") {
      throw new IGEInvalidTypeException("updateInit takes a function argument", this);
    }

    this.preUpdateFunc.push(func);

    return this;
  },

  //updates the state of this area
  //meant to be overridden
  updateState: function() {},

  //things to do after object state is updated
  updateFinal: function(func) {
    if(typeof(func) !== "function") {
      throw new IGEInvalidTypeException("updateFinal takes a function argument", this);
    }

    this.postUpdateFunc.push(func);

    return this;
  },

  //how this area interacts with another area
  //called before movement is made
  //meant to be overridden
  interactWith: function(area) {
    if(!area.IGEArea) return null;

    return this;
  },


  //what happens when this are impacts another area
  //(usually movable object runs into a solid edge of another object)
  //called before movement is actually made
  //meant to be overridden
  impact: function(area) {
    if(!area.IGEArea) return null;

    return this;
  },


  //shows the area
  show: function() {
    this.getDisplayElement().show();
    return this;
  },

  //hides the area
  hide: function() {
    this.getDisplayElement().hide();
    return this;
  },

  //returns whether or not the area is hidden
  isShown: function() {
    return (this.getDisplayElement().css("display") !== "none");
  },

  debug: function(message) {
    if(this.isVerbose) {
      this.displayInfo(message);
    }
  }
}).statics({
  IGE_AREA_INDEX: 0
});

//IGE.IGEArea.IGE_AREA_INDEX = 0;
//var IGE_AREA_INDEX = 0;

}

//unusing("General.Notification");
//unusing("IGE.Graphics");
/*
Copyright (C) 2011 by Benjamin McGregor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

using("IGE");
using("IGE.Modification");

define("IGE.Modification.IGEAreaModifier", "abstract").extend("IGEModifier").assign({
  x: null,
  y: null,
  width: null,
  height: null,
  frictionHorizontal: null,
  frictionVertical: null,

  activate: abstractFunction(IGEArea),
  deactivate: abstractFunction(IGEArea)
});

unusing("IGE");
unusing("IGE.Modification");
/*
Copyright (C) 2011 by Benjamin McGregor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
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
/*
Copyright (C) 2011 by Benjamin McGregor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

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
/*
Copyright (C) 2011 by Benjamin McGregor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/


using("IGE");
using("IGE.Graphics");


//IGEImage class definition
define("IGE.Graphics.IGEImage").extend("IGEArea").assign({
  defaults: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    strata: IGEStrata.moderate,
    id: "IGEImage",
    panel: "DEFAULT",
    source: ""
  },

  source: null,
  handler: null,
  id: null,

  //constructor
  IGEImage: function(options) {
    var _this = this;

    if(typeof(options) !== "object") options = {};

    _this.IGEArea(options);

    _this.source = options.source;
    _this.id = options.id;

    if(options.hide) {
      _this.hide();
    }

    _this.getDisplayElement().addClass("IGEImage");
    _this.getDisplayElement().css("background", "url('" + _this.source + "') no-repeat");

    return _this;
  },

  //destructor
  _IGEImage: function() {
    
  }
});


unusing("IGE");
unusing("IGE.Graphics");

/*
Copyright (C) 2011 by Benjamin McGregor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

//

using("IGE");
using("IGE.Graphics");

//IGESprite class definition
define("IGE.Graphics.IGESprite").extend("IGEImage").assign({
  defaults: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    strata: IGEStrata.moderate,
    id: "IGESprite",
    panel: "DEFAULT",
    source: "",
    spriteLeft: 0,
    spriteTop: 0
  },

  spriteTop: null,
  spriteLeft: null,

  //constructor
  IGESprite: function(options) {
    var _this = this,
        index;

    _this.IGEImage(options);

    _this.getDisplayElement().addClass("IGESprite");

    _this.setSpriteTop(options.spriteTop);
    _this.setSpriteLeft(options.spriteLeft);

    return _this;
  },

  //destructor
  _IGESprite: function() {
    this._IGEImage();
  },

  setSpriteTop: function(to) {
    if(typeof(to) !== "number") return null;

    this.spriteTop = -1 * to;

    this.updateSprite();

    return this;
  },

  setSpriteLeft: function(to) {
    if(typeof(to) !== "number") return null;

    this.spriteLeft = -1 * to;

    this.updateSprite();

    return this;
  },

  updateSprite: function() {
    var _this = this;

    _this.getDisplayElement().css("background", "url('" + _this.source +
                                  "') " + _this.spriteLeft + "px " +
                                  _this.spriteTop + "px no-repeat");

    return _this;
  }
});

unusing("IGE");
unusing("IGE.Graphics");
/*
Copyright (C) 2011 by Benjamin McGregor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

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
/*
Copyright (C) 2011 by Benjamin McGregor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

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

/*
Copyright (C) 2011 by Benjamin McGregor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

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
/*
Copyright (C) 2011 by Benjamin McGregor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

using("IGE");
using("IGE.UI");
using("IGE.Graphics");

//IGEUserInterfaceObject class definition
define("IGE.UI.IGEUserInterfaceObject").extend("IGEArea").assign({
  defaults: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    strata: IGEStrata.moderate,
    id: "IGEUserInterfaceObject",
    panel: "DEFAULT"
  },

  id: null,

  IGEUserInterfaceObject: function(options) {
    var _this = this;

    _this.IGEArea(options);

    _this.id = options.id;

    _this.displayElement.addClass("IGEUserInterfaceObject");

    return _this;
  },

  _IGEUserInterfaceObject: function() {
    this._IGEArea();
  }
});

unusing("IGE");
unusing("IGE.UI");
unusing("IGE.Graphics");
/*
Copyright (C) 2011 by Benjamin McGregor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

using("IGE");
using("IGE.UI");
using("IGE.Graphics");

//IGEUserInterfaceButton class definition
define("IGE.UI.IGEUserInterfaceButton").extend("IGEUserInterfaceObject").assign({
  defaults: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    strata: IGEStrata.moderate,
    text: "",
    id: "IGEUserInterfaceButton",
    panel: "DEFAULT"
  },

  //constructor
  IGEUserInterfaceButton: function(options) {
    var _this = this;

    //call super constructor
    _this.IGEUserInterfaceObject(options);

    _this.getDisplayElement().addClass("IGEUserInterfaceButton");

    _this.setText(options.text);

    if(typeof(options.click) === "function") {
      _this.click = options.click;
    }

    _this.getDisplayElement().click(function(event) {
      _this.click(event);
    });

    return _this;
  },

  //destructor
  _IGEUserInterfaceButton: function() {
    
  },

  setText: function(to) {
    this.displayElement.text(to);
  },

  //called when the user clicks on this button
  click: function(event) {
    
  }
});

unusing("IGE");
unusing("IGE.UI");
unusing("IGE.Graphics");
/*
Copyright (C) 2011 by Benjamin McGregor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

using("IGE");
using("IGE.UI");
using("IGE.Graphics");

//IGEUserInterfaceLabel class definition
define("IGE.UI.IGEUserInterfaceLabel").extend("IGEUserInterfaceObject").assign({
  defaults: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    strata: IGEStrata.moderate,
    text: "",
    id: "IGEUserInterfaceLabel",
    panel: "DEFAULT"
  },

  //constructor
  IGEUserInterfaceLabel: function(options) {
    var _this = this;

    //call super class instructor
    _this.IGEUserInterfaceObject(options);

    _this.displayElement.addClass("IGEUserInterfaceLabel");

    _this.setText(options.text);

    return _this;
  },

  //destructor
  _IGEUserInterfaceLabel: function() {
    this._IGEUserInterfaceObject();
  },

  setText: function(to) {
    this.displayElement.text(to);
  }
});

unusing("IGE");
unusing("IGE.UI");
unusing("IGE.Graphics");
/*
Copyright (C) 2011 by Benjamin McGregor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

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
/*
Copyright (C) 2011 by Benjamin McGregor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

using("IGE");
using("IGE.UI");

define("IGE.UI.IGEUserInterfaceTextArea").extend("IGEUserInterfaceObject").assign({
  IGEUserInterfaceTextArea: function(options) {
    throw new IGEUnimplementedException("Currently unimplemented");
  },

  _IGEUserInterfaceTextArea: function() {
    
  }
});

unusing("IGE");
unusing("IGE.UI");
/*
Copyright (C) 2011 by Benjamin McGregor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

using("IGE");
using("IGE.Graphics");

define("IGE.IGEConsole").extend("IGEArea").assign({
  defaults: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    strata: IGEStrata.moderate,
    panel: "DEFAULT",
    id: "IGEConsole"
  },

  IGEConsole: function(options) {
    var _this = this,
        panel;

    _this.IGEArea(options);

    _this.getDisplayElement().addClass("IGEConsole");
    _this.getDisplayElement().css("overflow", "scroll");
    _this.getDisplayElement().css("z-index", "3");
    _this.getDisplayElement().fadeTo(0, .75);

    if(typeof(options.panel) === "string") {
      panel = getIGEPanel(options.panel);
    } else if(typeof(options.panel) === "object" && options.panel.IGEPanel) {
      panel = options.panel;
    } else {
      throw new IGEInvalidTypeException("IGEConsole requires a panel attribute as either an IGEPanel object or string id.", _this);
    }

    if(panel) {
      panel.getDisplayElement().append(_this.getDisplayElement());
    } else {
      throw new IGEInvalidTypeException("No panel could be located matching the given criteria.", _this);
    }

    return _this;
  },

  _IGEConsole: function() {
    
  },

  log: function(message) {
    this.message(message, "log");
  },

  info: function(message) {
    this.message(message, "info");
  },

  warning: function(message) {
    this.message(message, "warning");
  },

  error: function(message) {
    this.message(message, "error");
  },

  message: function(message, type) {
    var _this = this,
        newMessage = $(document.createElement("div"));

    newMessage.addClass("message").addClass(type);
    newMessage.html("<span class=\"" + type + "\">" + type + ": </span>" + message + "<br/>");

    _this.getDisplayElement().append(newMessage);
    _this.getDisplayElement().scrollTop(999999);
  }
});

unusing("IGE");
unusing("IGE.Graphics");
/*
Copyright (C) 2011 by Benjamin McGregor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

using("IGE");

//IGESolidDirs class definition
define("IGESolidDirs").assign({
  top: false,
  bottom: false,
  left: false,
  right: false,

  //IGESolidDirs constructor
  IGESolidDirs: function(options) {
    if(typeof(options) === "boolean") {
      this.top = options;
      this.left = options;
      this.right = options;
      this.bottom = options;
    } else {
      if(typeof(options.top) === "boolean") this.top = options.top;
      if(typeof(options.bottom) === "boolean") this.bottom = options.bottom;
      if(typeof(options.left) === "boolean") this.left = options.left;
      if(typeof(options.right) === "boolean") this.right = options.right;
    }
  },

  //IGESolidDirs destructor
  _IGESolidDirs: function() {
    delete this;
  }
});

unusing("IGE");
/*
Copyright (C) 2011 by Benjamin McGregor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

using("IGE");
using("IGE.Graphics");

//IGEObject class definition
define("IGE.IGEObject").extend("IGEArea").assign({
  defaults: {
    y: 0,
    x: 0,
    width: 0,
    height: 0,
    strata: IGEStrata.moderate,
    solidDirs: false,
    friction: 0,
    id: "IGEObject",
    panel: "DEFAULT",
    verbose: false
  },

  solidDirs: null,     //IGESolidDirs object, determines which faces are solid
  solidDirsCopy: null,
  modifiers: null,

  //IGEObject constructor
  IGEObject: function(options) {
    var _this = this;

    if(typeof(options) !== "object") options = {};

    _this.IGEArea(options);

    _this.getDisplayElement().addClass("IGEObject");

    _this.solidDirs = new IGESolidDirs((typeof(options.solidDirs) === "object" &&
                                       options.solidDirs.IGESolidDirs) ||
                                       typeof(options.solidDirs) === "boolean"?
                                         options.solidDirs:
                                         _this.defaults.solidDirs);
    _this.solidDirsCopy = new IGESolidDirs(false);
    _this.debug("IGEObject: solid directions have been set.");



    _this.debug("IGEObject construction finished.");

    return this;
  },

  //IGEObject destructor
  _IGEObject: function() {
    this._IGEArea();
  },

  getSolidDirs: function() {
    using("IGE.Modification");

    var _this = this,
        index,
        modifier,
        sdc = _this.solidDirsCopy;

    sdc.top = _this.solidDirs.top;
    sdc.left = _this.solidDirs.left;
    sdc.right = _this.solidDirs.right;
    sdc.bottom = _this.solidDirs.bottom;

    for(index in _this.modifiers) {
      if(_this.modifiers[index].solidDirsTop) {
        modifier = _this.modifiers[index].solidDirsTop;
        if(modifier.type === IGEModifier.replace) {
          sdc.top = modifier.value;
        }
      }

      if(_this.modifiers[index].solidDirsLeft) {
        modifier = _this.modifiers[index].solidDirsTop;
        if(modifier.type === IGEModifier.replace) {
          sdc.left = modifier.value;
        }
      }

      if(_this.modifiers[index].solidDirsRight) {
        modifier = _this.modifiers[index].solidDirsTop;
        if(modifier.type === IGEModifier.replace) {
          sdc.right = modifier.value;
        }
      }

      if(_this.modifiers[index].solidDirsBottom) {
        modifier = _this.modifiers[index].solidDirsTop;
        if(modifier.type === IGEModifier.replace) {
          sdc.bottom = modifier.value;
        }
      }
    }

    unusing("IGE.Modification");

    return sdc;
  },

//  addModifier: function(modifier) {
//    var _this = this;
//
//    if(typeof(modifier) !== "object" && modifier.IGEObjectModifier) {
//      throw new IGEInvalidTypeException("addModifier takes an IGECharacterModifier object", _this);
//    }
//
//    _this.modifiers.splice(_this.modifiers.length, 0, modifier);
//
//    modifier.activate(_this);
//  },

  //removes a modifier from this character.
  //takes either a string of the class name
  //(in which case it removes the first modifier that matches),
  //or the particular object to be removed
  removeModifier: function(modifier) {
    var _this = this,
        index;

    if(typeof(modifier) === "string") {
      for(index in _this.modifiers) {
        if(_this.modifiers[index][modifier]) {
          _this.modifiers[index].deactivate(_this);
          _this.modifiers.splice(index, 1);
          return _this;
        }
      }
    } else if(typeof(modifier) === "object" && modifier.IGEObjectModifier) {
      for(index in _this.modifiers) {
        if(_this.modifiers[index] === modifier) {
          _this.modifiers[index].deactivate(_this);
          _this.modifiers.splice(index, 1);
          return _this;
        }
      }
    } else {
      _this.displayError("removeModifier takes an IGEObjectModifier object or string");
      throw new IGEInvalidTypeException("removeModifier takes an IGEObjectModifier object or string", _this);
    }

    return _this;
  }
});

unusing("IGE");
unusing("IGE.Graphics");
/*
Copyright (C) 2011 by Benjamin McGregor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

using("IGE");
using("IGE.Modification");

define("IGE.Modification.IGEObjectModifier", "abstract").extend("IGEAreaModifier").assign({
  solidDirsTop: null,
  solidDirsLeft: null,
  solidDirsRight: null,
  solidDirsBottom: null,


  activate: abstractFunction(IGEObject),
  deactivate: abstractFunction(IGEObject)
});

unusing("IGE");
unusing("IGE.Modification");
/*
Copyright (C) 2011 by Benjamin McGregor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

using("IGE.Control");

define("IGE.Control.IGEKeybind").assign({
  defaults: {
    keycode: 0,
    keydown: function() {},
    keyup: function() {},
    description: "empty bind"
  },

  keycode: null,
  keydown: null,
  keyup: null,
  description: null,
  handler: null,

  //constructor
  IGEKeybind: function(options) {
    if(typeof(options)!=="object") options = {};

    var _this = this,
        keycode = (typeof(options.keycode)==="number"?options.keycode:_this.defaults.keycode),
        keydown = (typeof(options.keydown)==="function"?options.keydown:_this.defaults.keydown),
        keyup = (typeof(options.keyup)==="function"?options.keyup:_this.defaults.keyup),
        description = (typeof(options.description)==="string"?options.description:_this.defaults.description);


    _this.keycode = keycode;
    _this.keydown = keydown;
    _this.keyup = keyup;
    _this.description = description;

    return this;
  },

  _IGEKeybind: function() {

  },

  unbind: function() {
    if(this.handler) {
      return this.handler.unbind(this);
    } else {
      return null;
    }
  }
});

unusing("IGE.Control");
/*
Copyright (C) 2011 by Benjamin McGregor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

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
/*
Copyright (C) 2011 by Benjamin McGregor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

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
/*
Copyright (C) 2011 by Benjamin McGregor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

using("IGE");
using("IGE.Graphics");

define("IGE.IGELevelViewer").extend("IGEPanel").assign({
  defaults: {
    x: 0,
    y: 0,
    width: 800,
    height: 600,
    strata: IGEStrata.moderate,
    id: "IGEPanel",
    container: "body",
    framesPerSecond: 35,
    scrollIncrement: 25
  },

  moveUp: false,
  moveLeft: false,
  moveRight: false,
  moveDown: false,
  scrollIncrement: null,

  IGELevelViewer: function(options) {
    var _this = this,
        kh,
        upBind = new IGEKeybind({
          keycode: IGEKeybindHandler.getKeyToKeycode("up arrow"),
          keydown: function() {
            _this.moveUp = true;
          },
          keyup: function() {
            _this.moveUp = false;
          },
          description: "Move the view upwards"
        }),
        leftBind = new IGEKeybind({
          keycode: IGEKeybindHandler.getKeyToKeycode("left arrow"),
          keydown: function() {
            _this.moveLeft = true;
          },
          keyup: function() {
            _this.moveLeft = false;
          },
          description: "Move the view left"
        }),
        rightBind = new IGEKeybind({
          keycode: IGEKeybindHandler.getKeyToKeycode("right arrow"),
          keydown: function() {
            _this.moveRight = true;
          },
          keyup: function() {
            _this.moveRight = false;
          },
          description: "Move the view right"
        }),
        downBind = new IGEKeybind({
          keycode: IGEKeybindHandler.getKeyToKeycode("down arrow"),
          keydown: function() {
            _this.moveDown = true;
          },
          keyup: function() {
            _this.moveDown = false;
          },
          description: "Move the view down"
        });

    if(typeof(options) !== "object") options = {};

    _this.IGEPanel(options);

    _this.getDisplayElement().addClass("IGELevelViewer");

    _this.scrollIncrement = typeof(options.scrollIncrement) === "number"?
                              options.scrollIncrement:
                              _this.defaults.scrollIncrement;

    _this.focusObject = {};

    kh = _this.getKeybindHandler();
    kh.bind(upBind);
    kh.bind(leftBind);
    kh.bind(rightBind);
    kh.bind(downBind);


    return _this;
  },

  _IGELevelViewer: function() {

  },

  updateView: function() {
    if(typeof(this.level) !== "object" || !this.level.IGELevel) {
      return;
    }

    var levelPos = this.level.getPos(),
        xChange = 0,
        yChange = 0;

    if(this.moveUp) {
      yChange -= this.scrollIncrement;
    }
    if(this.moveLeft) {
      xChange += this.scrollIncrement;
    }
    if(this.moveRight) {
      xChange -= this.scrollIncrement;
    }
    if(this.moveDown) {
      yChange += this.scrollIncrement;
    }

    this.level.setPos(levelPos.x + xChange, levelPos.y + yChange);
  }
});

unusing("IGE");
unusing("IGE.Graphics");
/*
Copyright (C) 2011 by Benjamin McGregor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

using("IGE");

define("IGE.IGELevelEditor").extend("IGELevelViewer").assign({
  IGELevelEditor: function(options) {
    throw new IGEUnimplementedException("Currently unimplemented");
  },

  _IGELevelEditor: function() {
    
  }
});

unusing("IGE");
/*
Copyright (C) 2011 by Benjamin McGregor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

using("IGE");
using("IGE.Graphics");

define("IGE.IGEMovableObject").extend("IGEObject").assign({
  defaults: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    strata: IGEStrata.moderate,
    solidDirs: false,
    gravity: 0,
    maxSpeed: 0,
    accelleration: 0,
    friction: 0,
    id: "IGEMovableObject",
    panel: "DEFAULT",
    verbose: false
  },

  gravity: null,            //gravity vector placed on this object
  gravityCopy: null,        //copy of this object's gravity values
  accelleration: null,      //how fast horizontally and vertically this object can speed up
  accellerationCopy: null,  //copy of this object's accelleration values
  maxSpeed: null,           //the maximum speed this object can travel horizontally and vertically
  maxSpeedCopy: null,       //copy of this object's max speed values
  movement: null,           //current moving vector for this object
  stableHorizontal: null,   //what this object is stable on moving horizontally
  stableVertical: null,     //what this object is stable on moving vertically
  moveLeft: false,          //sets this object as moving left
  moveRight: false,         //sets this object as moving right
  moveUp: false,            //sets this object as moving up
  moveDown: false,          //sets this object as moving down
  

  //IGEMovableObject constructor
  IGEMovableObject: function(options) {
    var _this = this;

    _this.IGEObject(options);

    //initialize the movement vector
    _this.movement = new IGEVector(0, 0);

    _this.getDisplayElement().addClass("IGEMovableObject");

    //initialize the gravity vector
    if(typeof(options.gravity) === "number") {
      _this.gravity = new IGEVector(options.gravity, options.gravity);
    } else if(typeof(options.gravity) === "object" &&
              typeof(options.gravity.horizontal) === "number" &&
              typeof(options.gravity.vertical) === "number") {
      _this.gravity = new IGEVector(options.gravity.horizontal, options.gravity.vertical);
    } else if(typeof(options.gravity) === "object" &&
              options.gravity.IGEVector) {
      _this.gravity = options.gravity;
    } else {
      _this.displayError("Invalid gravity specified for " + _this.id + ": " + options.gravity);
      throw new IGEInvalidTypeException("Invalid gravity specified for " + _this.id + ": " + options.gravity, _this);
    }
    _this.debug("IGEMovableObject: gravity vector has been set.");

    _this.gravityCopy = new IGEVector(0, 0);



    //initialize the accelleration vector
    if(typeof(options.accelleration) === "number") {
      _this.accelleration = new IGEVector(options.accelleration, options.accelleration);

    } else if(typeof(options.accelleration) === "object" &&
              typeof(options.accelleration.horizontal) === "number" &&
              typeof(options.accelleration.vertical) === "number") {
      _this.accelleration = new IGEVector(options.accelleration.horizontal, options.accelleration.vertical);

    } else if(typeof(options.accelleration) === "object" &&
              options.accelleration.IGEVector) {
      _this.accelleration = options.accelleration;
      
    } else {
      this.displayError("Invalid accelleration specified for " + _this.id + ": " + options.accelleration);
      throw new IGEInvalidTypeException("Invalid accelleration specified for " + _this.id + ": " + options.accelleration, _this);
    }
    _this.debug("IGEMovableObject: accelleration vector has been set.");

    _this.accellerationCopy = new IGEVector(0, 0);



    //initialize the max speed vector
    if(typeof(options.maxSpeed) === "number") {
      _this.maxSpeed = new IGEVector(options.maxSpeed, options.maxSpeed);

    } else if(typeof(options.maxSpeed) === "object" &&
              typeof(options.maxSpeed.horizontal) === "number" &&
              typeof(options.maxSpeed.vertical) === "number") {
      _this.maxSpeed = new IGEVector(options.maxSpeed.horizontal, options.maxSpeed.vertical);

    } else if(typeof(options.maxSpeed) === "object" &&
              options.maxSpeed.IGEVector) {
      _this.maxSpeed = options.maxSpeed;
    } else {
      _this.displayError("Invalid maximum speed specified for " + _this.id + ": " + options.maxSpeed);
      throw new IGEInvalidTypeException("Invalid maximum speed specified for " + _this.id + ": " + options.maxSpeed, _this);
    }
    _this.debug("IGEMovableObject: maximum speed values have been set.");

    _this.maxSpeedCopy = new IGEVector(0, 0);

    _this.debug("IGEMovableObject construction finished.");

    return _this;
  },

  //IGEMovableObject destructor
  _IGEMovableObject: function() {
    this._IGEObject();
  },


  getGravity: function() {
    //using("IGE.Modification");

    var _this = this,
        index,
        modifier;

    with(namespace("IGE.Modification")) {

      _this.gravityCopy.setX(_this.gravity.getX());
      _this.gravityCopy.setY(_this.gravity.getY());

      for(index in _this.modifiers) {
        if(_this.modifiers[index].gravityHorizontal) {
          modifier = _this.modifiers[index].gravityHorizontal;
          switch(modifier.type) {
            case IGEObjectModifier.add:
              _this.gravityCopy.addX(modifier.value);
              break;
            case IGEObjectModifier.subtract:
              _this.gravityCopy.subtractX(modifier.value);
              break;
            case IGEObjectModifier.multiply:
              _this.gravityCopy.multiplyX(modifier.value);
              break;
            case IGEObjectModifier.divide:
              _this.gravityCopy.divideX(modifier.value);
              break;
            case IGEObjectModifier.replace:
              _this.gravityCopy.setX(modifier.value);
              break;
          }
        }

        if(_this.modifiers[index].gravityVertical) {
          modifier = _this.modifiers[index].gravityVertical;
          switch(modifier.type) {
            case IGEObjectModifier.add:
              _this.gravityCopy.addY(modifier.value);
              break;
            case IGEObjectModifier.subtract:
              _this.gravityCopy.subtractY(modifier.value);
              break;
            case IGEObjectModifier.multiply:
              _this.gravityCopy.multiplyY(modifier.value);
              break;
            case IGEObjectModifier.divide:
              _this.gravityCopy.divideY(modifier.value);
              break;
            case IGEObjectModifier.replace:
              _this.gravityCopy.setY(modifier.value);
              break;
          }
        }
      }

    }

    //unusing("IGE.Modification");

    return _this.gravityCopy;
  },


  getAccelleration: function() {

    //using("IGE.Modification");

    var _this = this,
        index,
        modifier;

    with(namespace("IGE.Modification")) {

      _this.accellerationCopy.setX(_this.accelleration.getX());
      _this.accellerationCopy.setY(_this.accelleration.getY());

      for(index in _this.modifiers) {
        if(_this.modifiers[index].accellerationHorizontal) {
          modifier = _this.modifiers[index].accellerationHorizontal;
          switch(modifier.type) {
            case IGEModifier.add:
              _this.accellerationCopy.addX(modifier.value);
              break;
            case IGEModifier.subtract:
              _this.accellerationCopy.subtractX(modifier.value);
              break;
            case IGEModifier.multiply:
              _this.accellerationCopy.multiplyX(modifier.value);
              break;
            case IGEModifier.divide:
              _this.accellerationCopy.divideX(modifier.value);
              break;
            case IGEModifier.replace:
              _this.accellerationCopy.setX(modifier.value);
              break;
          }
        }

        if(_this.modifiers[index].accellerationVerticle) {
          modifier = _this.modifiers[index].accellerationVerticle;
          switch(modifier.type) {
            case IGEModifier.add:
              _this.accellerationCopy.addY(modifier.value);
              break;
            case IGEModifier.subtract:
              _this.accellerationCopy.subtractY(modifier.value);
              break;
            case IGEModifier.multiply:
              _this.accellerationCopy.multiplyY(modifier.value);
              break;
            case IGEModifier.divide:
              _this.accellerationCopy.divideY(modifier.value);
              break;
            case IGEModifier.replace:
              _this.accellerationCopy.setY(modifier.value);
              break;
          }
        }
      }
    }

    //unusing("IGE.Modification");

    return _this.accellerationCopy;
  },


  getMaxSpeed: function() {
    //using("IGE.Modification");

    var _this = this,
        index,
        modifier;

    with(namespace("IGE.Modification")) {

      _this.maxSpeedCopy.setX(_this.maxSpeed.getX());
      _this.maxSpeedCopy.setY(_this.maxSpeed.getY());

      for(index in _this.modifiers) {
        if(_this.modifiers[index].maxSpeedHorizontal) {
          modifier = _this.modifiers[index].maxSpeedHorizontal;
          switch(modifier.type) {
            case IGEModifier.add:
              _this.maxSpeedCopy.addX(modifier.value);
              break;
            case IGEModifier.subtract:
              _this.maxSpeedCopy.subtractX(modifier.value);
              break;
            case IGEModifier.multiply:
              _this.maxSpeedCopy.multiplyX(modifier.value);
              break;
            case IGEModifier.divide:
              _this.maxSpeedCopy.divideX(modifier.value);
              break;
            case IGEModifier.replace:
              _this.maxSpeedCopy.setX(modifier.value);
              break;
          }
        }

        if(_this.modifiers[index].maxSpeedVerticle) {
          modifier = _this.modifiers[index].maxSpeedVerticle;
          switch(modifier.type) {
            case IGEModifier.add:
              _this.maxSpeedCopy.addY(modifier.value);
              break;
            case IGEModifier.subtract:
              _this.maxSpeedCopy.subtractY(modifier.value);
              break;
            case IGEModifier.multiply:
              _this.maxSpeedCopy.multiplyY(modifier.value);
              break;
            case IGEModifier.divide:
              _this.maxSpeedCopy.divideY(modifier.value);
              break;
            case IGEModifier.replace:
              _this.maxSpeedCopy.setY(modifier.value);
              break;
          }
        }
      }

    }

    //unusing("IGE.Modification");

    return _this.maxSpeedCopy;
  },

  
  updateState: function() {
    this.updatePosition();
  },

  updatePosition: function() {
    var _this = this,
        index,
        position = _this.getPos(),
        siblings = _this.parent.getChildren(),
        sibling;

    //factor in gravity
    _this.factorGravity();

    //factor in friction
    _this.factorFriction();

    //factor in which direction to accellerate towards
    _this.factorMovementFlags();

    //factor in maximum speeds
    _this.factorMaxSpeed();

    //check for any intersections with other areas
    for(index in siblings) {
      sibling = siblings[index];
      if(sibling != _this) {

        _this.checkForIntersectionDown(sibling);
        _this.checkForIntersectionUp(sibling);
        _this.checkForIntersectionLeft(sibling);
        _this.checkForIntersectionRight(sibling);
       
      }
    }

    _this.checkIfFallOff();

    //update to the new position
    _this.setPos(position.x + _this.movement.getX(), position.y + _this.movement.getY());
  },


  factorMovementFlags: function() {
    var _this = this,
        accelleration = _this.getAccelleration();

    if(_this.movingLeft) {
      _this.movement.subtractX(accelleration.getX());
    }

    if(_this.movingRight) {
      _this.movement.addX(accelleration.getX());
    }

    if(_this.movingUp) {
      _this.movement.addY(accelleration.getY());
    }

    if(_this.movingDown) {
      _this.movement.subtractY(accelleration.getY());
    }
  },


  factorFriction: function() {
    var _this = this,
        stableFriction,
        frictionAdjustment;

    //factoring friction for vertical stable object
    if(_this.stableVertical) {
      stableFriction = _this.stableVertical.getFriction();
      frictionAdjustment = stableFriction.getX();
      if(_this.movement.getX() > 0) {
        if(_this.movement.getX() > frictionAdjustment) {
          //_this.movement.horizontal -= frictionAdjustment;
          _this.movement.subtractX(frictionAdjustment);
        } else {
          _this.movement.setX(0);
        }
      } else if(_this.movement.getX() < 0) {
        if(Math.abs(_this.movement.getX()) > frictionAdjustment) {
          //_this.movement.horizontal += frictionAdjustment;
          _this.movement.addX(frictionAdjustment);
        } else {
          _this.movement.setX(0);
          //_this.movement.horizontal = 0;
        }
      }
    }

    //factoring friction for horizontal stable object
    if(_this.stableHorizontal) {
      stableFriction = _this.stableHorizontal.getFriction();
      frictionAdjustment = stableFriction.getY();
      if(_this.movement.getY() > 0) {
        if(_this.movement.getY() > frictionAdjustment) {
          _this.movement.subtractY(frictionAdjustment);
        } else {
          _this.movement.setY(0);
        }
      } else if(_this.movement.getY() < 0) {
        if(Math.abs(_this.movement.getY()) > frictionAdjustment) {
          _this.movement.addY(frictionAdjustment);
        } else {
          _this.movement.setY(0);
        }
      }
    }

    //factoring friction for level
    stableFriction = _this.getParent().getFriction();
    frictionAdjustment = stableFriction.getY();
    if(_this.movement.getY() > 0) {
      if(_this.movement.getY() > frictionAdjustment) {
        _this.movement.subtractY(frictionAdjustment);
      } else {
        _this.movement.setY(0);
      }
    } else if(_this.movement.getY() < 0) {
      if(Math.abs(_this.movement.getY()) > frictionAdjustment) {
        _this.movement.addY(frictionAdjustment);
      } else {
        _this.movement.setY(0);
      }
    }
    frictionAdjustment = stableFriction.getX();
    if(_this.movement.getX() > 0) {
      if(_this.movement.getX() > frictionAdjustment) {
        _this.movement.subtractX(frictionAdjustment);
      } else {
        _this.movement.setX(0);
      }
    } else if(_this.movement.getX() < 0) {
      if(Math.abs(_this.movement.getX()) > frictionAdjustment) {
        _this.movement.addX(frictionAdjustment);
      } else {
        _this.movement.setX(0);
      }
    }

    
  },


  factorGravity: function() {
    var _this = this,
        gravity = _this.getGravity();

    if(_this.stableHorizontal) {
      _this.movement.setX(0);
    }  else {
      _this.movement.addX(-1 * gravity.getX());
    }

    if(_this.stableVertical) {
      _this.movement.setY(0);
    } else {
      _this.movement.addY(-1 * gravity.getY());
    }
  },


  factorMaxSpeed: function() {
    var _this = this,
        maxSpeed = _this.getMaxSpeed();

    if(_this.movement.getX() < -1 * maxSpeed.getX()) {
      _this.movement.setX(-1 * maxSpeed.getX());
    }

    if(_this.movement.getX() > maxSpeed.getX()) {
      _this.movement.setX(maxSpeed.getX());
    }

    if(_this.movement.getY() > maxSpeed.getY()) {
      _this.movement.sexY(maxSpeed.getY());
    }
    
    if(_this.movement.getY() < -1 * maxSpeed.getY()) {
      _this.movement.setY(-1 * maxSpeed.getY());
    }
  },


  checkForIntersectionDown: function(sibling) {
    var _this = this,
        movement = _this.movement,
        siblingPosition = sibling.getPos(),
        position = _this.getPos();

    //are we above or below a sibling?
    if(_this.intersectsXOffset(sibling, movement.getX())) {

      //above one sibling, are we going to run into it?
      if(_this.isAbove(sibling) &&
          (_this.intersectsYOffset(sibling, movement.getY()) ||
           _this.isBelowOffset(sibling, movement.getY()))) {

        _this.interactWith(sibling);
        sibling.interactWith(_this);

        //are we running into a solid edge or not?
        if(sibling.IGEObject && sibling.getSolidDirs().top) {
          _this.impact(sibling);

          _this.movement.setY(0);
          _this.setPos(position.x, siblingPosition.y + siblingPosition.height);
          
          //will gravity hold us there?
          if(_this.gravity.getY() > 0) {
            _this.stableVertical = sibling;
          }
        } else {
          //is the sibling a sector?
          if(sibling.IGESector) {
            sibling.activate(_this);
          }
        }
      }
    }
  },


  checkForIntersectionUp: function(sibling) {
    var _this = this,
        movement = _this.movement,
        siblingPosition = sibling.getPos(),
        position = _this.getPos();

    //are we above or below a sibling?
    if(_this.intersectsXOffset(sibling, movement.getX())) {

      //below one sibling, are we going to run into it?
      if(_this.isBelow(sibling) &&
          (_this.intersectsYOffset(sibling, movement.getY()) ||
           _this.isAboveOffset(sibling, movement.getY()))) {

        _this.interactWith(sibling);
        sibling.interactWith(_this);

        //are we running into a solid edge or not?
        if(sibling.IGEObject && sibling.getSolidDirs().bottom) {
          _this.impact(sibling);

          _this.movement.setY(0);
          _this.setPos(position.x, siblingPosition.y - position.height);


          //will gravity hold us there?
          if(_this.gravity.getY() < 0) {
            _this.stableVertical = sibling;
          }
        } else {
          //is the sibling a sector?
          if(sibling.IGESector) {
            sibling.activate(_this);
          }
        }
      }
    }
  },


  checkForIntersectionLeft: function(sibling) {
    var _this = this,
        movement = _this.movement,
        siblingPosition = sibling.getPos(),
        position = _this.getPos();

    //are we left or right of a sibling?
    if(_this.intersectsYOffset(sibling, movement.getY())) {

      //above one sibling, are we going to run into it?
      if(_this.isRightOf(sibling) &&
          (_this.intersectsXOffset(sibling, movement.getX()) ||
           _this.isLeftOfOffset(sibling, movement.getX()))) {

        _this.interactWith(sibling);
        sibling.interactWith(_this);

        //are we running into a solid edge or not?
        if(sibling.IGEObject && sibling.getSolidDirs().right) {
          _this.impact(sibling);

          _this.movement.setX(0);
          _this.setPos(siblingPosition.x + siblingPosition.width, position.y);
          
          //will gravity hold us there?
          if(_this.gravity.getX() > 0) {
            _this.stableHorizontal = sibling;
          }
        } else {
          //is the sibling a sector?
          if(sibling.IGESector) {
            sibling.activate(_this);
          }
        }
      }
    }
  },


  checkForIntersectionRight: function(sibling) {
    var _this = this,
        movement = _this.movement,
        siblingPosition = sibling.getPos(),
        position = _this.getPos();

    //are we left or right of the sibling?
    if(_this.intersectsYOffset(sibling, movement.getY())) {

      //left of one sibling, are we going to run into it?
      if(_this.isLeftOf(sibling) &&
          (_this.intersectsXOffset(sibling, movement.getX()) ||
           _this.isRightOfOffset(sibling, movement.getX()))) {

        _this.interactWith(sibling);
        sibling.interactWith(_this);

        //are we running into a solid edge or not?
        if(sibling.IGEObject && sibling.getSolidDirs().left) {
          _this.impact(sibling);

          _this.movement.setX(0);
          _this.setPos(siblingPosition.x - position.width, position.y);
          
          //will gravity hold us there?
          if(_this.gravity.getX() < 0) {
            _this.stableHorizontal = sibling;
          }
        } else {
          //is the sibling a sector?
          if(sibling.IGESector) {
            sibling.activate(_this);
          }
        }
      }
    }
  },


  checkIfFallOff: function() {
    var _this = this;

    //stable on something to the right or left
    if(_this.stableHorizontal) {
      if(!_this.intersectsYOffset(_this.stableHorizontal, _this.movement.getY())) {
        _this.stableHorizontal = null;
      }
    }

    //stable on something to the top or bottom
    if(_this.stableVertical) {
      if(!_this.intersectsXOffset(_this.stableVertical, _this.movement.getX())) {
        _this.stableVertical = null;
      }
    }
  }
});

unusing("IGE");
unusing("IGE.Graphics");
/*
Copyright (C) 2011 by Benjamin McGregor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

using("IGE");
using("IGE.Modification");

define("IGE.Modification.IGEMovableObjectModifier", "abstract").extend("IGEObjectModifier").assign({
  accellerationHorizontal: null,
  accellerationVertical: null,
  maxSpeedHorizontal: null,
  maxSpeedVertical: null,
  gravityHorizonal: null,
  gravityVertical: null,

  activate: abstractFunction(IGEMovableObject),
  deactivate: abstractFunction(IGEMovableObject)
});

unusing("IGE");
unusing("IGE.Modification");
/*
Copyright (C) 2011 by Benjamin McGregor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

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
/*
Copyright (C) 2011 by Benjamin McGregor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

using("IGE");
using("IGE.Exceptions");
using("IGE.Graphics");

//IGECharacter class definition
define("IGE.IGECharacter", "abstract").extend("IGEMovableObject", "IGETargeter").assign({
  defaults: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    gravity: 0,
    maxSpeed: 0,
    accelleration: 0,
    friction: 0,
    solidDirs: false,
    strata: IGEStrata.moderate,
    hitpoints: 1,
    id: "IGECharacter",
    panel: "DEFAULT",
    verbose: false
  },

  currentHitpoints: null,
  maximumHitpoints: null,

  //IGECharacter constructor
  IGECharacter: function(options) {
    var _this = this;

    _this.IGEMovableObject(options);

    _this.getDisplayElement().addClass("IGECharacter");

    _this.currentHitpoints = options.hitpoints;
    _this.maximumHitpoints = options.hitpoints;
    _this.debug("IGECharacter: hitpoints have been set to " + options.hitpoints);

    _this.debug("IGECharacter construction finished.");

    return _this;
  },

  //IGECharacter destructor
  _IGECharacter: function() {
    this._IGEMovableObject();
  },

  setMaximumHitpoints: function(to) {
    if(typeof(to) !== "number") {
      throw new IGEInvalidTypeException("setMaximumHitpoints takes a number.", this);
    }

    this.maximumHitpoints = to;
  },

  getMaximumHitpoints: function() {
    return this.maximumHitpoints;
  },

  setCurrentHitpoints: function(to) {
    if(typeof(to) !== "number") {
      throw new IGEInvalidTypeException("setCurrentHitpoints takes a number.", this);
    }

    this.currentHitpoints = to;
  },

  getCurrentHitpoints: function() {
    return this.currentHitpoints;
  },

  receiveDamage: function(amount) {
    if(typeof(amount) !== "number") {
      throw new IGEInvalidTypeException("receiveDamage takes a number.", this);
    }

    this.currentHitpoints -= amount;
  }
});

unusing("IGE");
unusing("IGE.Exceptions");
unusing("IGE.Graphics");
/*
Copyright (C) 2011 by Benjamin McGregor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

using("IGE");
using("IGE.Modification");

define("IGE.Modification.IGECharacterModifier", "abstract").extend("IGEMovableObjectModifier").assign({
  //list of attributes that can be altered
  //while the modifier is active
  //  these properties take an object containing a type and value
  //  EX: gravityVertical: {type: IGECharacterModifier.replace, value: -1}
  //  that would invert gravity as long as the character had that modifier
  //----------------------------------------//\
  maxHitpoints: null,
  currentHitpoints: null,
  //----------------------------------------//

  //things to do when the modifier is activated (added)
  activate: abstractFunction(IGECharacter),

  //things to do when the modifier is deactivated (removed)
  deactivate: abstractFunction(IGECharacter)
});

unusing("IGE");
unusing("IGE.Modification");
/*
Copyright (C) 2011 by Benjamin McGregor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

using("IGE.Modification");

define("IGE.Modification.IGEBuff", "abstract").extend("IGECharacterModifier");

unusing("IGE.Modification");
/*
Copyright (C) 2011 by Benjamin McGregor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

using("IGE.Modification");

define("IGE.Modification.IGEDebuff", "abstract").extend("IGECharacterModifier");

unusing("IGE.Modification");
/*
Copyright (C) 2011 by Benjamin McGregor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

using("IGE");
using("IGE.Graphics");

//IGEPlayerCharacter class definition
define("IGE.IGEPlayerCharacter").extend("IGECharacter").assign({
  defaults: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    gravity: 0,
    maxSpeed: 0,
    accelleration: 0,
    friction: 0,
    solidDirs: false,
    strata: IGEStrata.moderate,
    hitpoints: 1,
    id: "IGEPlayerCharacter",
    panel: "DEFAULT",
    verbose: false
  },

  //IGEPlayerCharacter constructor
  IGEPlayerCharacter: function(options) {
    this.IGECharacter(options);

    this.debug("IGEPlayerCharacter construction finished.")

    return this;
  },

  //IGEPlayerCharacter destructor
  _IGEPlayerCharacter: function() {
    this._IGECharacter();
  }
});

unusing("IGE");
unusing("IGE.Graphics");
/*
Copyright (C) 2011 by Benjamin McGregor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

using("IGE");

//IGEPlayerCharacter class definition
define("IGE.IGENonPlayerCharacter").extend("IGECharacter").assign({

  //IGEPlayerCharacter constructor
  IGENonPlayerCharacter: function(options) {
    this.IGECharacter(options);

    return this;
  },

  //IGEPlayerCharacter destructor
  _IGENonPlayerCharacter: function() {
    this._IGECharacter();
  }
});

unusing("IGE");
/*
Copyright (C) 2011 by Benjamin McGregor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

using("IGE");

define("IGE.IGEMovingPlatform").extend("IGEMovableObject").assign({

  //constructor
  IGEMovingPlatform: function(options) {
    this.IGEMovableObject(options);

    return this;
  },

  //destructor
  _IGEMovingPlatform: function() {
    this._IGEMovableObject();
  }
});

unusing("IGE");
/*
Copyright (C) 2011 by Benjamin McGregor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

using("IGE");

//IGECircuitPlatform class deffinition
define("IGE.IGECircuitPlatform").extend("IGEMovingPlatform").assign({

  //constructor
  IGECircuitPlatform: function(options) {
    this.IGEMovingPlatform(options);

    return this;
  },

  //destructor
  _IGECircuitPlatform: function() {
    this._IGEMovingPlatform();
  }
});

unusing("IGE");
/*
Copyright (C) 2011 by Benjamin McGregor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

using("IGE");

//IGERotationalPlatform class definition
define("IGE.IGERotationalPlatform").extend("IGEMovingPlatform").assign({

  //constructor
  IGERotationalPlatform: function(options) {
    this.IGEMovingPlatform(options);

    return this;
  },

  //destructor
  _IGERotationalPlatform: function() {
    this._IGEMovingPlatform();
  }
});

unusing("IGE");
/*
Copyright (C) 2011 by Benjamin McGregor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

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
/*
Copyright (C) 2011 by Benjamin McGregor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

using("IGE");
using("IGE.Graphics");

//IGETimedSector class definition
define("IGETimedSector").extend("IGESector").assign({
  defaults: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    strata: IGEStrata.moderate,
    id: "IGETimedSector"
  },

  //constructor
  IGETimedSector: function(options) {
    this.IGESector(options);

    return this;
  },

  //destructor
  _IGETimedSector: function() {
    this._IGESector();
  }
});

unusing("IGE");
unusing("IGE.Graphics");
