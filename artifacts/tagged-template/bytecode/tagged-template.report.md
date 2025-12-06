# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/tagged-template.ts
**生成时间**: 2025-12-06T02:09:56.520Z

## 大小对比

- TypeScript编译器: 295 字节
- WASM编译器: 294 字节
- 差异: 1 字节 (0.34%)

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
      "rawLength": 92,
      "actualLength": 46,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/tagged-template.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "myTag",
      "offset": 49
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "val",
      "offset": 55
    },
    {
      "index": 3,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "result",
      "offset": 59
    },
    {
      "index": 4,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "world",
      "offset": 66
    },
    {
      "index": 5,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "Hello ",
      "offset": 72
    },
    {
      "index": 6,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": " world",
      "offset": 79
    },
    {
      "index": 7,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "Line\nBreak",
      "offset": 86
    },
    {
      "index": 8,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "strings",
      "offset": 97
    }
  ],
  "functionHeader": {
    "offset": 105,
    "tag": "0xd",
    "remaining": 190
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
      "rawLength": 92,
      "actualLength": 46,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/tagged-template.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "myTag",
      "offset": 49
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "val",
      "offset": 55
    },
    {
      "index": 3,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "result",
      "offset": 59
    },
    {
      "index": 4,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "world",
      "offset": 66
    },
    {
      "index": 5,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "strings",
      "offset": 72
    }
  ],
  "functionHeader": {
    "offset": 80,
    "tag": "0xd",
    "remaining": 214
  }
}
```

## 字节级差异

共发现 212 个字节差异:

- 偏移量 0x1: TS=0x09 vs WASM=0x06
- 偏移量 0x48: TS=0x0c vs WASM=0x0e
- 偏移量 0x49: TS=0x48 vs WASM=0x73
- 偏移量 0x4a: TS=0x65 vs WASM=0x74
- 偏移量 0x4b: TS=0x6c vs WASM=0x72
- 偏移量 0x4c: TS=0x6c vs WASM=0x69
- 偏移量 0x4d: TS=0x6f vs WASM=0x6e
- 偏移量 0x4e: TS=0x20 vs WASM=0x67
- 偏移量 0x4f: TS=0x0c vs WASM=0x73
- 偏移量 0x50: TS=0x20 vs WASM=0x0d
- 偏移量 0x51: TS=0x77 vs WASM=0xc8
- 偏移量 0x52: TS=0x6f vs WASM=0x03
- 偏移量 0x53: TS=0x72 vs WASM=0x00
- 偏移量 0x54: TS=0x6c vs WASM=0x00
- 偏移量 0x55: TS=0x64 vs WASM=0x00
- 偏移量 0x56: TS=0x14 vs WASM=0x00
- 偏移量 0x57: TS=0x4c vs WASM=0x00
- 偏移量 0x58: TS=0x69 vs WASM=0x0c
- 偏移量 0x59: TS=0x6e vs WASM=0x20
- 偏移量 0x5a: TS=0x65 vs WASM=0x06
- ... (显示前20个差异，总共212个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 09 5c 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..\__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 74 |piler/fixtures/t|
00000020: 61 67 67 65 64 2d 74 65 6d 70 6c 61 74 65 2e 6a |agged-template.j|
00000030: 73 0a 6d 79 54 61 67 06 76 61 6c 0c 72 65 73 75 |s.myTag.val.resu|
00000040: 6c 74 0a 77 6f 72 6c 64 0c 48 65 6c 6c 6f 20 0c |lt.world.Hello .|
00000050: 20 77 6f 72 6c 64 14 4c 69 6e 65 0a 42 72 65 61 | world.Line.Brea|
00000060: 6b 0e 73 74 72 69 6e 67 73 0d c8 03 00 00 00 00 |k.strings.......|
00000070: 00 0c 20 06 01 a4 01 00 00 00 03 04 01 50 00 ca |.. ..........P..|
00000080: 03 00 01 cc 03 01 0d ce 03 02 0d e4 01 03 0d 08 |................|
00000090: ec 05 c2 00 e3 29 04 e8 00 00 00 e4 df 04 e9 00 |.....)..........|
000000a0: 00 00 04 ea 00 00 00 26 02 00 04 e9 00 00 00 04 |.......&........|
000000b0: ea 00 00 00 26 02 00 4e 72 00 00 00 68 01 00 22 |....&..Nr...h.."|
000000c0: 02 00 e5 df 04 eb 00 00 00 26 01 00 04 eb 00 00 |.........&......|
000000d0: 00 26 01 00 4e 72 00 00 00 22 01 00 e6 06 2f c8 |.&..Nr..."..../.|
000000e0: 03 00 08 00 07 04 0c 21 03 a2 0e 00 0c 40 06 00 |.......!.....@..|
000000f0: ca 03 02 00 02 03 00 00 12 02 d8 03 00 00 00 da |................|
00000100: 01 00 00 00 0d 01 00 dc 0e d3 b7 48 d4 b7 48 9f |...........H..H.|
00000110: d3 b8 48 9f 28 29 c8 03 00 0c 1c 0b 07 08 0c 05 |..H.()..........|
00000120: 07 07 11 05 07 08 00                            |.......|
```

### WASM
```
00000000: 05 06 5c 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..\__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 74 |piler/fixtures/t|
00000020: 61 67 67 65 64 2d 74 65 6d 70 6c 61 74 65 2e 6a |agged-template.j|
00000030: 73 0a 6d 79 54 61 67 06 76 61 6c 0c 72 65 73 75 |s.myTag.val.resu|
00000040: 6c 74 0a 77 6f 72 6c 64 0e 73 74 72 69 6e 67 73 |lt.world.strings|
00000050: 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 |......... ......|
00000060: 00 03 04 03 1c 00 ca 03 00 01 cc 03 01 0d ce 03 |................|
00000070: 02 0d e4 01 03 0d 08 ec 05 c2 00 e3 29 04 e8 00 |............)...|
00000080: 00 00 e4 df c1 01 68 01 00 f2 e5 df c1 02 f1 e6 |......h.........|
00000090: 06 2f c8 03 0e 00 00 00 0d 08 1e 11 1e 11 11 0d |./..............|
000000a0: 11 11 0c 00 0c 41 06 01 ca 03 02 00 01 03 00 00 |.....A..........|
000000b0: 10 02 d2 03 00 01 00 da 01 00 01 00 0d 01 00 d8 |................|
000000c0: d3 b7 48 d4 b7 48 9f d3 b8 48 9f 28 c8 03 14 00 |..H..H...H.(....|
000000d0: 00 17 16 0c 0e 07 0c 0c 0c 07 0f 07 1c 0c 0e 07 |................|
000000e0: 11 07 3b 00 0b 02 07 0c 48 65 6c 6c 6f 20 07 0c |..;.....Hello ..|
000000f0: 20 77 6f 72 6c 64 0b 02 07 0c 48 65 6c 6c 6f 20 | world....Hello |
00000100: 07 0c 20 77 6f 72 6c 64 02 0b 01 07 14 4c 69 6e |.. world.....Lin|
00000110: 65 0a 42 72 65 61 6b 0b 01 07 14 4c 69 6e 65 0a |e.Break....Line.|
00000120: 42 72 65 61 6b 02                               |Break.|
```