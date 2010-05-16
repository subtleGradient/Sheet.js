/*
---
name    : SheetParser.CSS

authors   : Thomas Aylott
copyright : © 2010 Thomas Aylott
license   : MIT

provides : SheetParser.CSS
...
*/

if (typeof SheetParser == 'undefined') SheetParser = {};
SheetParser.CSS = {};

/*<CommonJS>*/
if (typeof exports == 'undefined') var exports = this;
exports.SheetParser = SheetParser;
/*</CommonJS>*/

(function(X){
	
	X.camelCase = function(string){
		return String(string).replace(camelCaseSearch, camelCaseReplace);
	};
	var camelCaseSearch = /-\D/g;
	function camelCaseReplace(match){
		return match.charAt(1).toUpperCase();
	}
	
	X.parse = function(cssText){
		var found,
			rule,
			rules = {length:0},
			keyIndex = -1,
			regex = this.parser,
			names = X.parser.names,
			i,l,r,
			ruleCount;
		
		rules.cssText = cssText = String(cssText);
		
		regex.lastIndex = 0;
		while ((found = regex.exec(cssText))){
			// avoid an infinite loop on zero-length keys
			if (regex.lastIndex == found.index) ++ regex.lastIndex;
			
			// key:value
			if (found[names._key]){
				rules[rules.length ++] = found[names._key];
				rules[found[names._key]] = found[names._value];
				rules[X.camelCase(found[names._key])] = found[names._value];
				continue;
			}
			
			rules[rules.length++] = rule = {};
			for (i = -1, l = names.length; i < l; ++i){
				if (!found[i]) continue;
				rule[names[i-1]] = found[i];
			}
		}
		
		for (i = -1, l = rules.length; i < l; ++i){
			if (!rules[i] || !rules[i].style_cssText) continue;
			
			rules[i].style = X.parse(rules[i].style_cssText);
			
			for (ruleCount = -1, r = -1, rule; rule = rules[i].style[++r];){
				if (typeof rule == 'string') continue;
				rules[i][r] = (rules[i].cssRules || (rules[i].cssRules = {}))[++ ruleCount]  = rule;
				rules[i].cssRules.length = ruleCount + 1;
				rules[i].rules = rules[i].cssRules;
			}
		}
		
		return rules;
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
		if (regex.source) regex = [regex];
		
		var names = [], i, source = '', this_source;
		
		for (i = 0; i < regex.length; ++i){ if (!regex[i]) continue;
			this_source = regex[i].source || ''+regex[i];
			if (this_source == OR) source += OR;
			else {
				source += (group?'(':'') + this_source.replace(/\s/g,'') + (group?')':'');
				if (group) names.push(group);
			}
			if (regex[i].names)	names = names.concat(regex[i].names);
		}
		regex = new RegExp(source,'gm');
		// [key] → 1
		for (i = -1; i < names.length; ++i) names[names[i]] = i + 1;
		// [1] → key
		regex.names = names;
		return regex;
	};
	X.combineRegex = x;
	
	
})(SheetParser.CSS);
