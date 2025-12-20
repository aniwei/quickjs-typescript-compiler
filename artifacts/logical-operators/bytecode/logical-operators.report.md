# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/logical-operators.ts
**生成时间**: 2025-12-20T21:36:57.110Z

## 大小对比

- TypeScript编译器: 215 字节
- WASM编译器: 213 字节
- 差异: 2 字节 (0.94%)

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
      "rawLength": 78,
      "actualLength": 39,
      "isWideChar": 0,
      "string": "__tests__/fixtures/logical-operators.js",
      "offset": 14
    }
  ],
  "functionHeader": {
    "offset": 54,
    "tag": "0xc",
    "remaining": 161
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
      "rawLength": 78,
      "actualLength": 39,
      "isWideChar": 0,
      "string": "__tests__/fixtures/logical-operators.js",
      "offset": 14
    }
  ],
  "functionHeader": {
    "offset": 54,
    "tag": "0xc",
    "remaining": 159
  }
}
```

## 字节级差异

共发现 18 个字节差异:

- 偏移量 0xb5: TS=0x20 vs WASM=0x1e
- 偏移量 0xc6: TS=0x39 vs WASM=0x52
- 偏移量 0xc7: TS=0x1a vs WASM=0x08
- 偏移量 0xc8: TS=0x1b vs WASM=0x17
- 偏移量 0xc9: TS=0x11 vs WASM=0x15
- 偏移量 0xca: TS=0x17 vs WASM=0x1b
- 偏移量 0xcb: TS=0x15 vs WASM=0x0e
- 偏移量 0xcc: TS=0x1b vs WASM=0x39
- 偏移量 0xcd: TS=0x0e vs WASM=0x08
- 偏移量 0xce: TS=0x39 vs WASM=0x17
- 偏移量 0xcf: TS=0x08 vs WASM=0x15
- 偏移量 0xd0: TS=0x17 vs WASM=0x1b
- 偏移量 0xd1: TS=0x15 vs WASM=0x0e
- 偏移量 0xd2: TS=0x1b vs WASM=0x39
- 偏移量 0xd3: TS=0x0e vs WASM=0x08
- 偏移量 0xd4: TS=0x39 vs WASM=0x00
- 偏移量 0xd5: TS=0x08 vs WASM=EOF
- 偏移量 0xd6: TS=0x00 vs WASM=EOF

## 十六进制转储对比

### TypeScript
```
00000000: 05 03 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 4e 5f |...console.logN_|
00000010: 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 |_tests__/fixture|
00000020: 73 2f 6c 6f 67 69 63 61 6c 2d 6f 70 65 72 61 74 |s/logical-operat|
00000030: 6f 72 73 2e 6a 73 0c 00 06 00 a4 01 00 01 00 04 |ors.js..........|
00000040: 00 00 6a 01 a6 01 00 00 00 39 e4 00 00 00 43 e5 |..j......9....C.|
00000050: 00 00 00 0a 11 ec 03 0e 09 24 01 00 cb 39 e4 00 |.........$...9..|
00000060: 00 00 43 e5 00 00 00 09 11 ed 03 0e 0a 24 01 00 |..C..........$..|
00000070: cb 39 e4 00 00 00 43 e5 00 00 00 07 11 b2 ec 07 |.9....C.........|
00000080: 0e 04 16 00 00 00 24 01 00 cb 39 e4 00 00 00 43 |......$...9....C|
00000090: e5 00 00 00 b8 11 ec 03 0e b9 24 01 00 cb 39 e4 |..........$...9.|
000000a0: 00 00 00 43 e5 00 00 00 b7 11 ed 03 0e ba 24 01 |...C..........$.|
000000b0: 00 cf 28 cc 03 20 00 00 1b 0e 39 08 17 15 1b 0e |..(.. ....9.....|
000000c0: 39 08 17 15 1b 0e 39 1a 1b 11 17 15 1b 0e 39 08 |9.....9.......9.|
000000d0: 17 15 1b 0e 39 08 00                            |....9..|
```

### WASM
```
00000000: 05 03 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 4e 5f |...console.logN_|
00000010: 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 |_tests__/fixture|
00000020: 73 2f 6c 6f 67 69 63 61 6c 2d 6f 70 65 72 61 74 |s/logical-operat|
00000030: 6f 72 73 2e 6a 73 0c 00 06 00 a4 01 00 01 00 04 |ors.js..........|
00000040: 00 00 6a 01 a6 01 00 00 00 39 e4 00 00 00 43 e5 |..j......9....C.|
00000050: 00 00 00 0a 11 ec 03 0e 09 24 01 00 cb 39 e4 00 |.........$...9..|
00000060: 00 00 43 e5 00 00 00 09 11 ed 03 0e 0a 24 01 00 |..C..........$..|
00000070: cb 39 e4 00 00 00 43 e5 00 00 00 07 11 b2 ec 07 |.9....C.........|
00000080: 0e 04 16 00 00 00 24 01 00 cb 39 e4 00 00 00 43 |......$...9....C|
00000090: e5 00 00 00 b8 11 ec 03 0e b9 24 01 00 cb 39 e4 |..........$...9.|
000000a0: 00 00 00 43 e5 00 00 00 b7 11 ed 03 0e ba 24 01 |...C..........$.|
000000b0: 00 cf 28 cc 03 1e 00 00 1b 0e 39 08 17 15 1b 0e |..(.......9.....|
000000c0: 39 08 17 15 1b 0e 52 08 17 15 1b 0e 39 08 17 15 |9.....R.....9...|
000000d0: 1b 0e 39 08 00                                  |..9..|
```