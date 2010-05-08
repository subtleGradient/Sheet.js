// -*- Mode: JavaScript; tab-width: 4; -*-
/*
---
name      : Sheet.js
proivides : Sheet
version   : 0.0.3alpha

requires  : SheetParser.CSS

author    : Thomas Aylott
copyright : © 2010 Thomas Aylott
license   : MIT
...
*/

/*<CommonJS>*/
var UNDEFINED = 'undefined';
if (typeof exports == UNDEFINED) var exports = this;
if (typeof require != UNDEFINED)
if (typeof   SheetParser == UNDEFINED) 
	var      SheetParser = 
	require('SheetParser.CSS')
	.        SheetParser;

exports.Sheet = Sheet;
/*</CommonJS>*/


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
		//console.group("Sheet initialize");
		this.cssText = cssText || '';
		this.style = this.rules = this.cssRules = this.parser.parse(this.cssText);
		var self = this;
		//console.groupEnd("Sheet initialize");
	},
	
	update: function(){
		var cssText = '',
			i = -1,
			rule,
			rules = this.style || this.rules || this.cssRules;
		
		//console.group("update cssText");
		//console.log(rules.selectorText);
		//console.log(rules.cssText);
		
		while (rule = rules[++i]){
			if (typeof rule == 'object'){
				// cssRule
				if (this.update) rule.cssText = this.update.call(rule);
				cssText += rule.cssText = rule.selectorText + '{' + rule.cssText + '}';
			} else {
				// style key/value
				cssText += rule + ':';
				cssText += rules[rule] + ';';
			}
		}
		
		//console.log(rules.cssText);
		//console.groupEnd("update cssText");
		
		if (rules.selectorText)
			return rules.cssText = rules.selectorText + '{' + cssText + '}';
		return rules.cssText = cssText;
	}
	
};

Sheet.prototype.toString = Sheet.prototype.update;
