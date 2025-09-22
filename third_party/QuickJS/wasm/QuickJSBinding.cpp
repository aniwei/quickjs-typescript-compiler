#include <emscripten.h>
#include <string>
#include <stdexcept>
#include "QuickJS/extension/taro_js_bytecode.h"
#include "QuickJSBinding.h"

namespace quickjs {
  std::string getException(JSContext *context, JSValue module) {
    JSValue exception = JS_GetException(context);
    JSValue message = JS_GetPropertyStr(context, exception, "message");
    JSValue stack = JS_GetPropertyStr(context, exception, "stack");

    const char* messageStr = JS_ToCString(context, message);
    const char* stackStr = JS_ToCString(context, stack);

    std::string ss = std::string(messageStr) + "\n" + std::string(stackStr);

    JS_FreeCString(context, messageStr);
    JS_FreeCString(context, stackStr);
    JS_FreeValue(context, message);
    JS_FreeValue(context, stack);
    JS_FreeValue(context, exception);

    return ss;
  }

  /// @brief
  QuickJSBinding::QuickJSBinding() {}

  JSModuleDef *QuickJSBinding::resolve(
    JSContext *jsContext,
    const char *moduleName,
    void *opaque
  ) {
    auto defaultExport = [](JSContext *jsContext, JSModuleDef *m) {
      return 0;
    };

    JSModuleDef *m = taro_js_new_c_module(jsContext, moduleName, defaultExport);
    return m;
  }

  JSContext *QuickJSBinding::prepare(std::vector<std::string> modules) {
    JSRuntime *runtime = JS_NewRuntime();
    JSContext *context = JS_NewContext(runtime);

    auto defaultExport = [](
      JSContext *context, 
      JSModuleDef *m) { 
        return 0; 
      };

    JS_SetModuleLoaderFunc(
      runtime, 
      nullptr, 
      QuickJSBinding::resolve, 
      nullptr);

    for (const auto &module : modules) {
      JSModuleDef *m = taro_js_new_c_module(
        context, 
        module.c_str(), 
        defaultExport);

      if (!m) {
        throw std::runtime_error("Failed to create module: " + module);
      }
    }

    return context;
  }

  /// @brief
  std::vector<uint8_t> QuickJSBinding::compile(
    std::string input, 
    std::string sourceURL,
    std::vector<std::string> modules
  ) {
    JSContext *context = prepare(modules);
    JSValue m = JS_Eval(
      context,
      input.c_str(),
      input.size(),
      sourceURL.c_str(),
      JS_EVAL_FLAG_COMPILE_ONLY | JS_EVAL_TYPE_MODULE
    );

    if (taro_is_exception(m)) {
      auto exception = getException(context, m);
      JS_FreeValue(context, m);
      throw std::runtime_error("Failed to compile module detail: " + exception);
    }

    size_t byteLength = 0;
    uint8_t *bytes = JS_WriteObject(
      context,
      &byteLength,
      m,
      JS_WRITE_OBJ_BYTECODE);

    JS_FreeValue(context, m);

    JSRuntime *rt = JS_GetRuntime(context);
    if (!bytes) {
      JS_FreeContext(context);
      JS_FreeRuntime(rt);
      throw std::runtime_error("Failed to write bytecode");
    }

    std::vector<uint8_t> out(bytes, bytes + byteLength);
    js_free(context, bytes);
    JS_FreeContext(context);
    JS_FreeRuntime(rt);

    return out;
  }

  std::string QuickJSBinding::dumpWithBinary(
    std::vector<uint8_t> bytes,
    std::vector<std::string> modules
  ) {
    std::string out;
    
#ifdef DUMP_BYTECODE
    out = taro_js_dump_function_bytecode_bin(bytes.data(), bytes.size());
#endif
    return out;
  }

  std::string QuickJSBinding::runWithBinary(
    std::vector<uint8_t> bytes, 
    std::vector<std::string> modules
  ) {
    JSContext* ctx = prepare(modules);
    JSRuntime* rt = JS_GetRuntime(ctx);

    JSValue obj = JS_ReadObject(
      ctx, 
      bytes.data(), 
      bytes.size(), 
      JS_READ_OBJ_BYTECODE);

    if (taro_is_exception(obj)) {
      std::string err = getException(ctx, obj);
      JS_FreeContext(ctx);
      JS_FreeRuntime(rt);
      return std::string("ERROR: Failed to read bytecode: ") + err;
    }

    // Evaluate module or function
    if (JS_VALUE_GET_TAG(obj) == JS_TAG_MODULE) {
      // For modules, JS_EvalFunction loads the module and returns the evaluation result
      JSValue result = JS_EvalFunction(ctx, obj);
      if (taro_is_exception(result)) {
        std::string err = getException(ctx, result);
        JS_FreeValue(ctx, result);
        JS_FreeContext(ctx);
        JS_FreeRuntime(rt);

        return std::string("ERROR: Failed to eval module: ") + err;
      }

      // Convert result to string (often undefined for modules)
      const char* s = JS_ToCString(ctx, result);
      std::string out = s ? std::string(s) : std::string();

      if (s) JS_FreeCString(ctx, s);
      JS_FreeValue(ctx, result);
      JS_FreeContext(ctx);
      JS_FreeRuntime(rt);
      return out;
    }

    // If function bytecode, create function object and call it
    if (JS_VALUE_GET_TAG(obj) == JS_TAG_FUNCTION_BYTECODE) {
      JSValue func = JS_EvalFunction(ctx, obj);

      if (taro_is_exception(func)) {
        std::string err = getException(ctx, func);
        JS_FreeValue(ctx, func);
        JS_FreeContext(ctx);
        JS_FreeRuntime(rt);
        return std::string("ERROR: Failed to create function from bytecode: ") + err;
      }

      JSValue thisVal = JS_UNDEFINED;
      JSValue ret = JS_Call(ctx, func, thisVal, 0, nullptr);

      if (taro_is_exception(ret)) {
        std::string err = getException(ctx, ret);
        JS_FreeValue(ctx, func);
        JS_FreeValue(ctx, ret);
        JS_FreeContext(ctx);
        JS_FreeRuntime(rt);

        return std::string("ERROR: Runtime exception: ") + err;
      }

      const char* s = JS_ToCString(ctx, ret);
      std::string out = s ? std::string(s) : std::string();

      if (s) JS_FreeCString(ctx, s);

      JS_FreeValue(ctx, func);
      JS_FreeValue(ctx, ret);
      JS_FreeContext(ctx);
      JS_FreeRuntime(rt);

      return out;
    }

    // Fallback: try to eval as general object
    JSValue result = JS_EvalFunction(ctx, obj);
    if (taro_is_exception(result)) {
      std::string err = getException(ctx, result);
      JS_FreeValue(ctx, result);
      JS_FreeContext(ctx);
      JS_FreeRuntime(rt);

      return std::string("ERROR: Failed to eval object: ") + err;
    }
    const char* s = JS_ToCString(ctx, result);
    std::string out = s ? std::string(s) : std::string();
    
    if (s) JS_FreeCString(ctx, s);
    JS_FreeValue(ctx, result);
    JS_FreeContext(ctx);
    JS_FreeRuntime(rt);
    return out;
  }

  uint32_t QuickJSBinding::getBytecodeVersion() {
    return static_cast<uint32_t>(taro_bc_get_version());
  }

  std::map<std::string, bool> QuickJSBinding::getCompileOptions() {
    std::map<std::string, bool> options;
#ifdef DUMP_BYTECODE
    options["dump"] = true;
#else
    options["dump"] = false;
#endif

#ifdef CONFIG_BIGNUM
    options["bignum"] = true;
#else
    options["bignum"] = false;
#endif
    
    return options;
  }

  std::map<std::string, uint32_t> QuickJSBinding::getAtomMap() {
    std::map<std::string, uint32_t> atomIds;

    // 与 getOpcodeMap 一致：通过展开 quickjs-atom.h 自动生成映射
    // - 为每个原子添加两种键：标识符名称（#name）与其字符串值（str）
    // - 其中 empty_string 既添加 "" 键，也补充一个易读别名 "empty_string"
    // - 额外补充历史兼容别名（如 "<private_brand>")

    #define DEF(name, str)                                                     \
      atomIds[#name] = static_cast<uint32_t>(JS_ATOM_##name);                  \
      atomIds[str]    = static_cast<uint32_t>(JS_ATOM_##name);
    #include "QuickJS/quickjs-atom.h"
    #undef DEF

    // 友好别名：空字符串
    atomIds["empty_string"] = static_cast<uint32_t>(JS_ATOM_empty_string);
    // 兼容别名：历史映射中使用过的私有品牌占位
    atomIds["<private_brand>"] = static_cast<uint32_t>(JS_ATOM_Private_brand);
    
    return atomIds;
  }

  uint32_t QuickJSBinding::getFirstAtomId() {
    // QuickJS 写对象时，允许字节码情况下 first_atom = JS_ATOM_END
    // 这里返回编译期的值供前端校验
    return static_cast<uint32_t>(JS_ATOM_END);
  }

  std::map<std::string, uint32_t> QuickJSBinding::getOpcodeMap() {
    std::map<std::string, uint32_t> opcodeIds;

    // 参照 getAtomMap 的思路：通过 quickjs-opcode.h 列表，构建 name -> opcode 数值的映射。
    // 由于 OP_* 枚举定义在私有头 types.h 中，这里本地重建一个等价的枚举，
    // 保证与引擎一致（包含 SHORT_OPCODES）。然后基于该枚举生成映射。
    // 注意：跳过临时指令（def 宏），仅导出正式与短指令（DEF 宏）。

    // 确保包含短指令（与引擎默认一致）
    #ifndef SHORT_OPCODES
    #define SHORT_OPCODES 1
    #endif

    // 本地重建与 OPCodeEnum 一致的枚举，前半段生成 OP_LOCAL_*，随后追加临时指令范围。
    enum {
      #define FMT(f)
      #define DEF(id, size, n_pop, n_push, f) OP_LOCAL_##id,
      #define def(id, size, n_pop, n_push, f)
      #include "QuickJS/quickjs-opcode.h"
      #undef def
      #undef DEF
      #undef FMT
      OP_LOCAL_COUNT,
      OP_LOCAL_TEMP_START = OP_LOCAL_nop + 1,
      #define FMT(f)
      #define DEF(id, size, n_pop, n_push, f)
      #define def(id, size, n_pop, n_push, f) OP_LOCAL_##id,
      #include "QuickJS/quickjs-opcode.h"
      #undef def
      #undef DEF
      #undef FMT
      OP_LOCAL_TEMP_END,
    };

    // 生成 name -> id 的映射（只包含“正式/短”指令，不含临时指令）
    #define FMT(f)
    #define DEF(id, size, n_pop, n_push, f) opcodeIds[#id] = static_cast<uint32_t>(OP_LOCAL_##id);
    #define def(id, size, n_pop, n_push, f)
    #include "QuickJS/quickjs-opcode.h"
    #undef def
    #undef DEF
    #undef FMT

    return opcodeIds;
  }
}
