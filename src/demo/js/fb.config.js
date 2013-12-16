/* Facebook implementation main config file *
 * @version 1.1
 * GIT URL - https://github.com/mdarif/JavaScript-Boilerplate
*/

(function (FBDemo, $, undefined) {
	FBDemo.config = {
        debug : true,
		appId : '123717221132767',
		FriendsListContainer :	"#friends-list-container",
		FBLoginButton :	"#fb-login-button-div"
	};
/**
* Check to evaluate whether 'FBDemo' exists in the global namespace - if not, assign window.FBDemo an object literal
*/
}(window.FBDemo = window.FBDemo || {}, jQuery));
