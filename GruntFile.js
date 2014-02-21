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

    // Load grunt tasks automatically
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Define the configuration for all the tasks
    grunt.initConfig({
        // Next we can read in the project settings from the package.json file into the pkg property. This allows us to refer to the values of properties within our package.json file.
        pkg: grunt.file.readJSON('package.json'),

        // Project settings
        jsb: {
            // Configurable paths
            app: 'src',
            dist: 'dist'
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            folder: '<%= jsb.dist %>'
        },


        uglify: {
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
        htmlmin: {
            dist: {
                options: {
                    collapseBooleanAttributes: false,
                    collapseWhitespace: false,
                    removeAttributeQuotes: true,
                    removeCommentsFromCDATA: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= jsb.app %>',
                    src: '{,*/}*.html',
                    dest: '<%= jsb.dist %>'
                }]
                // files: { // Dictionary of files
                //     'dist/index.html': 'src/index.html', // 'destination': 'source'
                //     'dist/demo/facebook_friends_list.html': 'src/demo/facebook_friends_list.html'
                // }
            }
        },


        // Removed unused css
        uncss: {
            dist: {
                files: {
                    '<%= jsb.dist %>/css/style.min.css': ['<%= jsb.app %>/index.html'],
                    '<%= jsb.dist %>/demo/css/style.min.css': ['<%= jsb.app %>/demo/facebook_friends_list.html']
                }
            },
            options: {
                compress: true
            }
        },

        cssmin: {
            dist: {
                options: {
                    keepSpecialComments: 0,
                    report: "min",
                    selectorsMergeMode: "ie8"
                },
                files: { // Dictionary of files
                    '<%= jsb.dist %>/css/style.min.css': ['<%= jsb.app %>/css/style.css'],
                    '<%= jsb.dist %>/demo/css/style.min.css': ['<%= jsb.app %>/demo/css/style.css']
                }
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            // Define the files to lint
            all: [
                'Gruntfile.js',
                '<%= jsb.app %>/js/*.js',
                '<%= jsb.app %>/demo/js/*.js'
            ],
            // Configure JSHint (documented at http://www.jshint.com/docs/)
            options: {
                // More options here if you want to override JSHint defaults
                jshintrc: '.jshintrc'
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: '<%= jsb.app %>/index.html',
            options: {
                dest: '<%= jsb.dist %>'
            }
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            html: ['<%= jsb.dist %>/{,*/}*.html'],
            css: ['<%= jsb.dist %>/css/{,*/}*.css'],
            options: {
                assetsDirs: ['<%= jsb.dist %>']
            }
        },

        // Compare CSS output's
        compare_size: {
            files: [
                '<%= jsb.app %>/css/**',
                '<%= jsb.dist %>/css/**'
            ]
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
                    base: '<%= jsb.app %>',
                    // Custom middleware for the HTTP server:
                    // The injected JavaScript reloads the page.
                    middleware: livereloadMiddleware
                }
            }
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            client: {
                // '**' is used to include all subdirectories
                // and subdirectories of subdirectories, and so on, recursively.
                files: ['<%= jsb.app %>/**/*'],
                // In our case, we don't configure any additional tasks,
                // since livereload is built into the watch task,
                // and since the browser refresh is handled by the snippet.
                // Any other tasks to run (e.g. compile CoffeeScript) go here:
                tasks: [],
                options: {
                    livereload: LIVERELOAD_PORT
                }
            }
        },
        notify: {
            task_name: {
                options: {
                    // Task-specific options go here.
                }
            },
            watch: {
                options: {
                    title: 'Task Complete', // optional
                    message: 'SASS and Uglify finished running' //required
                }
            },
            server: {
                options: {
                    message: 'Server is ready!'
                }
            },
            connect: {
                options: {
                    message: 'Connected to server!'
                }
            }
        },
        // shell: {
        //     docco: {
        //         command: 'docco -o jsdocumentation -l linear src/js/*.js'
        //     }
        // },
        jsdoc: {
            dist: {
                src: ['<%= jsb.app %>/js/_.main.js'],
                options: {
                    destination: '<%= jsb.dist %>/doc'
                }
            }
        }
    });


    /* Don't need to load the individual tasks anymore as we have been using 
    'matchdep' task in the start to load all the tasks from node_modules automatically */

    // Let's set up some tasks
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
        'usemin',
        'uncss',
        'compare_size',
        'notify:server'
    ]);

    // Let's generate the JavaScript documentation
    grunt.registerTask('js-doc', [
        'jsdoc'
    ]);

};