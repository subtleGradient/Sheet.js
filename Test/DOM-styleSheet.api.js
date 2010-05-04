// -*- Mode: JavaScript QUnit; tab-width: 4; -*-

function normalizeCSSText(string){
	return String(string).replace(/[ \t\n]+/g,'').replace(/;($|(?=}))/g,'');
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
	
	test ("DOM styleSheet: Exists",function(){ok( newSheet )})
	
	test ('DOM styleSheet: new sheet conforms to basic api',function(){
		
		var sheet = newSheet(SHEET_MOCK_1.raw);
		
		ok(sheet, "must actually create a sheet");
		// console.log(sheet);
		
		console.log(sheet, SHEET_MOCK_1.parsed)
		matchesMock(sheet, SHEET_MOCK_1.parsed)
	})
	
	test ('DOM styleSheet: updating values updates cssText',function(){
		
		var style = '#selector{color:green}';
		var sheet = newSheet(style);
		
		equal(sheet.cssRules[0].style.color, 'green');
		matchesMock(sheet.cssRules[0].cssText, style);
		
		sheet.cssRules[0].style.color = 'blue';
		equal(sheet.cssRules[0].style.color, 'blue');
		
		sheet.toString();
		
		matchesMock(sheet.cssRules[0].cssText.toString(), '#selector{color:blue}');
		matchesMock(''+sheet.cssRules[0].cssText, '#selector{color:blue}');
	})
	
};


API ["DOM style attribute"] = function(newStyle){
	
	test ('DOM style attribute: Exists',function(){ok( newStyle )})
	
	test ('DOM style attribute: new sheet conforms to basic api',function(){
		
		var sheet = newStyle(STYLE_MOCK_1.raw);
		ok(sheet, "must actually create a style");
		console.log(sheet);
		
		matchesMock(sheet, STYLE_MOCK_1.parsed)
	})
	
	test ('DOM style attribute: updating values updates cssText',function(){
		
		var style = 'color:green';
		var sheet = newStyle(style);
		
		equal(sheet.style.color, 'green');
		matchesMock(sheet.style.cssText, style);
		
		sheet.style.color = 'blue';
		equal(sheet.style.color, 'blue');
		
		sheet.toString();
		
		matchesMock(sheet.style.cssText.toString(), 'color:blue');
		matchesMock(''+sheet.style.cssText, 'color:blue');
		
	})
	
};


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

var STYLE_MOCK_1 = {
	
	raw:"color: green; background-color: rgb(0, 255, 0);",
	
	parsed:{
		style:{
			cssText: "color: green; background-color: rgb(0, 255, 0);",
			
			0: "color",
			1: "background-color",
			length: 2,
			
			"color" : "green",
			"background-color" : "rgb(0, 255, 0)"
		}
	}
	
};

