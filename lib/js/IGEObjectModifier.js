
using("IGE");
using("IGE.Modification");

define("IGE.Modification.IGEObjectModifier", "abstract").extend("IGEAreaModifier").assign({
  solidDirsTop: null,
  solidDirsLeft: null,
  solidDirsRight: null,
  solidDirsBottom: null,


  activate: abstractFunction(IGEObject),
  deactivate: abstractFunction(IGEObject)
});

unusing("IGE");
unusing("IGE.Modification");
