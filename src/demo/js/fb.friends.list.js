/* Facebook implementation main scripting file *
 * @version 1.1
 * GIT URL - https://github.com/mdarif/JavaScript-Boilerplate
*/

/* FBDemo (our namespace name) and undefined are passed here
 * To ensure 1. Namespace can be modified locally and isn't
 * overwritten outside of our function context
 * 2. The value of undefined is guaranteed as being truly
 * Undefined. This is to avoid issues with undefined being
 * Mutable pre-ES5.
*/

(function (FBDemo, $, undefined) {
    'use strict';

    /**
     * Logging function, for debugging mode
     */
    jQuery.log = function (message) {
        if (FBDemo.config.debug && (typeof window.console !== 'undefined' && typeof window.console.log !== 'undefined') && console.debug) {
            console.debug(message);
        } /*else {
            alert(message);
        }*/
    };

    FBDemo.facebook = (function () {
        function _facebook() {

            /**
            * In non-strict mode, 'this' is bound to the global scope when it isn't bound to anything else.
            * In strict mode it is 'undefined'. That makes it an error to use it outside of a method.
            */

            /*jshint validthis: true */
            var _this = this;
            /**
            * Init call
            * Call various methods require by pages after load
            */
            this.init = function () {
                _this.FBInit();
                _this.FBLogin();
                return this;
            };
            /*
            * Click event for FB logout
            */
            this.FBLogin = function () {
                $(function () {
                    $(FBDemo.config.FBLogin).click(function () {
                        FB.getLoginStatus(function (response) {
                            if (response.status === "unknown") {
                                _this.facebookLogin();
                            } else {
                                FB.logout();
                            }
                        });
                    });
                });
            };
            /*
            * Facebook login
            */
            this.facebookLogin = function () {
                FB.login(function (response) {
                    if (response.status === "connected") {
                        $.log("User is logged in and granted some permissions.");
                    } else if ((response.status === 'not_authorized') || response.authResponse === null) {
                        $.log("User has not granted permissions!");
                    }

                    _this.onFacebookInitialLoginStatus(response);
                });
            };
            /*
            * Callback for showFriendsList function
            */
            this.onFriendsListLoaded =  function (response) {
                var divTarget = $(FBDemo.config.FriendsListContainer),
                    data = response.data,
                    html = "",
                    len = data.length,
                    friendIndex;
                for (friendIndex = 0; friendIndex < len; friendIndex += 1) {
                    html += "<div><strong>" + data[friendIndex].name + "</strong></div>";
                }
                divTarget.html(html);
            };
            /*
            * Show friend list
            */
            this.showFriendsList = function () {
                FB.api('/me/friends', _this.onFriendsListLoaded);
            };
            /*
            * Initialize Facebook
            */
            this.FBInit = function () {
                FB.init({
                    appId  : FBDemo.config.appId,
                    status : true,
                    cookie : true,
                    xfbml  : true
                });

                FB.Event.subscribe('auth.login', function (response) {
                    _this.onFacebookInitialLoginStatus(response);
                });

                FB.getLoginStatus(_this.onFacebookInitialLoginStatus);
            };
            /*
            * Callback functions for 'auth.statusChange' event.
            */
            this.onFacebookInitialLoginStatus = function (response) {
                if (response.status === "connected") {
                    $(FBDemo.config.FBLoginButton).hide();
                    _this.showFriendsList();
                }
            };
            return this.init();
        }

        return new _facebook();
    }());

/**
* Check to evaluate whether 'FBDemo' exists in the global namespace - if not, assign window.FBDemo an object literal
*/
}(window.FBDemo = window.FBDemo || {}, jQuery));
