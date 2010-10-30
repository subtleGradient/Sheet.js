Sheet.js by Thomas Aylott of MooTools

**STATE: pre-alpha, but well tested and stable. API will change before 1.0**

Sheet.js
========
Parse CSS in JavaScript

* Test-first Development
* Zero dependencies
* DOM-less (no document necessary)
* CommonJS Modules 1.0+ with global fallback
* Browser support
* Implements W3C `document.styleSheets` API
* Implements WebKit CSS Animation API


Flexible Parsing
----------------

* Supports WebKit CSS Animation syntax
* Supports custom selectors, @rules, properties and values
* Supports nested rules
* Supports HTML style attribute values  
	i.e. CSS rules without the selectors and brackets

### Coming Soon…

* Support for custom CSS-like languages like the Sass 3.0 SCSS (Sassy CSS) and Less CSS


Basic Usage
-----------

ClientSide / Browser Usage

	var myStyleSheet = new Sheet("#selector { color:blue }");
	myStyleSheet.cssRules[0].style.color; // blue
	// etc…

ServerSide / CommonJS Usage

	require.paths.push('path/to/Sheet.js/Source'); // You might not need this
	var Sheet = require('Sheet').Sheet;
	
	var myStyleSheet = new Sheet("#selector { color:blue }");
	myStyleSheet.cssRules[0].style.color; // blue
	// etc…


Advanced ClientSide Namespacing
-------------------------------
If you need to move Sheet.js to its own custom namespace simply define a global `exports` object before loading Sheet.js. Sheet.js will see that object, assume that it's in a CommonJS environment and then attach itself onto that object instead of including itself globally.

You really shouldn't need to do that.
But isn't it great to know you could?


TODO: Add curly bracket test that is WAY too deep or document the depth

* * *

sg.Sheet.js v2
==============
Multi-Teir Scope-based Low-level Multi-pass parser
--------------------------------------------------

* Implement many standalone parsers that convert a string into an object
* Implement a scope selector system to allow you define a parser for a given scope
	* e.g. "sheet rule selector"
* TODO: async option runs each parsing step in a separate run loop
* TODO: bootstrap for running as a worker
* TODO: on demand lazy parsing. Only parse something as it is accessed (where supported!)
* You can add additional processing steps in totally separate files
	* Want to parse your selectors using Slick.Parser.js?
	* Want to parse your style property values to get at 

How it works (or will when I make it do this)

stylesheet string
→ stylesheet.rules
rule.selector string
rule.style string
→ style[property]
→ style[i] = property


1. **stylesheet string** → **stylesheet object**
1. **stylesheet object** → **r object**
2. **selector string** → **selector object**
3. `'background-color:blue;color:red'` | **style string** → **style object** `{background-color:'blue', color:'red'}`
4. `'background-color', 'blue', obj` | **style object** → `{length:1, 0:'background-color', background-color:'blue', backgroundColor:'blue'}`
5. `'blue'` | propertyValue → `#00f`

1. `"selector a{background-color:blue;color:red}selector b{background-color:blue;color:red}"` | rulesParser → `[{**selector**:'selector a',**style**:'background-color:blue;color:red'}, {selector:'selector b',block:'background-color:blue;color:red'}]`
2. `"selector a"` | **selector string** → *{ Selector OM object }*
3. `'background-color:blue;color:red'` | **style string** → **style object** `{background-color:'blue', color:'red'}`
4. `'background-color', 'blue', obj` | **style object** → `{length:1, 0:'background-color', background-color:'blue', backgroundColor:'blue'}`
5. `'blue'` | propertyValue → `#00f`

