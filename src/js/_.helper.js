/* JavaScript Boilerplate helper file *
 * @version 1.2
 * GIT URL - https://github.com/mdarif/JavaScript-Boilerplate
 * Author - Mohammed Arif
 */

(function (JSB, $, undefined) {
    'use strict';

    /*
     * Singletons serve as a namespace provider which isolate implementation code
     * from the global namespace so as to provide a single point of access for functions,
     * this is useful for organizing code into logical sections.
     * It is possible to put parentheses around this structure to instantiate it immediately after it's parsed.
     * This way it's always present when the script is executed and doesn't have to be instantiated separately.
    */
    JSB.helper = (function () {
        function _helper() {

            /**
            * In non-strict mode, 'this' is bound to the global scope when it isn't bound to anything else.
            * In strict mode it is 'undefined'. That makes it an error to use it outside of a method.
            */

            /*jshint validthis: true */
            var _this = this,

            /*
             * This method return the element using javaScript getElementById() method.
             * This is the private method not meant for use as a public method.
            */
            id = function (el) {
                return document.getElementById(el);
            },

            /*
             * Store information in a cookie
             * Accept three param name, value, days
            */
            setCookie = function (name, value, days) {
                var date = "",
                    expires = "";

                if (days) {
                    date = new Date();
                    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                    expires = "; expires=" + date.toGMTString();
                }

                document.cookie = name + "=" + value + expires + "; path=/";
            },

            /*
             * Get cookie from user machine
             * Accept one parameters name
             *      name : name of the cookie
            */
            getCookie = function (name) {
                var nameEQ = name + "=",
                    i,
                    ca = document.cookie.split(';');
                for (i = 0; i < ca.length; i += 1) {
                    var c = ca[i];
                    while (c.charAt(0) === ' ') {
                        c = c.substring(1, c.length);
                    }
                    if (c.indexOf(nameEQ) === 0) {
                        return c.substring(nameEQ.length, c.length);
                    }
                }
                return null;
            },

            /*
             * Erase or delete cookie from user machine
             * Accept one parameters name
             *      name : name of the cookie
            */
            removeCookie = function (name) {
                setCookie(name, "", -1);
            };

            /*
             * Replace multiple value in a single string.
             * Accept two parameters str, hash
             *      str : String on which replace operation is to be performed
             *      hash : JSON object contain string to be replaced with there replaced value
             * Return the new string at the end.
            */
            this.multiReplace = function (str, hash) {
                var key;
                for (key in hash) {
                    if (Object.prototype.hasOwnProperty.call(hash, key)) {
                        str = str.replace(new RegExp(key, 'g'), hash[key]);
                    }
                }
                return str;
            };

            /*
             * Set the CSS on a particular element
             * Accept two parameters el, styles
             *      el : The name of element on which CSS is to be apply.
             *      styles : Various CSS property with their values. Accept data in JSON format
             * This method calls a private method setStyle
            */
            this.setCSS = function (el, styles) {
                var prop;
                for (prop in styles) {
                    if (styles.hasOwnProperty(prop)) {
                        _this.setStyle(el, prop, styles[prop]);
                    }
                }
            };

            /*
             * Apply the CSS to the given element
             * Accept three parameters elements, prop, val
             *      element : The element on which CSS is to be apply.
             *          This method will automatically search for element using getElementById() method.
             *      prop : CSS properties
             *      val : Vale for CSS property
            */
            this.setStyle = function (el, prop, val) {
                id(el).style[prop] = val;
            };

            /*
             * Check if the given element has given class assign or not.
             * Accept two parameters el, name
             *      el : Element for testing. This method will search for element using JavaScript getElementById() method.
             *      name : name of class to be test
             * This method return true and false
            */
            this.hasClass = function (el, name) {
                el = id(el);
                return new RegExp('(\\s|^)' + name + '(\\s|$)').test(el.className);
            };

            /*
             * Add class to the given element
             * Accept two parameters el, name
             *      el : element on which class to be add
             *      name : name of class
            */
            this.addClass = function (el, name) {
                if (!_this.hasClass(el, name)) {
                    el = id(el);
                    el.className += (el.className ? ' ' : '') + name;
                }
            };

            /*
             * Remove class from given element
             * Accept two parameters el, name
             *      el : element from which class is to be remove
             *      name : name of the class to be remove
            */
            this.removeClass = function (el, name) {
                if (_this.hasClass(el, name)) {
                    el = id(el);
                    el.className = el.className.replace(new RegExp('(\\s|^)' + name + '(\\s|$)'), ' ').replace(/^\s+|\s+$/g, '');
                }
            };

            /*
             * This method will check for blank value in the provided string
             * This will return true if provided string contain blank value and false if not
            */
            this.isBlank = function (string) {
                var isNonblank_re    = /\S/;
                return String(string).search(isNonblank_re) === -1;
            };

            /*
             * Store information to client machine
             * Accept two parameters name, value
             *      name : name of the localStorage
             *      value : value for the localStorage
             * Store information in HTML5 localstorage if available
             * else store information in cookie
            */
            this.setInfo = function (name, value) {
                if (typeof window.localStorage !== 'undefined') {
                    localStorage.setItem(name, value);
                } else {
                    setCookie(name, value);
                }
            };

            /*
             * Get information from client machine
             * Accept two parameters name, checkCookie
             *  name : name of the localstorage
             *      checkCookie : This will either be true or false.
             *            If set to true then scan cookie even if user system support localStorage
             * Get information for HTML5 localstorage if available
             * else get information from cookie
            */
            this.getInfo = function (name, checkCookie) {
                var value = "";
                if (typeof window.localStorage !== 'undefined') {
                    value = localStorage.getItem(name);
                } else {
                    value = getCookie(name);
                }

                if (checkCookie === true) {
                    value = getCookie(name);
                }
                return value;
            };

            /*
             * Remove information from client machine
             * Accept two parameters name, checkCookie
             *      name : name of the localstorage for removing it permanently
             *      checkCookie : This will either be true or false.
             *           If set to true then scan cookie and remove if found even if user system support localStorage
             * Remove information for HTML5 localstorage if available
             * else remove information from cookie
            */
            this.removeInfo = function (name, checkCookie) {
                if (typeof window.localStorage !== 'undefined') {
                    localStorage.removeItem(name);
                } else {
                    removeCookie(name);
                }
                if (checkCookie === true) {
                    removeCookie(name);
                }
            };

            this.init = function () {
                return this; /*returning this from a method is a common way to allow "chaining" of methods together*/
            };

            return this.init(); /*this refer to JSB.helper.init()*/
        }

        return new _helper(); /*creating a new object of helper rather then a funtion*/
    }());

/**
 * Check to evaluate whether 'JSB' exists in the global namespace - if not, assign window.JSB an object literal
 */
}(window.JSB = window.JSB || {}, jQuery));
