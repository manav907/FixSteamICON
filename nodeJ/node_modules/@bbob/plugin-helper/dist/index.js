(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.BbobPluginHelper = {}));
})(this, (function (exports) { 'use strict';

    const N = '\n';
    const TAB = '\t';
    const F = '\f';
    const R = '\r';
    const EQ = '=';
    const QUOTEMARK = '"';
    const SPACE = ' ';
    const OPEN_BRAKET = '[';
    const CLOSE_BRAKET = ']';
    const SLASH = '/';
    const BACKSLASH = '\\';

    const isTagNode = (el)=>typeof el === 'object' && !!el.tag;
    const isStringNode = (el)=>typeof el === 'string';
    const isEOL = (el)=>el === N;
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

    exports.BACKSLASH = BACKSLASH;
    exports.CLOSE_BRAKET = CLOSE_BRAKET;
    exports.EQ = EQ;
    exports.F = F;
    exports.N = N;
    exports.OPEN_BRAKET = OPEN_BRAKET;
    exports.QUOTEMARK = QUOTEMARK;
    exports.R = R;
    exports.SLASH = SLASH;
    exports.SPACE = SPACE;
    exports.TAB = TAB;
    exports.TagNode = TagNode;
    exports.appendToNode = appendToNode;
    exports.attrValue = attrValue;
    exports.attrsToString = attrsToString;
    exports.escapeHTML = escapeHTML;
    exports.getNodeLength = getNodeLength;
    exports.getUniqAttr = getUniqAttr;
    exports.isEOL = isEOL;
    exports.isStringNode = isStringNode;
    exports.isTagNode = isTagNode;

}));
