// -*- Mode: JavaScript QUnit; tab-width: 4; -*-

if (typeof exports == 'undefined') exports = {};

// Test Requirements

if (typeof require != 'undefined') {
	// If run from the project root
	
	if (typeof API == 'undefined')
		var API = require("./DOM-styleSheet.api");
	
	if (typeof Sheet == 'undefined')
		var Sheet = require("../Source/Sheet").Sheet;
}

// Test

exports ["test Sheet.js | DOM styleSheet"] = 
	API ["DOM styleSheet"] (Sheet);

exports ["test Sheet.js | DOM style attribute"] = 
	API ["DOM style attribute"] (Sheet);

  Object.keys(exports).forEach(function(moduleName){
    console.log(moduleName)
    Object.keys(exports[moduleName]).forEach(function(testName){
      console.log(testName)
      exports[moduleName][testName]()
    })
  })
