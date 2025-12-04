# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/custom-atoms.ts
**生成时间**: 2025-12-04T06:33:07.790Z

## 大小对比

- TypeScript编译器: 179 字节
- WASM编译器: 169 字节
- 差异: 10 字节 (5.92%)

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
    "remaining": 86
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

共发现 58 个字节差异:

- 偏移量 0x6c: TS=0x02 vs WASM=0x00
- 偏移量 0x72: TS=0x02 vs WASM=0x00
- 偏移量 0x75: TS=0x01 vs WASM=0x00
- 偏移量 0x76: TS=0x00 vs WASM=0x0d
- 偏移量 0x77: TS=0x30 vs WASM=0xcc
- 偏移量 0x78: TS=0xcc vs WASM=0x03
- 偏移量 0x79: TS=0x03 vs WASM=0x01
- 偏移量 0x7a: TS=0x01 vs WASM=0x0d
- 偏移量 0x7b: TS=0x01 vs WASM=0x08
- 偏移量 0x7c: TS=0x30 vs WASM=0xec
- 偏移量 0x7d: TS=0xca vs WASM=0x02
- 偏移量 0x7e: TS=0x03 vs WASM=0x29
- 偏移量 0x7f: TS=0x00 vs WASM=0x04
- 偏移量 0x80: TS=0x0d vs WASM=0xe7
- 偏移量 0x81: TS=0xcc vs WASM=0x00
- 偏移量 0x82: TS=0x03 vs WASM=0x00
- 偏移量 0x83: TS=0x01 vs WASM=0x00
- 偏移量 0x84: TS=0x0d vs WASM=0xe3
- 偏移量 0x85: TS=0x08 vs WASM=0xbf
- 偏移量 0x86: TS=0xec vs WASM=0x2a
- ... (显示前20个差异，总共58个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 06 56 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..V__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 75 73 74 6f 6d 2d 61 74 6f 6d 73 2e 6a 73 1c 63 |ustom-atoms.js.c|
00000030: 75 73 74 6f 6d 56 61 72 69 61 62 6c 65 1a 61 6e |ustomVariable.an|
00000040: 6f 74 68 65 72 43 75 73 74 6f 6d 0a 68 65 6c 6c |otherCustom.hell|
00000050: 6f 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 03 |o.console.log...|
00000060: 00 00 00 00 00 0c 20 06 01 a4 01 00 02 00 03 02 |...... .........|
00000070: 00 20 02 ca 03 01 00 30 cc 03 01 01 30 ca 03 00 |. .....0....0...|
00000080: 0d cc 03 01 0d 08 ec 02 29 04 e7 00 00 00 e3 bf |........).......|
00000090: 2a e4 39 e8 00 00 00 43 e9 00 00 00 64 00 00 24 |*.9....C....d..$|
000000a0: 01 00 0e 06 2f c8 03 0a 00 00 45 00 1b 0e 1b 0a |..../.....E.....|
000000b0: 11 01 00                                        |...|
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