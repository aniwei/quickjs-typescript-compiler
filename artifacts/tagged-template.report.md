# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/tagged-template.ts
**生成时间**: 2025-12-05T10:59:11.713Z

## 大小对比

- TypeScript编译器: 235 字节
- WASM编译器: 243 字节
- 差异: -8 字节 (-3.29%)

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
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "Hello ",
      "offset": 66
    },
    {
      "index": 5,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": " world",
      "offset": 73
    },
    {
      "index": 6,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "strings",
      "offset": 80
    }
  ],
  "functionHeader": {
    "offset": 88,
    "tag": "0xd",
    "remaining": 147
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
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "strings",
      "offset": 66
    }
  ],
  "functionHeader": {
    "offset": 74,
    "tag": "0xd",
    "remaining": 169
  }
}
```

## 字节级差异

共发现 168 个字节差异:

- 偏移量 0x1: TS=0x07 vs WASM=0x05
- 偏移量 0x42: TS=0x0c vs WASM=0x0e
- 偏移量 0x43: TS=0x48 vs WASM=0x73
- 偏移量 0x44: TS=0x65 vs WASM=0x74
- 偏移量 0x45: TS=0x6c vs WASM=0x72
- 偏移量 0x46: TS=0x6c vs WASM=0x69
- 偏移量 0x47: TS=0x6f vs WASM=0x6e
- 偏移量 0x48: TS=0x20 vs WASM=0x67
- 偏移量 0x49: TS=0x0c vs WASM=0x73
- 偏移量 0x4a: TS=0x20 vs WASM=0x0d
- 偏移量 0x4b: TS=0x77 vs WASM=0xc8
- 偏移量 0x4c: TS=0x6f vs WASM=0x03
- 偏移量 0x4d: TS=0x72 vs WASM=0x00
- 偏移量 0x4e: TS=0x6c vs WASM=0x00
- 偏移量 0x4f: TS=0x64 vs WASM=0x00
- 偏移量 0x50: TS=0x0e vs WASM=0x00
- 偏移量 0x51: TS=0x73 vs WASM=0x00
- 偏移量 0x52: TS=0x74 vs WASM=0x0c
- 偏移量 0x53: TS=0x72 vs WASM=0x20
- 偏移量 0x54: TS=0x69 vs WASM=0x06
- ... (显示前20个差异，总共168个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 07 5c 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..\__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 74 |piler/fixtures/t|
00000020: 61 67 67 65 64 2d 74 65 6d 70 6c 61 74 65 2e 6a |agged-template.j|
00000030: 73 0a 6d 79 54 61 67 06 76 61 6c 0c 72 65 73 75 |s.myTag.val.resu|
00000040: 6c 74 0c 48 65 6c 6c 6f 20 0c 20 77 6f 72 6c 64 |lt.Hello . world|
00000050: 0e 73 74 72 69 6e 67 73 0d c8 03 00 00 00 00 00 |.strings........|
00000060: 0c 20 06 01 a4 01 00 03 00 03 03 01 22 03 ca 03 |. .........."...|
00000070: 00 00 00 cc 03 00 00 00 ce 03 00 00 00 ca 03 00 |................|
00000080: 01 cc 03 01 01 ce 03 02 01 08 ec 1d c2 00 e3 01 |................|
00000090: 2a 00 00 00 e4 df 04 e8 00 00 00 04 e9 00 00 00 |*...............|
000000a0: 26 02 00 e0 22 02 00 e5 29 06 2f c8 03 01 09 00 |&..."...)./.....|
000000b0: 06 02 00 00 01 00 06 01 00 0c 00 04 00 ca 03 02 |................|
000000c0: 00 02 03 00 00 12 02 d4 03 00 00 00 da 01 00 00 |................|
000000d0: 00 0d 01 00 dc 0e d3 b7 48 d4 b7 48 9f d3 b8 48 |........H..H...H|
000000e0: 9f 28 29 c8 03 01 03 00 05 01 00                |.()........|
```

### WASM
```
00000000: 05 05 5c 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..\__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 74 |piler/fixtures/t|
00000020: 61 67 67 65 64 2d 74 65 6d 70 6c 61 74 65 2e 6a |agged-template.j|
00000030: 73 0a 6d 79 54 61 67 06 76 61 6c 0c 72 65 73 75 |s.myTag.val.resu|
00000040: 6c 74 0e 73 74 72 69 6e 67 73 0d c8 03 00 00 00 |lt.strings......|
00000050: 00 00 0c 20 06 01 a4 01 00 00 00 03 03 02 14 00 |... ............|
00000060: ca 03 00 01 cc 03 01 0d ce 03 02 0d 08 ec 05 c2 |................|
00000070: 00 e3 29 bf 2a e4 df c1 01 68 01 00 f2 e5 06 2f |..).*....h...../|
00000080: c8 03 0a 00 00 00 0a 08 1e 11 1e 11 11 00 0c 41 |...............A|
00000090: 06 01 ca 03 02 00 01 03 00 00 10 02 d0 03 00 01 |................|
000000a0: 00 da 01 00 01 00 0d 01 00 d8 d3 b7 48 d4 b7 48 |............H..H|
000000b0: 9f d3 b8 48 9f 28 c8 03 14 00 00 17 16 0c 0e 07 |...H.(..........|
000000c0: 0c 0c 0c 07 0f 07 1c 0c 0e 07 11 07 3b 00 0b 02 |............;...|
000000d0: 07 0c 48 65 6c 6c 6f 20 07 0c 20 77 6f 72 6c 64 |..Hello .. world|
000000e0: 0b 02 07 0c 48 65 6c 6c 6f 20 07 0c 20 77 6f 72 |....Hello .. wor|
000000f0: 6c 64 02                                        |ld.|
```