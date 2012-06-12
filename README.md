# [JavaScript Boilerplate](https://github.com/mdarif/JavaScript-Boilerplate)

JavaScript Boilerplate is the collection of best practices using a design pattern (global abetment) with the namespaces which would help us out to protect our code in a modular way with some commonly used utility methods, it�s equipped with the configuration file in the form object literal. It would be a template over which people can build their projects. We would also be looking into different APIs that can combine along with the best practices to enhance our customized solution.


## Files in Repository


1.  index.html - A html help file for helper functions. It also explains the privileged and private functions within the file.

2.  js/_config.js - JS file having general details that will be commonly used across the application. Parameters like URLs, services, theme to be used within the application.

3.  js/_helper.js - JS file having utility functions that are required across different modules or even within a single module.

4.  js/_main.js - Main module is defined here. We have used 'IIFE' (Intermediately invoking function expression) namespacing pattern and global abetment in this logic. Module is main namespace that has been defined and module.helper is one of the components.

5.  css/style.css - Style sheets for the html help file.

## Usage

1.  Clone the repository using the quick start guide. To get started include the JS files in your js directory.

The starting point is the _main.js file which has defined the main module and the component to be used. If you were to observe the code,

	```javascript
    (function (MODULE, $, undefined) {

    ...... (2)

    })(window.MODULE = window.MODULE || {}, jQuery);
    ```

The above code defined the MODULE namespace and also passed true values of jquery and undefined to the inner component.
Instead of MODULE you can define your project name or application name as well and that would be global namespace under which all the other components would be defined. So for e.g. if it is a coke project instead of MODULE you can even write COKE as well. 

Once you have defined the wrapper you can start of modules inside the global namespace.

2.  The second step would be to define the components which can be page level or widget level too.

	```javascript
    MODULE.subModule = (function () {

        function _subModule() {

        ... (3)


        }


        return new _subModule();


    })();
    ```

The above code has defined a component called helper as a sub module of 'MODULE' namespace. 'MODULE.helper' holds an object that gets returned through 'new _subModule()'. We can define all the functions that we want for the helper module inside the function _subModule().


3.  The third step would be to define the private values, private functions , priviledged functions etc within the '_subModule' function. Comments have been provided as to which one is a private function and which is a priviledged one. At the end of the function the init function is exposed which inturn returns the object itself. When the object is returned all the priviledged functions are exposed along with it and are accessible outside.



4.  Next is the '_config.js' file which has all the global parameters that needs to be leveraged across the application.Think of this file/module as a spot to define your global variables that you would have ideally done before. It is globally available inside the Module namespace and we can access the parameters by specifying Module.config.language to get the value english in any other component. Here it has been primarily defined as an object literal as everything needs to be exposed globally.

5.  For creating utility methods to be used across application, you can leverage the '_helper.js' file. It works on the same principle as the _main.js. And the way to access a helper function outside the module would be 'MODULE.helper.getCookie' for the getCookie function.


## Quick start

Clone the git repo - `git clone git://github.com/mdarif/JavaScript-Boilerplate.git` - or [download it](https://github.com/mdarif/JavaScript-Boilerplate/zipball/master)

## Contributing

Anyone and everyone is welcome to [contribute](#).


## Project information

* Source: https://github.com/mdarif/JavaScript-Boilerplate


## License

Freely distributable within Sapient. 


## Authors

* Mohammed Arif [@arif_iq](http://twitter.com/arif_iq), [github](https://github.com/mdarif)
* Venkat R Iyer [@viyer1](http://twitter.com/viyer1), [github](https://github.com/viyer1)
