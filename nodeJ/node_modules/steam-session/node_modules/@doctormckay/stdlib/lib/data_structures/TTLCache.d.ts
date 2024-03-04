export default class TTLCache<T> {
    #private;
    /**
     * Construct a new TTLCache.
     * @param {int} ttlMilliseconds - Default time to live in milliseconds for each entry
     * @param {int} [gcIntervalMilliseconds=300000] - Time between garbage collections (default 1 minute)
     * @constructor
     */
    constructor(ttlMilliseconds: number, gcIntervalMilliseconds?: number);
    /**
     * Add an entry to the cache.
     * @param {string} key - The key under which this entry should be stored
     * @param {any} value - The value to store in this entry
     * @param {int} ttlMilliseconds - Optionally set a TTL for this specific entry, rather than using the default global TTL
     */
    add(key: string, value: T, ttlMilliseconds?: number): void;
    /**
     * Get the entry stored in the cache under a particular key.
     * @param {string} key - The key to retrieve
     * @return {null|*} value if present, null if not
     */
    get(key: string): T | null;
    /**
     * Delete an entry from the cache.
     * @param {string} key
     * @returns {void}
     */
    delete(key: string): void;
    /**
     * Get a list of all keys in the cache.
     * @returns {string[]}
     */
    getKeys(): string[];
    /**
     * Clear the cache.
     * @returns {void}
     */
    clear(): void;
}
//# sourceMappingURL=TTLCache.d.ts.map