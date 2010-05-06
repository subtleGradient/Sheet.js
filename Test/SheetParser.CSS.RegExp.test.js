// -*- Mode: JavaScript QUnit; tab-width: 4; -*-

module ("SheetParser.CSS RegExp");

test ("parse CSS",function(){
	var css = '/* howdy! */ #id > foo {key:value;key2:val2} @import foo; @bar {/*block*/}';
	//console.log(SheetParser.CSS.parse(css));
	//console.log(JSON.stringify(SheetParser.CSS.parse(css)));
})

/*
test ("parse SCSS (Sassy CSS)",function(){
	
	var css = '\
@mixin table-scaffolding {\
  th {\
    text-align: center;\
    font-weight: bold;\
  }\
  td, th { padding: 2px; }\
}\
\
@mixin left($dist) {\
  float: left;\
  margin-left: $dist;\
}\
\
#data {\
  @include left(10px);\
  @include table-scaffolding;\
}\
';
	var sheet = new Sheet(css);
	
	ok(sheet);
	ok(sheet.cssRules);
	ok(sheet.cssRules.length);
	equal(sheet.cssRules.length, 3);
})
*/

test ('parse style=""',function(){
	var css = 'key:value';
	//console.log(SheetParser.CSS.parse(css));
	//console.log(JSON.stringify(SheetParser.CSS.parse(css)));
	
	var css = 'key:value;key:value';
	//console.log(SheetParser.CSS.parse(css));
	//console.log(JSON.stringify(SheetParser.CSS.parse(css)));
	
	var css = 'key:value;key:value2';
	//console.log(SheetParser.CSS.parse(css));
	//console.log(JSON.stringify(SheetParser.CSS.parse(css)));
})


/*
{
	"length": 2,
	"cssText": "@-webkit-keyframes my-animation {\t\t0% { background-color:blue }\t\t100% { background-color:green }\t}",
	"0": {
		"cssText": "@-webkit-keyframes my-animation {\t\t0% { background-color:blue }",
		"selectorText": "@-webkit-keyframes my-animation",
		"style": {
			"length": 1,
			"cssText": "0% { background-color:blue ",
			"0": "background-color",
			"background-color": "blue "
		}
	},
	"1": {
		"cssText": "\t\t100% { background-color:green }",
		"selectorText": "100%",
		"style": {
			"length": 1,
			"cssText": "background-color:green ",
			"0": "background-color",
			"background-color": "green "
		}
	}
}
*/
/*
{
	"length": 2,
	"cssText": "@-webkit-keyframes my-animation {\t\t0% { background-color:blue }\t\t100% { background-color:green }\t}",
	"0": {
		"cssText": "@-webkit-keyframes my-animation {\t\t0% { background-color:blue }",
		"selectorText": "@-webkit-keyframes my-animation",
		"style": {
			"length": 1,
			"cssText": "0% { background-color:blue ",
			"0": "background-color",
			"background-color": "blue "
		}
	},
	"1": {
		"cssText": "\t\t100% { background-color:green }",
		"selectorText": "100%",
		"style": {
			"length": 1,
			"cssText": "background-color:green ",
			"0": "background-color",
			"background-color": "green "
		}
	}
}
*/
