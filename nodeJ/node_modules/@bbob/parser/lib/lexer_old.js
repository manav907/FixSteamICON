/* eslint-disable no-plusplus,no-param-reassign */ "use strict";
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
    createTokenOfType: function() {
        return createTokenOfType;
    },
    createLexer: function() {
        return createLexer;
    }
});
var _pluginHelper = require("@bbob/plugin-helper");
var _token = require("./Token");
var _utils = require("./utils");
// for cases <!-- -->
var EM = "!";
/**
 * Creates a Token entity class
 * @param {String} type
 * @param {String} value
 * @param {Number} r line number
 * @param {Number} cl char number in line
 */ var createToken = function(type, value, r, cl) {
    if (r === void 0) r = 0;
    if (cl === void 0) cl = 0;
    return new _token.Token(type, value, r, cl);
};
/**
 * @typedef {Object} Lexer
 * @property {Function} tokenize
 * @property {Function} isTokenNested
 */ /**
 * @param {String} buffer
 * @param {Object} options
 * @param {Function} options.onToken
 * @param {String} options.openTag
 * @param {String} options.closeTag
 * @param {Boolean} options.enableEscapeTags
 * @return {Lexer}
 */ function createLexer(buffer, options) {
    if (options === void 0) options = {};
    var row = 0;
    var col = 0;
    var tokenIndex = -1;
    var tokens = new Array(Math.floor(buffer.length));
    var openTag = options.openTag || _pluginHelper.OPEN_BRAKET;
    var closeTag = options.closeTag || _pluginHelper.CLOSE_BRAKET;
    var escapeTags = options.enableEscapeTags;
    var RESERVED_CHARS = [
        closeTag,
        openTag,
        _pluginHelper.QUOTEMARK,
        _pluginHelper.BACKSLASH,
        _pluginHelper.SPACE,
        _pluginHelper.TAB,
        _pluginHelper.EQ,
        _pluginHelper.N,
        EM
    ];
    var NOT_CHAR_TOKENS = [
        // ...(options.enableEscapeTags ? [BACKSLASH] : []),
        openTag,
        _pluginHelper.SPACE,
        _pluginHelper.TAB,
        _pluginHelper.N
    ];
    var WHITESPACES = [
        _pluginHelper.SPACE,
        _pluginHelper.TAB
    ];
    var SPECIAL_CHARS = [
        _pluginHelper.EQ,
        _pluginHelper.SPACE,
        _pluginHelper.TAB
    ];
    var isCharReserved = function(char) {
        return RESERVED_CHARS.indexOf(char) >= 0;
    };
    var isWhiteSpace = function(char) {
        return WHITESPACES.indexOf(char) >= 0;
    };
    var isCharToken = function(char) {
        return NOT_CHAR_TOKENS.indexOf(char) === -1;
    };
    var isSpecialChar = function(char) {
        return SPECIAL_CHARS.indexOf(char) >= 0;
    };
    var isEscapableChar = function(char) {
        return char === openTag || char === closeTag || char === _pluginHelper.BACKSLASH;
    };
    var isEscapeChar = function(char) {
        return char === _pluginHelper.BACKSLASH;
    };
    /**
   * Emits newly created token to subscriber
   * @param token
   */ var emitToken = function(token) {
        if (options.onToken) {
            options.onToken(token);
        }
        tokenIndex += 1;
        tokens[tokenIndex] = token;
    };
    /**
   * Parses params inside [myTag---params goes here---]content[/myTag]
   * @param str
   * @returns {{tag: *, attrs: Array}}
   */ var parseAttrs = function(str) {
        var tagName = null;
        var skipSpecialChars = false;
        var attrTokens = [];
        var attrCharGrabber = (0, _utils.createCharGrabber)(str);
        var validAttr = function(char) {
            var isEQ = char === _pluginHelper.EQ;
            var isWS = isWhiteSpace(char);
            var prevChar = attrCharGrabber.getPrev();
            var nextChar = attrCharGrabber.getNext();
            var isPrevSLASH = prevChar === _pluginHelper.BACKSLASH;
            var isTagNameEmpty = tagName === null;
            if (isTagNameEmpty) {
                return (isEQ || isWS || attrCharGrabber.isLast()) === false;
            }
            if (skipSpecialChars && isSpecialChar(char)) {
                return true;
            }
            if (char === _pluginHelper.QUOTEMARK && !isPrevSLASH) {
                skipSpecialChars = !skipSpecialChars;
                if (!skipSpecialChars && !(nextChar === _pluginHelper.EQ || isWhiteSpace(nextChar))) {
                    return false;
                }
            }
            return (isEQ || isWS) === false;
        };
        var nextAttr = function() {
            var attrStr = attrCharGrabber.grabWhile(validAttr);
            var currChar = attrCharGrabber.getCurr();
            // first string before space is a tag name [tagName params...]
            if (tagName === null) {
                tagName = attrStr;
            } else if (isWhiteSpace(currChar) || currChar === _pluginHelper.QUOTEMARK || !attrCharGrabber.hasNext()) {
                var escaped = (0, _utils.unquote)((0, _utils.trimChar)(attrStr, _pluginHelper.QUOTEMARK));
                attrTokens.push(createToken(_token.TYPE_ATTR_VALUE, escaped, row, col));
            } else {
                attrTokens.push(createToken(_token.TYPE_ATTR_NAME, attrStr, row, col));
            }
            attrCharGrabber.skip();
        };
        while(attrCharGrabber.hasNext()){
            nextAttr();
        }
        return {
            tag: tagName,
            attrs: attrTokens
        };
    };
    var bufferGrabber = (0, _utils.createCharGrabber)(buffer, {
        onSkip: function() {
            col++;
        }
    });
    var next = function() {
        var currChar = bufferGrabber.getCurr();
        var nextChar = bufferGrabber.getNext();
        if (currChar === _pluginHelper.N) {
            bufferGrabber.skip();
            col = 0;
            row++;
            emitToken(createToken(_token.TYPE_NEW_LINE, currChar, row, col));
        } else if (isWhiteSpace(currChar)) {
            var str = bufferGrabber.grabWhile(isWhiteSpace);
            emitToken(createToken(_token.TYPE_SPACE, str, row, col));
        } else if (escapeTags && isEscapeChar(currChar) && isEscapableChar(nextChar)) {
            bufferGrabber.skip(); // skip the \ without emitting anything
            bufferGrabber.skip(); // skip past the [, ] or \ as well
            emitToken(createToken(_token.TYPE_WORD, nextChar, row, col));
        } else if (currChar === openTag) {
            bufferGrabber.skip(); // skip openTag
            // detect case where we have '[My word [tag][/tag]' or we have '[My last line word'
            var substr = bufferGrabber.substrUntilChar(closeTag);
            var hasInvalidChars = substr.length === 0 || substr.indexOf(openTag) >= 0;
            if (isCharReserved(nextChar) || hasInvalidChars || bufferGrabber.isLast()) {
                emitToken(createToken(_token.TYPE_WORD, currChar, row, col));
            } else {
                var str1 = bufferGrabber.grabWhile(function(val) {
                    return val !== closeTag;
                });
                bufferGrabber.skip(); // skip closeTag
                // [myTag   ]
                var isNoAttrsInTag = str1.indexOf(_pluginHelper.EQ) === -1;
                // [/myTag]
                var isClosingTag = str1[0] === _pluginHelper.SLASH;
                if (isNoAttrsInTag || isClosingTag) {
                    emitToken(createToken(_token.TYPE_TAG, str1, row, col));
                } else {
                    var parsed = parseAttrs(str1);
                    emitToken(createToken(_token.TYPE_TAG, parsed.tag, row, col));
                    parsed.attrs.map(emitToken);
                }
            }
        } else if (currChar === closeTag) {
            bufferGrabber.skip(); // skip closeTag
            emitToken(createToken(_token.TYPE_WORD, currChar, row, col));
        } else if (isCharToken(currChar)) {
            if (escapeTags && isEscapeChar(currChar) && !isEscapableChar(nextChar)) {
                bufferGrabber.skip();
                emitToken(createToken(_token.TYPE_WORD, currChar, row, col));
            } else {
                var str2 = bufferGrabber.grabWhile(function(char) {
                    if (escapeTags) {
                        return isCharToken(char) && !isEscapeChar(char);
                    }
                    return isCharToken(char);
                });
                emitToken(createToken(_token.TYPE_WORD, str2, row, col));
            }
        }
    };
    var tokenize = function() {
        while(bufferGrabber.hasNext()){
            next();
        }
        tokens.length = tokenIndex + 1;
        return tokens;
    };
    var isTokenNested = function(token) {
        var value = openTag + _pluginHelper.SLASH + token.getValue();
        // potential bottleneck
        return buffer.indexOf(value) > -1;
    };
    return {
        tokenize: tokenize,
        isTokenNested: isTokenNested
    };
}
var createTokenOfType = createToken;
