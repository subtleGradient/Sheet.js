// -*- Mode: JavaScript QUnit; tab-width: 4; -*-

module ("SheetParser.CSS RegExp");

test ("parse CSS",function(){
	var css = '/* howdy! */ #id > foo {key:value;key2:val2} @import foo; @bar {/*block*/}';
	console.log(SheetParser.CSS.parse(css));
	console.log(JSON.stringify(SheetParser.CSS.parse(css)));
})

test ('parse style=""',function(){
	var css = 'key:value';
	console.log(SheetParser.CSS.parse(css));
	console.log(JSON.stringify(SheetParser.CSS.parse(css)));
	
	var css = 'key:value;key:value';
	console.log(SheetParser.CSS.parse(css));
	console.log(JSON.stringify(SheetParser.CSS.parse(css)));
	
	var css = 'key:value;key:value2';
	console.log(SheetParser.CSS.parse(css));
	console.log(JSON.stringify(SheetParser.CSS.parse(css)));
})
