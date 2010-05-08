/*
---
name      : SheetParser.CSS
proivides : SheetParser.CSS
version   : 0.0.3alpha

author    : Thomas Aylott
copyright : © 2010 Thomas Aylott
license   : MIT Style
...
*/

if (typeof SheetParser == 'undefined') SheetParser = {};
SheetParser.CSS = {};


(function(X){
	
	X.parse = function(cssText){
		var found,
			cssRule,
			cssRules = {length:0},
			keyIndex = -1,
			regex = this.parser,
			names = X.parser.names;
		
		cssRules.cssText = cssText = String(cssText);
		
		regex.lastIndex = 0;
		while ((found = regex.exec(cssText))){
			//console.log(found);
			
			if (found[names._key]){
				
				cssRules[cssRules.length++] = found[names._key];
				cssRules[found[names._key]] = found[names._value];
				
			} else {
				cssRules[cssRules.length++] = cssRule = {};
				for (var i = -1, l=names.length; i < l; ++i){
					if (!found[i]) continue;
					cssRule[names[i-1]] = found[i];
				}
			}
			//console.log(cssRule);
			
			// avoid an infinite loop on zero-length keys
			if (regex.lastIndex == found.index) ++ regex.lastIndex;
		}
		
		for (var i = -1, l=cssRules.length; i < l; ++i){
			if (!cssRules[i] || !cssRules[i].style_cssText) continue;
			//console.group(cssRules[i].style_cssText);
			
			cssRules[i].style = X.parse(cssRules[i].style_cssText);
			
			for (var rulesAdded = -1, r = -1, cssRule; cssRule = cssRules[i].style[++r];){
				//console.log('add cssRule from style to cssRules?',cssRule)
				if (typeof cssRule == 'string') continue;
				cssRules[i][r] = (cssRules[i].cssRules || (cssRules[i].cssRules = {}))[++ rulesAdded]  = cssRule;
				cssRules[i].cssRules.length = rulesAdded + 1;
			}
			
			//console.log('style',cssRules[i].style);
			//console.log('cssRules',cssRules[i].cssRules);
			//console.groupEnd(cssRules[i].style_cssText);
		}
		
		return cssRules;
	};
	
	(X.at = x(/\s* (@[-a-zA-Z0-9]+) \s+ ( [^;{]* )/)).names = 
	[              'kind',    'name'];
	
	X.atRule = x([X.at, ';']);
	
	(X.keyValue = x(/\s* ([-a-zA-Z0-9]+) : \s* (.*?) (?: ; | (?=\}) | $ )/)).names = 
	[                    '_key',               '_value'];
	
	(X.comment = x(/\/\* \s* ( (?: [^*] | \*(?!\/) )* ) \s* \*\//)).names = 
	[                        'comment'];
	
	(X.selector = x(/\s* ((\d+%)|[^\{}]+?) \s*/)).names = 
	[                    'selectorText','keyText'];
	
	(X.block = x(/\{ \s* ( (?: [^{}] | \{   (?: [^{}] | \{   (?: [^{}] | \{   (?: [^{}] | \{[^{}]*\} )*   \} )*   \} )*   \} )* ) \s* \}/)).names = 
	[                    'style_cssText'];
	
	X.selectorBlock = x([X.selector, X.block]);
	
	X.atBlock = x([X.at, X.block]);
	
	var OR = '|';
	
	X.parser = x([
		x(X.comment),
		OR,
		x(X.atBlock),
		OR,
		x(X.atRule),
		OR,
		x(X.selectorBlock),
		OR,
		x(X.keyValue)
	],'cssText');
	
	function x(regex, group){
		// console.log(regex);
		if (regex.source) regex = [regex];
		
		var names = [], i, source = '', this_source;
		
		//console.log(names)
		for (i = 0; i < regex.length; ++i){ if (!regex[i]) continue;
			this_source = regex[i].source || ''+regex[i];
			if (this_source == OR) source += OR;
			else {
				source += (group?'(':'') + this_source.replace(/\s/g,'') + (group?')':'');
				if (group) names.push(group);
			}
			if (regex[i].names)	names = names.concat(regex[i].names);
			//console.log(names);
		}
		// console.log(source);
		regex = new RegExp(source,'gm');
		for (var i = -1; i < names.length; ++i) names[names[i]] = i + 1; // [key] → 1
		regex.names = names; // [1] → key
		// console.log(names);
		return regex;
	};
	X.combineRegex = x;
	
	
})(SheetParser.CSS);

/*<CommonJS>*/
if (typeof exports == 'undefined') var exports = this;
exports.SheetParser = SheetParser;
/*</CommonJS>*/
