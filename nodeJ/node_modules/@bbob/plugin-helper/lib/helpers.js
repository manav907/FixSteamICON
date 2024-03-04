"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    attrsToString: function() {
        return attrsToString;
    },
    attrValue: function() {
        return attrValue;
    },
    appendToNode: function() {
        return appendToNode;
    },
    escapeHTML: function() {
        return escapeHTML;
    },
    getNodeLength: function() {
        return getNodeLength;
    },
    getUniqAttr: function() {
        return getUniqAttr;
    },
    isTagNode: function() {
        return isTagNode;
    },
    isStringNode: function() {
        return isStringNode;
    },
    isEOL: function() {
        return isEOL;
    }
});
var _char = require("./char");
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
var _typeof = function(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
};
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
var isTagNode = function(el) {
    return typeof el === "object" && !!el.tag;
};
var isStringNode = function(el) {
    return typeof el === "string";
};
var isEOL = function(el) {
    return el === _char.N;
};
var keysReduce = function(obj, reduce, def) {
    return Object.keys(obj).reduce(reduce, def);
};
var getNodeLength = function(node) {
    if (isTagNode(node)) {
        return node.content.reduce(function(count, contentNode) {
            return count + getNodeLength(contentNode);
        }, 0);
    }
    if (isStringNode(node)) {
        return node.length;
    }
    return 0;
};
/**
 * Appends value to Tag Node
 * @param {TagNode} node
 * @param value
 */ var appendToNode = function(node, value) {
    node.content.push(value);
};
/**
 * Replaces " to &qquot;
 * @param {String} value
 */ var escapeHTML = function(value) {
    return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;")// eslint-disable-next-line no-script-url
    .replace(/(javascript|data|vbscript):/gi, "$1%3A");
};
/**
 * Acept name and value and return valid html5 attribute string
 * @param {String} name
 * @param {String} value
 * @return {string}
 */ var attrValue = function(name, value) {
    var type = typeof value === "undefined" ? "undefined" : _typeof(value);
    var types = {
        boolean: function() {
            return value ? "" + name : "";
        },
        number: function() {
            return name + '="' + value + '"';
        },
        string: function() {
            return name + '="' + escapeHTML(value) + '"';
        },
        object: function() {
            return name + '="' + escapeHTML(JSON.stringify(value)) + '"';
        }
    };
    return types[type] ? types[type]() : "";
};
/**
 * Transforms attrs to html params string
 * @param values
 */ var attrsToString = function(values) {
    // To avoid some malformed attributes
    if (values == null) {
        return "";
    }
    return keysReduce(values, function(arr, key) {
        return _toConsumableArray(arr).concat([
            attrValue(key, values[key])
        ]);
    }, [
        ""
    ]).join(" ");
};
/**
 * Gets value from
 * @example
 * getUniqAttr({ 'foo': true, 'bar': bar' }) => 'bar'
 * @param attrs
 * @returns {string}
 */ var getUniqAttr = function(attrs) {
    return keysReduce(attrs, function(res, key) {
        return attrs[key] === key ? attrs[key] : null;
    }, null);
};
