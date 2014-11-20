ES6 Harmony Collections
===========================================


The aim of this repository is to provide an **unobtrusive, performances oriented** shim for ES6 collections such **Map** and **Set** for node.js and Browserify.

Collections using weak references such as **WeakMap** are not present as they can't always be efficiently or correctly implemented without native support.

These global functions are already available in Firefox Nightly and Chrome Dev channel through *Enable Experimental JavaScript* in *chrome://flags/* section.


Features
--------
  * compatible with **node.js**, and both **all browsers** and **Rhino** through Browserify (`npm install es6-unweak-collections`).
  * If native collections are present, they're returned instead rather than the shims.
  * **size and performances oriented** polyfill.


Alternatives
------------
  * The original [es6-collections](https://github.com/WebReflection/es6-collections) project that this is based on.
  * the bigger and rich in dependencies [WeakMap shim from Mark S. Miller](http://code.google.com/p/es-lab/source/browse/trunk/src/ses/WeakMap.js), the best attempt to avoid undesired memory leaks. Bear in mind some leak is still possible plus *Object* natives are wrapped plus it brings WeakMap only
  * the unfortunately and so far slower and heavier, memory usage speaking, alternative from [Benvie Harmony Collections Shim](https://github.com/Benvie/ES6-Harmony-Collections-Shim)
  * differently implemented Map and Set (no WeakMap) from [Paul Millr](https://github.com/paulmillr/es6-shim), together with few others ES6 prototypes
  * another attempt based on valueOf to avoid IE enumerability, still problematic with *unknown* objects but less leaks prone from [Gozala](https://gist.github.com/1269991)


Tests
-----
Just type `$ mocha` or `$ npm test` from the project’s folder in terminal.

License
-------

*es6-collections* and the rest of the project is under Mit Style License

    Copyright (C) 2011 by Andrea Giammarchi, @WebReflection

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.
