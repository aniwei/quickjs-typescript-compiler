# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/module-import.ts
**生成时间**: 2025-12-05T12:54:24.178Z

## 大小对比

- TypeScript编译器: 217 字节
- WASM编译器: 148 字节
- 差异: 69 字节 (46.62%)

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
      "rawLength": 224,
      "actualLength": 112,
      "isWideChar": 0,
      "string": "/Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/module-import.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "./module-export",
      "offset": 116
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 132
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 134
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 142
    }
  ],
  "functionHeader": {
    "offset": 146,
    "tag": "0xd",
    "remaining": 71
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
      "string": "__tests__/compiler/fixtures/module-import.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "./module-export",
      "offset": 47
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 63
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 65
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 73
    }
  ],
  "functionHeader": {
    "offset": 77,
    "tag": "0xd",
    "remaining": 71
  }
}
```

## 字节级差异

共发现 212 个字节差异:

- 偏移量 0x2: TS=0xe0 vs WASM=0x58
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
- ... (显示前20个差异，总共212个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 05 e0 01 2f 55 73 65 72 73 2f 61 6e 69 77 65 |..../Users/aniwe|
00000010: 69 2f 44 65 73 6b 74 6f 70 2f 77 6f 72 6b 73 70 |i/Desktop/worksp|
00000020: 61 63 65 73 2f 71 75 69 63 6b 6a 73 2d 74 79 70 |aces/quickjs-typ|
00000030: 65 73 63 72 69 70 74 2d 63 6f 6d 70 69 6c 65 72 |escript-compiler|
00000040: 5f 73 65 63 6f 6e 64 2f 5f 5f 74 65 73 74 73 5f |_second/__tests_|
00000050: 5f 2f 63 6f 6d 70 69 6c 65 72 2f 66 69 78 74 75 |_/compiler/fixtu|
00000060: 72 65 73 2f 6d 6f 64 75 6c 65 2d 69 6d 70 6f 72 |res/module-impor|
00000070: 74 2e 6a 73 1e 2e 2f 6d 6f 64 75 6c 65 2d 65 78 |t.js../module-ex|
00000080: 70 6f 72 74 02 61 0e 63 6f 6e 73 6f 6c 65 06 6c |port.a.console.l|
00000090: 6f 67 0d c8 03 01 00 00 01 00 ca 03 ca 03 cc 03 |og..............|
000000a0: cc 03 0c 20 06 01 a4 01 00 01 00 03 01 00 18 01 |... ............|
000000b0: cc 03 00 00 00 cc 03 00 01 08 6c 10 00 00 00 39 |..........l....9|
000000c0: e7 00 00 00 43 e8 00 00 00 df 24 01 00 0e 29 06 |....C.....$...).|
000000d0: 2f c8 03 01 03 00 10 01 00                      |/........|
```

### WASM
```
00000000: 05 05 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6d |piler/fixtures/m|
00000020: 6f 64 75 6c 65 2d 69 6d 70 6f 72 74 2e 6a 73 1e |odule-import.js.|
00000030: 2e 2f 6d 6f 64 75 6c 65 2d 65 78 70 6f 72 74 02 |./module-export.|
00000040: 61 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 03 |a.console.log...|
00000050: 01 ca 03 02 00 00 01 00 00 cc 03 00 00 0c 20 06 |.............. .|
00000060: 01 a4 01 00 00 00 03 01 00 17 00 cc 03 00 0c 08 |................|
00000070: ec 02 29 39 e7 00 00 00 43 e8 00 00 00 68 00 00 |..)9....C....h..|
00000080: 24 01 00 0e 06 2f c8 03 0a 00 00 17 00 1b 0e 1b |$..../..........|
00000090: 0a 11 01 00                                     |....|
```