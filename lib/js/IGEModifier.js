
using("IGE.Modification");

define("IGE.Modification.IGEModifier", "abstract").assign({
  duration: null,

  activate: abstractFunction(),

  deactivate: abstractFunction()
});


IGE.Modification.IGEModifier.add = 1;
IGE.Modification.IGEModifier.subtract = 2;
IGE.Modification.IGEModifier.multiply = 3;
IGE.Modification.IGEModifier.divide = 4;
IGE.Modification.IGEModifier.replace = 5;

unusing("IGE.Modification");
