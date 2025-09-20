#pragma once
#include <emscripten/val.h>
#include <vector>
#include "QuickJS/quickjs.h"

using namespace emscripten;

namespace quickjs {
class QuickJSBytecodeBinding {
  using Ptr = std::shared_ptr<QuickJSBytecodeBinding>;

 public:
  static JSModuleDef*
  resolve(JSContext* context, const char* moduleName, void* opaque);

  QuickJSBytecodeBinding();

  std::vector<uint8_t> compile(
    std::string input,
    std::string sourceURL, 
    std::vector<std::string> modules);

  // Safe overload: compile input to bytecode then return human-readable dump text.
  // This calls taro_js_dump_function_bytecode on the resulting byte buffer.
  std::string dump(
    std::string input,
    std::string sourceURL,
    std::vector<std::string> modules);

  std::string dumpWithBin(
    std::vector<uint8_t> bytes,
    std::vector<std::string> modules);

  JSContext* prepare(std::vector<std::string> modules);

  // Execute a bytecode buffer produced by QuickJS (JS_WRITE_OBJ_BYTECODE format).
  // Returns the stringified result of the evaluated top-level module (if any),
  // or an empty string when no explicit value. Throws on exception with message+stack.
  std::string run(std::vector<uint8_t> bytes, std::vector<std::string> modules);

  // Debug helpers: inspect runtime constants and validate bytecode buffer.
  // Return JS_ATOM_END from the runtime (used as first_atom when allow_bytecode is set).
  static uint32_t getFirstAtom();
  // Try to read a bytecode buffer and return an empty string on success, or an error string
  // containing the failure position and message when parsing fails.
  static std::string validate(std::vector<uint8_t> bytes);
};
} // namespace quickjs
