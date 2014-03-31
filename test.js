var mask = require('./')
	, assert = require('assert')
	;

var obj = {
	a : 1
	, b : 2
	, c : {
		d : 3
		, e : 4
		, f : {
			g : 5
		}
	}
};

var allowMask = {
	a : true
	, c : {
		e : true
	}
};

var allowMask2 = {
	a : true
	, c : true
};

var arrayAllowMask = ['a', 'b'];
var arrayDenyMask = ['c'];

var denyMask = {
	a : true
	, c : {
		e : true
	}
};

assert.deepEqual(mask(obj, allowMask, true), { a: 1, c: { e: 4 } });

assert.deepEqual(mask(obj, allowMask2, true), { a: 1, c: {} });

assert.deepEqual(mask(obj, denyMask), { b: 2, c: { d: 3, f: { g: 5 } } });

assert.deepEqual(mask(obj, arrayAllowMask, true), { a: 1, b : 2 });

assert.deepEqual(mask(obj, arrayDenyMask), { a: 1, b : 2 });
