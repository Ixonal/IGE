
using("IGE");
using("IGE.Modification");

define("IGE.Modification.IGEAreaModifier", "abstract").extend("IGEModifier").assign({
  x: null,
  y: null,
  width: null,
  height: null,
  frictionHorizontal: null,
  frictionVertical: null,

  activate: abstractFunction(IGEArea),
  deactivate: abstractFunction(IGEArea)
});

unusing("IGE");
unusing("IGE.Modification");
