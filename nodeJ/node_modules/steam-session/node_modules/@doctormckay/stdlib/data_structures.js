"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stack = exports.Queue = exports.TTLCache = exports.LeastUsedCache = exports.AsyncQueue = void 0;
const AsyncQueue_1 = __importDefault(require("./lib/data_structures/AsyncQueue"));
exports.AsyncQueue = AsyncQueue_1.default;
const LeastUsedCache_1 = __importDefault(require("./lib/data_structures/LeastUsedCache"));
exports.LeastUsedCache = LeastUsedCache_1.default;
const TTLCache_1 = __importDefault(require("./lib/data_structures/TTLCache"));
exports.TTLCache = TTLCache_1.default;
const Queue_1 = __importDefault(require("./lib/data_structures/Queue"));
exports.Queue = Queue_1.default;
const Stack_1 = __importDefault(require("./lib/data_structures/Stack"));
exports.Stack = Stack_1.default;
exports.default = {
    AsyncQueue: AsyncQueue_1.default,
    LeastUsedCache: LeastUsedCache_1.default,
    TTLCache: TTLCache_1.default,
    Queue: Queue_1.default,
    Stack: Stack_1.default
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YV9zdHJ1Y3R1cmVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3JjL2RhdGFfc3RydWN0dXJlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxrRkFBMEQ7QUFPekQscUJBUE0sb0JBQVUsQ0FPTjtBQU5YLDBGQUFrRTtBQU9qRSx5QkFQTSx3QkFBYyxDQU9OO0FBTmYsOEVBQXNEO0FBT3JELG1CQVBNLGtCQUFRLENBT047QUFOVCx3RUFBZ0Q7QUFPL0MsZ0JBUE0sZUFBSyxDQU9OO0FBTk4sd0VBQWdEO0FBTy9DLGdCQVBNLGVBQUssQ0FPTjtBQUdOLGtCQUFlO0lBQ2QsVUFBVSxFQUFWLG9CQUFVO0lBQ1YsY0FBYyxFQUFkLHdCQUFjO0lBQ2QsUUFBUSxFQUFSLGtCQUFRO0lBQ1IsS0FBSyxFQUFMLGVBQUs7SUFDTCxLQUFLLEVBQUwsZUFBSztDQUNMLENBQUMifQ==