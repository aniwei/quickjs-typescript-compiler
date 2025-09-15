'use strict';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bar = exports.foo = void 0;
exports.default = hello;
const lib_mjs_1 = __importDefault(require("./lib.mjs"));
var lib_mjs_2 = require("./lib.mjs");
Object.defineProperty(exports, "foo", { enumerable: true, get: function () { return lib_mjs_2.f; } });
Object.defineProperty(exports, "bar", { enumerable: true, get: function () { return lib_mjs_2.bar; } });
__exportStar(require("./lib.mjs"), exports);
function hello(name) {
    return (0, lib_mjs_1.default)(name);
}
const x = 1;
function makeAdder(a) {
    return (b) => a + b + x;
}
async function load() {
    const m = await Promise.resolve().then(() => __importStar(require('./lazy.mjs')));
    return m.default;
}
with ({ a: 123 }) {
    // demo with semantics; actual resolution depends on runtime
    const z = a + 1;
}
const y = eval('1+2'); // demo eval
