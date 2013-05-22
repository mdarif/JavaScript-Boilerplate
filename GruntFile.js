/*
 * grunt
 * http://gruntjs.com/
 *
 * Copyright (c) 2013 "Cowboy" Ben Alman
 * Licensed under the MIT license.
 * https://github.com/gruntjs/grunt/blob/master/LICENSE-MIT
 */


// The first part is the "wrapper" function, which encapsulates your Grunt configuration
module.exports = function(grunt) {

    'use strict';

    // Project configuration
    grunt.initConfig({
        // Next we can read in the project settings from the package.json file into the pkg property. This allows us to refer to the values of properties within our package.json file.
        pkg: grunt.file.readJSON('package.json'),
        // Configure the copy task to move files from the development to production folders
        /*copy: { // Task
            target: {
                files: {
                    'dist/': ['index.html', 'demo/**'] // 'destination': 'source'
                }
            }
        },*/
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
                    'dist/js/<%= pkg.name %>.min.js': ['js/_.config.js', 'js/_.main.js', 'js/_.helper.js'],
                    'dist/demo/js/fb.friends.min.js': ['demo/js/fb.config.js', 'demo/js/fb.friends.list.js'],
                    'dist/js/libs/jquery.min.js': ['js/libs/jquery.js'],
                    'dist/js/libs/require.min.js': ['js/libs/require.js']
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
                    'dist/index.html': 'index.html', // 'destination': 'source'
                    'dist/demo/facebook_friends_list.html': 'demo/facebook_friends_list.html'
                }
            }
        },
        cssmin: { // Task
            combine: {
                files: { // Dictionary of files
                    'dist/css/style.min.css': ['css/style.css'],
                    'dist/demo/css/style.min.css': ['demo/css/style.css']
                }
            }
        },
        qunit: { // Task
            files: ['test/**/*.html']
        },
        jshint: { // Task
            // Define the files to lint
            files: ['Gruntfile.js', 'js/*.js', 'demo/js/*.js'],
            // Configure JSHint (documented at http://www.jshint.com/docs/)
            options: {
                // More options here if you want to override JSHint defaults
                jshintrc: '.jshintrc'
            }
        },
        watch: { // Task
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
        },
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
        }
    });

    // Finally, we have to load in the Grunt plugins we need. These should have all been installed through npm
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-usemin');
    //grunt.loadNpmTasks('grunt-contrib-watch');
    //grunt.loadNpmTasks('grunt-contrib-copy');

    // Let's set up some tasks
    grunt.registerTask('test', ['jshint']);

    // The default task can be run just by typing "grunt" on the command line
    grunt.registerTask('default', ['clean', 'useminPrepare', 'jshint', 'uglify', 'cssmin', 'htmlmin', 'usemin']);

};
