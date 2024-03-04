export default class LeastUsedCache {
    #private;
    /**
     * Construct a new LeastUsedCache.
     * @param {int} maxItems - Maximum number of items allowed in the cache before stuff will start being pruned
     * @param {int} gcInterval - Time in milliseconds between garbage collections
     * @constructor
     */
    constructor(maxItems: number, gcInterval: number);
    /**
     * Add an entry to the cache.
     * @param {string} key - The key under which this entry should be stored
     * @param {*} val - The value to store in this entry
     */
    add(key: string, val: any): void;
    /**
     * Get the entry stored in the cache under a particular key.
     * @param {string} key - The key to retrieve
     * @return {null|*} value if present, null if not
     */
    get(key: string): any;
    /**
     * Delete an entry from the cache.
     * @param {string} key
     */
    delete(key: string): void;
    /**
     * Get a list of all keys in the cache.
     * @returns {string[]}
     */
    getKeys(): string[];
    /**
     * Check if a garbage collection is necessary and if so, do it.
     */
    checkGC(): void;
    /**
     * Collect garbage and delete anything over the limit that hasn't been accessed in a while.
     */
    gc(): void;
}
//# sourceMappingURL=LeastUsedCache.d.ts.map