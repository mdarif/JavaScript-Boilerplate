module.exports = function(config) {
	config.set({

		// base path, that will be used to resolve files and exclude
		basePath: '',

		// list of files/patterns to load in the browser
		files: [
			'src/js/libs/jquery.js',
			'src/js/*.js',
			'test/unit/*.js'
		],

		// preprocessors: {
		//     '**/src/js/**/*.js': 'coverage'
		// },

		// list of files to exclude
		exclude: [],

		// use dolts reporter, as travis terminal does not support escaping sequences
		// possible values: 'dots', 'progress', 'junit', 'teamcity'
		// CLI --reporters progress
		reporters: ['progress', 'coverage'],

		preprocessors: { //The preprocessor configures which files should be tested for coverage. For example if all your code lives in lib/ you need to add this to your configuration file.
			// source files, that you wanna generate coverage for
			// do not include tests or libraries
			// (these files will be instrumented by Istanbul)
			'src/js/*.js': ['coverage']
		},

		coverageReporter: {
			type: 'html',
			dir: 'test/coverage/'
		},

		// web server port
		// CLI --port 9876
		port: 9876,

		// cli runner port
		// CLI --runner-port 9100
		runnerPort: 9100,

		// enable / disable colors in the output (reporters and logs)
		// CLI --colors --no-colors
		colors: true,

		// level of logging
		logLevel: config.LOG_ERROR,

		// enable / disable watching file and executing tests whenever any file changes
		// CLI --auto-watch --no-auto-watch
		autoWatch: true,

		// load jasmine (this replaces JASMINE and JASMINE_ADAPTER file references)
		frameworks: ['jasmine'],

		// Start these browsers, currently available:
		// - Chrome
		// - ChromeCanary
		// - Firefox
		// - Opera
		// - Safari (only Mac)
		// - PhantomJS
		// - IE (only Windows)
		// CLI --browsers Chrome,Firefox,Safari
		browsers: ['PhantomJS'],
		//browsers: ['Chrome'],

		// If browser does not capture in given timeout [ms], kill it
		// CLI --capture-timeout 5000
		captureTimeout: 60000,

		// Continuous Integration mode
		// if true, it capture browsers, run tests and exit
		singleRun: false,

		// report which specs are slower than 500ms
		// CLI --report-slower-than 500
		reportSlowerThan: 500,

		// load the needed plugins (according to karma docs, this should not be needed tho)
		plugins: [
			'karma-jasmine',
			'karma-coverage',
			'karma-chrome-launcher',
			'karma-firefox-launcher',
			'karma-phantomjs-launcher'
		]
	});
};
