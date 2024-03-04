"use strict";

const KvParser = require('./lib/KvParser.js');

/**
 * @param {string|Buffer} input
 * @return {object}
 */
exports.parse = function(input) {
	// Support for environments where Buffer isn't defined
	if (typeof Buffer == 'function' && Buffer.isBuffer(input)) {
		input = input.toString('utf8');
	}

	if (typeof input != 'string') {
		throw new Error(`Unexpected type "${typeof input}" for parameter 'input'`);
	}

	let parser = new KvParser(input);
	return parser.parse();
};
