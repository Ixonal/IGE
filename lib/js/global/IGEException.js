
define("IGE.Exceptions.IGEException").assign({
  text: null,
  context: null,

  IGEException: function(text, context) {
    this.text = text;
    this.context = typeof(context)==="object"?context:null;
  },

  toString: function() {
    return "IGEException: " + this.text;
  },

  getContext: function() {
    return this.context;
  }
});
