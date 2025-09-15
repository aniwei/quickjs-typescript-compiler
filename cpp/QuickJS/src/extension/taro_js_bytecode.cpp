#include "QuickJS/extension/taro_js_bytecode.h"

int taro_bc_get_version() {
  return BC_VERSION;
}

int taro_bc_get_binary_version(std::string input) {
  if (input.empty())
    return -1;

  const uint8_t* buf = reinterpret_cast<const uint8_t*>(input.c_str());
  return taro_bc_get_binary_version(buf, input.length());
}

int taro_bc_get_binary_version(const uint8_t* buf, size_t buf_len) {
  if (!buf || buf_len < 1) {
    return -1;
  }

  return buf[0];
}

int taro_bc_get_binary_compatible(std::string input) {
  if (input.empty())
    return -1;

  const uint8_t* buf = reinterpret_cast<const uint8_t*>(input.c_str());
  return taro_bc_get_binary_compatible(buf, input.length());
}

int taro_bc_get_binary_compatible(const uint8_t* buf, size_t buf_len) {
  return taro_bc_get_binary_version(buf, buf_len) == BC_VERSION ? 0 : -1;
}
