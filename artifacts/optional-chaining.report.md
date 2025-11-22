# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/compiler/fixtures/optional-chaining.ts
**生成时间**: 2025-11-22T14:52:37.877Z

## 大小对比

- TypeScript编译器: 342 字节
- WASM编译器: 344 字节
- 差异: -2 字节 (-0.58%)

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
      "rawLength": 96,
      "actualLength": 48,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/optional-chaining.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 51
    },
    {
      "index": 2,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "func",
      "offset": 55
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 60
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 62
    },
    {
      "index": 5,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 64
    },
    {
      "index": 6,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 72
    },
    {
      "index": 7,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 76
    },
    {
      "index": 8,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "d",
      "offset": 78
    }
  ],
  "functionHeader": {
    "offset": 80,
    "tag": "0xd",
    "remaining": 262
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 9,
  "atoms": [
    {
      "index": 0,
      "rawLength": 96,
      "actualLength": 48,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/optional-chaining.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 51
    },
    {
      "index": 2,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "func",
      "offset": 55
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 60
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 62
    },
    {
      "index": 5,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 64
    },
    {
      "index": 6,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 72
    },
    {
      "index": 7,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 76
    },
    {
      "index": 8,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "d",
      "offset": 78
    }
  ],
  "functionHeader": {
    "offset": 80,
    "tag": "0xd",
    "remaining": 264
  }
}
```

## 字节级差异

共发现 18 个字节差异:

- 偏移量 0x124: TS=0x30 vs WASM=0x32
- 偏移量 0x12f: TS=0x39 vs WASM=0x11
- 偏移量 0x130: TS=0x08 vs WASM=0x06
- 偏移量 0x133: TS=0x1b vs WASM=0x43
- 偏移量 0x134: TS=0x0f vs WASM=0x0d
- 偏移量 0x13b: TS=0x39 vs WASM=0x52
- 偏移量 0x13c: TS=0x0c vs WASM=0x06
- 偏移量 0x13f: TS=0x20 vs WASM=0x07
- 偏移量 0x140: TS=0x1b vs WASM=0x15
- 偏移量 0x147: TS=0x39 vs WASM=0x11
- 偏移量 0x148: TS=0x08 vs WASM=0x06
- 偏移量 0x14b: TS=0x1b vs WASM=0x43
- 偏移量 0x14c: TS=0x0f vs WASM=0x0d
- 偏移量 0x153: TS=0x3e vs WASM=0x39
- 偏移量 0x154: TS=0x01 vs WASM=0x0c
- 偏移量 0x155: TS=0x00 vs WASM=0x07
- 偏移量 0x156: TS=EOF vs WASM=0x0d
- 偏移量 0x157: TS=EOF vs WASM=0x00

## 十六进制转储对比

### TypeScript
```
00000000: 05 09 60 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..`__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6f |piler/fixtures/o|
00000020: 70 74 69 6f 6e 61 6c 2d 63 68 61 69 6e 69 6e 67 |ptional-chaining|
00000030: 2e 6a 73 06 6f 62 6a 08 66 75 6e 63 02 62 02 61 |.js.obj.func.b.a|
00000040: 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 02 63 02 64 |.console.log.c.d|
00000050: 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 |......... ......|
00000060: 00 04 02 00 b3 01 00 ca 03 00 0d cc 03 01 0d 08 |................|
00000070: ec 02 29 0b 0b b8 4e e7 00 00 00 4e e8 00 00 00 |..)...N....N....|
00000080: e3 39 e9 00 00 00 43 ea 00 00 00 68 00 00 11 b2 |.9....C....h....|
00000090: ec 05 0e 06 ee 13 42 e8 00 00 00 11 b2 ec 05 0e |......B.........|
000000a0: 06 ee 06 42 e7 00 00 00 24 01 00 0e 39 e9 00 00 |...B....$...9...|
000000b0: 00 43 ea 00 00 00 68 00 00 11 b2 ec 05 0e 06 ee |.C....h.........|
000000c0: 15 04 e8 00 00 00 48 11 b2 ec 05 0e 06 ee 07 04 |......H.........|
000000d0: e7 00 00 00 48 24 01 00 0e 39 e9 00 00 00 43 ea |....H$...9....C.|
000000e0: 00 00 00 68 00 00 11 b2 ec 05 0e 06 ee 13 42 eb |...h..........B.|
000000f0: 00 00 00 11 b2 ec 05 0e 06 ee 06 42 ec 00 00 00 |...........B....|
00000100: 24 01 00 0e 07 e4 39 e9 00 00 00 43 ea 00 00 00 |$.....9....C....|
00000110: 68 01 00 11 b2 ec 05 0e 06 ee 02 f0 24 01 00 0e |h...........$...|
00000120: 06 2f c8 03 30 00 00 00 12 0a 00 1b 0e 1b 0a 39 |./..0..........9|
00000130: 08 43 06 1b 0f 17 15 1b 0e 1b 0a 39 0c 48 0e 20 |.C.........9.H. |
00000140: 1b 17 15 1b 0e 1b 0a 39 08 43 06 1b 0f 22 15 1b |.......9.C..."..|
00000150: 0e 1b 0a 3e 01 00                               |...>..|
```

### WASM
```
00000000: 05 09 60 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..`__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6f |piler/fixtures/o|
00000020: 70 74 69 6f 6e 61 6c 2d 63 68 61 69 6e 69 6e 67 |ptional-chaining|
00000030: 2e 6a 73 06 6f 62 6a 08 66 75 6e 63 02 62 02 61 |.js.obj.func.b.a|
00000040: 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 02 63 02 64 |.console.log.c.d|
00000050: 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 |......... ......|
00000060: 00 04 02 00 b3 01 00 ca 03 00 0d cc 03 01 0d 08 |................|
00000070: ec 02 29 0b 0b b8 4e e7 00 00 00 4e e8 00 00 00 |..)...N....N....|
00000080: e3 39 e9 00 00 00 43 ea 00 00 00 68 00 00 11 b2 |.9....C....h....|
00000090: ec 05 0e 06 ee 13 42 e8 00 00 00 11 b2 ec 05 0e |......B.........|
000000a0: 06 ee 06 42 e7 00 00 00 24 01 00 0e 39 e9 00 00 |...B....$...9...|
000000b0: 00 43 ea 00 00 00 68 00 00 11 b2 ec 05 0e 06 ee |.C....h.........|
000000c0: 15 04 e8 00 00 00 48 11 b2 ec 05 0e 06 ee 07 04 |......H.........|
000000d0: e7 00 00 00 48 24 01 00 0e 39 e9 00 00 00 43 ea |....H$...9....C.|
000000e0: 00 00 00 68 00 00 11 b2 ec 05 0e 06 ee 13 42 eb |...h..........B.|
000000f0: 00 00 00 11 b2 ec 05 0e 06 ee 06 42 ec 00 00 00 |...........B....|
00000100: 24 01 00 0e 07 e4 39 e9 00 00 00 43 ea 00 00 00 |$.....9....C....|
00000110: 68 01 00 11 b2 ec 05 0e 06 ee 02 f0 24 01 00 0e |h...........$...|
00000120: 06 2f c8 03 32 00 00 00 12 0a 00 1b 0e 1b 0a 11 |./..2...........|
00000130: 06 43 06 43 0d 17 15 1b 0e 1b 0a 52 06 48 0e 07 |.C.C.......R.H..|
00000140: 15 17 15 1b 0e 1b 0a 11 06 43 06 43 0d 22 15 1b |.........C.C."..|
00000150: 0e 1b 0a 39 0c 07 0d 00                         |...9....|
```