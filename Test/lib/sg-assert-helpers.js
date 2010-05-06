/*
---
name: SG-Assert-Helpers
description: Helpers for asserting stuff
author: Thomas Aylott
license: MIT Style
...
*/

if (typeof assert == 'undefined' && typeof require != 'undefined') {
	var assert = require('assert');
	var ok = assert.ok;
	var equal = assert.equal;
	
	if (typeof print === 'undefined') 
		var    print = require('sys')
		.      print;
}
if (typeof exports == 'undefined') var exports = this;
exports.normalizeCSSText = normalizeCSSText;
exports.matchesMock = matchesMock;

function normalizeCSSText(string){
	return String(string).replace(/[ \t\n]+/g,'').replace(/;($|(?=}))/g,'');
}

function matchesMock(actual, expected, errorMessage){
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
	
	equal("length" in actual, "length" in expected, errorMessage + " same length");
	if ("length" in expected && + expected.length){
		equal(actual.length, expected.length, errorMessage);
	}
	
	if (typeof expected == 'string')
		equal(normalizeCSSText(actual), normalizeCSSText(expected), errorMessage);
	
	if (typeof expected == 'object')
	for (var property in expected){
		if (!expected.hasOwnProperty(property)) continue;
		matchesMock(actual[property], expected[property], property);
	}
}

if (typeof test === 'undefined') var test = function(name,fn){
	print(name);
	fn(require('assert'));
	print("\n");
};
exports.test = test;

if (typeof assert === 'undefined') 
if (typeof QUnit != 'undefined') 
var assert = QUnit;
