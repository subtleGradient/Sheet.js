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

if (typeof Sheet == 'undefined') var Sheet = {};
if (Sheet.DOM == null) Sheet.DOM = {};

Sheet.DOM.createSheet = function(raw){
	var oldLength = document.styleSheets.length;
	
	if (document.createStyleSheet){
		document.createStyleSheet();
		document.styleSheets[document.styleSheets.length - 1].cssText = raw;
	}
	
	if (oldLength >= document.styleSheets.length){
		var style = document.createElement('style');
		style.setAttribute('type','text/css');
		style.appendChild(document.createTextNode(raw));
		document.getElementsByTagName('head')[0].appendChild(style);
	}
	
	if (oldLength >= document.styleSheets.length){
		var style = document.createElement('div');
		style.innerHTML = '<style type="text/css">' + raw + '</style>';
		document.getElementsByTagName('head')[0].appendChild(style);
	}
	
	if (oldLength >= document.styleSheets.length)
		throw new Error('no styleSheet added :(');
	
	var sheet = document.styleSheets[document.styleSheets.length - 1];
	sheet.cssText = raw;
	
	return sheet;
};

// Sheet.DOM.createSheet = function(raw){
// 	var style = document.createElement('style');
// 	style.setAttribute('type','text/css');
// 	style.appendChild(document.createTextNode(raw));
// 	document.getElementsByTagName('head')[0].appendChild(style);
// 	
// 	return document.styleSheets[document.styleSheets.length - 1];
// };

Sheet.DOM.createStyle = function(raw){
	var div = document.createElement('div');
	div.innerHTML = '<div style="' + raw + '"></div>';
	return { style:div.firstChild.style };
};
