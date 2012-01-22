
using("IGE.Exceptions");

define("IGE.Exceptions.IGEUnimplementedException").extend("IGEException").assign({
  IGEUnimplementedException: function(text, context) {
    this.IGEException(text, context);
  },

  toString: function() {
    return "IGEUnimplementedException: " + this.text + 
           (typeof(this.context) === "object"?": " + this.context.constructor.name:"");
  }
});

unusing("IGE.Exceptions");
