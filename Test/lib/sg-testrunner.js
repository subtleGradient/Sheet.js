/*
---
name: SG-TestRunner
author: Thomas Aylott
license: MIT Style
...
*/

if (typeof print == 'undefined') var print = require('sys').print;

var assert = require('assert');

exports.run = run;

function run(tests){
	var fails = 0;
	var passed = 0;
	var errors = 0;
	var ran = 0;
	
	for (var name in tests){
		if (!tests.hasOwnProperty(name)) continue;
		if (!/^test/.test(name)) continue;
		if (typeof tests[name] == 'function'){
			print('\t\t+ '+name +'\n');
			try {
				++ ran;
				tests[name](assert);
				++ passed;
			} catch(e){
				print('\t\t\tError: '+ e +'\n');
				++ errors;
			}
		} else {
			print('\t+ '+name +'\n');
			fails += run(tests[name]);
		}
	}
	
	if (ran){
		print("Passed " + passed)
		print("; ")
		print("Failed " + fails)
		print("; ")
		print("Error " + errors)
		print("\n\n")
	}
	return fails;
}
