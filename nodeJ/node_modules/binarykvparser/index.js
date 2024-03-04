var Long = require('long');

var Type = {
	"None": 0,
	"String": 1,
	"Int32": 2,
	"Float32": 3,
	"Pointer": 4,
	"WideString": 5,
	"Color": 6,
	"UInt64": 7,
	"Int64": 10, // signed
	"End": 8
};

/**
 * Parse a BinaryKeyValues buffer to an object
 * @param {Buffer|ByteBuffer} buffer
 * @param {int} [offset=0] - Offset where you want to start, defaults to 0 (the beginning of the buffer)
 * @returns {object}
 */
exports.parse = function(buffer, offset) {
	if (buffer.toBuffer) {
		// Convert it to a standard Buffer if it's a ByteBuffer
		buffer = buffer.toBuffer();
	}
	
	var obj = {};
	var type, name, value;
	var isRootAndWantsLength = false;
	
	if (typeof offset === 'undefined') {
		offset = [0];
	}

	if (arguments[2] == 'I want the length please') {
		isRootAndWantsLength = true;
	}
	
	if (!(offset instanceof Array)) {
		offset = [offset]; // turn this into an array because it needs to be passed by reference later :/
	}
	
	while (true) {
		type = buffer.readUInt8(offset[0]);
		offset[0] += 1;
		
		if (type == Type.End) {
			break;
		}
		
		name = readCString();
		
		if (type === Type.None && !name && !Object.keys(obj).length) {
			// Root node
			name = readCString();
		}
		
		switch (type) {
			case Type.None:
				value = exports.parse(buffer, offset);
				break;
			
			case Type.String:
				value = readCString();
				break;
			
			case Type.Int32:
			case Type.Color:
			case Type.Pointer:
				value = buffer.readInt32LE(offset[0]);
				offset[0] += 4;
				break;
			
			case Type.UInt64:
				value = new Long(buffer.readUInt32LE(offset[0]), buffer.readUInt32LE(offset[0] + 4), true);
				offset[0] += 8;
				break;
			
			case Type.Int64:
				value = new Long(buffer.readInt32LE(offset[0]), buffer.readInt32LE(offset[0] + 4), false);
				offset[0] += 8;
				break;
			
			case Type.Float32:
				value = buffer.readFloatLE(offset[0]);
				offset[0] += 4;
				break;
			
			default:
				throw new Error("Unknown KV type " + type + " encountered at offset " + offset[0]);
		}
		
		if (name) {
			obj[name] = convertObject(value);
		}
	}

	if (isRootAndWantsLength) {
		return offset[0];
	}
	
	return obj;
	
	function readCString() {
		var end = buffer.indexOf(0, offset[0]);
		var str = buffer.toString('utf8', offset[0], end);
		offset[0] = end + 1;
		return str;
	}
};

/**
 * Get the length in bytes of the BinaryKV object that starts at the beginning of the provided buffer
 * @param {Buffer|ByteBuffer} buffer
 * @param {int} [offset=0] - Offset where you want to start, defaults to 0 (the beginning of the buffer)
 * @returns {int} - Length of the object in bytes
 */
exports.getByteLength = function(buffer, offset) {
	offset = offset || 0;
	return exports.parse(buffer, offset, 'I want the length please') - offset;
};

/**
 * Converts an object to an array if it's an array-like object
 * @param {object} obj
 * @returns object|array
 */
function convertObject(obj) {
	if (typeof obj !== 'object') {
		return obj;
	}

	var keys = Object.keys(obj);

	var i;
	for (i = 0; i < keys.length; i++) {
		keys[i] = parseInt(keys[i], 10);
		if (isNaN(keys[i])) {
			return obj;
		}
	}

	keys.sort(function(a, b) {
		if (a == b) {
			return 0;
		} else {
			return a < b ? -1 : 1;
		}
	});

	for (i = 0; i < keys.length; i++) {
		if(keys[i] != i) {
			return obj;
		}
	}

	obj.length = keys.length;
	return Array.prototype.slice.call(obj);
}
