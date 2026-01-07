# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/test_log.ts
**生成时间**: 2026-01-07T15:10:25.085Z

## 大小对比

- TypeScript编译器: 1445 字节
- WASM编译器: 1445 字节
- 差异: 0 字节 (0.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 39,
  "atoms": [
    {
      "index": 0,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "fs",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "pad",
      "offset": 5
    },
    {
      "index": 2,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "pad_left",
      "offset": 9
    },
    {
      "index": 3,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "pad_center",
      "offset": 18
    },
    {
      "index": 4,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "ref_data",
      "offset": 29
    },
    {
      "index": 5,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "log_data",
      "offset": 38
    },
    {
      "index": 6,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "heads",
      "offset": 47
    },
    {
      "index": 7,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "widths",
      "offset": 53
    },
    {
      "index": 8,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "precs",
      "offset": 60
    },
    {
      "index": 9,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "total",
      "offset": 66
    },
    {
      "index": 10,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "total_score",
      "offset": 72
    },
    {
      "index": 11,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "total_scale",
      "offset": 84
    },
    {
      "index": 12,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "log_line",
      "offset": 96
    },
    {
      "index": 13,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "clocks_per_sec",
      "offset": 105
    },
    {
      "index": 14,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "max_iterations",
      "offset": 120
    },
    {
      "index": 15,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "clock_threshold",
      "offset": 135
    },
    {
      "index": 16,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "min_n_argument",
      "offset": 151
    },
    {
      "index": 17,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "get_clock",
      "offset": 166
    },
    {
      "index": 18,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "require",
      "offset": 176
    },
    {
      "index": 19,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "TEST",
      "offset": 184
    },
    {
      "index": 20,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "N",
      "offset": 189
    },
    {
      "index": 21,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "TIME (ns)",
      "offset": 191
    },
    {
      "index": 22,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "REF (ns)",
      "offset": 201
    },
    {
      "index": 23,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "SCORE (1000)",
      "offset": 210
    },
    {
      "index": 24,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "performance",
      "offset": 223
    },
    {
      "index": 25,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "os",
      "offset": 235
    },
    {
      "index": 26,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "now",
      "offset": 238
    },
    {
      "index": 27,
      "rawLength": 60,
      "actualLength": 30,
      "isWideChar": 0,
      "string": "__tests__/fixtures/test_log.js",
      "offset": 242
    },
    {
      "index": 28,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "str",
      "offset": 273
    },
    {
      "index": 29,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "n",
      "offset": 277
    },
    {
      "index": 30,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": " ",
      "offset": 279
    },
    {
      "index": 31,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 281
    },
    {
      "index": 32,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "s",
      "offset": 283
    },
    {
      "index": 33,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 285
    },
    {
      "index": 34,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "toFixed",
      "offset": 287
    },
    {
      "index": 35,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 295
    },
    {
      "index": 36,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 303
    },
    {
      "index": 37,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "t0",
      "offset": 307
    },
    {
      "index": 38,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "t",
      "offset": 310
    }
  ],
  "functionHeader": {
    "offset": 312,
    "tag": "0xc",
    "remaining": 1133
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 39,
  "atoms": [
    {
      "index": 0,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "fs",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "pad",
      "offset": 5
    },
    {
      "index": 2,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "pad_left",
      "offset": 9
    },
    {
      "index": 3,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "pad_center",
      "offset": 18
    },
    {
      "index": 4,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "ref_data",
      "offset": 29
    },
    {
      "index": 5,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "log_data",
      "offset": 38
    },
    {
      "index": 6,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "heads",
      "offset": 47
    },
    {
      "index": 7,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "widths",
      "offset": 53
    },
    {
      "index": 8,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "precs",
      "offset": 60
    },
    {
      "index": 9,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "total",
      "offset": 66
    },
    {
      "index": 10,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "total_score",
      "offset": 72
    },
    {
      "index": 11,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "total_scale",
      "offset": 84
    },
    {
      "index": 12,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "log_line",
      "offset": 96
    },
    {
      "index": 13,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "clocks_per_sec",
      "offset": 105
    },
    {
      "index": 14,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "max_iterations",
      "offset": 120
    },
    {
      "index": 15,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "clock_threshold",
      "offset": 135
    },
    {
      "index": 16,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "min_n_argument",
      "offset": 151
    },
    {
      "index": 17,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "get_clock",
      "offset": 166
    },
    {
      "index": 18,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "require",
      "offset": 176
    },
    {
      "index": 19,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "TEST",
      "offset": 184
    },
    {
      "index": 20,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "N",
      "offset": 189
    },
    {
      "index": 21,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "TIME (ns)",
      "offset": 191
    },
    {
      "index": 22,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "REF (ns)",
      "offset": 201
    },
    {
      "index": 23,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "SCORE (1000)",
      "offset": 210
    },
    {
      "index": 24,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "performance",
      "offset": 223
    },
    {
      "index": 25,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "os",
      "offset": 235
    },
    {
      "index": 26,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "now",
      "offset": 238
    },
    {
      "index": 27,
      "rawLength": 60,
      "actualLength": 30,
      "isWideChar": 0,
      "string": "__tests__/fixtures/test_log.js",
      "offset": 242
    },
    {
      "index": 28,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "str",
      "offset": 273
    },
    {
      "index": 29,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "n",
      "offset": 277
    },
    {
      "index": 30,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": " ",
      "offset": 279
    },
    {
      "index": 31,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 281
    },
    {
      "index": 32,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "s",
      "offset": 283
    },
    {
      "index": 33,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 285
    },
    {
      "index": 34,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "toFixed",
      "offset": 287
    },
    {
      "index": 35,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 295
    },
    {
      "index": 36,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 303
    },
    {
      "index": 37,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "t0",
      "offset": 307
    },
    {
      "index": 38,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "t",
      "offset": 310
    }
  ],
  "functionHeader": {
    "offset": 312,
    "tag": "0xc",
    "remaining": 1133
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 27 04 66 73 06 70 61 64 10 70 61 64 5f 6c 65 |.'.fs.pad.pad_le|
00000010: 66 74 14 70 61 64 5f 63 65 6e 74 65 72 10 72 65 |ft.pad_center.re|
00000020: 66 5f 64 61 74 61 10 6c 6f 67 5f 64 61 74 61 0a |f_data.log_data.|
00000030: 68 65 61 64 73 0c 77 69 64 74 68 73 0a 70 72 65 |heads.widths.pre|
00000040: 63 73 0a 74 6f 74 61 6c 16 74 6f 74 61 6c 5f 73 |cs.total.total_s|
00000050: 63 6f 72 65 16 74 6f 74 61 6c 5f 73 63 61 6c 65 |core.total_scale|
00000060: 10 6c 6f 67 5f 6c 69 6e 65 1c 63 6c 6f 63 6b 73 |.log_line.clocks|
00000070: 5f 70 65 72 5f 73 65 63 1c 6d 61 78 5f 69 74 65 |_per_sec.max_ite|
00000080: 72 61 74 69 6f 6e 73 1e 63 6c 6f 63 6b 5f 74 68 |rations.clock_th|
00000090: 72 65 73 68 6f 6c 64 1c 6d 69 6e 5f 6e 5f 61 72 |reshold.min_n_ar|
000000a0: 67 75 6d 65 6e 74 12 67 65 74 5f 63 6c 6f 63 6b |gument.get_clock|
000000b0: 0e 72 65 71 75 69 72 65 08 54 45 53 54 02 4e 12 |.require.TEST.N.|
000000c0: 54 49 4d 45 20 28 6e 73 29 10 52 45 46 20 28 6e |TIME (ns).REF (n|
000000d0: 73 29 18 53 43 4f 52 45 20 28 31 30 30 30 29 16 |s).SCORE (1000).|
000000e0: 70 65 72 66 6f 72 6d 61 6e 63 65 04 6f 73 06 6e |performance.os.n|
000000f0: 6f 77 3c 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |ow<__tests__/fix|
00000100: 74 75 72 65 73 2f 74 65 73 74 5f 6c 6f 67 2e 6a |tures/test_log.j|
00000110: 73 06 73 74 72 02 6e 02 20 02 69 02 73 02 61 0e |s.str.n. .i.s.a.|
00000120: 74 6f 46 69 78 65 64 0e 63 6f 6e 73 6f 6c 65 06 |toFixed.console.|
00000130: 6c 6f 67 04 74 30 02 74 0c 00 06 00 a4 01 00 01 |log.t0.t........|
00000140: 00 05 00 06 b5 03 01 a6 01 00 00 00 40 e4 00 00 |............@...|
00000150: 00 00 40 e5 00 00 00 40 40 e6 00 00 00 40 40 e7 |..@....@@....@@.|
00000160: 00 00 00 40 40 e8 00 00 00 00 40 e9 00 00 00 00 |...@@.....@.....|
00000170: 40 ea 00 00 00 00 40 eb 00 00 00 00 40 ec 00 00 |@.....@.....@...|
00000180: 00 00 40 ed 00 00 00 00 40 ee 00 00 00 00 40 ef |..@.....@.....@.|
00000190: 00 00 00 00 40 f0 00 00 00 40 40 f1 00 00 00 00 |....@....@@.....|
000001a0: 40 f2 00 00 00 00 40 f3 00 00 00 00 40 f4 00 00 |@.....@.....@...|
000001b0: 00 00 40 f5 00 00 00 00 3f e4 00 00 00 00 c2 00 |..@.....?.......|
000001c0: 41 e5 00 00 00 00 c2 01 41 e6 00 00 00 00 c2 02 |A.......A.......|
000001d0: 41 e7 00 00 00 00 3f e8 00 00 00 00 3f e9 00 00 |A.....?.....?...|
000001e0: 00 00 3f ea 00 00 00 00 3f eb 00 00 00 00 3f ec |..?.....?.....?.|
000001f0: 00 00 00 00 3f ed 00 00 00 00 3f ee 00 00 00 00 |....?.....?.....|
00000200: 3f ef 00 00 00 00 c2 03 41 f0 00 00 00 00 3f f1 |?.......A.....?.|
00000210: 00 00 00 00 3f f2 00 00 00 00 3f f3 00 00 00 00 |....?.....?.....|
00000220: 3f f4 00 00 00 00 3f f5 00 00 00 00 06 cb 38 f6 |?.....?.......8.|
00000230: 00 00 00 f6 ed 11 39 f6 00 00 00 04 e4 00 00 00 |......9.........|
00000240: f1 3a e4 00 00 00 04 f7 00 00 00 04 f8 00 00 00 |.:..............|
00000250: 04 f9 00 00 00 04 fa 00 00 00 04 fb 00 00 00 26 |...............&|
00000260: 05 00 3a ea 00 00 00 bf 16 bf 0a bf 09 bf 09 bf |..:.............|
00000270: 09 26 05 00 3a eb 00 00 00 b7 b7 b9 b9 b7 26 05 |.&..:.........&.|
00000280: 00 3a ec 00 00 00 b7 b7 b7 b7 b7 26 05 00 3a ed |.:.........&..:.|
00000290: 00 00 00 b7 3a ee 00 00 00 b7 3a ef 00 00 00 c0 |....:.....:.....|
000002a0: e8 03 3a f1 00 00 00 bf 64 3a f2 00 00 00 b9 3a |..:.....d:.....:|
000002b0: f3 00 00 00 b8 3a f4 00 00 00 06 cb 38 fc 00 00 |.....:......8...|
000002c0: 00 f6 ed 11 c2 04 4f f5 00 00 00 11 3a f5 00 00 |......O.....:...|
000002d0: 00 cb ee 2c 06 cb 38 fd 00 00 00 f6 ed 14 39 fd |...,..8.......9.|
000002e0: 00 00 00 42 fe 00 00 00 11 3a f5 00 00 00 cb ee |...B.....:......|
000002f0: 0f c2 05 4f f5 00 00 00 11 3a f5 00 00 00 cb c7 |...O.....:......|
00000300: 28 fe 03 21 00 00 00 e2 01 36 16 1b 10 12 0b 34 |(..!.....6.....4|
00000310: 0e 00 7c 6e 11 1b 18 14 25 5e 18 1b 06 13 05 1b |..|n....%^......|
00000320: 04 00 0e 08 1b 00 0c 43 06 00 ca 03 02 00 02 02 |.......C........|
00000330: 00 00 16 02 80 04 00 01 00 82 04 00 01 00 d3 c3 |................|
00000340: 9f d7 d3 eb d4 a5 ec 0b d3 04 02 01 00 00 9f d7 |................|
00000350: ee f1 d3 28 fe 03 16 1e 00 03 08 0c 08 0d 06 07 |...(............|
00000360: 06 07 14 07 03 12 1b 20 08 17 01 07 0d 00 0c 43 |....... .......C|
00000370: 06 00 cc 03 02 00 02 02 00 00 16 02 80 04 00 01 |................|
00000380: 00 82 04 00 01 00 d3 c3 9f d7 d3 eb d4 a5 ec 0b |................|
00000390: 04 02 01 00 00 d3 9f d7 ee f1 d3 28 fe 03 18 24 |...........(...$|
000003a0: 00 03 08 0c 08 0d 06 07 06 07 14 07 03 12 1b 1b |................|
000003b0: 18 07 03 17 0d 07 0d 00 0c 43 06 00 ce 03 02 00 |.........C......|
000003c0: 02 02 00 00 28 02 80 04 00 01 00 82 04 00 01 00 |....(...........|
000003d0: d3 c3 9f d7 d3 eb d4 a5 ec 1d d4 d3 eb a0 b8 af |................|
000003e0: ec 0b d3 04 02 01 00 00 9f d7 ee e9 04 02 01 00 |................|
000003f0: 00 d3 9f d7 ee df d3 28 fe 03 26 2a 00 03 08 0c |.......(..&*....|
00000400: 08 0d 06 07 06 07 14 07 03 12 11 07 08 07 06 07 |................|
00000410: 09 0c 1c 12 15 20 08 18 13 1b 18 07 03 18 15 07 |..... ..........|
00000420: 0d 00 0c 43 06 00 e0 03 00 05 00 05 00 00 7d 05 |...C..........}.|
00000430: 86 04 00 00 00 82 04 00 01 00 88 04 00 02 00 8a |................|
00000440: 04 00 03 00 9e 01 00 01 00 0c 01 c5 04 c3 cd b7 |................|
00000450: cb c4 04 eb cc c7 c8 a5 ec 5e c7 b7 a7 ec 08 04 |.........^......|
00000460: 02 01 00 00 96 02 c4 04 c7 48 d2 99 04 48 00 00 |.........H...H..|
00000470: 00 ad ec 2f 39 ed 00 00 00 c7 4a ca 9f 4b ca 43 |.../9.....J..K.C|
00000480: 06 01 00 00 39 ec 00 00 00 c7 48 24 01 00 ce c9 |....9.....H$....|
00000490: 39 e6 00 00 00 ca 39 eb 00 00 00 c7 48 f2 9f cd |9.....9.....H...|
000004a0: ee 12 c9 39 e6 00 00 00 ca 39 eb 00 00 00 c7 48 |...9.....9.....H|
000004b0: f2 9f cd 95 00 ee 9f 39 07 01 00 00 43 08 01 00 |.......9....C...|
000004c0: 00 c9 24 01 00 29 fe 03 62 3c 00 18 08 0d 0a 0c |..$..)..b<......|
000004d0: 16 0c 12 0c 12 07 08 07 03 12 37 0c 04 12 00 26 |..........7....&|
000004e0: 03 0c 14 07 01 0d 00 30 11 1b 0c 07 01 07 0e 07 |.......0........|
000004f0: 05 0d 09 07 02 1b 12 1b 0c 07 01 07 0b 17 19 07 |................|
00000500: 0a 1b 12 07 06 1b 0e 07 01 07 13 07 15 19 03 07 |................|
00000510: 0a 1b 12 07 06 1b 0e 07 01 07 13 07 15 00 02 13 |................|
00000520: 40 00 04 1a 53 1b 0e 1b 0a 07 01 00 0c 02 06 00 |@...S...........|
00000530: 00 00 00 00 02 00 00 0d 00 39 fc 00 00 00 43 fe |.........9....C.|
00000540: 00 00 00 25 00 00 fe 03 08 56 10 02 0c 1b 16 1b |...%.....V......|
00000550: 08 00 0c 02 06 00 00 00 02 00 02 00 00 22 02 92 |............."..|
00000560: 04 00 00 00 94 04 00 01 00 39 a7 00 00 00 43 fe |.........9....C.|
00000570: 00 00 00 24 00 00 cb 39 a7 00 00 00 43 fe 00 00 |...$...9....C...|
00000580: 00 24 00 00 d0 c7 ab ed ef c8 28 fe 03 16 5e 10 |.$........(...^.|
00000590: 03 02 1b 08 1b 08 18 09 1b 08 1b 08 16 0e 07 05 |................|
000005a0: 13 21 07 0d 00                                  |.!...|
```

### WASM
```
00000000: 05 27 04 66 73 06 70 61 64 10 70 61 64 5f 6c 65 |.'.fs.pad.pad_le|
00000010: 66 74 14 70 61 64 5f 63 65 6e 74 65 72 10 72 65 |ft.pad_center.re|
00000020: 66 5f 64 61 74 61 10 6c 6f 67 5f 64 61 74 61 0a |f_data.log_data.|
00000030: 68 65 61 64 73 0c 77 69 64 74 68 73 0a 70 72 65 |heads.widths.pre|
00000040: 63 73 0a 74 6f 74 61 6c 16 74 6f 74 61 6c 5f 73 |cs.total.total_s|
00000050: 63 6f 72 65 16 74 6f 74 61 6c 5f 73 63 61 6c 65 |core.total_scale|
00000060: 10 6c 6f 67 5f 6c 69 6e 65 1c 63 6c 6f 63 6b 73 |.log_line.clocks|
00000070: 5f 70 65 72 5f 73 65 63 1c 6d 61 78 5f 69 74 65 |_per_sec.max_ite|
00000080: 72 61 74 69 6f 6e 73 1e 63 6c 6f 63 6b 5f 74 68 |rations.clock_th|
00000090: 72 65 73 68 6f 6c 64 1c 6d 69 6e 5f 6e 5f 61 72 |reshold.min_n_ar|
000000a0: 67 75 6d 65 6e 74 12 67 65 74 5f 63 6c 6f 63 6b |gument.get_clock|
000000b0: 0e 72 65 71 75 69 72 65 08 54 45 53 54 02 4e 12 |.require.TEST.N.|
000000c0: 54 49 4d 45 20 28 6e 73 29 10 52 45 46 20 28 6e |TIME (ns).REF (n|
000000d0: 73 29 18 53 43 4f 52 45 20 28 31 30 30 30 29 16 |s).SCORE (1000).|
000000e0: 70 65 72 66 6f 72 6d 61 6e 63 65 04 6f 73 06 6e |performance.os.n|
000000f0: 6f 77 3c 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |ow<__tests__/fix|
00000100: 74 75 72 65 73 2f 74 65 73 74 5f 6c 6f 67 2e 6a |tures/test_log.j|
00000110: 73 06 73 74 72 02 6e 02 20 02 69 02 73 02 61 0e |s.str.n. .i.s.a.|
00000120: 74 6f 46 69 78 65 64 0e 63 6f 6e 73 6f 6c 65 06 |toFixed.console.|
00000130: 6c 6f 67 04 74 30 02 74 0c 00 06 00 a4 01 00 01 |log.t0.t........|
00000140: 00 05 00 06 b5 03 01 a6 01 00 00 00 40 e4 00 00 |............@...|
00000150: 00 00 40 e5 00 00 00 40 40 e6 00 00 00 40 40 e7 |..@....@@....@@.|
00000160: 00 00 00 40 40 e8 00 00 00 00 40 e9 00 00 00 00 |...@@.....@.....|
00000170: 40 ea 00 00 00 00 40 eb 00 00 00 00 40 ec 00 00 |@.....@.....@...|
00000180: 00 00 40 ed 00 00 00 00 40 ee 00 00 00 00 40 ef |..@.....@.....@.|
00000190: 00 00 00 00 40 f0 00 00 00 40 40 f1 00 00 00 00 |....@....@@.....|
000001a0: 40 f2 00 00 00 00 40 f3 00 00 00 00 40 f4 00 00 |@.....@.....@...|
000001b0: 00 00 40 f5 00 00 00 00 3f e4 00 00 00 00 c2 00 |..@.....?.......|
000001c0: 41 e5 00 00 00 00 c2 01 41 e6 00 00 00 00 c2 02 |A.......A.......|
000001d0: 41 e7 00 00 00 00 3f e8 00 00 00 00 3f e9 00 00 |A.....?.....?...|
000001e0: 00 00 3f ea 00 00 00 00 3f eb 00 00 00 00 3f ec |..?.....?.....?.|
000001f0: 00 00 00 00 3f ed 00 00 00 00 3f ee 00 00 00 00 |....?.....?.....|
00000200: 3f ef 00 00 00 00 c2 03 41 f0 00 00 00 00 3f f1 |?.......A.....?.|
00000210: 00 00 00 00 3f f2 00 00 00 00 3f f3 00 00 00 00 |....?.....?.....|
00000220: 3f f4 00 00 00 00 3f f5 00 00 00 00 06 cb 38 f6 |?.....?.......8.|
00000230: 00 00 00 f6 ed 11 39 f6 00 00 00 04 e4 00 00 00 |......9.........|
00000240: f1 3a e4 00 00 00 04 f7 00 00 00 04 f8 00 00 00 |.:..............|
00000250: 04 f9 00 00 00 04 fa 00 00 00 04 fb 00 00 00 26 |...............&|
00000260: 05 00 3a ea 00 00 00 bf 16 bf 0a bf 09 bf 09 bf |..:.............|
00000270: 09 26 05 00 3a eb 00 00 00 b7 b7 b9 b9 b7 26 05 |.&..:.........&.|
00000280: 00 3a ec 00 00 00 b7 b7 b7 b7 b7 26 05 00 3a ed |.:.........&..:.|
00000290: 00 00 00 b7 3a ee 00 00 00 b7 3a ef 00 00 00 c0 |....:.....:.....|
000002a0: e8 03 3a f1 00 00 00 bf 64 3a f2 00 00 00 b9 3a |..:.....d:.....:|
000002b0: f3 00 00 00 b8 3a f4 00 00 00 06 cb 38 fc 00 00 |.....:......8...|
000002c0: 00 f6 ed 11 c2 04 4f f5 00 00 00 11 3a f5 00 00 |......O.....:...|
000002d0: 00 cb ee 2c 06 cb 38 fd 00 00 00 f6 ed 14 39 fd |...,..8.......9.|
000002e0: 00 00 00 42 fe 00 00 00 11 3a f5 00 00 00 cb ee |...B.....:......|
000002f0: 0f c2 05 4f f5 00 00 00 11 3a f5 00 00 00 cb c7 |...O.....:......|
00000300: 28 fe 03 21 00 00 00 e2 01 36 16 1b 10 12 0b 34 |(..!.....6.....4|
00000310: 0e 00 7c 6e 11 1b 18 14 25 5e 18 1b 06 13 05 1b |..|n....%^......|
00000320: 04 00 0e 08 1b 00 0c 43 06 00 ca 03 02 00 02 02 |.......C........|
00000330: 00 00 16 02 80 04 00 01 00 82 04 00 01 00 d3 c3 |................|
00000340: 9f d7 d3 eb d4 a5 ec 0b d3 04 02 01 00 00 9f d7 |................|
00000350: ee f1 d3 28 fe 03 16 1e 00 03 08 0c 08 0d 06 07 |...(............|
00000360: 06 07 14 07 03 12 1b 20 08 17 01 07 0d 00 0c 43 |....... .......C|
00000370: 06 00 cc 03 02 00 02 02 00 00 16 02 80 04 00 01 |................|
00000380: 00 82 04 00 01 00 d3 c3 9f d7 d3 eb d4 a5 ec 0b |................|
00000390: 04 02 01 00 00 d3 9f d7 ee f1 d3 28 fe 03 18 24 |...........(...$|
000003a0: 00 03 08 0c 08 0d 06 07 06 07 14 07 03 12 1b 1b |................|
000003b0: 18 07 03 17 0d 07 0d 00 0c 43 06 00 ce 03 02 00 |.........C......|
000003c0: 02 02 00 00 28 02 80 04 00 01 00 82 04 00 01 00 |....(...........|
000003d0: d3 c3 9f d7 d3 eb d4 a5 ec 1d d4 d3 eb a0 b8 af |................|
000003e0: ec 0b d3 04 02 01 00 00 9f d7 ee e9 04 02 01 00 |................|
000003f0: 00 d3 9f d7 ee df d3 28 fe 03 26 2a 00 03 08 0c |.......(..&*....|
00000400: 08 0d 06 07 06 07 14 07 03 12 11 07 08 07 06 07 |................|
00000410: 09 0c 1c 12 15 20 08 18 13 1b 18 07 03 18 15 07 |..... ..........|
00000420: 0d 00 0c 43 06 00 e0 03 00 05 00 05 00 00 7d 05 |...C..........}.|
00000430: 86 04 00 00 00 82 04 00 01 00 88 04 00 02 00 8a |................|
00000440: 04 00 03 00 9e 01 00 01 00 0c 01 c5 04 c3 cd b7 |................|
00000450: cb c4 04 eb cc c7 c8 a5 ec 5e c7 b7 a7 ec 08 04 |.........^......|
00000460: 02 01 00 00 96 02 c4 04 c7 48 d2 99 04 48 00 00 |.........H...H..|
00000470: 00 ad ec 2f 39 ed 00 00 00 c7 4a ca 9f 4b ca 43 |.../9.....J..K.C|
00000480: 06 01 00 00 39 ec 00 00 00 c7 48 24 01 00 ce c9 |....9.....H$....|
00000490: 39 e6 00 00 00 ca 39 eb 00 00 00 c7 48 f2 9f cd |9.....9.....H...|
000004a0: ee 12 c9 39 e6 00 00 00 ca 39 eb 00 00 00 c7 48 |...9.....9.....H|
000004b0: f2 9f cd 95 00 ee 9f 39 07 01 00 00 43 08 01 00 |.......9....C...|
000004c0: 00 c9 24 01 00 29 fe 03 62 3c 00 18 08 0d 0a 0c |..$..)..b<......|
000004d0: 16 0c 12 0c 12 07 08 07 03 12 37 0c 04 12 00 26 |..........7....&|
000004e0: 03 0c 14 07 01 0d 00 30 11 1b 0c 07 01 07 0e 07 |.......0........|
000004f0: 05 0d 09 07 02 1b 12 1b 0c 07 01 07 0b 17 19 07 |................|
00000500: 0a 1b 12 07 06 1b 0e 07 01 07 13 07 15 19 03 07 |................|
00000510: 0a 1b 12 07 06 1b 0e 07 01 07 13 07 15 00 02 13 |................|
00000520: 40 00 04 1a 53 1b 0e 1b 0a 07 01 00 0c 02 06 00 |@...S...........|
00000530: 00 00 00 00 02 00 00 0d 00 39 fc 00 00 00 43 fe |.........9....C.|
00000540: 00 00 00 25 00 00 fe 03 08 56 10 02 0c 1b 16 1b |...%.....V......|
00000550: 08 00 0c 02 06 00 00 00 02 00 02 00 00 22 02 92 |............."..|
00000560: 04 00 00 00 94 04 00 01 00 39 a7 00 00 00 43 fe |.........9....C.|
00000570: 00 00 00 24 00 00 cb 39 a7 00 00 00 43 fe 00 00 |...$...9....C...|
00000580: 00 24 00 00 d0 c7 ab ed ef c8 28 fe 03 16 5e 10 |.$........(...^.|
00000590: 03 02 1b 08 1b 08 18 09 1b 08 1b 08 16 0e 07 05 |................|
000005a0: 13 21 07 0d 00                                  |.!...|
```