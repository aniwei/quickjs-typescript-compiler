# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/complex-mixed-operators.ts
**生成时间**: 2026-01-07T17:32:03.190Z

## 大小对比

- TypeScript编译器: 440 字节
- WASM编译器: 440 字节
- 差异: 0 字节 (0.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 6,
  "atoms": [
    {
      "index": 0,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "k",
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
      "string": "out",
      "offset": 6
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 10
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 18
    },
    {
      "index": 5,
      "rawLength": 90,
      "actualLength": 45,
      "isWideChar": 0,
      "string": "__tests__/fixtures/complex-mixed-operators.js",
      "offset": 22
    }
  ],
  "functionHeader": {
    "offset": 68,
    "tag": "0xc",
    "remaining": 372
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
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "k",
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
      "string": "out",
      "offset": 6
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 10
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 18
    },
    {
      "index": 5,
      "rawLength": 90,
      "actualLength": 45,
      "isWideChar": 0,
      "string": "__tests__/fixtures/complex-mixed-operators.js",
      "offset": 22
    }
  ],
  "functionHeader": {
    "offset": 68,
    "tag": "0xc",
    "remaining": 372
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 06 02 6b 02 65 06 6f 75 74 0e 63 6f 6e 73 6f |...k.e.out.conso|
00000010: 6c 65 06 6c 6f 67 5a 5f 5f 74 65 73 74 73 5f 5f |le.logZ__tests__|
00000020: 2f 66 69 78 74 75 72 65 73 2f 63 6f 6d 70 6c 65 |/fixtures/comple|
00000030: 78 2d 6d 69 78 65 64 2d 6f 70 65 72 61 74 6f 72 |x-mixed-operator|
00000040: 73 2e 6a 73 0c 00 06 00 a4 01 00 04 00 09 00 00 |s.js............|
00000050: 9b 02 04 a6 01 00 00 00 c8 03 02 00 20 ca 03 08 |............ ...|
00000060: 02 03 a6 01 00 01 00 40 e6 00 00 00 80 3f e6 00 |.......@.....?..|
00000070: 00 00 82 b7 3b e6 00 00 00 06 cb 63 01 00 b7 b8 |....;......c....|
00000080: b9 ba 26 04 00 7f ef de 00 cc 06 cb 6f 98 00 00 |..&.........o...|
00000090: 00 06 cb 64 01 00 11 b7 ad ec 11 39 e6 00 00 00 |...d.......9....|
000000a0: b8 9f 11 3a e6 00 00 00 cb ee 4a 11 b8 ad ec 16 |...:......J.....|
000000b0: 7d e6 00 00 00 3d 11 ed 08 0e bf 0a 16 3e ee 03 |}....=.......>..|
000000c0: 0f 0f cb ee 30 11 b9 ad ec 17 7d e6 00 00 00 3d |....0.....}....=|
000000d0: 11 b2 ec 08 0e bf 14 16 3e ee 03 0f 0f cb ee 15 |........>.......|
000000e0: 39 e6 00 00 00 0e 39 e6 00 00 00 ba 9f 11 3a e6 |9.....9.......:.|
000000f0: 00 00 00 cb 0e 06 cb 64 01 00 b9 ad ec 0b 0e 06 |.......d........|
00000100: 70 4e 00 00 00 0e ee 5e 06 cb 64 01 00 ba ad ec |pN.....^..d.....|
00000110: 0b 0e 06 70 3b 00 00 00 0e ee 53 0e 06 70 31 00 |...p;.....S..p1.|
00000120: 00 00 0e ee 41 cd 6f 22 00 00 00 39 e7 00 00 00 |....A.o"...9....|
00000130: 43 e8 00 00 00 04 19 00 00 00 c9 24 02 00 cb 0e |C..........$....|
00000140: 06 70 0d 00 00 00 0e ee 1d 70 05 00 00 00 30 c7 |.p.......p....0.|
00000150: ce 06 cb 39 e6 00 00 00 bf 64 9f 11 3a e6 00 00 |...9.....d..:...|
00000160: 00 cb ca cb 71 82 00 6c 21 ff ff ff 0e 86 39 e7 |....q..l!.....9.|
00000170: 00 00 00 43 e8 00 00 00 39 e6 00 00 00 24 01 00 |...C....9....$..|
00000180: cf 28 d2 03 32 00 00 00 2c 08 20 2c 00 20 08 50 |.(..2...,. ,. .P|
00000190: 07 87 00 73 0e 20 0a 20 08 3b 27 16 04 4f 03 16 |...s. . .;'..O..|
000001a0: 04 00 1d 08 0b 1b 0e 34 1c 07 13 7d 15 25 08 69 |.......4...}.%.i|
000001b0: 17 1b 0e 1b 0a 1b 01 00                         |........|
```

### WASM
```
00000000: 05 06 02 6b 02 65 06 6f 75 74 0e 63 6f 6e 73 6f |...k.e.out.conso|
00000010: 6c 65 06 6c 6f 67 5a 5f 5f 74 65 73 74 73 5f 5f |le.logZ__tests__|
00000020: 2f 66 69 78 74 75 72 65 73 2f 63 6f 6d 70 6c 65 |/fixtures/comple|
00000030: 78 2d 6d 69 78 65 64 2d 6f 70 65 72 61 74 6f 72 |x-mixed-operator|
00000040: 73 2e 6a 73 0c 00 06 00 a4 01 00 04 00 09 00 00 |s.js............|
00000050: 9b 02 04 a6 01 00 00 00 c8 03 02 00 20 ca 03 08 |............ ...|
00000060: 02 03 a6 01 00 01 00 40 e6 00 00 00 80 3f e6 00 |.......@.....?..|
00000070: 00 00 82 b7 3b e6 00 00 00 06 cb 63 01 00 b7 b8 |....;......c....|
00000080: b9 ba 26 04 00 7f ef de 00 cc 06 cb 6f 98 00 00 |..&.........o...|
00000090: 00 06 cb 64 01 00 11 b7 ad ec 11 39 e6 00 00 00 |...d.......9....|
000000a0: b8 9f 11 3a e6 00 00 00 cb ee 4a 11 b8 ad ec 16 |...:......J.....|
000000b0: 7d e6 00 00 00 3d 11 ed 08 0e bf 0a 16 3e ee 03 |}....=.......>..|
000000c0: 0f 0f cb ee 30 11 b9 ad ec 17 7d e6 00 00 00 3d |....0.....}....=|
000000d0: 11 b2 ec 08 0e bf 14 16 3e ee 03 0f 0f cb ee 15 |........>.......|
000000e0: 39 e6 00 00 00 0e 39 e6 00 00 00 ba 9f 11 3a e6 |9.....9.......:.|
000000f0: 00 00 00 cb 0e 06 cb 64 01 00 b9 ad ec 0b 0e 06 |.......d........|
00000100: 70 4e 00 00 00 0e ee 5e 06 cb 64 01 00 ba ad ec |pN.....^..d.....|
00000110: 0b 0e 06 70 3b 00 00 00 0e ee 53 0e 06 70 31 00 |...p;.....S..p1.|
00000120: 00 00 0e ee 41 cd 6f 22 00 00 00 39 e7 00 00 00 |....A.o"...9....|
00000130: 43 e8 00 00 00 04 19 00 00 00 c9 24 02 00 cb 0e |C..........$....|
00000140: 06 70 0d 00 00 00 0e ee 1d 70 05 00 00 00 30 c7 |.p.......p....0.|
00000150: ce 06 cb 39 e6 00 00 00 bf 64 9f 11 3a e6 00 00 |...9.....d..:...|
00000160: 00 cb ca cb 71 82 00 6c 21 ff ff ff 0e 86 39 e7 |....q..l!.....9.|
00000170: 00 00 00 43 e8 00 00 00 39 e6 00 00 00 24 01 00 |...C....9....$..|
00000180: cf 28 d2 03 32 00 00 00 2c 08 20 2c 00 20 08 50 |.(..2...,. ,. .P|
00000190: 07 87 00 73 0e 20 0a 20 08 3b 27 16 04 4f 03 16 |...s. . .;'..O..|
000001a0: 04 00 1d 08 0b 1b 0e 34 1c 07 13 7d 15 25 08 69 |.......4...}.%.i|
000001b0: 17 1b 0e 1b 0a 1b 01 00                         |........|
```