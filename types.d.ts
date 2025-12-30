// 强类型占位定义（仅类型层）：被编译器用来触发 i32/u32/i64 收窄/检查。
// 这些类型在运行期仍为 JS number/bigint，仅用于 TS 侧的类型系统约束。

declare type i32 = number & { readonly __brand: 'i32' };
declare type u32 = number & { readonly __brand: 'u32' };
// i63: 与 JS IEEE754 安全整型接近的 63 位有符号整型占位
declare type i63 = number & { readonly __brand: 'i63' };
// i64 使用 bigint 承载
declare type i64 = bigint & { readonly __brand: 'i64' };
// 双精度浮点
declare type f64 = number & { readonly __brand: 'f64' };
// 兼容 double 命名
declare type double = f64;

// 其他可选强类型别名
declare type bool = boolean;
