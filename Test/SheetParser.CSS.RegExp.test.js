// -*- Mode: JavaScript QUnit; tab-width: 4; -*-

module ("SheetParser.CSS RegExp");

test ("parser",function(){
	var css = '/* howdy! */ #id > foo {key:value;key2:val2} @import foo; @bar {/*block*/}';
	console.log(SheetParser.CSS.parse(css));
	console.log(JSON.stringify(SheetParser.CSS.parse(css)));
})
