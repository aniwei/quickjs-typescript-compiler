# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/bitwise-ops.ts
**生成时间**: 2025-12-09T08:59:51.369Z

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

共发现 81 个字节差异:

- 偏移量 0x51: TS=0x68 vs WASM=0x02
- 偏移量 0x52: TS=0x39 vs WASM=0x29
- 偏移量 0x53: TS=0xe5 vs WASM=0x39
- 偏移量 0x54: TS=0x00 vs WASM=0xe5
- 偏移量 0x57: TS=0x43 vs WASM=0x00
- 偏移量 0x58: TS=0xe6 vs WASM=0x43
- 偏移量 0x59: TS=0x00 vs WASM=0xe6
- 偏移量 0x5c: TS=0xb8 vs WASM=0x00
- 偏移量 0x5d: TS=0xb9 vs WASM=0xb8
- 偏移量 0x5e: TS=0xaf vs WASM=0xb9
- 偏移量 0x5f: TS=0x24 vs WASM=0xaf
- 偏移量 0x60: TS=0x01 vs WASM=0x24
- 偏移量 0x61: TS=0x00 vs WASM=0x01
- 偏移量 0x62: TS=0x0e vs WASM=0x00
- 偏移量 0x63: TS=0x39 vs WASM=0x0e
- 偏移量 0x64: TS=0xe5 vs WASM=0x39
- 偏移量 0x65: TS=0x00 vs WASM=0xe5
- 偏移量 0x68: TS=0x43 vs WASM=0x00
- 偏移量 0x69: TS=0xe6 vs WASM=0x43
- 偏移量 0x6a: TS=0x00 vs WASM=0xe6
- ... (显示前20个差异，总共81个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 03 54 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..T__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 62 |piler/fixtures/b|
00000020: 69 74 77 69 73 65 2d 6f 70 73 2e 6a 73 0e 63 6f |itwise-ops.js.co|
00000030: 6e 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 00 00 00 |nsole.log.......|
00000040: 00 0c 20 06 01 a4 01 00 00 00 04 00 00 6c 00 08 |.. ..........l..|
00000050: ec 68 39 e5 00 00 00 43 e6 00 00 00 b8 b9 af 24 |.h9....C.......$|
00000060: 01 00 0e 39 e5 00 00 00 43 e6 00 00 00 b8 b9 b1 |...9....C.......|
00000070: 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 00 b8 b9 |$...9....C......|
00000080: b0 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 00 b8 |.$...9....C.....|
00000090: b9 a2 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 00 |..$...9....C....|
000000a0: b8 b9 a3 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 |...$...9....C...|
000000b0: 00 b8 b9 a4 24 01 00 0e 29 06 2f c8 03 30 00 00 |....$...)./..0..|
000000c0: 2a 0e 25 0e 07 05 17 15 1b 0e 25 0e 07 05 17 15 |*.%.......%.....|
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