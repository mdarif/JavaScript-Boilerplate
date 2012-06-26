/* Facebook implementation main config file *
 * @version 1.0
*/

/*jshint forin:true, noarg:true, eqeqeq:true, bitwise:true, undef:true, curly:true, browser:true, devel:true, indent:4, maxerr:50, jquery:true */

/*jslint devel: true, nomen: true, unparam: true, sloppy: true, indent: 4 */

(function (FBDemo, undefined) {
	FBDemo.config = {
        debug : true,
		appId : '310499282370730',
		FriendsListContainer :	"#friends-list-container",
		FBLoginButton :	"#fb-login-button-div"
	};
/**
* Check to evaluate whether 'FBDemo' exists in the global namespace - if not, assign window.FBDemo an object literal
*/
}(window.FBDemo = window.FBDemo || {}, jQuery));