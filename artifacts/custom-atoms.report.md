# 字节码分析报告

**输入文件**: /Users/weiyanhai/Desktop/workspace/quickjs-typescript-compiler/__tests__/compiler/fixtures/custom-atoms.ts
**生成时间**: 2025-10-11T18:26:02.434Z

## 大小对比

- TypeScript编译器: 167 字节
- WASM编译器: 169 字节
- 差异: -2 字节 (-1.18%)

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
    "remaining": 74
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

共发现 9 个字节差异:

- 偏移量 0x9d: TS=0x08 vs WASM=0x0a
- 偏移量 0xa0: TS=0x5e vs WASM=0x45
- 偏移量 0xa1: TS=0x0e vs WASM=0x00
- 偏移量 0xa3: TS=0x0a vs WASM=0x0e
- 偏移量 0xa4: TS=0x11 vs WASM=0x1b
- 偏移量 0xa5: TS=0x01 vs WASM=0x0a
- 偏移量 0xa6: TS=0x00 vs WASM=0x11
- 偏移量 0xa7: TS=EOF vs WASM=0x01
- 偏移量 0xa8: TS=EOF vs WASM=0x00

## 十六进制转储对比

### TypeScript
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
00000090: 00 00 68 00 00 24 01 00 0e 06 2f c8 03 08 00 00 |..h..$..../.....|
000000a0: 5e 0e 1b 0a 11 01 00                            |^......|
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