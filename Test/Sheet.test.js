// -*- Mode: JavaScript QUnit; tab-width: 4; -*-

if (typeof exports == 'undefined') var exports = this;

// If run from the project root
if (typeof require != 'undefined') {
	if (typeof print === 'undefined') var print = require('sys').print;
	require.paths.push('Source');
	require.paths.push('Test');
	require.paths.push('Test/lib');
}

// requirements
if (typeof API === 'undefined') var API = require("./DOM-styleSheet.api");
if (typeof Sheet === 'undefined') var Sheet = require("Sheet").Sheet;


if (typeof QUnit != 'undefined') QUnit.module ("new Sheet with string")
exports ["test DOM styleSheet"] = API ["DOM styleSheet"] (Sheet);
exports ["test DOM style attribute"] = API ["DOM style attribute"] (Sheet);


if (typeof run == 'undefined'){
	if (require.main == module.id) // Narwhal
		require("os").exit(require("test/runner").run(exports));
	if ('.' == module.id) // Node.js
		process.exit(require("sg-testrunner").run(exports));
} else run(exports); // QUnit


if (typeof QUnit != 'undefined') QUnit.module ("");
