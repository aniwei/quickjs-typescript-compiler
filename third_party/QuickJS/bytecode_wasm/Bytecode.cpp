#include <emscripten/bind.h>
#include <string>
#include "QuickJS/extension/taro_js_bytecode.h"
#include "QuickJSBytecodeBinding.h"

using namespace emscripten;
using namespace quickjs;

EMSCRIPTEN_BINDINGS(quickjs_bytecode_wasm) {
  register_vector<uint8_t>("Uint8Array");
  register_vector<std::string>("StringArray");

  class_<QuickJSBytecodeBinding>("QuickJSBytecode")
    .constructor<>()
    .function("compile", &QuickJSBytecodeBinding::compile)
    .function("dump", &QuickJSBytecodeBinding::dump)
    .smart_ptr<std::shared_ptr<QuickJSBytecodeBinding>>("shared_ptr<QuickJSBytecodeBinding>");

  emscripten::function(
    "taro_js_bc_get_version", 
    &taro_bc_get_version);

  emscripten::function(
    "taro_js_bc_get_binary_version",
    emscripten::optional_override([](std::string input) {
      return taro_bc_get_binary_version(input);
    }));

  emscripten::function(
    "taro_js_bc_get_binary_compatible",
    emscripten::optional_override([](std::string input) {
      return taro_bc_get_binary_compatible(input);
    }));
}
