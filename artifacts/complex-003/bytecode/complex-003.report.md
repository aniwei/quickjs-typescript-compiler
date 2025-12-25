# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures_generated/complex-003.ts
**生成时间**: 2025-12-25T01:17:43.768Z

## 大小对比

- TypeScript编译器: 395 字节
- WASM编译器: 395 字节
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
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "C3",
      "offset": 6
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "out",
      "offset": 9
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "bad",
      "offset": 13
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "v",
      "offset": 17
    },
    {
      "index": 6,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 19
    },
    {
      "index": 7,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 27
    },
    {
      "index": 8,
      "rawLength": 86,
      "actualLength": 43,
      "isWideChar": 0,
      "string": "__tests__/fixtures_generated/complex-003.js",
      "offset": 31
    }
  ],
  "functionHeader": {
    "offset": 75,
    "tag": "0xc",
    "remaining": 320
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
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "C3",
      "offset": 6
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "out",
      "offset": 9
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "bad",
      "offset": 13
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "v",
      "offset": 17
    },
    {
      "index": 6,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 19
    },
    {
      "index": 7,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 27
    },
    {
      "index": 8,
      "rawLength": 86,
      "actualLength": 43,
      "isWideChar": 0,
      "string": "__tests__/fixtures_generated/complex-003.js",
      "offset": 31
    }
  ],
  "functionHeader": {
    "offset": 75,
    "tag": "0xc",
    "remaining": 320
  }
}
```

## 字节级差异

共发现 2 个字节差异:

- 偏移量 0x150: TS=0x25 vs WASM=0x07
- 偏移量 0x152: TS=0x11 vs WASM=0x2f

## 十六进制转储对比

### TypeScript
```
00000000: 05 09 02 78 02 65 04 43 33 06 6f 75 74 06 62 61 |...x.e.C3.out.ba|
00000010: 64 02 76 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 56 |d.v.console.logV|
00000020: 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 |__tests__/fixtur|
00000030: 65 73 5f 67 65 6e 65 72 61 74 65 64 2f 63 6f 6d |es_generated/com|
00000040: 70 6c 65 78 2d 30 30 33 2e 6a 73 0c 00 06 00 a4 |plex-003.js.....|
00000050: 01 00 04 00 04 00 01 c3 01 04 a6 01 00 00 00 c8 |................|
00000060: 03 02 00 30 ca 03 05 00 03 a6 01 00 01 00 40 e6 |...0..........@.|
00000070: 00 00 00 40 40 e7 00 00 00 80 c2 00 41 e6 00 00 |...@@.......A...|
00000080: 00 00 3f e7 00 00 00 82 b7 3b e7 00 00 00 06 cb |..?......;......|
00000090: 6f 49 00 00 00 63 01 00 39 e6 00 00 00 11 21 00 |oI...c..9.....!.|
000000a0: 00 cc 06 cb 64 01 00 39 e6 00 00 00 a9 98 ec 07 |....d..9........|
000000b0: 04 e8 00 00 00 30 64 01 00 42 e9 00 00 00 11 3a |.....0d..B.....:|
000000c0: e7 00 00 00 cb 06 cb ba be 9e b7 ad ec 03 ba 30 |...............0|
000000d0: 0e 06 70 34 00 00 00 0e ee 44 cd 6f 25 00 00 00 |..p4.....D.o%...|
000000e0: c9 99 04 48 00 00 00 ad ec 06 c9 b8 9f ee 02 b6 |...H............|
000000f0: 11 3a e7 00 00 00 cb 0e 06 70 0d 00 00 00 0e ee |.:.......p......|
00000100: 1d 70 05 00 00 00 30 c7 ce 06 cb 39 e7 00 00 00 |.p....0....9....|
00000110: bf 0a 9f 11 3a e7 00 00 00 cb ca cb 71 39 ea 00 |....:.......q9..|
00000120: 00 00 43 eb 00 00 00 39 e7 00 00 00 24 01 00 cf |..C....9....$...|
00000130: 28 d8 03 30 00 00 00 2a 08 24 20 04 21 13 11 1a |(..0...*.$ .!...|
00000140: 1b 15 30 07 08 04 11 02 53 01 0c 08 17 0b 5a 14 |..0.....S.....Z.|
00000150: 25 04 11 20 0c 04 11 0c 91 4f 25 08 3b 0f 1b 0e |%.. .....O%.;...|
00000160: 1b 0a 1b 01 00 0c 43 06 00 cc 03 00 01 00 02 00 |......C.........|
00000170: 00 0a 01 10 00 01 00 08 cb c7 ba 44 e9 00 00 00 |...........D....|
00000180: 29 d8 03 06 01 00 0c 20 07 08 00                |)...... ...|
```

### WASM
```
00000000: 05 09 02 78 02 65 04 43 33 06 6f 75 74 06 62 61 |...x.e.C3.out.ba|
00000010: 64 02 76 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 56 |d.v.console.logV|
00000020: 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 |__tests__/fixtur|
00000030: 65 73 5f 67 65 6e 65 72 61 74 65 64 2f 63 6f 6d |es_generated/com|
00000040: 70 6c 65 78 2d 30 30 33 2e 6a 73 0c 00 06 00 a4 |plex-003.js.....|
00000050: 01 00 04 00 04 00 01 c3 01 04 a6 01 00 00 00 c8 |................|
00000060: 03 02 00 30 ca 03 05 00 03 a6 01 00 01 00 40 e6 |...0..........@.|
00000070: 00 00 00 40 40 e7 00 00 00 80 c2 00 41 e6 00 00 |...@@.......A...|
00000080: 00 00 3f e7 00 00 00 82 b7 3b e7 00 00 00 06 cb |..?......;......|
00000090: 6f 49 00 00 00 63 01 00 39 e6 00 00 00 11 21 00 |oI...c..9.....!.|
000000a0: 00 cc 06 cb 64 01 00 39 e6 00 00 00 a9 98 ec 07 |....d..9........|
000000b0: 04 e8 00 00 00 30 64 01 00 42 e9 00 00 00 11 3a |.....0d..B.....:|
000000c0: e7 00 00 00 cb 06 cb ba be 9e b7 ad ec 03 ba 30 |...............0|
000000d0: 0e 06 70 34 00 00 00 0e ee 44 cd 6f 25 00 00 00 |..p4.....D.o%...|
000000e0: c9 99 04 48 00 00 00 ad ec 06 c9 b8 9f ee 02 b6 |...H............|
000000f0: 11 3a e7 00 00 00 cb 0e 06 70 0d 00 00 00 0e ee |.:.......p......|
00000100: 1d 70 05 00 00 00 30 c7 ce 06 cb 39 e7 00 00 00 |.p....0....9....|
00000110: bf 0a 9f 11 3a e7 00 00 00 cb ca cb 71 39 ea 00 |....:.......q9..|
00000120: 00 00 43 eb 00 00 00 39 e7 00 00 00 24 01 00 cf |..C....9....$...|
00000130: 28 d8 03 30 00 00 00 2a 08 24 20 04 21 13 11 1a |(..0...*.$ .!...|
00000140: 1b 15 30 07 08 04 11 02 53 01 0c 08 17 0b 5a 14 |..0.....S.....Z.|
00000150: 07 04 2f 20 0c 04 11 0c 91 4f 25 08 3b 0f 1b 0e |../ .....O%.;...|
00000160: 1b 0a 1b 01 00 0c 43 06 00 cc 03 00 01 00 02 00 |......C.........|
00000170: 00 0a 01 10 00 01 00 08 cb c7 ba 44 e9 00 00 00 |...........D....|
00000180: 29 d8 03 06 01 00 0c 20 07 08 00                |)...... ...|
```