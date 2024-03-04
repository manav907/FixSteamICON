"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleepAsync = exports.callbackPromise = exports.timeoutPromise = exports.timeoutCallbackPromise = exports.retryPromise = exports.betterPromise = void 0;
const retryPromise_1 = __importDefault(require("./lib/promises/retryPromise"));
exports.retryPromise = retryPromise_1.default;
const timeoutCallbackPromise_1 = __importDefault(require("./lib/promises/timeoutCallbackPromise"));
exports.timeoutCallbackPromise = timeoutCallbackPromise_1.default;
const timeoutPromise_1 = __importDefault(require("./lib/promises/timeoutPromise"));
exports.timeoutPromise = timeoutPromise_1.default;
function callbackPromise(callbackArgs, callback, isOptional, executor) {
    return (0, timeoutCallbackPromise_1.default)(0, callbackArgs, callback, isOptional, executor);
}
exports.callbackPromise = callbackPromise;
/**
 * A "better promise" is just a promise that behaves normally, except if the executor is an async function which rejects,
 * that bubbles up to reject this promise too.
 * @param {function} executor
 */
function betterPromise(executor) {
    return (0, timeoutPromise_1.default)(0, executor);
}
exports.betterPromise = betterPromise;
/**
 * Resolves the promise after some specific delay.
 * @param {int} sleepMilliseconds
 * @returns {Promise}
 */
function sleepAsync(sleepMilliseconds) {
    return new Promise((resolve) => {
        setTimeout(resolve, sleepMilliseconds);
    });
}
exports.sleepAsync = sleepAsync;
const Promises = {
    betterPromise,
    retryPromise: retryPromise_1.default,
    timeoutCallbackPromise: timeoutCallbackPromise_1.default,
    timeoutPromise: timeoutPromise_1.default,
    callbackPromise,
    sleepAsync
};
exports.default = Promises;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvbWlzZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzcmMvcHJvbWlzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUEsK0VBQXVEO0FBaUR0RCx1QkFqRE0sc0JBQVksQ0FpRE47QUFoRGIsbUdBQTJFO0FBaUQxRSxpQ0FqRE0sZ0NBQXNCLENBaUROO0FBaER2QixtRkFBMkQ7QUFpRDFELHlCQWpETSx3QkFBYyxDQWlETjtBQS9DZixTQUFTLGVBQWUsQ0FDdkIsWUFBc0IsRUFDdEIsUUFBa0MsRUFDbEMsVUFBbUIsRUFDbkIsUUFHUTtJQUVSLE9BQU8sSUFBQSxnQ0FBc0IsRUFBQyxDQUFDLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDaEYsQ0FBQztBQXNDQSwwQ0FBZTtBQXBDaEI7Ozs7R0FJRztBQUNILFNBQVMsYUFBYSxDQUNyQixRQUErRTtJQUUvRSxPQUFPLElBQUEsd0JBQWMsRUFBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDcEMsQ0FBQztBQXVCQSxzQ0FBYTtBQXJCZDs7OztHQUlHO0FBQ0gsU0FBUyxVQUFVLENBQUMsaUJBQXlCO0lBQzVDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtRQUM5QixVQUFVLENBQUMsT0FBTyxFQUFFLGlCQUFpQixDQUFDLENBQUM7SUFDeEMsQ0FBQyxDQUFDLENBQUM7QUFDSixDQUFDO0FBaUJBLGdDQUFVO0FBZlgsTUFBTSxRQUFRLEdBQWM7SUFDM0IsYUFBYTtJQUNiLFlBQVksRUFBWixzQkFBWTtJQUNaLHNCQUFzQixFQUF0QixnQ0FBc0I7SUFDdEIsY0FBYyxFQUFkLHdCQUFjO0lBQ2QsZUFBZTtJQUNmLFVBQVU7Q0FDVixDQUFDO0FBV0Ysa0JBQWUsUUFBUSxDQUFDIn0=