/**
 * BytecodeEmitter 负责将指令序列转换成 QuickJS 可加载的 C 文件格式。
 */
export class BytecodeEmitter {
  private bytecode: number[] = []; // 存储生成的字节码序列

  // 写入一个8位的操作码
  emitOp(op: number) {
    this.bytecode.push(op);
  }

  // 写入一个32位的整数（作为操作数的立即数）
  // QuickJS 使用小端序 (Little Endian)
  emitI32(val: number) {
    this.bytecode.push(val & 0xff);
    this.bytecode.push((val >> 8) & 0xff);
    this.bytecode.push((val >> 16) & 0xff);
    this.bytecode.push((val >> 24) & 0xff);
  }

  /**
   * 将生成的字节码包装成一个完整的 C 源文件。
   * 这个结构模仿了 `qjsc` 工具的输出。
   * @param funcName 在 C 代码中暴露的函数名
   */
  toCSource(funcName: string = "my_module"): string {
    const bytecodeCArray = this.bytecode.join(',');

    // 这是 C 语言的模板，用于嵌入我们的字节码
    return `
#include "quickjs.h"

// 字节码数据
static const uint8_t ${funcName}_bytecode[] = { ${bytecodeCArray} };

// 模块初始化函数，用于加载字节码
static JSValue js_init_module_${funcName}(JSContext *ctx, JSModuleDef *m)
{
    JSValue val;
    val = JS_ReadObject(ctx, ${funcName}_bytecode, sizeof(${funcName}_bytecode), JS_READ_OBJ_BYTECODE);
    if (JS_IsException(val))
        return val;
    
    // 如果模块有导出（我们目前没有），可以在这里设置
    // JS_SetModuleExport(ctx, m, "default", val);

    return val;
}

// 模块定义
JSModuleDef *js_init_module(JSContext *ctx, const char *module_name)
{
    JSModuleDef *m;
    m = JS_NewCModule(ctx, module_name, js_init_module_${funcName});
    if (!m)
        return NULL;
    // 如果模块有导出（我们目前没有），可以在这里添加
    // JS_AddModuleExport(ctx, m, "default");
    return m;
}
`;
    }
}