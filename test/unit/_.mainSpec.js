'use strict';

/* jasmine specs for _.main.js go here */

describe("Test _.main.js", function() {

	/**
     * Test logging function, for debugging mode
     */
	describe("test $.log() function", function() {
		it("MODULE.config.debug should be true", function() {
			expect(MODULE.config.debug).toBe(true);
		});

		it("typeof window.console should be object", function() {
			expect(typeof window.console).toBeDefined();
		})

		it("typeof window.console.log to be defined", function() {
			expect(typeof window.console.log).toBeDefined();
		})

		it("console.debug should be available", function(){
			expect(console.debug).toBeDefined();
		})
	});

	/**
     * Test $.toType() function
     */
     describe("test $.toType() function", function() {
     	it("")


     })
})