# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/quickjs-tests/test_promise_gc_crash.ts
**生成时间**: 2026-01-07T15:10:24.776Z

## 大小对比

- TypeScript编译器: 479 字节
- WASM编译器: 479 字节
- 差异: 0 字节 (0.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 8,
  "atoms": [
    {
      "index": 0,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "createTask",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "run",
      "offset": 13
    },
    {
      "index": 2,
      "rawLength": 114,
      "actualLength": 57,
      "isWideChar": 0,
      "string": "__tests__/fixtures/quickjs-tests/test_promise_gc_crash.js",
      "offset": 17
    },
    {
      "index": 3,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "fn",
      "offset": 75
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "p",
      "offset": 78
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "v",
      "offset": 80
    },
    {
      "index": 6,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 82
    },
    {
      "index": 7,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 90
    }
  ],
  "functionHeader": {
    "offset": 94,
    "tag": "0xc",
    "remaining": 385
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
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "createTask",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "run",
      "offset": 13
    },
    {
      "index": 2,
      "rawLength": 114,
      "actualLength": 57,
      "isWideChar": 0,
      "string": "__tests__/fixtures/quickjs-tests/test_promise_gc_crash.js",
      "offset": 17
    },
    {
      "index": 3,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "fn",
      "offset": 75
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "p",
      "offset": 78
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "v",
      "offset": 80
    },
    {
      "index": 6,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 82
    },
    {
      "index": 7,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 90
    }
  ],
  "functionHeader": {
    "offset": 94,
    "tag": "0xc",
    "remaining": 385
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 08 14 63 72 65 61 74 65 54 61 73 6b 06 72 75 |...createTask.ru|
00000010: 6e 72 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 |nr__tests__/fixt|
00000020: 75 72 65 73 2f 71 75 69 63 6b 6a 73 2d 74 65 73 |ures/quickjs-tes|
00000030: 74 73 2f 74 65 73 74 5f 70 72 6f 6d 69 73 65 5f |ts/test_promise_|
00000040: 67 63 5f 63 72 61 73 68 2e 6a 73 04 66 6e 02 70 |gc_crash.js.fn.p|
00000050: 02 76 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0c 00 |.v.console.log..|
00000060: 06 00 a4 01 00 01 00 01 00 02 24 01 a6 01 00 00 |..........$.....|
00000070: 00 40 e4 00 00 00 40 40 e5 00 00 00 40 c2 00 41 |.@....@@....@..A|
00000080: e4 00 00 00 00 c2 01 41 e5 00 00 00 00 39 e5 00 |.......A.....9..|
00000090: 00 00 f0 cf 28 cc 03 08 00 00 00 1c 10 00 1b 06 |....(...........|
000000a0: 00 0c 62 06 00 c8 03 00 00 00 03 00 01 18 00 39 |..b............9|
000000b0: c7 00 00 00 43 82 00 00 00 24 00 00 43 81 00 00 |....C....$..C...|
000000c0: 00 c2 00 24 01 00 2f cc 03 0e 03 00 03 16 1b 0e |...$../.........|
000000d0: 1b 10 11 04 25 0a 11 39 00 0c 43 06 00 00 00 00 |....%..9..C.....|
000000e0: 00 03 00 00 0f 00 39 b0 00 00 00 11 01 40 42 0f |......9......@B.|
000000f0: 00 21 01 00 29 cc 03 06 04 22 03 2b 39 14 00 0c |.!..)....".+9...|
00000100: 62 06 00 ca 03 00 03 00 03 00 03 3e 03 ce 03 01 |b..........>....|
00000110: 00 60 d6 01 01 01 20 d0 03 01 02 30 63 02 00 63 |.`.... ....0c..c|
00000120: 01 00 63 00 00 c2 00 4f e7 00 00 00 cb c2 01 4f |..c....O.......O|
00000130: 6b 00 00 00 cc 39 e4 00 00 00 f0 43 81 00 00 00 |k....9.....C....|
00000140: 64 01 00 24 01 00 0e 39 c7 00 00 00 11 c2 02 21 |d..$...9.......!|
00000150: 01 00 cd 64 02 00 8d 0e 06 2f cc 03 12 09 00 82 |...d...../......|
00000160: 08 1b 14 07 04 1b 0c 11 01 17 05 2a 0e 17 1d 00 |...........*....|
00000170: 0c 42 06 00 00 01 00 01 03 00 00 10 01 d2 03 00 |.B..............|
00000180: 01 00 39 ea 00 00 00 43 eb 00 00 00 d3 eb 24 01 |..9....C......$.|
00000190: 00 29 cc 03 0c 0a 0d 02 12 1b 0e 1b 0a 07 02 07 |.)..............|
000001a0: 03 00 0c 42 06 00 00 01 00 01 02 01 00 07 01 d2 |...B............|
000001b0: 03 00 01 00 ce 03 00 09 68 00 00 d3 23 01 00 cc |........h...#...|
000001c0: 03 08 0b 0f 02 0e 11 06 07 01 00 0c 42 06 00 00 |............B...|
000001d0: 00 00 00 00 00 00 01 00 29 cc 03 02 0d 1a 00    |........)......|
```

### WASM
```
00000000: 05 08 14 63 72 65 61 74 65 54 61 73 6b 06 72 75 |...createTask.ru|
00000010: 6e 72 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 |nr__tests__/fixt|
00000020: 75 72 65 73 2f 71 75 69 63 6b 6a 73 2d 74 65 73 |ures/quickjs-tes|
00000030: 74 73 2f 74 65 73 74 5f 70 72 6f 6d 69 73 65 5f |ts/test_promise_|
00000040: 67 63 5f 63 72 61 73 68 2e 6a 73 04 66 6e 02 70 |gc_crash.js.fn.p|
00000050: 02 76 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0c 00 |.v.console.log..|
00000060: 06 00 a4 01 00 01 00 01 00 02 24 01 a6 01 00 00 |..........$.....|
00000070: 00 40 e4 00 00 00 40 40 e5 00 00 00 40 c2 00 41 |.@....@@....@..A|
00000080: e4 00 00 00 00 c2 01 41 e5 00 00 00 00 39 e5 00 |.......A.....9..|
00000090: 00 00 f0 cf 28 cc 03 08 00 00 00 1c 10 00 1b 06 |....(...........|
000000a0: 00 0c 62 06 00 c8 03 00 00 00 03 00 01 18 00 39 |..b............9|
000000b0: c7 00 00 00 43 82 00 00 00 24 00 00 43 81 00 00 |....C....$..C...|
000000c0: 00 c2 00 24 01 00 2f cc 03 0e 03 00 03 16 1b 0e |...$../.........|
000000d0: 1b 10 11 04 25 0a 11 39 00 0c 43 06 00 00 00 00 |....%..9..C.....|
000000e0: 00 03 00 00 0f 00 39 b0 00 00 00 11 01 40 42 0f |......9......@B.|
000000f0: 00 21 01 00 29 cc 03 06 04 22 03 2b 39 14 00 0c |.!..)....".+9...|
00000100: 62 06 00 ca 03 00 03 00 03 00 03 3e 03 ce 03 01 |b..........>....|
00000110: 00 60 d6 01 01 01 20 d0 03 01 02 30 63 02 00 63 |.`.... ....0c..c|
00000120: 01 00 63 00 00 c2 00 4f e7 00 00 00 cb c2 01 4f |..c....O.......O|
00000130: 6b 00 00 00 cc 39 e4 00 00 00 f0 43 81 00 00 00 |k....9.....C....|
00000140: 64 01 00 24 01 00 0e 39 c7 00 00 00 11 c2 02 21 |d..$...9.......!|
00000150: 01 00 cd 64 02 00 8d 0e 06 2f cc 03 12 09 00 82 |...d...../......|
00000160: 08 1b 14 07 04 1b 0c 11 01 17 05 2a 0e 17 1d 00 |...........*....|
00000170: 0c 42 06 00 00 01 00 01 03 00 00 10 01 d2 03 00 |.B..............|
00000180: 01 00 39 ea 00 00 00 43 eb 00 00 00 d3 eb 24 01 |..9....C......$.|
00000190: 00 29 cc 03 0c 0a 0d 02 12 1b 0e 1b 0a 07 02 07 |.)..............|
000001a0: 03 00 0c 42 06 00 00 01 00 01 02 01 00 07 01 d2 |...B............|
000001b0: 03 00 01 00 ce 03 00 09 68 00 00 d3 23 01 00 cc |........h...#...|
000001c0: 03 08 0b 0f 02 0e 11 06 07 01 00 0c 42 06 00 00 |............B...|
000001d0: 00 00 00 00 00 00 01 00 29 cc 03 02 0d 1a 00    |........)......|
```