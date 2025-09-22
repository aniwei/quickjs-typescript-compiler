#pragma once
#include <emscripten/val.h>
#include <vector>
#include <map>
#include "QuickJS/quickjs.h"

using namespace emscripten;

namespace quickjs {
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

  static std::map<std::string, bool> getCompileOptions();

  static uint32_t getFirstAtomId();

  static std::map<std::string, uint32_t> getAllAtomIds();

  static std::map<std::string, uint32_t> getAllOpcodeIds();

  static std::string dumpWithBinary(
    std::vector<uint8_t> bytes,
    std::vector<std::string> modules);

  static std::string runWithBinary(
    std::vector<uint8_t> bytes, 
    std::vector<std::string> modules);
};
} // namespace quickjs
