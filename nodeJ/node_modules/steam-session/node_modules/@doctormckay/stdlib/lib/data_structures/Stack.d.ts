export default class Stack {
    #private;
    /**
     * Create a new Stack. A Stack is a FILO data structure, in which all you can do is append items and remove items from
     * the back. Under the hood, this is implemented with a linked list (LL).
     * @constructor
     */
    constructor();
    get length(): number;
    /**
     * Push a new item to the top of the stack.
     * @param {*} item - The item to push into the stack
     * @return {int} The new length of the stack
     */
    push(item: any): number;
    /**
     * Remove the top element from the stack and return it.
     * @return {*} The top item in the stack. Null if the stack is empty.
     */
    pop(): any;
    /**
     * Empty this stack by removing all items in it.
     */
    empty(): void;
}
//# sourceMappingURL=Stack.d.ts.map