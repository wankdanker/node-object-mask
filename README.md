node-object-mask
------------------

The purpose of this module is to provide a way to specify which properties
of an object should be copied to a new instance of the object. It can be done
in either allow or deny modes. 

In deny mode (the default), any property which exists on both the source object
and the mask object will NOT be copied; copying only properties which are NOT
defined on the mask object.

In allow mode, any property which exists on both the source object and the
mask object WILL be copied; copying only properties which ARE defined on the
mask object.

install
------------

npm

```bash
npm install object-mask
```

git

```bash
git clone git://github.com/wankdanker/node-object-mask.git
```

the function
------------

mask(sourceObject, maskObject, allow);

* _sourceObject_ - the object to copy
* _maskObject_ - the object or array which defines properties to copy
	* if the _maskObject_ is an array then it is assumed that the _sourceObject_
	will be a flat object and the values of the array will be used as the propery
	names to mask
* _allow_ - optional - true/false use allow mode (default is deny)

example
------------

```javascript
mask = require('mask');

var obj = {
  "sku" : "12345"
  , "upc" : "99999912345X"
  , "title" : "Test Item"
  , "description" : "Description of test item"
  , "length" : 5
  , "width" : 2
  , "height" : 8
  , "inventory" : {
    "onHandQty" : 12
  }
};

var objMask = {
  sku : true
  , upc : true
  , description : true
}


var result = mask(obj, objMask, true);

/*
{ 
  sku : "12345"
  , upc : "99999912345X"
  , description : "Description of test item"
};
*/

//or in the default deny mode

var result = mask(obj, objMask);

/*
{
  "title" : "Test Item"
  , "length" : 5
  , "width" : 2
  , "height" : 8
  , "inventory" : {
    "onHandQty" : 12
  }
};
*/

//using an array mask

var arrayMask = ["title", "length"];

var result = mask(obj, arrayMask, true);

/*
{
  "title" : "Test Item"
  , "length" : 5
};
*/




```

license
----------

### The MIT License (MIT)


Copyright (c) 2012 Daniel L. VerWeire

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
