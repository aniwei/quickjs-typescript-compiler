# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/array-spread.ts
**生成时间**: 2025-12-07T03:50:04.743Z

## 大小对比

- TypeScript编译器: 153 字节
- WASM编译器: 154 字节
- 差异: -1 字节 (-0.65%)

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
    "remaining": 91
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

共发现 40 个字节差异:

- 偏移量 0x4f: TS=0x06 vs WASM=0x04
- 偏移量 0x52: TS=0x2d vs WASM=0x2c
- 偏移量 0x6e: TS=0x13 vs WASM=0xba
- 偏移量 0x6f: TS=0xba vs WASM=0x53
- 偏移量 0x70: TS=0x53 vs WASM=0x91
- 偏移量 0x71: TS=0x91 vs WASM=0x0e
- 偏移量 0x72: TS=0x0e vs WASM=0xe4
- 偏移量 0x73: TS=0xe4 vs WASM=0x39
- 偏移量 0x74: TS=0x39 vs WASM=0xe7
- 偏移量 0x75: TS=0xe7 vs WASM=0x00
- 偏移量 0x78: TS=0x00 vs WASM=0x43
- 偏移量 0x79: TS=0x43 vs WASM=0xe8
- 偏移量 0x7a: TS=0xe8 vs WASM=0x00
- 偏移量 0x7d: TS=0x00 vs WASM=0x68
- 偏移量 0x7e: TS=0x68 vs WASM=0x01
- 偏移量 0x7f: TS=0x01 vs WASM=0x00
- 偏移量 0x80: TS=0x00 vs WASM=0xb9
- 偏移量 0x81: TS=0xb9 vs WASM=0x48
- 偏移量 0x82: TS=0x48 vs WASM=0x24
- 偏移量 0x83: TS=0x24 vs WASM=0x01
- ... (显示前20个差异，总共40个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 05 56 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..V__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 61 |piler/fixtures/a|
00000020: 72 72 61 79 2d 73 70 72 65 61 64 2e 6a 73 02 61 |rray-spread.js.a|
00000030: 02 62 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 |.b.console.log..|
00000040: 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 06 |....... ........|
00000050: 02 00 2d 00 ca 03 00 0d cc 03 01 0d 08 ec 02 29 |..-............)|
00000060: b8 b9 26 02 00 e3 26 00 00 b7 68 00 00 54 13 ba |..&...&...h..T..|
00000070: 53 91 0e e4 39 e7 00 00 00 43 e8 00 00 00 68 01 |S...9....C....h.|
00000080: 00 b9 48 24 01 00 0e 06 2f c8 03 0c 00 00 49 1c |..H$..../.....I.|
00000090: 35 1b 1b 0e 1b 0a 1b 01 00                      |5........|
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