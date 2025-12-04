# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/nested-scopes.ts
**生成时间**: 2025-12-02T17:07:51.291Z

## 大小对比

- TypeScript编译器: 292 字节
- WASM编译器: 269 字节
- 差异: 23 字节 (8.55%)

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
    "remaining": 200
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

共发现 162 个字节差异:

- 偏移量 0x72: TS=0xcc vs WASM=0xca
- 偏移量 0x74: TS=0xff vs WASM=0x00
- 偏移量 0x75: TS=0xff vs WASM=0x01
- 偏移量 0x76: TS=0xff vs WASM=0xcc
- 偏移量 0x77: TS=0xff vs WASM=0x03
- 偏移量 0x78: TS=0x0f vs WASM=0x01
- 偏移量 0x79: TS=0x00 vs WASM=0x01
- 偏移量 0x7a: TS=0xca vs WASM=0x08
- 偏移量 0x7b: TS=0x03 vs WASM=0xec
- 偏移量 0x7c: TS=0x00 vs WASM=0x05
- 偏移量 0x7d: TS=0x01 vs WASM=0xc2
- 偏移量 0x7e: TS=0x08 vs WASM=0x00
- 偏移量 0x7f: TS=0xec vs WASM=0xe4
- 偏移量 0x80: TS=0x05 vs WASM=0x29
- 偏移量 0x81: TS=0xc2 vs WASM=0xbf
- 偏移量 0x82: TS=0x00 vs WASM=0x0a
- 偏移量 0x84: TS=0x29 vs WASM=0xe0
- 偏移量 0x85: TS=0xbf vs WASM=0xf0
- 偏移量 0x86: TS=0x0a vs WASM=0x0e
- 偏移量 0x87: TS=0xe4 vs WASM=0x06
- ... (显示前20个差异，总共162个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 08 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6e |piler/fixtures/n|
00000020: 65 73 74 65 64 2d 73 63 6f 70 65 73 2e 6a 73 08 |ested-scopes.js.|
00000030: 6e 73 5f 78 10 6e 73 5f 6f 75 74 65 72 08 6e 73 |ns_x.ns_outer.ns|
00000040: 5f 79 10 6e 73 5f 69 6e 6e 65 72 08 6e 73 5f 7a |_y.ns_inner.ns_z|
00000050: 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 |.console.log....|
00000060: 00 00 00 00 0c 20 06 01 a4 01 00 00 00 01 02 01 |..... ..........|
00000070: 0f 00 cc 03 ff ff ff ff 0f 00 ca 03 00 01 08 ec |................|
00000080: 05 c2 00 e3 29 bf 0a e4 df f0 0e 06 2f c8 03 08 |....)......./...|
00000090: 00 00 00 0a 12 00 07 10 00 0c 43 06 01 cc 03 00 |..........C.....|
000000a0: 02 00 01 00 01 13 02 ce 03 01 00 60 e6 01 00 00 |...........`....|
000000b0: 00 0c 03 5b 01 00 bf 14 cb c2 00 0e 39 e8 00 00 |...[........9...|
000000c0: 00 f0 0e 29 c8 03 08 01 00 00 06 0c 04 1b 10 00 |...)............|
000000d0: 0c 43 06 01 d0 03 00 02 00 04 01 00 22 02 d2 03 |.C.........."...|
000000e0: 01 00 20 e6 01 00 00 00 ce 03 00 09 0c 03 5b 01 |.. ...........[.|
000000f0: 00 bf 1e cb 39 ea 00 00 00 43 eb 00 00 00 39 e5 |....9....C....9.|
00000100: 00 00 00 68 00 00 9f c7 9f 24 01 00 0e 29 c8 03 |...h.....$...)..|
00000110: 12 03 02 13 04 1b 0e 1b 0a 1b 0e 11 03 07 12 07 |................|
00000120: 03 07 19 00                                     |....|
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