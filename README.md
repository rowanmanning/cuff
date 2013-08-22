
Cuff
====

A small utility for binding UI controls to DOM elements.

**Current Version:** *0.0.0*  
**Build Status:** [![Build Status][travis-status]][travis]  
**Browser Support:** *Android Browser 2.2–4.2, Firefox 3.6, Firefox 4–19, Google Chrome 14–26, Internet Explorer 6–10, Mobile Safari iOS 3–6, Opera 12.10, Safari 5–6*

```html
<div data-control="greenBox">Element will be green</div>

<script src="path/to/cuff.js"></script>
<script>
    cuff.controls.greenBox = function (element) {
        element.style.backgroundColor = '#0f0';
    };
    cuff();
</script>
```


Getting Started
---------------

Either download [build/cuff.js](build/cuff.js) or install with [Bower][bower]/[Component][component]:

```sh
$ bower install cuff
$ component install rowanmanning/cuff
```

You can load Cuff just by using a script, which will expose `cuff` on the global namespace:

```html
<script src="path/to/cuff.js"></script>
<script>
    cuff();
</script>
```

Or you can load it with CommonJS or AMD module loaders:

```js
var cuff = require('cuff');
cuff();
```


Usage
-----

Cuff exposes a single function which is used to bind JavaScript controls to DOM elements which have a specific attribute: `data-control`. You add your controls (just functions really) to the `cuff.controls` object:

```html
<script src="path/to/cuff.js"></script>
<script>
    cuff.controls.greenBox = function (element) {
        element.style.backgroundColor = '#0f0';
    };
</script>
```

Cuff control functions need to accept a single argument – a DOM element (note: *not* a jQuery object).

Once you've added a control, you can call the `cuff` function. If we've defined the `greenBox` control as above, then our function will be called for each element which has `data-control="greenBox"`:

```html
<div data-control="greenBox">Element will be green</div>

<script src="path/to/cuff.js"></script>
<script>
    cuff.controls.greenBox = function (element) {
        element.style.backgroundColor = '#0f0';
    };
    cuff();
</script>
```

These are the basics, but you can create quite complex controls easily with Cuff. Your function can do anything – Cuff is just a thin layer between the DOM and your JavaScript. [Example of a real-world use case: summary/details control](example/summary-details.html).


### Multiple Controls

Cuff can bind multiple controls to a single element. The `data-control` attribute is parsed in a similar way to the `class` attribute, so you can add as many controls as you wish:

```html
<div data-control="greenBox redText someOtherControl"> ... </div>
```

[Example of binding multiple controls to an element](example/multiple-controls.html).


### Context

By default, Cuff looks for all `data-control` elements in the DOM. You can limit Cuff's influence by passing in a context element:

```html
<script>
    var context = document.getElementById('#only-bind-in-here');
    cuff(context);
</script>
```

[Example of binding with context](example/context.html).


### DOM Changes And New Elements

Cuff can be called multiple times, allowing you to bind to elements which have been added to the DOM since your last call.

[Example of binding to new elements](example/new-elements.html).


### Using A Different Attribute

You may wish to use an attribute other than `data-control`. You can do so quite easily by setting `cuff.CONTROL_ATTR`:

```html
<script>
    cuff.CONTROL_ATTR = 'data-my-fancy-attribute';
    cuff();
</script>
```

[Example of using a different attribute](example/different-attribute.html).


Development
-----------

To develop Cuff you'll need to install [Node.js][node], clone the repo, and install dependencies with `make deps`. If you're on Windows, you'll also need to install [Make for Windows][make].

Once you're set up, you can run the following commands:

```sh
$ make deps         # Install dependencies
$ make bundle       # Bundle up the library as a UMD module for release
$ make lint         # Run JSHint with the correct config
$ make test         # Run unit tests
```

When no build target is specified, make will run `deps lint test bundle`. This means you can use the following command for brevity:

```sh
$ make
```

Also, you'll need to verify that the [integration tests](test/integration) work in all supported browsers.

Code with lint errors or no/failing tests will not be accepted, please use the build tools outlined above.


License
-------

Cuff is licensed under the [MIT][mit] license.



[bower]: http://bower.io/
[component]: https://github.com/component/component
[make]: http://gnuwin32.sourceforge.net/packages/make.htm
[mit]: http://opensource.org/licenses/mit-license.php
[node]: http://nodejs.org/
[travis]: https://travis-ci.org/rowanmanning/cuff
[travis-status]: https://travis-ci.org/rowanmanning/cuff.png?branch=master
