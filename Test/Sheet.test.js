// -*- Mode: JavaScript QUnit; tab-width: 4; -*-

if (typeof exports == 'undefined') var exports = {};

// Test Requirements

if (typeof require != 'undefined') {
	// If run from the project root
	require.paths.unshift('Source');
	require.paths.unshift('Test');
	
	if (typeof API == 'undefined')
		var API = require("DOM-styleSheet.api");
	
	if (typeof Sheet == 'undefined')
		var Sheet = require("Sheet").Sheet;
}

// Test

exports ["test Sheet.js | DOM styleSheet"] = 
	API ["DOM styleSheet"] (Sheet);

exports ["test Sheet.js | DOM style attribute"] = 
	API ["DOM style attribute"] (Sheet);
