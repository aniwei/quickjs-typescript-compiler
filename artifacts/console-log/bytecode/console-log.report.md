# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/console-log.ts
**生成时间**: 2025-12-12T09:59:18.497Z

## 大小对比

- TypeScript编译器: 108 字节
- WASM编译器: 117 字节
- 差异: -9 字节 (-7.69%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 3,
  "atoms": [
    {
      "index": 0,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "<eval>",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "_ret_",
      "offset": 9
    },
    {
      "index": 2,
      "rawLength": 66,
      "actualLength": 33,
      "isWideChar": 0,
      "string": "__tests__/fixtures/console-log.js",
      "offset": 15
    }
  ],
  "functionHeader": {
    "offset": 49,
    "tag": "0xc",
    "remaining": 59
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
      "rawLength": 66,
      "actualLength": 33,
      "isWideChar": 0,
      "string": "__tests__/fixtures/console-log.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 36
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 44
    },
    {
      "index": 3,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "Hello World",
      "offset": 48
    }
  ],
  "functionHeader": {
    "offset": 60,
    "tag": "0xd",
    "remaining": 57
  }
}
```

## 字节级差异

共发现 103 个字节差异:

- 偏移量 0x1: TS=0x03 vs WASM=0x04
- 偏移量 0x2: TS=0x0c vs WASM=0x42
- 偏移量 0x3: TS=0x3c vs WASM=0x5f
- 偏移量 0x4: TS=0x65 vs WASM=0x5f
- 偏移量 0x5: TS=0x76 vs WASM=0x74
- 偏移量 0x6: TS=0x61 vs WASM=0x65
- 偏移量 0x7: TS=0x6c vs WASM=0x73
- 偏移量 0x8: TS=0x3e vs WASM=0x74
- 偏移量 0x9: TS=0x0a vs WASM=0x73
- 偏移量 0xb: TS=0x72 vs WASM=0x5f
- 偏移量 0xc: TS=0x65 vs WASM=0x2f
- 偏移量 0xd: TS=0x74 vs WASM=0x66
- 偏移量 0xe: TS=0x5f vs WASM=0x69
- 偏移量 0xf: TS=0x42 vs WASM=0x78
- 偏移量 0x10: TS=0x5f vs WASM=0x74
- 偏移量 0x11: TS=0x5f vs WASM=0x75
- 偏移量 0x12: TS=0x74 vs WASM=0x72
- 偏移量 0x15: TS=0x74 vs WASM=0x2f
- 偏移量 0x16: TS=0x73 vs WASM=0x63
- 偏移量 0x17: TS=0x5f vs WASM=0x6f
- ... (显示前20个差异，总共103个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 03 0c 3c 65 76 61 6c 3e 0a 5f 72 65 74 5f 42 |...<eval>._ret_B|
00000010: 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 |__tests__/fixtur|
00000020: 65 73 2f 63 6f 6e 73 6f 6c 65 2d 6c 6f 67 2e 6a |es/console-log.j|
00000030: 73 0c 02 06 00 00 00 00 00 00 01 00 03 00 00 18 |s...............|
00000040: 01 01 00 00 00 00 00 00 b6 01 00 39 e6 00 00 00 |...........9....|
00000050: 43 e7 00 00 00 04 e8 00 00 00 24 01 00 de da 28 |C.........$....(|
00000060: 02 00 00 00 06 00 00 4d 18 1b 17 00             |.......M....|
```

### WASM
```
00000000: 05 04 42 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |..B__tests__/fix|
00000010: 74 75 72 65 73 2f 63 6f 6e 73 6f 6c 65 2d 6c 6f |tures/console-lo|
00000020: 67 2e 6a 73 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 |g.js.console.log|
00000030: 16 48 65 6c 6c 6f 20 57 6f 72 6c 64 0d c8 03 00 |.Hello World....|
00000040: 00 00 00 00 0c 20 06 01 a4 01 00 00 00 03 00 00 |..... ..........|
00000050: 19 00 08 ec 02 29 39 e5 00 00 00 43 e6 00 00 00 |.....)9....C....|
00000060: 04 e7 00 00 00 24 01 00 0e 06 2f c8 03 06 00 00 |.....$..../.....|
00000070: 2f 0e 34 08 00                                  |/.4..|
```