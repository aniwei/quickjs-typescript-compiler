export function u32ToI32(u32: number): number {
  // QuickJS 中常用的 u32 -> i32 解码逻辑（例如：read32le + (int32_t)cast）。
  // 这里保持与现有实现一致，避免引入 JS 位运算差异。
  return u32 > 0x7fffffff ? u32 - 0x100000000 : u32
}
