# 字节码分析报告

**输入文件**: /Users/weiyanhai/Desktop/workspace/quickjs-typescript-compiler/__tests__/compiler/fixtures/module-exports-default.ts
**生成时间**: 2025-10-09T19:23:32.795Z

## 大小对比

- TypeScript编译器: 276 字节
- WASM编译器: 281 字节
- 差异: -5 字节 (-1.78%)

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
      "rawLength": 106,
      "actualLength": 53,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/module-exports-default.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "multiply",
      "offset": 56
    },
    {
      "index": 2,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "ultimateAnswer",
      "offset": 65
    },
    {
      "index": 3,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "namedDefault",
      "offset": 80
    },
    {
      "index": 4,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "answer",
      "offset": 93
    },
    {
      "index": 5,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "factor",
      "offset": 100
    }
  ],
  "functionHeader": {
    "offset": 107,
    "tag": "0xd",
    "remaining": 169
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
      "rawLength": 106,
      "actualLength": 53,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/module-exports-default.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "multiply",
      "offset": 56
    },
    {
      "index": 2,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "ultimateAnswer",
      "offset": 65
    },
    {
      "index": 3,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "namedDefault",
      "offset": 80
    },
    {
      "index": 4,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "answer",
      "offset": 93
    },
    {
      "index": 5,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "factor",
      "offset": 100
    }
  ],
  "functionHeader": {
    "offset": 107,
    "tag": "0xd",
    "remaining": 174
  }
}
```

## 字节级差异

共发现 111 个字节差异:

- 偏移量 0x87: TS=0x02 vs WASM=0x01
- 偏移量 0x8a: TS=0x1d vs WASM=0x0f
- 偏移量 0xa2: TS=0x39 vs WASM=0xbf
- 偏移量 0xa3: TS=0x48 vs WASM=0x2a
- 偏移量 0xa4: TS=0x00 vs WASM=0xe5
- 偏移量 0xa5: TS=0x00 vs WASM=0x06
- 偏移量 0xa6: TS=0x00 vs WASM=0x2f
- 偏移量 0xa7: TS=0x0e vs WASM=0xc8
- 偏移量 0xa8: TS=0x39 vs WASM=0x03
- 偏移量 0xa9: TS=0x42 vs WASM=0x02
- 偏移量 0xad: TS=0xb8 vs WASM=0x0c
- 偏移量 0xae: TS=0x9f vs WASM=0x43
- 偏移量 0xaf: TS=0x2f vs WASM=0x06
- 偏移量 0xb0: TS=0xbf vs WASM=0x01
- 偏移量 0xb1: TS=0x2a vs WASM=0xce
- 偏移量 0xb2: TS=0xe5 vs WASM=0x03
- 偏移量 0xb3: TS=0x06 vs WASM=0x01
- 偏移量 0xb4: TS=0x2f vs WASM=0x00
- 偏移量 0xb5: TS=0xc8 vs WASM=0x01
- 偏移量 0xb6: TS=0x03 vs WASM=0x02
- ... (显示前20个差异，总共111个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 06 6a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..j__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6d |piler/fixtures/m|
00000020: 6f 64 75 6c 65 2d 65 78 70 6f 72 74 73 2d 64 65 |odule-exports-de|
00000030: 66 61 75 6c 74 2e 6a 73 10 6d 75 6c 74 69 70 6c |fault.js.multipl|
00000040: 79 1c 75 6c 74 69 6d 61 74 65 41 6e 73 77 65 72 |y.ultimateAnswer|
00000050: 18 6e 61 6d 65 64 44 65 66 61 75 6c 74 0c 61 6e |.namedDefault.an|
00000060: 73 77 65 72 0c 66 61 63 74 6f 72 0d c8 03 00 03 |swer.factor.....|
00000070: 00 00 2c 00 01 ca 03 00 02 cc 03 00 00 00 0c 20 |..,............ |
00000080: 06 01 a4 01 00 00 00 02 03 02 1d 00 ce 03 00 01 |................|
00000090: ca 03 01 01 d0 03 02 0d 08 ec 08 c2 00 e3 c2 01 |................|
000000a0: e4 29 39 48 00 00 00 0e 39 42 00 00 00 b8 9f 2f |.)9H....9B...../|
000000b0: bf 2a e5 06 2f c8 03 0a 00 00 34 56 21 43 20 0c |.*../.....4V!C .|
000000c0: 07 19 00 0c 43 06 01 ce 03 01 00 01 00 00 00 01 |....C...........|
000000d0: 01 84 01 00 01 00 29 c8 03 02 00 00 00 0c 41 06 |......).......A.|
000000e0: 01 ca 03 02 00 02 02 00 00 0f 02 84 01 00 01 00 |................|
000000f0: d2 03 00 01 00 d4 11 f4 ec 06 0e b9 d8 ee 02 0e |................|
00000100: d3 d4 9c 28 c8 03 0c 04 00 02 52 3a 3f 07 10 07 |...(......R:?...|
00000110: 03 07 19 00                                     |....|
```

### WASM
```
00000000: 05 06 6a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..j__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6d |piler/fixtures/m|
00000020: 6f 64 75 6c 65 2d 65 78 70 6f 72 74 73 2d 64 65 |odule-exports-de|
00000030: 66 61 75 6c 74 2e 6a 73 10 6d 75 6c 74 69 70 6c |fault.js.multipl|
00000040: 79 1c 75 6c 74 69 6d 61 74 65 41 6e 73 77 65 72 |y.ultimateAnswer|
00000050: 18 6e 61 6d 65 64 44 65 66 61 75 6c 74 0c 61 6e |.namedDefault.an|
00000060: 73 77 65 72 0c 66 61 63 74 6f 72 0d c8 03 00 03 |swer.factor.....|
00000070: 00 00 2c 00 01 ca 03 00 02 cc 03 00 00 00 0c 20 |..,............ |
00000080: 06 01 a4 01 00 00 00 01 03 02 0f 00 ce 03 00 01 |................|
00000090: ca 03 01 01 d0 03 02 0d 08 ec 08 c2 00 e3 c2 01 |................|
000000a0: e4 29 bf 2a e5 06 2f c8 03 02 00 00 00 0c 43 06 |.).*../.......C.|
000000b0: 01 ce 03 01 00 01 02 00 00 04 01 84 01 00 01 00 |................|
000000c0: d3 b8 9f 28 c8 03 08 00 0f 03 0b 0c 0c 07 19 00 |...(............|
000000d0: 0c 41 06 01 ca 03 02 02 01 02 00 00 15 04 84 01 |.A..............|
000000e0: 00 01 00 d2 03 00 01 00 84 01 01 ff ff ff ff 0f |................|
000000f0: 20 d2 03 01 01 20 63 01 00 63 00 00 d3 cb d4 11 | .... c..c......|
00000100: f4 ec 04 0e b9 dc cc d3 d4 9c 28 c8 03 0a 04 07 |..........(.....|
00000110: 58 04 07 10 07 03 07 19 00                      |X........|
```