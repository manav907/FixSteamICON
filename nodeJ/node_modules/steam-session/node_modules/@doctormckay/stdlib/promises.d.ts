import { Promises as ModuleType } from './lib/_meta/module-types';
import retryPromise from './lib/promises/retryPromise';
import timeoutCallbackPromise from './lib/promises/timeoutCallbackPromise';
import timeoutPromise from './lib/promises/timeoutPromise';
declare function callbackPromise(callbackArgs: string[], callback: null | ((...args: any[]) => void), isOptional: boolean, executor: (resolve: (value: any) => void, reject: (err: any) => void) => void): Promise<any>;
/**
 * A "better promise" is just a promise that behaves normally, except if the executor is an async function which rejects,
 * that bubbles up to reject this promise too.
 * @param {function} executor
 */
declare function betterPromise(executor: (resolve: (value: any) => void, reject: (value: any) => void) => void): Promise<any>;
/**
 * Resolves the promise after some specific delay.
 * @param {int} sleepMilliseconds
 * @returns {Promise}
 */
declare function sleepAsync(sleepMilliseconds: number): Promise<void>;
declare const Promises: ModuleType;
export { betterPromise, retryPromise, timeoutCallbackPromise, timeoutPromise, callbackPromise, sleepAsync };
export default Promises;
//# sourceMappingURL=promises.d.ts.map