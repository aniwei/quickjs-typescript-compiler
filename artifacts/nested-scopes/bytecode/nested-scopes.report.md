# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/nested-scopes.ts
**生成时间**: 2025-12-05T12:54:24.185Z

## 大小对比

- TypeScript编译器: 362 字节
- WASM编译器: 269 字节
- 差异: 93 字节 (34.57%)

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
      "rawLength": 224,
      "actualLength": 112,
      "isWideChar": 0,
      "string": "/Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/nested-scopes.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "ns_x",
      "offset": 116
    },
    {
      "index": 2,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "ns_outer",
      "offset": 121
    },
    {
      "index": 3,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "ns_y",
      "offset": 130
    },
    {
      "index": 4,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "ns_inner",
      "offset": 135
    },
    {
      "index": 5,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "ns_z",
      "offset": 144
    },
    {
      "index": 6,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 149
    },
    {
      "index": 7,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 157
    }
  ],
  "functionHeader": {
    "offset": 161,
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
      "rawLength": 88,
      "actualLength": 44,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/nested-scopes.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "ns_x",
      "offset": 47
    },
    {
      "index": 2,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "ns_outer",
      "offset": 52
    },
    {
      "index": 3,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "ns_y",
      "offset": 61
    },
    {
      "index": 4,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "ns_inner",
      "offset": 66
    },
    {
      "index": 5,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "ns_z",
      "offset": 75
    },
    {
      "index": 6,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 80
    },
    {
      "index": 7,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 88
    }
  ],
  "functionHeader": {
    "offset": 92,
    "tag": "0xd",
    "remaining": 177
  }
}
```

## 字节级差异

共发现 343 个字节差异:

- 偏移量 0x2: TS=0xe0 vs WASM=0x58
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
- ... (显示前20个差异，总共343个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 08 e0 01 2f 55 73 65 72 73 2f 61 6e 69 77 65 |..../Users/aniwe|
00000010: 69 2f 44 65 73 6b 74 6f 70 2f 77 6f 72 6b 73 70 |i/Desktop/worksp|
00000020: 61 63 65 73 2f 71 75 69 63 6b 6a 73 2d 74 79 70 |aces/quickjs-typ|
00000030: 65 73 63 72 69 70 74 2d 63 6f 6d 70 69 6c 65 72 |escript-compiler|
00000040: 5f 73 65 63 6f 6e 64 2f 5f 5f 74 65 73 74 73 5f |_second/__tests_|
00000050: 5f 2f 63 6f 6d 70 69 6c 65 72 2f 66 69 78 74 75 |_/compiler/fixtu|
00000060: 72 65 73 2f 6e 65 73 74 65 64 2d 73 63 6f 70 65 |res/nested-scope|
00000070: 73 2e 6a 73 08 6e 73 5f 78 10 6e 73 5f 6f 75 74 |s.js.ns_x.ns_out|
00000080: 65 72 08 6e 73 5f 79 10 6e 73 5f 69 6e 6e 65 72 |er.ns_y.ns_inner|
00000090: 08 6e 73 5f 7a 0e 63 6f 6e 73 6f 6c 65 06 6c 6f |.ns_z.console.lo|
000000a0: 67 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 |g......... .....|
000000b0: 02 00 03 02 01 17 02 ca 03 00 00 00 cc 03 00 00 |................|
000000c0: 00 ca 03 00 01 cc 03 01 01 08 6c 0f 00 00 00 01 |..........l.....|
000000d0: 0a 00 00 00 e3 c2 00 e4 e0 22 00 00 0e 29 06 2f |........."...)./|
000000e0: c8 03 01 03 00 0f 08 00 0c 00 04 00 cc 03 00 02 |................|
000000f0: 00 03 01 01 13 02 ce 03 00 00 00 d0 03 00 00 00 |................|
00000100: ca 03 00 00 01 14 00 00 00 5b 00 00 c2 00 5b 01 |.........[....[.|
00000110: 00 c8 22 00 00 0e 29 c8 03 01 09 00 00 01 00 00 |.."...).........|
00000120: 01 00 0d 04 00 0c 00 04 00 d0 03 00 01 00 03 02 |................|
00000130: 00 1c 01 d2 03 00 00 00 ca 03 00 00 ce 03 00 01 |................|
00000140: 01 1e 00 00 00 5b 00 00 39 ea 00 00 00 43 eb 00 |.....[..9....C..|
00000150: 00 00 df e0 9f c7 9f 24 01 00 0e 29 c8 03 01 09 |.......$...)....|
00000160: 00 00 03 00 00 01 00 12 01 00                   |..........|
```

### WASM
```
00000000: 05 08 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6e |piler/fixtures/n|
00000020: 65 73 74 65 64 2d 73 63 6f 70 65 73 2e 6a 73 08 |ested-scopes.js.|
00000030: 6e 73 5f 78 10 6e 73 5f 6f 75 74 65 72 08 6e 73 |ns_x.ns_outer.ns|
00000040: 5f 79 10 6e 73 5f 69 6e 6e 65 72 08 6e 73 5f 7a |_y.ns_inner.ns_z|
00000050: 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 |.console.log....|
00000060: 00 00 00 00 0c 20 06 01 a4 01 00 00 00 01 02 01 |..... ..........|
00000070: 0f 00 ca 03 00 01 cc 03 01 01 08 ec 05 c2 00 e4 |................|
00000080: 29 bf 0a e3 e0 f0 0e 06 2f c8 03 08 00 00 00 0a |)......./.......|
00000090: 12 00 07 10 00 0c 43 06 01 cc 03 00 02 00 01 01 |......C.........|
000000a0: 01 09 02 ce 03 00 00 40 d0 03 00 01 00 ca 03 00 |.......@........|
000000b0: 00 c2 00 cc bf 14 cb c8 f0 29 c8 03 08 01 00 00 |.........)......|
000000c0: 06 0c 08 07 10 00 0c 43 06 01 d0 03 00 01 00 04 |.......C........|
000000d0: 02 00 16 01 d2 03 00 00 00 ca 03 00 00 ce 03 00 |................|
000000e0: 01 bf 1e cb 39 ea 00 00 00 43 eb 00 00 00 df e0 |....9....C......|
000000f0: 9f c7 9f 24 01 00 29 c8 03 12 03 04 13 08 1b 0e |...$..).........|
00000100: 1b 0a 07 0e 07 03 07 12 07 03 07 19 00          |.............|
```