"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.humanReadableBytes = void 0;
/**
 * Return a string containing the human-readable representation of the input byte count.
 * @param {int} bytes
 * @param {boolean} [binary=false] - Pass true to use the binary system instead of the decimal system (i.e. MiB instead of MB)
 * @param {boolean} [forceDecimal=false] - Pass true to always append the tenths decimal place, even if it's 0
 * @return {string}
 */
function humanReadableBytes(bytes, binary = false, forceDecimal = false) {
    let units = ['K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
    let suffix = binary ? 'iB' : 'B';
    let base = binary ? 1024 : 1000;
    // handle cases where the input is less than any of the multiples
    if (bytes < base) {
        return bytes + ' B';
    }
    for (let i = 0; i < units.length; i++) {
        // this is the unit we want if it's the last, or dividing by the next highest is < 1
        if (i == units.length - 1 || bytes / Math.pow(base, i + 2) < 1) {
            let bytesVal = bytes / Math.pow(base, i + 1);
            return (forceDecimal ? bytesVal.toFixed(1) : (Math.round(bytesVal * 10) / 10)) + ' ' + units[i] + suffix;
        }
    }
}
exports.humanReadableBytes = humanReadableBytes;
const Units = {
    humanReadableBytes
};
exports.default = Units;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzcmMvdW5pdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUE7Ozs7OztHQU1HO0FBQ0gsU0FBUyxrQkFBa0IsQ0FBQyxLQUFhLEVBQUUsTUFBTSxHQUFHLEtBQUssRUFBRSxZQUFZLEdBQUcsS0FBSztJQUM5RSxJQUFJLEtBQUssR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNyRCxJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO0lBQ2pDLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFFaEMsaUVBQWlFO0lBQ2pFLElBQUksS0FBSyxHQUFHLElBQUksRUFBRTtRQUNqQixPQUFPLEtBQUssR0FBRyxJQUFJLENBQUM7S0FDcEI7SUFFRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUN0QyxvRkFBb0Y7UUFDcEYsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDL0QsSUFBSSxRQUFRLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUM3QyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUM7U0FDekc7S0FDRDtBQUNGLENBQUM7QUFPQSxnREFBa0I7QUFMbkIsTUFBTSxLQUFLLEdBQWM7SUFDeEIsa0JBQWtCO0NBQ2xCLENBQUM7QUFNRixrQkFBZSxLQUFLLENBQUMifQ==