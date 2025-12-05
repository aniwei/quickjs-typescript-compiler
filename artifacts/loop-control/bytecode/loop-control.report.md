# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/loop-control.ts
**生成时间**: 2025-12-05T12:54:24.076Z

## 大小对比

- TypeScript编译器: 266 字节
- WASM编译器: 175 字节
- 差异: 91 字节 (52.00%)

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
      "rawLength": 222,
      "actualLength": 111,
      "isWideChar": 0,
      "string": "/Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/loop-control.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 115
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 117
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 125
    }
  ],
  "functionHeader": {
    "offset": 129,
    "tag": "0xd",
    "remaining": 137
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
      "string": "__tests__/compiler/fixtures/loop-control.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
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
    "remaining": 115
  }
}
```

## 字节级差异

共发现 256 个字节差异:

- 偏移量 0x2: TS=0xde vs WASM=0x56
- 偏移量 0x3: TS=0x01 vs WASM=0x5f
- 偏移量 0x4: TS=0x2f vs WASM=0x5f
- 偏移量 0x5: TS=0x55 vs WASM=0x74
- 偏移量 0x6: TS=0x73 vs WASM=0x65
- 偏移量 0x7: TS=0x65 vs WASM=0x73
- 偏移量 0x8: TS=0x72 vs WASM=0x74
- 偏移量 0xa: TS=0x2f vs WASM=0x5f
- 偏移量 0xb: TS=0x61 vs WASM=0x5f
- 偏移量 0xc: TS=0x6e vs WASM=0x2f
- 偏移量 0xd: TS=0x69 vs WASM=0x63
- 偏移量 0xe: TS=0x77 vs WASM=0x6f
- 偏移量 0xf: TS=0x65 vs WASM=0x6d
- 偏移量 0x10: TS=0x69 vs WASM=0x70
- 偏移量 0x11: TS=0x2f vs WASM=0x69
- 偏移量 0x12: TS=0x44 vs WASM=0x6c
- 偏移量 0x14: TS=0x73 vs WASM=0x72
- 偏移量 0x15: TS=0x6b vs WASM=0x2f
- 偏移量 0x16: TS=0x74 vs WASM=0x66
- 偏移量 0x17: TS=0x6f vs WASM=0x69
- ... (显示前20个差异，总共256个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 04 de 01 2f 55 73 65 72 73 2f 61 6e 69 77 65 |..../Users/aniwe|
00000010: 69 2f 44 65 73 6b 74 6f 70 2f 77 6f 72 6b 73 70 |i/Desktop/worksp|
00000020: 61 63 65 73 2f 71 75 69 63 6b 6a 73 2d 74 79 70 |aces/quickjs-typ|
00000030: 65 73 63 72 69 70 74 2d 63 6f 6d 70 69 6c 65 72 |escript-compiler|
00000040: 5f 73 65 63 6f 6e 64 2f 5f 5f 74 65 73 74 73 5f |_second/__tests_|
00000050: 5f 2f 63 6f 6d 70 69 6c 65 72 2f 66 69 78 74 75 |_/compiler/fixtu|
00000060: 72 65 73 2f 6c 6f 6f 70 2d 63 6f 6e 74 72 6f 6c |res/loop-control|
00000070: 2e 6a 73 02 69 0e 63 6f 6e 73 6f 6c 65 06 6c 6f |.js.i.console.lo|
00000080: 67 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 |g......... .....|
00000090: 01 00 03 01 00 53 01 ca 03 00 00 00 ca 03 00 01 |.....S..........|
000000a0: 08 6c 4b 00 00 00 b7 e3 df 01 0a 00 00 00 a5 6c |.lK............l|
000000b0: 3c 00 00 00 df b8 9f cb df bc a5 6c 0a 00 00 00 |<..........l....|
000000c0: 6e e3 ff ff ff 6e 00 00 00 00 39 e6 00 00 00 43 |n....n....9....C|
000000d0: e7 00 00 00 df 24 01 00 0e df be a7 6c 0a 00 00 |.....$......l...|
000000e0: 00 6e 0a 00 00 00 6e 00 00 00 00 6e b8 ff ff ff |.n....n....n....|
000000f0: 29 06 2f c8 03 01 12 00 08 01 00 0c 01 00 04 01 |)./.............|
00000100: 00 12 02 00 0a 01 00 05 01 00                   |..........|
```

### WASM
```
00000000: 05 04 56 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..V__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6c |piler/fixtures/l|
00000020: 6f 6f 70 2d 63 6f 6e 74 72 6f 6c 2e 6a 73 02 69 |oop-control.js.i|
00000030: 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 |.console.log....|
00000040: 00 00 00 00 0c 20 06 01 a4 01 00 00 00 03 01 00 |..... ..........|
00000050: 3b 00 ca 03 00 09 08 ec 02 29 b7 e3 68 00 00 bf |;........)..h...|
00000060: 0a a5 ec 2c 68 00 00 b8 9f 11 69 00 00 0e 68 00 |...,h.....i...h.|
00000070: 00 bc a5 ed e8 39 e6 00 00 00 43 e7 00 00 00 68 |.....9....C....h|
00000080: 00 00 24 01 00 0e 68 00 00 be a7 ed 03 ee ce 06 |..$...h.........|
00000090: 2f c8 03 1a 00 00 21 0e 1b 04 12 01 16 04 21 03 |/.....!.......!.|
000000a0: 16 04 14 0b 1b 0e 1b 0a 11 01 17 0d 16 04 00    |...............|
```