# [JavaScript Boilerplate](https://github.com/mdarif/JavaScript-Boilerplate)

JavaScript Boilerplate is the collection of best practices using a design pattern (Global Abatement) with the use of defined namespaces that would help you to protect our code. It is developed in a modular way with some commonly used utility methods provided that you would find useful for common operations. It is equipped with the configuration file in the form of an object literal that can be used to store global objects, config ids, URLs or textual strings. This framework has been designed to work as a ready to use template that you can build further in your projects as needed as it outlines the framework neatly and exhibits an approach to extend it.


## Files in Repository


1.  `index.html` - An html help file illustrating helper functions.

2.  `js/_config.js` - Config is having general details that will be commonly used across the application. Parameters like URLs, services, theme to be used within the application.

3.  `js/_helper.js` - Helper utility functions that are required across different modules or even within a single module.

4.  `js/_main.js` - It defines the main module. We have used IIFE (Intermediately invoking function expression) namespacing and global abatement in this logic. MODULE is main namespace that has been defined and MODULE.helper is one of the components.

5.  `css/style.css` - Style sheets for the html help file.

## Usage

1. Clone the repository using the quick start guide. To get started include the JS files in your js directory.

    The starting point is the `_main.js` file which has defined the main module and the component to be used. If you were to observe the code,

        (function (MODULE, $, undefined) {

            ...... (2)

        })(window.MODULE = window.MODULE || {}, jQuery);

    The above code defines the `MODULE` namespace and also passes true values of `jquery` and `undefined` to the inner component. Instead of `MODULE` you can define your project name or application name as well and that would become your global namespace under which all the other components should be declared/defined. For e.g. if it is a project name `MYPROJECT` instead of `MODULE` you can even write `MYPROJECT` as well.

    Once you have defined the wrapper (global namespace), you can start of modules inside the global namespace.

2. The second step would be to define the components, which can be page level or widget level too.

	```javascript
    MODULE.subModule = (function () {

        function _subModule() {

        ... (3)


        }


        return new _subModule();


    })();
    ```

    The above code has defined a component called helper as a sub module of `MODULE` namespace. `MODULE.helper` holds an object that gets returned through `new _subModule()`. We can define all the functions that we want for the helper module inside the function `_subModule()`.


3. The third step would be to define the private values, private functions , priviledged functions etc. within the `_subModule` function. Comments have been provided as to which one is a private function and which is a priviledged one. At the end of the function the `init()` function is exposed which in turn returns the object itself. When the object is returned all the priviledged functions are exposed along with it and are accessible outside.



4. Next is the `_config.js` file, which has all the global parameters that needs to be leveraged across the application. Think of this file/module as a container file to define your global variables, URLS etc. It is globally available inside the `MODULE` namespace and we can access the parameters by specifying `MODULE.config.param` to get its value in any other component. Here it has been primarily defined as an object literal as everything needs to be exposed globally.

5. For creating utility methods to be used across application, you can leverage the `_helper.js` file. It works on the same principle as the `_main.js`. For E.g. the way to access a helper function outside the module would be `MODULE.helper.getCookie` for the `getCookie` function.


## Quick start

Clone the git repo - `git clone git://github.com/mdarif/JavaScript-Boilerplate.git` - or [download it](https://github.com/mdarif/JavaScript-Boilerplate/zipball/master)

## Contributing

Anyone and everyone is welcome to [contribute](#).


## Project information

* Source: https://github.com/mdarif/JavaScript-Boilerplate


## License

* MIT/GPL license


## Authors

* Mohammed Arif [@arif_iq](http://twitter.com/arif_iq), [github](https://github.com/mdarif)
* Venkat R Iyer [@viyer1](http://twitter.com/viyer1), [github](https://github.com/viyer1)
