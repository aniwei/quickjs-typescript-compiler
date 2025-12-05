# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/arrow-this.ts
**生成时间**: 2025-12-05T03:32:51.345Z

## 大小对比

- TypeScript编译器: 196 字节
- WASM编译器: 197 字节
- 差异: -1 字节 (-0.51%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 5,
  "atoms": [
    {
      "index": 0,
      "rawLength": 82,
      "actualLength": 41,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/arrow-this.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "Foo",
      "offset": 44
    },
    {
      "index": 2,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "arrow",
      "offset": 48
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 54
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 56
    }
  ],
  "functionHeader": {
    "offset": 58,
    "tag": "0xd",
    "remaining": 138
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 5,
  "atoms": [
    {
      "index": 0,
      "rawLength": 82,
      "actualLength": 41,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/arrow-this.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "Foo",
      "offset": 44
    },
    {
      "index": 2,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "arrow",
      "offset": 48
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 54
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 56
    }
  ],
  "functionHeader": {
    "offset": 58,
    "tag": "0xd",
    "remaining": 139
  }
}
```

## 字节级差异

共发现 107 个字节差异:

- 偏移量 0x4b: TS=0x03 vs WASM=0x01
- 偏移量 0x50: TS=0x08 vs WASM=0xca
- 偏移量 0x51: TS=0xec vs WASM=0x03
- 偏移量 0x52: TS=0x04 vs WASM=0x00
- 偏移量 0x53: TS=0xc2 vs WASM=0x01
- 偏移量 0x54: TS=0x00 vs WASM=0x08
- 偏移量 0x55: TS=0xe3 vs WASM=0xec
- 偏移量 0x56: TS=0x29 vs WASM=0x05
- 偏移量 0x57: TS=0x06 vs WASM=0xc2
- 偏移量 0x58: TS=0x2f vs WASM=0x00
- 偏移量 0x59: TS=0xc8 vs WASM=0xe3
- 偏移量 0x5a: TS=0x03 vs WASM=0x29
- 偏移量 0x5b: TS=0x00 vs WASM=0x06
- 偏移量 0x5c: TS=0x00 vs WASM=0x2f
- 偏移量 0x5d: TS=0x0c vs WASM=0xc8
- 偏移量 0x5e: TS=0x00 vs WASM=0x03
- 偏移量 0x5f: TS=0x04 vs WASM=0x02
- 偏移量 0x61: TS=0xca vs WASM=0x00
- 偏移量 0x62: TS=0x03 vs WASM=0x00
- 偏移量 0x63: TS=0x00 vs WASM=0x0c
- ... (显示前20个差异，总共107个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 05 52 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..R__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 61 |piler/fixtures/a|
00000020: 72 72 6f 77 2d 74 68 69 73 2e 6a 73 06 46 6f 6f |rrow-this.js.Foo|
00000030: 0a 61 72 72 6f 77 02 78 02 79 0d c8 03 00 00 00 |.arrow.x.y......|
00000040: 00 00 0c 20 06 01 a4 01 00 00 00 03 01 01 09 00 |... ............|
00000050: 08 ec 04 c2 00 e3 29 06 2f c8 03 00 00 0c 00 04 |......)./.......|
00000060: 00 ca 03 00 02 00 03 00 01 1b 02 10 00 00 cc 03 |................|
00000070: 00 00 08 cb b8 b8 c7 1b 44 e7 00 00 00 c2 00 4f |........D......O|
00000080: e6 00 00 00 5b 01 00 c8 22 00 00 0e 29 c8 03 0f |....[..."...)...|
00000090: 00 02 01 00 02 7f 00 07 01 00 00 01 00 0a 02 00 |................|
000000a0: 0c 00 04 00 00 00 00 00 03 01 00 0a 00 b9 b9 df |................|
000000b0: 1b 44 e8 00 00 00 29 c8 03 09 00 00 02 00 00 01 |.D....).........|
000000c0: 00 02 7f 00                                     |....|
```

### WASM
```
00000000: 05 05 52 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..R__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 61 |piler/fixtures/a|
00000020: 72 72 6f 77 2d 74 68 69 73 2e 6a 73 06 46 6f 6f |rrow-this.js.Foo|
00000030: 0a 61 72 72 6f 77 02 78 02 79 0d c8 03 00 00 00 |.arrow.x.y......|
00000040: 00 00 0c 20 06 01 a4 01 00 00 00 01 01 01 09 00 |... ............|
00000050: ca 03 00 01 08 ec 05 c2 00 e3 29 06 2f c8 03 02 |..........)./...|
00000060: 00 00 00 0c 43 06 01 ca 03 00 02 00 02 00 01 19 |....C...........|
00000070: 02 cc 03 01 00 30 10 00 01 40 08 cc 63 00 00 c8 |.....0...@..c...|
00000080: b8 44 e7 00 00 00 c2 00 4f e6 00 00 00 cb 64 00 |.D......O.....d.|
00000090: 00 f0 29 c8 03 0c 00 00 1c 08 07 08 00 0e 08 07 |..).............|
000000a0: 11 0a 00 0c 42 06 01 00 00 00 00 02 01 00 08 00 |....B...........|
000000b0: 10 01 01 df b9 44 e8 00 00 00 29 c8 03 06 02 12 |.....D....).....|
000000c0: 03 13 07 08 00                                  |.....|
```