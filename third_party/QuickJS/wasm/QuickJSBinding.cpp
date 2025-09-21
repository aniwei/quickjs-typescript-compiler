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

  /// @brief
  QuickJSBinding::QuickJSBinding() {}

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
}
