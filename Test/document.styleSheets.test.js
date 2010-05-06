// -*- Mode: JavaScript QUnit; tab-width: 4; -*-

module ("document.styleSheets");

exports ["test document.styleSheets DOM styleSheet"] = API ["DOM styleSheet"] (createSheet);
exports ["test document.styleSheets DOM style attribute"] = API ["DOM style attribute"] (createStyle);

run(exports); // QUnit



function createSheet(raw){
	var div = document.createElement('div');
	
	div.innerHTML = '<style type="text/css">' + raw + '</style>';
	
	//console.log(div.innerHTML);
	
	document.getElementsByTagName('html')[0].appendChild(div);
	
	return document.styleSheets[document.styleSheets.length - 1];
}

function createStyle(raw){
	var div = document.createElement('div');
	
	div.innerHTML = '<div style="' + raw + '"></div>';
	
	//console.log(div.innerHTML);
	
	return { style:div.firstChild.style };
}

