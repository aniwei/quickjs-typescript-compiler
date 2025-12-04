# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/custom-atoms.ts
**生成时间**: 2025-12-02T17:07:51.203Z

## 大小对比

- TypeScript编译器: 169 字节
- WASM编译器: 169 字节
- 差异: 0 字节 (0.00%)

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
      "rawLength": 86,
      "actualLength": 43,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/custom-atoms.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "customVariable",
      "offset": 46
    },
    {
      "index": 2,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "anotherCustom",
      "offset": 61
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 75
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 83
    },
    {
      "index": 5,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "hello",
      "offset": 87
    }
  ],
  "functionHeader": {
    "offset": 93,
    "tag": "0xd",
    "remaining": 76
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
      "rawLength": 86,
      "actualLength": 43,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/custom-atoms.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "customVariable",
      "offset": 46
    },
    {
      "index": 2,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "anotherCustom",
      "offset": 61
    },
    {
      "index": 3,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "hello",
      "offset": 75
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 81
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 89
    }
  ],
  "functionHeader": {
    "offset": 93,
    "tag": "0xd",
    "remaining": 76
  }
}
```

## 字节级差异

共发现 19 个字节差异:

- 偏移量 0x4b: TS=0x0e vs WASM=0x0a
- 偏移量 0x4c: TS=0x63 vs WASM=0x68
- 偏移量 0x4d: TS=0x6f vs WASM=0x65
- 偏移量 0x4e: TS=0x6e vs WASM=0x6c
- 偏移量 0x4f: TS=0x73 vs WASM=0x6c
- 偏移量 0x51: TS=0x6c vs WASM=0x0e
- 偏移量 0x52: TS=0x65 vs WASM=0x63
- 偏移量 0x53: TS=0x06 vs WASM=0x6f
- 偏移量 0x54: TS=0x6c vs WASM=0x6e
- 偏移量 0x55: TS=0x6f vs WASM=0x73
- 偏移量 0x56: TS=0x67 vs WASM=0x6f
- 偏移量 0x57: TS=0x0a vs WASM=0x6c
- 偏移量 0x58: TS=0x68 vs WASM=0x65
- 偏移量 0x59: TS=0x65 vs WASM=0x06
- 偏移量 0x5b: TS=0x6c vs WASM=0x6f
- 偏移量 0x5c: TS=0x6f vs WASM=0x67
- 偏移量 0x80: TS=0xe9 vs WASM=0xe7
- 偏移量 0x89: TS=0xe7 vs WASM=0xe8
- 偏移量 0x8e: TS=0xe8 vs WASM=0xe9

## 十六进制转储对比

### TypeScript
```
00000000: 05 06 56 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..V__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 75 73 74 6f 6d 2d 61 74 6f 6d 73 2e 6a 73 1c 63 |ustom-atoms.js.c|
00000030: 75 73 74 6f 6d 56 61 72 69 61 62 6c 65 1a 61 6e |ustomVariable.an|
00000040: 6f 74 68 65 72 43 75 73 74 6f 6d 0e 63 6f 6e 73 |otherCustom.cons|
00000050: 6f 6c 65 06 6c 6f 67 0a 68 65 6c 6c 6f 0d c8 03 |ole.log.hello...|
00000060: 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 03 02 |...... .........|
00000070: 00 20 00 ca 03 00 0d cc 03 01 0d 08 ec 02 29 04 |. ............).|
00000080: e9 00 00 00 e3 bf 2a e4 39 e7 00 00 00 43 e8 00 |......*.9....C..|
00000090: 00 00 68 00 00 24 01 00 0e 06 2f c8 03 0a 00 00 |..h..$..../.....|
000000a0: 45 00 1b 0e 1b 0a 11 01 00                      |E........|
```

### WASM
```
00000000: 05 06 56 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..V__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 75 73 74 6f 6d 2d 61 74 6f 6d 73 2e 6a 73 1c 63 |ustom-atoms.js.c|
00000030: 75 73 74 6f 6d 56 61 72 69 61 62 6c 65 1a 61 6e |ustomVariable.an|
00000040: 6f 74 68 65 72 43 75 73 74 6f 6d 0a 68 65 6c 6c |otherCustom.hell|
00000050: 6f 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 03 |o.console.log...|
00000060: 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 03 02 |...... .........|
00000070: 00 20 00 ca 03 00 0d cc 03 01 0d 08 ec 02 29 04 |. ............).|
00000080: e7 00 00 00 e3 bf 2a e4 39 e8 00 00 00 43 e9 00 |......*.9....C..|
00000090: 00 00 68 00 00 24 01 00 0e 06 2f c8 03 0a 00 00 |..h..$..../.....|
000000a0: 45 00 1b 0e 1b 0a 11 01 00                      |E........|
```