
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
