# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/iife.ts
**生成时间**: 2025-12-06T02:09:56.391Z

## 大小对比

- TypeScript编译器: 261 字节
- WASM编译器: 270 字节
- 差异: -9 字节 (-3.33%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 8,
  "atoms": [
    {
      "index": 0,
      "rawLength": 70,
      "actualLength": 35,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/iife.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "iife_result",
      "offset": 38
    },
    {
      "index": 2,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "World",
      "offset": 50
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 56
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 64
    },
    {
      "index": 5,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "iife_var",
      "offset": 68
    },
    {
      "index": 6,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "I am in an IIFE",
      "offset": 77
    },
    {
      "index": 7,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "Hello ",
      "offset": 93
    }
  ],
  "functionHeader": {
    "offset": 100,
    "tag": "0xd",
    "remaining": 161
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 8,
  "atoms": [
    {
      "index": 0,
      "rawLength": 70,
      "actualLength": 35,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/iife.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "iife_result",
      "offset": 38
    },
    {
      "index": 2,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "World",
      "offset": 50
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 56
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 64
    },
    {
      "index": 5,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "iife_var",
      "offset": 68
    },
    {
      "index": 6,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "I am in an IIFE",
      "offset": 77
    },
    {
      "index": 7,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "Hello ",
      "offset": 93
    }
  ],
  "functionHeader": {
    "offset": 100,
    "tag": "0xd",
    "remaining": 170
  }
}
```

## 字节级差异

共发现 89 个字节差异:

- 偏移量 0xa2: TS=0x00 vs WASM=0x10
- 偏移量 0xa3: TS=0x0a vs WASM=0x00
- 偏移量 0xa4: TS=0x16 vs WASM=0x00
- 偏移量 0xa5: TS=0x01 vs WASM=0x23
- 偏移量 0xa6: TS=0x00 vs WASM=0x04
- 偏移量 0xa7: TS=0x04 vs WASM=0x00
- 偏移量 0xa8: TS=0x05 vs WASM=0x09
- 偏移量 0xa9: TS=0x12 vs WASM=0x08
- 偏移量 0xaa: TS=0x0e vs WASM=0x00
- 偏移量 0xab: TS=0x70 vs WASM=0x0d
- 偏移量 0xac: TS=0x26 vs WASM=0x03
- 偏移量 0xad: TS=0x7d vs WASM=0x1b
- 偏移量 0xae: TS=0x00 vs WASM=0x0e
- 偏移量 0xaf: TS=0x0c vs WASM=0x1b
- 偏移量 0xb0: TS=0x42 vs WASM=0x0a
- 偏移量 0xb1: TS=0x06 vs WASM=0x07
- 偏移量 0xb2: TS=0x00 vs WASM=0x01
- 偏移量 0xb4: TS=0x00 vs WASM=0x0c
- 偏移量 0xb5: TS=0x01 vs WASM=0x43
- 偏移量 0xb6: TS=0x00 vs WASM=0x06
- ... (显示前20个差异，总共89个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 08 46 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..F__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 69 |piler/fixtures/i|
00000020: 69 66 65 2e 6a 73 16 69 69 66 65 5f 72 65 73 75 |ife.js.iife_resu|
00000030: 6c 74 0a 57 6f 72 6c 64 0e 63 6f 6e 73 6f 6c 65 |lt.World.console|
00000040: 06 6c 6f 67 10 69 69 66 65 5f 76 61 72 1e 49 20 |.log.iife_var.I |
00000050: 61 6d 20 69 6e 20 61 6e 20 49 49 46 45 0c 48 65 |am in an IIFE.He|
00000060: 6c 6c 6f 20 0d c8 03 00 00 00 00 00 0c 20 06 01 |llo ......... ..|
00000070: a4 01 00 00 00 03 01 02 22 00 ca 03 00 01 08 ec |........".......|
00000080: 02 29 c2 00 f0 0e c2 01 04 e6 00 00 00 f1 e3 39 |.).............9|
00000090: e7 00 00 00 43 e8 00 00 00 df 24 01 00 0e 06 2f |....C.....$..../|
000000a0: c8 03 00 0a 16 01 00 04 05 12 0e 70 26 7d 00 0c |...........p&}..|
000000b0: 42 06 00 00 00 01 00 03 00 00 16 01 d2 03 00 01 |B...............|
000000c0: 00 04 ea 00 00 00 cb 39 e7 00 00 00 43 e8 00 00 |.......9....C...|
000000d0: 00 c7 24 01 00 0e 29 c8 03 00 06 03 10 21 71 34 |..$...)......!q4|
000000e0: 0c 00 0c 42 06 00 00 01 00 01 03 00 00 09 01 70 |...B...........p|
000000f0: 00 00 00 04 eb 00 00 00 d3 9f 28 29 c8 03 05 04 |..........()....|
00000100: 03 76 1b 0b 00                                  |.v...|
```

### WASM
```
00000000: 05 08 46 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..F__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 69 |piler/fixtures/i|
00000020: 69 66 65 2e 6a 73 16 69 69 66 65 5f 72 65 73 75 |ife.js.iife_resu|
00000030: 6c 74 0a 57 6f 72 6c 64 0e 63 6f 6e 73 6f 6c 65 |lt.World.console|
00000040: 06 6c 6f 67 10 69 69 66 65 5f 76 61 72 1e 49 20 |.log.iife_var.I |
00000050: 61 6d 20 69 6e 20 61 6e 20 49 49 46 45 0c 48 65 |am in an IIFE.He|
00000060: 6c 6c 6f 20 0d c8 03 00 00 00 00 00 0c 20 06 01 |llo ......... ..|
00000070: a4 01 00 00 00 03 01 02 22 00 ca 03 00 01 08 ec |........".......|
00000080: 02 29 c2 00 f0 0e c2 01 04 e6 00 00 00 f1 e3 39 |.).............9|
00000090: e7 00 00 00 43 e8 00 00 00 df 24 01 00 0e 06 2f |....C.....$..../|
000000a0: c8 03 10 00 00 23 04 00 09 08 00 0d 03 1b 0e 1b |.....#..........|
000000b0: 0a 07 01 00 0c 43 06 01 00 00 01 00 03 00 00 15 |.....C..........|
000000c0: 01 d2 03 00 00 00 04 ea 00 00 00 cb 39 e7 00 00 |............9...|
000000d0: 00 43 e8 00 00 00 c7 24 01 00 29 c8 03 0a 00 01 |.C.....$..).....|
000000e0: 22 02 1b 0e 1b 0a 07 01 00 0c 43 06 01 00 01 00 |".........C.....|
000000f0: 01 02 00 00 08 01 70 00 01 00 04 eb 00 00 00 d3 |......p.........|
00000100: 9f 28 c8 03 08 05 13 1c 02 07 03 07 1f 00       |.(............|
```