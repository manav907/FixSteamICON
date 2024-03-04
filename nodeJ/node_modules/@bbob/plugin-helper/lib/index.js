"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TagNode", {
    enumerable: true,
    get: function() {
        return _tagNode.TagNode;
    }
});
_exportStar(require("./helpers"), exports);
_exportStar(require("./char"), exports);
var _tagNode = require("./TagNode");
function _exportStar(from, to) {
    Object.keys(from).forEach(function(k) {
        if (k !== "default" && !Object.prototype.hasOwnProperty.call(to, k)) Object.defineProperty(to, k, {
            enumerable: true,
            get: function() {
                return from[k];
            }
        });
    });
    return from;
}
