/*
---
proivides: SheetParser.CSS
...
*/
if (typeof SheetParser == 'undefined') SheetParser = {};
SheetParser.CSS = {};


(function(X){
	
	X.parse = function(cssText){
		cssText = String(cssText);
		
		var found,
			cssRule,
			cssRules = {length:0},
			keyIndex = -1,
			regex = this.parser;
		
		regex.lastIndex = 0;
		
		cssRules.cssText = cssText;
		
		while ((found = regex.exec(cssText))){
			cssRules[cssRules.length++] = cssRule = {};
			
			// cssRule.raw = found;
			cssRule.cssText = found[12];
			cssRule.selectorText = found[14];
			
			cssRule.style = {length:0};
			cssRule.style.cssText = found[16];
			
			if (found[17]) {
				delete cssRule.style;
				cssRules[++keyIndex] = found[18];
				cssRules.length = keyIndex + 1;
				cssRules[found[18]] = found[19];
			} else keyIndex = -1;
			
			// avoid an infinite loop on zero-length keys
			if (regex.lastIndex == cssRule.index) ++ regex.lastIndex;
		}
		
		for (var i = -1, l=cssRules.length; i < l; ++i){
			if (!cssRules[i] || !cssRules[i].style || !cssRules[i].style.cssText) continue;
			cssRules[i].style = X.parse(cssRules[i].style.cssText);
		}
		
		return cssRules;
	};
	
	X.at   = x(/\s* @(\w+) (?: \s+ ([^;{]+) | \s* )/);
	X.atRule   = x([X.at, ';']);
	X.keyValue = x(/\s* ([-a-zA-Z0-9]+) : \s* (.*?) (?: ; | (?=\}) | $ )/);
	X.comment  = x(/\/\* \s* ( (?: [^*] | \*(?!\/) )* ) \s* \*\//);
	
	X.selector = x(/\s* ([^\{}]+?) \s*/);
	X.block    = x(/\{ \s* ( (?: [^}] | \{[^}]*\} )* ) \s* \}/);
	
	X.selectorBlock = x([X.selector, X.block], 1);
	X.atBlock  = x([X.at, X.block], 1);
	
	var or = '|';
	
	X.parser = x([
		x(X.comment, 1),
		or,
		x(X.atRule, 1),
		or,
		x(X.atBlock, 1),
		or,
		x(X.selectorBlock, 1),
		or,
		x(X.keyValue, 1)
	]);
	
	function not(regex){
		regex = regex.source || ''+regex;
		return "(?!" + regex + ").";
	}
	
	function x(regex, shouldGroup){
		// console.log(regex);
		if (regex.source) regex = [regex];
		var i, source = '', this_source;
		for (i = 0; i < regex.length; ++i){
			if (!regex[i]) continue;
			this_source = regex[i].source || ''+regex[i];
			source += (shouldGroup?'(':'') + this_source.replace(/\s/g,'') + (shouldGroup?')':'');
		}
		// console.log(source);
		return new RegExp(source,'gm');
	};
	X.combineRegex = x;
	
	
})(SheetParser.CSS);


if (typeof exports == 'undefined') var exports = this;
exports.SheetParser = SheetParser;

