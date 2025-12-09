# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/comparison-ops.ts
**生成时间**: 2025-12-09T08:59:51.445Z

## 大小对比

- TypeScript编译器: 296 字节
- WASM编译器: 293 字节
- 差异: 3 字节 (1.02%)

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
      "rawLength": 90,
      "actualLength": 45,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/comparison-ops.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 48
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 56
    }
  ],
  "functionHeader": {
    "offset": 60,
    "tag": "0xd",
    "remaining": 236
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
      "rawLength": 90,
      "actualLength": 45,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/comparison-ops.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 48
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 56
    }
  ],
  "functionHeader": {
    "offset": 60,
    "tag": "0xd",
    "remaining": 233
  }
}
```

## 字节级差异

共发现 197 个字节差异:

- 偏移量 0x50: TS=0x91 vs WASM=0x8e
- 偏移量 0x54: TS=0x6c vs WASM=0xec
- 偏移量 0x55: TS=0x8d vs WASM=0x02
- 偏移量 0x56: TS=0x00 vs WASM=0x29
- 偏移量 0x57: TS=0x00 vs WASM=0x39
- 偏移量 0x58: TS=0x00 vs WASM=0xe5
- 偏移量 0x59: TS=0x39 vs WASM=0x00
- 偏移量 0x5a: TS=0xe5 vs WASM=0x00
- 偏移量 0x5c: TS=0x00 vs WASM=0x43
- 偏移量 0x5d: TS=0x00 vs WASM=0xe6
- 偏移量 0x5e: TS=0x43 vs WASM=0x00
- 偏移量 0x5f: TS=0xe6 vs WASM=0x00
- 偏移量 0x61: TS=0x00 vs WASM=0xb8
- 偏移量 0x62: TS=0x00 vs WASM=0xb9
- 偏移量 0x63: TS=0xb8 vs WASM=0xa5
- 偏移量 0x64: TS=0xb9 vs WASM=0x24
- 偏移量 0x65: TS=0xa5 vs WASM=0x01
- 偏移量 0x66: TS=0x24 vs WASM=0x00
- 偏移量 0x67: TS=0x01 vs WASM=0x0e
- 偏移量 0x68: TS=0x00 vs WASM=0x39
- ... (显示前20个差异，总共197个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 03 5a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..Z__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6f 6d 70 61 72 69 73 6f 6e 2d 6f 70 73 2e 6a 73 |omparison-ops.js|
00000030: 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 |.console.log....|
00000040: 00 00 00 00 0c 20 06 01 a4 01 00 00 00 04 00 00 |..... ..........|
00000050: 91 01 00 08 6c 8d 00 00 00 39 e5 00 00 00 43 e6 |....l....9....C.|
00000060: 00 00 00 b8 b9 a5 24 01 00 0e 39 e5 00 00 00 43 |......$...9....C|
00000070: e6 00 00 00 b8 b9 a7 24 01 00 0e 39 e5 00 00 00 |.......$...9....|
00000080: 43 e6 00 00 00 b8 b9 a6 24 01 00 0e 39 e5 00 00 |C.......$...9...|
00000090: 00 43 e6 00 00 00 b8 b9 a8 24 01 00 0e 39 e5 00 |.C.......$...9..|
000000a0: 00 00 43 e6 00 00 00 b8 b9 ab 24 01 00 0e 39 e5 |..C.......$...9.|
000000b0: 00 00 00 43 e6 00 00 00 b8 b9 ac 24 01 00 0e 39 |...C.......$...9|
000000c0: e5 00 00 00 43 e6 00 00 00 b8 b9 ad 24 01 00 0e |....C.......$...|
000000d0: 39 e5 00 00 00 43 e6 00 00 00 b8 b9 ae 24 01 00 |9....C.......$..|
000000e0: 0e 29 06 2f c8 03 40 00 00 39 0e 25 0e 07 05 17 |.)./..@..9.%....|
000000f0: 15 1b 0e 25 0e 07 05 17 15 1b 0e 25 0e 07 05 17 |...%.......%....|
00000100: 15 1b 0e 25 0e 07 05 17 15 1b 0e 25 0e 07 05 17 |...%.......%....|
00000110: 15 1b 0e 25 0e 07 05 17 15 1b 0e 25 0e 07 05 17 |...%.......%....|
00000120: 15 1b 0e 25 0e 07 05 00                         |...%....|
```

### WASM
```
00000000: 05 03 5a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..Z__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6f 6d 70 61 72 69 73 6f 6e 2d 6f 70 73 2e 6a 73 |omparison-ops.js|
00000030: 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 |.console.log....|
00000040: 00 00 00 00 0c 20 06 01 a4 01 00 00 00 04 00 00 |..... ..........|
00000050: 8e 01 00 08 ec 02 29 39 e5 00 00 00 43 e6 00 00 |......)9....C...|
00000060: 00 b8 b9 a5 24 01 00 0e 39 e5 00 00 00 43 e6 00 |....$...9....C..|
00000070: 00 00 b8 b9 a7 24 01 00 0e 39 e5 00 00 00 43 e6 |.....$...9....C.|
00000080: 00 00 00 b8 b9 a6 24 01 00 0e 39 e5 00 00 00 43 |......$...9....C|
00000090: e6 00 00 00 b8 b9 a8 24 01 00 0e 39 e5 00 00 00 |.......$...9....|
000000a0: 43 e6 00 00 00 b8 b9 ab 24 01 00 0e 39 e5 00 00 |C.......$...9...|
000000b0: 00 43 e6 00 00 00 b8 b9 ac 24 01 00 0e 39 e5 00 |.C.......$...9..|
000000c0: 00 00 43 e6 00 00 00 b8 b9 ad 24 01 00 0e 39 e5 |..C.......$...9.|
000000d0: 00 00 00 43 e6 00 00 00 b8 b9 ae 24 01 00 0e 06 |...C.......$....|
000000e0: 2f c8 03 40 00 00 2f 0e 25 0e 07 05 17 15 1b 0e |/..@../.%.......|
000000f0: 25 0e 07 05 17 15 1b 0e 25 0e 07 05 17 15 1b 0e |%.......%.......|
00000100: 25 0e 07 05 17 15 1b 0e 25 0e 07 05 17 15 1b 0e |%.......%.......|
00000110: 25 0e 07 05 17 15 1b 0e 25 0e 07 05 17 15 1b 0e |%.......%.......|
00000120: 25 0e 07 05 00                                  |%....|
```