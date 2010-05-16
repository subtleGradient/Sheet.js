if (typeof exports == 'undefined') var exports = {};

exports ["test (document.styleSheets) DOM styleSheet"] = 
	API ["DOM styleSheet"] (Sheet.DOM.createSheet);

exports ["test (document.styleSheets) DOM style attribute"] = 
	API ["DOM style attribute"] (Sheet.DOM.createStyle);
