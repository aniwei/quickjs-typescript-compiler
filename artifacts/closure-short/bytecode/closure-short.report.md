# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/compiler/fixtures/closure-short.ts
**生成时间**: 2025-12-09T09:00:06.129Z

## 大小对比

- TypeScript编译器: 260 字节
- WASM编译器: 279 字节
- 差异: -19 字节 (-6.81%)

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
      "string": "__tests__/compiler/fixtures/closure-short.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "short",
      "offset": 47
    },
    {
      "index": 2,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "inner",
      "offset": 53
    },
    {
      "index": 3,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "v0",
      "offset": 59
    },
    {
      "index": 4,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "v1",
      "offset": 62
    },
    {
      "index": 5,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "v2",
      "offset": 65
    },
    {
      "index": 6,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "v3",
      "offset": 68
    },
    {
      "index": 7,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "v4",
      "offset": 71
    }
  ],
  "functionHeader": {
    "offset": 74,
    "tag": "0xd",
    "remaining": 186
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
      "string": "__tests__/compiler/fixtures/closure-short.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "short",
      "offset": 47
    },
    {
      "index": 2,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "v0",
      "offset": 53
    },
    {
      "index": 3,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "v1",
      "offset": 56
    },
    {
      "index": 4,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "v2",
      "offset": 59
    },
    {
      "index": 5,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "v3",
      "offset": 62
    },
    {
      "index": 6,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "v4",
      "offset": 65
    },
    {
      "index": 7,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "inner",
      "offset": 68
    }
  ],
  "functionHeader": {
    "offset": 74,
    "tag": "0xd",
    "remaining": 205
  }
}
```

## 字节级差异

共发现 149 个字节差异:

- 偏移量 0x35: TS=0x0a vs WASM=0x04
- 偏移量 0x36: TS=0x69 vs WASM=0x76
- 偏移量 0x37: TS=0x6e vs WASM=0x30
- 偏移量 0x38: TS=0x6e vs WASM=0x04
- 偏移量 0x39: TS=0x65 vs WASM=0x76
- 偏移量 0x3a: TS=0x72 vs WASM=0x31
- 偏移量 0x3d: TS=0x30 vs WASM=0x32
- 偏移量 0x40: TS=0x31 vs WASM=0x33
- 偏移量 0x43: TS=0x32 vs WASM=0x34
- 偏移量 0x44: TS=0x04 vs WASM=0x0a
- 偏移量 0x45: TS=0x76 vs WASM=0x69
- 偏移量 0x46: TS=0x33 vs WASM=0x6e
- 偏移量 0x47: TS=0x04 vs WASM=0x6e
- 偏移量 0x48: TS=0x76 vs WASM=0x65
- 偏移量 0x49: TS=0x34 vs WASM=0x72
- 偏移量 0x83: TS=0x01 vs WASM=0x06
- 偏移量 0x88: TS=0x15 vs WASM=0x13
- 偏移量 0x89: TS=0x01 vs WASM=0x06
- 偏移量 0x8d: TS=0x05 vs WASM=0x00
- 偏移量 0x8e: TS=0x00 vs WASM=0x40
- ... (显示前20个差异，总共149个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 08 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6c 6f 73 75 72 65 2d 73 68 6f 72 74 2e 6a 73 0a |losure-short.js.|
00000030: 73 68 6f 72 74 0a 69 6e 6e 65 72 04 76 30 04 76 |short.inner.v0.v|
00000040: 31 04 76 32 04 76 33 04 76 34 0d c8 03 00 00 00 |1.v2.v3.v4......|
00000050: 00 00 0c 20 06 01 a4 01 00 00 00 01 01 01 0c 00 |... ............|
00000060: ca 03 00 01 08 ec 05 c2 00 e3 29 df f0 0e 06 2f |..........)..../|
00000070: c8 03 08 00 00 00 07 1e 00 07 0a 00 0c 43 06 01 |.............C..|
00000080: ca 03 00 01 00 01 00 01 15 01 cc 03 00 05 00 c2 |................|
00000090: 00 c5 05 b7 cb b8 cc b9 cd ba ce bb 5b 04 00 5a |............[..Z|
000000a0: 05 00 f0 29 c8 03 08 00 00 00 10 1a 08 11 0a 00 |...)............|
000000b0: 0c 43 06 01 cc 03 00 00 00 02 05 00 18 00 ce 03 |.C..............|
000000c0: 00 01 d0 03 01 01 d2 03 02 01 d4 03 03 01 d6 03 |................|
000000d0: 04 01 df 93 e3 0e e0 93 e4 0e e1 93 e5 0e e2 93 |................|
000000e0: e6 0e 60 04 00 93 61 04 00 29 c8 03 16 06 04 03 |..`...a..)......|
000000f0: 08 07 04 12 03 07 04 12 03 07 04 12 03 07 04 12 |................|
00000100: 03 11 04 00                                     |....|
```

### WASM
```
00000000: 05 08 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6c 6f 73 75 72 65 2d 73 68 6f 72 74 2e 6a 73 0a |losure-short.js.|
00000030: 73 68 6f 72 74 04 76 30 04 76 31 04 76 32 04 76 |short.v0.v1.v2.v|
00000040: 33 04 76 34 0a 69 6e 6e 65 72 0d c8 03 00 00 00 |3.v4.inner......|
00000050: 00 00 0c 20 06 01 a4 01 00 00 00 01 01 01 0c 00 |... ............|
00000060: ca 03 00 01 08 ec 05 c2 00 e3 29 df f0 0e 06 2f |..........)..../|
00000070: c8 03 08 00 00 00 07 1e 00 07 0a 00 0c 43 06 01 |.............C..|
00000080: ca 03 00 06 00 01 00 01 13 06 cc 03 00 00 40 ce |..............@.|
00000090: 03 00 01 40 d0 03 00 02 40 d2 03 00 03 40 d4 03 |...@....@....@..|
000000a0: 00 04 40 d6 03 00 05 00 c2 00 c5 05 b7 cb b8 cc |..@.............|
000000b0: b9 cd ba ce bb c5 04 c4 05 f0 29 c8 03 08 00 00 |..........).....|
000000c0: 00 0f 1a 08 0c 0a 00 0c 43 06 01 d6 03 00 00 00 |........C.......|
000000d0: 01 05 00 14 00 cc 03 00 01 ce 03 01 01 d0 03 02 |................|
000000e0: 01 d2 03 03 01 d4 03 04 01 df 91 e3 e0 91 e4 e1 |................|
000000f0: 91 e5 e2 91 e6 60 04 00 91 61 04 00 29 c8 03 16 |.....`...a..)...|
00000100: 06 04 03 08 07 04 0d 03 07 04 0d 03 07 04 0d 03 |................|
00000110: 07 04 0d 03 11 04 00                            |.......|
```