
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
