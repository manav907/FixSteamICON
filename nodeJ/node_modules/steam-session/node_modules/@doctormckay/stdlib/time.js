"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timestampString = void 0;
function timestampString() {
    let date = new Date();
    return date.getFullYear() + '-' +
        padStart(date.getMonth() + 1, 2, '0') + '-' +
        padStart(date.getDate(), 2, '0') + ' ' +
        padStart(date.getHours(), 2, '0') + ':' +
        padStart(date.getMinutes(), 2, '0') + ':' +
        padStart(date.getSeconds(), 2, '0');
}
exports.timestampString = timestampString;
const Time = {
    timestampString
};
exports.default = Time;
function padStart(str, length, prefix = ' ') {
    if (typeof str !== 'string') {
        str = str.toString();
    }
    if (str.padStart) {
        return str.padStart(length, prefix);
    }
    else {
        while (str.length < length) {
            str = prefix.substring(0, length - str.length) + str;
        }
        return str;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNyYy90aW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLFNBQVMsZUFBZTtJQUN2QixJQUFJLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO0lBQ3RCLE9BQU8sSUFBSSxDQUFDLFdBQVcsRUFBRSxHQUFHLEdBQUc7UUFDOUIsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEdBQUc7UUFDM0MsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsR0FBRztRQUN0QyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHO1FBQ3ZDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEdBQUc7UUFDekMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDdEMsQ0FBQztBQU9BLDBDQUFlO0FBTGhCLE1BQU0sSUFBSSxHQUFjO0lBQ3ZCLGVBQWU7Q0FDZixDQUFDO0FBTUYsa0JBQWUsSUFBSSxDQUFDO0FBRXBCLFNBQVMsUUFBUSxDQUFDLEdBQWtCLEVBQUUsTUFBYyxFQUFFLE1BQU0sR0FBRyxHQUFHO0lBQ2pFLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxFQUFFO1FBQzVCLEdBQUcsR0FBRyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDckI7SUFFRCxJQUFJLEdBQUcsQ0FBQyxRQUFRLEVBQUU7UUFDakIsT0FBTyxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztLQUNwQztTQUFNO1FBQ04sT0FBTyxHQUFHLENBQUMsTUFBTSxHQUFHLE1BQU0sRUFBRTtZQUMzQixHQUFHLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLENBQUM7U0FDckQ7UUFDRCxPQUFPLEdBQUcsQ0FBQztLQUNYO0FBQ0YsQ0FBQyJ9