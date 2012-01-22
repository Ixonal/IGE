
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
