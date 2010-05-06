/*
---
name: SG-TestRunner
author: Thomas Aylott
license: MIT Style
...
*/

if (typeof exports == 'undefined') var exports = this;

if (typeof print === 'undefined') var print = require('sys').print;
var assert = require('assert');

exports.run = run;
function run(tests){
	var fails = 0;
	var passed = 0;
	var errors = 0;
	
	for (var name in tests){
		if (!tests.hasOwnProperty(name)) continue;
		if (!/^test/.test(name)) continue;
		if (typeof tests[name] === 'function'){
			print('+ '+name +'\n');
			try {
				tests[name](assert);
				++ passed;
			} catch(e){
				++ errors;
			}
		} else fails += run(tests[name]);
	}
	
	print("Passed " + passed)
	print("; ")
	print("Failed " + fails)
	print("; ")
	print("Error " + errors)
	print("\n")
	return fails;
}

