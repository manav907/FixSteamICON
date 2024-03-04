import { Rendering as ModuleType } from './lib/_meta/module-types';
/**
 * Render an ASCII progress bar.
 * @param {number} value - The current value of this progress bar
 * @param {number} maxValue - The value at which the task is considered complete
 * @param {int} barWidth - How wide should the bar be, in characters
 * @param {boolean} [showPercentage=false]
 */
declare function progressBar(value: number, maxValue: number, barWidth: number, showPercentage?: boolean): string;
declare const Rendering: ModuleType;
export { progressBar };
export default Rendering;
//# sourceMappingURL=rendering.d.ts.map