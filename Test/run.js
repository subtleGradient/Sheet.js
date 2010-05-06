
exports["test Sheet"] = require("./Sheet.test");

if (require.main == module.id)
	require("os").exit(require("test/runner").run(exports));

if ('.' == module.id)
	process.exit(require("sg-testrunner").run(exports));
