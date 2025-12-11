# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/compiler/fixtures/variables-var.ts
**生成时间**: 2025-12-11T11:32:28.183Z

## 大小对比

- TypeScript编译器: 159 字节
- WASM编译器: 155 字节
- 差异: 4 字节 (2.58%)

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
      "rawLength": 88,
      "actualLength": 44,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/variables-var.js",
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
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 49
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 51
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 59
    }
  ],
  "functionHeader": {
    "offset": 63,
    "tag": "0xd",
    "remaining": 96
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
      "rawLength": 88,
      "actualLength": 44,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/variables-var.js",
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
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 49
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 51
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 59
    }
  ],
  "functionHeader": {
    "offset": 63,
    "tag": "0xd",
    "remaining": 92
  }
}
```

## 字节级差异

共发现 52 个字节差异:

- 偏移量 0x53: TS=0x2c vs WASM=0x28
- 偏移量 0x5e: TS=0xff vs WASM=0xec
- 偏移量 0x61: TS=0xcb vs WASM=0xb8
- 偏移量 0x62: TS=0xf6 vs WASM=0xe3
- 偏移量 0x6d: TS=0x5a vs WASM=0xdf
- 偏移量 0x6e: TS=0x00 vs WASM=0x24
- 偏移量 0x6f: TS=0x00 vs WASM=0x01
- 偏移量 0x70: TS=0x24 vs WASM=0x00
- 偏移量 0x71: TS=0x01 vs WASM=0x0e
- 偏移量 0x72: TS=0x00 vs WASM=0xb9
- 偏移量 0x73: TS=0x0e vs WASM=0xe4
- 偏移量 0x74: TS=0xcc vs WASM=0x39
- 偏移量 0x75: TS=0xf7 vs WASM=0xe7
- 偏移量 0x76: TS=0x39 vs WASM=0x00
- 偏移量 0x77: TS=0xe7 vs WASM=0x00
- 偏移量 0x79: TS=0x00 vs WASM=0x43
- 偏移量 0x7a: TS=0x00 vs WASM=0xe8
- 偏移量 0x7b: TS=0x43 vs WASM=0x00
- 偏移量 0x7c: TS=0xe8 vs WASM=0x00
- 偏移量 0x7e: TS=0x00 vs WASM=0xe0
- ... (显示前20个差异，总共52个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 05 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 76 |piler/fixtures/v|
00000020: 61 72 69 61 62 6c 65 73 2d 76 61 72 2e 6a 73 02 |ariables-var.js.|
00000030: 61 02 62 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d |a.b.console.log.|
00000040: c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 |........ .......|
00000050: 03 02 00 2c 00 ca 03 00 01 cc 03 01 01 08 ff 02 |...,............|
00000060: 29 cb f6 39 e7 00 00 00 43 e8 00 00 00 5a 00 00 |)..9....C....Z..|
00000070: 24 01 00 0e cc f7 39 e7 00 00 00 43 e8 00 00 00 |$.....9....C....|
00000080: 5a 01 00 24 01 00 0e 06 2f c8 03 12 00 00 21 00 |Z..$..../.....!.|
00000090: 25 0e 1b 0a 25 01 22 15 25 0e 1b 0a 25 01 00    |%...%.".%...%..|
```

### WASM
```
00000000: 05 05 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 76 |piler/fixtures/v|
00000020: 61 72 69 61 62 6c 65 73 2d 76 61 72 2e 6a 73 02 |ariables-var.js.|
00000030: 61 02 62 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d |a.b.console.log.|
00000040: c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 |........ .......|
00000050: 03 02 00 28 00 ca 03 00 01 cc 03 01 01 08 ec 02 |...(............|
00000060: 29 b8 e3 39 e7 00 00 00 43 e8 00 00 00 df 24 01 |)..9....C.....$.|
00000070: 00 0e b9 e4 39 e7 00 00 00 43 e8 00 00 00 e0 24 |....9....C.....$|
00000080: 01 00 0e 06 2f c8 03 12 00 00 21 00 1b 0e 1b 0a |..../.....!.....|
00000090: 07 01 22 15 1b 0e 1b 0a 07 01 00                |.."........|
```