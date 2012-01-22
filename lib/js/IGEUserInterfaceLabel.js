
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
