export default class Queue {
    #private;
    /**
     * Create a new Queue. A Queue is a FIFO data structure, in which all you can do is append items and remove items from
     * the front. Under the hood, this is implemented with a doubly-linked list (DLL).
     * @constructor
     */
    constructor();
    get length(): number;
    /**
     * Push a new item to the end of the queue.
     * @param {*} item - The item to push into the queue
     * @return {int} The new length of the queue
     */
    enqueue(item: any): number;
    push(item: any): number;
    /**
     * Inserts a new item into the front of the queue.
     * @param {*} item - The item to insert into the queue
     * @return {int} The new length of the queue
     */
    insert(item: any): number;
    /**
     * Remove the first element from the queue and return it.
     * @return {*} The first item in the queue. Null if the queue is empty.
     */
    dequeue(): any;
    pop(): any;
    /**
     * Empty this queue by removing all items in it.
     */
    empty(): void;
}
//# sourceMappingURL=Queue.d.ts.map