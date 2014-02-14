/*
 * grunt
 * http://gruntjs.com/
 *
 * Copyright (c) 2013 "Cowboy" Ben Alman
 * Licensed under the MIT license.
 * https://github.com/gruntjs/grunt/blob/master/LICENSE-MIT
 */

// This is the default port that livereload listens on;
// change it if you configure livereload to use another port.
var LIVERELOAD_PORT = 35729;
// lrSnippet is just a function.
// It's a piece of Connect middleware that injects
// a script into the static served html.
var lrSnippet = require('connect-livereload')({
    port: LIVERELOAD_PORT
});
// All the middleware necessary to serve static files.
var livereloadMiddleware = function(connect, options) {
    return [
        // Inject a livereloading script into static files.
        lrSnippet,
        // Serve static files.
        connect.static(options.base),
        // Make empty directories browsable.
        connect.directory(options.base)
    ];
};

// The first part is the "wrapper" function, which encapsulates your Grunt configuration
module.exports = function(grunt) {

    'use strict';

    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Project configuration
    grunt.initConfig({
        // Next we can read in the project settings from the package.json file into the pkg property. This allows us to refer to the values of properties within our package.json file.
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            folder: "dist"
        },
        uglify: { // Task
            options: {
                // The banner is inserted at the top of the output
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: { // Target
                files: { // Dictionary of files
                    'dist/js/<%= pkg.name %>.min.js': ['src/js/_.config.js', 'src/js/_.main.js', 'src/js/_.helper.js'],
                    'dist/demo/js/fb.friends.min.js': ['src/demo/js/fb.config.js', 'src/demo/js/fb.friends.list.js'],
                    'dist/js/libs/jquery.min.js': ['src/js/libs/jquery.js'],
                    'dist/js/libs/require.min.js': ['src/js/libs/require.js']
                }
            }
        },
        htmlmin: { // Task
            dist: { // Target
                options: { // Target options
                    /*removeCommentsFromCDATA: true,
                    // https://github.com/yeoman/grunt-usemin/issues/44
                    //collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true*/

                    removeComments: false,
                    collapseWhitespace: false
                },
                files: { // Dictionary of files
                    'dist/index.html': 'src/index.html', // 'destination': 'source'
                    'dist/demo/facebook_friends_list.html': 'src/demo/facebook_friends_list.html'
                }
            }
        },
        cssmin: { // Task
            combine: {
                files: { // Dictionary of files
                    'dist/css/style.min.css': ['src/css/style.css'],
                    'dist/demo/css/style.min.css': ['src/demo/css/style.css']
                }
            }
        },
        jshint: { // Task
            // Define the files to lint
            files: ['Gruntfile.js', 'src/js/*.js', 'src/demo/js/*.js'],
            // Configure JSHint (documented at http://www.jshint.com/docs/)
            options: {
                // More options here if you want to override JSHint defaults
                jshintrc: '.jshintrc'
            }
        },
        // watch: { // Task
        //     files: ['<%= jshint.files %>'],
        //     tasks: ['jshint']
        // },
        useminPrepare: {
            html: 'dist/index.html'
        },
        usemin: {
            //html: 'dist/index.html'
            html: ['dist/{,*/}*.html'],
            css: ['dist/css/{,*/}*.css'],
            options: {
                dirs: ['dist']
            }
        },
        open: {
            server: {
                path: 'http://localhost:9000'
            }

        },
        connect: {
            client: {
                options: {
                    // The server's port, and the folder to serve from:
                    // Ex: 'localhost:9000' would serve up 'client/index.html'
                    port: 9000,
                    // change this to '0.0.0.0' to access the server from outside
                    hostname: 'localhost',
                    base: 'dist',
                    // Custom middleware for the HTTP server:
                    // The injected JavaScript reloads the page.
                    middleware: livereloadMiddleware
                }
            }
        },
        // The watch task is used to run tasks in response to file changes
        watch: {
            client: {
                // '**' is used to include all subdirectories
                // and subdirectories of subdirectories, and so on, recursively.
                files: ['dist/**/*'],
                // In our case, we don't configure any additional tasks,
                // since livereload is built into the watch task,
                // and since the browser refresh is handled by the snippet.
                // Any other tasks to run (e.g. compile CoffeeScript) go here:
                tasks: [],
                options: {
                    livereload: LIVERELOAD_PORT
                }
            }
        }
    });


/* Don't need to load the individual tasks anymore as we have been using 
'matchdep' task in the start to load all the tasks from node_modules automatically */

    // Finally, we have to load in the Grunt plugins we need. These should have all been installed through npm
        // grunt.loadNpmTasks('grunt-contrib-clean');
        // grunt.loadNpmTasks('grunt-contrib-uglify');
        // grunt.loadNpmTasks('grunt-contrib-jshint');
        // grunt.loadNpmTasks('grunt-contrib-cssmin');
        // grunt.loadNpmTasks('grunt-contrib-htmlmin');
        // grunt.loadNpmTasks('grunt-usemin');
        // grunt.loadNpmTasks('grunt-open');
        // grunt.loadNpmTasks('grunt-contrib-watch');
        // grunt.loadNpmTasks('grunt-contrib-connect'); 

    // Let's set up some tasks
    grunt.registerTask('test', ['jshint']);

    grunt.registerTask('server', [
        'open',
        'connect:client',
        'watch:client'
    ]);

    // The default task can be run just by typing "grunt" on the command line
    grunt.registerTask('default', [
        'clean',
        'useminPrepare',
        'jshint',
        'uglify',
        'cssmin',
        'htmlmin',
        'usemin'
    ]);

};