"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringToInt = exports.intToString = void 0;
/**
 * Convert an integer IPv4 address into dotted-decimal string format.
 * @param {int} ipInt
 * @returns {string}
 */
function intToString(ipInt) {
    let buf = Buffer.alloc(4);
    buf.writeUInt32BE(ipInt >>> 0, 0);
    return Array.prototype.join.call(buf, '.');
}
exports.intToString = intToString;
/**
 * Convert a dotted-decimal string IPv4 address to integer format.
 * @param {string} ipString
 * @returns {int}
 */
function stringToInt(ipString) {
    let buf = Buffer.alloc(4);
    let octets = ipString.split('.');
    for (let i = 0; i < 4; i++) {
        buf[i] = parseInt(octets[i], 10);
    }
    return buf.readUInt32BE(0);
}
exports.stringToInt = stringToInt;
const IPv4 = {
    intToString,
    stringToInt
};
exports.default = IPv4;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXB2NC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNyYy9pcHY0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBOzs7O0dBSUc7QUFDSCxTQUFTLFdBQVcsQ0FBQyxLQUFhO0lBQ2pDLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUIsR0FBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2xDLE9BQU8sS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUM1QyxDQUFDO0FBc0JBLGtDQUFXO0FBcEJaOzs7O0dBSUc7QUFDSCxTQUFTLFdBQVcsQ0FBQyxRQUFnQjtJQUNwQyxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFCLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUMzQixHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztLQUNqQztJQUNELE9BQU8sR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM1QixDQUFDO0FBU0Esa0NBQVc7QUFQWixNQUFNLElBQUksR0FBYztJQUN2QixXQUFXO0lBQ1gsV0FBVztDQUNYLENBQUM7QUFPRixrQkFBZSxJQUFJLENBQUMifQ==