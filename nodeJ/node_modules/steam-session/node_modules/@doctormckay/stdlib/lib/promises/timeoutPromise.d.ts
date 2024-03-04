/**
 * Return a new promise that will automatically be rejected with 'Error: Request timed out' after a specified timeout period
 * @param {number} timeout - Timeout in milliseconds. If this value is <= 0, then the timeout functionality is disabled.
 * @param {function} executor
 * @returns {Promise}
 */
export default function timeoutPromise(timeout: number, executor: (resolve: (value: any) => void, reject: (err: any) => void) => any): Promise<any>;
//# sourceMappingURL=timeoutPromise.d.ts.map