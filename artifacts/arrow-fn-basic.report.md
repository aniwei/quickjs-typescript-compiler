# 字节码分析报告

**输入文件**: tmp/arrow-fn-basic.ts
**生成时间**: 2025-10-03T12:35:21.863Z

## 大小对比

- TypeScript编译器: 298 字节
- WASM编译器: 298 字节
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
      "rawLength": 42,
      "actualLength": 21,
      "isWideChar": 0,
      "string": "tmp/arrow-fn-basic.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "double",
      "offset": 24
    },
    {
      "index": 2,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "arrArrow",
      "offset": 31
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 40
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "map",
      "offset": 44
    },
    {
      "index": 5,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "fn",
      "offset": 48
    },
    {
      "index": 6,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 51
    },
    {
      "index": 7,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 53
    },
    {
      "index": 8,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 55
    }
  ],
  "functionHeader": {
    "offset": 57,
    "tag": "0xd",
    "remaining": 241
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
      "rawLength": 42,
      "actualLength": 21,
      "isWideChar": 0,
      "string": "tmp/arrow-fn-basic.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "double",
      "offset": 24
    },
    {
      "index": 2,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "arrArrow",
      "offset": 31
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 40
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "map",
      "offset": 44
    },
    {
      "index": 5,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "fn",
      "offset": 48
    },
    {
      "index": 6,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 51
    },
    {
      "index": 7,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 53
    },
    {
      "index": 8,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 55
    }
  ],
  "functionHeader": {
    "offset": 57,
    "tag": "0xd",
    "remaining": 241
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 09 2a 74 6d 70 2f 61 72 72 6f 77 2d 66 6e 2d |..*tmp/arrow-fn-|
00000010: 62 61 73 69 63 2e 6a 73 0c 64 6f 75 62 6c 65 10 |basic.js.double.|
00000020: 61 72 72 41 72 72 6f 77 06 6f 62 6a 06 6d 61 70 |arrArrow.obj.map|
00000030: 04 66 6e 02 61 02 62 02 78 0d c8 03 00 00 00 00 |.fn.a.b.x.......|
00000040: 00 0c 20 06 01 a4 01 00 00 00 03 04 04 35 00 d4 |.. ..........5..|
00000050: 01 00 0d ca 03 01 0d cc 03 02 0d ce 03 03 0d 08 |................|
00000060: ec 02 29 c2 00 4f 6a 00 00 00 e3 c2 01 4f e5 00 |..)..Oj......O..|
00000070: 00 00 e4 b8 b9 ba 26 03 00 43 e8 00 00 00 c2 02 |......&..C......|
00000080: 24 01 00 e5 0b c2 03 4f e9 00 00 00 4e e9 00 00 |$......O....N...|
00000090: 00 e6 06 2f c8 03 08 00 00 00 1a 08 34 25 08 00 |.../........4%..|
000000a0: 0c 02 06 01 00 02 00 02 02 00 00 04 02 d4 03 00 |................|
000000b0: 01 00 d6 03 00 01 00 d3 d4 9f 28 c8 03 08 00 0c |..........(.....|
000000c0: 02 14 07 08 07 03 00 0c 02 06 01 00 01 00 01 02 |................|
000000d0: 00 00 04 01 d8 03 00 01 00 d3 b9 9c 28 c8 03 08 |............(...|
000000e0: 01 0f 03 07 0c 04 07 11 00 0c 02 06 01 00 01 00 |................|
000000f0: 01 02 00 00 05 01 d8 03 00 01 00 d3 bf 0a 9c 28 |...............(|
00000100: c8 03 06 04 1f 02 0a 11 04 00 0c 02 06 01 00 01 |................|
00000110: 00 01 02 00 00 04 01 d8 03 00 01 00 d3 b8 9f 28 |...............(|
00000120: c8 03 06 05 12 02 0e 0c 04 00                   |..........|
```

### WASM
```
00000000: 05 09 2a 74 6d 70 2f 61 72 72 6f 77 2d 66 6e 2d |..*tmp/arrow-fn-|
00000010: 62 61 73 69 63 2e 6a 73 0c 64 6f 75 62 6c 65 10 |basic.js.double.|
00000020: 61 72 72 41 72 72 6f 77 06 6f 62 6a 06 6d 61 70 |arrArrow.obj.map|
00000030: 04 66 6e 02 61 02 62 02 78 0d c8 03 00 00 00 00 |.fn.a.b.x.......|
00000040: 00 0c 20 06 01 a4 01 00 00 00 03 04 04 35 00 d4 |.. ..........5..|
00000050: 01 00 0d ca 03 01 0d cc 03 02 0d ce 03 03 0d 08 |................|
00000060: ec 02 29 c2 00 4f 6a 00 00 00 e3 c2 01 4f e5 00 |..)..Oj......O..|
00000070: 00 00 e4 b8 b9 ba 26 03 00 43 e8 00 00 00 c2 02 |......&..C......|
00000080: 24 01 00 e5 0b c2 03 4f e9 00 00 00 4e e9 00 00 |$......O....N...|
00000090: 00 e6 06 2f c8 03 08 00 00 00 1a 08 34 25 08 00 |.../........4%..|
000000a0: 0c 02 06 01 00 02 00 02 02 00 00 04 02 d4 03 00 |................|
000000b0: 01 00 d6 03 00 01 00 d3 d4 9f 28 c8 03 08 00 0c |..........(.....|
000000c0: 02 14 07 08 07 03 00 0c 02 06 01 00 01 00 01 02 |................|
000000d0: 00 00 04 01 d8 03 00 01 00 d3 b9 9c 28 c8 03 08 |............(...|
000000e0: 01 0f 03 07 0c 04 07 11 00 0c 02 06 01 00 01 00 |................|
000000f0: 01 02 00 00 05 01 d8 03 00 01 00 d3 bf 0a 9c 28 |...............(|
00000100: c8 03 06 04 1f 02 0a 11 04 00 0c 02 06 01 00 01 |................|
00000110: 00 01 02 00 00 04 01 d8 03 00 01 00 d3 b8 9f 28 |...............(|
00000120: c8 03 06 05 12 02 0e 0c 04 00                   |..........|
```