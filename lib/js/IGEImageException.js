
using("IGE.Exceptions");

define("IGE.Exceptions.IGEImageException").extend("IGEException").assign({
  IGEImageException: function(text, context) {
    this.IGEException(text, context);
  },

  toString: function() {
    return "IGEImageException: " + this.text;
  }
});

unusing("IGE.Exceptions");