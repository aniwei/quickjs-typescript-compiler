# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/class-basic.ts
**生成时间**: 2025-12-07T18:10:44.318Z

## 大小对比

- TypeScript编译器: 208 字节
- WASM编译器: 201 字节
- 差异: 7 字节 (3.48%)

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
      "rawLength": 84,
      "actualLength": 42,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/class-basic.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "Point",
      "offset": 45
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 51
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 53
    }
  ],
  "functionHeader": {
    "offset": 55,
    "tag": "0xd",
    "remaining": 153
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
      "rawLength": 84,
      "actualLength": 42,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/class-basic.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "Point",
      "offset": 45
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 51
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 53
    }
  ],
  "functionHeader": {
    "offset": 55,
    "tag": "0xd",
    "remaining": 146
  }
}
```

## 字节级差异

共发现 80 个字节差异:

- 偏移量 0x4f: TS=0x01 vs WASM=0x02
- 偏移量 0x54: TS=0x01 vs WASM=0x03
- 偏移量 0x55: TS=0x00 vs WASM=0x01
- 偏移量 0x5a: TS=0x0d vs WASM=0x09
- 偏移量 0x7f: TS=0x03 vs WASM=0x42
- 偏移量 0x80: TS=0x04 vs WASM=0x07
- 偏移量 0x82: TS=0xca vs WASM=0x00
- 偏移量 0x83: TS=0x03 vs WASM=0x02
- 偏移量 0x84: TS=0x02 vs WASM=0x01
- 偏移量 0x85: TS=0x01 vs WASM=0x02
- 偏移量 0x87: TS=0x02 vs WASM=0x01
- 偏移量 0x88: TS=0x02 vs WASM=0x00
- 偏移量 0x89: TS=0x00 vs WASM=0x1e
- 偏移量 0x8a: TS=0x20 vs WASM=0x03
- 偏移量 0x8b: TS=0x03 vs WASM=0xcc
- 偏移量 0x8c: TS=0xcc vs WASM=0x03
- 偏移量 0x8d: TS=0x03 vs WASM=0x00
- 偏移量 0x8e: TS=0x00 vs WASM=0x01
- 偏移量 0x8f: TS=0x01 vs WASM=0x00
- 偏移量 0x90: TS=0x00 vs WASM=0xce
- ... (显示前20个差异，总共80个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 04 54 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..T__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6c 61 73 73 2d 62 61 73 69 63 2e 6a 73 0a 50 6f |lass-basic.js.Po|
00000030: 69 6e 74 02 78 02 79 0d c8 03 00 00 00 00 00 0c |int.x.y.........|
00000040: 20 06 01 a4 01 00 02 00 03 01 01 1d 02 ca 03 01 | ...............|
00000050: 00 30 f0 01 01 00 70 ca 03 00 0d 08 ec 02 29 63 |.0....p.......)c|
00000060: 00 00 06 63 01 00 c1 00 58 e5 00 00 00 00 06 cc |...c....X.......|
00000070: 0e cf 6b 01 00 e3 06 2f c8 03 02 00 00 00 0c 03 |..k..../........|
00000080: 04 01 ca 03 02 01 02 02 02 00 20 03 cc 03 00 01 |.......... .....|
00000090: 00 ce 03 00 01 00 10 00 00 10 f0 01 01 0d f0 01 |................|
000000a0: 00 0c 08 cb 2b 68 01 00 11 ec 06 c7 1b 24 00 00 |....+h.......$..|
000000b0: 0e c7 d3 44 e6 00 00 00 0e c7 d4 44 e7 00 00 00 |...D.......D....|
000000c0: 0e 29 c8 03 0a 00 00 4f 10 07 12 26 11 07 12 00 |.).....O...&....|
```

### WASM
```
00000000: 05 04 54 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..T__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6c 61 73 73 2d 62 61 73 69 63 2e 6a 73 0a 50 6f |lass-basic.js.Po|
00000030: 69 6e 74 02 78 02 79 0d c8 03 00 00 00 00 00 0c |int.x.y.........|
00000040: 20 06 01 a4 01 00 02 00 03 01 01 1d 02 ca 03 02 | ...............|
00000050: 00 30 f0 01 03 01 70 ca 03 00 09 08 ec 02 29 63 |.0....p.......)c|
00000060: 00 00 06 63 01 00 c1 00 58 e5 00 00 00 00 06 cc |...c....X.......|
00000070: 0e cf 6b 01 00 e3 06 2f c8 03 02 00 00 00 0c 42 |..k..../.......B|
00000080: 07 01 00 02 01 02 02 01 00 1e 03 cc 03 00 01 00 |................|
00000090: ce 03 00 01 00 10 00 01 00 f0 01 01 0d 08 cb 2b |...............+|
000000a0: 68 00 00 11 ec 06 c7 1b 24 00 00 0e c7 d3 44 e6 |h.......$.....D.|
000000b0: 00 00 00 c7 d4 44 e7 00 00 00 29 c8 03 0a 01 04 |.....D....).....|
000000c0: 4e 08 07 12 21 11 07 12 00                      |N...!....|
```