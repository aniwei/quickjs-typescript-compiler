#pragma once
#include <emscripten/val.h>
#include <vector>
#include <map>
#include "QuickJS/quickjs.h"

using namespace emscripten;

namespace quickjs {

enum CompileFlags {
  COMPILE_FLAG_NONE = 0,
  COMPILE_FLAG_DUMP = 1 << 0,
  COMPILE_FLAG_BIGNUM = 1 << 1,
  COMPILE_FLAG_SHORT_OPCODES = 1 << 2,
};

struct Op {
  uint32_t id;
  std::string name;
  uint8_t nPop;
  uint8_t nPush;
  uint8_t fmt;
  uint8_t size;
};

struct Atom {
  uint32_t id;
  std::string name;
};

struct OpFmt {
  uint8_t id;
  std::string name;
};

struct BytecodeTag {
  uint32_t id;
  std::string name;
};

class QuickJSBinding {
  using Ptr = std::shared_ptr<QuickJSBinding>;

 public:
  QuickJSBinding();

  static JSModuleDef* resolve(
    JSContext* context, 
    const char* moduleName, 
    void* opaque);

 private:
  static JSContext* prepare(
    std::vector<std::string> modules);
  
 public:
  static std::vector<uint8_t> compile(
    std::string input,
    std::string sourceURL, 
    std::vector<std::string> modules);

  static uint32_t getBytecodeVersion();
  static uint32_t getCompileOptions();
  static uint32_t getFirstAtomId();

  static std::vector<BytecodeTag> getBytecodeTags();

  static std::vector<Atom> getAtoms();
  static std::vector<OpFmt> getOpcodeFormats();
  static std::vector<Op> getOpcodes();

  static std::string dumpWithBinary(
    std::vector<uint8_t> bytes,
    std::vector<std::string> modules);

  static std::string runWithBinary(
    std::vector<uint8_t> bytes, 
    std::vector<std::string> modules);
};
} // namespace quickjs
