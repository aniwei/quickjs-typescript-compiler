# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/closure-short.ts
**生成时间**: 2026-01-03T04:40:38.326Z

## 大小对比

- TypeScript编译器: 273 字节
- WASM编译器: 273 字节
- 差异: 0 字节 (0.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 8,
  "atoms": [
    {
      "index": 0,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "short",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 70,
      "actualLength": 35,
      "isWideChar": 0,
      "string": "__tests__/fixtures/closure-short.js",
      "offset": 8
    },
    {
      "index": 2,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "v0",
      "offset": 44
    },
    {
      "index": 3,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "v1",
      "offset": 47
    },
    {
      "index": 4,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "v2",
      "offset": 50
    },
    {
      "index": 5,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "v3",
      "offset": 53
    },
    {
      "index": 6,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "v4",
      "offset": 56
    },
    {
      "index": 7,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "inner",
      "offset": 59
    }
  ],
  "functionHeader": {
    "offset": 65,
    "tag": "0xc",
    "remaining": 208
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 8,
  "atoms": [
    {
      "index": 0,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "short",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 70,
      "actualLength": 35,
      "isWideChar": 0,
      "string": "__tests__/fixtures/closure-short.js",
      "offset": 8
    },
    {
      "index": 2,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "v0",
      "offset": 44
    },
    {
      "index": 3,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "v1",
      "offset": 47
    },
    {
      "index": 4,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "v2",
      "offset": 50
    },
    {
      "index": 5,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "v3",
      "offset": 53
    },
    {
      "index": 6,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "v4",
      "offset": 56
    },
    {
      "index": 7,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "inner",
      "offset": 59
    }
  ],
  "functionHeader": {
    "offset": 65,
    "tag": "0xc",
    "remaining": 208
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 08 0a 73 68 6f 72 74 46 5f 5f 74 65 73 74 73 |...shortF__tests|
00000010: 5f 5f 2f 66 69 78 74 75 72 65 73 2f 63 6c 6f 73 |__/fixtures/clos|
00000020: 75 72 65 2d 73 68 6f 72 74 2e 6a 73 04 76 30 04 |ure-short.js.v0.|
00000030: 76 31 04 76 32 04 76 33 04 76 34 0a 69 6e 6e 65 |v1.v2.v3.v4.inne|
00000040: 72 0c 00 06 00 a4 01 00 01 00 01 00 01 16 01 a6 |r...............|
00000050: 01 00 00 00 40 e4 00 00 00 40 c2 00 41 e4 00 00 |....@....@..A...|
00000060: 00 00 39 e4 00 00 00 f0 cf 28 ca 03 08 00 00 00 |..9......(......|
00000070: 0e 1e 00 1b 0a 00 0c 43 06 00 c8 03 00 06 00 01 |.......C........|
00000080: 00 01 13 06 cc 03 00 00 40 ce 03 00 01 40 d0 03 |........@....@..|
00000090: 00 02 40 d2 03 00 03 40 d4 03 00 04 40 d6 03 00 |..@....@....@...|
000000a0: 05 00 c2 00 c5 05 b7 cb b8 cc b9 cd ba ce bb c5 |................|
000000b0: 04 c4 05 f0 29 ca 03 08 00 00 00 0f 1a 08 0c 0a |....)...........|
000000c0: 00 0c 43 06 00 d6 03 00 00 00 01 05 00 14 00 cc |..C.............|
000000d0: 03 00 01 ce 03 01 01 d0 03 02 01 d2 03 03 01 d4 |................|
000000e0: 03 04 01 df 91 e3 e0 91 e4 e1 91 e5 e2 91 e6 60 |...............`|
000000f0: 04 00 91 61 04 00 29 ca 03 16 06 04 03 08 07 04 |...a..).........|
00000100: 0d 03 07 04 0d 03 07 04 0d 03 07 04 0d 03 11 04 |................|
00000110: 00                                              |.|
```

### WASM
```
00000000: 05 08 0a 73 68 6f 72 74 46 5f 5f 74 65 73 74 73 |...shortF__tests|
00000010: 5f 5f 2f 66 69 78 74 75 72 65 73 2f 63 6c 6f 73 |__/fixtures/clos|
00000020: 75 72 65 2d 73 68 6f 72 74 2e 6a 73 04 76 30 04 |ure-short.js.v0.|
00000030: 76 31 04 76 32 04 76 33 04 76 34 0a 69 6e 6e 65 |v1.v2.v3.v4.inne|
00000040: 72 0c 00 06 00 a4 01 00 01 00 01 00 01 16 01 a6 |r...............|
00000050: 01 00 00 00 40 e4 00 00 00 40 c2 00 41 e4 00 00 |....@....@..A...|
00000060: 00 00 39 e4 00 00 00 f0 cf 28 ca 03 08 00 00 00 |..9......(......|
00000070: 0e 1e 00 1b 0a 00 0c 43 06 00 c8 03 00 06 00 01 |.......C........|
00000080: 00 01 13 06 cc 03 00 00 40 ce 03 00 01 40 d0 03 |........@....@..|
00000090: 00 02 40 d2 03 00 03 40 d4 03 00 04 40 d6 03 00 |..@....@....@...|
000000a0: 05 00 c2 00 c5 05 b7 cb b8 cc b9 cd ba ce bb c5 |................|
000000b0: 04 c4 05 f0 29 ca 03 08 00 00 00 0f 1a 08 0c 0a |....)...........|
000000c0: 00 0c 43 06 00 d6 03 00 00 00 01 05 00 14 00 cc |..C.............|
000000d0: 03 00 01 ce 03 01 01 d0 03 02 01 d2 03 03 01 d4 |................|
000000e0: 03 04 01 df 91 e3 e0 91 e4 e1 91 e5 e2 91 e6 60 |...............`|
000000f0: 04 00 91 61 04 00 29 ca 03 16 06 04 03 08 07 04 |...a..).........|
00000100: 0d 03 07 04 0d 03 07 04 0d 03 07 04 0d 03 11 04 |................|
00000110: 00                                              |.|
```