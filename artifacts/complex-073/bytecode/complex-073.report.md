# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures_generated/complex-073.ts
**生成时间**: 2025-12-25T01:17:44.100Z

## 大小对比

- TypeScript编译器: 289 字节
- WASM编译器: 289 字节
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
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 6
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "f",
      "offset": 8
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "g",
      "offset": 10
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 12
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 20
    },
    {
      "index": 6,
      "rawLength": 86,
      "actualLength": 43,
      "isWideChar": 0,
      "string": "__tests__/fixtures_generated/complex-073.js",
      "offset": 24
    },
    {
      "index": 7,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 68
    },
    {
      "index": 8,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "z",
      "offset": 70
    }
  ],
  "functionHeader": {
    "offset": 72,
    "tag": "0xc",
    "remaining": 217
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
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 6
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "f",
      "offset": 8
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "g",
      "offset": 10
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 12
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 20
    },
    {
      "index": 6,
      "rawLength": 86,
      "actualLength": 43,
      "isWideChar": 0,
      "string": "__tests__/fixtures_generated/complex-073.js",
      "offset": 24
    },
    {
      "index": 7,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 68
    },
    {
      "index": 8,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "z",
      "offset": 70
    }
  ],
  "functionHeader": {
    "offset": 72,
    "tag": "0xc",
    "remaining": 217
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 09 06 6f 62 6a 02 78 02 66 02 67 0e 63 6f 6e |...obj.x.f.g.con|
00000010: 73 6f 6c 65 06 6c 6f 67 56 5f 5f 74 65 73 74 73 |sole.logV__tests|
00000020: 5f 5f 2f 66 69 78 74 75 72 65 73 5f 67 65 6e 65 |__/fixtures_gene|
00000030: 72 61 74 65 64 2f 63 6f 6d 70 6c 65 78 2d 30 37 |rated/complex-07|
00000040: 33 2e 6a 73 02 79 02 7a 0c 00 06 00 a4 01 00 01 |3.js.y.z........|
00000050: 00 06 00 02 5c 01 a6 01 00 00 00 40 e4 00 00 00 |....\......@....|
00000060: 80 3f e4 00 00 00 80 0b bf 49 4e e5 00 00 00 c2 |.?.......IN.....|
00000070: 00 4f e6 00 00 00 4e e6 00 00 00 c2 01 4f e7 00 |.O....N......O..|
00000080: 00 00 4e e7 00 00 00 3b e4 00 00 00 39 e8 00 00 |..N....;....9...|
00000090: 00 43 e9 00 00 00 39 e4 00 00 00 43 e6 00 00 00 |.C....9....C....|
000000a0: b9 24 01 00 39 e4 00 00 00 43 e7 00 00 00 ba 24 |.$..9....C.....$|
000000b0: 01 00 24 02 00 cf 28 d4 03 16 00 00 00 31 0c 00 |..$...(......1..|
000000c0: 1b 0e 1b 0a 1b 06 20 04 11 0a 1b 06 20 04 11 1f |...... ..... ...|
000000d0: 00 0c 43 06 00 00 01 01 01 02 00 00 0b 02 d6 03 |..C.............|
000000e0: 00 01 00 10 00 01 00 08 cb c7 42 e5 00 00 00 d3 |..........B.....|
000000f0: 9f 28 d4 03 0a 03 07 11 34 1b 0a 07 03 07 1b 00 |.(......4.......|
00000100: 0c 02 06 00 00 01 00 01 02 00 00 05 01 d8 03 00 |................|
00000110: 01 00 d3 bf 49 9f 28 d4 03 06 04 07 02 0e 11 04 |....I.(.........|
00000120: 00                                              |.|
```

### WASM
```
00000000: 05 09 06 6f 62 6a 02 78 02 66 02 67 0e 63 6f 6e |...obj.x.f.g.con|
00000010: 73 6f 6c 65 06 6c 6f 67 56 5f 5f 74 65 73 74 73 |sole.logV__tests|
00000020: 5f 5f 2f 66 69 78 74 75 72 65 73 5f 67 65 6e 65 |__/fixtures_gene|
00000030: 72 61 74 65 64 2f 63 6f 6d 70 6c 65 78 2d 30 37 |rated/complex-07|
00000040: 33 2e 6a 73 02 79 02 7a 0c 00 06 00 a4 01 00 01 |3.js.y.z........|
00000050: 00 06 00 02 5c 01 a6 01 00 00 00 40 e4 00 00 00 |....\......@....|
00000060: 80 3f e4 00 00 00 80 0b bf 49 4e e5 00 00 00 c2 |.?.......IN.....|
00000070: 00 4f e6 00 00 00 4e e6 00 00 00 c2 01 4f e7 00 |.O....N......O..|
00000080: 00 00 4e e7 00 00 00 3b e4 00 00 00 39 e8 00 00 |..N....;....9...|
00000090: 00 43 e9 00 00 00 39 e4 00 00 00 43 e6 00 00 00 |.C....9....C....|
000000a0: b9 24 01 00 39 e4 00 00 00 43 e7 00 00 00 ba 24 |.$..9....C.....$|
000000b0: 01 00 24 02 00 cf 28 d4 03 16 00 00 00 31 0c 00 |..$...(......1..|
000000c0: 1b 0e 1b 0a 1b 06 20 04 11 0a 1b 06 20 04 11 1f |...... ..... ...|
000000d0: 00 0c 43 06 00 00 01 01 01 02 00 00 0b 02 d6 03 |..C.............|
000000e0: 00 01 00 10 00 01 00 08 cb c7 42 e5 00 00 00 d3 |..........B.....|
000000f0: 9f 28 d4 03 0a 03 07 11 34 1b 0a 07 03 07 1b 00 |.(......4.......|
00000100: 0c 02 06 00 00 01 00 01 02 00 00 05 01 d8 03 00 |................|
00000110: 01 00 d3 bf 49 9f 28 d4 03 06 04 07 02 0e 11 04 |....I.(.........|
00000120: 00                                              |.|
```