import { Objects as ModuleType } from './lib/_meta/module-types';
/**
 * Clone an object/array/any other type.
 * @param {*} obj
 * @returns {*}
 */
declare function clone(obj: any): any;
/**
 * Check whether two objects or values and all their subobjects are equal (same keys with same values, but not necessarily in the same order (except for arrays))
 * @param {*} obj1
 * @param {*} obj2
 * @param {boolean} [strict=false] - Use strict equality checks?
 * @returns {boolean}
 */
declare function deepEqual(obj1: any, obj2: any, strict?: boolean): boolean;
declare const Objects: ModuleType;
export { clone, deepEqual };
export default Objects;
//# sourceMappingURL=objects.d.ts.map