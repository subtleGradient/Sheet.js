// -*- Mode: JavaScript QUnit; tab-width: 4; -*-

// Bootstrap testing
if (typeof assert == 'undefined' && typeof require != 'undefined') {
	require.paths.push('Test/lib');
	var assert = require('assert');
	var ok = assert.ok;
	var equal = assert.equal;

	if (typeof	test === 'undefined')
		var		test = require('SG-Assert-Helpers')
		.		test;
}

if (typeof API != 'object') var API = {};
if (typeof exports == 'undefined') var exports = this;
else API = exports;


API ["DOM styleSheet"] = function(newSheet){
	var I = {};
	
	I ["test DOM styleSheet: Exists"] = function(){ok( newSheet )}
	
	I ["test DOM styleSheet: new sheet conforms to basic api"] = function(){
		
		var sheet = newSheet(SHEET_MOCK_1.raw);
		
		ok(sheet, "must actually create a sheet");
		//console.log(sheet);
		
		//console.log(sheet, SHEET_MOCK_1.parsed)
		matchesMock(sheet, SHEET_MOCK_1.parsed)
	}
	
	I ["test DOM styleSheet: webkit animation"] = function(){
		
		var sheet = newSheet(WEBKIT_ANIMATION_MOCK_1.raw);
		
		ok(sheet, "must actually create a sheet");
		// console.log(sheet);
		
		//console.log(sheet.cssRules[0], WEBKIT_ANIMATION_MOCK_1.parsed.cssRules[0])
		matchesMock(sheet, WEBKIT_ANIMATION_MOCK_1.parsed)
	}
	
	I ["test DOM styleSheet: updating values updates cssText"] = function(){
		
		var style = '#selector{color:green}';
		var sheet = newSheet(style);
		
		equal(sheet.cssRules[0].style.color, 'green');
		matchesMock(sheet.cssRules[0].cssText, style);
		
		sheet.cssRules[0].style.color = 'blue';
		equal(sheet.cssRules[0].style.color, 'blue');
		
		sheet.toString();
		
		matchesMock(sheet.cssRules[0].cssText.toString(), '#selector{color:blue}');
		matchesMock(''+sheet.cssRules[0].cssText, '#selector{color:blue}');
	}
	
	return I;
};

API ["DOM style attribute"] = function(newStyle){
	var I = {};
	
	I ["test DOM style attribute: Exists"] = function(){ok( newStyle )}
	
	I ["test DOM style attribute: new sheet conforms to basic api"] = function(){
		
		var sheet = newStyle(STYLE_MOCK_1.raw);
		ok(sheet, "must actually create a style");
		//console.log(sheet);
		
		matchesMock(sheet, STYLE_MOCK_1.parsed)
	}
	
	I ["test DOM style attribute: updating values updates cssText"] = function(){
		
		var style = 'color:green';
		var sheet = newStyle(style);
		
		equal(sheet.style.color, 'green');
		matchesMock(sheet.style.cssText, style);
		
		sheet.style.color = 'blue';
		equal(sheet.style.color, 'blue');
		
		sheet.toString();
		
		matchesMock(sheet.style.cssText.toString(), 'color:blue');
		matchesMock(''+sheet.style.cssText, 'color:blue');
		
	}
	
	return I;
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

var WEBKIT_ANIMATION_MOCK_1 = {
	
	raw:'\
@-webkit-keyframes my-animation {\
	0% { background-color:blue }\
	100% { background-color:green }\
}\
',
	
	parsed:{
		cssRules:{
			length:1,
			0:{//WebKitCSSKeyframesRule
				// type:8,

				name:"my-animation",

				cssText:'@-webkit-keyframes my-animation { 0% { background-color:blue } 100% { background-color:green } }',

				cssRules:{
					length:2,
					0:{//WebKitCSSKeyframeRule
						// type:9,
						cssText: "0% { background-color: blue; }",
						keyText: "0%",
						style: {
							cssText: "background-color: blue; ",
							length: 1,
							0: "background-color",
							"background-color": "blue"
						}
					},
					1:{//WebKitCSSKeyframeRule
						// type:9,
						cssText: "100% { background-color: green; }",
						keyText: "100%",
						style: {
							cssText: "background-color: green; ",
							length: 1,
							0: "background-color",
							"background-color": "green"
						}
					}
				},

				// length:2,
				0:{//WebKitCSSKeyframeRule
					// type:9,
					cssText: "0% { background-color: blue; }",
					keyText: "0%",
					style: {
						cssText: "background-color: blue; ",
						length: 1,
						0: "background-color",
						"background-color": "blue"
					}
				},
				1:{//WebKitCSSKeyframeRule
					// type:9,
					cssText: "100% { background-color: green; }",
					keyText: "100%",
					style: {
						cssText: "background-color: green; ",
						length: 1,
						0: "background-color",
						"background-color": "green"
					}
				}

			}
		}
	}
	
};



// Local testing sugar

if (typeof	normalizeCSSText === 'undefined')
	var		normalizeCSSText = require('SG-Assert-Helpers')
	.		normalizeCSSText;

if (typeof	matchesMock === 'undefined')
	var		matchesMock = require('SG-Assert-Helpers')
	.		matchesMock;
