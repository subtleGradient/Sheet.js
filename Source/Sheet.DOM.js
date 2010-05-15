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
	var div = document.createElement('div');
	div.innerHTML = '<style type="text/css">' + raw + '</style>';
	document.getElementsByTagName('html')[0].appendChild(div);
	return document.styleSheets[document.styleSheets.length - 1];
};

Sheet.DOM.createStyle = function(raw){
	var div = document.createElement('div');
	div.innerHTML = '<div style="' + raw + '"></div>';
	return { style:div.firstChild.style };
};
