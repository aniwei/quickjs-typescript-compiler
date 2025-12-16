# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/function-call.ts
**生成时间**: 2025-12-16T14:11:02.521Z

## 大小对比

- TypeScript编译器: 237 字节
- WASM编译器: 199 字节
- 差异: 38 字节 (19.10%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 6,
  "atoms": [
    {
      "index": 0,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "result",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 9
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 17
    },
    {
      "index": 3,
      "rawLength": 70,
      "actualLength": 35,
      "isWideChar": 0,
      "string": "__tests__/fixtures/function-call.js",
      "offset": 21
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 57
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 59
    }
  ],
  "functionHeader": {
    "offset": 61,
    "tag": "0xc",
    "remaining": 176
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 6,
  "atoms": [
    {
      "index": 0,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "result",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 9
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 17
    },
    {
      "index": 3,
      "rawLength": 70,
      "actualLength": 35,
      "isWideChar": 0,
      "string": "__tests__/fixtures/function-call.js",
      "offset": 21
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 57
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 59
    }
  ],
  "functionHeader": {
    "offset": 61,
    "tag": "0xc",
    "remaining": 138
  }
}
```

## 字节级差异

共发现 135 个字节差异:

- 偏移量 0x49: TS=0x43 vs WASM=0x3b
- 偏移量 0x51: TS=0xe4 vs WASM=0x6a
- 偏移量 0x55: TS=0x00 vs WASM=0x40
- 偏移量 0x56: TS=0xc2 vs WASM=0x40
- 偏移量 0x57: TS=0x00 vs WASM=0xe4
- 偏移量 0x58: TS=0x41 vs WASM=0x00
- 偏移量 0x59: TS=0x6a vs WASM=0x00
- 偏移量 0x5b: TS=0x00 vs WASM=0x80
- 偏移量 0x5c: TS=0x00 vs WASM=0xc2
- 偏移量 0x5e: TS=0xc2 vs WASM=0x41
- 偏移量 0x5f: TS=0x00 vs WASM=0x6a
- 偏移量 0x60: TS=0x3b vs WASM=0x00
- 偏移量 0x61: TS=0x6a vs WASM=0x00
- 偏移量 0x64: TS=0x00 vs WASM=0x3f
- 偏移量 0x65: TS=0x3f vs WASM=0xe4
- 偏移量 0x66: TS=0xe4 vs WASM=0x00
- 偏移量 0x69: TS=0x00 vs WASM=0x82
- 偏移量 0x6a: TS=0x12 vs WASM=0x39
- 偏移量 0x6b: TS=0xc2 vs WASM=0x6a
- 偏移量 0x6d: TS=0x3b vs WASM=0x00
- ... (显示前20个差异，总共135个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 06 0c 72 65 73 75 6c 74 0e 63 6f 6e 73 6f 6c |...result.consol|
00000010: 65 06 6c 6f 67 46 5f 5f 74 65 73 74 73 5f 5f 2f |e.logF__tests__/|
00000020: 66 69 78 74 75 72 65 73 2f 66 75 6e 63 74 69 6f |fixtures/functio|
00000030: 6e 2d 63 61 6c 6c 2e 6a 73 02 61 02 62 0c 00 06 |n-call.js.a.b...|
00000040: 00 a4 01 00 01 00 03 00 01 43 01 a6 01 00 00 00 |.........C......|
00000050: 40 e4 00 00 00 00 c2 00 41 6a 00 00 00 00 c2 00 |@.......Aj......|
00000060: 3b 6a 00 00 00 3f e4 00 00 00 12 c2 00 3b 6a 00 |;j...?.......;j.|
00000070: 00 00 39 6a 00 00 00 b8 b9 f2 3b e4 00 00 00 39 |..9j......;....9|
00000080: e5 00 00 00 43 e6 00 00 00 39 e4 00 00 00 24 01 |....C....9....$.|
00000090: 00 cf 28 ce 03 12 00 00 af 1a 1b 08 07 06 07 0d |..(.............|
000000a0: 07 11 1c 07 34 18 1b 17 00 0c 43 06 00 d4 01 02 |....4.....C.....|
000000b0: 00 02 00 00 00 28 02 d0 03 00 00 00 d2 03 00 00 |.....(..........|
000000c0: 00 b6 01 00 c8 20 00 00 00 ba e5 00 00 00 01 00 |..... ..........|
000000d0: c8 24 00 00 00 ba e6 00 00 00 01 00 c8 22 00 00 |.$..........."..|
000000e0: 00 9f c8 19 00 00 00 28 29 ce 03 00 00          |.......()....|
```

### WASM
```
00000000: 05 06 0c 72 65 73 75 6c 74 0e 63 6f 6e 73 6f 6c |...result.consol|
00000010: 65 06 6c 6f 67 46 5f 5f 74 65 73 74 73 5f 5f 2f |e.logF__tests__/|
00000020: 66 69 78 74 75 72 65 73 2f 66 75 6e 63 74 69 6f |fixtures/functio|
00000030: 6e 2d 63 61 6c 6c 2e 6a 73 02 61 02 62 0c 00 06 |n-call.js.a.b...|
00000040: 00 a4 01 00 01 00 03 00 01 3b 01 a6 01 00 00 00 |.........;......|
00000050: 40 6a 00 00 00 40 40 e4 00 00 00 80 c2 00 41 6a |@j...@@.......Aj|
00000060: 00 00 00 00 3f e4 00 00 00 82 39 6a 00 00 00 b8 |....?.....9j....|
00000070: b9 f2 3b e4 00 00 00 39 e5 00 00 00 43 e6 00 00 |..;....9....C...|
00000080: 00 39 e4 00 00 00 24 01 00 cf 28 ce 03 0e 00 00 |.9....$...(.....|
00000090: 87 1a 25 06 21 1f 1b 0e 1b 0a 1b 01 00 0c 43 06 |..%.!.........C.|
000000a0: 00 d4 01 02 00 02 02 00 00 04 02 d0 03 00 01 00 |................|
000000b0: d2 03 00 01 00 d3 d4 9f 28 ce 03 0a 00 00 03 16 |........(.......|
000000c0: 07 08 07 03 07 11 00                            |.......|
```