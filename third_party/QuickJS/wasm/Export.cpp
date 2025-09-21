#include <emscripten/bind.h>
#include <string>
#include "QuickJS/extension/taro_js_bytecode.h"
#include "Export.h"

using namespace emscripten;
using namespace quickjs;

EMSCRIPTEN_BINDINGS(quickjs_wasm) {
  register_vector<uint8_t>("Uint8Array");
  register_vector<std::string>("StringArray");

  class_<QuickJSBinding>("QuickJSBinding")
    .constructor<>()
    .class_function("compile", &QuickJSBinding::compile)
    .class_function("dump", &QuickJSBinding::dump)
    .class_function("dumpWithBinary", &QuickJSBinding::dumpWithBinary)
    .class_function("runWithBinary", &QuickJSBinding::runWithBinary)
    .class_function("getBytecodeVersion", &QuickJSBinding::getBytecodeVersion)
    .class_function("getCompileOptions", &QuickJSBinding::getCompileOptions)
    .smart_ptr<std::shared_ptr<QuickJSBinding>>("shared_ptr<QuickJSBinding>");
}
