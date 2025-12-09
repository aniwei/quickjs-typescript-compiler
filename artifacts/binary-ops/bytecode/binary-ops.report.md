# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/binary-ops.ts
**生成时间**: 2025-12-09T08:59:51.363Z

## 大小对比

- TypeScript编译器: 213 字节
- WASM编译器: 213 字节
- 差异: 0 字节 (0.00%)

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
      "rawLength": 82,
      "actualLength": 41,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/binary-ops.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 44
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 52
    }
  ],
  "functionHeader": {
    "offset": 56,
    "tag": "0xd",
    "remaining": 157
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 3,
  "atoms": [
    {
      "index": 0,
      "rawLength": 82,
      "actualLength": 41,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/binary-ops.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 44
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 52
    }
  ],
  "functionHeader": {
    "offset": 56,
    "tag": "0xd",
    "remaining": 157
  }
}
```

## 字节级差异

共发现 68 个字节差异:

- 偏移量 0x50: TS=0x57 vs WASM=0x02
- 偏移量 0x51: TS=0x39 vs WASM=0x29
- 偏移量 0x52: TS=0xe5 vs WASM=0x39
- 偏移量 0x53: TS=0x00 vs WASM=0xe5
- 偏移量 0x56: TS=0x43 vs WASM=0x00
- 偏移量 0x57: TS=0xe6 vs WASM=0x43
- 偏移量 0x58: TS=0x00 vs WASM=0xe6
- 偏移量 0x5b: TS=0xb8 vs WASM=0x00
- 偏移量 0x5c: TS=0xb9 vs WASM=0xb8
- 偏移量 0x5d: TS=0x9f vs WASM=0xb9
- 偏移量 0x5e: TS=0x24 vs WASM=0x9f
- 偏移量 0x5f: TS=0x01 vs WASM=0x24
- 偏移量 0x60: TS=0x00 vs WASM=0x01
- 偏移量 0x61: TS=0x0e vs WASM=0x00
- 偏移量 0x62: TS=0x39 vs WASM=0x0e
- 偏移量 0x63: TS=0xe5 vs WASM=0x39
- 偏移量 0x64: TS=0x00 vs WASM=0xe5
- 偏移量 0x67: TS=0x43 vs WASM=0x00
- 偏移量 0x68: TS=0xe6 vs WASM=0x43
- 偏移量 0x69: TS=0x00 vs WASM=0xe6
- ... (显示前20个差异，总共68个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 03 52 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..R__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 62 |piler/fixtures/b|
00000020: 69 6e 61 72 79 2d 6f 70 73 2e 6a 73 0e 63 6f 6e |inary-ops.js.con|
00000030: 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 00 00 00 00 |sole.log........|
00000040: 0c 20 06 01 a4 01 00 00 00 04 00 00 5b 00 08 ec |. ..........[...|
00000050: 57 39 e5 00 00 00 43 e6 00 00 00 b8 b9 9f 24 01 |W9....C.......$.|
00000060: 00 0e 39 e5 00 00 00 43 e6 00 00 00 b8 b9 a0 24 |..9....C.......$|
00000070: 01 00 0e 39 e5 00 00 00 43 e6 00 00 00 b9 ba 9c |...9....C.......|
00000080: 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 00 bb b9 |$...9....C......|
00000090: 9d 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 00 bc |.$...9....C.....|
000000a0: b9 9e 24 01 00 0e 29 06 2f c8 03 28 00 00 2a 0e |..$...)./..(..*.|
000000b0: 25 0e 07 05 17 15 1b 0e 25 0e 07 05 17 15 1b 0e |%.......%.......|
000000c0: 25 0e 07 05 17 15 1b 0e 25 0e 07 05 17 15 1b 0e |%.......%.......|
000000d0: 25 0e 07 05 00                                  |%....|
```

### WASM
```
00000000: 05 03 52 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..R__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 62 |piler/fixtures/b|
00000020: 69 6e 61 72 79 2d 6f 70 73 2e 6a 73 0e 63 6f 6e |inary-ops.js.con|
00000030: 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 00 00 00 00 |sole.log........|
00000040: 0c 20 06 01 a4 01 00 00 00 04 00 00 5b 00 08 ec |. ..........[...|
00000050: 02 29 39 e5 00 00 00 43 e6 00 00 00 b8 b9 9f 24 |.)9....C.......$|
00000060: 01 00 0e 39 e5 00 00 00 43 e6 00 00 00 b8 b9 a0 |...9....C.......|
00000070: 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 00 b9 ba |$...9....C......|
00000080: 9c 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 00 bb |.$...9....C.....|
00000090: b9 9d 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 00 |..$...9....C....|
000000a0: bc b9 9e 24 01 00 0e 06 2f c8 03 28 00 00 2f 0e |...$..../..(../.|
000000b0: 25 0e 07 05 17 15 1b 0e 25 0e 07 05 17 15 1b 0e |%.......%.......|
000000c0: 25 0e 07 05 17 15 1b 0e 25 0e 07 05 17 15 1b 0e |%.......%.......|
000000d0: 25 0e 07 05 00                                  |%....|
```