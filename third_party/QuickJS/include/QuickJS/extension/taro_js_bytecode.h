#pragma once

#include <cstdint>
#include <string>

#ifdef CONFIG_BIGNUM
#define BC_VERSION 0x45
#else
#define BC_VERSION 5
#endif

int taro_bc_get_version();

#ifdef __cplusplus
int taro_bc_get_binary_version(std::string input);
int taro_bc_get_binary_version(const uint8_t* buf, size_t buf_len);

int taro_bc_get_binary_compatible(std::string input);
int taro_bc_get_binary_compatible(const uint8_t* buf, size_t buf_len);

#ifdef DUMP_BYTECODE
// Return a human-readable disassembly text for the given QuickJS bytecode buffer.
std::string taro_js_dump_function_bytecode_bin(const uint8_t* buf, size_t buf_len);
#endif // DUMP_BYTECODE
#endif // __cplusplus
