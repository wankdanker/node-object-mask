module.exports = mask;

function mask(src, msk, allow) {
	var msk = msk || {};
	var dest = (Array.isArray(src))
		? []
		: {}
		;

	if (Array.isArray(msk)) {
		//convert the array based mask to an object mask
		var tmpMsk = {};

		msk.forEach(function (field) {
			tmpMsk[field] = true;
		});

		msk = tmpMsk;
	}


	if (allow) {
		//the mask represents only those properties which should be
		//copied
		
		for (var key in msk) {
			if (src.hasOwnProperty(key) && mask[key] !== false) {
				if (Array.isArray(src[key])) {
					dest[key] = [];

					src[key].forEach(function (val, i) {
						dest[key].push(mask(val, msk[key], allow));
					});
				}
				else if (typeof src[key] === 'object') {
					dest[key] = mask(src[key], msk[key], allow);
				}
				else {
					dest[key] = src[key];
				}
			}
		}
	}
	else {
		//the mask represents properties which should not be copied
		//we do this by looping through the source object and looking
		//into the mask object to see if the key is defined on the 
		//mask object. If it is defined on the mask object then do
		//not copy it
		
		for (var key in src) {
			if (!msk.hasOwnProperty(key) || typeof msk[key] === 'object') {
				if (Array.isArray(src[key])) {
					dest[key] = [];

					src[key].forEach(function (val, i) {
						dest[key].push(mask(val, msk[key], allow));
					});
				}
				else if (typeof src[key] === 'object') {
					dest[key] = mask(src[key], msk[key], allow);
				}
				else {
					dest[key] = src[key];
				}
			}
		}
	}
	
	return dest;
}

