# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/iife.ts
**生成时间**: 2025-12-04T06:33:08.271Z

## 大小对比

- TypeScript编译器: 301 字节
- WASM编译器: 270 字节
- 差异: 31 字节 (11.48%)

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
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "iife_var",
      "offset": 38
    },
    {
      "index": 2,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "I am in an IIFE",
      "offset": 47
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 63
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 71
    },
    {
      "index": 5,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "iife_result",
      "offset": 75
    },
    {
      "index": 6,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "Hello ",
      "offset": 87
    },
    {
      "index": 7,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "World",
      "offset": 94
    }
  ],
  "functionHeader": {
    "offset": 100,
    "tag": "0xd",
    "remaining": 201
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

共发现 223 个字节差异:

- 偏移量 0x26: TS=0x10 vs WASM=0x16
- 偏移量 0x2c: TS=0x76 vs WASM=0x72
- 偏移量 0x2d: TS=0x61 vs WASM=0x65
- 偏移量 0x2e: TS=0x72 vs WASM=0x73
- 偏移量 0x2f: TS=0x1e vs WASM=0x75
- 偏移量 0x30: TS=0x49 vs WASM=0x6c
- 偏移量 0x31: TS=0x20 vs WASM=0x74
- 偏移量 0x32: TS=0x61 vs WASM=0x0a
- 偏移量 0x33: TS=0x6d vs WASM=0x57
- 偏移量 0x34: TS=0x20 vs WASM=0x6f
- 偏移量 0x35: TS=0x69 vs WASM=0x72
- 偏移量 0x36: TS=0x6e vs WASM=0x6c
- 偏移量 0x37: TS=0x20 vs WASM=0x64
- 偏移量 0x38: TS=0x61 vs WASM=0x0e
- 偏移量 0x39: TS=0x6e vs WASM=0x63
- 偏移量 0x3a: TS=0x20 vs WASM=0x6f
- 偏移量 0x3b: TS=0x49 vs WASM=0x6e
- 偏移量 0x3c: TS=0x49 vs WASM=0x73
- 偏移量 0x3d: TS=0x46 vs WASM=0x6f
- 偏移量 0x3e: TS=0x45 vs WASM=0x6c
- ... (显示前20个差异，总共223个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 08 46 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..F__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 69 |piler/fixtures/i|
00000020: 69 66 65 2e 6a 73 10 69 69 66 65 5f 76 61 72 1e |ife.js.iife_var.|
00000030: 49 20 61 6d 20 69 6e 20 61 6e 20 49 49 46 45 0e |I am in an IIFE.|
00000040: 63 6f 6e 73 6f 6c 65 06 6c 6f 67 16 69 69 66 65 |console.log.iife|
00000050: 5f 72 65 73 75 6c 74 0c 48 65 6c 6c 6f 20 0a 57 |_result.Hello .W|
00000060: 6f 72 6c 64 0d c8 03 00 00 00 00 00 0c 20 06 01 |orld......... ..|
00000070: a4 01 00 01 00 03 01 02 24 01 d2 03 01 00 20 d2 |........$..... .|
00000080: 03 00 01 08 ec 02 29 c2 00 f0 0e c2 01 04 eb 00 |......).........|
00000090: 00 00 f1 e3 39 e7 00 00 00 43 e8 00 00 00 5a 00 |....9....C....Z.|
000000a0: 00 24 01 00 0e 06 2f c8 03 10 00 00 23 04 00 09 |.$..../.....#...|
000000b0: 08 00 0d 03 1b 0e 1b 0a 11 01 00 0c 43 06 01 00 |............C...|
000000c0: 00 02 00 03 00 00 1e 02 ca 03 01 00 20 e6 01 00 |............ ...|
000000d0: 00 00 0c 03 5b 01 00 04 e6 00 00 00 cb 39 e7 00 |....[........9..|
000000e0: 00 00 43 e8 00 00 00 5a 00 00 24 01 00 0e 06 28 |..C....Z..$....(|
000000f0: c8 03 0a 00 01 22 02 1b 0e 1b 0a 11 01 00 0c 43 |.....".........C|
00000100: 06 01 00 01 01 01 02 00 00 0d 02 70 00 01 00 e6 |...........p....|
00000110: 01 00 00 00 0c 03 5b 00 00 04 ea 00 00 00 d3 9f |......[.........|
00000120: 28 c8 03 08 05 13 1c 02 07 03 07 1f 00          |(............|
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