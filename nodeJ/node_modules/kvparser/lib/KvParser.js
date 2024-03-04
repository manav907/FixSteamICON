"use strict";

const OPEN_BLOCK = Symbol('OpenBlock');
const CLOSE_BLOCK = Symbol('CloseBlock');

const ParseState = {
	ExpectRootKey: 1,       // The next thing we read is expected to be a string containing the name of the root key.
	ExpectRootValue: 2,     // The next thing we read is expected to be OpenBlock for the root.
	ExpectKey: 3,           // The next thing we read is expected to be a string containing a key name, or CloseBlock
	ExpectValue: 4          // The next thing we read is expected to be a string containing a value, or OpenBlock
};

class KvParser {
	/**
	 * @param {string} inputString
	 */
	constructor(inputString) {
		this._input = inputString;
		this._offset = 0;
	}

	parse() {
		let state = ParseState.ExpectRootKey;
		let parsedObject = {};
		let parsePath = [];

		// The name of the key for which we're reading the value
		let pendingKey = null;

		parseLoop:
		while (true) {
			let token = this.readToken();

			switch (state) {
				case ParseState.ExpectRootKey:
					if (typeof token != 'string') {
						this.unexpectedToken(token, 'string');
					}

					pendingKey = token;
					state = ParseState.ExpectRootValue;
					break;

				case ParseState.ExpectRootValue:
					if (token != OPEN_BLOCK) {
						this.unexpectedToken(token, OPEN_BLOCK);
					}

					parsedObject[pendingKey] = {};
					parsePath.push(pendingKey);
					pendingKey = null;
					state = ParseState.ExpectKey;
					break;

				case ParseState.ExpectKey:
					if (typeof token != 'string' && token != CLOSE_BLOCK) {
						this.unexpectedToken(token, ['string', CLOSE_BLOCK]);
					}

					if (typeof token == 'string') {
						pendingKey = token;
						state = ParseState.ExpectValue;
					} else if (token == CLOSE_BLOCK) {
						parsePath.splice(parsePath.length - 1, 1);
						if (parsePath.length == 0) {
							// End of file
							break parseLoop;
						}

						state = ParseState.ExpectKey;
					}

					break;

				case ParseState.ExpectValue:
					if (typeof token != 'string' && token != OPEN_BLOCK) {
						this.unexpectedToken(token, ['string', OPEN_BLOCK]);
					}

					if (typeof token == 'string') {
						setObjectPath(parsedObject, parsePath.concat([pendingKey]), token);
					} else {
						parsePath.push(pendingKey);
						setObjectPath(parsedObject, parsePath, {});
					}

					pendingKey = null;
					state = ParseState.ExpectKey;
					break;

				default:
					throw new Error(`Parser is in unexpected state: ${state}`);
			}
		}

		return parsedObject;
	}

	readToken() {
		// A token is one of the following:
		//   - An unquoted string with no whitespace
		//   - A quoted string
		//   - {
		//   - }

		// Skip any starting whitespace
		let char;
		while (isWhitespace(char = this.readChar())) {}
		
		this.markTokenStart(-1);
		
		// Check if this is a { or }
		switch (char) {
			case '{':
				return OPEN_BLOCK;

			case '}':
				return CLOSE_BLOCK;
		}

		// This token must be either a string or a comment. Is it a comment?
		if (char == '/' && this.previewNextChar() == '/') {
			// The rest of the line is a comment
			while ((char = this.readChar()) != '\n') {}
			// Got a newline. We can start token processing again.
			return this.readToken();
		}
		
		this.markTokenStart(-1);

		// This token is a string. Is it quoted?
		let stringIsQuoted = char == '"';
		let nextCharIsEscaped = false;
		let token = stringIsQuoted ? '' : char;

		while (true) {
			char = this.readChar();

			// Inside of a string token, we only care about 4 special cases:
			//   1. The character we read is part of the token as-is if the next char is escaped
			//   2. If the current char is a backslash, flag the next char as escaped
			//   3. If the string is quoted, a quote ends the token
			//   4. If the string is not quoted, whitespace ends the token

			if (nextCharIsEscaped) {
				token += char;
				nextCharIsEscaped = false;
				continue;
			}

			if (stringIsQuoted && char == '\\') {
				nextCharIsEscaped = true;
				continue;
			}

			if (stringIsQuoted && char == '"') {
				// We done
				break;
			}

			if (!stringIsQuoted && isWhitespace(char)) {
				// We done also
				break;
			}

			// Nothing special about this character.
			token += char;
		}

		return token;
	}

	/**
	 * Throws an Error because we received a token we didn't expect.
	 *
	 * @param {string|Symbol} token
	 * @param {string|Symbol|array<string|Symbol>} [expected]
	 */
	unexpectedToken(token, expected) {
		let msg = `Unexpected token "${tokenToString(token)}"`;
		if (expected) {
			expected = Array.isArray(expected) ? expected : [expected];
			let expectedStr = expected.map(tokenToString).join(' or ');
			msg += `; expected ${expectedStr}`;
		}

		this.throwTokenError(msg);
	}
	
	throwTokenError(errorMessage) {
		let lineNum = 1;
		let colNum = 1;
		
		for (let i = 0; i < this._lastTokenStart; i++) {
			colNum++;
			
			let char = this._input[i];
			
			if (char == '\n') {
				lineNum++;
				colNum = 1;
			}
		}
		
		let err = new Error(`VDF Syntax Error: ${errorMessage} at line ${lineNum}, column ${colNum}`);
		err.line = lineNum;
		err.column = colNum;
		
		throw err;
	}
	
	markTokenStart(offset) {
		offset = offset || 0;
		this._lastTokenStart = this._offset + offset;
	}

	/**
	 * Reads the next character from the input and advances the offset pointer.
	 *
	 * @return {string}
	 */
	readChar() {
		if (this._offset >= this._input.length) {
			throw new Error('Unexpected end of input');
		}

		return this._input[this._offset++];
	}

	/**
	 * Returns the next character from the input buffer without advancing the offset pointer.
	 *
	 * @return {string}
	 */
	previewNextChar() {
		if (this._offset >= this._input.length) {
			throw new Error('Unexpected end of input');
		}

		return this._input[this._offset];
	}
}

function isWhitespace(char) {
	return [' ', '\t', '\r', '\n'].indexOf(char) != -1;
}

function setObjectPath(obj, path, value) {
	for (let i = 0; i < path.length - 1; i++) {
		obj = obj[path[i]];

		// this should never happen
		if (typeof obj != 'object') {
			throw new Error('Assertion failed: typeof obj == \'object\'');
		}
	}

	let prop = path[path.length - 1];
	obj[prop] = value;
}

function tokenToString(token) {
	if (token == OPEN_BLOCK) {
		return '{';
	}

	if (token == CLOSE_BLOCK) {
		return '}';
	}

	return token.toString();
}

module.exports = KvParser;
