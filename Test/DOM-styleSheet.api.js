// -*- Mode: JavaScript QUnit; tab-width: 4; -*-

// Requires

/*<CommonJS>*/
if (typeof assert == 'undefined' && typeof require != 'undefined') {
	var assert = require('assert');

	if (typeof	test == 'undefined')
		var		test = require('./lib/SG-Assert-Helpers')
		.		test;
}
/*</CommonJS>*/

var ok = assert.ok;
var equal = assert.equal;

// Local testing sugar

if (typeof	normalizeCSSText == 'undefined')
	var		normalizeCSSText = require('./lib/SG-Assert-Helpers')
	.		normalizeCSSText;

if (typeof	matchesMock == 'undefined')
	var		matchesMock = require('./lib/SG-Assert-Helpers')
	.		matchesMock;

// API

if (typeof API != 'object') var API = {};
if (typeof exports == 'undefined') exports = this;
else API = exports;


API ["DOM styleSheet"] = function(newSheet){
	if (!newSheet) throw new Error("API test requires passing a newSheet function");
	
	var I = {};
	
	I ["test Exists"] = function(){ok( newSheet )}
	
	I ["test new sheet conforms to basic api"] = function(){
		
		var sheet = newSheet(CSS_MOCK.raw);
		if (!sheet.cssRules) sheet.cssRules = sheet.rules;
		
		ok(sheet, "must actually create a sheet");
		
		matchesMock(sheet, CSS_MOCK.parsed)
	}
	
	I ["test webkit animation"] = function(){
		
		var sheet = newSheet(WEBKIT_ANIMATION_MOCK_1.raw);
		if (!sheet.cssRules) sheet.cssRules = sheet.rules;
		
		ok(sheet, "must actually create a sheet");
		
		matchesMock(sheet, WEBKIT_ANIMATION_MOCK_1.parsed)
	}

	I ["test CSS rules inside strings"] = function(){

		var sheet = newSheet(CONTENT_MOCK_1.raw);
		if (!sheet.cssRules) sheet.cssRules = sheet.rules;

		ok(sheet, "must actually create a sheet");

		matchesMock(sheet, CONTENT_MOCK_1.parsed)

	}

	I ["test comments inside strings"] = function(){

		var sheet = newSheet(CONTENT_MOCK_2.raw);
		if (!sheet.cssRules) sheet.cssRules = sheet.rules;

		ok(sheet, "must actually create a sheet");

		matchesMock(sheet, CONTENT_MOCK_2.parsed)
	}
	
	I ["test updating values updates cssText"] = function(){
		
		var style = '#selector{color:green}';
		var sheet = newSheet(style);
		if (!sheet.cssRules) sheet.cssRules = sheet.rules;
		
		equal(sheet.cssRules[0].style.color, 'green');
		matchesMock(sheet.cssRules[0].cssText, style);
		
		sheet.cssRules[0].style.color = 'blue';
		equal(sheet.cssRules[0].style.color, 'blue');
		
		sheet.toString();
		
		matchesMock(sheet.cssRules[0].cssText.toString(), '#selector{color:blue}');
		matchesMock(''+sheet.cssRules[0].cssText, '#selector{color:blue}');
	}
	
	for (var i = 0; i < MOCK_VALUES.length; ++i)
		I ["test selectors " + MOCK_VALUES[i].raw] = 
			newMockTest(MOCK_VALUES[i].raw, MOCK_VALUES[i].parsed, newSheet)
	
	for (var i = 0; i < MOCK_SELECTORS.length; ++i)
		I ["test selectors " + MOCK_SELECTORS[i].raw] = 
			newMockTest(MOCK_SELECTORS[i].raw, MOCK_SELECTORS[i].parsed, newSheet)
	
	for (var i = 0; i < MOCK_COMMENTS.length; ++i)
		I ["test comments " + MOCK_COMMENTS[i].raw] = 
			newMockTest(MOCK_COMMENTS[i].raw, MOCK_COMMENTS[i].parsed, newSheet)
	
	for (var i = 0; i < MOCK_COMMENTS_2.length; ++i)
		I ["test comments " + MOCK_COMMENTS_2[i].raw] = 
			newMockTest(MOCK_COMMENTS_2[i].raw, MOCK_COMMENTS_2[i].parsed, newSheet)
	
	return I;
};

API ["DOM style attribute"] = function(newStyle){
	if (!newStyle) throw new Error("API test requires passing a newStyle function");
	
	var I = {};
	
	I ["test Exists"] = function(){ok( newStyle )}
	
	I ["test new sheet conforms to basic api"] = function(){
		
		var sheet = newStyle(STYLE_MOCK_1.raw);
		if (!sheet.cssRules) sheet.cssRules = sheet.rules;
		
		ok(sheet, "must actually create a style");
		
		matchesMock(sheet, STYLE_MOCK_1.parsed)
	}
	
	I ["test updating values updates cssText"] = function(){
		
		var style = 'color:green';
		var sheet = newStyle(style);
		if (!sheet.cssRules) sheet.cssRules = sheet.rules;
		
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


function newMockTest(raw, parser, newSheet){
	return function(){
		matchesMock(newSheet(raw), parser)
	}
}


// //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  // //
// Mock

var CSS_MOCK = {raw:"",parsed:{}};
var styleSheet = CSS_MOCK.parsed;

// styleSheet
styleSheet.cssRules = [];
styleSheet.cssRules.cssText = "";

// cssRule
styleSheet.cssRules[0] = {};
styleSheet.cssRules[0].selectorText = "#selector";
styleSheet.cssRules.cssText +=
styleSheet.cssRules[0].cssText = "#selector { color: green; background-color: rgb(0, 255, 0); }";
CSS_MOCK.raw += styleSheet.cssRules[0].cssText;

// style
styleSheet.cssRules[0].style = {};
styleSheet.cssRules[0].style.cssText = "color: green; background-color: rgb(0, 255, 0);";
styleSheet.cssRules[0].style[styleSheet.cssRules[0].style[0] = 'color'] = "green";
styleSheet.cssRules[0].style.backgroundColor =
styleSheet.cssRules[0].style[styleSheet.cssRules[0].style[1] = 'background-color'] = "rgb(0, 255, 0)";
styleSheet.cssRules[0].style.length = 2;

// cssRule
styleSheet.cssRules[1] = {};
styleSheet.cssRules[1].selectorText = "#selector2";
styleSheet.cssRules.cssText +=
styleSheet.cssRules[1].cssText = "#selector2 { color: blue; background-color: rgb(128, 0, 128); }";
CSS_MOCK.raw += styleSheet.cssRules[1].cssText;

// style
styleSheet.cssRules[1].style = {};
styleSheet.cssRules[1].style.cssText = "color: blue; background-color: rgb(128, 0, 128);";
styleSheet.cssRules[1].style[styleSheet.cssRules[1].style[0] = 'color'] = "blue";
styleSheet.cssRules[1].style.backgroundColor =
styleSheet.cssRules[1].style[styleSheet.cssRules[1].style[1] = 'background-color'] = "rgb(128, 0, 128)";
styleSheet.cssRules[1].style.length = 2;


// //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  // //

var STYLE_MOCK_1 = { parsed:{style:{}} };
var style = STYLE_MOCK_1.parsed.style;

STYLE_MOCK_1.raw = 
style.cssText = "color: green; background-color: rgb(0, 255, 0);";

style[style[0] = "color"] = "green";
style.backgroundColor = 
style[style[1] = "background-color"] = "rgb(0, 255, 0)";

style.length = 2;


// //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  // //
var CONTENT_MOCK_1 = {

	raw: "img {content:'a {color: red}'}",

	parsed: {
		cssRules: {
			length: 1,
			0: {
				cssText: "img {content:'a {color: red}'}",
				style: {
					length: 1,
					0: "content",
					cssText: "content:'a {color: red}'",
					content: "'a{color:red}'"
				},
				undefined: undefined
			}
		}
	}
}

var CONTENT_MOCK_2 = {

	raw: '.comment {content:"/* boo */"}',

	parsed: {
		cssRules: {
			length: 1,
			0: {
				cssText: '.comment {content:"/* boo */"}',
				style: {
					length: 1,
					0: "content",
					cssText: 'content:"/* boo */"}',
					content: '"/* boo */"'
				},
				undefined: undefined
			}
		}
	}
}


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
							
							"background-color": "blue",
							backgroundColor: "blue",
							
							0: "background-color",
							length: 1
						}
					},
					1:{//WebKitCSSKeyframeRule
						// type:9,
						cssText: "100% { background-color: green; }",
						keyText: "100%",
						style: {
							cssText: "background-color: green; ",
							
							"background-color": "green",
							backgroundColor: "green",
							
							0: "background-color",
							length: 1
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
						
						"background-color": "blue",
						backgroundColor: "blue",
						
						0: "background-color",
						length: 1
					}
				},
				1:{//WebKitCSSKeyframeRule
					// type:9,
					cssText: "100% { background-color: green; }",
					keyText: "100%",
					style: {
						cssText: "background-color: green; ",
						
						"background-color": "green",
						backgroundColor: "green",
						
						0: "background-color",
						length: 1
					}
				}

			}
		}
	}
	
};

// //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  // //

var	comment, MOCK_COMMENTS = []
MOCK_COMMENTS[MOCK_COMMENTS.length] = { raw:'b{color:red}', parsed:{ cssRules:{ length:1, 0:{ cssText:"b{color:red}", style:{ length:1, 0:"color", color:"red" } } } } }
comment = "/*a*/"
MOCK_COMMENTS[MOCK_COMMENTS.length] = { raw:''+comment+'b{color:red}', parsed:MOCK_COMMENTS[0].parsed }
MOCK_COMMENTS[MOCK_COMMENTS.length] = { raw:'b'+comment+'{color:red}', parsed:MOCK_COMMENTS[0].parsed }
MOCK_COMMENTS[MOCK_COMMENTS.length] = { raw:'b{'+comment+'color:red}', parsed:MOCK_COMMENTS[0].parsed }
MOCK_COMMENTS[MOCK_COMMENTS.length] = { raw:'b{color'+comment+':red}', parsed:MOCK_COMMENTS[0].parsed }
MOCK_COMMENTS[MOCK_COMMENTS.length] = { raw:'b{color:'+comment+'red}', parsed:MOCK_COMMENTS[0].parsed }
MOCK_COMMENTS[MOCK_COMMENTS.length] = { raw:'b{color:red'+comment+'}', parsed:MOCK_COMMENTS[0].parsed }
MOCK_COMMENTS[MOCK_COMMENTS.length] = { raw:'b{color:red}'+comment+'', parsed:MOCK_COMMENTS[0].parsed }

comment = "\
/******************************\n\
 * lol, Block Comment\n\
******************************/\n\
"
MOCK_COMMENTS[MOCK_COMMENTS.length] = { raw:''+comment+'b{color:red}', parsed:MOCK_COMMENTS[0].parsed }
MOCK_COMMENTS[MOCK_COMMENTS.length] = { raw:'b'+comment+'{color:red}', parsed:MOCK_COMMENTS[0].parsed }
MOCK_COMMENTS[MOCK_COMMENTS.length] = { raw:'b{'+comment+'color:red}', parsed:MOCK_COMMENTS[0].parsed }
MOCK_COMMENTS[MOCK_COMMENTS.length] = { raw:'b{color'+comment+':red}', parsed:MOCK_COMMENTS[0].parsed }
MOCK_COMMENTS[MOCK_COMMENTS.length] = { raw:'b{color:'+comment+'red}', parsed:MOCK_COMMENTS[0].parsed }
MOCK_COMMENTS[MOCK_COMMENTS.length] = { raw:'b{color:red'+comment+'}', parsed:MOCK_COMMENTS[0].parsed }
MOCK_COMMENTS[MOCK_COMMENTS.length] = { raw:'b{color:red}'+comment+'', parsed:MOCK_COMMENTS[0].parsed }

var MOCK_COMMENTS_2 = []
for (var i = 0; i < MOCK_COMMENTS.length; ++i){
	MOCK_COMMENTS_2[MOCK_COMMENTS_2.length] = {
		raw: MOCK_COMMENTS[i].raw + MOCK_COMMENTS[i].raw,
		parsed: {
			cssRules: {
				length: 2,
				0: MOCK_COMMENTS[i].parsed.cssRules[0],
				1: MOCK_COMMENTS[i].parsed.cssRules[0]
			}
		}
	}
}

// //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  // //

var	rule, MOCK, comment, MOCK_SELECTORS = []
MOCK=MOCK_SELECTORS[MOCK_SELECTORS.length]={parsed:{cssRules:{length:1,0:{style:{length:1,0:"color",color:"red"}}}}};rule=MOCK.parsed.cssRules[0];MOCK.raw=rule.cssText=(rule.selectorText=
"a")+"{color:red}"
MOCK=MOCK_SELECTORS[MOCK_SELECTORS.length]={parsed:{cssRules:{length:1,0:{style:{length:1,0:"color",color:"red"}}}}};rule=MOCK.parsed.cssRules[0];MOCK.raw=rule.cssText=(rule.selectorText=
"a:first-child")+"{color:red}"
MOCK=MOCK_SELECTORS[MOCK_SELECTORS.length]={parsed:{cssRules:{length:1,0:{style:{length:1,0:"color",color:"red"}}}}};rule=MOCK.parsed.cssRules[0];MOCK.raw=rule.cssText=(rule.selectorText=
"a:not()")+"{color:red}"
MOCK=MOCK_SELECTORS[MOCK_SELECTORS.length]={parsed:{cssRules:{length:1,0:{style:{length:1,0:"color",color:"red"}}}}};rule=MOCK.parsed.cssRules[0];MOCK.raw=rule.cssText=(rule.selectorText=
"a:not(a b c)")+"{color:red}"
MOCK=MOCK_SELECTORS[MOCK_SELECTORS.length]={parsed:{cssRules:{length:1,0:{style:{length:1,0:"color",color:"red"}}}}};rule=MOCK.parsed.cssRules[0];MOCK.raw=rule.cssText=(rule.selectorText=
"a:contains(a{b:c})")+"{color:red}"
MOCK=MOCK_SELECTORS[MOCK_SELECTORS.length]={parsed:{cssRules:{length:1,0:{style:{length:1,0:"color",color:"red"}}}}};rule=MOCK.parsed.cssRules[0];MOCK.raw=rule.cssText=(rule.selectorText=
"a:contains('a{b:c}')")+"{color:red}"
MOCK=MOCK_SELECTORS[MOCK_SELECTORS.length]={parsed:{cssRules:{length:1,0:{style:{length:1,0:"color",color:"red"}}}}};rule=MOCK.parsed.cssRules[0];MOCK.raw=rule.cssText=(rule.selectorText=
'a:contains("a{b:c}")')+"{color:red}"
MOCK=MOCK_SELECTORS[MOCK_SELECTORS.length]={parsed:{cssRules:{length:1,0:{style:{length:1,0:"color",color:"red"}}}}};rule=MOCK.parsed.cssRules[0];MOCK.raw=rule.cssText=(rule.selectorText=
"a[href]")+"{color:red}"
MOCK=MOCK_SELECTORS[MOCK_SELECTORS.length]={parsed:{cssRules:{length:1,0:{style:{length:1,0:"color",color:"red"}}}}};rule=MOCK.parsed.cssRules[0];MOCK.raw=rule.cssText=(rule.selectorText=
"a[href=foo]")+"{color:red}"
MOCK=MOCK_SELECTORS[MOCK_SELECTORS.length]={parsed:{cssRules:{length:1,0:{style:{length:1,0:"color",color:"red"}}}}};rule=MOCK.parsed.cssRules[0];MOCK.raw=rule.cssText=(rule.selectorText=
"a[href=foo bar]")+"{color:red}"
MOCK=MOCK_SELECTORS[MOCK_SELECTORS.length]={parsed:{cssRules:{length:1,0:{style:{length:1,0:"color",color:"red"}}}}};rule=MOCK.parsed.cssRules[0];MOCK.raw=rule.cssText=(rule.selectorText=
"a[href='foo bar']")+"{color:red}"
MOCK=MOCK_SELECTORS[MOCK_SELECTORS.length]={parsed:{cssRules:{length:1,0:{style:{length:1,0:"color",color:"red"}}}}};rule=MOCK.parsed.cssRules[0];MOCK.raw=rule.cssText=(rule.selectorText=
'a[href="foo bar"]')+"{color:red}"
MOCK=MOCK_SELECTORS[MOCK_SELECTORS.length]={parsed:{cssRules:{length:1,0:{style:{length:1,0:"color",color:"red"}}}}};rule=MOCK.parsed.cssRules[0];MOCK.raw=rule.cssText=(rule.selectorText=
"a[href='a{b:c}']")+"{color:red}"
MOCK=MOCK_SELECTORS[MOCK_SELECTORS.length]={parsed:{cssRules:{length:1,0:{style:{length:1,0:"color",color:"red"}}}}};rule=MOCK.parsed.cssRules[0];MOCK.raw=rule.cssText=(rule.selectorText=
'a[href="a{b:c}"]')+"{color:red}"
// //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  // //

var	rule, MOCK, comment, MOCK_VALUES = []
MOCK=MOCK_VALUES[MOCK_VALUES.length]={parsed:{cssRules:{length:1,0:{selectorText:"a",style:{length:1,0:"background-image",backgroundImage:"url(http://foo.com/?};)"}}}}};
rule=MOCK.parsed.cssRules[0];
MOCK.raw=rule.cssText="a{background-image:url(http://foo.com/?};)}"

// //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  // //
