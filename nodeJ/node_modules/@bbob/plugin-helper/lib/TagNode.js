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
    TagNode: function() {
        return TagNode;
    },
    default: function() {
        return _default;
    }
});
var _char = require("./char");
var _helpers = require("./helpers");
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _extends() {
    _extends = Object.assign || function(target) {
        for(var i = 1; i < arguments.length; i++){
            var source = arguments[i];
            for(var key in source){
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
    return _extends.apply(this, arguments);
}
var getTagAttrs = function(tag, params) {
    var uniqAattr = (0, _helpers.getUniqAttr)(params);
    if (uniqAattr) {
        var tagAttr = (0, _helpers.attrValue)(tag, uniqAattr);
        var attrs = _extends({}, params);
        delete attrs[uniqAattr];
        var attrsStr = (0, _helpers.attrsToString)(attrs);
        return "" + tagAttr + attrsStr;
    }
    return "" + tag + (0, _helpers.attrsToString)(params);
};
var TagNode = /*#__PURE__*/ function() {
    "use strict";
    function TagNode(tag, attrs, content) {
        this.tag = tag;
        this.attrs = attrs;
        this.content = Array.isArray(content) ? content : [
            content
        ];
    }
    var _proto = TagNode.prototype;
    _proto.attr = function attr(name, value) {
        if (typeof value !== "undefined") {
            this.attrs[name] = value;
        }
        return this.attrs[name];
    };
    _proto.append = function append(value) {
        return (0, _helpers.appendToNode)(this, value);
    };
    _proto.toTagStart = function toTagStart(param) {
        var _ref = param === void 0 ? {} : param, _ref_openTag = _ref.openTag, openTag = _ref_openTag === void 0 ? _char.OPEN_BRAKET : _ref_openTag, _ref_closeTag = _ref.closeTag, closeTag = _ref_closeTag === void 0 ? _char.CLOSE_BRAKET : _ref_closeTag;
        var tagAttrs = getTagAttrs(this.tag, this.attrs);
        return "" + openTag + tagAttrs + closeTag;
    };
    _proto.toTagEnd = function toTagEnd(param) {
        var _ref = param === void 0 ? {} : param, _ref_openTag = _ref.openTag, openTag = _ref_openTag === void 0 ? _char.OPEN_BRAKET : _ref_openTag, _ref_closeTag = _ref.closeTag, closeTag = _ref_closeTag === void 0 ? _char.CLOSE_BRAKET : _ref_closeTag;
        return "" + openTag + _char.SLASH + this.tag + closeTag;
    };
    _proto.toTagNode = function toTagNode() {
        return new TagNode(this.tag.toLowerCase(), this.attrs, this.content);
    };
    _proto.toString = function toString(param) {
        var _ref = param === void 0 ? {} : param, _ref_openTag = _ref.openTag, openTag = _ref_openTag === void 0 ? _char.OPEN_BRAKET : _ref_openTag, _ref_closeTag = _ref.closeTag, closeTag = _ref_closeTag === void 0 ? _char.CLOSE_BRAKET : _ref_closeTag;
        var isEmpty = this.content.length === 0;
        var content = this.content.reduce(function(r, node) {
            return r + node.toString({
                openTag: openTag,
                closeTag: closeTag
            });
        }, "");
        var tagStart = this.toTagStart({
            openTag: openTag,
            closeTag: closeTag
        });
        if (isEmpty) {
            return tagStart;
        }
        return "" + tagStart + content + this.toTagEnd({
            openTag: openTag,
            closeTag: closeTag
        });
    };
    _createClass(TagNode, [
        {
            key: "length",
            get: function get() {
                return (0, _helpers.getNodeLength)(this);
            }
        }
    ]);
    return TagNode;
}();
TagNode.create = function(tag, attrs, content) {
    if (attrs === void 0) attrs = {};
    if (content === void 0) content = [];
    return new TagNode(tag, attrs, content);
};
TagNode.isOf = function(node, type) {
    return node.tag === type;
};
var _default = TagNode;
