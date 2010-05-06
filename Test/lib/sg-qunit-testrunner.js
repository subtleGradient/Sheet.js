/*
---
name: SG-QUnit-TestRunner
author: Thomas Aylott
license: MIT Style
...
*/

var assert = QUnit;

function run(tests){
	for (var name in tests){
		if (!tests.hasOwnProperty(name)) continue;
		if (!/^test/.test(name)) continue;
		if (typeof tests[name] === 'function'){
			test(name.replace(/^test[\s_-]*/,''), tests[name]);
		} else {
			// module(name.replace(/^test[\s_-]*/,''));
			run(tests[name]);
		}
	}
}

