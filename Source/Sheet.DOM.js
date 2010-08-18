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

Sheet.DOM.createSheet = function(raw){
	var	oldLength = styleSheets.length
	,	style
	,	sheet
	
	if (document.createStyleSheet){
		document.createStyleSheet()
		styleSheets[styleSheets.length - 1].cssText = raw
	}
	
	if (oldLength >= styleSheets.length){
		style = document.createElement('style')
		style.setAttribute('type','text/css')
		style.appendChild(document.createTextNode(raw))
		document.getElementsByTagName('head')[0].appendChild(style)
	}
	
	if (oldLength >= styleSheets.length){
		style = document.createElement('div')
		style.innerHTML = '<style type="text/css">' + String_escapeHTML.call(raw) + '</style>'
		document.getElementsByTagName('head')[0].appendChild(style)
	}
	
	if (oldLength >= styleSheets.length)
		throw new Error('no styleSheet added :(')
	
	sheet = styleSheets[styleSheets.length - 1]
	sheet.cssText = raw
	
	return sheet
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
