# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/throw-test.ts
**生成时间**: 2025-12-04T06:33:09.487Z

## 大小对比

- TypeScript编译器: 248 字节
- WASM编译器: 239 字节
- 差异: 9 字节 (3.77%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 7,
  "atoms": [
    {
      "index": 0,
      "rawLength": 82,
      "actualLength": 41,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/throw-test.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "testThrow",
      "offset": 44
    },
    {
      "index": 2,
      "rawLength": 40,
      "actualLength": 20,
      "isWideChar": 0,
      "string": "Something went wrong",
      "offset": 54
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "e",
      "offset": 75
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 77
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 85
    },
    {
      "index": 6,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "Caught:",
      "offset": 89
    }
  ],
  "functionHeader": {
    "offset": 97,
    "tag": "0xd",
    "remaining": 151
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 7,
  "atoms": [
    {
      "index": 0,
      "rawLength": 82,
      "actualLength": 41,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/throw-test.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "e",
      "offset": 44
    },
    {
      "index": 2,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "testThrow",
      "offset": 46
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 56
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 64
    },
    {
      "index": 5,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "Caught:",
      "offset": 68
    },
    {
      "index": 6,
      "rawLength": 40,
      "actualLength": 20,
      "isWideChar": 0,
      "string": "Something went wrong",
      "offset": 76
    }
  ],
  "functionHeader": {
    "offset": 97,
    "tag": "0xd",
    "remaining": 142
  }
}
```

## 字节级差异

共发现 172 个字节差异:

- 偏移量 0x2c: TS=0x12 vs WASM=0x02
- 偏移量 0x2d: TS=0x74 vs WASM=0x65
- 偏移量 0x2e: TS=0x65 vs WASM=0x12
- 偏移量 0x2f: TS=0x73 vs WASM=0x74
- 偏移量 0x30: TS=0x74 vs WASM=0x65
- 偏移量 0x31: TS=0x54 vs WASM=0x73
- 偏移量 0x32: TS=0x68 vs WASM=0x74
- 偏移量 0x33: TS=0x72 vs WASM=0x54
- 偏移量 0x34: TS=0x6f vs WASM=0x68
- 偏移量 0x35: TS=0x77 vs WASM=0x72
- 偏移量 0x36: TS=0x28 vs WASM=0x6f
- 偏移量 0x37: TS=0x53 vs WASM=0x77
- 偏移量 0x38: TS=0x6f vs WASM=0x0e
- 偏移量 0x39: TS=0x6d vs WASM=0x63
- 偏移量 0x3a: TS=0x65 vs WASM=0x6f
- 偏移量 0x3b: TS=0x74 vs WASM=0x6e
- 偏移量 0x3c: TS=0x68 vs WASM=0x73
- 偏移量 0x3d: TS=0x69 vs WASM=0x6f
- 偏移量 0x3e: TS=0x6e vs WASM=0x6c
- 偏移量 0x3f: TS=0x67 vs WASM=0x65
- ... (显示前20个差异，总共172个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 07 52 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..R__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 74 |piler/fixtures/t|
00000020: 68 72 6f 77 2d 74 65 73 74 2e 6a 73 12 74 65 73 |hrow-test.js.tes|
00000030: 74 54 68 72 6f 77 28 53 6f 6d 65 74 68 69 6e 67 |tThrow(Something|
00000040: 20 77 65 6e 74 20 77 72 6f 6e 67 02 65 0e 63 6f | went wrong.e.co|
00000050: 6e 73 6f 6c 65 06 6c 6f 67 0e 43 61 75 67 68 74 |nsole.log.Caught|
00000060: 3a 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 |:......... .....|
00000070: 02 00 04 01 01 2f 02 ca 03 01 00 20 ce 03 03 00 |...../..... ....|
00000080: 20 ca 03 00 01 08 ec 05 c2 00 e3 29 6f 0c 00 00 | ..........)o...|
00000090: 00 5a 00 00 f0 0e 0e ee 1a cc 39 e8 00 00 00 43 |.Z........9....C|
000000a0: e9 00 00 00 04 ea 00 00 00 5a 01 00 24 02 00 0e |.........Z..$...|
000000b0: ee 01 06 2f c8 03 10 00 00 00 0c 0c 08 11 12 22 |.../..........."|
000000c0: 11 1b 0e 34 20 11 17 00 0c 43 06 01 ca 03 00 01 |...4 ....C......|
000000d0: 00 03 00 00 15 01 e6 01 00 00 00 0c 03 5b 00 00 |.............[..|
000000e0: 39 9f 00 00 00 11 04 e6 00 00 00 21 01 00 30 29 |9..........!..0)|
000000f0: c8 03 04 01 00 03 1c 00                         |........|
```

### WASM
```
00000000: 05 07 52 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..R__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 74 |piler/fixtures/t|
00000020: 68 72 6f 77 2d 74 65 73 74 2e 6a 73 02 65 12 74 |hrow-test.js.e.t|
00000030: 65 73 74 54 68 72 6f 77 0e 63 6f 6e 73 6f 6c 65 |estThrow.console|
00000040: 06 6c 6f 67 0e 43 61 75 67 68 74 3a 28 53 6f 6d |.log.Caught:(Som|
00000050: 65 74 68 69 6e 67 20 77 65 6e 74 20 77 72 6f 6e |ething went wron|
00000060: 67 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 |g......... .....|
00000070: 01 00 05 01 01 32 01 ca 03 03 00 03 cc 03 00 01 |.....2..........|
00000080: 08 ec 05 c2 00 e3 29 6f 0a 00 00 00 df f0 0e 0e |......)o........|
00000090: ee 1f cb 6f 1b 00 00 00 39 e7 00 00 00 43 e8 00 |...o....9....C..|
000000a0: 00 00 04 e9 00 00 00 c7 24 02 00 0e 0e ee 02 30 |........$......0|
000000b0: 06 2f c8 03 10 00 00 00 0c 0c 08 07 12 3b 11 1b |./...........;..|
000000c0: 0e 34 20 07 17 00 0c 43 06 01 cc 03 00 00 00 03 |.4 ....C........|
000000d0: 00 00 0f 00 39 9f 00 00 00 11 04 ea 00 00 00 21 |....9..........!|
000000e0: 01 00 30 c8 03 08 01 00 03 1c 39 0a 11 1d 00    |..0.......9....|
```