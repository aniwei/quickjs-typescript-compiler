# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/nested-scopes.ts
**生成时间**: 2025-12-04T06:33:08.710Z

## 大小对比

- TypeScript编译器: 302 字节
- WASM编译器: 269 字节
- 差异: 33 字节 (12.27%)

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
      "rawLength": 88,
      "actualLength": 44,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/nested-scopes.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "ns_outer",
      "offset": 47
    },
    {
      "index": 2,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "ns_y",
      "offset": 56
    },
    {
      "index": 3,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "ns_inner",
      "offset": 61
    },
    {
      "index": 4,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "ns_z",
      "offset": 70
    },
    {
      "index": 5,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 75
    },
    {
      "index": 6,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 83
    },
    {
      "index": 7,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "ns_x",
      "offset": 87
    }
  ],
  "functionHeader": {
    "offset": 92,
    "tag": "0xd",
    "remaining": 210
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

共发现 218 个字节差异:

- 偏移量 0x2f: TS=0x10 vs WASM=0x08
- 偏移量 0x33: TS=0x6f vs WASM=0x78
- 偏移量 0x34: TS=0x75 vs WASM=0x10
- 偏移量 0x35: TS=0x74 vs WASM=0x6e
- 偏移量 0x36: TS=0x65 vs WASM=0x73
- 偏移量 0x37: TS=0x72 vs WASM=0x5f
- 偏移量 0x38: TS=0x08 vs WASM=0x6f
- 偏移量 0x39: TS=0x6e vs WASM=0x75
- 偏移量 0x3a: TS=0x73 vs WASM=0x74
- 偏移量 0x3b: TS=0x5f vs WASM=0x65
- 偏移量 0x3c: TS=0x79 vs WASM=0x72
- 偏移量 0x3d: TS=0x10 vs WASM=0x08
- 偏移量 0x41: TS=0x69 vs WASM=0x79
- 偏移量 0x42: TS=0x6e vs WASM=0x10
- 偏移量 0x44: TS=0x65 vs WASM=0x73
- 偏移量 0x45: TS=0x72 vs WASM=0x5f
- 偏移量 0x46: TS=0x08 vs WASM=0x69
- 偏移量 0x48: TS=0x73 vs WASM=0x6e
- 偏移量 0x49: TS=0x5f vs WASM=0x65
- 偏移量 0x4a: TS=0x7a vs WASM=0x72
- ... (显示前20个差异，总共218个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 08 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6e |piler/fixtures/n|
00000020: 65 73 74 65 64 2d 73 63 6f 70 65 73 2e 6a 73 10 |ested-scopes.js.|
00000030: 6e 73 5f 6f 75 74 65 72 08 6e 73 5f 79 10 6e 73 |ns_outer.ns_y.ns|
00000040: 5f 69 6e 6e 65 72 08 6e 73 5f 7a 0e 63 6f 6e 73 |_inner.ns_z.cons|
00000050: 6f 6c 65 06 6c 6f 67 08 6e 73 5f 78 0d c8 03 00 |ole.log.ns_x....|
00000060: 00 00 00 00 0c 20 06 01 a4 01 00 02 00 02 02 01 |..... ..........|
00000070: 11 02 ca 03 01 00 20 d6 03 01 01 20 ca 03 00 01 |...... .... ....|
00000080: d6 03 01 01 08 ec 05 c2 00 e3 29 bf 0a e4 5a 00 |..........)...Z.|
00000090: 00 f0 0e 06 2f c8 03 08 00 00 00 0a 12 00 11 10 |..../...........|
000000a0: 00 0c 43 06 01 ca 03 00 02 00 01 00 01 13 02 cc |..C.............|
000000b0: 03 01 00 60 e6 01 00 00 00 0c 03 5b 01 00 bf 14 |...`.......[....|
000000c0: cb c2 00 0e 39 e7 00 00 00 f0 0e 29 c8 03 08 01 |....9......)....|
000000d0: 00 00 06 0c 04 1b 10 00 0c 43 06 01 ce 03 00 02 |.........C......|
000000e0: 00 04 01 00 24 02 d0 03 01 00 20 e6 01 00 00 00 |....$..... .....|
000000f0: cc 03 00 09 0c 03 5b 01 00 bf 1e cb 39 e9 00 00 |......[.....9...|
00000100: 00 43 ea 00 00 00 39 eb 00 00 00 68 00 00 9f 5a |.C....9....h...Z|
00000110: 00 00 9f 24 01 00 0e 29 c8 03 12 03 02 13 04 1b |...$...)........|
00000120: 0e 1b 0a 1b 0e 11 03 07 12 11 03 07 19 00       |..............|
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