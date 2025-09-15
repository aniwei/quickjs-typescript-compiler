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

  JSContext* prepare(std::vector<std::string> modules);
};
} // namespace quickjs
