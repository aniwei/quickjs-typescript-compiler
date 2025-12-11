# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/compiler/fixtures/array-spread.ts
**生成时间**: 2025-12-11T11:32:27.893Z

## 大小对比

- TypeScript编译器: 152 字节
- WASM编译器: 154 字节
- 差异: -2 字节 (-1.30%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 5,
  "atoms": [
    {
      "index": 0,
      "rawLength": 86,
      "actualLength": 43,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/array-spread.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 46
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 48
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 50
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 58
    }
  ],
  "functionHeader": {
    "offset": 62,
    "tag": "0xd",
    "remaining": 90
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 5,
  "atoms": [
    {
      "index": 0,
      "rawLength": 86,
      "actualLength": 43,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/array-spread.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 46
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 48
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 50
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 58
    }
  ],
  "functionHeader": {
    "offset": 62,
    "tag": "0xd",
    "remaining": 92
  }
}
```

## 字节级差异

共发现 18 个字节差异:

- 偏移量 0x5d: TS=0xff vs WASM=0xec
- 偏移量 0x60: TS=0xcb vs WASM=0xb8
- 偏移量 0x61: TS=0xcc vs WASM=0xb9
- 偏移量 0x65: TS=0xf6 vs WASM=0xe3
- 偏移量 0x69: TS=0xca vs WASM=0xb7
- 偏移量 0x6a: TS=0x64 vs WASM=0x68
- 偏移量 0x6e: TS=0xcd vs WASM=0xba
- 偏移量 0x72: TS=0xf7 vs WASM=0xe4
- 偏移量 0x7d: TS=0x64 vs WASM=0x68
- 偏移量 0x80: TS=0xcc vs WASM=0xb9
- 偏移量 0x8a: TS=0x0c vs WASM=0x0e
- 偏移量 0x8f: TS=0x44 vs WASM=0x30
- 偏移量 0x91: TS=0x25 vs WASM=0x1b
- 偏移量 0x95: TS=0x2f vs WASM=0x16
- 偏移量 0x96: TS=0x01 vs WASM=0x02
- 偏移量 0x97: TS=0x00 vs WASM=0x07
- 偏移量 0x98: TS=EOF vs WASM=0x03
- 偏移量 0x99: TS=EOF vs WASM=0x00

## 十六进制转储对比

### TypeScript
```
00000000: 05 05 56 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..V__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 61 |piler/fixtures/a|
00000020: 72 72 61 79 2d 73 70 72 65 61 64 2e 6a 73 02 61 |rray-spread.js.a|
00000030: 02 62 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 |.b.console.log..|
00000040: 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 04 |....... ........|
00000050: 02 00 2c 00 ca 03 00 0d cc 03 01 0d 08 ff 02 29 |..,............)|
00000060: cb cc 26 02 00 f6 26 00 00 ca 64 00 00 54 cd 53 |..&...&...d..T.S|
00000070: 91 0e f7 39 e7 00 00 00 43 e8 00 00 00 64 01 00 |...9....C....d..|
00000080: cc 48 24 01 00 0e 06 2f c8 03 0c 00 00 49 1c 44 |.H$..../.....I.D|
00000090: 1b 25 0e 1b 0a 2f 01 00                         |.%.../..|
```

### WASM
```
00000000: 05 05 56 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..V__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 61 |piler/fixtures/a|
00000020: 72 72 61 79 2d 73 70 72 65 61 64 2e 6a 73 02 61 |rray-spread.js.a|
00000030: 02 62 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 |.b.console.log..|
00000040: 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 04 |....... ........|
00000050: 02 00 2c 00 ca 03 00 0d cc 03 01 0d 08 ec 02 29 |..,............)|
00000060: b8 b9 26 02 00 e3 26 00 00 b7 68 00 00 54 ba 53 |..&...&...h..T.S|
00000070: 91 0e e4 39 e7 00 00 00 43 e8 00 00 00 68 01 00 |...9....C....h..|
00000080: b9 48 24 01 00 0e 06 2f c8 03 0e 00 00 49 1c 30 |.H$..../.....I.0|
00000090: 1b 1b 0e 1b 0a 16 02 07 03 00                   |..........|
```