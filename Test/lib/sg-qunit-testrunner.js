/*
---
name : sg-qunit-testrunner
description : sg-qunit-testrunner runs CommonJS Test Unit API TestRunner style test objects using QUnit

authors   : Thomas Aylott
copyright : © 2010 Thomas Aylott
license   : MIT

provides : QUnit.TestRunner
requires : QUnit
...
*/

if (!QUnit.TestRunner) QUnit.TestRunner = {};

(function(){

var hasOwnProperty = {}.hasOwnProperty,
	testKey = /^test\b(?!$)/;

QUnit.TestRunner.run = run;
function run(tests){
	for (var name in tests){
		if (!hasOwnProperty.call(tests,name)) continue;
		if (!testKey.test(name)) continue;
		if (typeof tests[name] == 'function'){
			
			QUnit.test(name.replace(/^test[\s_-]*/,''), tests[name]);
			
		} else if (tests[name] && typeof tests[name] == 'object'){
		
			QUnit.module(name.replace(/^test[\s_-]*/,''));
			run(tests[name]);
			
		}
	}
}

})();
