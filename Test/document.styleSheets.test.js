// -*- Mode: JavaScript QUnit; tab-width: 4; -*-

module ("document.styleSheets");

exports ["test document.styleSheets DOM styleSheet"] = API ["DOM styleSheet"] (Sheet.DOM.createSheet);
exports ["test document.styleSheets DOM style attribute"] = API ["DOM style attribute"] (Sheet.DOM.createStyle);

run(exports); // QUnit

