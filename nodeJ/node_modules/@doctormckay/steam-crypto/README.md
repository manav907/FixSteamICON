# node-steam-crypto

Node.js implementation of Steam crypto. All keys, data, and signatures are passed as Buffers.

Fork of, and compatible with, [steam-crypto](https://www.npmjs.com/package/steam-crypto).

## verifySignature(data, signature[, algorithm])

Verifies an RSA signature using the Steam system's public key. `algorithm` defaults to "RSA-SHA1". Returns `true` if the signature is valid, or `false` if not.

## generateSessionKey([nonce])
- `nonce` - If you were prompted by Steam with a nonce, provide it here (as a Buffer)

Generates a 32 byte random blob of data and encrypts it with RSA using the Steam system's public key. Returns an object with the following properties:
* `plain` - the generated session key
* `encrypted` - the encrypted session key

If you provided a nonce, then `encrypted` is the RSA'd concatenation of the session key and the nonce (in that order).

## symmetricEncrypt(input, sessionKey[, iv])

Encrypts `input` using `sessionKey` and `iv` (or a securely-random IV if you don't provide one) and returns the result.

## symmetricEncryptWithHmacIv(input, sessionKey)

Encrypts `input` using `sessionKey` and an IV which is partially comprised of an HMAC of the `input`.

## symmetricDecrypt(input, sessionKey[, checkHmac])

Decrypts `input` using `sessionKey` and returns the result.

If the IV in this ciphertext contains an HMAC, pass `true` for `checkHmac` and it will be validated. Otherwise, it will
not be validated (default behavior).

## symmetricDecryptECB(input, sessionKey)

Decrypts `input` using `sessionKey` and the AES/ECB/PKCS7 cipher without an IV and returns the result.
