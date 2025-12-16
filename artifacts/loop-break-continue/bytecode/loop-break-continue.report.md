# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/loop-break-continue.ts
**生成时间**: 2025-12-16T14:11:02.546Z

## 大小对比

- TypeScript编译器: 198 字节
- WASM编译器: 180 字节
- 差异: 18 字节 (10.00%)

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
      "rawLength": 82,
      "actualLength": 41,
      "isWideChar": 0,
      "string": "__tests__/fixtures/loop-break-continue.js",
      "offset": 16
    }
  ],
  "functionHeader": {
    "offset": 58,
    "tag": "0xc",
    "remaining": 140
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
      "rawLength": 82,
      "actualLength": 41,
      "isWideChar": 0,
      "string": "__tests__/fixtures/loop-break-continue.js",
      "offset": 16
    }
  ],
  "functionHeader": {
    "offset": 58,
    "tag": "0xc",
    "remaining": 122
  }
}
```

## 字节级差异

共发现 99 个字节差异:

- 偏移量 0x43: TS=0x04 vs WASM=0x03
- 偏移量 0x46: TS=0x4e vs WASM=0x40
- 偏移量 0x5f: TS=0x6c vs WASM=0xec
- 偏移量 0x60: TS=0x3e vs WASM=0x30
- 偏移量 0x61: TS=0x00 vs WASM=0x06
- 偏移量 0x62: TS=0x00 vs WASM=0xcb
- 偏移量 0x63: TS=0x00 vs WASM=0x64
- 偏移量 0x64: TS=0xee vs WASM=0x01
- 偏移量 0x65: TS=0x0f vs WASM=0x00
- 偏移量 0x66: TS=0x7a vs WASM=0xbc
- 偏移量 0x67: TS=0xe4 vs WASM=0xad
- 偏移量 0x68: TS=0x00 vs WASM=0xed
- 偏移量 0x69: TS=0x00 vs WASM=0x27
- 偏移量 0x6a: TS=0x00 vs WASM=0x06
- 偏移量 0x6b: TS=0x01 vs WASM=0xcb
- 偏移量 0x6c: TS=0x00 vs WASM=0x64
- 偏移量 0x6d: TS=0x3d vs WASM=0x01
- 偏移量 0x6e: TS=0x93 vs WASM=0x00
- 偏移量 0x6f: TS=0x19 vs WASM=0xb9
- 偏移量 0x70: TS=0x3e vs WASM=0x9e
- ... (显示前20个差异，总共99个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 04 02 69 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 |...i.console.log|
00000010: 52 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 |R__tests__/fixtu|
00000020: 72 65 73 2f 6c 6f 6f 70 2d 62 72 65 61 6b 2d 63 |res/loop-break-c|
00000030: 6f 6e 74 69 6e 75 65 2e 6a 73 0c 00 06 00 a4 01 |ontinue.js......|
00000040: 00 02 00 04 00 00 4e 02 a6 01 00 00 00 c8 03 02 |......N.........|
00000050: 00 20 06 cb 63 01 00 b7 cc 64 01 00 bf 0a a5 6c |. ..c....d.....l|
00000060: 3e 00 00 00 ee 0f 7a e4 00 00 00 01 00 3d 93 19 |>.....z......=..|
00000070: 3e 0e ee e6 06 cb 64 01 00 bc ad 6d 22 00 00 00 |>.....d....m"...|
00000080: 06 cb 64 01 00 b9 9e b7 ad ed dc 39 e5 00 00 00 |..d........9....|
00000090: 43 e6 00 00 00 64 01 00 24 01 00 0e ee c9 c7 28 |C....d..$......(|
000000a0: ce 03 22 00 00 1b 1a 07 07 07 0e 11 08 0c 03 52 |.."............R|
000000b0: 0c 2b 1f 11 0c 07 07 2d 03 11 08 07 03 07 10 07 |.+.....-........|
000000c0: 07 14 13 34 18 00                               |...4..|
```

### WASM
```
00000000: 05 04 02 69 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 |...i.console.log|
00000010: 52 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 |R__tests__/fixtu|
00000020: 72 65 73 2f 6c 6f 6f 70 2d 62 72 65 61 6b 2d 63 |res/loop-break-c|
00000030: 6f 6e 74 69 6e 75 65 2e 6a 73 0c 00 06 00 a4 01 |ontinue.js......|
00000040: 00 02 00 03 00 00 40 02 a6 01 00 00 00 c8 03 02 |......@.........|
00000050: 00 20 06 cb 63 01 00 b7 cc 64 01 00 bf 0a a5 ec |. ..c....d......|
00000060: 30 06 cb 64 01 00 bc ad ed 27 06 cb 64 01 00 b9 |0..d.....'..d...|
00000070: 9e b7 ad ed 12 39 e5 00 00 00 43 e6 00 00 00 64 |.....9....C....d|
00000080: 01 00 24 01 00 cb 64 01 00 93 65 01 00 0e ee ca |..$...d...e.....|
00000090: c7 28 ce 03 1e 00 00 25 20 1b 04 1c 13 16 04 1e |.(.....% .......|
000000a0: 03 16 04 0c 08 14 13 1b 0e 1b 0a 11 01 00 04 0d |................|
000000b0: 12 11 02 00                                     |....|
```