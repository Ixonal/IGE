
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