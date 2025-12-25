# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/try-catch-finally-throw-instanceof-new-079.ts
**生成时间**: 2025-12-25T08:56:16.857Z

## 大小对比

- TypeScript编译器: 421 字节
- WASM编译器: 421 字节
- 差异: 0 字节 (0.00%)

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
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "e",
      "offset": 4
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "C79",
      "offset": 6
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "out",
      "offset": 10
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "bad",
      "offset": 14
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "v",
      "offset": 18
    },
    {
      "index": 6,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 20
    },
    {
      "index": 7,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 28
    },
    {
      "index": 8,
      "rawLength": 128,
      "actualLength": 64,
      "isWideChar": 0,
      "string": "__tests__/fixtures/try-catch-finally-throw-instanceof-new-079.js",
      "offset": 32
    }
  ],
  "functionHeader": {
    "offset": 98,
    "tag": "0xc",
    "remaining": 323
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
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "e",
      "offset": 4
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "C79",
      "offset": 6
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "out",
      "offset": 10
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "bad",
      "offset": 14
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "v",
      "offset": 18
    },
    {
      "index": 6,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 20
    },
    {
      "index": 7,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 28
    },
    {
      "index": 8,
      "rawLength": 128,
      "actualLength": 64,
      "isWideChar": 0,
      "string": "__tests__/fixtures/try-catch-finally-throw-instanceof-new-079.js",
      "offset": 32
    }
  ],
  "functionHeader": {
    "offset": 98,
    "tag": "0xc",
    "remaining": 323
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 09 02 78 02 65 06 43 37 39 06 6f 75 74 06 62 |...x.e.C79.out.b|
00000010: 61 64 02 76 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 |ad.v.console.log|
00000020: 80 01 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 |..__tests__/fixt|
00000030: 75 72 65 73 2f 74 72 79 2d 63 61 74 63 68 2d 66 |ures/try-catch-f|
00000040: 69 6e 61 6c 6c 79 2d 74 68 72 6f 77 2d 69 6e 73 |inally-throw-ins|
00000050: 74 61 6e 63 65 6f 66 2d 6e 65 77 2d 30 37 39 2e |tanceof-new-079.|
00000060: 6a 73 0c 00 06 00 a4 01 00 04 00 04 00 01 c5 01 |js..............|
00000070: 04 a6 01 00 00 00 c8 03 02 00 30 ca 03 05 00 03 |..........0.....|
00000080: a6 01 00 01 00 40 e6 00 00 00 40 40 e7 00 00 00 |.....@....@@....|
00000090: 80 c2 00 41 e6 00 00 00 00 3f e7 00 00 00 82 b7 |...A.....?......|
000000a0: 3b e7 00 00 00 06 cb 6f 4b 00 00 00 63 01 00 39 |;......oK...c..9|
000000b0: e6 00 00 00 11 21 00 00 cc 06 cb 64 01 00 39 e6 |.....!.....d..9.|
000000c0: 00 00 00 a9 98 ec 07 04 e8 00 00 00 30 64 01 00 |............0d..|
000000d0: 42 e9 00 00 00 11 3a e7 00 00 00 cb 06 cb bf 4f |B.....:........O|
000000e0: be 9e b7 ad ec 04 bf 4f 30 0e 06 70 34 00 00 00 |.......O0..p4...|
000000f0: 0e ee 44 cd 6f 25 00 00 00 c9 99 04 48 00 00 00 |..D.o%......H...|
00000100: ad ec 06 c9 b8 9f ee 02 b6 11 3a e7 00 00 00 cb |..........:.....|
00000110: 0e 06 70 0d 00 00 00 0e ee 1d 70 05 00 00 00 30 |..p.......p....0|
00000120: c7 ce 06 cb 39 e7 00 00 00 bf 0a 9f 11 3a e7 00 |....9........:..|
00000130: 00 00 cb ca cb 71 39 ea 00 00 00 43 eb 00 00 00 |.....q9....C....|
00000140: 39 e7 00 00 00 24 01 00 cf 28 d8 03 30 00 00 00 |9....$...(..0...|
00000150: 2a 08 24 20 06 21 15 11 1a 1b 15 30 07 08 04 11 |*.$ .!.....0....|
00000160: 02 58 00 0c 08 1c 0d 5a 14 07 04 2f 20 0c 04 11 |.X.....Z.../ ...|
00000170: 0c 91 4f 25 08 3b 0f 1b 0e 1b 0a 1b 01 00 0c 43 |..O%.;.........C|
00000180: 06 00 cc 03 00 01 00 02 00 00 0b 01 10 00 01 00 |................|
00000190: 08 cb c7 bf 4f 44 e9 00 00 00 29 d8 03 06 01 00 |....OD....).....|
000001a0: 0c 22 07 08 00                                  |."...|
```

### WASM
```
00000000: 05 09 02 78 02 65 06 43 37 39 06 6f 75 74 06 62 |...x.e.C79.out.b|
00000010: 61 64 02 76 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 |ad.v.console.log|
00000020: 80 01 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 |..__tests__/fixt|
00000030: 75 72 65 73 2f 74 72 79 2d 63 61 74 63 68 2d 66 |ures/try-catch-f|
00000040: 69 6e 61 6c 6c 79 2d 74 68 72 6f 77 2d 69 6e 73 |inally-throw-ins|
00000050: 74 61 6e 63 65 6f 66 2d 6e 65 77 2d 30 37 39 2e |tanceof-new-079.|
00000060: 6a 73 0c 00 06 00 a4 01 00 04 00 04 00 01 c5 01 |js..............|
00000070: 04 a6 01 00 00 00 c8 03 02 00 30 ca 03 05 00 03 |..........0.....|
00000080: a6 01 00 01 00 40 e6 00 00 00 40 40 e7 00 00 00 |.....@....@@....|
00000090: 80 c2 00 41 e6 00 00 00 00 3f e7 00 00 00 82 b7 |...A.....?......|
000000a0: 3b e7 00 00 00 06 cb 6f 4b 00 00 00 63 01 00 39 |;......oK...c..9|
000000b0: e6 00 00 00 11 21 00 00 cc 06 cb 64 01 00 39 e6 |.....!.....d..9.|
000000c0: 00 00 00 a9 98 ec 07 04 e8 00 00 00 30 64 01 00 |............0d..|
000000d0: 42 e9 00 00 00 11 3a e7 00 00 00 cb 06 cb bf 4f |B.....:........O|
000000e0: be 9e b7 ad ec 04 bf 4f 30 0e 06 70 34 00 00 00 |.......O0..p4...|
000000f0: 0e ee 44 cd 6f 25 00 00 00 c9 99 04 48 00 00 00 |..D.o%......H...|
00000100: ad ec 06 c9 b8 9f ee 02 b6 11 3a e7 00 00 00 cb |..........:.....|
00000110: 0e 06 70 0d 00 00 00 0e ee 1d 70 05 00 00 00 30 |..p.......p....0|
00000120: c7 ce 06 cb 39 e7 00 00 00 bf 0a 9f 11 3a e7 00 |....9........:..|
00000130: 00 00 cb ca cb 71 39 ea 00 00 00 43 eb 00 00 00 |.....q9....C....|
00000140: 39 e7 00 00 00 24 01 00 cf 28 d8 03 30 00 00 00 |9....$...(..0...|
00000150: 2a 08 24 20 06 21 15 11 1a 1b 15 30 07 08 04 11 |*.$ .!.....0....|
00000160: 02 58 00 0c 08 1c 0d 5a 14 07 04 2f 20 0c 04 11 |.X.....Z.../ ...|
00000170: 0c 91 4f 25 08 3b 0f 1b 0e 1b 0a 1b 01 00 0c 43 |..O%.;.........C|
00000180: 06 00 cc 03 00 01 00 02 00 00 0b 01 10 00 01 00 |................|
00000190: 08 cb c7 bf 4f 44 e9 00 00 00 29 d8 03 06 01 00 |....OD....).....|
000001a0: 0c 22 07 08 00                                  |."...|
```