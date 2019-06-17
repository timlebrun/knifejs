export declare class KnifeEngine {
    private readonly options;
    private readonly directives;
    private readonly compiled;
    constructor(options?: {
        [key: string]: any;
    });
    directive(name: string, callback: (...string: string[]) => string, endCallback?: (...string: string[]) => string): this;
    compile(string: string, name?: string): Function;
    render(name: string, context: {
        [key: string]: any;
    }, options?: {
        [key: string]: any;
    }): string;
    renderString(string: string, context: {
        [key: string]: any;
    }, options?: {
        [key: string]: any;
    }): string;
    compileLine(line: string): any;
}
declare const _default: {
    knife: KnifeEngine;
};
export default _default;
