# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/bitwise-ops.ts
**生成时间**: 2025-12-16T14:11:02.400Z

## 大小对比

- TypeScript编译器: 208 字节
- WASM编译器: 222 字节
- 差异: -14 字节 (-6.31%)

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
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 10
    },
    {
      "index": 2,
      "rawLength": 66,
      "actualLength": 33,
      "isWideChar": 0,
      "string": "__tests__/fixtures/bitwise-ops.js",
      "offset": 14
    }
  ],
  "functionHeader": {
    "offset": 48,
    "tag": "0xc",
    "remaining": 160
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
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 10
    },
    {
      "index": 2,
      "rawLength": 66,
      "actualLength": 33,
      "isWideChar": 0,
      "string": "__tests__/fixtures/bitwise-ops.js",
      "offset": 14
    }
  ],
  "functionHeader": {
    "offset": 48,
    "tag": "0xc",
    "remaining": 174
  }
}
```

## 字节级差异

共发现 46 个字节差异:

- 偏移量 0xac: TS=0x22 vs WASM=0x30
- 偏移量 0xaf: TS=0x34 vs WASM=0x1b
- 偏移量 0xb0: TS=0x18 vs WASM=0x0e
- 偏移量 0xb1: TS=0x07 vs WASM=0x25
- 偏移量 0xb2: TS=0x08 vs WASM=0x0e
- 偏移量 0xb4: TS=0x03 vs WASM=0x05
- 偏移量 0xb5: TS=0x07 vs WASM=0x17
- 偏移量 0xb6: TS=0x1b vs WASM=0x15
- 偏移量 0xb7: TS=0x17 vs WASM=0x1b
- 偏移量 0xb8: TS=0x00 vs WASM=0x0e
- 偏移量 0xb9: TS=0x34 vs WASM=0x25
- 偏移量 0xba: TS=0x18 vs WASM=0x0e
- 偏移量 0xbc: TS=0x08 vs WASM=0x05
- 偏移量 0xbd: TS=0x07 vs WASM=0x17
- 偏移量 0xbe: TS=0x03 vs WASM=0x15
- 偏移量 0xbf: TS=0x07 vs WASM=0x1b
- 偏移量 0xc0: TS=0x1b vs WASM=0x0e
- 偏移量 0xc1: TS=0x17 vs WASM=0x25
- 偏移量 0xc2: TS=0x00 vs WASM=0x0e
- 偏移量 0xc3: TS=0x34 vs WASM=0x07
- ... (显示前20个差异，总共46个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 03 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 42 5f |...console.logB_|
00000010: 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 |_tests__/fixture|
00000020: 73 2f 62 69 74 77 69 73 65 2d 6f 70 73 2e 6a 73 |s/bitwise-ops.js|
00000030: 0c 00 06 00 a4 01 00 01 00 04 00 00 67 01 a6 01 |............g...|
00000040: 00 00 00 39 e4 00 00 00 43 e5 00 00 00 b8 b9 af |...9....C.......|
00000050: 24 01 00 cb 39 e4 00 00 00 43 e5 00 00 00 b8 b9 |$...9....C......|
00000060: b1 24 01 00 cb 39 e4 00 00 00 43 e5 00 00 00 b8 |.$...9....C.....|
00000070: b9 b0 24 01 00 cb 39 e4 00 00 00 43 e5 00 00 00 |..$...9....C....|
00000080: b8 b9 a2 24 01 00 cb 39 e4 00 00 00 43 e5 00 00 |...$...9....C...|
00000090: 00 b8 b9 a3 24 01 00 cb 39 e4 00 00 00 43 e5 00 |....$...9....C..|
000000a0: 00 00 b8 b9 a4 24 01 00 cf 28 cc 03 22 00 00 34 |.....$...(.."..4|
000000b0: 18 07 08 07 03 07 1b 17 00 34 18 07 08 07 03 07 |.........4......|
000000c0: 1b 17 00 34 18 07 08 07 03 07 1b 17 00 34 18 00 |...4.........4..|
```

### WASM
```
00000000: 05 03 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 42 5f |...console.logB_|
00000010: 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 |_tests__/fixture|
00000020: 73 2f 62 69 74 77 69 73 65 2d 6f 70 73 2e 6a 73 |s/bitwise-ops.js|
00000030: 0c 00 06 00 a4 01 00 01 00 04 00 00 67 01 a6 01 |............g...|
00000040: 00 00 00 39 e4 00 00 00 43 e5 00 00 00 b8 b9 af |...9....C.......|
00000050: 24 01 00 cb 39 e4 00 00 00 43 e5 00 00 00 b8 b9 |$...9....C......|
00000060: b1 24 01 00 cb 39 e4 00 00 00 43 e5 00 00 00 b8 |.$...9....C.....|
00000070: b9 b0 24 01 00 cb 39 e4 00 00 00 43 e5 00 00 00 |..$...9....C....|
00000080: b8 b9 a2 24 01 00 cb 39 e4 00 00 00 43 e5 00 00 |...$...9....C...|
00000090: 00 b8 b9 a3 24 01 00 cb 39 e4 00 00 00 43 e5 00 |....$...9....C..|
000000a0: 00 00 b8 b9 a4 24 01 00 cf 28 cc 03 30 00 00 1b |.....$...(..0...|
000000b0: 0e 25 0e 07 05 17 15 1b 0e 25 0e 07 05 17 15 1b |.%.......%......|
000000c0: 0e 25 0e 07 05 17 15 1b 0e 25 0e 07 05 17 15 1b |.%.......%......|
000000d0: 0e 25 0e 07 05 17 15 1b 0e 25 0e 07 05 00       |.%.......%....|
```