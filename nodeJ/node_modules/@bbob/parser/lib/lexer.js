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
 * @param {Number} type
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
    var emitToken = /**
   * Emits newly created token to subscriber
   * @param {Number} type
   * @param {String} value
   */ function emitToken(type, value) {
        var token = createToken(type, value, row, col);
        onToken(token);
        tokenIndex += 1;
        tokens[tokenIndex] = token;
    };
    var nextTagState = function nextTagState(tagChars, isSingleValueTag) {
        if (tagMode === TAG_STATE_ATTR) {
            var validAttrName = function(char) {
                return !(char === _pluginHelper.EQ || isWhiteSpace(char));
            };
            var name = tagChars.grabWhile(validAttrName);
            var isEnd = tagChars.isLast();
            var isValue = tagChars.getCurr() !== _pluginHelper.EQ;
            tagChars.skip();
            if (isEnd || isValue) {
                emitToken(_token.TYPE_ATTR_VALUE, unq(name));
            } else {
                emitToken(_token.TYPE_ATTR_NAME, name);
            }
            if (isEnd) {
                return TAG_STATE_NAME;
            }
            if (isValue) {
                return TAG_STATE_ATTR;
            }
            return TAG_STATE_VALUE;
        }
        if (tagMode === TAG_STATE_VALUE) {
            var stateSpecial = false;
            var validAttrValue = function(char) {
                // const isEQ = char === EQ;
                var isQM = char === _pluginHelper.QUOTEMARK;
                var prevChar = tagChars.getPrev();
                var nextChar = tagChars.getNext();
                var isPrevSLASH = prevChar === _pluginHelper.BACKSLASH;
                var isNextEQ = nextChar === _pluginHelper.EQ;
                var isWS = isWhiteSpace(char);
                // const isPrevWS = isWhiteSpace(prevChar);
                var isNextWS = isWhiteSpace(nextChar);
                if (stateSpecial && isSpecialChar(char)) {
                    return true;
                }
                if (isQM && !isPrevSLASH) {
                    stateSpecial = !stateSpecial;
                    if (!stateSpecial && !(isNextEQ || isNextWS)) {
                        return false;
                    }
                }
                if (!isSingleValueTag) {
                    return isWS === false;
                // return (isEQ || isWS) === false;
                }
                return true;
            };
            var name1 = tagChars.grabWhile(validAttrValue);
            tagChars.skip();
            emitToken(_token.TYPE_ATTR_VALUE, unq(name1));
            if (tagChars.isLast()) {
                return TAG_STATE_NAME;
            }
            return TAG_STATE_ATTR;
        }
        var validName = function(char) {
            return !(char === _pluginHelper.EQ || isWhiteSpace(char) || tagChars.isLast());
        };
        var name2 = tagChars.grabWhile(validName);
        emitToken(_token.TYPE_TAG, name2);
        checkContextFreeMode(name2);
        tagChars.skip();
        // in cases when we has [url=someval]GET[/url] and we dont need to parse all
        if (isSingleValueTag) {
            return TAG_STATE_VALUE;
        }
        var hasEQ = tagChars.includes(_pluginHelper.EQ);
        return hasEQ ? TAG_STATE_ATTR : TAG_STATE_VALUE;
    };
    var stateTag = function stateTag() {
        var currChar = chars.getCurr();
        var nextChar = chars.getNext();
        chars.skip();
        // detect case where we have '[My word [tag][/tag]' or we have '[My last line word'
        var substr = chars.substrUntilChar(closeTag);
        var hasInvalidChars = substr.length === 0 || substr.indexOf(openTag) >= 0;
        if (isCharReserved(nextChar) || hasInvalidChars || chars.isLast()) {
            emitToken(_token.TYPE_WORD, currChar);
            return STATE_WORD;
        }
        // [myTag   ]
        var isNoAttrsInTag = substr.indexOf(_pluginHelper.EQ) === -1;
        // [/myTag]
        var isClosingTag = substr[0] === _pluginHelper.SLASH;
        if (isNoAttrsInTag || isClosingTag) {
            var name = chars.grabWhile(function(char) {
                return char !== closeTag;
            });
            chars.skip(); // skip closeTag
            emitToken(_token.TYPE_TAG, name);
            checkContextFreeMode(name, isClosingTag);
            return STATE_WORD;
        }
        return STATE_TAG_ATTRS;
    };
    var stateAttrs = function stateAttrs() {
        var silent = true;
        var tagStr = chars.grabWhile(function(char) {
            return char !== closeTag;
        }, silent);
        var tagGrabber = (0, _utils.createCharGrabber)(tagStr, {
            onSkip: onSkip
        });
        var hasSpace = tagGrabber.includes(_pluginHelper.SPACE);
        tagMode = TAG_STATE_NAME;
        while(tagGrabber.hasNext()){
            tagMode = nextTagState(tagGrabber, !hasSpace);
        }
        chars.skip(); // skip closeTag
        return STATE_WORD;
    };
    var stateWord = function stateWord() {
        if (isNewLine(chars.getCurr())) {
            emitToken(_token.TYPE_NEW_LINE, chars.getCurr());
            chars.skip();
            col = 0;
            row++;
            return STATE_WORD;
        }
        if (isWhiteSpace(chars.getCurr())) {
            var word = chars.grabWhile(isWhiteSpace);
            emitToken(_token.TYPE_SPACE, word);
            return STATE_WORD;
        }
        if (chars.getCurr() === openTag) {
            if (contextFreeTag) {
                var fullTagLen = openTag.length + _pluginHelper.SLASH.length + contextFreeTag.length;
                var fullTagName = "" + openTag + _pluginHelper.SLASH + contextFreeTag;
                var foundTag = chars.grabN(fullTagLen);
                var isEndContextFreeMode = foundTag === fullTagName;
                if (isEndContextFreeMode) {
                    return STATE_TAG;
                }
            } else if (chars.includes(closeTag)) {
                return STATE_TAG;
            }
            emitToken(_token.TYPE_WORD, chars.getCurr());
            chars.skip();
            return STATE_WORD;
        }
        if (escapeTags) {
            if (isEscapeChar(chars.getCurr())) {
                var currChar = chars.getCurr();
                var nextChar = chars.getNext();
                chars.skip(); // skip the \ without emitting anything
                if (isEscapableChar(nextChar)) {
                    chars.skip(); // skip past the [, ] or \ as well
                    emitToken(_token.TYPE_WORD, nextChar);
                    return STATE_WORD;
                }
                emitToken(_token.TYPE_WORD, currChar);
                return STATE_WORD;
            }
            var isChar = function(char) {
                return isCharToken(char) && !isEscapeChar(char);
            };
            var word1 = chars.grabWhile(isChar);
            emitToken(_token.TYPE_WORD, word1);
            return STATE_WORD;
        }
        var word2 = chars.grabWhile(isCharToken);
        emitToken(_token.TYPE_WORD, word2);
        return STATE_WORD;
    };
    var tokenize = function tokenize() {
        stateMode = STATE_WORD;
        while(chars.hasNext()){
            switch(stateMode){
                case STATE_TAG:
                    stateMode = stateTag();
                    break;
                case STATE_TAG_ATTRS:
                    stateMode = stateAttrs();
                    break;
                case STATE_WORD:
                default:
                    stateMode = stateWord();
                    break;
            }
        }
        tokens.length = tokenIndex + 1;
        return tokens;
    };
    var isTokenNested = function isTokenNested(token) {
        var value = openTag + _pluginHelper.SLASH + token.getValue();
        // potential bottleneck
        return buffer.indexOf(value) > -1;
    };
    var STATE_WORD = 0;
    var STATE_TAG = 1;
    var STATE_TAG_ATTRS = 2;
    var TAG_STATE_NAME = 0;
    var TAG_STATE_ATTR = 1;
    var TAG_STATE_VALUE = 2;
    var row = 0;
    var col = 0;
    var tokenIndex = -1;
    var stateMode = STATE_WORD;
    var tagMode = TAG_STATE_NAME;
    var contextFreeTag = "";
    var tokens = new Array(Math.floor(buffer.length));
    var openTag = options.openTag || _pluginHelper.OPEN_BRAKET;
    var closeTag = options.closeTag || _pluginHelper.CLOSE_BRAKET;
    var escapeTags = !!options.enableEscapeTags;
    var contextFreeTags = options.contextFreeTags || [];
    var onToken = options.onToken || function() {};
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
    var isNewLine = function(char) {
        return char === _pluginHelper.N;
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
    var onSkip = function() {
        col++;
    };
    var unq = function(val) {
        return (0, _utils.unquote)((0, _utils.trimChar)(val, _pluginHelper.QUOTEMARK));
    };
    var checkContextFreeMode = function(name, isClosingTag) {
        if (contextFreeTag !== "" && isClosingTag) {
            contextFreeTag = "";
        }
        if (contextFreeTag === "" && contextFreeTags.includes(name)) {
            contextFreeTag = name;
        }
    };
    var chars = (0, _utils.createCharGrabber)(buffer, {
        onSkip: onSkip
    });
    return {
        tokenize: tokenize,
        isTokenNested: isTokenNested
    };
}
var createTokenOfType = createToken;
