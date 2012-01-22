
using("IGE");
using("IGE.Modification");

define("IGE.Modification.IGECharacterModifier", "abstract").extend("IGEMovableObjectModifier").assign({
  //list of attributes that can be altered
  //while the modifier is active
  //  these properties take an object containing a type and value
  //  EX: gravityVertical: {type: IGECharacterModifier.replace, value: -1}
  //  that would invert gravity as long as the character had that modifier
  //----------------------------------------//\
  maxHitpoints: null,
  currentHitpoints: null,
  //----------------------------------------//

  //things to do when the modifier is activated (added)
  activate: abstractFunction(IGECharacter),

  //things to do when the modifier is deactivated (removed)
  deactivate: abstractFunction(IGECharacter)
});

unusing("IGE");
unusing("IGE.Modification");
