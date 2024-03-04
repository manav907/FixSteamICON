/**
 * Return a new promise that will also invoke the callback, if provided. Also has timeout functionality as in timeoutPromise.
 * @param {number} timeout - Timeout in milliseconds. If this value is <= 0, then the timeout functionality is disabled.
 * @param {string[]|null} callbackArgs - If null, the entire result object is just passed to the callback as the 2nd arg (1 is err)
 * @param {function|null} callback
 * @param {boolean} [isOptional=false] - If true, then the app won't crash if the user neither provides a callback nor adds a `catch` listener
 * @param {function} executor
 * @returns {Promise}
 */
export default function timeoutCallbackPromise(timeout: number, callbackArgs: null | string[], callback: null | ((err?: any, ...args: any[]) => void), isOptional: boolean, executor: (resolve: (value: any) => void, reject: (err: any) => void) => any): Promise<any>;
//# sourceMappingURL=timeoutCallbackPromise.d.ts.map