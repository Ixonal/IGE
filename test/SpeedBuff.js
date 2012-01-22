
using("IGE");
using("IGE.Modification");

define("SpeedBuff").extend("IGEBuff").assign({
  accellerationHorizontal: {type: IGEModifier.multiply, value: 1.25},
  maxSpeedHorizontal: {type: IGEModifier.multiply, value: 1.25},

  activate: function(character) {
    if(typeof(character) !== "object" || !character.IGECharacter) {
      throw new IGEInvalidTypeException("activate takes an IGECharacter object.", this);
    }

    character.displayInfo("speed buff has been activated on " + character.id);
  },

  deactivate: function(character) {
    if(typeof(character) !== "object" || !character.IGECharacter) {
      throw new IGEInvalidTypeException("activate takes an IGECharacter object.", this);
    }

    character.displayInfo("speed buff has been deactivated on " + character.id);
  },

  toString: function() {
    return "Doubles max speed and accelleration";
  }
});

unusing("IGE");
unusing("IGE.Modification");
