/*
---
name : Sheet.DOM
description : Sheet.DOM adds some handy stuff for working with the browser's native CSS capabilities.

authors   : Thomas Aylott
copyright : © 2010 Thomas Aylott
license   : MIT

provides : Sheet.DOM
...
*/
;(function(document,styleSheets){

if (typeof Sheet == 'undefined') Sheet = {}
if (Sheet.DOM == null) Sheet.DOM = {}

Sheet.DOM.createSheet = createStyleSheetWithCSS
function createStyleSheetWithCSS(css){
	var styleElement = document.createElement("style")
	styleElement.appendChild(document.createTextNode(css))
	styleElement.setAttribute('name', styleElement.id = "SheetRuler-" + +new Date)
	document.getElementsByTagName('head')[0].appendChild(styleElement)

	return styleElement.sheet || styleElement.styleSheet
}

Sheet.DOM.createStyle = function(raw){
	var div = document.createElement('div')
	div.innerHTML = '<p style="' + String_escapeHTML.call(raw) + '"></p>'
	return {style:div.firstChild.style}
}

function String_escapeHTML(){
	return ('' + this).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;')
}


}(document, document.styleSheets));
