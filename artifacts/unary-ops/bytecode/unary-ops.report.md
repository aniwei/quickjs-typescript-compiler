# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/unary-ops.ts
**生成时间**: 2025-12-16T14:11:02.605Z

## 大小对比

- TypeScript编译器: 199 字节
- WASM编译器: 206 字节
- 差异: -7 字节 (-3.40%)

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
      "rawLength": 62,
      "actualLength": 31,
      "isWideChar": 0,
      "string": "__tests__/fixtures/unary-ops.js",
      "offset": 14
    }
  ],
  "functionHeader": {
    "offset": 46,
    "tag": "0xc",
    "remaining": 153
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
      "rawLength": 62,
      "actualLength": 31,
      "isWideChar": 0,
      "string": "__tests__/fixtures/unary-ops.js",
      "offset": 14
    }
  ],
  "functionHeader": {
    "offset": 46,
    "tag": "0xc",
    "remaining": 160
  }
}
```

## 字节级差异

共发现 75 个字节差异:

- 偏移量 0x3a: TS=0x60 vs WASM=0x5f
- 偏移量 0x7b: TS=0xb8 vs WASM=0xb6
- 偏移量 0x7c: TS=0x8e vs WASM=0x24
- 偏移量 0x7d: TS=0x24 vs WASM=0x01
- 偏移量 0x7e: TS=0x01 vs WASM=0x00
- 偏移量 0x7f: TS=0x00 vs WASM=0xcb
- 偏移量 0x80: TS=0xcb vs WASM=0x39
- 偏移量 0x81: TS=0x39 vs WASM=0xe4
- 偏移量 0x82: TS=0xe4 vs WASM=0x00
- 偏移量 0x85: TS=0x00 vs WASM=0x43
- 偏移量 0x86: TS=0x43 vs WASM=0xe5
- 偏移量 0x87: TS=0xe5 vs WASM=0x00
- 偏移量 0x8a: TS=0x00 vs WASM=0xb8
- 偏移量 0x8b: TS=0xb8 vs WASM=0x99
- 偏移量 0x8c: TS=0x99 vs WASM=0x24
- 偏移量 0x8d: TS=0x24 vs WASM=0x01
- 偏移量 0x8e: TS=0x01 vs WASM=0x00
- 偏移量 0x8f: TS=0x00 vs WASM=0xcb
- 偏移量 0x90: TS=0xcb vs WASM=0x39
- 偏移量 0x91: TS=0x39 vs WASM=0xe4
- ... (显示前20个差异，总共75个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 03 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 3e 5f |...console.log>_|
00000010: 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 |_tests__/fixture|
00000020: 73 2f 75 6e 61 72 79 2d 6f 70 73 2e 6a 73 0c 00 |s/unary-ops.js..|
00000030: 06 00 a4 01 00 01 00 03 00 00 60 01 a6 01 00 00 |..........`.....|
00000040: 00 39 e4 00 00 00 43 e5 00 00 00 0a 98 24 01 00 |.9....C......$..|
00000050: cb 39 e4 00 00 00 43 e5 00 00 00 b8 97 24 01 00 |.9....C......$..|
00000060: cb 39 e4 00 00 00 43 e5 00 00 00 b8 8f 24 01 00 |.9....C......$..|
00000070: cb 39 e4 00 00 00 43 e5 00 00 00 b8 8e 24 01 00 |.9....C......$..|
00000080: cb 39 e4 00 00 00 43 e5 00 00 00 b8 99 24 01 00 |.9....C......$..|
00000090: cb 39 e4 00 00 00 43 e5 00 00 00 06 24 01 00 cf |.9....C.....$...|
000000a0: 28 cc 03 22 00 00 34 1a 07 01 07 17 17 00 34 1a |(.."..4.......4.|
000000b0: 07 01 07 17 17 00 34 1a 07 01 07 17 17 00 34 1a |......4.......4.|
000000c0: 07 01 07 17 17 00 00                            |.......|
```

### WASM
```
00000000: 05 03 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 3e 5f |...console.log>_|
00000010: 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 |_tests__/fixture|
00000020: 73 2f 75 6e 61 72 79 2d 6f 70 73 2e 6a 73 0c 00 |s/unary-ops.js..|
00000030: 06 00 a4 01 00 01 00 03 00 00 5f 01 a6 01 00 00 |.........._.....|
00000040: 00 39 e4 00 00 00 43 e5 00 00 00 0a 98 24 01 00 |.9....C......$..|
00000050: cb 39 e4 00 00 00 43 e5 00 00 00 b8 97 24 01 00 |.9....C......$..|
00000060: cb 39 e4 00 00 00 43 e5 00 00 00 b8 8f 24 01 00 |.9....C......$..|
00000070: cb 39 e4 00 00 00 43 e5 00 00 00 b6 24 01 00 cb |.9....C.....$...|
00000080: 39 e4 00 00 00 43 e5 00 00 00 b8 99 24 01 00 cb |9....C......$...|
00000090: 39 e4 00 00 00 43 e5 00 00 00 06 24 01 00 cf 28 |9....C.....$...(|
000000a0: cc 03 2a 00 00 1b 0e 25 08 17 15 1b 0e 20 0a 07 |..*....%..... ..|
000000b0: 01 17 15 1b 0e 20 0a 07 01 17 15 1b 0e 1b 0a 07 |..... ..........|
000000c0: 01 17 15 1b 0e 25 08 17 15 1b 0e 20 08 00       |.....%..... ..|
```