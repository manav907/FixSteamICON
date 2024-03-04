/**
 * Parse an ordered args string. For example, this string:
 * one two "three three" four\ four five
 * is parsed into: ["one", "two", "three three", "four four", "five"]
 * Double spaces between args are removed. But empty args in quotes are preserved.
 * @param {string} input
 * @return {string[]}
 */
export default function orderedArgs(input: string): string[];
//# sourceMappingURL=orderedArgs.d.ts.map