
using("IGE");
using("IGE.Graphics");

define("IGE.IGEConsole").extend("IGEArea").assign({
  defaults: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    strata: IGEStrata.moderate,
    panel: "DEFAULT",
    id: "IGEConsole"
  },

  IGEConsole: function(options) {
    var _this = this,
        panel;

    _this.IGEArea(options);

    _this.getDisplayElement().addClass("IGEConsole");
    _this.getDisplayElement().css("overflow", "scroll");
    _this.getDisplayElement().css("z-index", "3");
    _this.getDisplayElement().fadeTo(0, .75);

    if(typeof(options.panel) === "string") {
      panel = getIGEPanel(options.panel);
    } else if(typeof(options.panel) === "object" && options.panel.IGEPanel) {
      panel = options.panel;
    } else {
      throw new IGEInvalidTypeException("IGEConsole requires a panel attribute as either an IGEPanel object or string id.", _this);
    }

    if(panel) {
      panel.getDisplayElement().append(_this.getDisplayElement());
    } else {
      throw new IGEInvalidTypeException("No panel could be located matching the given criteria.", _this);
    }

    return _this;
  },

  _IGEConsole: function() {
    
  },

  log: function(message) {
    this.message(message, "log");
  },

  info: function(message) {
    this.message(message, "info");
  },

  warning: function(message) {
    this.message(message, "warning");
  },

  error: function(message) {
    this.message(message, "error");
  },

  message: function(message, type) {
    var _this = this,
        newMessage = $(document.createElement("div"));

    newMessage.addClass("message").addClass(type);
    newMessage.html("<span class=\"" + type + "\">" + type + ": </span>" + message + "<br/>");

    _this.getDisplayElement().append(newMessage);
    _this.getDisplayElement().scrollTop(999999);
  }
});

unusing("IGE");
unusing("IGE.Graphics");
