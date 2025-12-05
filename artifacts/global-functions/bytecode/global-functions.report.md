# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/global-functions.ts
**生成时间**: 2025-12-05T12:54:24.029Z

## 大小对比

- TypeScript编译器: 327 字节
- WASM编译器: 274 字节
- 差异: 53 字节 (19.34%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 9,
  "atoms": [
    {
      "index": 0,
      "rawLength": 230,
      "actualLength": 115,
      "isWideChar": 0,
      "string": "/Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/global-functions.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 119
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 127
    },
    {
      "index": 3,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "parseInt",
      "offset": 131
    },
    {
      "index": 4,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "10",
      "offset": 140
    },
    {
      "index": 5,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "parseFloat",
      "offset": 143
    },
    {
      "index": 6,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "10.5",
      "offset": 154
    },
    {
      "index": 7,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "isNaN",
      "offset": 159
    },
    {
      "index": 8,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "isFinite",
      "offset": 165
    }
  ],
  "functionHeader": {
    "offset": 174,
    "tag": "0xd",
    "remaining": 153
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 8,
  "atoms": [
    {
      "index": 0,
      "rawLength": 94,
      "actualLength": 47,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/global-functions.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 50
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 58
    },
    {
      "index": 3,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "parseInt",
      "offset": 62
    },
    {
      "index": 4,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "parseFloat",
      "offset": 71
    },
    {
      "index": 5,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "10.5",
      "offset": 82
    },
    {
      "index": 6,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "isNaN",
      "offset": 87
    },
    {
      "index": 7,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "isFinite",
      "offset": 93
    }
  ],
  "functionHeader": {
    "offset": 102,
    "tag": "0xd",
    "remaining": 172
  }
}
```

## 字节级差异

共发现 309 个字节差异:

- 偏移量 0x1: TS=0x09 vs WASM=0x08
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
- ... (显示前20个差异，总共309个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 09 e6 01 2f 55 73 65 72 73 2f 61 6e 69 77 65 |..../Users/aniwe|
00000010: 69 2f 44 65 73 6b 74 6f 70 2f 77 6f 72 6b 73 70 |i/Desktop/worksp|
00000020: 61 63 65 73 2f 71 75 69 63 6b 6a 73 2d 74 79 70 |aces/quickjs-typ|
00000030: 65 73 63 72 69 70 74 2d 63 6f 6d 70 69 6c 65 72 |escript-compiler|
00000040: 5f 73 65 63 6f 6e 64 2f 5f 5f 74 65 73 74 73 5f |_second/__tests_|
00000050: 5f 2f 63 6f 6d 70 69 6c 65 72 2f 66 69 78 74 75 |_/compiler/fixtu|
00000060: 72 65 73 2f 67 6c 6f 62 61 6c 2d 66 75 6e 63 74 |res/global-funct|
00000070: 69 6f 6e 73 2e 6a 73 0e 63 6f 6e 73 6f 6c 65 06 |ions.js.console.|
00000080: 6c 6f 67 10 70 61 72 73 65 49 6e 74 04 31 30 14 |log.parseInt.10.|
00000090: 70 61 72 73 65 46 6c 6f 61 74 08 31 30 2e 35 0a |parseFloat.10.5.|
000000a0: 69 73 4e 61 4e 10 69 73 46 69 6e 69 74 65 0d c8 |isNaN.isFinite..|
000000b0: 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 03 |....... ........|
000000c0: 00 00 75 00 08 6c 6d 00 00 00 39 e5 00 00 00 43 |..u..lm...9....C|
000000d0: e6 00 00 00 39 e7 00 00 00 04 e8 00 00 00 22 01 |....9.........".|
000000e0: 00 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 00 39 |.$...9....C....9|
000000f0: e9 00 00 00 04 ea 00 00 00 22 01 00 24 01 00 0e |........."..$...|
00000100: 39 e5 00 00 00 43 e6 00 00 00 39 eb 00 00 00 39 |9....C....9....9|
00000110: 92 00 00 00 22 01 00 24 01 00 0e 39 e5 00 00 00 |...."..$...9....|
00000120: 43 e6 00 00 00 39 ec 00 00 00 01 64 00 00 00 22 |C....9.....d..."|
00000130: 01 00 24 01 00 0e 29 06 2f c8 03 01 09 00 2b 01 |..$...)./.....+.|
00000140: 00 1b 01 00 1b 01 00                            |.......|
```

### WASM
```
00000000: 05 08 5e 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..^__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 67 |piler/fixtures/g|
00000020: 6c 6f 62 61 6c 2d 66 75 6e 63 74 69 6f 6e 73 2e |lobal-functions.|
00000030: 6a 73 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 10 70 |js.console.log.p|
00000040: 61 72 73 65 49 6e 74 14 70 61 72 73 65 46 6c 6f |arseInt.parseFlo|
00000050: 61 74 08 31 30 2e 35 0a 69 73 4e 61 4e 10 69 73 |at.10.5.isNaN.is|
00000060: 46 69 6e 69 74 65 0d c8 03 00 00 00 00 00 0c 20 |Finite......... |
00000070: 06 01 a4 01 00 00 00 04 00 01 64 00 08 ec 02 29 |..........d....)|
00000080: 39 e5 00 00 00 43 e6 00 00 00 39 e7 00 00 00 c1 |9....C....9.....|
00000090: 00 f1 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 00 |..$...9....C....|
000000a0: 39 e8 00 00 00 04 e9 00 00 00 f1 24 01 00 0e 39 |9..........$...9|
000000b0: e5 00 00 00 43 e6 00 00 00 39 ea 00 00 00 39 92 |....C....9....9.|
000000c0: 00 00 00 f1 24 01 00 0e 39 e5 00 00 00 43 e6 00 |....$...9....C..|
000000d0: 00 00 39 eb 00 00 00 bf 64 f1 24 01 00 0e 06 2f |..9.....d.$..../|
000000e0: c8 03 2a 00 00 2f 0e 1b 0a 25 10 07 11 17 15 1b |..*../...%......|
000000f0: 0e 1b 0a 34 14 07 15 17 15 1b 0e 1b 0a 1b 0c 1b |...4............|
00000100: 01 07 0b 17 15 1b 0e 1b 0a 25 10 07 11 00 07 04 |.........%......|
00000110: 31 30                                           |10|
```