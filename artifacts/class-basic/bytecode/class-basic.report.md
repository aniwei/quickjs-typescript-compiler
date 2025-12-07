# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/class-basic.ts
**生成时间**: 2025-12-07T12:00:30.251Z

## 大小对比

- TypeScript编译器: 217 字节
- WASM编译器: 201 字节
- 差异: 16 字节 (7.96%)

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
      "rawLength": 84,
      "actualLength": 42,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/class-basic.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 38,
      "actualLength": 19,
      "isWideChar": 0,
      "string": "<class_fields_init>",
      "offset": 45
    },
    {
      "index": 2,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "Point",
      "offset": 65
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 71
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 73
    }
  ],
  "functionHeader": {
    "offset": 75,
    "tag": "0xd",
    "remaining": 142
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
      "rawLength": 84,
      "actualLength": 42,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/class-basic.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "Point",
      "offset": 45
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 51
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 53
    }
  ],
  "functionHeader": {
    "offset": 55,
    "tag": "0xd",
    "remaining": 146
  }
}
```

## 字节级差异

共发现 160 个字节差异:

- 偏移量 0x1: TS=0x05 vs WASM=0x04
- 偏移量 0x2d: TS=0x26 vs WASM=0x0a
- 偏移量 0x2e: TS=0x3c vs WASM=0x50
- 偏移量 0x2f: TS=0x63 vs WASM=0x6f
- 偏移量 0x30: TS=0x6c vs WASM=0x69
- 偏移量 0x31: TS=0x61 vs WASM=0x6e
- 偏移量 0x32: TS=0x73 vs WASM=0x74
- 偏移量 0x33: TS=0x73 vs WASM=0x02
- 偏移量 0x34: TS=0x5f vs WASM=0x78
- 偏移量 0x35: TS=0x66 vs WASM=0x02
- 偏移量 0x36: TS=0x69 vs WASM=0x79
- 偏移量 0x37: TS=0x65 vs WASM=0x0d
- 偏移量 0x38: TS=0x6c vs WASM=0xc8
- 偏移量 0x39: TS=0x64 vs WASM=0x03
- 偏移量 0x3a: TS=0x73 vs WASM=0x00
- 偏移量 0x3b: TS=0x5f vs WASM=0x00
- 偏移量 0x3c: TS=0x69 vs WASM=0x00
- 偏移量 0x3d: TS=0x6e vs WASM=0x00
- 偏移量 0x3e: TS=0x69 vs WASM=0x00
- 偏移量 0x3f: TS=0x74 vs WASM=0x0c
- ... (显示前20个差异，总共160个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 05 54 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..T__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6c 61 73 73 2d 62 61 73 69 63 2e 6a 73 26 3c 63 |lass-basic.js&<c|
00000030: 6c 61 73 73 5f 66 69 65 6c 64 73 5f 69 6e 69 74 |lass_fields_init|
00000040: 3e 0a 50 6f 69 6e 74 02 78 02 79 0d c8 03 00 00 |>.Point.x.y.....|
00000050: 00 00 00 0c 20 06 01 a4 01 00 00 00 02 02 01 1d |.... ...........|
00000060: 00 cc 03 00 0d ca 03 00 0d 08 ec 02 29 63 ff ff |............)c..|
00000070: 06 63 00 00 c2 00 58 e6 00 00 00 00 cb 6b 00 00 |.c....X......k..|
00000080: 5c ff ff e3 06 2f c8 03 02 00 00 00 0c 03 04 01 |\..../..........|
00000090: cc 03 02 01 02 02 01 00 23 03 ce 03 00 01 00 d0 |........#.......|
000000a0: 03 00 01 00 10 00 00 10 ca 03 01 0c 08 cb 2b 68 |..............+h|
000000b0: 00 00 11 ec 07 c7 1b 24 00 00 0e 0e d3 11 1b 44 |.......$.......D|
000000c0: e7 00 00 00 0e d4 11 1b 44 e8 00 00 00 0e 29 c8 |........D.....).|
000000d0: 03 06 00 00 54 22 30 00 00                      |....T"0..|
```

### WASM
```
00000000: 05 04 54 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..T__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6c 61 73 73 2d 62 61 73 69 63 2e 6a 73 0a 50 6f |lass-basic.js.Po|
00000030: 69 6e 74 02 78 02 79 0d c8 03 00 00 00 00 00 0c |int.x.y.........|
00000040: 20 06 01 a4 01 00 02 00 03 01 01 1d 02 ca 03 02 | ...............|
00000050: 00 30 f0 01 03 01 70 ca 03 00 09 08 ec 02 29 63 |.0....p.......)c|
00000060: 00 00 06 63 01 00 c1 00 58 e5 00 00 00 00 06 cc |...c....X.......|
00000070: 0e cf 6b 01 00 e3 06 2f c8 03 02 00 00 00 0c 42 |..k..../.......B|
00000080: 07 01 00 02 01 02 02 01 00 1e 03 cc 03 00 01 00 |................|
00000090: ce 03 00 01 00 10 00 01 00 f0 01 01 0d 08 cb 2b |...............+|
000000a0: 68 00 00 11 ec 06 c7 1b 24 00 00 0e c7 d3 44 e6 |h.......$.....D.|
000000b0: 00 00 00 c7 d4 44 e7 00 00 00 29 c8 03 0a 01 04 |.....D....).....|
000000c0: 4e 08 07 12 21 11 07 12 00                      |N...!....|
```