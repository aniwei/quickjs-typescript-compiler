#include <emscripten/bind.h>
#include <string>
#include "QuickJS/extension/taro_js_bytecode.h"
#include "Export.h"

using namespace emscripten;
using namespace quickjs;

EMSCRIPTEN_BINDINGS(quickjs_wasm) {
  register_vector<uint8_t>("Uint8Array");
  register_vector<std::string>("StringArray");
  register_map<std::string, uint32_t>("StringUint32");

  class_<QuickJSBinding>("QuickJSBinding")
    .constructor<>()
    .class_function("compile", &QuickJSBinding::compile)
    .class_function("dumpWithBinary", &QuickJSBinding::dumpWithBinary)
    .class_function("runWithBinary", &QuickJSBinding::runWithBinary)
    .class_function("getBytecodeVersion", &QuickJSBinding::getBytecodeVersion)
    .class_function("getCompileOptions", &QuickJSBinding::getCompileOptions)
    .class_function("getFirstAtomId", &QuickJSBinding::getFirstAtomId)
    .class_function("getAtomMap", &QuickJSBinding::getAtomMap)
    .class_function("getOpcodeMap", &QuickJSBinding::getOpcodeMap)
    .smart_ptr<std::shared_ptr<QuickJSBinding>>("shared_ptr<QuickJSBinding>");
}
