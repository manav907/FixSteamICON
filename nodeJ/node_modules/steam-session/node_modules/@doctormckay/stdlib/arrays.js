"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unique = void 0;
/**
 * Returns an array containing only the unique elements in the input array.
 * @param {Array} array
 * @param {boolean} [strict=false] - Use strict comparisons. If false, performance will be *much* better on large arrays.
 * @returns {Array}
 */
function unique(array, strict = false) {
    let out = [];
    let nonStrictCache = {};
    array.forEach((val) => {
        let inOutputArray = strict || typeof val == 'object' ? out.includes(val) : nonStrictCache[val];
        if (!inOutputArray) {
            out.push(val);
            if (!strict) {
                nonStrictCache[val] = true;
            }
        }
    });
    return out;
}
exports.unique = unique;
const Arrays = {
    unique
};
exports.default = Arrays;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3JjL2FycmF5cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQTs7Ozs7R0FLRztBQUNILFNBQVMsTUFBTSxDQUFDLEtBQVksRUFBRSxNQUFNLEdBQUcsS0FBSztJQUMzQyxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7SUFDYixJQUFJLGNBQWMsR0FBRyxFQUFFLENBQUM7SUFDeEIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQ3JCLElBQUksYUFBYSxHQUFHLE1BQU0sSUFBSSxPQUFPLEdBQUcsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMvRixJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ25CLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDZCxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNaLGNBQWMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7YUFDM0I7U0FDRDtJQUNGLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxHQUFHLENBQUM7QUFDWixDQUFDO0FBT0Esd0JBQU07QUFMUCxNQUFNLE1BQU0sR0FBYztJQUN6QixNQUFNO0NBQ04sQ0FBQztBQU1GLGtCQUFlLE1BQU0sQ0FBQyJ9