# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/class-private-field-method-destructuring-loop-020.ts
**生成时间**: 2026-01-07T17:32:02.958Z

## 大小对比

- TypeScript编译器: 687 字节
- WASM编译器: 687 字节
- 差异: 0 字节 (0.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 12,
  "atoms": [
    {
      "index": 0,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "Acc20",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "#x",
      "offset": 8
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 11
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 13
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "sum",
      "offset": 15
    },
    {
      "index": 5,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "getX",
      "offset": 19
    },
    {
      "index": 6,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 24
    },
    {
      "index": 7,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 32
    },
    {
      "index": 8,
      "rawLength": 142,
      "actualLength": 71,
      "isWideChar": 0,
      "string": "__tests__/fixtures/class-private-field-method-destructuring-loop-020.js",
      "offset": 36
    },
    {
      "index": 9,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "v",
      "offset": 109
    },
    {
      "index": 10,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 111
    },
    {
      "index": 11,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 113
    }
  ],
  "functionHeader": {
    "offset": 115,
    "tag": "0xc",
    "remaining": 572
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 12,
  "atoms": [
    {
      "index": 0,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "Acc20",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "#x",
      "offset": 8
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 11
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 13
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "sum",
      "offset": 15
    },
    {
      "index": 5,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "getX",
      "offset": 19
    },
    {
      "index": 6,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 24
    },
    {
      "index": 7,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 32
    },
    {
      "index": 8,
      "rawLength": 142,
      "actualLength": 71,
      "isWideChar": 0,
      "string": "__tests__/fixtures/class-private-field-method-destructuring-loop-020.js",
      "offset": 36
    },
    {
      "index": 9,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "v",
      "offset": 109
    },
    {
      "index": 10,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 111
    },
    {
      "index": 11,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 113
    }
  ],
  "functionHeader": {
    "offset": 115,
    "tag": "0xc",
    "remaining": 572
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 0c 0a 41 63 63 32 30 04 23 78 02 69 02 61 06 |...Acc20.#x.i.a.|
00000010: 73 75 6d 08 67 65 74 58 0e 63 6f 6e 73 6f 6c 65 |sum.getX.console|
00000020: 06 6c 6f 67 8e 01 5f 5f 74 65 73 74 73 5f 5f 2f |.log..__tests__/|
00000030: 66 69 78 74 75 72 65 73 2f 63 6c 61 73 73 2d 70 |fixtures/class-p|
00000040: 72 69 76 61 74 65 2d 66 69 65 6c 64 2d 6d 65 74 |rivate-field-met|
00000050: 68 6f 64 2d 64 65 73 74 72 75 63 74 75 72 69 6e |hod-destructurin|
00000060: 67 2d 6c 6f 6f 70 2d 30 32 30 2e 6a 73 02 76 02 |g-loop-020.js.v.|
00000070: 78 02 79 0c 00 06 00 a4 01 00 05 00 07 00 05 ff |x.y.............|
00000080: 01 05 a6 01 00 00 00 c8 03 02 00 30 ca 03 03 02 |...........0....|
00000090: 75 f0 01 03 03 70 cc 03 04 00 20 40 e4 00 00 00 |u....p.... @....|
000000a0: 80 40 e7 00 00 00 80 40 e8 00 00 00 80 40 6a 00 |.@.....@.....@j.|
000000b0: 00 00 80 3f e4 00 00 00 82 3f e7 00 00 00 80 3f |...?.....?.....?|
000000c0: e8 00 00 00 82 3f 6a 00 00 00 80 63 01 00 06 63 |.....?j....c...c|
000000d0: 03 00 63 02 00 c1 02 58 e4 00 00 00 00 05 e5 00 |..c....X........|
000000e0: 00 00 cd c2 00 56 6a 00 00 00 00 c2 01 56 e9 00 |.....Vj......V..|
000000f0: 00 00 00 c2 03 52 ce 0e d0 6b 03 00 6b 02 00 3b |.....R...k..k..;|
00000100: e4 00 00 00 39 e4 00 00 00 11 21 00 00 3b e7 00 |....9.....!..;..|
00000110: 00 00 b7 3b e8 00 00 00 06 cb 63 04 00 b7 c5 04 |...;......c.....|
00000120: 64 04 00 ba a5 ec 28 39 e8 00 00 00 39 e7 00 00 |d.....(9....9...|
00000130: 00 43 6a 00 00 00 64 04 00 24 01 00 9f 11 3a e8 |.Cj...d..$....:.|
00000140: 00 00 00 cb 64 04 00 93 65 04 00 0e ee d3 06 11 |....d...e.......|
00000150: f4 ed 0f 73 43 6a 00 00 00 3b 6a 00 00 00 0e ee |...sCj...;j.....|
00000160: 11 0e 0b c2 04 4f 6a 00 00 00 4e 6a 00 00 00 ee |.....Oj...Nj....|
00000170: e3 39 ea 00 00 00 43 eb 00 00 00 39 e7 00 00 00 |.9....C....9....|
00000180: 43 e9 00 00 00 24 00 00 39 e8 00 00 00 39 6a 00 |C....$..9....9j.|
00000190: 00 00 b8 b9 f2 24 03 00 cf 28 d8 03 30 00 00 00 |.....$...(..0...|
000001a0: 69 0c 1c 20 0a 72 05 16 04 12 1b 1b 0e 1b 02 1b |i.. .r..........|
000001b0: 0a 11 01 11 0f 29 1e 11 02 00 2a 08 2f 1b 0e 1b |.....)....*./...|
000001c0: 0a 1b 02 1b 0a 11 08 1b 0a 25 06 07 25 00 0c 42 |.........%..%..B|
000001d0: 07 01 00 01 01 01 04 01 00 10 02 da 03 00 01 00 |................|
000001e0: 10 00 01 00 ca 03 02 0d 08 cb c7 11 df 45 d3 9f |.............E..|
000001f0: 15 df 46 0e c7 df 45 28 d8 03 0e 03 04 0c 12 07 |..F...E(........|
00000200: 08 11 0e 07 05 20 22 0c 15 00 0c 42 07 01 00 00 |..... "....B....|
00000210: 01 00 02 01 00 06 01 10 00 01 00 ca 03 02 0d 08 |................|
00000220: cb c7 df 45 28 d8 03 06 04 04 11 28 0c 15 00 0c |...E(......(....|
00000230: 40 05 01 00 00 01 00 02 01 00 0f 01 10 00 01 00 |@...............|
00000240: f0 01 03 0d 08 cb 2b 68 00 00 11 ec 06 c7 1b 24 |......+h.......$|
00000250: 00 00 29 d8 03 02 05 00 00 0c 48 05 01 00 00 02 |..).......H.....|
00000260: 00 03 01 00 0f 02 10 00 01 00 ea 01 00 01 00 ca |................|
00000270: 03 02 5d 0c 04 cc 08 cb ee 01 c7 68 00 00 bf 14 |..]........h....|
00000280: 47 29 d8 03 02 00 00 00 0c 02 06 00 00 02 00 02 |G)..............|
00000290: 02 00 00 04 02 dc 03 00 01 00 de 03 00 01 00 d3 |................|
000002a0: d4 9f 28 d8 03 08 0b 17 02 14 07 08 07 03 00    |..(............|
```

### WASM
```
00000000: 05 0c 0a 41 63 63 32 30 04 23 78 02 69 02 61 06 |...Acc20.#x.i.a.|
00000010: 73 75 6d 08 67 65 74 58 0e 63 6f 6e 73 6f 6c 65 |sum.getX.console|
00000020: 06 6c 6f 67 8e 01 5f 5f 74 65 73 74 73 5f 5f 2f |.log..__tests__/|
00000030: 66 69 78 74 75 72 65 73 2f 63 6c 61 73 73 2d 70 |fixtures/class-p|
00000040: 72 69 76 61 74 65 2d 66 69 65 6c 64 2d 6d 65 74 |rivate-field-met|
00000050: 68 6f 64 2d 64 65 73 74 72 75 63 74 75 72 69 6e |hod-destructurin|
00000060: 67 2d 6c 6f 6f 70 2d 30 32 30 2e 6a 73 02 76 02 |g-loop-020.js.v.|
00000070: 78 02 79 0c 00 06 00 a4 01 00 05 00 07 00 05 ff |x.y.............|
00000080: 01 05 a6 01 00 00 00 c8 03 02 00 30 ca 03 03 02 |...........0....|
00000090: 75 f0 01 03 03 70 cc 03 04 00 20 40 e4 00 00 00 |u....p.... @....|
000000a0: 80 40 e7 00 00 00 80 40 e8 00 00 00 80 40 6a 00 |.@.....@.....@j.|
000000b0: 00 00 80 3f e4 00 00 00 82 3f e7 00 00 00 80 3f |...?.....?.....?|
000000c0: e8 00 00 00 82 3f 6a 00 00 00 80 63 01 00 06 63 |.....?j....c...c|
000000d0: 03 00 63 02 00 c1 02 58 e4 00 00 00 00 05 e5 00 |..c....X........|
000000e0: 00 00 cd c2 00 56 6a 00 00 00 00 c2 01 56 e9 00 |.....Vj......V..|
000000f0: 00 00 00 c2 03 52 ce 0e d0 6b 03 00 6b 02 00 3b |.....R...k..k..;|
00000100: e4 00 00 00 39 e4 00 00 00 11 21 00 00 3b e7 00 |....9.....!..;..|
00000110: 00 00 b7 3b e8 00 00 00 06 cb 63 04 00 b7 c5 04 |...;......c.....|
00000120: 64 04 00 ba a5 ec 28 39 e8 00 00 00 39 e7 00 00 |d.....(9....9...|
00000130: 00 43 6a 00 00 00 64 04 00 24 01 00 9f 11 3a e8 |.Cj...d..$....:.|
00000140: 00 00 00 cb 64 04 00 93 65 04 00 0e ee d3 06 11 |....d...e.......|
00000150: f4 ed 0f 73 43 6a 00 00 00 3b 6a 00 00 00 0e ee |...sCj...;j.....|
00000160: 11 0e 0b c2 04 4f 6a 00 00 00 4e 6a 00 00 00 ee |.....Oj...Nj....|
00000170: e3 39 ea 00 00 00 43 eb 00 00 00 39 e7 00 00 00 |.9....C....9....|
00000180: 43 e9 00 00 00 24 00 00 39 e8 00 00 00 39 6a 00 |C....$..9....9j.|
00000190: 00 00 b8 b9 f2 24 03 00 cf 28 d8 03 30 00 00 00 |.....$...(..0...|
000001a0: 69 0c 1c 20 0a 72 05 16 04 12 1b 1b 0e 1b 02 1b |i.. .r..........|
000001b0: 0a 11 01 11 0f 29 1e 11 02 00 2a 08 2f 1b 0e 1b |.....)....*./...|
000001c0: 0a 1b 02 1b 0a 11 08 1b 0a 25 06 07 25 00 0c 42 |.........%..%..B|
000001d0: 07 01 00 01 01 01 04 01 00 10 02 da 03 00 01 00 |................|
000001e0: 10 00 01 00 ca 03 02 0d 08 cb c7 11 df 45 d3 9f |.............E..|
000001f0: 15 df 46 0e c7 df 45 28 d8 03 0e 03 04 0c 12 07 |..F...E(........|
00000200: 08 11 0e 07 05 20 22 0c 15 00 0c 42 07 01 00 00 |..... "....B....|
00000210: 01 00 02 01 00 06 01 10 00 01 00 ca 03 02 0d 08 |................|
00000220: cb c7 df 45 28 d8 03 06 04 04 11 28 0c 15 00 0c |...E(......(....|
00000230: 40 05 01 00 00 01 00 02 01 00 0f 01 10 00 01 00 |@...............|
00000240: f0 01 03 0d 08 cb 2b 68 00 00 11 ec 06 c7 1b 24 |......+h.......$|
00000250: 00 00 29 d8 03 02 05 00 00 0c 48 05 01 00 00 02 |..).......H.....|
00000260: 00 03 01 00 0f 02 10 00 01 00 ea 01 00 01 00 ca |................|
00000270: 03 02 5d 0c 04 cc 08 cb ee 01 c7 68 00 00 bf 14 |..]........h....|
00000280: 47 29 d8 03 02 00 00 00 0c 02 06 00 00 02 00 02 |G)..............|
00000290: 02 00 00 04 02 dc 03 00 01 00 de 03 00 01 00 d3 |................|
000002a0: d4 9f 28 d8 03 08 0b 17 02 14 07 08 07 03 00    |..(............|
```