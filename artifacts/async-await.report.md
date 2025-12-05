# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/async-await.ts
**生成时间**: 2025-12-05T08:58:52.488Z

## 大小对比

- TypeScript编译器: 317 字节
- WASM编译器: 288 字节
- 差异: 29 字节 (10.07%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 7,
  "atoms": [
    {
      "index": 0,
      "rawLength": 84,
      "actualLength": 42,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/async-await.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "foo",
      "offset": 45
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "bar",
      "offset": 49
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "baz",
      "offset": 53
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 57
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 59
    },
    {
      "index": 6,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "z",
      "offset": 61
    }
  ],
  "functionHeader": {
    "offset": 63,
    "tag": "0xd",
    "remaining": 254
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 7,
  "atoms": [
    {
      "index": 0,
      "rawLength": 84,
      "actualLength": 42,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/async-await.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "foo",
      "offset": 45
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "bar",
      "offset": 49
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "baz",
      "offset": 53
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 57
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 59
    },
    {
      "index": 6,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "z",
      "offset": 61
    }
  ],
  "functionHeader": {
    "offset": 63,
    "tag": "0xd",
    "remaining": 225
  }
}
```

## 字节级差异

共发现 208 个字节差异:

- 偏移量 0x4e: TS=0x03 vs WASM=0x00
- 偏移量 0x50: TS=0x03 vs WASM=0x01
- 偏移量 0x53: TS=0x1a vs WASM=0x18
- 偏移量 0x54: TS=0x03 vs WASM=0x00
- 偏移量 0x58: TS=0x00 vs WASM=0x01
- 偏移量 0x59: TS=0x00 vs WASM=0xcc
- 偏移量 0x5a: TS=0xcc vs WASM=0x03
- 偏移量 0x5b: TS=0x03 vs WASM=0x01
- 偏移量 0x5c: TS=0x00 vs WASM=0x01
- 偏移量 0x5d: TS=0x00 vs WASM=0xce
- 偏移量 0x5e: TS=0x00 vs WASM=0x03
- 偏移量 0x5f: TS=0xce vs WASM=0x02
- 偏移量 0x60: TS=0x03 vs WASM=0x0d
- 偏移量 0x61: TS=0x00 vs WASM=0x08
- 偏移量 0x62: TS=0x00 vs WASM=0xec
- 偏移量 0x63: TS=0x00 vs WASM=0x08
- 偏移量 0x64: TS=0xca vs WASM=0xc2
- 偏移量 0x65: TS=0x03 vs WASM=0x00
- 偏移量 0x66: TS=0x00 vs WASM=0xe3
- 偏移量 0x67: TS=0x01 vs WASM=0xc2
- ... (显示前20个差异，总共208个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 07 54 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..T__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 61 |piler/fixtures/a|
00000020: 73 79 6e 63 2d 61 77 61 69 74 2e 6a 73 06 66 6f |sync-await.js.fo|
00000030: 6f 06 62 61 72 06 62 61 7a 02 78 02 79 02 7a 0d |o.bar.baz.x.y.z.|
00000040: c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 03 00 |........ .......|
00000050: 03 03 04 1a 03 ca 03 00 00 00 cc 03 00 00 00 ce |................|
00000060: 03 00 00 00 ca 03 00 01 cc 03 01 01 ce 03 02 01 |................|
00000070: 08 ec 15 c2 00 e3 c2 01 e4 c2 02 4f e7 00 00 00 |...........O....|
00000080: e5 c2 03 22 00 00 0e 29 06 2f c8 03 01 0f 00 06 |..."...)./......|
00000090: 02 00 03 04 00 00 02 00 08 02 00 00 02 00 0c 20 |............... |
000000a0: 04 00 ca 03 01 00 01 03 00 00 0d 01 d0 03 00 00 |................|
000000b0: 00 39 e6 00 00 00 d3 22 01 00 8d 2f 06 2f c8 03 |.9....."..././..|
000000c0: 01 03 00 00 01 00 0c 20 04 00 cc 03 01 00 01 03 |....... ........|
000000d0: 00 00 06 01 d2 03 00 00 00 d3 b8 9f 2f 06 2f c8 |...........././.|
000000e0: 03 01 06 00 00 04 00 00 01 00 0c 20 04 00 00 01 |........... ....|
000000f0: 00 01 03 01 00 09 01 d4 03 00 00 00 ca 03 00 00 |................|
00000100: df d3 22 01 00 8d 2f 06 2f c8 03 01 06 00 00 08 |.."..././.......|
00000110: 00 00 01 00 0c 20 04 00 00 00 00 00 03 01 00 0d |..... ..........|
00000120: 00 ce 03 02 00 df 01 0a 00 00 00 22 01 00 8d 0e |..........."....|
00000130: 06 2f c8 03 01 06 00 00 0c 00 00 01 00          |./...........|
```

### WASM
```
00000000: 05 07 54 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..T__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 61 |piler/fixtures/a|
00000020: 73 79 6e 63 2d 61 77 61 69 74 2e 6a 73 06 66 6f |sync-await.js.fo|
00000030: 6f 06 62 61 72 06 62 61 7a 02 78 02 79 02 7a 0d |o.bar.baz.x.y.z.|
00000040: c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 |........ .......|
00000050: 01 03 04 18 00 ca 03 00 01 cc 03 01 01 ce 03 02 |................|
00000060: 0d 08 ec 08 c2 00 e3 c2 01 e4 29 c2 02 4f e7 00 |..........)..O..|
00000070: 00 00 e5 c2 03 f0 0e 06 2f c8 03 08 00 00 00 12 |......../.......|
00000080: 12 00 0e 04 00 0c 62 06 01 ca 03 01 00 01 02 01 |......b.........|
00000090: 00 05 01 d0 03 00 01 00 cc 03 01 00 df d3 f1 8d |................|
000000a0: 2f c8 03 0a 00 00 03 22 07 08 07 01 0c 1f 00 0c |/......"........|
000000b0: 62 06 01 cc 03 01 00 01 02 00 00 04 01 d2 03 00 |b...............|
000000c0: 01 00 d3 b8 9f 2f c8 03 08 03 00 03 16 0c 04 07 |...../..........|
000000d0: 11 00 0c 22 06 01 00 01 00 01 02 01 00 05 01 d4 |..."............|
000000e0: 03 00 01 00 ca 03 00 00 df d3 f1 8d 2f c8 03 0a |............/...|
000000f0: 06 0c 03 0a 07 08 07 01 0c 1f 00 0c 62 06 01 00 |............b...|
00000100: 00 00 00 02 01 00 0a 00 ce 03 02 0c 68 00 00 bf |............h...|
00000110: 0a f1 8d 0e 06 2f c8 03 06 09 01 03 12 1b 06 00 |...../..........|
```