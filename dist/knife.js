(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.knife = {}));
}(this, function (exports) { 'use strict';

    var foreachDirective = function (a) {
        if (!a || !a.includes('as'))
            throw Error('Fuck');
        var _a = a.split(' as '), iterable = _a[0], item = _a[1];
        return iterable + ".forEach((" + item + ", index) => {";
    };
    var endForeachDirective = function () { return '});'; };

    var ifDirective = function (a) { return "if (" + a + ") {"; };
    var elseIfDirective = function (a) { return "} else if(" + a + ") {"; };
    var elseDirective = function () { return "} else {"; };
    var endIfDirective = function () { return "}"; };

    var forDirective = function (a) { return "for(" + a + ") {"; };
    var endForDirective = function () { return '};'; };

    var KnifeEngine = (function () {
        function KnifeEngine(options) {
            if (options === void 0) { options = {}; }
            this.options = options;
            this.directives = new Map();
            this.compiled = new Map();
            this.directive('foreach', foreachDirective, endForeachDirective)
                .directive('for', forDirective, endForDirective)
                .directive('if', ifDirective, endIfDirective)
                .directive('elseif', elseIfDirective)
                .directive('else', elseDirective);
        }
        KnifeEngine.prototype.directive = function (name, callback, endCallback) {
            this.directives.set(name, callback);
            if (endCallback)
                this.directives.set('end' + name, endCallback);
            return this;
        };
        KnifeEngine.prototype.compile = function (string, name) {
            var _this = this;
            var lines = string.split('\n');
            var functionStart = "let output = ''; for (var key in context) this[key] = context[key];";
            var functionCommands = lines.map(function (line) { return _this.compileLine(line); });
            var functionEnd = "return output;";
            var functionBody = [functionStart].concat(functionCommands, [functionEnd]).join('\n');
            var compiled = new Function('context', functionBody);
            if (name)
                this.compiled.set(name, compiled);
            return compiled;
        };
        KnifeEngine.prototype.render = function (name, context, options) {
            var compiled = this.compiled.get(name);
            return compiled(context);
        };
        KnifeEngine.prototype.renderString = function (string, context, options) {
            var compiled = this.compile(string);
            return compiled(context);
        };
        KnifeEngine.prototype.compileLine = function (line) {
            var directiveMatches = line.match(/@([a-z]*)(\((.*)\)|)/i);
            if (directiveMatches) {
                var match = directiveMatches[0], directive = directiveMatches[1], uh = directiveMatches[2], argument = directiveMatches[3];
                if (this.directives.has(directive)) {
                    var callback = this.directives.get(directive);
                    return callback(argument);
                }
            }
            var interpolated = line
                .replace(/{{(.*)}}/i, function (match, content) { return '${ ' + content + ' }'; })
                .replace('`', '\\`');
            return 'output += `' + interpolated + '`;';
        };
        return KnifeEngine;
    }());
    var knife = new KnifeEngine();
    var knife$1 = { knife: knife };

    exports.KnifeEngine = KnifeEngine;
    exports.default = knife$1;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
