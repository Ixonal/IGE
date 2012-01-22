
using("IGE.Exceptions");

define("IGE.Exceptions.IGESoundException").extend("IGEException").assign({
  IGESoundException: function(text, context) {
    this.IGEException(text, context);
  },

  toString: function() {
    return "IGESoundException: " + this.text;
  }
});

unusing("IGE.Exceptions");
