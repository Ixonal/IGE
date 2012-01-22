

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

