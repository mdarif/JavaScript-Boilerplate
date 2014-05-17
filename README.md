# JavaScript Boilerplate v1.2

[![Build Status][build-image]][build-url]   [![Dependency Status][dependencies-image]][dependencies-url]   [![License][license-image]][license-url]   [![Version][version-image]][version-url]

JavaScript Boilerplate is the collection of best practices using a design pattern (Global Abatement) with the use of defined namespaces that would help you to protect our code. It is developed in a modular way with some commonly used utility methods provided that you would find useful for common operations. It is equipped with the configuration file in the form of an object literal that can be used to store global objects, config ids, URLs or textual strings. This framework has been designed to work as a ready to use template that you can build further in your projects as needed as it outlines the framework neatly and exhibits an approach to extend it.

## What's new in v1.2?
* Have added the Jasmine Test Suite to unit test the boilerplate code with or without PhantomJS, one can fire up the same through Chrome as well
* Grunt build has been enhanced tremendously
* JavaScript syntax highlighting has been added
* `MODULE` has renamed to `JSB` for better JavaScript semantics
* Travis CI has been kicked off
* Made several small changes like `use strict`, dir changes, css fixes, additional grunt plug-ins also have been added etc.

## Files in Repository

1. `src/index.html` - An html help file illustrating helper functions.

2. `src/js/_config.js` - Config is having general details that will be commonly used across the application. Parameters like URLs, services, theme to be used within the application.

3. `src/js/_helper.js` - Helper utility functions that are required across different modules or even within a single module.

4. `src/js/_main.js` - It defines the main module. We have used IIFE (Intermediately invoking function expression) namespacing and global abatement in this logic. JSB is main namespace that has been defined and JSB.helper is one of the components.

5. `src/css/style.css` - Style sheets for the html help file.

## Usage

1. Clone the repository using the quick start guide. To get started include the JS files in your js directory.

    The starting point is the `src/js/_main.js` file which has defined the main module and the component to be used. If you were to observe the code,

        (function (JSB, $, undefined) {

            ...... (2)

        })(window.JSB = window.JSB || {}, jQuery);

    The above code defines the `JSB` namespace and also passes true values of `jquery` and `undefined` to the inner component. Instead of `JSB` you can define your project name or application name as well and that would become your global namespace under which all the other components should be declared/defined. For e.g. if it is a project name `MYPROJECT` instead of `JSB` you can even write `MYPROJECT` as well.

    Once you have defined the wrapper (global namespace), you can start of modules inside the global namespace.

2. The second step would be to define the components, which can be page level or widget level too.


    JSB.subModule = (function () {
        function _subModule() {
        ... (3)
        }
        return new _subModule()
     })();


   The above code has defined a component called helper as a sub module of `JSB` namespace. `JSB.helper` holds an object that gets returned through `new _subModule()`. We can define all the functions that we want for the helper module inside the function `_subModule()`.


3. The third step would be to define the private values, private functions , privileged functions etc. within the `_subModule` function. Comments have been provided as to which one is a private function and which is a privileged one. At the end of the function the `init()` function is exposed which in turn returns the object itself. When the object is returned all the privileged functions are exposed along with it and are accessible outside.



4. Next is the `src/js/_config.js` file, which has all the global parameters that needs to be leveraged across the application. Think of this file/module as a container file to define your global variables, URLS etc. It is globally available inside the `JSB` namespace and we can access the parameters by specifying `JSB.config.param` to get its value in any other component. Here it has been primarily defined as an object literal as everything needs to be exposed globally.

5. For creating utility methods to be used across application, you can leverage the `src/js/_helper.js` file. It works on the same principle as the `src/js/_main.js`. For E.g. the way to access a helper function outside the module would be `JSB.helper.getCookie` for the `getCookie` function.


## Quick start

Clone the git repo - `git clone git://github.com/mdarif/JavaScript-Boilerplate.git` - or [download it](https://github.com/mdarif/JavaScript-Boilerplate/zipball/master)

You can also get the JavaScript Boilerplate through npm if you have already installed node.

    npm install javascript-boilerplate

## Grunt Build

Install [Grunt](http://gruntjs.com/getting-started).

OR 

###Follow the below instructions to install and setup the `Grunt`

Install Grunt CLI, this will put the grunt command in your system path, allowing it to be run from any directory.

    $ npm install -g grunt-cli

Now install Grunt

    $ npm install grunt

You should also install all the dependencies

    $ npm install

###Follow the below instructions to install and setup the `compass task`
_Run this task with the `grunt compass` command._

[Compass](http://compass-style.org/) is an open-source authoring framework for the [Sass](http://sass-lang.com/) css preprocessor. It helps you build stylesheets faster with a huge library of Sass mixins and functions, advanced tools for spriting, and workflow improvements including file based Sass configuration and a simple pattern for building and using Compass extensions.

This task requires you to have [Ruby](http://www.ruby-lang.org/en/downloads/), [Sass](http://sass-lang.com/tutorial.html), and [Compass](http://compass-style.org/install/) >=0.12.2 installed. If you're on OS X or Linux you probably already have Ruby installed; test with `ruby -v` in your terminal. When you've confirmed you have Ruby installed, run `gem update --system && gem install compass` to install Compass and Sass.

### Fire up the grunt server command and see the preview in browser with live-reload enabled for `app` folder content

    $ grunt server

### Build the Project

    $ grunt

You should be able to see the below message for a successful build and a folder name `dist` has been created with all the expected output, parallel to `src` folder, with all the tasks completed.

    Done, without errors.

### Testing

    $ grunt test

We use jasmine as a unit testing framework to test our boilerplate code, as of now it's been only done for `_.main.js`, you would get all the test done in the next release.


## Contributing

Anyone and everyone is welcome to [contribute](#).


## Project information

* Source: https://github.com/mdarif/JavaScript-Boilerplate


## License

* MIT/GPL license


## Author

* Mohammed Arif [@arif_iq](http://twitter.com/arif_iq), [github](https://github.com/mdarif)

[build-image]:            http://img.shields.io/travis/mdarif/JavaScript-Boilerplate.svg?style=flat
[build-url]:              http://travis-ci.org/mdarif/JavaScript-Boilerplate

[dependencies-image]:     http://img.shields.io/gemnasium/CaryLandholt/AngularFun.svg?style=flat
[dependencies-url]:       https://gemnasium.com/CaryLandholt/AngularFun

[license-image]:          http://img.shields.io/badge/license-MIT/GPL-blue.svg?style=flat
[license-url]:            LICENSE

[version-image]:          http://img.shields.io/github/tag/mdarif/JavaScript-Boilerplate.svg?style=flat
[version-url]:            https://github.com/mdarif/JavaScript-Boilerplate/tags