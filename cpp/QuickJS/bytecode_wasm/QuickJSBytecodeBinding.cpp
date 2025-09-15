#include <emscripten.h>
#include <string>
#include <stdexcept>
#include "QuickJSBytecodeBinding.h"

namespace quickjs {
  std::string getEvalException(JSContext *context, JSValue module) {
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

  JSModuleDef *QuickJSBytecodeBinding::resolve(
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
  QuickJSBytecodeBinding::QuickJSBytecodeBinding() {}

  JSContext *QuickJSBytecodeBinding::prepare(std::vector<std::string> modules) {
    JSRuntime *runtime = JS_NewRuntime();
    JSContext *context = JS_NewContext(runtime);

    auto defaultExport = [](JSContext *context, JSModuleDef *m) { return 0; };

    JS_SetModuleLoaderFunc(runtime, nullptr, QuickJSBytecodeBinding::resolve, nullptr);

    for (const auto &module : modules) {
      JSModuleDef *m = taro_js_new_c_module(context, module.c_str(), defaultExport);
      if (!m) {
        throw std::runtime_error("Failed to create module: " + module);
      }
    }

    return context;
  }

  /// @brief
  std::vector<uint8_t> QuickJSBytecodeBinding::compile(
    std::string input, 
    std::string sourceURL,
    std::vector<std::string> modules
  ) {
    JSContext *context = prepare(modules);
    JSValue m = JS_Eval(
      context,
      input.c_str(),
      strlen(input.c_str()),
      sourceURL.c_str(),
      JS_EVAL_FLAG_COMPILE_ONLY | JS_EVAL_TYPE_MODULE
    );

    if (taro_is_exception(m)) {
      auto exception = getEvalException(context, m);
      JS_FreeValue(context, m);
      throw std::runtime_error("Failed to compile module detail: " + exception);
    }

    size_t byteLength;
    uint8_t *bytes = JS_WriteObject(
      context,
      &byteLength,
      m,
      JS_WRITE_OBJ_BYTECODE
    );

    JS_FreeValue(context, m);

    if (!bytes) {
      delete bytes;
      JS_FreeContext(context);
      JS_FreeRuntime(JS_GetRuntime(context));
      throw std::runtime_error("Failed to write bytecode");
    }

    JS_FreeContext(context);
    JS_FreeRuntime(JS_GetRuntime(context));

    return std::vector<uint8_t>(bytes, bytes + byteLength);
  }
}
