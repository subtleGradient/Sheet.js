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
function Sheet(sheet){
	if (this instanceof Sheet) this.initialize(sheet);
	else Sheet.from(sheet)
}

Sheet.from = function(sheet){
	return new Sheet(sheet);
};

Sheet.prototype = {
	
	parser: SheetParser.CSS,
	
	initialize: function(sheet){
		this.raw = sheet || ''
	},
	
	getKeys: function(){
		return this.parser.keys(this.raw);
	}
	
};

