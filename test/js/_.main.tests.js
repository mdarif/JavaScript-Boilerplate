module("logger");

test("Test logger utility - $.log()", function() {
	expect(3);
	ok( MODULE.config.debug, "MODULE.config.debug is defined" );
	ok( window.console != 'undefined', "window.console is available" );
	ok($.log, "$.log")
});