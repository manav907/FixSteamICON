import { IPv4 as ModuleType } from './lib/_meta/module-types';
/**
 * Convert an integer IPv4 address into dotted-decimal string format.
 * @param {int} ipInt
 * @returns {string}
 */
declare function intToString(ipInt: number): string;
/**
 * Convert a dotted-decimal string IPv4 address to integer format.
 * @param {string} ipString
 * @returns {int}
 */
declare function stringToInt(ipString: string): number;
declare const IPv4: ModuleType;
export { intToString, stringToInt };
export default IPv4;
//# sourceMappingURL=ipv4.d.ts.map