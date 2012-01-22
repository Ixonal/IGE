
function IncludeManager() {
  return this.IncludeManager();
}

IncludeManager.prototype = {
  includedFiles: [],
  currentDirectory: ".",

  IncludeManager: function() {
    return this;
  },

  _IncludeManager: function() {
    delete this.includedFiles;
    delete this;
  },

  setCurrentDirectory: function(newDirectory) {
    this.currentDirectory = (typeof(newDirectory)==="string"?newDirectory:this.currentDirectory);
  },

  include: function(filename) {
    if(this.includedFiles[filename]) return false;

    console.log("including the file " + filename);

    var newInclude = document.createElement("script"),
        head = document.getElementsByTagName("head")[0];

console.log(newInclude);

    newInclude.setAttribute("type", "text/javascript");
    newInclude.setAttribute("src", this.currentDirectory + "/" + filename);

    head.appendChild(newInclude);
  return this.includedFiles[filename] = true;
  }
}

var INCLUDE_MANAGER = new IncludeManager();

function include(filename) {
  INCLUDE_MANAGER.include(filename);
}

function includePath(path) {
  INCLUDE_MANAGER.setCurrentDirectory(path);
}