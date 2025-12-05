# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/loops.ts
**生成时间**: 2025-12-05T01:07:30.941Z

## 大小对比

- TypeScript编译器: 202 字节
- WASM编译器: 179 字节
- 差异: 23 字节 (12.85%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 2,
  "atoms": [
    {
      "index": 0,
      "rawLength": 72,
      "actualLength": 36,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/loops.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 39
    }
  ],
  "functionHeader": {
    "offset": 41,
    "tag": "0xd",
    "remaining": 161
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 2,
  "atoms": [
    {
      "index": 0,
      "rawLength": 72,
      "actualLength": 36,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/loops.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 39
    }
  ],
  "functionHeader": {
    "offset": 41,
    "tag": "0xd",
    "remaining": 138
  }
}
```

## 字节级差异

共发现 128 个字节差异:

- 偏移量 0x38: TS=0x01 vs WASM=0x00
- 偏移量 0x3a: TS=0x03 vs WASM=0x02
- 偏移量 0x3b: TS=0x00 vs WASM=0x01
- 偏移量 0x3d: TS=0x65 vs WASM=0x48
- 偏移量 0x3e: TS=0x01 vs WASM=0x00
- 偏移量 0x42: TS=0x00 vs WASM=0x09
- 偏移量 0x48: TS=0x5b vs WASM=0xe3
- 偏移量 0x49: TS=0x00 vs WASM=0x68
- 偏移量 0x4b: TS=0x5a vs WASM=0x00
- 偏移量 0x4c: TS=0x00 vs WASM=0xbc
- 偏移量 0x4d: TS=0x00 vs WASM=0xa5
- 偏移量 0x4e: TS=0xbc vs WASM=0xec
- 偏移量 0x4f: TS=0xa5 vs WASM=0x0b
- 偏移量 0x50: TS=0x6c vs WASM=0x68
- 偏移量 0x51: TS=0x06 vs WASM=0x00
- 偏移量 0x53: TS=0x00 vs WASM=0x93
- 偏移量 0x54: TS=0x00 vs WASM=0x69
- 偏移量 0x55: TS=0x0e vs WASM=0x00
- 偏移量 0x56: TS=0x6e vs WASM=0x00
- 偏移量 0x57: TS=0xf0 vs WASM=0x0e
- ... (显示前20个差异，总共128个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 02 48 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..H__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6c |piler/fixtures/l|
00000020: 6f 6f 70 73 2e 6a 73 02 69 0d c8 03 00 00 00 00 |oops.js.i.......|
00000030: 00 0c 20 06 01 a4 01 00 01 00 03 00 00 65 01 ca |.. ..........e..|
00000040: 03 00 00 08 ec 02 29 b7 5b 00 00 5a 00 00 bc a5 |......).[..Z....|
00000050: 6c 06 00 00 00 0e 6e f0 ff ff ff 0e 5a 00 00 b7 |l.....n.....Z...|
00000060: a7 6d f5 ff ff ff 0a 6c 0a 00 00 00 6e 05 00 00 |.m.....l....n...|
00000070: 00 6e f0 ff ff ff b7 11 5b 00 00 0e 5a 00 00 01 |.n......[...Z...|
00000080: 0a 00 00 00 a5 6c 1c 00 00 00 0e 5a 00 00 b9 9e |.....l.....Z....|
00000090: b7 ab 6c 0a 00 00 00 6e e0 ff ff ff 6e 00 00 00 |..l....n....n...|
000000a0: 00 6e d6 ff ff ff 06 2f c8 03 1e 00 08 01 00 10 |.n...../........|
000000b0: 02 00 00 02 00 01 02 00 0a 02 00 10 02 00 00 02 |................|
000000c0: 00 06 01 00 0f 01 00 00 01 00                   |..........|
```

### WASM
```
00000000: 05 02 48 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..H__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6c |piler/fixtures/l|
00000020: 6f 6f 70 73 2e 6a 73 02 69 0d c8 03 00 00 00 00 |oops.js.i.......|
00000030: 00 0c 20 06 01 a4 01 00 00 00 02 01 00 48 00 ca |.. ..........H..|
00000040: 03 00 09 08 ec 02 29 b7 e3 68 00 00 bc a5 ec 0b |......)..h......|
00000050: 68 00 00 93 69 00 00 0e ee f0 68 00 00 92 69 00 |h...i.....h...i.|
00000060: 00 0e 68 00 00 b7 a7 ed f2 b7 11 69 00 00 0e 68 |..h........i...h|
00000070: 00 00 bf 0a a5 ec 13 68 00 00 93 69 00 00 0e 68 |.......h...i...h|
00000080: 00 00 b9 9e b7 ab 0e ee e7 06 2f c8 03 24 00 00 |........../..$..|
00000090: 21 0e 16 04 12 09 11 02 28 01 11 02 1c 08 16 04 |!.......(.......|
000000a0: 00 03 08 15 21 0e 1b 04 12 09 11 02 1c 06 16 04 |....!...........|
000000b0: 0c 08 00                                        |...|
```