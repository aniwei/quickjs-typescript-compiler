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
  register_vector<OpFmt>("OpFormatArray");
  register_vector<BytecodeTag>("BytecodeTagArray");
  register_vector<FunctionKind>("FunctionKindArray");
  register_vector<JSMode>("JSModeArray");

  enum_<CompileFlags>("CompileFlags")
    .value("COMPILE_FLAG_NONE", COMPILE_FLAG_NONE)
    .value("COMPILE_FLAG_DUMP", COMPILE_FLAG_DUMP)
    .value("COMPILE_FLAG_BIGNUM", COMPILE_FLAG_BIGNUM)
    .value("COMPILE_FLAG_SHORT_OPCODES", COMPILE_FLAG_SHORT_OPCODES);

  class_<Op>("Op")
    .constructor<>()
    .property("id", &Op::id)
    .property("name", &Op::name)
    .property("nPop", &Op::nPop)
    .property("nPush", &Op::nPush)
    .property("fmt", &Op::fmt)
    .property("size", &Op::size);
  

  class_<Atom>("Atom")
    .constructor<>()
    .property("id", &Atom::id)
    .property("name", &Atom::name);
  
  class_<OpFmt>("OpFmt")
    .constructor<>()
    .property("id", &OpFmt::id)
    .property("name", &OpFmt::name);


  class_<BytecodeTag>("BytecodeTag")
    .constructor<>()
    .property("id", &BytecodeTag::id)
    .property("name", &BytecodeTag::name);

  class_<FunctionKind>("FunctionKind")
    .constructor<>()
    .property("id", &FunctionKind::id)
    .property("name", &FunctionKind::name);

  class_<JSMode>("JSMode")
    .constructor<>()
    .property("id", &JSMode::id)
    .property("name", &JSMode::name);

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
    .class_function("getBytecodeTags", &QuickJSBinding::getBytecodeTags)
    .class_function("getFunctionKinds", &QuickJSBinding::getFunctionKinds)
    .class_function("getJSModes", &QuickJSBinding::getJSModes)
    .smart_ptr<std::shared_ptr<QuickJSBinding>>("shared_ptr<QuickJSBinding>");
}
