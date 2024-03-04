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
    TYPE_ID: function() {
        return TYPE_ID;
    },
    VALUE_ID: function() {
        return VALUE_ID;
    },
    LINE_ID: function() {
        return LINE_ID;
    },
    COLUMN_ID: function() {
        return COLUMN_ID;
    },
    TYPE_WORD: function() {
        return TYPE_WORD;
    },
    TYPE_TAG: function() {
        return TYPE_TAG;
    },
    TYPE_ATTR_NAME: function() {
        return TYPE_ATTR_NAME;
    },
    TYPE_ATTR_VALUE: function() {
        return TYPE_ATTR_VALUE;
    },
    TYPE_SPACE: function() {
        return TYPE_SPACE;
    },
    TYPE_NEW_LINE: function() {
        return TYPE_NEW_LINE;
    },
    Token: function() {
        return Token;
    },
    default: function() {
        return _default;
    }
});
var _pluginHelper = require("@bbob/plugin-helper");
// type, value, line, row,
var TOKEN_TYPE_ID = "type"; // 0;
var TOKEN_VALUE_ID = "value"; // 1;
var TOKEN_COLUMN_ID = "row"; // 2;
var TOKEN_LINE_ID = "line"; // 3;
var TOKEN_TYPE_WORD = 1; // 'word';
var TOKEN_TYPE_TAG = 2; // 'tag';
var TOKEN_TYPE_ATTR_NAME = 3; // 'attr-name';
var TOKEN_TYPE_ATTR_VALUE = 4; // 'attr-value';
var TOKEN_TYPE_SPACE = 5; // 'space';
var TOKEN_TYPE_NEW_LINE = 6; // 'new-line';
/**
 * @param {Token} token
 * @returns {string}
 */ var getTokenValue = function(token) {
    if (token && typeof token[TOKEN_VALUE_ID] !== "undefined") {
        return token[TOKEN_VALUE_ID];
    }
    return "";
};
/**
 * @param {Token}token
 * @returns {number}
 */ var getTokenLine = function(token) {
    return token && token[TOKEN_LINE_ID] || 0;
};
var getTokenColumn = function(token) {
    return token && token[TOKEN_COLUMN_ID] || 0;
};
/**
 * @param {Token} token
 * @returns {boolean}
 */ var isTextToken = function(token) {
    if (token && typeof token[TOKEN_TYPE_ID] !== "undefined") {
        return token[TOKEN_TYPE_ID] === TOKEN_TYPE_SPACE || token[TOKEN_TYPE_ID] === TOKEN_TYPE_NEW_LINE || token[TOKEN_TYPE_ID] === TOKEN_TYPE_WORD;
    }
    return false;
};
/**
 * @param {Token} token
 * @returns {boolean}
 */ var isTagToken = function(token) {
    if (token && typeof token[TOKEN_TYPE_ID] !== "undefined") {
        return token[TOKEN_TYPE_ID] === TOKEN_TYPE_TAG;
    }
    return false;
};
var isTagEnd = function(token) {
    return getTokenValue(token).charCodeAt(0) === _pluginHelper.SLASH.charCodeAt(0);
};
var isTagStart = function(token) {
    return !isTagEnd(token);
};
var isAttrNameToken = function(token) {
    if (token && typeof token[TOKEN_TYPE_ID] !== "undefined") {
        return token[TOKEN_TYPE_ID] === TOKEN_TYPE_ATTR_NAME;
    }
    return false;
};
/**
 * @param {Token} token
 * @returns {boolean}
 */ var isAttrValueToken = function(token) {
    if (token && typeof token[TOKEN_TYPE_ID] !== "undefined") {
        return token[TOKEN_TYPE_ID] === TOKEN_TYPE_ATTR_VALUE;
    }
    return false;
};
var getTagName = function(token) {
    var value = getTokenValue(token);
    return isTagEnd(token) ? value.slice(1) : value;
};
var convertTagToText = function(token) {
    var text = _pluginHelper.OPEN_BRAKET;
    text += getTokenValue(token);
    text += _pluginHelper.CLOSE_BRAKET;
    return text;
};
var Token = /*#__PURE__*/ function() {
    "use strict";
    function Token(type, value, line, row) {
        this[TOKEN_TYPE_ID] = Number(type);
        this[TOKEN_VALUE_ID] = String(value);
        this[TOKEN_LINE_ID] = Number(line);
        this[TOKEN_COLUMN_ID] = Number(row);
    }
    var _proto = Token.prototype;
    _proto.isEmpty = function isEmpty() {
        // eslint-disable-next-line no-restricted-globals
        return isNaN(this[TOKEN_TYPE_ID]);
    };
    _proto.isText = function isText() {
        return isTextToken(this);
    };
    _proto.isTag = function isTag() {
        return isTagToken(this);
    };
    _proto.isAttrName = function isAttrName() {
        return isAttrNameToken(this);
    };
    _proto.isAttrValue = function isAttrValue() {
        return isAttrValueToken(this);
    };
    _proto.isStart = function isStart() {
        return isTagStart(this);
    };
    _proto.isEnd = function isEnd() {
        return isTagEnd(this);
    };
    _proto.getName = function getName() {
        return getTagName(this);
    };
    _proto.getValue = function getValue() {
        return getTokenValue(this);
    };
    _proto.getLine = function getLine() {
        return getTokenLine(this);
    };
    _proto.getColumn = function getColumn() {
        return getTokenColumn(this);
    };
    _proto.toString = function toString() {
        return convertTagToText(this);
    };
    return Token;
}();
var TYPE_ID = TOKEN_TYPE_ID;
var VALUE_ID = TOKEN_VALUE_ID;
var LINE_ID = TOKEN_LINE_ID;
var COLUMN_ID = TOKEN_COLUMN_ID;
var TYPE_WORD = TOKEN_TYPE_WORD;
var TYPE_TAG = TOKEN_TYPE_TAG;
var TYPE_ATTR_NAME = TOKEN_TYPE_ATTR_NAME;
var TYPE_ATTR_VALUE = TOKEN_TYPE_ATTR_VALUE;
var TYPE_SPACE = TOKEN_TYPE_SPACE;
var TYPE_NEW_LINE = TOKEN_TYPE_NEW_LINE;
var _default = Token;
