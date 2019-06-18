import { foreachDirective, endForeachDirective } from "./directives/foreach.directive";
import { ifDirective, endIfDirective, elseDirective, elseIfDirective } from "./directives/conditions.directive";
import { forDirective, endForDirective } from "./directives/for.directive";

export class KnifeEngine {

    private readonly directives = new Map<string, any>();
    private readonly compiled = new Map<string, Function>();

    constructor(private readonly options: {[key: string]: any} = {}) {

        this.directive('foreach', foreachDirective, endForeachDirective)
            .directive('for', forDirective, endForDirective)
            .directive('if', ifDirective, endIfDirective)
            .directive('elseif', elseIfDirective)
            .directive('else', elseDirective);
    }

    /**
     * Adds a directive to compiler
     * 
     * @param name 
     * @param callback 
     */
    directive(name: string, callback: (...string: string[]) => string, endCallback?: (...string: string[]) => string) {
        this.directives.set(name, callback);
        if (endCallback) this.directives.set('end' + name, endCallback);

        return this;
    }

    /**
     * Parses every line of the templates and creates a function
     * that takes the context as a parameter to render
     * 
     * @param string Template to render as a string
     * @param name (not requied) Name to give to compiled view for caching purpose
     */
    compile(string: string, name?: string): Function {
        const lines = string.split('\n');
        
        // Exposes context keys inside function
        const functionStart = `let output = ''; for (var key in context) this[key] = context[key];`;
        const functionCommands = lines.map(line => this.compileLine(line));
        const functionEnd = "return output;";

        console.log(functionCommands);

        // Concatenates all parts of the function
        const functionBody = [functionStart, ...functionCommands, functionEnd].join('\n');

        // Create a function from the string we just made
        const compiled = new Function('context', functionBody);

        // If a name was passed, we keep the result in the instance (kinda cache)
        if (name) this.compiled.set(name, compiled);

        return compiled;
    }

    /**
     * Executes cached callback with given context
     * 
     * @param name 
     * @param context 
     * @param options 
     */
    render(name: string, context: {[key: string]: any}, options: {[key: string]: any} = {}): string {
        const compiled = this.compiled.get(name);

        return compiled(context);
    }

    /**
     * Renders template fron body string
     * 
     * @param string 
     * @param context 
     * @param options 
     */
    renderString(string: string, context: {[key: string]: any}, options: {[key: string]: any} = {}): string {
        const compiled = this.compile(string);

        return compiled(context);
    }

    /**
     * Compiles a single line of template
     * 
     * @param line 
     */
    compileLine(line: string) {
        // Check if directive
        const directiveMatches = line.match(/@([a-z]*)(\((.*)\)|)/i);

        // Handle directive
        if (directiveMatches) {
            const [match, directive, uh, argument] = directiveMatches;
            if (this.directives.has(directive)) {
                const callback = this.directives.get(directive);
                return callback(argument);
            }
        }
        
        // Replace brackets by interpolation
        const interpolated = line
            .replace(/{{(.*?)}}/gi, (match, content) => '${ ' + content + ' }')
            .replace('`', '\\`'); // escape backticks
        return 'output += `' + interpolated + '`;';
    }

}

const knife = new KnifeEngine();

// fallback for browsers
export default { knife };
