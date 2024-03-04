/**
 * Returns a promise that will call the executor again on error, up to the specified number of attempts.
 * @param {int} attempts
 * @param {int} [delayBetweenAttempts] - Delay in milliseconds between executor failure and subsequent re-attempt
 * @param {function} executor
 * @returns {Promise}
 */
export default function retryPromise(attempts: number, delayBetweenAttempts: number, executor: (resolve: (value: any) => void, reject: (err: any) => void) => any): Promise<any>;
//# sourceMappingURL=retryPromise.d.ts.map