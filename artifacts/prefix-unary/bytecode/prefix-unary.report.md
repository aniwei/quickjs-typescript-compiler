# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/prefix-unary.ts
**生成时间**: 2025-12-09T08:59:51.566Z

## 大小对比

- TypeScript编译器: 189 字节
- WASM编译器: 189 字节
- 差异: 0 字节 (0.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 4,
  "atoms": [
    {
      "index": 0,
      "rawLength": 86,
      "actualLength": 43,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/prefix-unary.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 46
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 48
    },
    {
      "index": 3,
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
    "remaining": 129
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 4,
  "atoms": [
    {
      "index": 0,
      "rawLength": 86,
      "actualLength": 43,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/prefix-unary.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 46
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 48
    },
    {
      "index": 3,
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
    "remaining": 129
  }
}
```

## 字节级差异

共发现 49 个字节差异:

- 偏移量 0x58: TS=0x41 vs WASM=0x02
- 偏移量 0x59: TS=0xb8 vs WASM=0x29
- 偏移量 0x5a: TS=0xe3 vs WASM=0xb8
- 偏移量 0x5b: TS=0x39 vs WASM=0xe3
- 偏移量 0x5c: TS=0xe6 vs WASM=0x39
- 偏移量 0x5d: TS=0x00 vs WASM=0xe6
- 偏移量 0x60: TS=0x43 vs WASM=0x00
- 偏移量 0x61: TS=0xe7 vs WASM=0x43
- 偏移量 0x62: TS=0x00 vs WASM=0xe7
- 偏移量 0x65: TS=0x68 vs WASM=0x00
- 偏移量 0x66: TS=0x00 vs WASM=0x68
- 偏移量 0x68: TS=0x91 vs WASM=0x00
- 偏移量 0x69: TS=0x11 vs WASM=0x91
- 偏移量 0x6a: TS=0x69 vs WASM=0x11
- 偏移量 0x6b: TS=0x00 vs WASM=0x69
- 偏移量 0x6d: TS=0x24 vs WASM=0x00
- 偏移量 0x6e: TS=0x01 vs WASM=0x24
- 偏移量 0x6f: TS=0x00 vs WASM=0x01
- 偏移量 0x70: TS=0x0e vs WASM=0x00
- 偏移量 0x71: TS=0x39 vs WASM=0x0e
- ... (显示前20个差异，总共49个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 04 56 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..V__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 70 |piler/fixtures/p|
00000020: 72 65 66 69 78 2d 75 6e 61 72 79 2e 6a 73 02 61 |refix-unary.js.a|
00000030: 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 |.console.log....|
00000040: 00 00 00 00 0c 20 06 01 a4 01 00 00 00 04 01 00 |..... ..........|
00000050: 45 00 ca 03 00 09 08 ec 41 b8 e3 39 e6 00 00 00 |E.......A..9....|
00000060: 43 e7 00 00 00 68 00 00 91 11 69 00 00 24 01 00 |C....h....i..$..|
00000070: 0e 39 e6 00 00 00 43 e7 00 00 00 68 00 00 90 11 |.9....C....h....|
00000080: 69 00 00 24 01 00 0e 39 e6 00 00 00 43 e7 00 00 |i..$...9....C...|
00000090: 00 68 00 00 24 01 00 0e 29 06 2f c8 03 1e 00 00 |.h..$...)./.....|
000000a0: 1c 00 1b 0e 1b 0e 11 03 1b 01 17 15 1b 0e 1b 0e |................|
000000b0: 11 03 1b 01 17 15 1b 0e 1b 0a 11 01 00          |.............|
```

### WASM
```
00000000: 05 04 56 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..V__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 70 |piler/fixtures/p|
00000020: 72 65 66 69 78 2d 75 6e 61 72 79 2e 6a 73 02 61 |refix-unary.js.a|
00000030: 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 |.console.log....|
00000040: 00 00 00 00 0c 20 06 01 a4 01 00 00 00 04 01 00 |..... ..........|
00000050: 45 00 ca 03 00 09 08 ec 02 29 b8 e3 39 e6 00 00 |E........)..9...|
00000060: 00 43 e7 00 00 00 68 00 00 91 11 69 00 00 24 01 |.C....h....i..$.|
00000070: 00 0e 39 e6 00 00 00 43 e7 00 00 00 68 00 00 90 |..9....C....h...|
00000080: 11 69 00 00 24 01 00 0e 39 e6 00 00 00 43 e7 00 |.i..$...9....C..|
00000090: 00 00 68 00 00 24 01 00 0e 06 2f c8 03 1e 00 00 |..h..$..../.....|
000000a0: 21 00 1b 0e 1b 0e 11 03 1b 01 17 15 1b 0e 1b 0e |!...............|
000000b0: 11 03 1b 01 17 15 1b 0e 1b 0a 11 01 00          |.............|
```