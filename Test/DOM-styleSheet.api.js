// -*- Mode: JavaScript QUnit; tab-width: 4; -*-

function normalizeCSSText(string){
	return String(string).replace(/[ \t\n]+/g,'').replace(/;(?=})/g,'');
}
function matchesMock(actual, expected, errorMessage){
	if (typeof expected == "string"){
		equal(normalizeCSSText(actual), normalizeCSSText(expected), errorMessage);
		return;
	}
	
	if (typeof expected != "object"){
		equal(actual, expected, errorMessage);
		return;
	}
	
	equal("length" in actual, "length" in expected, errorMessage + " same length");
	if ("length" in expected && + expected.length){
		equal(actual.length, expected.length, errorMessage);
	}
	
	if (typeof expected == 'string')
		equal(normalizeCSSText(actual), normalizeCSSText(expected), errorMessage);
	
	if (typeof expected == 'object')
	for (var property in expected){
		matchesMock(actual[property], expected[property], property);
	}
}



if (typeof API != 'object') var API = {};
API ["DOM styleSheet"] = function(newSheet){
	
	test ('Exists',function(){ok( newSheet )})
	
	test ('new sheet conforms to basic api',function(){
		
		var sheet = newSheet(SHEET_MOCK_1.raw);
		ok(sheet, "must actually create a sheet");
		console.log(sheet);
		
		matchesMock(sheet, SHEET_MOCK_1.parsed)
	})
	
	
}


// Mocks

var SHEET_MOCK_1 = {
	
	raw:"#selector { color: green; background-color: rgb(0, 255, 0); } #selector2 { color: blue; background-color: rgb(128, 0, 128); }",
	
	parsed:{
		cssRules:[
			{
				cssText: "#selector { color: green; background-color: rgb(0, 255, 0); }",
				
				selectorText: "#selector",
				style: {
					cssText: "color: green; background-color: rgb(0, 255, 0); ",
					
					"color":"green",
					"background-color":"rgb(0, 255, 0)",
					
					0: "color",
					1: "background-color",
					length: 2
				}
			},
			{
				cssText: "#selector2 { color: blue; background-color: rgb(128, 0, 128); }",
				
				selectorText: "#selector2",
				style: {
					cssText: "color: blue; background-color: rgb(128, 0, 128); ",
					
					"color":"blue",
					"background-color":"rgb(128, 0, 128)",
					
					0: "color",
					1: "background-color",
					length: 2
				}
			}
		]
	}
	
};

