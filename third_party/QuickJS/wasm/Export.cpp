#include <emscripten/bind.h>
#include <string>
#include "QuickJS/extension/taro_js_bytecode.h"
#include "Export.h"

using namespace emscripten;
using namespace quickjs;

EMSCRIPTEN_BINDINGS(quickjs_wasm) {
  register_vector<uint8_t>("Uint8Array");
  register_vector<std::string>("StringArray");
  register_vector<Op>("OpArray");
  register_vector<Atom>("AtomArray");
  register_vector<OpFormat>("OpFormatArray");

  enum_<CompiledFlags>("CompiledFlags")
    .value("COMPILED_FLAG_NONE", COMPILED_FLAG_NONE)
    .value("COMPILED_FLAG_DUMP", COMPILED_FLAG_DUMP)
    .value("COMPILED_FLAG_BIGNUM", COMPILED_FLAG_BIGNUM);

  class_<Op>("Op")
    .constructor<>()
    .property("id", &Op::id)
    .property("name", &Op::name)
    .property("nPop", &Op::nPop)
    .property("nPush", &Op::nPush)
    .property("fmt", &Op::fmt);
  

  class_<Atom>("Atom")
    .constructor<>()
    .property("id", &Atom::id)
    .property("name", &Atom::name);
  
  class_<OpFormat>("OpFormat")
    .constructor<>()
    .property("id", &OpFormat::id)
    .property("name", &OpFormat::name);




  class_<QuickJSBinding>("QuickJSBinding")
    .constructor<>()
    .class_function("compile", &QuickJSBinding::compile)
    .class_function("dumpWithBinary", &QuickJSBinding::dumpWithBinary)
    .class_function("runWithBinary", &QuickJSBinding::runWithBinary)
    .class_function("getBytecodeVersion", &QuickJSBinding::getBytecodeVersion)
    .class_function("getCompileOptions", &QuickJSBinding::getCompileOptions)
    .class_function("getFirstAtomId", &QuickJSBinding::getFirstAtomId)
    .class_function("getAtoms", &QuickJSBinding::getAtoms)
    .class_function("getOpcodeFormats", &QuickJSBinding::getOpcodeFormats)
    .class_function("getOpcodes", &QuickJSBinding::getOpcodes)
    .smart_ptr<std::shared_ptr<QuickJSBinding>>("shared_ptr<QuickJSBinding>");
}
