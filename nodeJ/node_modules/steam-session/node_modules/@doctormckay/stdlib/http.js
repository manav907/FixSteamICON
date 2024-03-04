"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProxyAgent = exports.CookieJar = exports.Cookie = exports.HttpClient = void 0;
const HttpClient_1 = __importDefault(require("./lib/http/client/HttpClient"));
exports.HttpClient = HttpClient_1.default;
const Cookie_1 = __importDefault(require("./lib/http/client/Cookie"));
exports.Cookie = Cookie_1.default;
const CookieJar_1 = __importDefault(require("./lib/http/client/CookieJar"));
exports.CookieJar = CookieJar_1.default;
const proxyagent_1 = __importDefault(require("./lib/http/proxyagent"));
exports.getProxyAgent = proxyagent_1.default;
const Http = {
    HttpClient: HttpClient_1.default,
    Cookie: Cookie_1.default,
    CookieJar: CookieJar_1.default,
    getProxyAgent: proxyagent_1.default
};
exports.default = Http;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNyYy9odHRwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUdBLDhFQUFzRDtBQWdCckQscUJBaEJNLG9CQUFVLENBZ0JOO0FBZlgsc0VBQThDO0FBZ0I3QyxpQkFoQk0sZ0JBQU0sQ0FnQk47QUFmUCw0RUFBb0Q7QUFnQm5ELG9CQWhCTSxtQkFBUyxDQWdCTjtBQWZWLHVFQUFrRDtBQWdCakQsd0JBaEJNLG9CQUFhLENBZ0JOO0FBZGQsTUFBTSxJQUFJLEdBQWM7SUFDdkIsVUFBVSxFQUFWLG9CQUFVO0lBQ1YsTUFBTSxFQUFOLGdCQUFNO0lBQ04sU0FBUyxFQUFULG1CQUFTO0lBQ1QsYUFBYSxFQUFiLG9CQUFhO0NBQ2IsQ0FBQztBQVlGLGtCQUFlLElBQUksQ0FBQyJ9