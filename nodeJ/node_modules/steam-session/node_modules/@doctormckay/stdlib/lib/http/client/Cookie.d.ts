interface CookieOptions {
    name: string;
    content: string;
    domain: string;
    expires: Date | null;
    path: string;
    secure: boolean;
}
export default class Cookie {
    name: string;
    content: string;
    domain: string;
    expires: Date | null;
    path: string;
    secure: boolean;
    constructor(options: CookieOptions);
    static parse(setCookie: string, domain: string): Cookie | null;
    stringify(): string;
    shouldSendForRequest(domain: string, path: string, secure: boolean): boolean;
}
export {};
//# sourceMappingURL=Cookie.d.ts.map