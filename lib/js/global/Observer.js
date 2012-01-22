
//Observer class deffinition
define("General.Notification.Observer", "abstract").assign({

  //a call made to update the observer
  update: function(observable, state) {
    throw Error("Unimplemented update fired.");
  }
});
