/*
---
proivides: SheetParser.CSS
...
*/
if (typeof exports == 'undefined') var exports = this;
if (typeof SheetParser == 'undefined') SheetParser = {};
exports.SheetParser = SheetParser;


SheetParser.CSS = {
	
	KEYS: /[^\{}]+(?=\{)/g,
	
	keys: function(raw){
		raw = String(raw);
		var keys = [];
		
		var regex = this.KEYS;
		regex.lastIndex = 0;
		while (key = regex.exec(raw)) {
			keys.push(key);
			if (regex.lastIndex == key.index) ++ regex.lastIndex;// avoid an infinite loop on zero-length keys
		}
		
		
		return keys;
	}
};
