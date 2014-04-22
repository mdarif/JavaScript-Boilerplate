'use strict';

/* jasmine specs for _.main.js go here */

/*Matchers Reference
• toEqual checks for equality, not necessarily the same object.
• toBe checks if two objects are the same.
• toBeTruthy checks if a value is truthy (not just true).
• toBeFalsy checks if a value is falsy (not just false).
• toContain checks if a value is inside another.
• toBeDefined checks if a value is defined.
• toBeUndefined checks if a value is undefined.
• toBeNull checks if a value is null.
• toBeNaN checks if a value is NaN.
• toBeCloseTo checks decimal proximity.
• toMatch checks if a value matches a given regular expression.
• toThrow checks if a function throws an error.
• .not inverts the meaning of the following matcher.
*/

/*Reserved Words in Jasmine
• jasmine (and everything in its namespace)
• describe
• it
• expect
• beforeEach
• afterEach
• runs
• waits
• waitsFor
• spyOn
• xdescribe
• xit
*/

/*List of Falsy Values
• false
• 0
• ""
• undefined (note that the variable undefined isn’t always undefined!)
• null
• NaN
*/

describe("Test main js file", function() {

	/**
	 * Test logging function, for debugging mode
	 */
	describe("test log function", function() { // suite

		it("JSB.config.debug should be true", function() { // specification or spec
			expect(JSB.config.debug).toBe(true); // matcher, if you want to make sure something is literally true or false and nothing else, use the
			//toEqual matcher
		});

		it("typeof window.console should be object", function() {
			expect(typeof window.console !== 'undefined').toEqual(true);
		});

		it("typeof window.console.log to be defined", function() {
			expect(typeof window.console.log !== 'undefined').toEqual(true);
		});

		it("console.debug should be available", function() {
			expect(console.debug).toBeDefined();
		});
	});

	/**
	 * Test $.toType() function
	 */
	describe("test toType function", function() {
		xit("test window object 'global'", function() {
			expect($.toType(window)).toEqual("global");
		});

		it("test array object", function() {
			expect($.toType([1, 2, 3])).toEqual("array");
		});

		it("test regex object", function() {
			expect($.toType(/a-z/)).toEqual("regexp");
		});

		it("test object", function() {
			expect($.toType({
				a: 4
			})).toEqual("object");
		});

		it("test error object", function() {
			expect($.toType(new ReferenceError)).toEqual("error");
		});

		it("test date object", function() {
			expect($.toType(new Date)).toEqual("date");
		});

		it("test Math object", function() {
			expect($.toType(Math)).toEqual("math");
		});

		it("test JSON object", function() {
			expect($.toType(JSON)).toEqual("json");
		});

		it("test Number object", function() {
			expect($.toType(3)).toEqual("number");
		});

		it("test String object", function() {
			expect($.toType("Arif")).toEqual("string");
		});

		it("test Boolean object", function() {
			expect($.toType(new Boolean(true))).toEqual("boolean");
		});

		xit("test null", function() {
			expect($.toType(null)).toEqual("null");
		});

		xit("test undefined", function() {
			expect($.toType(undefined)).toEqual("undefined");
		});
	});

	describe("test public method", function() {
		it("JSB.sayHello", function() {
			expect(JSB.sayHello()).toEqual("Hello World!");
		});
	});

	describe("let's get the domain name", function() {
		xit("test protocol", function() {
			expect(window.location.protocol).toContain("http");
		});

	});

	describe("test query strings", function() {
		var name;
		xit("check the output", function() {
			expect(JSB.subHelper.getQueryString(name, 'Arif')).toEqual("Arif");
		});

		beforeEach(function() {
			spyOn(JSB.subHelper, 'getQueryString');
			JSB.subHelper.getQueryString(name, 'Arif');
		});

		it("tracks that the spy was called", function() {
			//Let's tracks calls to it and all arguments through spyOn method.
			expect(JSB.subHelper.getQueryString).toHaveBeenCalled();
		});

	});


	// describe("Facebook", function() {
	// 	it("is FB available (i.e. is facebook library included)", function() {
	// 		expect(typeof FB != "undefined").not.toEqual(true);
	// 	});

	// 	it("do we have an application id", function() {
	// 		expect(JSB.config.appId != "").toEqual(true);
	// 	});

	// 	it("initialize the facebook library", function() {
	// 		JSB.subModule.fbReady();
	// 	});

	// 	xit("Checking for active facebook session", function() {
	// 		FB.getLoginStatus();
	// 		waitsFor(function() {
	// 			return FB.getLoginStatusResponse() && FB.getLoginStatusResponse().authResponse;
	// 		}, "response.authResponse", 7000);
	// 	});
	// });

});