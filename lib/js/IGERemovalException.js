
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
