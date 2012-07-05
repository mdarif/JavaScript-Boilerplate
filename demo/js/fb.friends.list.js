/* Facebook implementation main scripting file *
 * Author: SapientNitro (2011) (http://www.sapient.com)
 * @version 1.0
*/

/* FBDemo (our namespace name) and undefined are passed here
 * To ensure 1. Namespace can be modified locally and isn't
 * overwritten outside of our function context
 * 2. The value of undefined is guaranteed as being truly
 * Undefined. This is to avoid issues with undefined being
 * Mutable pre-ES5.
*/

/*jshint forin:true, noarg:true, eqeqeq:true, bitwise:true, undef:true, curly:true, browser:true, devel:true, indent:4, maxerr:50, jquery:true */

/*jslint devel: true, nomen: true, unparam: true, sloppy: true, indent: 4 */

/*global FB:false*/

(function (FBDemo, $, undefined) {

	/**
     * Logging function, for debugging mode
     */
	$.log = function (message) {
        if (FBDemo.config.debug && (typeof window.console !== 'undefined' && typeof window.console.log !== 'undefined') && console.debug) {
            console.debug(message);
        } /*else {
            alert(message);
        }*/
    };

    FBDemo.facebook = (function () {
        function _facebook() {

			/**
			* Object of the current object
			*/
			var _this = this;

			/**
			* Init call
			* Call various methods require by pages after load
			*/
			this.init = function () {
				_this.FBInit();
                return this;
            };

			/*
			* Callback for showFriendsList function
			*/
			this.onFriendsListLoaded =  function (response) {
				var divTarget = $(FBDemo.config.FriendsListContainer),
					data = response.data,
					html = "";
				for (var friendIndex = 0; friendIndex < data.length; friendIndex++) {
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
})(window.FBDemo = window.FBDemo || {}, jQuery);