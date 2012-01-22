
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
