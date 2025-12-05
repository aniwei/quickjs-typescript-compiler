# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/arguments-object.ts
**生成时间**: 2025-12-05T12:54:23.712Z

## 大小对比

- TypeScript编译器: 273 字节
- WASM编译器: 205 字节
- 差异: 68 字节 (33.17%)

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
      "rawLength": 230,
      "actualLength": 115,
      "isWideChar": 0,
      "string": "/Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/arguments-object.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "testArgs",
      "offset": 119
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 128
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 136
    }
  ],
  "functionHeader": {
    "offset": 140,
    "tag": "0xd",
    "remaining": 133
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
      "rawLength": 94,
      "actualLength": 47,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/arguments-object.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "testArgs",
      "offset": 50
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 59
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 67
    }
  ],
  "functionHeader": {
    "offset": 71,
    "tag": "0xd",
    "remaining": 134
  }
}
```

## 字节级差异

共发现 258 个字节差异:

- 偏移量 0x2: TS=0xe6 vs WASM=0x5e
- 偏移量 0x3: TS=0x01 vs WASM=0x5f
- 偏移量 0x4: TS=0x2f vs WASM=0x5f
- 偏移量 0x5: TS=0x55 vs WASM=0x74
- 偏移量 0x6: TS=0x73 vs WASM=0x65
- 偏移量 0x7: TS=0x65 vs WASM=0x73
- 偏移量 0x8: TS=0x72 vs WASM=0x74
- 偏移量 0xa: TS=0x2f vs WASM=0x5f
- 偏移量 0xb: TS=0x61 vs WASM=0x5f
- 偏移量 0xc: TS=0x6e vs WASM=0x2f
- 偏移量 0xd: TS=0x69 vs WASM=0x63
- 偏移量 0xe: TS=0x77 vs WASM=0x6f
- 偏移量 0xf: TS=0x65 vs WASM=0x6d
- 偏移量 0x10: TS=0x69 vs WASM=0x70
- 偏移量 0x11: TS=0x2f vs WASM=0x69
- 偏移量 0x12: TS=0x44 vs WASM=0x6c
- 偏移量 0x14: TS=0x73 vs WASM=0x72
- 偏移量 0x15: TS=0x6b vs WASM=0x2f
- 偏移量 0x16: TS=0x74 vs WASM=0x66
- 偏移量 0x17: TS=0x6f vs WASM=0x69
- ... (显示前20个差异，总共258个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 04 e6 01 2f 55 73 65 72 73 2f 61 6e 69 77 65 |..../Users/aniwe|
00000010: 69 2f 44 65 73 6b 74 6f 70 2f 77 6f 72 6b 73 70 |i/Desktop/worksp|
00000020: 61 63 65 73 2f 71 75 69 63 6b 6a 73 2d 74 79 70 |aces/quickjs-typ|
00000030: 65 73 63 72 69 70 74 2d 63 6f 6d 70 69 6c 65 72 |escript-compiler|
00000040: 5f 73 65 63 6f 6e 64 2f 5f 5f 74 65 73 74 73 5f |_second/__tests_|
00000050: 5f 2f 63 6f 6d 70 69 6c 65 72 2f 66 69 78 74 75 |_/compiler/fixtu|
00000060: 72 65 73 2f 61 72 67 75 6d 65 6e 74 73 2d 6f 62 |res/arguments-ob|
00000070: 6a 65 63 74 2e 6a 73 10 74 65 73 74 41 72 67 73 |ject.js.testArgs|
00000080: 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 |.console.log....|
00000090: 00 00 00 00 0c 20 06 01 a4 01 00 01 00 03 01 01 |..... ..........|
000000a0: 14 01 ca 03 00 00 00 ca 03 00 01 08 6c 0c 00 00 |............l...|
000000b0: 00 c2 00 e3 df b8 b9 ba 22 03 00 0e 29 06 2f c8 |........"...)./.|
000000c0: 03 01 06 00 09 05 00 01 02 00 0c 00 04 00 ca 03 |................|
000000d0: 00 00 00 03 00 00 2e 00 39 e6 00 00 00 43 e7 00 |........9....C..|
000000e0: 00 00 39 4f 00 00 00 42 30 00 00 00 24 01 00 0e |..9O...B0...$...|
000000f0: 39 e6 00 00 00 43 e7 00 00 00 39 4f 00 00 00 b7 |9....C....9O....|
00000100: 48 24 01 00 0e 29 c8 03 01 06 00 0a 02 00 18 02 |H$...)..........|
00000110: 00                                              |.|
```

### WASM
```
00000000: 05 04 5e 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..^__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 61 |piler/fixtures/a|
00000020: 72 67 75 6d 65 6e 74 73 2d 6f 62 6a 65 63 74 2e |rguments-object.|
00000030: 6a 73 10 74 65 73 74 41 72 67 73 0e 63 6f 6e 73 |js.testArgs.cons|
00000040: 6f 6c 65 06 6c 6f 67 0d c8 03 00 00 00 00 00 0c |ole.log.........|
00000050: 20 06 01 a4 01 00 00 00 04 01 01 0f 00 ca 03 00 | ...............|
00000060: 01 08 ec 05 c2 00 e3 29 df b8 b9 ba f3 0e 06 2f |.......)......./|
00000070: c8 03 08 00 00 00 07 0e 00 16 10 00 0c 43 06 01 |.............C..|
00000080: ca 03 00 01 00 04 00 00 24 01 9e 01 00 01 00 0c |........$.......|
00000090: 00 cb 39 e6 00 00 00 43 e7 00 00 00 c7 eb 24 01 |..9....C......$.|
000000a0: 00 0e 39 e6 00 00 00 43 e7 00 00 00 c7 b7 48 24 |..9....C......H$|
000000b0: 01 00 29 c8 03 16 00 00 13 04 1b 0e 1b 0a 07 12 |..).............|
000000c0: 07 13 18 15 1b 0e 1b 0a 0c 12 07 13 00          |.............|
```