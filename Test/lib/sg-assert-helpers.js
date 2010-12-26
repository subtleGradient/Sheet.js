/*
---
name: SG-Assert-Helpers
description: Helpers for asserting stuff
author: Thomas Aylott
license: MIT Style
...
*/

/*CommonJS>*/
if (typeof assert == 'undefined' && typeof require != 'undefined') {
	var assert = require('assert');
	var ok = assert.ok;
	var equal = assert.equal;
	
	if (typeof print == 'undefined') 
		var    print = require('sys')
		.      print;
}
/*</CommonJS>*/

function normalizeCSSText(string){
	return String(string).toLowerCase().replace(/[ \t\n]+/g,'').replace(/;($|(?=}))/g,'');
}

function matchesMock(actual, expected, errorMessage){
	if (!errorMessage) errorMessage = "";
	
	if (typeof actual == 'undefined' && expected != null){
		ok(actual, errorMessage + ' is undefined')
		return;
	}
	
	if (typeof expected == "string"){
		equal(normalizeCSSText(actual), normalizeCSSText(expected), errorMessage);
		return;
	}
	
	if (typeof expected != "object"){
		equal(actual, expected, errorMessage);
		return;
	}
	
	if ("length" in expected && + expected.length){
		equal(actual.length, expected.length, errorMessage + ".length");
	}
	
	if (typeof expected == 'string')
		equal(normalizeCSSText(actual), normalizeCSSText(expected), errorMessage);
	
	if (typeof expected == 'object')
	for (var property in expected){
		if (!expected.hasOwnProperty(property)) continue;
		matchesMock(actual[property], expected[property], property);
	}
}

if (typeof test == 'undefined'){
	
	/*<QUnit>*/
	if (typeof QUnit != 'undefined'){
		var test = QUnit.test;
	} else 
	/*</QUnit>*/
	
	/*<CommonJS>*/
	{
		var test = function(name,fn){
			print(name);
			fn(require('assert'));
			print("\n");
		};
	}
	/*</CommonJS>*/
}

/*<QUnit>*/
if (typeof assert == 'undefined') 
	if (typeof QUnit != 'undefined') 
		var assert = QUnit;
/*</QUnit>*/



/*<Provides>*/
if (typeof exports == 'undefined') exports = this;

exports.normalizeCSSText = normalizeCSSText;
exports.matchesMock = matchesMock;

exports.test = test;
exports.assert = assert;
/*</Provides>*/
