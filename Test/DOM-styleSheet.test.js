// -*- Mode: JavaScript QUnit; tab-width: 4; -*-

module ("document.styleSheets")
API ["DOM styleSheet"] (function(raw){
	
	var div = document.createElement('div');
	
	div.innerHTML = '<style type="text/css">' + raw + '</style>';
	
	console.log(div.innerHTML);
	
	document.getElementsByTagName('html')[0].appendChild(div);
	
	return document.styleSheets[document.styleSheets.length - 1];
})

