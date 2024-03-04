export default class AsyncQueue {
    #private;
    concurrency: number;
    worker: (workItem: any, callback: (err?: Error, ...any: any[]) => void) => void;
    drain?: () => void;
    empty?: () => void;
    start?: (workItem: any) => void;
    error?: (err: Error, workItem: any) => void;
    /**
     * Construct a new AsyncQueue. An AsyncQueue is a traditional FIFO queue, but it's designed for asynchronous tasks.
     * @param {function} worker - A worker function that takes two arguments, (element, callback) to be invoked when processing an item
     * @param {int} [concurrency=1] - The maximum number of workers that may be working at once
     * @constructor
     */
    constructor(worker: any, concurrency?: number);
    get running(): number;
    get paused(): boolean;
    get killed(): boolean;
    get length(): number;
    /**
     * Pause execution and stop handing items to workers.
     */
    pause(): void;
    /**
     * Unpause execution and start workers on items in the queue again.
     */
    resume(): void;
    /**
     * Destroy this queue and stop processing items. Anything currently processing will finish and emit callbacks.
     */
    kill(): void;
    /**
     * Push a new item to the end of the queue.
     * @param {*} item - The item to push into the queue
     * @param {function} [callback] - A callback to be invoked after this item is finished processing, which takes arguments (err, result)
     * @return {int} The new length of the queue
     */
    enqueue(item: any, callback?: (err?: Error, ...any: any[]) => void): number;
    /**
     * Push a new item to the end of the queue.
     * @param {*} item - The item to push into the queue
     * @param {function} [callback] - A callback to be invoked after this item is finished processing, which takes arguments (err, result)
     * @return {int} The new length of the queue
     */
    push(item: any, callback?: (err?: Error, ...any: any[]) => void): number;
    /**
     * Insert a new item into the front of the queue.
     * @param {*} item - The item to push into the queue
     * @param {function} [callback] - A callback to be invoked after this item is finished processing, which takes arguments (err, result)
     * @return {int} The new length of the queue
     */
    insert(item: any, callback?: (err?: Error, ...any: any[]) => void): number;
}
//# sourceMappingURL=AsyncQueue.d.ts.map