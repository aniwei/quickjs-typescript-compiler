# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/object-methods.ts
**生成时间**: 2025-12-07T15:10:26.076Z

## 大小对比

- TypeScript编译器: 209 字节
- WASM编译器: 209 字节
- 差异: 0 字节 (0.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 6,
  "atoms": [
    {
      "index": 0,
      "rawLength": 90,
      "actualLength": 45,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/object-methods.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 48
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 52
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 54
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 62
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 66
    }
  ],
  "functionHeader": {
    "offset": 68,
    "tag": "0xd",
    "remaining": 141
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 6,
  "atoms": [
    {
      "index": 0,
      "rawLength": 90,
      "actualLength": 45,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/object-methods.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 48
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 52
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 54
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 62
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 66
    }
  ],
  "functionHeader": {
    "offset": 68,
    "tag": "0xd",
    "remaining": 141
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 06 5a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..Z__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6f |piler/fixtures/o|
00000020: 62 6a 65 63 74 2d 6d 65 74 68 6f 64 73 2e 6a 73 |bject-methods.js|
00000030: 06 6f 62 6a 02 78 0e 63 6f 6e 73 6f 6c 65 06 6c |.obj.x.console.l|
00000040: 6f 67 02 79 0d c8 03 00 00 00 00 00 0c 20 06 01 |og.y......... ..|
00000050: a4 01 00 00 00 05 01 01 30 00 ca 03 00 0d 08 ec |........0.......|
00000060: 02 29 0b b8 4e e6 00 00 00 c2 00 56 6a 00 00 00 |.)..N......Vj...|
00000070: 04 e3 39 e7 00 00 00 43 e8 00 00 00 68 00 00 43 |..9....C....h..C|
00000080: 6a 00 00 00 b9 24 01 00 24 01 00 0e 06 2f c8 03 |j....$..$..../..|
00000090: 10 00 00 00 14 0c 00 1b 0e 1b 0a 11 06 20 08 11 |............. ..|
000000a0: 0f 00 0c 42 07 01 00 01 01 01 02 00 00 0b 02 d2 |...B............|
000000b0: 03 00 01 00 10 00 01 00 08 cb c7 42 e6 00 00 00 |...........B....|
000000c0: d3 9f 28 c8 03 0a 02 04 12 1e 1b 0a 07 03 07 1b |..(.............|
000000d0: 00                                              |.|
```

### WASM
```
00000000: 05 06 5a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..Z__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6f |piler/fixtures/o|
00000020: 62 6a 65 63 74 2d 6d 65 74 68 6f 64 73 2e 6a 73 |bject-methods.js|
00000030: 06 6f 62 6a 02 78 0e 63 6f 6e 73 6f 6c 65 06 6c |.obj.x.console.l|
00000040: 6f 67 02 79 0d c8 03 00 00 00 00 00 0c 20 06 01 |og.y......... ..|
00000050: a4 01 00 00 00 05 01 01 30 00 ca 03 00 0d 08 ec |........0.......|
00000060: 02 29 0b b8 4e e6 00 00 00 c2 00 56 6a 00 00 00 |.)..N......Vj...|
00000070: 04 e3 39 e7 00 00 00 43 e8 00 00 00 68 00 00 43 |..9....C....h..C|
00000080: 6a 00 00 00 b9 24 01 00 24 01 00 0e 06 2f c8 03 |j....$..$..../..|
00000090: 10 00 00 00 14 0c 00 1b 0e 1b 0a 11 06 20 08 11 |............. ..|
000000a0: 0f 00 0c 42 07 01 00 01 01 01 02 00 00 0b 02 d2 |...B............|
000000b0: 03 00 01 00 10 00 01 00 08 cb c7 42 e6 00 00 00 |...........B....|
000000c0: d3 9f 28 c8 03 0a 02 04 12 1e 1b 0a 07 03 07 1b |..(.............|
000000d0: 00                                              |.|
```