
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
