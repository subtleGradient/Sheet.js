// -*- Mode: JavaScript; tab-width: 4; -*-
/*
---
name: Sheet
proivides: Sheet
requires: SheetParser.CSS
...
*/
if (typeof exports == 'undefined') var exports = this;

exports.Sheet = 
function Sheet(cssText){
	if (this instanceof Sheet) this.initialize(cssText);
	else return Sheet.from(cssText)
}

Sheet.from = function(cssText){
	return new Sheet(cssText);
};

Sheet.prototype = {
	
	parser: SheetParser.CSS,
	
	initialize: function(cssText){
		this.cssText = cssText || '';
		this.cssRules = this.parser.parse(this.cssText);
	}
	
};

