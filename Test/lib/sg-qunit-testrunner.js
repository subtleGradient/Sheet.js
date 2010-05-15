/*
---
name: SG-QUnit-TestRunner
author: Thomas Aylott
license: MIT Style
...
*/

(function(exports){

var assert = QUnit;
var hasOwnProperty = {}.hasOwnProperty;

exports.run = function(tests){
	for (var name in tests){
		if (!hasOwnProperty.call(tests,name)) continue;
		if (!/^test/.test(name)) continue;
		if (typeof tests[name] === 'function'){
			test(name.replace(/^test[\s_-]*/,''), tests[name]);
		} else {
			// module(name.replace(/^test[\s_-]*/,''));
			run(tests[name]);
		}
	}
}

})(typeof exports != 'undefined' ? exports : this);
