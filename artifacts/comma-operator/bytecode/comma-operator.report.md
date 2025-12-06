# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/comma-operator.ts
**生成时间**: 2025-12-06T02:09:56.310Z

## 大小对比

- TypeScript编译器: 166 字节
- WASM编译器: 169 字节
- 差异: -3 字节 (-1.78%)

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
    "remaining": 100
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

共发现 61 个字节差异:

- 偏移量 0x56: TS=0x2d vs WASM=0x2b
- 偏移量 0x68: TS=0xb8 vs WASM=0xb9
- 偏移量 0x69: TS=0x0e vs WASM=0xe3
- 偏移量 0x6a: TS=0xb9 vs WASM=0x39
- 偏移量 0x6b: TS=0xe3 vs WASM=0xe8
- 偏移量 0x6c: TS=0x39 vs WASM=0x00
- 偏移量 0x6d: TS=0xe8 vs WASM=0x00
- 偏移量 0x6f: TS=0x00 vs WASM=0x43
- 偏移量 0x70: TS=0x00 vs WASM=0xe9
- 偏移量 0x71: TS=0x43 vs WASM=0x00
- 偏移量 0x72: TS=0xe9 vs WASM=0x00
- 偏移量 0x74: TS=0x00 vs WASM=0xdf
- 偏移量 0x75: TS=0x00 vs WASM=0x24
- 偏移量 0x76: TS=0xdf vs WASM=0x01
- 偏移量 0x77: TS=0x24 vs WASM=0x00
- 偏移量 0x78: TS=0x01 vs WASM=0x0e
- 偏移量 0x79: TS=0x00 vs WASM=0xb7
- 偏移量 0x7a: TS=0x0e vs WASM=0xe8
- 偏移量 0x7b: TS=0xb7 vs WASM=0x91
- 偏移量 0x7c: TS=0xe4 vs WASM=0xe8
- ... (显示前20个差异，总共61个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 06 5a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..Z__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6f 6d 6d 61 2d 6f 70 65 72 61 74 6f 72 2e 6a 73 |omma-operator.js|
00000030: 02 61 02 62 02 63 0e 63 6f 6e 73 6f 6c 65 06 6c |.a.b.c.console.l|
00000040: 6f 67 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 |og......... ....|
00000050: 00 00 00 03 03 00 2d 00 ca 03 00 01 cc 03 01 01 |......-.........|
00000060: ce 03 02 01 08 ec 02 29 b8 0e b9 e3 39 e8 00 00 |.......)....9...|
00000070: 00 43 e9 00 00 00 df 24 01 00 0e b7 e4 0e e0 e5 |.C.....$........|
00000080: 39 e8 00 00 00 43 e9 00 00 00 e1 24 01 00 0e 06 |9....C.....$....|
00000090: 2f c8 03 00 10 17 09 0c 03 0d 74 34 0c 1c 7c 0e |/.........t4..|.|
000000a0: 01 07 05 0d 72 00                               |....r.|
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