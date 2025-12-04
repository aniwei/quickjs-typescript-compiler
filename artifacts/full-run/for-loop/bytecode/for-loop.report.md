# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/for-loop.ts
**生成时间**: 2025-12-04T06:33:08.035Z

## 大小对比

- TypeScript编译器: 150 字节
- WASM编译器: 139 字节
- 差异: 11 字节 (7.91%)

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
      "rawLength": 78,
      "actualLength": 39,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/for-loop.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "f_i",
      "offset": 42
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 46
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 54
    }
  ],
  "functionHeader": {
    "offset": 58,
    "tag": "0xd",
    "remaining": 92
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
      "rawLength": 78,
      "actualLength": 39,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/for-loop.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "f_i",
      "offset": 42
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 46
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 54
    }
  ],
  "functionHeader": {
    "offset": 58,
    "tag": "0xd",
    "remaining": 81
  }
}
```

## 字节级差异

共发现 67 个字节差异:

- 偏移量 0x49: TS=0x01 vs WASM=0x00
- 偏移量 0x4e: TS=0x27 vs WASM=0x21
- 偏移量 0x4f: TS=0x01 vs WASM=0x00
- 偏移量 0x52: TS=0x02 vs WASM=0x00
- 偏移量 0x53: TS=0x00 vs WASM=0x01
- 偏移量 0x54: TS=0x20 vs WASM=0x08
- 偏移量 0x55: TS=0xca vs WASM=0xec
- 偏移量 0x56: TS=0x03 vs WASM=0x02
- 偏移量 0x57: TS=0x00 vs WASM=0x29
- 偏移量 0x58: TS=0x01 vs WASM=0xb7
- 偏移量 0x59: TS=0x08 vs WASM=0xe3
- 偏移量 0x5a: TS=0xec vs WASM=0xdf
- 偏移量 0x5b: TS=0x02 vs WASM=0xbc
- 偏移量 0x5c: TS=0x29 vs WASM=0xa5
- 偏移量 0x5d: TS=0xb7 vs WASM=0xec
- 偏移量 0x5e: TS=0xe3 vs WASM=0x15
- 偏移量 0x5f: TS=0x5a vs WASM=0x39
- 偏移量 0x60: TS=0x00 vs WASM=0xe6
- 偏移量 0x62: TS=0xbc vs WASM=0x00
- 偏移量 0x63: TS=0xa5 vs WASM=0x00
- ... (显示前20个差异，总共67个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 04 4e 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..N__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 66 |piler/fixtures/f|
00000020: 6f 72 2d 6c 6f 6f 70 2e 6a 73 06 66 5f 69 0e 63 |or-loop.js.f_i.c|
00000030: 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 00 00 |onsole.log......|
00000040: 00 00 0c 20 06 01 a4 01 00 01 00 03 01 00 27 01 |... ..........'.|
00000050: ca 03 02 00 20 ca 03 00 01 08 ec 02 29 b7 e3 5a |.... .......)..Z|
00000060: 00 00 bc a5 ec 19 39 e6 00 00 00 43 e7 00 00 00 |......9....C....|
00000070: 5a 00 00 24 01 00 0e 5a 00 00 91 cb ee e2 06 2f |Z..$...Z......./|
00000080: c8 03 12 00 00 20 24 16 08 12 27 1b 0e 1b 0a 11 |..... $...'.....|
00000090: 01 15 1c 11 06 00                               |......|
```

### WASM
```
00000000: 05 04 4e 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..N__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 66 |piler/fixtures/f|
00000020: 6f 72 2d 6c 6f 6f 70 2e 6a 73 06 66 5f 69 0e 63 |or-loop.js.f_i.c|
00000030: 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 00 00 |onsole.log......|
00000040: 00 00 0c 20 06 01 a4 01 00 00 00 03 01 00 21 00 |... ..........!.|
00000050: ca 03 00 01 08 ec 02 29 b7 e3 df bc a5 ec 15 39 |.......).......9|
00000060: e6 00 00 00 43 e7 00 00 00 df 24 01 00 0e df 91 |....C.....$.....|
00000070: e3 ee e8 06 2f c8 03 12 00 00 20 24 0c 08 12 27 |..../..... $...'|
00000080: 1b 0e 1b 0a 07 01 15 1c 07 06 00                |...........|
```