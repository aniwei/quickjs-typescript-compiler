# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/while-loop.ts
**生成时间**: 2025-12-05T12:54:24.407Z

## 大小对比

- TypeScript编译器: 245 字节
- WASM编译器: 180 字节
- 差异: 65 字节 (36.11%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 5,
  "atoms": [
    {
      "index": 0,
      "rawLength": 218,
      "actualLength": 109,
      "isWideChar": 0,
      "string": "/Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/while-loop.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 113
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 115
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 123
    },
    {
      "index": 4,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "Done",
      "offset": 127
    }
  ],
  "functionHeader": {
    "offset": 132,
    "tag": "0xd",
    "remaining": 113
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 5,
  "atoms": [
    {
      "index": 0,
      "rawLength": 82,
      "actualLength": 41,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/while-loop.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 44
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 46
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 54
    },
    {
      "index": 4,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "Done",
      "offset": 58
    }
  ],
  "functionHeader": {
    "offset": 63,
    "tag": "0xd",
    "remaining": 117
  }
}
```

## 字节级差异

共发现 232 个字节差异:

- 偏移量 0x2: TS=0xda vs WASM=0x52
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
- ... (显示前20个差异，总共232个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 05 da 01 2f 55 73 65 72 73 2f 61 6e 69 77 65 |..../Users/aniwe|
00000010: 69 2f 44 65 73 6b 74 6f 70 2f 77 6f 72 6b 73 70 |i/Desktop/worksp|
00000020: 61 63 65 73 2f 71 75 69 63 6b 6a 73 2d 74 79 70 |aces/quickjs-typ|
00000030: 65 73 63 72 69 70 74 2d 63 6f 6d 70 69 6c 65 72 |escript-compiler|
00000040: 5f 73 65 63 6f 6e 64 2f 5f 5f 74 65 73 74 73 5f |_second/__tests_|
00000050: 5f 2f 63 6f 6d 70 69 6c 65 72 2f 66 69 78 74 75 |_/compiler/fixtu|
00000060: 72 65 73 2f 77 68 69 6c 65 2d 6c 6f 6f 70 2e 6a |res/while-loop.j|
00000070: 73 02 69 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 08 |s.i.console.log.|
00000080: 44 6f 6e 65 0d c8 03 00 00 00 00 00 0c 20 06 01 |Done......... ..|
00000090: a4 01 00 01 00 03 01 00 3e 01 ca 03 00 00 00 ca |........>.......|
000000a0: 03 00 01 08 6c 36 00 00 00 b7 e3 df ba a5 6c 18 |....l6........l.|
000000b0: 00 00 00 39 e6 00 00 00 43 e7 00 00 00 df 24 01 |...9....C.....$.|
000000c0: 00 0e df b8 9f cb 6e e0 ff ff ff 39 e6 00 00 00 |......n....9....|
000000d0: 43 e7 00 00 00 04 e8 00 00 00 24 01 00 0e 29 06 |C.........$...).|
000000e0: 2f c8 03 01 0f 00 08 01 00 12 01 00 05 01 00 09 |/...............|
000000f0: 01 00 0a 01 00                                  |.....|
```

### WASM
```
00000000: 05 05 52 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..R__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 77 |piler/fixtures/w|
00000020: 68 69 6c 65 2d 6c 6f 6f 70 2e 6a 73 02 69 0e 63 |hile-loop.js.i.c|
00000030: 6f 6e 73 6f 6c 65 06 6c 6f 67 08 44 6f 6e 65 0d |onsole.log.Done.|
00000040: c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 |........ .......|
00000050: 03 01 00 3f 00 ca 03 00 09 08 ec 02 29 b7 e3 68 |...?........)..h|
00000060: 00 00 ba a5 ec 1e 39 e6 00 00 00 43 e7 00 00 00 |......9....C....|
00000070: 68 00 00 24 01 00 0e 68 00 00 b8 9f 11 69 00 00 |h..$...h.....i..|
00000080: 0e ee dd 39 e6 00 00 00 43 e7 00 00 00 04 e8 00 |...9....C.......|
00000090: 00 00 24 01 00 0e 06 2f c8 03 18 00 00 21 0e 16 |..$..../.....!..|
000000a0: 04 12 09 1b 0e 1b 0a 11 01 17 0d 16 04 2c 13 1b |.............,..|
000000b0: 0e 34 08 00                                     |.4..|
```