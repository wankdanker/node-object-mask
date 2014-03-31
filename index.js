module.exports = mask;

function mask(src, msk, allow) {
	msk = msk || {};

	
	if (Array.isArray(msk)) {
		return maskByArray(src, msk, allow);
	}
	else {
		return maskByObject(src, msk, allow);
	}
}

function maskByObject(src, msk, allow) {
	var dest = (Array.isArray(src))
		? []
		: {}
		;


	if (allow) {
		//the mask represents only those properties which should be
		//copied
		
		for (var key in msk) {
			if (src.hasOwnProperty(key)) {
				if (typeof src[key] === 'object') {
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
				
				if (typeof src[key] === 'object') {
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

function maskByArray(src, msk, allow) {
	var key, i;
	var dest = (Array.isArray(src))
		? []
		: {}
		;

	if (allow) {
		//the mask represents only those properties which should be
		//copied
		for (i in msk) {
			key = msk[i];

			if (src.hasOwnProperty(key)) {
				dest[key] = src[key];
			}
		}
	}
	else {
		//the mask represents properties which should not be copied
		//we do this by looping through the source object and looking
		//into the mask object to see if the key is defined on the 
		//mask object. If it is defined on the mask object then do
		//not copy it
		
		for (key in src) {
			if (!~msk.indexOf(key)) {
				dest[key] = src[key]
			}
		}
	}
	
	return dest;
}
