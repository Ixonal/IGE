
using("IGE");
using("IGE.Modification");

define("IGE.Modification.IGEMovableObjectModifier", "abstract").extend("IGEObjectModifier").assign({
  accellerationHorizontal: null,
  accellerationVertical: null,
  maxSpeedHorizontal: null,
  maxSpeedVertical: null,
  gravityHorizonal: null,
  gravityVertical: null,

  activate: abstractFunction(IGEMovableObject),
  deactivate: abstractFunction(IGEMovableObject)
});

unusing("IGE");
unusing("IGE.Modification");