# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/comma-operator.ts
**生成时间**: 2025-12-04T06:33:07.446Z

## 大小对比

- TypeScript编译器: 197 字节
- WASM编译器: 169 字节
- 差异: 28 字节 (16.57%)

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
      "rawLength": 90,
      "actualLength": 45,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/comma-operator.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 48
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
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 62
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 64
    }
  ],
  "functionHeader": {
    "offset": 66,
    "tag": "0xd",
    "remaining": 131
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
      "rawLength": 90,
      "actualLength": 45,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/comma-operator.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 48
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 50
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 52
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 54
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 62
    }
  ],
  "functionHeader": {
    "offset": 66,
    "tag": "0xd",
    "remaining": 103
  }
}
```

## 字节级差异

共发现 122 个字节差异:

- 偏移量 0x32: TS=0x0e vs WASM=0x02
- 偏移量 0x33: TS=0x63 vs WASM=0x62
- 偏移量 0x34: TS=0x6f vs WASM=0x02
- 偏移量 0x35: TS=0x6e vs WASM=0x63
- 偏移量 0x36: TS=0x73 vs WASM=0x0e
- 偏移量 0x37: TS=0x6f vs WASM=0x63
- 偏移量 0x38: TS=0x6c vs WASM=0x6f
- 偏移量 0x39: TS=0x65 vs WASM=0x6e
- 偏移量 0x3a: TS=0x06 vs WASM=0x73
- 偏移量 0x3b: TS=0x6c vs WASM=0x6f
- 偏移量 0x3c: TS=0x6f vs WASM=0x6c
- 偏移量 0x3d: TS=0x67 vs WASM=0x65
- 偏移量 0x3e: TS=0x02 vs WASM=0x06
- 偏移量 0x3f: TS=0x62 vs WASM=0x6c
- 偏移量 0x40: TS=0x02 vs WASM=0x6f
- 偏移量 0x41: TS=0x63 vs WASM=0x67
- 偏移量 0x51: TS=0x03 vs WASM=0x00
- 偏移量 0x53: TS=0x05 vs WASM=0x03
- 偏移量 0x56: TS=0x34 vs WASM=0x2b
- 偏移量 0x57: TS=0x03 vs WASM=0x00
- ... (显示前20个差异，总共122个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 06 5a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..Z__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6f 6d 6d 61 2d 6f 70 65 72 61 74 6f 72 2e 6a 73 |omma-operator.js|
00000030: 02 61 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 02 62 |.a.console.log.b|
00000040: 02 63 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 |.c......... ....|
00000050: 00 03 00 05 03 00 34 03 ca 03 01 00 20 d0 03 01 |......4..... ...|
00000060: 01 20 d2 03 01 02 20 ca 03 00 01 d0 03 01 01 d2 |. .... .........|
00000070: 03 02 01 08 ec 02 29 b8 b9 e3 39 e6 00 00 00 43 |......)...9....C|
00000080: e7 00 00 00 5a 00 00 24 01 00 0e b7 e4 5a 01 00 |....Z..$.....Z..|
00000090: 11 91 d0 e5 39 e6 00 00 00 43 e7 00 00 00 5a 02 |....9....C....Z.|
000000a0: 00 24 01 00 0e 06 2f c8 03 1a 00 00 21 14 08 13 |.$..../.....!...|
000000b0: 1b 0e 1b 0a 11 01 23 03 11 02 11 04 08 17 1b 0e |......#.........|
000000c0: 1b 0a 11 01 00                                  |.....|
```

### WASM
```
00000000: 05 06 5a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..Z__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6f 6d 6d 61 2d 6f 70 65 72 61 74 6f 72 2e 6a 73 |omma-operator.js|
00000030: 02 61 02 62 02 63 0e 63 6f 6e 73 6f 6c 65 06 6c |.a.b.c.console.l|
00000040: 6f 67 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 |og......... ....|
00000050: 00 00 00 03 03 00 2b 00 ca 03 00 01 cc 03 01 01 |......+.........|
00000060: ce 03 02 01 08 ec 02 29 b9 e3 39 e8 00 00 00 43 |.......)..9....C|
00000070: e9 00 00 00 df 24 01 00 0e b7 e8 91 e8 e5 39 e8 |.....$........9.|
00000080: 00 00 00 43 e9 00 00 00 e1 24 01 00 0e 06 2f c8 |...C.....$..../.|
00000090: 03 16 00 00 21 00 1b 0e 1b 0a 07 01 1d 03 07 0a |....!...........|
000000a0: 12 1b 1b 0e 1b 0a 07 01 00                      |.........|
```