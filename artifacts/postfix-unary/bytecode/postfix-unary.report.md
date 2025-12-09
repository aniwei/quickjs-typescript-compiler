# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/postfix-unary.ts
**生成时间**: 2025-12-09T14:28:02.787Z

## 大小对比

- TypeScript编译器: 176 字节
- WASM编译器: 188 字节
- 差异: -12 字节 (-6.38%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 4,
  "atoms": [
    {
      "index": 0,
      "rawLength": 88,
      "actualLength": 44,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/postfix-unary.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 47
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 49
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 57
    }
  ],
  "functionHeader": {
    "offset": 61,
    "tag": "0xd",
    "remaining": 115
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
      "rawLength": 88,
      "actualLength": 44,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/postfix-unary.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 47
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 49
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 57
    }
  ],
  "functionHeader": {
    "offset": 61,
    "tag": "0xd",
    "remaining": 127
  }
}
```

## 字节级差异

共发现 28 个字节差异:

- 偏移量 0x9c: TS=0x12 vs WASM=0x1e
- 偏移量 0xa1: TS=0x34 vs WASM=0x1b
- 偏移量 0xa2: TS=0x18 vs WASM=0x0e
- 偏移量 0xa3: TS=0x11 vs WASM=0x1b
- 偏移量 0xa4: TS=0x02 vs WASM=0x0a
- 偏移量 0xa5: TS=0x2b vs WASM=0x11
- 偏移量 0xa6: TS=0x19 vs WASM=0x02
- 偏移量 0xa7: TS=0x34 vs WASM=0x16
- 偏移量 0xa8: TS=0x18 vs WASM=0x03
- 偏移量 0xa9: TS=0x11 vs WASM=0x17
- 偏移量 0xaa: TS=0x02 vs WASM=0x15
- 偏移量 0xab: TS=0x2b vs WASM=0x1b
- 偏移量 0xac: TS=0x19 vs WASM=0x0e
- 偏移量 0xad: TS=0x34 vs WASM=0x1b
- 偏移量 0xae: TS=0x18 vs WASM=0x0a
- 偏移量 0xaf: TS=0x00 vs WASM=0x11
- 偏移量 0xb0: TS=EOF vs WASM=0x02
- 偏移量 0xb1: TS=EOF vs WASM=0x16
- 偏移量 0xb2: TS=EOF vs WASM=0x03
- 偏移量 0xb3: TS=EOF vs WASM=0x17
- ... (显示前20个差异，总共28个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 04 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 70 |piler/fixtures/p|
00000020: 6f 73 74 66 69 78 2d 75 6e 61 72 79 2e 6a 73 02 |ostfix-unary.js.|
00000030: 61 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 03 |a.console.log...|
00000040: 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 04 01 |...... .........|
00000050: 00 43 00 ca 03 00 09 08 ec 02 29 b8 e3 39 e6 00 |.C........)..9..|
00000060: 00 00 43 e7 00 00 00 68 00 00 93 69 00 00 24 01 |..C....h...i..$.|
00000070: 00 0e 39 e6 00 00 00 43 e7 00 00 00 68 00 00 92 |..9....C....h...|
00000080: 69 00 00 24 01 00 0e 39 e6 00 00 00 43 e7 00 00 |i..$...9....C...|
00000090: 00 68 00 00 24 01 00 0e 06 2f c8 03 12 00 00 21 |.h..$..../.....!|
000000a0: 00 34 18 11 02 2b 19 34 18 11 02 2b 19 34 18 00 |.4...+.4...+.4..|
```

### WASM
```
00000000: 05 04 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 70 |piler/fixtures/p|
00000020: 6f 73 74 66 69 78 2d 75 6e 61 72 79 2e 6a 73 02 |ostfix-unary.js.|
00000030: 61 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 03 |a.console.log...|
00000040: 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 04 01 |...... .........|
00000050: 00 43 00 ca 03 00 09 08 ec 02 29 b8 e3 39 e6 00 |.C........)..9..|
00000060: 00 00 43 e7 00 00 00 68 00 00 93 69 00 00 24 01 |..C....h...i..$.|
00000070: 00 0e 39 e6 00 00 00 43 e7 00 00 00 68 00 00 92 |..9....C....h...|
00000080: 69 00 00 24 01 00 0e 39 e6 00 00 00 43 e7 00 00 |i..$...9....C...|
00000090: 00 68 00 00 24 01 00 0e 06 2f c8 03 1e 00 00 21 |.h..$..../.....!|
000000a0: 00 1b 0e 1b 0a 11 02 16 03 17 15 1b 0e 1b 0a 11 |................|
000000b0: 02 16 03 17 15 1b 0e 1b 0a 11 01 00             |............|
```