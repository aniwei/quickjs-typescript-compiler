# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/global-functions.ts
**生成时间**: 2025-12-06T02:09:56.388Z

## 大小对比

- TypeScript编译器: 258 字节
- WASM编译器: 274 字节
- 差异: -16 字节 (-5.84%)

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
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "10",
      "offset": 71
    },
    {
      "index": 5,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "parseFloat",
      "offset": 74
    },
    {
      "index": 6,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "10.5",
      "offset": 85
    },
    {
      "index": 7,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "isNaN",
      "offset": 90
    },
    {
      "index": 8,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "isFinite",
      "offset": 96
    }
  ],
  "functionHeader": {
    "offset": 105,
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

共发现 169 个字节差异:

- 偏移量 0x1: TS=0x09 vs WASM=0x08
- 偏移量 0x47: TS=0x04 vs WASM=0x14
- 偏移量 0x48: TS=0x31 vs WASM=0x70
- 偏移量 0x49: TS=0x30 vs WASM=0x61
- 偏移量 0x4a: TS=0x14 vs WASM=0x72
- 偏移量 0x4b: TS=0x70 vs WASM=0x73
- 偏移量 0x4c: TS=0x61 vs WASM=0x65
- 偏移量 0x4d: TS=0x72 vs WASM=0x46
- 偏移量 0x4e: TS=0x73 vs WASM=0x6c
- 偏移量 0x4f: TS=0x65 vs WASM=0x6f
- 偏移量 0x50: TS=0x46 vs WASM=0x61
- 偏移量 0x51: TS=0x6c vs WASM=0x74
- 偏移量 0x52: TS=0x6f vs WASM=0x08
- 偏移量 0x53: TS=0x61 vs WASM=0x31
- 偏移量 0x54: TS=0x74 vs WASM=0x30
- 偏移量 0x55: TS=0x08 vs WASM=0x2e
- 偏移量 0x56: TS=0x31 vs WASM=0x35
- 偏移量 0x57: TS=0x30 vs WASM=0x0a
- 偏移量 0x58: TS=0x2e vs WASM=0x69
- 偏移量 0x59: TS=0x35 vs WASM=0x73
- ... (显示前20个差异，总共169个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 09 5e 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..^__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 67 |piler/fixtures/g|
00000020: 6c 6f 62 61 6c 2d 66 75 6e 63 74 69 6f 6e 73 2e |lobal-functions.|
00000030: 6a 73 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 10 70 |js.console.log.p|
00000040: 61 72 73 65 49 6e 74 04 31 30 14 70 61 72 73 65 |arseInt.10.parse|
00000050: 46 6c 6f 61 74 08 31 30 2e 35 0a 69 73 4e 61 4e |Float.10.5.isNaN|
00000060: 10 69 73 46 69 6e 69 74 65 0d c8 03 00 00 00 00 |.isFinite.......|
00000070: 00 0c 20 06 01 a4 01 00 00 00 03 00 00 6a 00 08 |.. ..........j..|
00000080: ec 02 29 39 e5 00 00 00 43 e6 00 00 00 39 e7 00 |..)9....C....9..|
00000090: 00 00 04 e8 00 00 00 f1 24 01 00 0e 39 e5 00 00 |........$...9...|
000000a0: 00 43 e6 00 00 00 39 e9 00 00 00 04 ea 00 00 00 |.C....9.........|
000000b0: f1 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 00 39 |.$...9....C....9|
000000c0: eb 00 00 00 39 92 00 00 00 f1 24 01 00 0e 39 e5 |....9.....$...9.|
000000d0: 00 00 00 43 e6 00 00 00 39 ec 00 00 00 01 64 00 |...C....9.....d.|
000000e0: 00 00 f1 24 01 00 0e 06 2f c8 03 00 14 48 0c 1b |...$..../....H..|
000000f0: 09 35 6b 34 0c 1b 0b 35 69 34 0c 1b 06 35 6e 34 |.5k4...5i4...5n4|
00000100: 0c 00                                           |..|
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