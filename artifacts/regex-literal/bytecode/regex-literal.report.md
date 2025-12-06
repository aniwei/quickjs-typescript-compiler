# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/regex-literal.ts
**生成时间**: 2025-12-06T02:09:56.484Z

## 大小对比

- TypeScript编译器: 145 字节
- WASM编译器: 216 字节
- 差异: -71 字节 (-32.87%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 6,
  "atoms": [
    {
      "index": 0,
      "rawLength": 88,
      "actualLength": 44,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/regex-literal.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "re",
      "offset": 47
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 50
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 58
    },
    {
      "index": 4,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "test",
      "offset": 62
    },
    {
      "index": 5,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "abbbc",
      "offset": 67
    }
  ],
  "functionHeader": {
    "offset": 73,
    "tag": "0xd",
    "remaining": 72
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 6,
  "atoms": [
    {
      "index": 0,
      "rawLength": 88,
      "actualLength": 44,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/regex-literal.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "re",
      "offset": 47
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 50
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 58
    },
    {
      "index": 4,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "test",
      "offset": 62
    },
    {
      "index": 5,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "abbbc",
      "offset": 67
    }
  ],
  "functionHeader": {
    "offset": 73,
    "tag": "0xd",
    "remaining": 143
  }
}
```

## 字节级差异

共发现 106 个字节差异:

- 偏移量 0x5a: TS=0x03 vs WASM=0x05
- 偏移量 0x5c: TS=0x00 vs WASM=0x02
- 偏移量 0x5d: TS=0x23 vs WASM=0x28
- 偏移量 0x67: TS=0xe3 vs WASM=0xc1
- 偏移量 0x68: TS=0x39 vs WASM=0x00
- 偏移量 0x69: TS=0xe6 vs WASM=0xc1
- 偏移量 0x6a: TS=0x00 vs WASM=0x01
- 偏移量 0x6b: TS=0x00 vs WASM=0x34
- 偏移量 0x6c: TS=0x00 vs WASM=0xe3
- 偏移量 0x6d: TS=0x43 vs WASM=0x39
- 偏移量 0x6e: TS=0xe7 vs WASM=0xe6
- 偏移量 0x72: TS=0xdf vs WASM=0x43
- 偏移量 0x73: TS=0x43 vs WASM=0xe7
- 偏移量 0x74: TS=0xe8 vs WASM=0x00
- 偏移量 0x77: TS=0x00 vs WASM=0xdf
- 偏移量 0x78: TS=0x04 vs WASM=0x43
- 偏移量 0x79: TS=0xe9 vs WASM=0xe8
- 偏移量 0x7d: TS=0x24 vs WASM=0x04
- 偏移量 0x7e: TS=0x01 vs WASM=0xe9
- 偏移量 0x80: TS=0x24 vs WASM=0x00
- ... (显示前20个差异，总共106个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 06 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 72 |piler/fixtures/r|
00000020: 65 67 65 78 2d 6c 69 74 65 72 61 6c 2e 6a 73 04 |egex-literal.js.|
00000030: 72 65 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 08 74 |re.console.log.t|
00000040: 65 73 74 0a 61 62 62 62 63 0d c8 03 00 00 00 00 |est.abbbc.......|
00000050: 00 0c 20 06 01 a4 01 00 00 00 03 01 00 23 00 ca |.. ..........#..|
00000060: 03 00 01 08 ec 02 29 e3 39 e6 00 00 00 43 e7 00 |......).9....C..|
00000070: 00 00 df 43 e8 00 00 00 04 e9 00 00 00 24 01 00 |...C.........$..|
00000080: 24 01 00 0e 06 2f c8 03 00 06 16 09 08 77 34 0c |$..../.......w4.|
00000090: 00                                              |.|
```

### WASM
```
00000000: 05 06 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 72 |piler/fixtures/r|
00000020: 65 67 65 78 2d 6c 69 74 65 72 61 6c 2e 6a 73 04 |egex-literal.js.|
00000030: 72 65 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 08 74 |re.console.log.t|
00000040: 65 73 74 0a 61 62 62 62 63 0d c8 03 00 00 00 00 |est.abbbc.......|
00000050: 00 0c 20 06 01 a4 01 00 00 00 05 01 02 28 00 ca |.. ..........(..|
00000060: 03 00 01 08 ec 02 29 c1 00 c1 01 34 e3 39 e6 00 |......)....4.9..|
00000070: 00 00 43 e7 00 00 00 df 43 e8 00 00 00 04 e9 00 |..C.....C.......|
00000080: 00 00 24 01 00 24 01 00 0e 06 2f c8 03 0e 00 00 |..$..$..../.....|
00000090: 35 00 1b 0e 1b 0a 07 04 34 0a 11 0f 00 07 08 61 |5.......4......a|
000000a0: 62 2b 63 07 66 00 00 01 00 2b 00 00 00 0c 06 00 |b+c.f....+......|
000000b0: 00 00 06 0b f5 ff ff ff 0f 00 01 61 00 26 04 00 |...........a.&..|
000000c0: 00 00 01 00 00 00 ff ff ff 7f 01 00 00 00 01 62 |...............b|
000000d0: 00 0e 01 63 00 10 00 0e                         |...c....|
```