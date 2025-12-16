# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/for-loop.ts
**生成时间**: 2025-12-16T14:11:02.514Z

## 大小对比

- TypeScript编译器: 149 字节
- WASM编译器: 136 字节
- 差异: 13 字节 (9.56%)

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
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 4
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 12
    },
    {
      "index": 3,
      "rawLength": 60,
      "actualLength": 30,
      "isWideChar": 0,
      "string": "__tests__/fixtures/for-loop.js",
      "offset": 16
    }
  ],
  "functionHeader": {
    "offset": 47,
    "tag": "0xc",
    "remaining": 102
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
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 4
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 12
    },
    {
      "index": 3,
      "rawLength": 60,
      "actualLength": 30,
      "isWideChar": 0,
      "string": "__tests__/fixtures/for-loop.js",
      "offset": 16
    }
  ],
  "functionHeader": {
    "offset": 47,
    "tag": "0xc",
    "remaining": 89
  }
}
```

## 字节级差异

共发现 63 个字节差异:

- 偏移量 0x38: TS=0x04 vs WASM=0x03
- 偏移量 0x3b: TS=0x36 vs WASM=0x2b
- 偏移量 0x53: TS=0x6c vs WASM=0xec
- 偏移量 0x54: TS=0x27 vs WASM=0x1c
- 偏移量 0x55: TS=0x00 vs WASM=0x39
- 偏移量 0x56: TS=0x00 vs WASM=0xe5
- 偏移量 0x58: TS=0xee vs WASM=0x00
- 偏移量 0x59: TS=0x0f vs WASM=0x00
- 偏移量 0x5a: TS=0x7a vs WASM=0x43
- 偏移量 0x5b: TS=0xe4 vs WASM=0xe6
- 偏移量 0x5f: TS=0x01 vs WASM=0x64
- 偏移量 0x60: TS=0x00 vs WASM=0x01
- 偏移量 0x61: TS=0x3d vs WASM=0x00
- 偏移量 0x62: TS=0x93 vs WASM=0x24
- 偏移量 0x63: TS=0x19 vs WASM=0x01
- 偏移量 0x64: TS=0x3e vs WASM=0x00
- 偏移量 0x65: TS=0x0e vs WASM=0xcb
- 偏移量 0x66: TS=0xee vs WASM=0x64
- 偏移量 0x67: TS=0xe7 vs WASM=0x01
- 偏移量 0x68: TS=0x39 vs WASM=0x00
- ... (显示前20个差异，总共63个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 04 02 69 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 |...i.console.log|
00000010: 3c 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 |<__tests__/fixtu|
00000020: 72 65 73 2f 66 6f 72 2d 6c 6f 6f 70 2e 6a 73 0c |res/for-loop.js.|
00000030: 00 06 00 a4 01 00 02 00 04 00 00 36 02 a6 01 00 |...........6....|
00000040: 00 00 c8 03 02 00 20 06 cb 63 01 00 b7 cc 64 01 |...... ..c....d.|
00000050: 00 ba a5 6c 27 00 00 00 ee 0f 7a e4 00 00 00 01 |...l'.....z.....|
00000060: 00 3d 93 19 3e 0e ee e7 39 e5 00 00 00 43 e6 00 |.=..>...9....C..|
00000070: 00 00 64 01 00 24 01 00 0e ee e0 c7 28 ce 03 14 |..d..$......(...|
00000080: 00 00 1b 1a 07 07 07 0e 11 08 07 03 52 0a 21 25 |............R.!%|
00000090: 34 18 11 17 00                                  |4....|
```

### WASM
```
00000000: 05 04 02 69 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 |...i.console.log|
00000010: 3c 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 |<__tests__/fixtu|
00000020: 72 65 73 2f 66 6f 72 2d 6c 6f 6f 70 2e 6a 73 0c |res/for-loop.js.|
00000030: 00 06 00 a4 01 00 02 00 03 00 00 2b 02 a6 01 00 |...........+....|
00000040: 00 00 c8 03 02 00 20 06 cb 63 01 00 b7 cc 64 01 |...... ..c....d.|
00000050: 00 ba a5 ec 1c 39 e5 00 00 00 43 e6 00 00 00 64 |.....9....C....d|
00000060: 01 00 24 01 00 cb 64 01 00 93 65 01 00 0e ee df |..$...d...e.....|
00000070: c7 28 ce 03 12 00 00 25 20 16 04 12 1b 1b 0e 1b |.(.....% .......|
00000080: 0a 11 01 15 10 11 02 00                         |........|
```