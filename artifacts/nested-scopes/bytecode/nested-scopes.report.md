# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/nested-scopes.ts
**生成时间**: 2025-12-06T02:09:56.448Z

## 大小对比

- TypeScript编译器: 269 字节
- WASM编译器: 269 字节
- 差异: 0 字节 (0.00%)

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
      "string": "ns_x",
      "offset": 56
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

共发现 124 个字节差异:

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
- 偏移量 0x3c: TS=0x78 vs WASM=0x72
- 偏移量 0x6d: TS=0x03 vs WASM=0x01
- 偏移量 0x70: TS=0x12 vs WASM=0x0f
- 偏移量 0x7f: TS=0xe3 vs WASM=0xe4
- 偏移量 0x81: TS=0x01 vs WASM=0xbf
- 偏移量 0x83: TS=0x00 vs WASM=0xe3
- 偏移量 0x84: TS=0x00 vs WASM=0xe0
- 偏移量 0x85: TS=0x00 vs WASM=0xf0
- 偏移量 0x86: TS=0xe4 vs WASM=0x0e
- 偏移量 0x87: TS=0xdf vs WASM=0x06
- ... (显示前20个差异，总共124个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 08 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6e |piler/fixtures/n|
00000020: 65 73 74 65 64 2d 73 63 6f 70 65 73 2e 6a 73 10 |ested-scopes.js.|
00000030: 6e 73 5f 6f 75 74 65 72 08 6e 73 5f 78 08 6e 73 |ns_outer.ns_x.ns|
00000040: 5f 79 10 6e 73 5f 69 6e 6e 65 72 08 6e 73 5f 7a |_y.ns_inner.ns_z|
00000050: 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 |.console.log....|
00000060: 00 00 00 00 0c 20 06 01 a4 01 00 00 00 03 02 01 |..... ..........|
00000070: 12 00 ca 03 00 01 cc 03 01 01 08 ec 05 c2 00 e3 |................|
00000080: 29 01 0a 00 00 00 e4 df f0 0e 06 2f c8 03 00 04 |)........../....|
00000090: 12 00 15 0b 00 0c 42 06 00 ca 03 00 02 00 03 00 |......B.........|
000000a0: 01 0f 02 ce 03 00 01 00 d0 03 01 00 01 01 14 00 |................|
000000b0: 00 00 cb c2 00 5b 01 00 c8 f0 0e 29 c8 03 00 08 |.....[.....)....|
000000c0: 04 7f 21 75 00 05 04 00 00 0c 42 06 00 d0 03 00 |..!u......B.....|
000000d0: 01 00 03 01 00 1e 01 d2 03 00 01 00 ce 03 00 01 |................|
000000e0: 01 1e 00 00 00 cb 39 ea 00 00 00 43 eb 00 00 00 |......9....C....|
000000f0: 39 e6 00 00 00 df 9f c7 9f 24 01 00 0e 29 c8 03 |9........$...)..|
00000100: 02 0a 04 7f 21 75 34 0c 1b 07 0c 07 00          |....!u4......|
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