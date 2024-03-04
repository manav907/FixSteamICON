"use strict";

const assert = require('assert');
const FS = require('fs');
const Path = require('path');

const parse = require('../index.js').parse;

function parseFile(filename) {
	let fileContent = FS.readFileSync(Path.join(__dirname, 'test_data', filename)).toString('utf8');

	// Fix line endings if git mangled them
	if (filename.endsWith('.eol-crlf.vdf')) {
		// First replace all CRLF with LF, then LF with CRLF. This avoids ending up with \r\r\n
		fileContent = fileContent.replace(/\r\n/g, '\n')
			.replace(/\n/g, '\r\n');
	}

	if (filename.endsWith('.eol-lf.vdf')) {
		fileContent = fileContent.replace(/\r\n/g, '\n');
	}

	return parse(fileContent);
}

let test01crlf = parseFile('test01.eol-crlf.vdf');
assert.deepStrictEqual(test01crlf, {
	UnquotedRoot: {
		Unquoted_Key: 'Unquoted_Value_After_Spaces',
		Unquoted_Key_2: 'Unquoted_Value_After_Tabs',
		Unquoted_Key_3: 'Unquoted_Value_After_Single_Space',
		'Quoted Key 1': 'Quoted Value 1',
		'Quoted key with "nested" quotes': 'Quoted value with "C:\\Some\\Path\\To\\Some\\File.txt"',
		QuotedKeyWithoutWhitespace: 'Quoted value that ends with escaped backslash\\',
		'value with newline': 'This value has a new line in it\r\nthis is the next line',
		SubObject: {
			Hello: 'World',
			'This is': 'A sub-object',
			'Sub Object 3, this one is empty': {}
		}
	}
});

let test01lf = parseFile('test01.eol-lf.vdf');
assert.deepStrictEqual(test01lf, {
	UnquotedRoot: {
		Unquoted_Key: 'Unquoted_Value_After_Spaces',
		Unquoted_Key_2: 'Unquoted_Value_After_Tabs',
		Unquoted_Key_3: 'Unquoted_Value_After_Single_Space',
		'Quoted Key 1': 'Quoted Value 1',
		'Quoted key with "nested" quotes': 'Quoted value with "C:\\Some\\Path\\To\\Some\\File.txt"',
		QuotedKeyWithoutWhitespace: 'Quoted value that ends with escaped backslash\\',
		'value with newline': 'This value has a new line in it\nthis is the next line',
		SubObject: {
			Hello: 'World',
			'This is': 'A sub-object',
			'Sub Object 3, this one is empty': {}
		}
	}
});

assert.throws(() => parseFile('test02.vdf'), validateError(new Error('Unexpected end of input')));

let err = new Error('VDF Syntax Error: Unexpected token "}"; expected string or { at line 5, column 1');
err.line = 5;
err.column = 1;
assert.throws(() => parseFile('test03.vdf'), validateError(err));

err = new Error('VDF Syntax Error: Unexpected token "{"; expected string at line 1, column 1');
err.line = 1;
err.column = 1;
assert.throws(() => parseFile('test04.vdf'), validateError(err));

err = new Error('VDF Syntax Error: Unexpected token "RootValue"; expected { at line 1, column 13');
err.line = 1;
err.column = 13;
assert.throws(() => parseFile('test05.vdf'), validateError(err));

err = new Error('VDF Syntax Error: Unexpected token "{"; expected string or } at line 4, column 2');
err.line = 4;
err.column = 2;
assert.throws(() => parseFile('test06.vdf'), validateError(err));

['440', '730', '210770'].forEach((appid) => {
	let parsed = parseFile(`test${appid}.vdf`);
	assert.deepStrictEqual(parsed, require(`./test_data/test${appid}.json`));
});

let test230290 = parseFile('test230290.eol-lf.vdf');
assert.deepStrictEqual(test230290, require('./test_data/test230290.json'));

console.log('All tests passed');

function validateError(expected) {
	return (actual) => {
		try {
			assert.deepStrictEqual(actual, expected);
			return true;
		} catch (ex) {
			return false;
		}
	};
}
