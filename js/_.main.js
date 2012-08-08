/* JavaScript Boilerplate main scripting file *
 * @version 1.0
*/
/* MODULE (our namespace name) and undefined are passed here
 * to ensure 1. namespace can be modified locally and isn't
 * overwritten outside of our function context
 * 2. the value of undefined is guaranteed as being truly
 * undefined. This is to avoid issues with undefined being
 * mutable pre-ES5.
*/

/*jshint forin:true, noarg:true, eqeqeq:true, bitwise:true, undef:true, curly:true, browser:true, devel:true, indent:4, maxerr:50, jquery:true */

/*jslint devel: true, nomen: true, unparam: true, sloppy: true, indent: 4, newcap:true */

/*global FB:false, jQuery, window, document*/

(function (MODULE, $, undefined) {

    /**
     * Logging function, for debugging mode
     */
	$.log = function (message) {
        if (MODULE.config.debug && (typeof window.console !== 'undefined' && typeof window.console.log !== 'undefined') && console.debug) {
            console.debug(message);
        } /*else {
            alert(message);
        }*/
    };

	/**
     * Angus Croll awesome typeof fix from http://goo.gl/dat30
     */
	$.toType = (function toType(global) {
		return function (obj) {
			if (obj === global) {
				return "global";
			}
			return ({}).toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase();
		};
	}(this));

	/*$.toType(window); //"global" (all browsers)
	$.toType([1,2,3]); //"array" (all browsers)
	$.toType(/a-z/); //"regexp" (all browsers)
	$.toType(JSON); //"json" (all browsers)
	$.toType(null); //"null" (all browsers)
	$.toType(undefined); //"undefined" (all browsers)*/
	//etc..

	/**
     * Private properties
     */
    var foo = "foo",
        bar = "bar";

    /**
     * Private method
     */

    /* Benefits:
     * 1. Makes it easier to understand "functions as an object".
     * 2. It enforces good semicolon habits.
     * 3. Doesn't have much of the baggage traditionally associated with functions and scope.
     */
    var getData = function () {
    };

	/**
     * Public methods and properties
     */
    MODULE.foobar = "foobar";
    MODULE.sayHello = function () {
        $.log("hello world");
    };

	/*
     * Singletons serve as a namespace provider which isolate implementation code
     * from the global namespace so as to provide a single point of access for functions,
     * this is useful for organizing code into logical sections.
     * It is possible to put parentheses around this structure to instantiate it immediately after it's parsed.
     * This way it's always present when the script is executed and doesn't have to be instantiated separately.
	*/
    MODULE.subModule = (function () {
        function _subModule() {

            var _this = this;
            /* Store this to avoid scope conflicts */

            this.fbReady = function () {
                /**
                 * This code loads the SDK asynchronously so it does not block loading other elements of your page. This is particularly important to ensure fast page loads for users and SEO robots.
                 */
                window.fbAsyncInit = function () {
                    FB.init({
                        appId: MODULE.config.appId, /*read from config*/
                        status: true,
                        cookie: true,
                        xfbml: true
                    });

                    /**
                     * The FB.Event.subscribe is used to subscribe to login events
                     */
                    FB.Event.subscribe('auth.login', function () {
                        // do something when user logs in
                        //_this.login();
                    });

                    /**
                     * The FB.Event.subscribe is used to subscribe to logout events
                     */
                    FB.Event.subscribe('auth.logout', function () {
                        // do something when user logs out.
                        //_this.logout();
                    });

                    /**
                     * To determine if a user is connected to your app
                     */
                    FB.getLoginStatus(function (response) {
                        if (response.status === 'connected') {
                            // the user is logged in and connected to your
                            // app, and response.authResponse supplies
                            // the user's ID, a valid access token, a signed
                            // request, and the time the access token
                            // and signed request each expire
                            var uid = response.authResponse.userID,
                                accessToken = response.authResponse.accessToken;
                            $.log("uid: " + uid + "\nAccess Token: " + accessToken);
                        } else if (response.status === 'not_authorized') {
                            $.log("The user is logged in to Facebook but not connected to the app");
                        }
                    });
                };

                /**
                 * Load the SDK Asynchronously
                 */
                (function (d) {
                    var js, id = 'facebook-jssdk';
                    if (d.getElementById(id)) {
                        return;
                    }
                    js = d.createElement('script');
                    js.id = id;
                    js.async = true;
                    js.src = "//connect.facebook.net/en_US/all.js";
                    d.getElementsByTagName('head')[0].appendChild(js);
                }(document));
            };

            /**
             * facebookLogin - FB.login prompts the user to authorize your application
             */
            this.facebookLogin = function () {
                FB.login(function (response) {
                    if (response.status === "connected") {
                        $.log("User is logged in and granted some permissions.");
                    } else if ((response.status === 'not_authorized') || response.authResponse === null) {
                        $.log("User has not granted permissions!");
                    }
                }, {
                    scope: 'publish_stream'
                });
            };

            /**
             * private method
             */
            var privateMethod = function () {
            };

            /**
             * Init call
             */
            this.init = function () {
                _this.fbReady();
                return this; /*this refere to MODULE.subModule*/
            };

            return this.init(); /*initialize the init()*/
        }
        return new _subModule(); /*creating a new object of subModule rather then a funtion*/
    }());

/**
 * Check to evaluate whether 'MODULE' exists in the global namespace - if not, assign window.MODULE an object literal
 */
}(window.MODULE = window.MODULE || {}, jQuery));