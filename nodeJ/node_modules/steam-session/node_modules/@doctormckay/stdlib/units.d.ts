import { Units as ModuleType } from './lib/_meta/module-types';
/**
 * Return a string containing the human-readable representation of the input byte count.
 * @param {int} bytes
 * @param {boolean} [binary=false] - Pass true to use the binary system instead of the decimal system (i.e. MiB instead of MB)
 * @param {boolean} [forceDecimal=false] - Pass true to always append the tenths decimal place, even if it's 0
 * @return {string}
 */
declare function humanReadableBytes(bytes: number, binary?: boolean, forceDecimal?: boolean): string;
declare const Units: ModuleType;
export { humanReadableBytes };
export default Units;
//# sourceMappingURL=units.d.ts.map