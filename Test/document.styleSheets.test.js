if (typeof exports == 'undefined') exports = {};

exports ["test Browser Native (document.styleSheets) DOM styleSheet"] = 
	API ["DOM styleSheet"] (Sheet.DOM.createSheet);

exports ["test Browser Native (document.styleSheets) DOM style attribute"] = 
	API ["DOM style attribute"] (Sheet.DOM.createStyleWrapped);
