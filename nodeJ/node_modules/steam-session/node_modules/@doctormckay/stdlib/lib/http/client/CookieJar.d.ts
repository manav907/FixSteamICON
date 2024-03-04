import Cookie from './Cookie';
export default class CookieJar {
    #private;
    constructor();
    get cookies(): Cookie[];
    add(cookie: Cookie | string, domain: string): void;
    remove(cookieName: string, domain: string): boolean;
    getCookieHeaderForUrl(url: string): string;
    stringify(): string;
    static parse(stringifiedJar: string): CookieJar;
}
//# sourceMappingURL=CookieJar.d.ts.map