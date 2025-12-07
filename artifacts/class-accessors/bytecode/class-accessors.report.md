# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/class-accessors.ts
**生成时间**: 2025-12-07T15:31:53.778Z

## 大小对比

- TypeScript编译器: 408 字节
- WASM编译器: 470 字节
- 差异: -62 字节 (-13.19%)

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
      "rawLength": 92,
      "actualLength": 46,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/class-accessors.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "Box",
      "offset": 49
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 53
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 55
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 63
    },
    {
      "index": 5,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "Getting value",
      "offset": 67
    },
    {
      "index": 6,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "_value",
      "offset": 81
    },
    {
      "index": 7,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "v",
      "offset": 88
    },
    {
      "index": 8,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "Setting value",
      "offset": 90
    }
  ],
  "functionHeader": {
    "offset": 104,
    "tag": "0xd",
    "remaining": 304
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
      "rawLength": 92,
      "actualLength": 46,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/class-accessors.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "Box",
      "offset": 49
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 53
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 55
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 63
    },
    {
      "index": 5,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "Getting value",
      "offset": 67
    },
    {
      "index": 6,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "_value",
      "offset": 81
    },
    {
      "index": 7,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "v",
      "offset": 88
    },
    {
      "index": 8,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "Setting value",
      "offset": 90
    }
  ],
  "functionHeader": {
    "offset": 104,
    "tag": "0xd",
    "remaining": 366
  }
}
```

## 字节级差异

共发现 310 个字节差异:

- 偏移量 0x77: TS=0x00 vs WASM=0x02
- 偏移量 0x7a: TS=0x03 vs WASM=0x02
- 偏移量 0x7b: TS=0x03 vs WASM=0x04
- 偏移量 0x7c: TS=0x4f vs WASM=0x57
- 偏移量 0x7d: TS=0x00 vs WASM=0x02
- 偏移量 0x80: TS=0x00 vs WASM=0x02
- 偏移量 0x81: TS=0x0d vs WASM=0x00
- 偏移量 0x82: TS=0xb8 vs WASM=0x30
- 偏移量 0x83: TS=0x05 vs WASM=0xf0
- 偏移量 0x84: TS=0x00 vs WASM=0x01
- 偏移量 0x85: TS=0x0d vs WASM=0x03
- 偏移量 0x86: TS=0xcc vs WASM=0x01
- 偏移量 0x87: TS=0x03 vs WASM=0x70
- 偏移量 0x88: TS=0x02 vs WASM=0xca
- 偏移量 0x89: TS=0x0d vs WASM=0x03
- 偏移量 0x8a: TS=0x08 vs WASM=0x00
- 偏移量 0x8b: TS=0xec vs WASM=0x09
- 偏移量 0x8c: TS=0x02 vs WASM=0xcc
- 偏移量 0x8d: TS=0x29 vs WASM=0x03
- 偏移量 0x8e: TS=0x63 vs WASM=0x01
- ... (显示前20个差异，总共310个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 09 5c 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..\__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6c 61 73 73 2d 61 63 63 65 73 73 6f 72 73 2e 6a |lass-accessors.j|
00000030: 73 06 42 6f 78 02 62 0e 63 6f 6e 73 6f 6c 65 06 |s.Box.b.console.|
00000040: 6c 6f 67 1a 47 65 74 74 69 6e 67 20 76 61 6c 75 |log.Getting valu|
00000050: 65 0c 5f 76 61 6c 75 65 02 76 1a 53 65 74 74 69 |e._value.v.Setti|
00000060: 6e 67 20 76 61 6c 75 65 0d c8 03 00 00 00 00 00 |ng value........|
00000070: 0c 20 06 01 a4 01 00 00 00 03 03 03 4f 00 ca 03 |. ..........O...|
00000080: 00 0d b8 05 00 0d cc 03 02 0d 08 ec 02 29 63 ff |.............)c.|
00000090: ff 06 63 00 00 c2 00 58 e5 00 00 00 00 c2 01 56 |..c....X.......V|
000000a0: 42 00 00 00 01 c2 02 56 42 00 00 00 02 cb 6b 00 |B......VB.....k.|
000000b0: 00 5c ff ff e3 e5 68 02 00 bf 0a 44 42 00 00 00 |.\....h....DB...|
000000c0: 0e 39 e7 00 00 00 43 e8 00 00 00 68 02 00 42 42 |.9....C....h..BB|
000000d0: 00 00 00 24 01 00 0e 06 2f c8 03 10 00 00 00 2c |...$..../......,|
000000e0: 18 00 3a 00 1b 0e 1b 0a 11 02 1b 03 00 0c 03 04 |..:.............|
000000f0: 01 ca 03 00 01 00 02 01 00 1c 01 10 00 00 10 b8 |................|
00000100: 05 01 0c 08 cb 2b 68 00 00 11 ec 06 c7 1b 24 00 |.....+h.......$.|
00000110: 00 0e 68 00 00 11 ec 06 c7 1b 24 00 00 0e 29 c8 |..h.......$...).|
00000120: 03 02 00 00 00 0c 00 00 00 84 01 00 02 00 03 00 |................|
00000130: 00 1f 02 10 00 00 10 b2 05 00 00 00 0c 04 cc 08 |................|
00000140: cb 39 e7 00 00 00 43 e8 00 00 00 04 e9 00 00 00 |.9....C.........|
00000150: 24 01 00 0e 08 42 ea 00 00 00 28 0c 00 00 00 84 |$....B....(.....|
00000160: 01 01 02 01 03 00 00 21 03 d6 03 00 01 00 10 00 |.......!........|
00000170: 00 10 b2 05 00 00 00 0c 04 cc 08 cb 39 e7 00 00 |............9...|
00000180: 00 43 e8 00 00 00 04 ec 00 00 00 24 01 00 0e 08 |.C.........$....|
00000190: d3 44 ea 00 00 00 0e 29                         |.D.....)|
```

### WASM
```
00000000: 05 09 5c 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..\__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6c 61 73 73 2d 61 63 63 65 73 73 6f 72 73 2e 6a |lass-accessors.j|
00000030: 73 06 42 6f 78 02 62 0e 63 6f 6e 73 6f 6c 65 06 |s.Box.b.console.|
00000040: 6c 6f 67 1a 47 65 74 74 69 6e 67 20 76 61 6c 75 |log.Getting valu|
00000050: 65 0c 5f 76 61 6c 75 65 02 76 1a 53 65 74 74 69 |e._value.v.Setti|
00000060: 6e 67 20 76 61 6c 75 65 0d c8 03 00 00 00 00 00 |ng value........|
00000070: 0c 20 06 01 a4 01 00 02 00 03 02 04 57 02 ca 03 |. ..........W...|
00000080: 02 00 30 f0 01 03 01 70 ca 03 00 09 cc 03 01 0d |..0....p........|
00000090: 08 ec 02 29 63 00 00 06 63 01 00 c1 02 58 e5 00 |...)c...c....X..|
000000a0: 00 00 00 c2 00 56 42 00 00 00 01 c2 01 56 42 00 |.....VB......VB.|
000000b0: 00 00 02 c2 03 52 cc 0e cf 6b 01 00 e3 68 00 00 |.....R...k...h..|
000000c0: 11 21 00 00 e4 68 01 00 bf 0a 44 42 00 00 00 39 |.!...h....DB...9|
000000d0: e7 00 00 00 43 e8 00 00 00 68 01 00 42 42 00 00 |....C....h..BB..|
000000e0: 00 24 01 00 0e 06 2f c8 03 16 00 00 00 2d 16 1c |.$..../......-..|
000000f0: 16 06 17 21 11 02 26 01 1b 0e 1b 0a 11 02 1b 03 |...!..&.........|
00000100: 00 0c 42 07 01 00 00 01 00 03 00 00 1c 01 10 00 |..B.............|
00000110: 01 00 08 cb 39 e7 00 00 00 43 e8 00 00 00 04 e9 |....9....C......|
00000120: 00 00 00 24 01 00 0e c7 42 ea 00 00 00 28 c8 03 |...$....B....(..|
00000130: 0c 02 04 0d 08 1b 0e 34 08 1c 00 1b 15 00 0c 42 |.......4.......B|
00000140: 07 01 00 01 01 01 03 00 00 1d 02 d6 03 00 01 00 |................|
00000150: 10 00 01 00 08 cb 39 e7 00 00 00 43 e8 00 00 00 |......9....C....|
00000160: 04 ec 00 00 00 24 01 00 0e c7 d3 44 ea 00 00 00 |.....$.....D....|
00000170: 29 c8 03 0c 06 04 0d 08 1b 0e 34 08 17 15 07 1c |).........4.....|
00000180: 00 0c 40 05 01 00 00 01 00 02 01 00 0f 01 10 00 |..@.............|
00000190: 01 00 f0 01 01 0d 08 cb 2b 68 00 00 11 ec 06 c7 |........+h......|
000001a0: 1b 24 00 00 29 c8 03 02 0a 00 00 0c 48 05 01 00 |.$..).......H...|
000001b0: 00 02 00 02 00 00 0f 02 10 00 01 00 ea 01 00 01 |................|
000001c0: 00 0c 04 cc 08 cb ee 01 c7 b7 4e ea 00 00 00 29 |..........N....)|
000001d0: c8 03 02 00 00 00                               |......|
```