# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/optional-chaining.ts
**生成时间**: 2025-12-16T14:11:02.574Z

## 大小对比

- TypeScript编译器: 460 字节
- WASM编译器: 619 字节
- 差异: -159 字节 (-25.69%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 15,
  "atoms": [
    {
      "index": 0,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "user",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "list",
      "offset": 7
    },
    {
      "index": 2,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "alice",
      "offset": 12
    },
    {
      "index": 3,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "a@example.com",
      "offset": 18
    },
    {
      "index": 4,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "email",
      "offset": 32
    },
    {
      "index": 5,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "contact",
      "offset": 38
    },
    {
      "index": 6,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "profile",
      "offset": 46
    },
    {
      "index": 7,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 54
    },
    {
      "index": 8,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 62
    },
    {
      "index": 9,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "greet",
      "offset": 66
    },
    {
      "index": 10,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "deep",
      "offset": 72
    },
    {
      "index": 11,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "nested",
      "offset": 77
    },
    {
      "index": 12,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "missing",
      "offset": 84
    },
    {
      "index": 13,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "prop",
      "offset": 92
    },
    {
      "index": 14,
      "rawLength": 78,
      "actualLength": 39,
      "isWideChar": 0,
      "string": "__tests__/fixtures/optional-chaining.js",
      "offset": 97
    }
  ],
  "functionHeader": {
    "offset": 137,
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
  "userAtomCount": 16,
  "atoms": [
    {
      "index": 0,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "user",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "list",
      "offset": 7
    },
    {
      "index": 2,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "alice",
      "offset": 12
    },
    {
      "index": 3,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "a@example.com",
      "offset": 18
    },
    {
      "index": 4,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "email",
      "offset": 32
    },
    {
      "index": 5,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "contact",
      "offset": 38
    },
    {
      "index": 6,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "greet",
      "offset": 46
    },
    {
      "index": 7,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "profile",
      "offset": 52
    },
    {
      "index": 8,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 60
    },
    {
      "index": 9,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 68
    },
    {
      "index": 10,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "deep",
      "offset": 72
    },
    {
      "index": 11,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "nested",
      "offset": 77
    },
    {
      "index": 12,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "missing",
      "offset": 84
    },
    {
      "index": 13,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "prop",
      "offset": 92
    },
    {
      "index": 14,
      "rawLength": 78,
      "actualLength": 39,
      "isWideChar": 0,
      "string": "__tests__/fixtures/optional-chaining.js",
      "offset": 97
    },
    {
      "index": 15,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "hi",
      "offset": 137
    }
  ],
  "functionHeader": {
    "offset": 140,
    "tag": "0xc",
    "remaining": 479
  }
}
```

## 字节级差异

共发现 456 个字节差异:

- 偏移量 0x1: TS=0x0f vs WASM=0x10
- 偏移量 0x2e: TS=0x0e vs WASM=0x0a
- 偏移量 0x2f: TS=0x70 vs WASM=0x67
- 偏移量 0x31: TS=0x6f vs WASM=0x65
- 偏移量 0x32: TS=0x66 vs WASM=0x65
- 偏移量 0x33: TS=0x69 vs WASM=0x74
- 偏移量 0x34: TS=0x6c vs WASM=0x0e
- 偏移量 0x35: TS=0x65 vs WASM=0x70
- 偏移量 0x36: TS=0x0e vs WASM=0x72
- 偏移量 0x37: TS=0x63 vs WASM=0x6f
- 偏移量 0x38: TS=0x6f vs WASM=0x66
- 偏移量 0x39: TS=0x6e vs WASM=0x69
- 偏移量 0x3a: TS=0x73 vs WASM=0x6c
- 偏移量 0x3b: TS=0x6f vs WASM=0x65
- 偏移量 0x3c: TS=0x6c vs WASM=0x0e
- 偏移量 0x3d: TS=0x65 vs WASM=0x63
- 偏移量 0x3e: TS=0x06 vs WASM=0x6f
- 偏移量 0x3f: TS=0x6c vs WASM=0x6e
- 偏移量 0x40: TS=0x6f vs WASM=0x73
- 偏移量 0x41: TS=0x67 vs WASM=0x6f
- ... (显示前20个差异，总共456个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 0f 08 75 73 65 72 08 6c 69 73 74 0a 61 6c 69 |...user.list.ali|
00000010: 63 65 1a 61 40 65 78 61 6d 70 6c 65 2e 63 6f 6d |ce.a@example.com|
00000020: 0a 65 6d 61 69 6c 0e 63 6f 6e 74 61 63 74 0e 70 |.email.contact.p|
00000030: 72 6f 66 69 6c 65 0e 63 6f 6e 73 6f 6c 65 06 6c |rofile.console.l|
00000040: 6f 67 0a 67 72 65 65 74 08 64 65 65 70 0c 6e 65 |og.greet.deep.ne|
00000050: 73 74 65 64 0e 6d 69 73 73 69 6e 67 08 70 72 6f |sted.missing.pro|
00000060: 70 4e 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 |pN__tests__/fixt|
00000070: 75 72 65 73 2f 6f 70 74 69 6f 6e 61 6c 2d 63 68 |ures/optional-ch|
00000080: 61 69 6e 69 6e 67 2e 6a 73 0c 00 06 00 a4 01 00 |aining.js.......|
00000090: 01 00 05 00 00 85 02 01 a6 01 00 00 00 40 e4 00 |.............@..|
000000a0: 00 00 01 40 e5 00 00 00 01 3f e4 00 00 00 10 3f |...@.....?.....?|
000000b0: e5 00 00 00 10 0b 0b 04 e6 00 00 00 4e 38 00 00 |............N8..|
000000c0: 00 0b 04 e7 00 00 00 4e e8 00 00 00 4e e9 00 00 |.......N....N...|
000000d0: 00 4e ea 00 00 00 3b e4 00 00 00 39 eb 00 00 00 |.N....;....9....|
000000e0: 43 ec 00 00 00 39 e4 00 00 00 42 ea 00 00 00 42 |C....9....B....B|
000000f0: 38 00 00 00 24 01 00 cb 39 eb 00 00 00 43 ec 00 |8...$...9....C..|
00000100: 00 00 39 e4 00 00 00 42 ea 00 00 00 43 ed 00 00 |..9....B....C...|
00000110: 00 24 00 00 24 01 00 cb 0b b8 4e 42 00 00 00 07 |.$..$.....NB....|
00000120: 0b 0b ba 4e ee 00 00 00 4e ef 00 00 00 26 03 00 |...N....N....&..|
00000130: 3b e5 00 00 00 39 eb 00 00 00 43 ec 00 00 00 39 |;....9....C....9|
00000140: e5 00 00 00 b8 48 42 42 00 00 00 11 b2 6c 0a 00 |.....HBB.....l..|
00000150: 00 00 0e 04 f0 00 00 00 24 01 00 cb 39 eb 00 00 |........$...9...|
00000160: 00 43 ec 00 00 00 39 e5 00 00 00 b9 48 42 ef 00 |.C....9.....HB..|
00000170: 00 00 42 ee 00 00 00 11 b2 6c 06 00 00 00 0e b7 |..B......l......|
00000180: 24 01 00 cb 39 eb 00 00 00 43 ec 00 00 00 39 e4 |$...9....C....9.|
00000190: 00 00 00 42 f0 00 00 00 42 f1 00 00 00 24 01 00 |...B....B....$..|
000001a0: cf 28 e4 03 26 00 00 7a 1a 08 00 08 02 1b 0b 1c |.(..&..z........|
000001b0: 12 07 12 1b 0d 1b 15 00 05 03 07 1a 04 00 05 12 |................|
000001c0: 0b 34 18 4d 17 17 00 34 18 5c 17 00             |.4.M...4.\..|
```

### WASM
```
00000000: 05 10 08 75 73 65 72 08 6c 69 73 74 0a 61 6c 69 |...user.list.ali|
00000010: 63 65 1a 61 40 65 78 61 6d 70 6c 65 2e 63 6f 6d |ce.a@example.com|
00000020: 0a 65 6d 61 69 6c 0e 63 6f 6e 74 61 63 74 0a 67 |.email.contact.g|
00000030: 72 65 65 74 0e 70 72 6f 66 69 6c 65 0e 63 6f 6e |reet.profile.con|
00000040: 73 6f 6c 65 06 6c 6f 67 08 64 65 65 70 0c 6e 65 |sole.log.deep.ne|
00000050: 73 74 65 64 0e 6d 69 73 73 69 6e 67 08 70 72 6f |sted.missing.pro|
00000060: 70 4e 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 |pN__tests__/fixt|
00000070: 75 72 65 73 2f 6f 70 74 69 6f 6e 61 6c 2d 63 68 |ures/optional-ch|
00000080: 61 69 6e 69 6e 67 2e 6a 73 04 68 69 0c 00 06 00 |aining.js.hi....|
00000090: a4 01 00 01 00 05 00 01 e8 02 01 a6 01 00 00 00 |................|
000000a0: 40 e4 00 00 00 80 40 e5 00 00 00 80 3f e4 00 00 |@.....@.....?...|
000000b0: 00 80 3f e5 00 00 00 80 0b 0b 04 e6 00 00 00 4e |..?............N|
000000c0: 38 00 00 00 0b 04 e7 00 00 00 4e e8 00 00 00 4e |8.........N....N|
000000d0: e9 00 00 00 c2 00 56 ea 00 00 00 04 4e eb 00 00 |......V.....N...|
000000e0: 00 3b e4 00 00 00 39 ec 00 00 00 43 ed 00 00 00 |.;....9....C....|
000000f0: 39 e4 00 00 00 11 b2 ec 05 0e 06 ee 13 42 eb 00 |9............B..|
00000100: 00 00 11 b2 ec 05 0e 06 ee 06 42 38 00 00 00 24 |..........B8...$|
00000110: 01 00 cb 39 ec 00 00 00 43 ed 00 00 00 39 e4 00 |...9....C....9..|
00000120: 00 00 11 b2 ec 05 0e 06 ee 1f 42 eb 00 00 00 11 |..........B.....|
00000130: b2 ec 05 0e 06 ee 12 43 ea 00 00 00 11 b2 ec 06 |.......C........|
00000140: 0e 0e 06 ee 04 24 00 00 24 01 00 cb 0b b8 4e 42 |.....$..$.....NB|
00000150: 00 00 00 07 0b 0b ba 4e ee 00 00 00 4e ef 00 00 |.......N....N...|
00000160: 00 26 03 00 3b e5 00 00 00 39 ec 00 00 00 43 ed |.&..;....9....C.|
00000170: 00 00 00 39 e5 00 00 00 11 b2 ec 05 0e 06 ee 10 |...9............|
00000180: b8 48 11 b2 ec 05 0e 06 ee 06 42 42 00 00 00 11 |.H........BB....|
00000190: b2 ec 07 0e 04 f0 00 00 00 24 01 00 cb 39 ec 00 |.........$...9..|
000001a0: 00 00 43 ed 00 00 00 39 e5 00 00 00 11 b2 ec 05 |..C....9........|
000001b0: 0e 06 ee 1d b9 48 11 b2 ec 05 0e 06 ee 13 42 ef |.....H........B.|
000001c0: 00 00 00 11 b2 ec 05 0e 06 ee 06 42 ee 00 00 00 |...........B....|
000001d0: 11 b2 ec 03 0e b7 24 01 00 cb 39 ec 00 00 00 43 |......$...9....C|
000001e0: ed 00 00 00 39 e4 00 00 00 11 b2 ec 05 0e 06 ee |....9...........|
000001f0: 13 42 f0 00 00 00 11 b2 ec 05 0e 06 ee 06 42 f1 |.B............B.|
00000200: 00 00 00 24 01 00 cf 28 e4 03 44 00 00 00 46 12 |...$...(..D...F.|
00000210: 00 1b 0e 1b 0a 1b 08 43 12 43 1b 17 15 1b 0e 1b |.......C.C......|
00000220: 0a 1b 08 43 12 70 12 11 2d a9 15 1b 0e 1b 0a 48 |...C.p..-......H|
00000230: 08 07 0a 75 13 17 15 1b 0e 1b 0a 48 08 07 0a 43 |...u.......H...C|
00000240: 10 61 23 17 15 1b 0e 1b 0a 1b 08 43 12 43 1b 00 |.a#........C.C..|
00000250: 0c 42 07 00 00 00 00 00 01 00 00 06 00 04 f3 00 |.B..............|
00000260: 00 00 28 e4 03 04 04 08 1c 08 00                |..(........|
```