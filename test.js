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
	, z : [
		{ y : 1, x : 2 }
		, { y : 1, x : 3 }
	]
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
var arrayDenyMask = ['c', 'z'];

var denyMask = {
	a : true
	, c : {
		e : true
	}
	, z : true
};

var deepArrayMaskAllow = {
	z : { x : true }
}

assert.deepEqual(mask(obj, allowMask, true), { a: 1, c: { e: 4 } });

assert.deepEqual(mask(obj, allowMask2, true), { a: 1, c: {} });

assert.deepEqual(mask(obj, denyMask), { b: 2, c: { d: 3, f: { g: 5 } } });

assert.deepEqual(mask(obj, arrayAllowMask, true), { a: 1, b : 2 });

assert.deepEqual(mask(obj, arrayDenyMask), { a: 1, b : 2 });

assert.deepEqual(mask(obj, deepArrayMaskAllow, true), { z : [ { x : 2 }, { x : 3 } ]});
