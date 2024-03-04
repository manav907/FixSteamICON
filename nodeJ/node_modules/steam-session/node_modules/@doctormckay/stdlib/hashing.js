"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.crc32 = exports.sha256 = exports.sha1 = exports.md5 = void 0;
const basic_hash_1 = __importDefault(require("./lib/hashing/basic_hash"));
const crc32_1 = __importDefault(require("./lib/hashing/crc32"));
exports.crc32 = crc32_1.default;
/**
 * @param {Buffer|string} input
 * @param {string} [outputForm=hex]
 */
function md5(input, outputForm = 'hex') {
    return (0, basic_hash_1.default)('md5', input, outputForm);
}
exports.md5 = md5;
/**
 * @param {Buffer|string} input
 * @param {string} [outputForm=hex]
 */
function sha1(input, outputForm = 'hex') {
    return (0, basic_hash_1.default)('sha1', input, outputForm);
}
exports.sha1 = sha1;
/**
 * @param {Buffer|string} input
 * @param {string} [outputForm=hex]
 */
function sha256(input, outputForm = 'hex') {
    return (0, basic_hash_1.default)('sha256', input, outputForm);
}
exports.sha256 = sha256;
const Hashing = {
    md5,
    sha1,
    sha256,
    crc32: crc32_1.default
};
exports.default = Hashing;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFzaGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNyYy9oYXNoaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBLDBFQUFpRDtBQUNqRCxnRUFBd0M7QUFxQ3ZDLGdCQXJDTSxlQUFLLENBcUNOO0FBbkNOOzs7R0FHRztBQUNILFNBQVMsR0FBRyxDQUFDLEtBQW9CLEVBQUUsVUFBVSxHQUFHLEtBQUs7SUFDcEQsT0FBTyxJQUFBLG9CQUFTLEVBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQztBQUM1QyxDQUFDO0FBMEJBLGtCQUFHO0FBeEJKOzs7R0FHRztBQUNILFNBQVMsSUFBSSxDQUFDLEtBQW9CLEVBQUUsVUFBVSxHQUFHLEtBQUs7SUFDckQsT0FBTyxJQUFBLG9CQUFTLEVBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQztBQUM3QyxDQUFDO0FBbUJBLG9CQUFJO0FBakJMOzs7R0FHRztBQUNILFNBQVMsTUFBTSxDQUFDLEtBQW9CLEVBQUUsVUFBVSxHQUFHLEtBQUs7SUFDdkQsT0FBTyxJQUFBLG9CQUFTLEVBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQztBQUMvQyxDQUFDO0FBWUEsd0JBQU07QUFWUCxNQUFNLE9BQU8sR0FBYztJQUMxQixHQUFHO0lBQ0gsSUFBSTtJQUNKLE1BQU07SUFDTixLQUFLLEVBQUwsZUFBSztDQUNMLENBQUM7QUFTRixrQkFBZSxPQUFPLENBQUMifQ==