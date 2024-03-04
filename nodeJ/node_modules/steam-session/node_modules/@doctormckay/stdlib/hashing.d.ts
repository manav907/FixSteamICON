/// <reference types="node" />
import { Hashing as ModuleType } from './lib/_meta/module-types';
import crc32 from './lib/hashing/crc32';
/**
 * @param {Buffer|string} input
 * @param {string} [outputForm=hex]
 */
declare function md5(input: string | Buffer, outputForm?: string): string | Buffer;
/**
 * @param {Buffer|string} input
 * @param {string} [outputForm=hex]
 */
declare function sha1(input: string | Buffer, outputForm?: string): string | Buffer;
/**
 * @param {Buffer|string} input
 * @param {string} [outputForm=hex]
 */
declare function sha256(input: string | Buffer, outputForm?: string): string | Buffer;
declare const Hashing: ModuleType;
export { md5, sha1, sha256, crc32 };
export default Hashing;
//# sourceMappingURL=hashing.d.ts.map