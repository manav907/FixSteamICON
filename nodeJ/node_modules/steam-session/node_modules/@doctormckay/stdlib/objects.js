"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepEqual = exports.clone = void 0;
/**
 * Clone an object/array/any other type.
 * @param {*} obj
 * @returns {*}
 */
function clone(obj) {
    if (typeof obj != 'object' || obj === null) {
        return obj;
    }
    let outObj = Array.isArray(obj) ? obj.slice(0) : {};
    for (let i in obj) {
        outObj[i] = Objects.clone(obj[i]);
    }
    return outObj;
}
exports.clone = clone;
/**
 * Check whether two objects or values and all their subobjects are equal (same keys with same values, but not necessarily in the same order (except for arrays))
 * @param {*} obj1
 * @param {*} obj2
 * @param {boolean} [strict=false] - Use strict equality checks?
 * @returns {boolean}
 */
function deepEqual(obj1, obj2, strict = false) {
    if (typeof obj1 != 'object') {
        return checkEq(obj1, obj2);
    }
    if (obj1 === null) {
        return obj1 === obj2;
    }
    // Catch cases where obj2 has extra keys
    if (Object.keys(obj1).length !== Object.keys(obj2).length) {
        return false;
    }
    for (let i in obj1) {
        if (!Objects.deepEqual(obj1[i], obj2[i], strict)) {
            return false;
        }
    }
    return true;
    function checkEq(val1, val2) {
        return strict ? val1 === val2 : val1 == val2;
    }
}
exports.deepEqual = deepEqual;
const Objects = {
    clone,
    deepEqual
};
exports.default = Objects;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JqZWN0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNyYy9vYmplY3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBOzs7O0dBSUc7QUFDSCxTQUFTLEtBQUssQ0FBQyxHQUFRO0lBQ3RCLElBQUksT0FBTyxHQUFHLElBQUksUUFBUSxJQUFJLEdBQUcsS0FBSyxJQUFJLEVBQUU7UUFDM0MsT0FBTyxHQUFHLENBQUM7S0FDWDtJQUVELElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNwRCxLQUFLLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRTtRQUNsQixNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNsQztJQUVELE9BQU8sTUFBTSxDQUFDO0FBQ2YsQ0FBQztBQTBDQSxzQkFBSztBQXhDTjs7Ozs7O0dBTUc7QUFDSCxTQUFTLFNBQVMsQ0FBQyxJQUFTLEVBQUUsSUFBUyxFQUFFLE1BQU0sR0FBRyxLQUFLO0lBQ3RELElBQUksT0FBTyxJQUFJLElBQUksUUFBUSxFQUFFO1FBQzVCLE9BQU8sT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztLQUMzQjtJQUVELElBQUksSUFBSSxLQUFLLElBQUksRUFBRTtRQUNsQixPQUFPLElBQUksS0FBSyxJQUFJLENBQUM7S0FDckI7SUFFRCx3Q0FBd0M7SUFDeEMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRTtRQUMxRCxPQUFPLEtBQUssQ0FBQztLQUNiO0lBRUQsS0FBSyxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUU7UUFDbkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNqRCxPQUFPLEtBQUssQ0FBQztTQUNiO0tBQ0Q7SUFFRCxPQUFPLElBQUksQ0FBQztJQUVaLFNBQVMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJO1FBQzFCLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDO0lBQzlDLENBQUM7QUFDRixDQUFDO0FBU0EsOEJBQVM7QUFQVixNQUFNLE9BQU8sR0FBYztJQUMxQixLQUFLO0lBQ0wsU0FBUztDQUNULENBQUM7QUFPRixrQkFBZSxPQUFPLENBQUMifQ==