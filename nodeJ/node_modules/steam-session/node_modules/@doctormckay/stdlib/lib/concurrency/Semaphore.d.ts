export default class Semaphore {
    #private;
    /**
     * Create a new semaphore.
     * @param [concurrency=1]
     * @constructor
     */
    constructor(concurrency?: number);
    get free(): boolean;
    /**
     * Wait for the semaphore to be available and call the provided function when available.
     * @param {function} callback
     */
    wait(callback: (release: () => void) => void): void;
    /**
     * Wait for the semaphore to be available and resolve the returned function when available.
     * The result of the resolved promise is a release() function that you must call when you're done with your work and
     * are ready to release the semaphore.
     * @return Promise<function>
     */
    waitAsync(): Promise<() => void>;
    /**
     * Returns whether the semaphore is currently free. A semaphore is free if a call to wait() would result in immediate
     * invocation.
     * @return {boolean}
     */
    isFree(): boolean;
}
//# sourceMappingURL=Semaphore.d.ts.map