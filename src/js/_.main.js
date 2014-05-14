/* JavaScript Boilerplate main scripting file *
 * @version 1.2
 * GIT URL - https://github.com/mdarif/JavaScript-Boilerplate
 * Author - Mohammed Arif
 */

/* JSB (our namespace name) and undefined are passed here
 * to ensure 1. namespace can be modified locally and isn't
 * overwritten outside of our function context
 * 2. the value of undefined is guaranteed as being truly
 * undefined. This is to avoid issues with undefined being
 * mutable pre-ES5.
 */

(function(JSB, $, undefined) {
    'use strict';

    /**
     * Logging function, for debugging mode
     */
    $.log = function(message) {
        if (JSB.config.debug && (typeof window.console !== 'undefined' && typeof window.console.log !== 'undefined') && console.debug) {
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
    JSB.title = 'Interactive Developer';
    JSB.sayHello = function() {
        return "Hello World!";
    };

    /*
     * Singletons serve as a namespace provider which isolate implementation code
     * from the global namespace so as to provide a single point of access for functions,
     * this is useful for organizing code into logical sections.
     * It is possible to put parentheses around this structure to instantiate it immediately after it's parsed.
     * This way it's always present when the script is executed and doesn't have to be instantiated separately.
     */
    JSB.subHelper = (function() {
        function _subHelper() {

            /**
             * In non-strict mode, 'this' is bound to the global scope when it isn't bound to anything else.
             * In strict mode it is 'undefined'. That makes it an error to use it outside of a method.
             */

            /*jshint validthis: true */
            var _this = this;
            /* Store this to avoid scope conflicts */

            /*
             * Return the URI of site
             * Return protocol, hostname and port if found
             *
            */
            this.getDomain = function () {
                var port = "",
                    url = "";

                if (window.location.port) {
                    port = ":" + window.location.port;
                }
                url = window.location.protocol + "//" + window.location.hostname + port + "/";
                return url;
            };

            /*
             * This method will return the query string from the URL of the website
             * Accept two parameters key, default_
             *      key : The name of the key who's value need to be fetch
             *      default_ : The default value which will return when nothing will found or key does not exists.
             *          If not pass anything then it will return blank value.
            */
            this.getQueryString = function (key, default_) {
                if (default_ === null) {
                    default_ = "";
                }

                key = key.replace(/\[/,"\\[").replace(/\]/,"\\]");
                var regex = new RegExp("[\\?&]" + key + "=([^&#]*)"),
                    qs = regex.exec(window.location.href);

                if (qs === null) {
                    return default_;
                } else {
                    return qs[1];
                }
            };

            /**
             * Init call
             */
            this.init = function() {
                _this.getDomain();
                return this; /*this refer to JSB.subHelper*/
            };

            return this.init(); /*initialize the init()*/
        }
        return new _subHelper(); /*creating a new object of subHelper rather then a funtion*/
    }());

    /**
     * Check to evaluate whether 'JSB' exists in the global namespace - if not, assign window.JSB an object literal
     */
}(window.JSB = window.JSB || {}, jQuery));