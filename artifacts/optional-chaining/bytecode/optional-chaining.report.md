# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/compiler/fixtures/optional-chaining.ts
**生成时间**: 2025-12-11T11:32:28.139Z

## 大小对比

- TypeScript编译器: 602 字节
- WASM编译器: 602 字节
- 差异: 0 字节 (0.00%)

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
    "remaining": 453
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

共发现 200 个字节差异:

- 偏移量 0xb5: TS=0xff vs WASM=0xec
- 偏移量 0xd4: TS=0xd5 vs WASM=0xc2
- 偏移量 0xe1: TS=0xf6 vs WASM=0xe3
- 偏移量 0xec: TS=0x64 vs WASM=0x68
- 偏移量 0xf1: TS=0x6c vs WASM=0xec
- 偏移量 0xf2: TS=0x0b vs WASM=0x05
- 偏移量 0xf3: TS=0x00 vs WASM=0x0e
- 偏移量 0xf4: TS=0x00 vs WASM=0x06
- 偏移量 0xf5: TS=0x00 vs WASM=0xee
- 偏移量 0xf6: TS=0x0e vs WASM=0x13
- 偏移量 0xf7: TS=0xff vs WASM=0x42
- 偏移量 0xf8: TS=0x02 vs WASM=0xec
- 偏移量 0xfa: TS=0x42 vs WASM=0x00
- 偏移量 0xfb: TS=0x01 vs WASM=0x00
- 偏移量 0xfc: TS=0x0d vs WASM=0x11
- 偏移量 0xfe: TS=0x6c vs WASM=0xec
- 偏移量 0xff: TS=0x0b vs WASM=0x05
- 偏移量 0x100: TS=0x00 vs WASM=0x0e
- 偏移量 0x101: TS=0x00 vs WASM=0x06
- 偏移量 0x102: TS=0x00 vs WASM=0xee
- ... (显示前20个差异，总共200个)

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
000000a0: 01 a4 01 00 00 00 05 02 01 c3 02 00 ca 03 00 0d |................|
000000b0: cc 03 01 0d 08 ff 02 29 0b 0b 04 e7 00 00 00 4e |.......).......N|
000000c0: 38 00 00 00 0b 04 e8 00 00 00 4e e9 00 00 00 4e |8.........N....N|
000000d0: ea 00 00 00 d5 00 56 eb 00 00 00 04 4e ec 00 00 |......V.....N...|
000000e0: 00 f6 39 ed 00 00 00 43 ee 00 00 00 64 00 00 11 |..9....C....d...|
000000f0: b2 6c 0b 00 00 00 0e ff 02 00 42 01 0d b2 6c 0b |.l........B...l.|
00000100: 00 00 00 0e ff 02 00 42 01 00 01 00 0e 39 ed 00 |.......B.....9..|
00000110: 00 00 43 ee 00 00 00 64 00 00 11 b2 6c 0b 00 00 |..C....d....l...|
00000120: 00 0e 06 6e 2e 00 00 00 ff ff 11 b2 01 16 0e 06 |...n............|
00000130: 6e 1b 00 00 00 ff ff 11 b2 01 09 0e 0e 06 6e 07 |n.............n.|
00000140: 00 00 ff 00 01 00 0e 01 fb 00 00 07 0b 0b cd 4e |...............N|
00000150: ef 00 00 00 4e f0 00 00 00 26 03 00 f7 39 ed 00 |....N....&...9..|
00000160: 00 00 43 ee 00 00 00 64 01 00 11 b2 6c 0b 00 00 |..C....d....l...|
00000170: 00 0e 06 6e 19 00 00 00 cb 48 11 b2 6c 0b ff f9 |...n.....H..l...|
00000180: 6e 09 01 04 00 00 00 11 ff f9 00 0e 01 fa 24 01 |n.............$.|
00000190: 00 0e 39 ed 00 ff f8 00 00 64 01 00 11 b2 6c 0b |..9......d....l.|
000001a0: 00 00 00 0e 06 6e 2c 00 00 00 cc 48 11 b2 6c 0b |.....n,....H..l.|
000001b0: 00 00 00 0e 06 6e ff f3 f0 00 01 0b 0b 00 00 00 |.....n..........|
000001c0: ff f6 00 00 01 01 11 b2 6c 06 00 00 00 ff f6 0e |........l.......|
000001d0: 39 01 f4 ee 00 00 00 64 00 00 ff f1 00 00 0e 06 |9......d........|
000001e0: 6e 1c 00 00 00 42 f1 00 00 00 11 b2 6c 0b 00 00 |n....B......l...|
000001f0: 00 0e 06 6e 09 00 00 c8 03 44 00 00 00 2e 12 00 |...n.....D......|
00000200: 25 0e 1b 0a 25 08 43 12 43 1b 17 15 25 0e 1b 0a |%...%.C.C...%...|
00000210: 25 08 43 12 70 12 11 2d 95 15 25 0e 1b 0a 25 08 |%.C.p..-..%...%.|
00000220: 34 0a 75 13 17 15 25 0e 1b 0a 25 08 34 0a 43 10 |4.u...%...%.4.C.|
00000230: 61 23 17 15 25 0e 1b 0a 25 08 43 12 43 1b 00 0c |a#..%...%.C.C...|
00000240: 42 07 01 00 00 00 00 01 00 00 06 00 04 f3 00 00 |B...............|
00000250: 00 28 c8 03 04 04 08 1c 08 00                   |.(........|
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