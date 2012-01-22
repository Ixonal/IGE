
using("IGE.Exceptions");

define("IGE.Exceptions.IGEInvalidIdException").extend("IGEException").assign({
  IGEInvalidIdException: function(text, context) {
    this.IGEException(text, context);
  },

  toString: function() {
    return "IGEInvalidIdException: " + this.text;
  }
});

unusing("IGE.Exceptions");
