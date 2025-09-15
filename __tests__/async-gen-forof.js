'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncAdd = asyncAdd;
exports.genCounter = genCounter;
async function asyncAdd(a, b) {
    // 需要设置环境变量 QJS_OP_AWAIT（并与 quickjs-opcode.h 对齐），否则编译报错
    const x = await a;
    const y = await b;
    return x + y;
}
function* genCounter(n) {
    // 需要设置 QJS_OP_YIELD；否则编译报错
    let i = 0;
    while (i < n) {
        yield i++;
    }
}
