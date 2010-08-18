/*
---
name    : SheetParser.CSS

authors   : Thomas Aylott
copyright : © 2010 Thomas Aylott
license   : MIT

provides : SheetParser.CSS
requires : combineRegExp
...
*/
;(function(exports){
	

/*<depend>*/
var UNDEF = {undefined:1}
if (!exports.SheetParser) exports.SheetParser = {}

/*<CommonJS>*/
var combineRegExp = UNDEF[typeof require]
	?	exports.combineRegExp
	:	require('./sg-regex-tools').combineRegExp
var SheetParser = exports.SheetParser
/*</CommonJS>*/

/*<debug>*/;if (UNDEF[typeof combineRegExp]) throw new Error('Missing required function: "combineRegExp"');/*</debug>*/
/*</depend>*/


var CSS = SheetParser.CSS = {version: '1.0.1'}

CSS.camelCase = function(string){
	return ('' + string).replace(camelCaseSearch, camelCaseReplace)
}
var camelCaseSearch = /-\D/g
function camelCaseReplace(match){
	return match.charAt(1).toUpperCase()
}

CSS.parse = function(cssText){
	var	found
	,	rule
	,	rules = {length:0}
	,	keyIndex = -1
	,	regex = this.parser
	,	names = CSS.parser.names
	,	i,r,l
	,	ruleCount
	
	rules.cssText = cssText = ('' + cssText)
	
	regex.lastIndex = 0
	while ((found = regex.exec(cssText))){
		// avoid an infinite loop on zero-length keys
		if (regex.lastIndex == found.index) ++ regex.lastIndex
		
		// key:value
		if (found[names._key]){
			rules[rules.length ++] = found[names._key]
			rules[found[names._key]] = found[names._value]
			rules[CSS.camelCase(found[names._key])] = found[names._value]
			continue
		}
		
		rules[rules.length++] = rule = {}
		for (i = -1, l = names.length; i < l; ++i){
			if (!found[i]) continue
			rule[names[i-1]] = found[i]
		}
	}
	
	for (i = -1, l = rules.length; i < l; ++i){
		if (!rules[i] || !rules[i].style_cssText) continue
		
		rules[i].style = CSS.parse(rules[i].style_cssText)
		
		for (ruleCount = -1, r = -1, rule; rule = rules[i].style[++r];){
			if (typeof rule == 'string') continue
			rules[i][r] = (rules[i].cssRules || (rules[i].cssRules = {}))[++ ruleCount]  = rule
			rules[i].cssRules.length = ruleCount + 1
			rules[i].rules = rules[i].cssRules
		}
	}
	
	return rules
}

var x = combineRegExp

;(CSS.at = x(/\s*(@[-a-zA-Z0-9]+)\s+([^;{]*)/))
.names=[         'kind',              'name']

CSS.atRule = x([CSS.at, ';'])

;(CSS.keyValue = x(/\s*([-a-zA-Z0-9]+):\s*(.*?)(?:;|(?=\})|$)/))
.names=[               '_key',               '_value']

;(CSS.comment = x(/\/\*\s*((?:[^*]|\*(?!\/))*)\s*\*\//))
.names=[                   'comment']

;(CSS.selector = x(/\s*((\d+%)|[^\{}]+?)\s*/))
.names=[               'selectorText','keyText']

;(CSS.block = x(/\{\s*((?:[^{}]|\{(?:[^{}]|\{(?:[^{}]|\{(?:[^{}]|\{[^{}]*\})*\})*\})*\})*)\s*\}/))
.names=[               'style_cssText']

CSS.selectorBlock = x([CSS.selector, CSS.block])

CSS.atBlock = x([CSS.at, CSS.block])

var OR = '|'

CSS.parser = x([
	x(CSS.comment)
	,OR
	,x(CSS.atBlock)
	,OR
	,x(CSS.atRule)
	,OR
	,x(CSS.selectorBlock)
	,OR
	,x(CSS.keyValue)
],'cssText')


})(typeof exports != 'undefined' ? exports : this);
