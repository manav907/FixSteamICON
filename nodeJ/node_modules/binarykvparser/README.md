# BinaryKVParser

This lightweight module parses Binary KeyValues, which is a Valve-proprietary format used in Steam.

This is not the same as VDF aka KeyValues. To parse that, use the [vdf module](https://www.npmjs.com/package/vdf).

# Usage

`require('binarykvparser')` returns the `BinaryKVParser` namespace, which contains two methods:

### parse(buffer[, offset])
- `buffer` - Either a `Buffer` or a [`ByteBuffer`](https://www.npmjs.com/package/bytebuffer) to decode
- `offset` - Optional. The offset where the parser should start reading. Default 0 (to start at the beginning of the buffer). No ending position required, as it will stop automatically once it reaches the end of the message (which may or may not be the end of the buffer)

### getByteLength(buffer[, offset])
- `buffer` - Either a `Buffer` or a [`ByteBuffer`](https://www.npmjs.com/package/bytebuffer) to decode
- `offset` - Optional. The offset where the parser should start reading. Default 0 (to start at the beginning of the buffer). No ending position required, as it will stop automatically once it reaches the end of the message (which may or may not be the end of the buffer)

**v2.2.0 or later is required to use this method**

Returns the length in bytes of the BinaryKV object contained in the given `Buffer`.

# Example

```js
var BinaryKVParser = require('binarykvparser');
var msg = new Buffer('0100000000353430323900027061636b6167656964000dd300000262696c6c696e67747970650001000000026c6963656e736574797065000100000002737461747573000000000000657874656e6465640001616c6c6f7763726f7373726567696f6e74726164696e67616e6467696674696e670066616c736500080061707069647300023000da020000023100e4020000023200e902000008006465706f7469647300023000db020000023100dc020000023200dd020000023300de02000008006170706974656d7300080808', 'hex');
console.log(BinaryKVParser.parse(msg));

/*
{
	"54029": {
		"packageid": 54029,
		"billingtype": 1,
		"licensetype": 1,
		"status": 0,
		"extended": {
			"allowcrossregiontradingandgifting": "false"
		},
		"appids": [
			730,
			740,
			745
		],
		"depotids": [
			731,
			732,
			733,
			734
		],
		"appitems": []
	}
}
*/
```
