# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/optional-chaining.ts
**生成时间**: 2025-12-09T08:59:51.559Z

## 大小对比

- TypeScript编译器: 611 字节
- WASM编译器: 602 字节
- 差异: 9 字节 (1.50%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 16,
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
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "user",
      "offset": 51
    },
    {
      "index": 2,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "list",
      "offset": 56
    },
    {
      "index": 3,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "alice",
      "offset": 61
    },
    {
      "index": 4,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "a@example.com",
      "offset": 67
    },
    {
      "index": 5,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "email",
      "offset": 81
    },
    {
      "index": 6,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "contact",
      "offset": 87
    },
    {
      "index": 7,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "greet",
      "offset": 95
    },
    {
      "index": 8,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "profile",
      "offset": 101
    },
    {
      "index": 9,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 109
    },
    {
      "index": 10,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 117
    },
    {
      "index": 11,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "deep",
      "offset": 121
    },
    {
      "index": 12,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "nested",
      "offset": 126
    },
    {
      "index": 13,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "missing",
      "offset": 133
    },
    {
      "index": 14,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "prop",
      "offset": 141
    },
    {
      "index": 15,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "hi",
      "offset": 146
    }
  ],
  "functionHeader": {
    "offset": 149,
    "tag": "0xd",
    "remaining": 462
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 16,
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
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "user",
      "offset": 51
    },
    {
      "index": 2,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "list",
      "offset": 56
    },
    {
      "index": 3,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "alice",
      "offset": 61
    },
    {
      "index": 4,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "a@example.com",
      "offset": 67
    },
    {
      "index": 5,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "email",
      "offset": 81
    },
    {
      "index": 6,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "contact",
      "offset": 87
    },
    {
      "index": 7,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "greet",
      "offset": 95
    },
    {
      "index": 8,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "profile",
      "offset": 101
    },
    {
      "index": 9,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 109
    },
    {
      "index": 10,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 117
    },
    {
      "index": 11,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "deep",
      "offset": 121
    },
    {
      "index": 12,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "nested",
      "offset": 126
    },
    {
      "index": 13,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "missing",
      "offset": 133
    },
    {
      "index": 14,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "prop",
      "offset": 141
    },
    {
      "index": 15,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "hi",
      "offset": 146
    }
  ],
  "functionHeader": {
    "offset": 149,
    "tag": "0xd",
    "remaining": 453
  }
}
```

## 字节级差异

共发现 385 个字节差异:

- 偏移量 0xa9: TS=0xc6 vs WASM=0xc3
- 偏移量 0xb5: TS=0x6c vs WASM=0xec
- 偏移量 0xb6: TS=0x42 vs WASM=0x02
- 偏移量 0xb7: TS=0x01 vs WASM=0x29
- 偏移量 0xb8: TS=0x00 vs WASM=0x0b
- 偏移量 0xb9: TS=0x00 vs WASM=0x0b
- 偏移量 0xba: TS=0x0b vs WASM=0x04
- 偏移量 0xbb: TS=0x0b vs WASM=0xe7
- 偏移量 0xbc: TS=0x04 vs WASM=0x00
- 偏移量 0xbd: TS=0xe7 vs WASM=0x00
- 偏移量 0xbf: TS=0x00 vs WASM=0x4e
- 偏移量 0xc0: TS=0x00 vs WASM=0x38
- 偏移量 0xc1: TS=0x4e vs WASM=0x00
- 偏移量 0xc2: TS=0x38 vs WASM=0x00
- 偏移量 0xc4: TS=0x00 vs WASM=0x0b
- 偏移量 0xc5: TS=0x00 vs WASM=0x04
- 偏移量 0xc6: TS=0x0b vs WASM=0xe8
- 偏移量 0xc7: TS=0x04 vs WASM=0x00
- 偏移量 0xc8: TS=0xe8 vs WASM=0x00
- 偏移量 0xca: TS=0x00 vs WASM=0x4e
- ... (显示前20个差异，总共385个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 10 60 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..`__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6f |piler/fixtures/o|
00000020: 70 74 69 6f 6e 61 6c 2d 63 68 61 69 6e 69 6e 67 |ptional-chaining|
00000030: 2e 6a 73 08 75 73 65 72 08 6c 69 73 74 0a 61 6c |.js.user.list.al|
00000040: 69 63 65 1a 61 40 65 78 61 6d 70 6c 65 2e 63 6f |ice.a@example.co|
00000050: 6d 0a 65 6d 61 69 6c 0e 63 6f 6e 74 61 63 74 0a |m.email.contact.|
00000060: 67 72 65 65 74 0e 70 72 6f 66 69 6c 65 0e 63 6f |greet.profile.co|
00000070: 6e 73 6f 6c 65 06 6c 6f 67 08 64 65 65 70 0c 6e |nsole.log.deep.n|
00000080: 65 73 74 65 64 0e 6d 69 73 73 69 6e 67 08 70 72 |ested.missing.pr|
00000090: 6f 70 04 68 69 0d c8 03 00 00 00 00 00 0c 20 06 |op.hi......... .|
000000a0: 01 a4 01 00 00 00 05 02 01 c6 02 00 ca 03 00 0d |................|
000000b0: cc 03 01 0d 08 6c 42 01 00 00 0b 0b 04 e7 00 00 |.....lB.........|
000000c0: 00 4e 38 00 00 00 0b 04 e8 00 00 00 4e e9 00 00 |.N8.........N...|
000000d0: 00 4e ea 00 00 00 c2 00 56 eb 00 00 00 00 4e ec |.N......V.....N.|
000000e0: 00 00 00 e3 39 ed 00 00 00 43 ee 00 00 00 68 00 |....9....C....h.|
000000f0: 00 11 b2 ec 05 0e 06 ee 13 42 ec 00 00 00 11 b2 |.........B......|
00000100: ec 05 0e 06 ee 06 42 38 00 00 00 24 01 00 0e 39 |......B8...$...9|
00000110: ed 00 00 00 43 ee 00 00 00 68 00 00 11 b2 ec 05 |....C....h......|
00000120: 0e 06 ee 1f 42 ec 00 00 00 11 b2 ec 05 0e 06 ee |....B...........|
00000130: 12 43 eb 00 00 00 11 b2 ec 06 0e 0e 06 ee 04 24 |.C.............$|
00000140: 00 00 24 01 00 0e 0b b8 4e 42 00 00 00 07 0b 0b |..$.....NB......|
00000150: ba 4e ef 00 00 00 4e f0 00 00 00 26 03 00 e4 39 |.N....N....&...9|
00000160: ed 00 00 00 43 ee 00 00 00 68 01 00 11 b2 ec 05 |....C....h......|
00000170: 0e 06 ee 10 b8 48 11 b2 ec 05 0e 06 ee 06 42 42 |.....H........BB|
00000180: 00 00 00 11 b2 ec 07 0e 04 f1 00 00 00 24 01 00 |.............$..|
00000190: 0e 39 ed 00 00 00 43 ee 00 00 00 68 01 00 11 b2 |.9....C....h....|
000001a0: ec 05 0e 06 ee 1d b9 48 11 b2 ec 05 0e 06 ee 13 |.......H........|
000001b0: 42 f0 00 00 00 11 b2 ec 05 0e 06 ee 06 42 ef 00 |B............B..|
000001c0: 00 00 11 b2 ec 03 0e b7 24 01 00 0e 39 ed 00 00 |........$...9...|
000001d0: 00 43 ee 00 00 00 68 00 00 11 b2 ec 05 0e 06 ee |.C....h.........|
000001e0: 13 42 f1 00 00 00 11 b2 ec 05 0e 06 ee 06 42 f2 |.B............B.|
000001f0: 00 00 00 24 01 00 0e 29 06 2f c8 03 44 00 00 00 |...$...)./..D...|
00000200: 30 12 00 1b 0e 1b 0a 39 08 43 12 1b 1b 17 15 1b |0......9.C......|
00000210: 0e 1b 0a 39 08 43 12 48 0e 11 29 95 15 1b 0e 1b |...9.C.H..).....|
00000220: 0a 3e 08 2f 0a 4d 13 17 15 1b 0e 1b 0a 3e 08 2f |.>./.M.......>./|
00000230: 0a 43 10 39 23 17 15 1b 0e 1b 0a 39 08 43 12 1b |.C.9#......9.C..|
00000240: 1b 00 0c 42 07 01 00 00 01 00 01 00 00 08 01 10 |...B............|
00000250: 00 01 00 08 cb 04 f3 00 00 00 28 c8 03 04 04 08 |..........(.....|
00000260: 26 08 00                                        |&..|
```

### WASM
```
00000000: 05 10 60 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..`__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6f |piler/fixtures/o|
00000020: 70 74 69 6f 6e 61 6c 2d 63 68 61 69 6e 69 6e 67 |ptional-chaining|
00000030: 2e 6a 73 08 75 73 65 72 08 6c 69 73 74 0a 61 6c |.js.user.list.al|
00000040: 69 63 65 1a 61 40 65 78 61 6d 70 6c 65 2e 63 6f |ice.a@example.co|
00000050: 6d 0a 65 6d 61 69 6c 0e 63 6f 6e 74 61 63 74 0a |m.email.contact.|
00000060: 67 72 65 65 74 0e 70 72 6f 66 69 6c 65 0e 63 6f |greet.profile.co|
00000070: 6e 73 6f 6c 65 06 6c 6f 67 08 64 65 65 70 0c 6e |nsole.log.deep.n|
00000080: 65 73 74 65 64 0e 6d 69 73 73 69 6e 67 08 70 72 |ested.missing.pr|
00000090: 6f 70 04 68 69 0d c8 03 00 00 00 00 00 0c 20 06 |op.hi......... .|
000000a0: 01 a4 01 00 00 00 05 02 01 c3 02 00 ca 03 00 0d |................|
000000b0: cc 03 01 0d 08 ec 02 29 0b 0b 04 e7 00 00 00 4e |.......).......N|
000000c0: 38 00 00 00 0b 04 e8 00 00 00 4e e9 00 00 00 4e |8.........N....N|
000000d0: ea 00 00 00 c2 00 56 eb 00 00 00 04 4e ec 00 00 |......V.....N...|
000000e0: 00 e3 39 ed 00 00 00 43 ee 00 00 00 68 00 00 11 |..9....C....h...|
000000f0: b2 ec 05 0e 06 ee 13 42 ec 00 00 00 11 b2 ec 05 |.......B........|
00000100: 0e 06 ee 06 42 38 00 00 00 24 01 00 0e 39 ed 00 |....B8...$...9..|
00000110: 00 00 43 ee 00 00 00 68 00 00 11 b2 ec 05 0e 06 |..C....h........|
00000120: ee 1f 42 ec 00 00 00 11 b2 ec 05 0e 06 ee 12 43 |..B............C|
00000130: eb 00 00 00 11 b2 ec 06 0e 0e 06 ee 04 24 00 00 |.............$..|
00000140: 24 01 00 0e 0b b8 4e 42 00 00 00 07 0b 0b ba 4e |$.....NB.......N|
00000150: ef 00 00 00 4e f0 00 00 00 26 03 00 e4 39 ed 00 |....N....&...9..|
00000160: 00 00 43 ee 00 00 00 68 01 00 11 b2 ec 05 0e 06 |..C....h........|
00000170: ee 10 b8 48 11 b2 ec 05 0e 06 ee 06 42 42 00 00 |...H........BB..|
00000180: 00 11 b2 ec 07 0e 04 f1 00 00 00 24 01 00 0e 39 |...........$...9|
00000190: ed 00 00 00 43 ee 00 00 00 68 01 00 11 b2 ec 05 |....C....h......|
000001a0: 0e 06 ee 1d b9 48 11 b2 ec 05 0e 06 ee 13 42 f0 |.....H........B.|
000001b0: 00 00 00 11 b2 ec 05 0e 06 ee 06 42 ef 00 00 00 |...........B....|
000001c0: 11 b2 ec 03 0e b7 24 01 00 0e 39 ed 00 00 00 43 |......$...9....C|
000001d0: ee 00 00 00 68 00 00 11 b2 ec 05 0e 06 ee 13 42 |....h..........B|
000001e0: f1 00 00 00 11 b2 ec 05 0e 06 ee 06 42 f2 00 00 |............B...|
000001f0: 00 24 01 00 0e 06 2f c8 03 44 00 00 00 2e 12 00 |.$..../..D......|
00000200: 1b 0e 1b 0a 11 08 43 12 43 1b 17 15 1b 0e 1b 0a |......C.C.......|
00000210: 11 08 43 12 70 12 11 2d 95 15 1b 0e 1b 0a 3e 08 |..C.p..-......>.|
00000220: 07 0a 75 13 17 15 1b 0e 1b 0a 3e 08 07 0a 43 10 |..u.......>...C.|
00000230: 61 23 17 15 1b 0e 1b 0a 11 08 43 12 43 1b 00 0c |a#........C.C...|
00000240: 42 07 01 00 00 00 00 01 00 00 06 00 04 f3 00 00 |B...............|
00000250: 00 28 c8 03 04 04 08 1c 08 00                   |.(........|
```