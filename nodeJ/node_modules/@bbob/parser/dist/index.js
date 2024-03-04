(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.BbobParser = {}));
})(this, (function (exports) { 'use strict';

    const N = '\n';
    const TAB = '\t';
    const EQ = '=';
    const QUOTEMARK = '"';
    const SPACE = ' ';
    const OPEN_BRAKET = '[';
    const CLOSE_BRAKET = ']';
    const SLASH = '/';
    const BACKSLASH = '\\';

    const isTagNode = (el)=>typeof el === 'object' && !!el.tag;
    const isStringNode = (el)=>typeof el === 'string';
    const keysReduce = (obj, reduce, def)=>Object.keys(obj).reduce(reduce, def);
    const getNodeLength = (node)=>{
        if (isTagNode(node)) {
            return node.content.reduce((count, contentNode)=>count + getNodeLength(contentNode), 0);
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
     */ const appendToNode = (node, value)=>{
        node.content.push(value);
    };
    /**
     * Replaces " to &qquot;
     * @param {String} value
     */ const escapeHTML = (value)=>value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;')// eslint-disable-next-line no-script-url
        .replace(/(javascript|data|vbscript):/gi, '$1%3A');
    /**
     * Acept name and value and return valid html5 attribute string
     * @param {String} name
     * @param {String} value
     * @return {string}
     */ const attrValue = (name, value)=>{
        const type = typeof value;
        const types = {
            boolean: ()=>value ? `${name}` : '',
            number: ()=>`${name}="${value}"`,
            string: ()=>`${name}="${escapeHTML(value)}"`,
            object: ()=>`${name}="${escapeHTML(JSON.stringify(value))}"`
        };
        return types[type] ? types[type]() : '';
    };
    /**
     * Transforms attrs to html params string
     * @param values
     */ const attrsToString = (values)=>{
        // To avoid some malformed attributes
        if (values == null) {
            return '';
        }
        return keysReduce(values, (arr, key)=>[
                ...arr,
                attrValue(key, values[key])
            ], [
            ''
        ]).join(' ');
    };
    /**
     * Gets value from
     * @example
     * getUniqAttr({ 'foo': true, 'bar': bar' }) => 'bar'
     * @param attrs
     * @returns {string}
     */ const getUniqAttr = (attrs)=>keysReduce(attrs, (res, key)=>attrs[key] === key ? attrs[key] : null, null);

    const getTagAttrs = (tag, params)=>{
        const uniqAattr = getUniqAttr(params);
        if (uniqAattr) {
            const tagAttr = attrValue(tag, uniqAattr);
            const attrs = {
                ...params
            };
            delete attrs[uniqAattr];
            const attrsStr = attrsToString(attrs);
            return `${tagAttr}${attrsStr}`;
        }
        return `${tag}${attrsToString(params)}`;
    };
    class TagNode {
        attr(name, value) {
            if (typeof value !== 'undefined') {
                this.attrs[name] = value;
            }
            return this.attrs[name];
        }
        append(value) {
            return appendToNode(this, value);
        }
        get length() {
            return getNodeLength(this);
        }
        toTagStart({ openTag =OPEN_BRAKET , closeTag =CLOSE_BRAKET  } = {}) {
            const tagAttrs = getTagAttrs(this.tag, this.attrs);
            return `${openTag}${tagAttrs}${closeTag}`;
        }
        toTagEnd({ openTag =OPEN_BRAKET , closeTag =CLOSE_BRAKET  } = {}) {
            return `${openTag}${SLASH}${this.tag}${closeTag}`;
        }
        toTagNode() {
            return new TagNode(this.tag.toLowerCase(), this.attrs, this.content);
        }
        toString({ openTag =OPEN_BRAKET , closeTag =CLOSE_BRAKET  } = {}) {
            const isEmpty = this.content.length === 0;
            const content = this.content.reduce((r, node)=>r + node.toString({
                    openTag,
                    closeTag
                }), '');
            const tagStart = this.toTagStart({
                openTag,
                closeTag
            });
            if (isEmpty) {
                return tagStart;
            }
            return `${tagStart}${content}${this.toTagEnd({
            openTag,
            closeTag
        })}`;
        }
        constructor(tag, attrs, content){
            this.tag = tag;
            this.attrs = attrs;
            this.content = Array.isArray(content) ? content : [
                content
            ];
        }
    }
    TagNode.create = (tag, attrs = {}, content = [])=>new TagNode(tag, attrs, content);
    TagNode.isOf = (node, type)=>node.tag === type;

    // type, value, line, row,
    const TOKEN_TYPE_ID = 'type'; // 0;
    const TOKEN_VALUE_ID = 'value'; // 1;
    const TOKEN_COLUMN_ID = 'row'; // 2;
    const TOKEN_LINE_ID = 'line'; // 3;
    const TOKEN_TYPE_WORD = 1; // 'word';
    const TOKEN_TYPE_TAG = 2; // 'tag';
    const TOKEN_TYPE_ATTR_NAME = 3; // 'attr-name';
    const TOKEN_TYPE_ATTR_VALUE = 4; // 'attr-value';
    const TOKEN_TYPE_SPACE = 5; // 'space';
    const TOKEN_TYPE_NEW_LINE = 6; // 'new-line';
    /**
     * @param {Token} token
     * @returns {string}
     */ const getTokenValue = (token)=>{
        if (token && typeof token[TOKEN_VALUE_ID] !== 'undefined') {
            return token[TOKEN_VALUE_ID];
        }
        return '';
    };
    /**
     * @param {Token}token
     * @returns {number}
     */ const getTokenLine = (token)=>token && token[TOKEN_LINE_ID] || 0;
    const getTokenColumn = (token)=>token && token[TOKEN_COLUMN_ID] || 0;
    /**
     * @param {Token} token
     * @returns {boolean}
     */ const isTextToken = (token)=>{
        if (token && typeof token[TOKEN_TYPE_ID] !== 'undefined') {
            return token[TOKEN_TYPE_ID] === TOKEN_TYPE_SPACE || token[TOKEN_TYPE_ID] === TOKEN_TYPE_NEW_LINE || token[TOKEN_TYPE_ID] === TOKEN_TYPE_WORD;
        }
        return false;
    };
    /**
     * @param {Token} token
     * @returns {boolean}
     */ const isTagToken = (token)=>{
        if (token && typeof token[TOKEN_TYPE_ID] !== 'undefined') {
            return token[TOKEN_TYPE_ID] === TOKEN_TYPE_TAG;
        }
        return false;
    };
    const isTagEnd = (token)=>getTokenValue(token).charCodeAt(0) === SLASH.charCodeAt(0);
    const isTagStart = (token)=>!isTagEnd(token);
    const isAttrNameToken = (token)=>{
        if (token && typeof token[TOKEN_TYPE_ID] !== 'undefined') {
            return token[TOKEN_TYPE_ID] === TOKEN_TYPE_ATTR_NAME;
        }
        return false;
    };
    /**
     * @param {Token} token
     * @returns {boolean}
     */ const isAttrValueToken = (token)=>{
        if (token && typeof token[TOKEN_TYPE_ID] !== 'undefined') {
            return token[TOKEN_TYPE_ID] === TOKEN_TYPE_ATTR_VALUE;
        }
        return false;
    };
    const getTagName = (token)=>{
        const value = getTokenValue(token);
        return isTagEnd(token) ? value.slice(1) : value;
    };
    const convertTagToText = (token)=>{
        let text = OPEN_BRAKET;
        text += getTokenValue(token);
        text += CLOSE_BRAKET;
        return text;
    };
    class Token {
        isEmpty() {
            // eslint-disable-next-line no-restricted-globals
            return isNaN(this[TOKEN_TYPE_ID]);
        }
        isText() {
            return isTextToken(this);
        }
        isTag() {
            return isTagToken(this);
        }
        isAttrName() {
            return isAttrNameToken(this);
        }
        isAttrValue() {
            return isAttrValueToken(this);
        }
        isStart() {
            return isTagStart(this);
        }
        isEnd() {
            return isTagEnd(this);
        }
        getName() {
            return getTagName(this);
        }
        getValue() {
            return getTokenValue(this);
        }
        getLine() {
            return getTokenLine(this);
        }
        getColumn() {
            return getTokenColumn(this);
        }
        toString() {
            return convertTagToText(this);
        }
        /**
       * @param {String} type
       * @param {String} value
       * @param line
       * @param row
       */ constructor(type, value, line, row){
            this[TOKEN_TYPE_ID] = Number(type);
            this[TOKEN_VALUE_ID] = String(value);
            this[TOKEN_LINE_ID] = Number(line);
            this[TOKEN_COLUMN_ID] = Number(row);
        }
    }
    const TYPE_WORD = TOKEN_TYPE_WORD;
    const TYPE_TAG = TOKEN_TYPE_TAG;
    const TYPE_ATTR_NAME = TOKEN_TYPE_ATTR_NAME;
    const TYPE_ATTR_VALUE = TOKEN_TYPE_ATTR_VALUE;
    const TYPE_SPACE = TOKEN_TYPE_SPACE;
    const TYPE_NEW_LINE = TOKEN_TYPE_NEW_LINE;

    function CharGrabber(source, options) {
        const cursor = {
            pos: 0,
            len: source.length
        };
        const substrUntilChar = (char)=>{
            const { pos  } = cursor;
            const idx = source.indexOf(char, pos);
            return idx >= 0 ? source.substring(pos, idx) : '';
        };
        const includes = (val)=>source.indexOf(val, cursor.pos) >= 0;
        const hasNext = ()=>cursor.len > cursor.pos;
        const isLast = ()=>cursor.pos === cursor.len;
        const skip = (num = 1, silent)=>{
            cursor.pos += num;
            if (options && options.onSkip && !silent) {
                options.onSkip();
            }
        };
        const rest = ()=>source.substring(cursor.pos);
        const grabN = (num = 0)=>source.substring(cursor.pos, cursor.pos + num);
        const curr = ()=>source[cursor.pos];
        const prev = ()=>{
            const prevPos = cursor.pos - 1;
            return typeof source[prevPos] !== 'undefined' ? source[prevPos] : null;
        };
        const next = ()=>{
            const nextPos = cursor.pos + 1;
            return nextPos <= source.length - 1 ? source[nextPos] : null;
        };
        const grabWhile = (cond, silent)=>{
            let start = 0;
            if (hasNext()) {
                start = cursor.pos;
                while(hasNext() && cond(curr())){
                    skip(1, silent);
                }
            }
            return source.substring(start, cursor.pos);
        };
        /**
       * @type {skip}
       */ this.skip = skip;
        /**
       * @returns {Boolean}
       */ this.hasNext = hasNext;
        /**
       * @returns {String}
       */ this.getCurr = curr;
        /**
       * @returns {String}
       */ this.getRest = rest;
        /**
       * @returns {String}
       */ this.getNext = next;
        /**
       * @returns {String}
       */ this.getPrev = prev;
        /**
       * @returns {Boolean}
       */ this.isLast = isLast;
        /**
       * @returns {Boolean}
       */ this.includes = includes;
        /**
       * @param {Function} cond
       * @param {Boolean} silent
       * @return {String}
       */ this.grabWhile = grabWhile;
        /**
       * @param {Number} num
       * @return {String}
       */ this.grabN = grabN;
        /**
       * Grabs rest of string until it find a char
       * @param {String} char
       * @return {String}
       */ this.substrUntilChar = substrUntilChar;
    }
    /**
     * Creates a grabber wrapper for source string, that helps to iterate over string char by char
     * @param {String} source
     * @param {Object} options
     * @param {Function} options.onSkip
     * @return CharGrabber
     */ const createCharGrabber = (source, options)=>new CharGrabber(source, options);
    /**
     * Trims string from start and end by char
     * @example
     *  trimChar('*hello*', '*') ==> 'hello'
     * @param {String} str
     * @param {String} charToRemove
     * @returns {String}
     */ const trimChar = (str, charToRemove)=>{
        while(str.charAt(0) === charToRemove){
            // eslint-disable-next-line no-param-reassign
            str = str.substring(1);
        }
        while(str.charAt(str.length - 1) === charToRemove){
            // eslint-disable-next-line no-param-reassign
            str = str.substring(0, str.length - 1);
        }
        return str;
    };
    /**
     * Unquotes \" to "
     * @param str
     * @return {String}
     */ const unquote = (str)=>str.replace(BACKSLASH + QUOTEMARK, QUOTEMARK);
    function NodeList(values = []) {
        const nodes = values;
        const getLast = ()=>Array.isArray(nodes) && nodes.length > 0 && typeof nodes[nodes.length - 1] !== 'undefined' ? nodes[nodes.length - 1] : null;
        const flushLast = ()=>nodes.length ? nodes.pop() : false;
        const push = (value)=>nodes.push(value);
        const toArray = ()=>nodes;
        this.push = push;
        this.toArray = toArray;
        this.getLast = getLast;
        this.flushLast = flushLast;
    }
    /**
     *
     * @param values
     * @return {NodeList}
     */ const createList = (values = [])=>new NodeList(values);

    // for cases <!-- -->
    const EM = '!';
    /**
     * Creates a Token entity class
     * @param {Number} type
     * @param {String} value
     * @param {Number} r line number
     * @param {Number} cl char number in line
     */ const createToken = (type, value, r = 0, cl = 0)=>new Token(type, value, r, cl);
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
     */ function createLexer(buffer, options = {}) {
        const STATE_WORD = 0;
        const STATE_TAG = 1;
        const STATE_TAG_ATTRS = 2;
        const TAG_STATE_NAME = 0;
        const TAG_STATE_ATTR = 1;
        const TAG_STATE_VALUE = 2;
        let row = 0;
        let col = 0;
        let tokenIndex = -1;
        let stateMode = STATE_WORD;
        let tagMode = TAG_STATE_NAME;
        let contextFreeTag = '';
        const tokens = new Array(Math.floor(buffer.length));
        const openTag = options.openTag || OPEN_BRAKET;
        const closeTag = options.closeTag || CLOSE_BRAKET;
        const escapeTags = !!options.enableEscapeTags;
        const contextFreeTags = options.contextFreeTags || [];
        const onToken = options.onToken || (()=>{});
        const RESERVED_CHARS = [
            closeTag,
            openTag,
            QUOTEMARK,
            BACKSLASH,
            SPACE,
            TAB,
            EQ,
            N,
            EM
        ];
        const NOT_CHAR_TOKENS = [
            openTag,
            SPACE,
            TAB,
            N
        ];
        const WHITESPACES = [
            SPACE,
            TAB
        ];
        const SPECIAL_CHARS = [
            EQ,
            SPACE,
            TAB
        ];
        const isCharReserved = (char)=>RESERVED_CHARS.indexOf(char) >= 0;
        const isNewLine = (char)=>char === N;
        const isWhiteSpace = (char)=>WHITESPACES.indexOf(char) >= 0;
        const isCharToken = (char)=>NOT_CHAR_TOKENS.indexOf(char) === -1;
        const isSpecialChar = (char)=>SPECIAL_CHARS.indexOf(char) >= 0;
        const isEscapableChar = (char)=>char === openTag || char === closeTag || char === BACKSLASH;
        const isEscapeChar = (char)=>char === BACKSLASH;
        const onSkip = ()=>{
            col++;
        };
        const unq = (val)=>unquote(trimChar(val, QUOTEMARK));
        const checkContextFreeMode = (name, isClosingTag)=>{
            if (contextFreeTag !== '' && isClosingTag) {
                contextFreeTag = '';
            }
            if (contextFreeTag === '' && contextFreeTags.includes(name)) {
                contextFreeTag = name;
            }
        };
        const chars = createCharGrabber(buffer, {
            onSkip
        });
        /**
       * Emits newly created token to subscriber
       * @param {Number} type
       * @param {String} value
       */ function emitToken(type, value) {
            const token = createToken(type, value, row, col);
            onToken(token);
            tokenIndex += 1;
            tokens[tokenIndex] = token;
        }
        function nextTagState(tagChars, isSingleValueTag) {
            if (tagMode === TAG_STATE_ATTR) {
                const validAttrName = (char)=>!(char === EQ || isWhiteSpace(char));
                const name = tagChars.grabWhile(validAttrName);
                const isEnd = tagChars.isLast();
                const isValue = tagChars.getCurr() !== EQ;
                tagChars.skip();
                if (isEnd || isValue) {
                    emitToken(TYPE_ATTR_VALUE, unq(name));
                } else {
                    emitToken(TYPE_ATTR_NAME, name);
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
                let stateSpecial = false;
                const validAttrValue = (char)=>{
                    // const isEQ = char === EQ;
                    const isQM = char === QUOTEMARK;
                    const prevChar = tagChars.getPrev();
                    const nextChar = tagChars.getNext();
                    const isPrevSLASH = prevChar === BACKSLASH;
                    const isNextEQ = nextChar === EQ;
                    const isWS = isWhiteSpace(char);
                    // const isPrevWS = isWhiteSpace(prevChar);
                    const isNextWS = isWhiteSpace(nextChar);
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
                const name1 = tagChars.grabWhile(validAttrValue);
                tagChars.skip();
                emitToken(TYPE_ATTR_VALUE, unq(name1));
                if (tagChars.isLast()) {
                    return TAG_STATE_NAME;
                }
                return TAG_STATE_ATTR;
            }
            const validName = (char)=>!(char === EQ || isWhiteSpace(char) || tagChars.isLast());
            const name2 = tagChars.grabWhile(validName);
            emitToken(TYPE_TAG, name2);
            checkContextFreeMode(name2);
            tagChars.skip();
            // in cases when we has [url=someval]GET[/url] and we dont need to parse all
            if (isSingleValueTag) {
                return TAG_STATE_VALUE;
            }
            const hasEQ = tagChars.includes(EQ);
            return hasEQ ? TAG_STATE_ATTR : TAG_STATE_VALUE;
        }
        function stateTag() {
            const currChar = chars.getCurr();
            const nextChar = chars.getNext();
            chars.skip();
            // detect case where we have '[My word [tag][/tag]' or we have '[My last line word'
            const substr = chars.substrUntilChar(closeTag);
            const hasInvalidChars = substr.length === 0 || substr.indexOf(openTag) >= 0;
            if (isCharReserved(nextChar) || hasInvalidChars || chars.isLast()) {
                emitToken(TYPE_WORD, currChar);
                return STATE_WORD;
            }
            // [myTag   ]
            const isNoAttrsInTag = substr.indexOf(EQ) === -1;
            // [/myTag]
            const isClosingTag = substr[0] === SLASH;
            if (isNoAttrsInTag || isClosingTag) {
                const name = chars.grabWhile((char)=>char !== closeTag);
                chars.skip(); // skip closeTag
                emitToken(TYPE_TAG, name);
                checkContextFreeMode(name, isClosingTag);
                return STATE_WORD;
            }
            return STATE_TAG_ATTRS;
        }
        function stateAttrs() {
            const silent = true;
            const tagStr = chars.grabWhile((char)=>char !== closeTag, silent);
            const tagGrabber = createCharGrabber(tagStr, {
                onSkip
            });
            const hasSpace = tagGrabber.includes(SPACE);
            tagMode = TAG_STATE_NAME;
            while(tagGrabber.hasNext()){
                tagMode = nextTagState(tagGrabber, !hasSpace);
            }
            chars.skip(); // skip closeTag
            return STATE_WORD;
        }
        function stateWord() {
            if (isNewLine(chars.getCurr())) {
                emitToken(TYPE_NEW_LINE, chars.getCurr());
                chars.skip();
                col = 0;
                row++;
                return STATE_WORD;
            }
            if (isWhiteSpace(chars.getCurr())) {
                const word = chars.grabWhile(isWhiteSpace);
                emitToken(TYPE_SPACE, word);
                return STATE_WORD;
            }
            if (chars.getCurr() === openTag) {
                if (contextFreeTag) {
                    const fullTagLen = openTag.length + SLASH.length + contextFreeTag.length;
                    const fullTagName = `${openTag}${SLASH}${contextFreeTag}`;
                    const foundTag = chars.grabN(fullTagLen);
                    const isEndContextFreeMode = foundTag === fullTagName;
                    if (isEndContextFreeMode) {
                        return STATE_TAG;
                    }
                } else if (chars.includes(closeTag)) {
                    return STATE_TAG;
                }
                emitToken(TYPE_WORD, chars.getCurr());
                chars.skip();
                return STATE_WORD;
            }
            if (escapeTags) {
                if (isEscapeChar(chars.getCurr())) {
                    const currChar = chars.getCurr();
                    const nextChar = chars.getNext();
                    chars.skip(); // skip the \ without emitting anything
                    if (isEscapableChar(nextChar)) {
                        chars.skip(); // skip past the [, ] or \ as well
                        emitToken(TYPE_WORD, nextChar);
                        return STATE_WORD;
                    }
                    emitToken(TYPE_WORD, currChar);
                    return STATE_WORD;
                }
                const isChar = (char)=>isCharToken(char) && !isEscapeChar(char);
                const word1 = chars.grabWhile(isChar);
                emitToken(TYPE_WORD, word1);
                return STATE_WORD;
            }
            const word2 = chars.grabWhile(isCharToken);
            emitToken(TYPE_WORD, word2);
            return STATE_WORD;
        }
        function tokenize() {
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
        }
        function isTokenNested(token) {
            const value = openTag + SLASH + token.getValue();
            // potential bottleneck
            return buffer.indexOf(value) > -1;
        }
        return {
            tokenize,
            isTokenNested
        };
    }

    /**
     * @public
     * @param {String} input
     * @param {Object} opts
     * @param {Function} opts.createTokenizer
     * @param {Array<string>} opts.onlyAllowTags
     * @param {Array<string>} opts.contextFreeTags
     * @param {Boolean} opts.enableEscapeTags
     * @param {String} opts.openTag
     * @param {String} opts.closeTag
     * @return {Array}
     */ const parse = (input, opts = {})=>{
        const options = opts;
        const openTag = options.openTag || OPEN_BRAKET;
        const closeTag = options.closeTag || CLOSE_BRAKET;
        let tokenizer = null;
        /**
       * Result AST of nodes
       * @private
       * @type {NodeList}
       */ const nodes = createList();
        /**
       * Temp buffer of nodes that's nested to another node
       * @private
       * @type {NodeList}
       */ const nestedNodes = createList();
        /**
       * Temp buffer of nodes [tag..]...[/tag]
       * @private
       * @type {NodeList}
       */ const tagNodes = createList();
        /**
       * Temp buffer of tag attributes
       * @private
       * @type {NodeList}
       */ const tagNodesAttrName = createList();
        /**
       * Cache for nested tags checks
       */ const nestedTagsMap = new Set();
        /**
       *
       * @param token
       * @returns {boolean}
       */ const isTokenNested = (token)=>{
            const value = token.getValue();
            if (!nestedTagsMap.has(value) && tokenizer.isTokenNested && tokenizer.isTokenNested(token)) {
                nestedTagsMap.add(value);
                return true;
            }
            return nestedTagsMap.has(value);
        };
        /**
       * @param tagName
       * @returns {boolean}
       */ const isTagNested = (tagName)=>Boolean(nestedTagsMap.has(tagName));
        /**
       * @private
       * @param {String} value
       * @return {boolean}
       */ const isAllowedTag = (value)=>{
            if (options.onlyAllowTags && options.onlyAllowTags.length) {
                return options.onlyAllowTags.indexOf(value) >= 0;
            }
            return true;
        };
        /**
       * Flushes temp tag nodes and its attributes buffers
       * @private
       * @return {Array}
       */ const flushTagNodes = ()=>{
            if (tagNodes.flushLast()) {
                tagNodesAttrName.flushLast();
            }
        };
        /**
       * @private
       * @return {Array}
       */ const getNodes = ()=>{
            const lastNestedNode = nestedNodes.getLast();
            if (lastNestedNode && Array.isArray(lastNestedNode.content)) {
                return lastNestedNode.content;
            }
            return nodes.toArray();
        };
        /**
       * @private
       * @param {string|TagNode} node
       */ const appendNodes = (node)=>{
            const items = getNodes();
            if (Array.isArray(items)) {
                if (isTagNode(node)) {
                    if (isAllowedTag(node.tag)) {
                        items.push(node.toTagNode());
                    } else {
                        items.push(node.toTagStart({
                            openTag,
                            closeTag
                        }));
                        if (node.content.length) {
                            node.content.forEach((item)=>{
                                items.push(item);
                            });
                            items.push(node.toTagEnd({
                                openTag,
                                closeTag
                            }));
                        }
                    }
                } else {
                    items.push(node);
                }
            }
        };
        /**
       * @private
       * @param {Token} token
       */ const handleTagStart = (token)=>{
            flushTagNodes();
            const tagNode = TagNode.create(token.getValue());
            const isNested = isTokenNested(token);
            tagNodes.push(tagNode);
            if (isNested) {
                nestedNodes.push(tagNode);
            } else {
                appendNodes(tagNode);
            }
        };
        /**
       * @private
       * @param {Token} token
       */ const handleTagEnd = (token)=>{
            flushTagNodes();
            const lastNestedNode = nestedNodes.flushLast();
            if (lastNestedNode) {
                appendNodes(lastNestedNode);
            } else if (typeof options.onError === 'function') {
                const tag = token.getValue();
                const line = token.getLine();
                const column = token.getColumn();
                options.onError({
                    message: `Inconsistent tag '${tag}' on line ${line} and column ${column}`,
                    tagName: tag,
                    lineNumber: line,
                    columnNumber: column
                });
            }
        };
        /**
       * @private
       * @param {Token} token
       */ const handleTag = (token)=>{
            // [tag]
            if (token.isStart()) {
                handleTagStart(token);
            }
            // [/tag]
            if (token.isEnd()) {
                handleTagEnd(token);
            }
        };
        /**
       * @private
       * @param {Token} token
       */ const handleNode = (token)=>{
            /**
         * @type {TagNode}
         */ const lastTagNode = tagNodes.getLast();
            const tokenValue = token.getValue();
            const isNested = isTagNested(token);
            if (lastTagNode) {
                if (token.isAttrName()) {
                    tagNodesAttrName.push(tokenValue);
                    lastTagNode.attr(tagNodesAttrName.getLast(), '');
                } else if (token.isAttrValue()) {
                    const attrName = tagNodesAttrName.getLast();
                    if (attrName) {
                        lastTagNode.attr(attrName, tokenValue);
                        tagNodesAttrName.flushLast();
                    } else {
                        lastTagNode.attr(tokenValue, tokenValue);
                    }
                } else if (token.isText()) {
                    if (isNested) {
                        lastTagNode.append(tokenValue);
                    } else {
                        appendNodes(tokenValue);
                    }
                } else if (token.isTag()) {
                    // if tag is not allowed, just past it as is
                    appendNodes(token.toString());
                }
            } else if (token.isText()) {
                appendNodes(tokenValue);
            } else if (token.isTag()) {
                // if tag is not allowed, just past it as is
                appendNodes(token.toString());
            }
        };
        /**
       * @private
       * @param {Token} token
       */ const onToken = (token)=>{
            if (token.isTag()) {
                handleTag(token);
            } else {
                handleNode(token);
            }
        };
        tokenizer = (opts.createTokenizer ? opts.createTokenizer : createLexer)(input, {
            onToken,
            openTag,
            closeTag,
            onlyAllowTags: options.onlyAllowTags,
            contextFreeTags: options.contextFreeTags,
            enableEscapeTags: options.enableEscapeTags
        });
        // eslint-disable-next-line no-unused-vars
        tokenizer.tokenize();
        return nodes.toArray();
    };

    exports.TagNode = TagNode;
    exports.default = parse;
    exports.parse = parse;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
