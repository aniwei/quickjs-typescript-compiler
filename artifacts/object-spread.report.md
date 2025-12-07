# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/object-spread.ts
**生成时间**: 2025-12-07T15:10:32.481Z

## 大小对比

- TypeScript编译器: 167 字节
- WASM编译器: 167 字节
- 差异: 0 字节 (0.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 7,
  "atoms": [
    {
      "index": 0,
      "rawLength": 88,
      "actualLength": 44,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/object-spread.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 47
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 49
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 51
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 53
    },
    {
      "index": 5,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 55
    },
    {
      "index": 6,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 63
    }
  ],
  "functionHeader": {
    "offset": 67,
    "tag": "0xd",
    "remaining": 100
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 7,
  "atoms": [
    {
      "index": 0,
      "rawLength": 88,
      "actualLength": 44,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/object-spread.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 47
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 49
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 51
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 53
    },
    {
      "index": 5,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 55
    },
    {
      "index": 6,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 63
    }
  ],
  "functionHeader": {
    "offset": 67,
    "tag": "0xd",
    "remaining": 100
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 07 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6f |piler/fixtures/o|
00000020: 62 6a 65 63 74 2d 73 70 72 65 61 64 2e 6a 73 02 |bject-spread.js.|
00000030: 61 02 62 02 78 02 79 0e 63 6f 6e 73 6f 6c 65 06 |a.b.x.y.console.|
00000040: 6c 6f 67 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 |log......... ...|
00000050: 01 00 00 00 03 02 00 34 00 ca 03 00 0d cc 03 01 |.......4........|
00000060: 0d 08 ec 02 29 0b b8 4e e7 00 00 00 e3 0b 68 00 |....)..N......h.|
00000070: 00 07 55 06 0e 0e b9 4e e8 00 00 00 e4 39 e9 00 |..U....N.....9..|
00000080: 00 00 43 ea 00 00 00 68 01 00 42 e7 00 00 00 24 |..C....h..B....$|
00000090: 01 00 0e 06 2f c8 03 0e 00 00 44 1e 4e 1d 1b 0e |..../.....D.N...|
000000a0: 1b 0a 11 02 1b 03 00                            |.......|
```

### WASM
```
00000000: 05 07 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6f |piler/fixtures/o|
00000020: 62 6a 65 63 74 2d 73 70 72 65 61 64 2e 6a 73 02 |bject-spread.js.|
00000030: 61 02 62 02 78 02 79 0e 63 6f 6e 73 6f 6c 65 06 |a.b.x.y.console.|
00000040: 6c 6f 67 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 |log......... ...|
00000050: 01 00 00 00 03 02 00 34 00 ca 03 00 0d cc 03 01 |.......4........|
00000060: 0d 08 ec 02 29 0b b8 4e e7 00 00 00 e3 0b 68 00 |....)..N......h.|
00000070: 00 07 55 06 0e 0e b9 4e e8 00 00 00 e4 39 e9 00 |..U....N.....9..|
00000080: 00 00 43 ea 00 00 00 68 01 00 42 e7 00 00 00 24 |..C....h..B....$|
00000090: 01 00 0e 06 2f c8 03 0e 00 00 44 1e 4e 1d 1b 0e |..../.....D.N...|
000000a0: 1b 0a 11 02 1b 03 00                            |.......|
```