/* JavaScript Boilerplate configuration file *
 * @version 1.0
 */
 /* Why do we need config?
  * All URLs needed by the JavaScript
  * Any strings that are displayed to the user
  * Any HTML that needs to be created from JavaScript
  * Settings (i.e., items per page)
  * Repeated unique values
  * Any value that may change in the future
 */

/*jslint sloppy: true */

/*global FB:false, jQuery, window, document*/

(function (MODULE, undefined) {
	MODULE.config = {
		language: 'english',
        debug: true,
		appId: '150352665021939',
		urls : {
			"404" : "404.shtml",
			"500" : "500.shtml",
			homepage : 'index.html'
		},
		services : {
			FBLogin : '/projectname/mvc/services/1.0/validateFBUser',
			FBLogout : '/projectname/mvc/services/1.0/logoutFBUser',
			checkFacebookUser : "/projectname/mvc/services/1.0/checkFacebookUser"
		},
		theme: {
			skin: 'a',
			toolbars: {
				index: 'ui-navigation-toolbar',
				pages: 'ui-custom-toolbar'
			},
			messages: {
				loading : "Loading...",
				ajaxRequestFail : "Server not responding. Please try again or try after sometime.",
				serviceErrorHTML: "<p class='errorText'>Something went wrong</p>"
			},
			defaults : {
				noRecordsTrendingStories : 6,
				noRecordsOtherVideos : 10,
				noRecordsMoreSupporter : 3
			}
		}
	};

/**
 * Check to evaluate whether 'MODULE' exists in the global namespace - if not, assign window.MODULE an object literal.
 */
}(window.MODULE = window.MODULE || {}, jQuery));