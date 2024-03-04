# KeyValues/VDF Parser

[![npm version](https://img.shields.io/npm/v/kvparser.svg)](https://npmjs.com/package/kvparser)
[![npm downloads](https://img.shields.io/npm/dm/kvparser.svg)](https://npmjs.com/package/kvparser)
[![license](https://img.shields.io/npm/l/kvparser.svg)](https://github.com/DoctorMcKay/node-kvparser/blob/master/LICENSE)
[![sponsors](https://img.shields.io/github/sponsors/DoctorMcKay.svg)](https://github.com/sponsors/DoctorMcKay)

Parses Valve's [KeyValues](https://developer.valvesoftware.com/wiki/KeyValues) aka VDF format.

Fully compliant with escape sequences and comments.

## Usage

Import the package:

```js
const {parse} = require('kvparser');
```

or

```js
import {parse} from 'kvparser';
```

### parse(data)

Pass a string to the `parse` function, which will return an object. Since all KV structures begin with a named root key,
the output object will have exactly one property, the value of which is an object.

## Implementation Details

No extra processing is done to any data types. This means that all numbers are returned as strings. Additionally, 
proto-arrays are not automatically decoded into arrays. For example, this input data:

```
ExampleData
{
	"some_key_1"      "1"
	"some_key_2"      "1"
	"some_key_3"      "1"
}
```

Is decoded as:

```json
{
	"ExampleData": {
		"some_key_1": "1",
		"some_key_2": "1",
		"some_key_3": "1"
	}
}
```

Any data after the closing `}` is ignored. Any sequence that begins with `//` and terminates with a newline is treated
as a comment and is ignored.

Escape sequences are supported in quoted strings. Any backslash characters inside a quoted string are removed, and the
following character is rendered as-is. Here are some example escape sequences and what they parse into:

- `"\""` becomes `'"'`
- `"\\"` becomes `'\\'` (a string containing a single backslash, which JavaScript serializes into an escaped backslash)
- `"\n"` becomes `'n'`
