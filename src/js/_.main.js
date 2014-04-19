/* JavaScript Boilerplate main scripting file *
 * @version 1.1
 * GIT URL - https://github.com/mdarif/JavaScript-Boilerplate
 */

/* MODULE (our namespace name) and undefined are passed here
 * to ensure 1. namespace can be modified locally and isn't
 * overwritten outside of our function context
 * 2. the value of undefined is guaranteed as being truly
 * undefined. This is to avoid issues with undefined being
 * mutable pre-ES5.
 */

(function(MODULE, $, undefined) {
    'use strict';

    /**
     * Logging function, for debugging mode
     */
    $.log = function(message) {
        if (MODULE.config.debug && (typeof window.console !== 'undefined' && typeof window.console.log !== 'undefined') && console.debug) {
            console.debug(message);
        }
        /*else {
            alert(message);
        }*/
    };

    /**
     * Angus Croll awesome typeof fix from http://goo.gl/GtvsU
     */
    $.toType = (function toType(global) {
        return function(obj) {
            if (obj === global) {
                return 'global';
            }
            return ({}).toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase();
        };
    }(this));

    /*$.toType(window); //'global' (all browsers)
	$.toType([1,2,3]); //'array' (all browsers)
	$.toType(/a-z/); //'regexp' (all browsers)
	$.toType(JSON); //'json' (all browsers)
	$.toType(null); //'null' (all browsers)
	$.toType(undefined); //'undefined' (all browsers)*/
    //etc..

    /**
     * Private properties
     */
    var name = 'Mohammed Arif',
        age = 30;

    /**
     * Private method
     */

    /* Benefits:
     * 1. Makes it easier to understand 'functions as an object'.
     * 2. It enforces good semicolon habits.
     * 3. Doesn't have much of the baggage traditionally associated with functions and scope.
     */
    var getName = function() {
        return 'My name is ' + name + ', I am ' + age + ' old.';
    };


    /**
     * Public methods and properties
     */
    MODULE.title = 'Interactive Developer';
    MODULE.sayHello = function() {
        return "Hello World!"
    };

    /*
     * Singletons serve as a namespace provider which isolate implementation code
     * from the global namespace so as to provide a single point of access for functions,
     * this is useful for organizing code into logical sections.
     * It is possible to put parentheses around this structure to instantiate it immediately after it's parsed.
     * This way it's always present when the script is executed and doesn't have to be instantiated separately.
     */
    MODULE.subModule = (function() {
        function _subModule() {

            /**
             * In non-strict mode, 'this' is bound to the global scope when it isn't bound to anything else.
             * In strict mode it is 'undefined'. That makes it an error to use it outside of a method.
             */

            /*jshint validthis: true */
            var _this = this;
            /* Store this to avoid scope conflicts */

            this.fbReady = function() {
                /**
                 * This code loads the SDK asynchronously so it does not block loading other elements of your page. This is particularly important to ensure fast page loads for users and SEO robots.
                 */
                window.fbAsyncInit = function() {
                    FB.init({
                        appId: MODULE.config.appId,
                        /*read from config*/
                        status: true,
                        cookie: true,
                        xfbml: true
                    });

                    /**
                     * The FB.Event.subscribe is used to subscribe to login events
                     */
                    FB.Event.subscribe('auth.login', function() {
                        // do something when user logs in
                        //_this.login();
                    });

                    /**
                     * The FB.Event.subscribe is used to subscribe to logout events
                     */
                    FB.Event.subscribe('auth.logout', function() {
                        // do something when user logs out.
                        //_this.logout();
                    });

                    /**
                     * To determine if a user is connected to your app
                     */
                    FB.getLoginStatus(function(response) {
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
                (function(d, s, id) {
                    var js, fjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) {
                        return;
                    }
                    js = d.createElement(s);
                    js.id = id;
                    js.src = "//connect.facebook.net/en_US/all.js";
                    fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));
            };

            /**
             * facebookLogin - FB.login prompts the user to authorize your application
             */
            this.facebookLogin = function() {
                FB.login(function(response) {
                    if (response.status === 'connected') {
                        $.log('User is logged in and granted some permissions.');
                    } else if ((response.status === 'not_authorized') || response.authResponse === null) {
                        $.log('User has not granted permissions!');
                    }
                }, {
                    scope: 'publish_stream'
                });
            };

            /**
             * Init call
             */
            this.init = function() {
                _this.fbReady();
                return this; /*this refer to MODULE.subModule*/
            };

            return this.init(); /*initialize the init()*/
        }
        return new _subModule(); /*creating a new object of subModule rather then a funtion*/
    }());

    /**
     * Check to evaluate whether 'MODULE' exists in the global namespace - if not, assign window.MODULE an object literal
     */
}(window.MODULE = window.MODULE || {}, jQuery));