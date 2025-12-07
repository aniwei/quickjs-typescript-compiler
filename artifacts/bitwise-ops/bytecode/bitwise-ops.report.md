# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/bitwise-ops.ts
**生成时间**: 2025-12-07T19:06:52.547Z

## 大小对比

- TypeScript编译器: 239 字节
- WASM编译器: 239 字节
- 差异: 0 字节 (0.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 3,
  "atoms": [
    {
      "index": 0,
      "rawLength": 84,
      "actualLength": 42,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/bitwise-ops.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 45
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 53
    }
  ],
  "functionHeader": {
    "offset": 57,
    "tag": "0xd",
    "remaining": 182
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 3,
  "atoms": [
    {
      "index": 0,
      "rawLength": 84,
      "actualLength": 42,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/bitwise-ops.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 45
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 53
    }
  ],
  "functionHeader": {
    "offset": 57,
    "tag": "0xd",
    "remaining": 182
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 03 54 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..T__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 62 |piler/fixtures/b|
00000020: 69 74 77 69 73 65 2d 6f 70 73 2e 6a 73 0e 63 6f |itwise-ops.js.co|
00000030: 6e 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 00 00 00 |nsole.log.......|
00000040: 00 0c 20 06 01 a4 01 00 00 00 04 00 00 6c 00 08 |.. ..........l..|
00000050: ec 02 29 39 e5 00 00 00 43 e6 00 00 00 b8 b9 af |..)9....C.......|
00000060: 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 00 b8 b9 |$...9....C......|
00000070: b1 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 00 b8 |.$...9....C.....|
00000080: b9 b0 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 00 |..$...9....C....|
00000090: b8 b9 a2 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 |...$...9....C...|
000000a0: 00 b8 b9 a3 24 01 00 0e 39 e5 00 00 00 43 e6 00 |....$...9....C..|
000000b0: 00 00 b8 b9 a4 24 01 00 0e 06 2f c8 03 30 00 00 |.....$..../..0..|
000000c0: 2f 0e 25 0e 07 05 17 15 1b 0e 25 0e 07 05 17 15 |/.%.......%.....|
000000d0: 1b 0e 25 0e 07 05 17 15 1b 0e 25 0e 07 05 17 15 |..%.......%.....|
000000e0: 1b 0e 25 0e 07 05 17 15 1b 0e 25 0e 07 05 00    |..%.......%....|
```

### WASM
```
00000000: 05 03 54 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..T__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 62 |piler/fixtures/b|
00000020: 69 74 77 69 73 65 2d 6f 70 73 2e 6a 73 0e 63 6f |itwise-ops.js.co|
00000030: 6e 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 00 00 00 |nsole.log.......|
00000040: 00 0c 20 06 01 a4 01 00 00 00 04 00 00 6c 00 08 |.. ..........l..|
00000050: ec 02 29 39 e5 00 00 00 43 e6 00 00 00 b8 b9 af |..)9....C.......|
00000060: 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 00 b8 b9 |$...9....C......|
00000070: b1 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 00 b8 |.$...9....C.....|
00000080: b9 b0 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 00 |..$...9....C....|
00000090: b8 b9 a2 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 |...$...9....C...|
000000a0: 00 b8 b9 a3 24 01 00 0e 39 e5 00 00 00 43 e6 00 |....$...9....C..|
000000b0: 00 00 b8 b9 a4 24 01 00 0e 06 2f c8 03 30 00 00 |.....$..../..0..|
000000c0: 2f 0e 25 0e 07 05 17 15 1b 0e 25 0e 07 05 17 15 |/.%.......%.....|
000000d0: 1b 0e 25 0e 07 05 17 15 1b 0e 25 0e 07 05 17 15 |..%.......%.....|
000000e0: 1b 0e 25 0e 07 05 17 15 1b 0e 25 0e 07 05 00    |..%.......%....|
```