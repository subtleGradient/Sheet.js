
exports["test Sheet"] = require("./Sheet.test");

// node.js
if (typeof process != 'undefined') 
	process.exit(require("sg-testrunner").run(exports));

// Narwhal
if (require.main == module)
	require("os").exit(require("test/runner").run(exports));
