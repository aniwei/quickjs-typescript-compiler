# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures_generated/complex-006.ts
**生成时间**: 2025-12-25T01:17:43.791Z

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
  "userAtomCount": 8,
  "atoms": [
    {
      "index": 0,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "run6",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 86,
      "actualLength": 43,
      "isWideChar": 0,
      "string": "__tests__/fixtures_generated/complex-006.js",
      "offset": 7
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "p",
      "offset": 51
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 53
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 55
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "v",
      "offset": 57
    },
    {
      "index": 6,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 59
    },
    {
      "index": 7,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 67
    }
  ],
  "functionHeader": {
    "offset": 71,
    "tag": "0xc",
    "remaining": 227
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
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "run6",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 86,
      "actualLength": 43,
      "isWideChar": 0,
      "string": "__tests__/fixtures_generated/complex-006.js",
      "offset": 7
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "p",
      "offset": 51
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 53
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 55
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "v",
      "offset": 57
    },
    {
      "index": 6,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 59
    },
    {
      "index": 7,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 67
    }
  ],
  "functionHeader": {
    "offset": 71,
    "tag": "0xc",
    "remaining": 227
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 08 08 72 75 6e 36 56 5f 5f 74 65 73 74 73 5f |...run6V__tests_|
00000010: 5f 2f 66 69 78 74 75 72 65 73 5f 67 65 6e 65 72 |_/fixtures_gener|
00000020: 61 74 65 64 2f 63 6f 6d 70 6c 65 78 2d 30 30 36 |ated/complex-006|
00000030: 2e 6a 73 02 70 02 61 02 62 02 76 0e 63 6f 6e 73 |.js.p.a.b.v.cons|
00000040: 6f 6c 65 06 6c 6f 67 0c 00 06 00 a4 01 00 01 00 |ole.log.........|
00000050: 03 00 02 20 01 a6 01 00 00 00 40 e4 00 00 00 40 |... ......@....@|
00000060: c2 00 41 e4 00 00 00 00 39 e4 00 00 00 f0 43 81 |..A.....9.....C.|
00000070: 00 00 00 c2 01 24 01 00 cf 28 ca 03 0c 00 00 00 |.....$...(......|
00000080: 0e 0e 00 1b 08 07 04 25 0a 00 0c 62 06 00 c8 03 |.......%...b....|
00000090: 00 03 00 04 00 00 37 03 cc 03 01 00 30 ce 03 01 |......7.....0...|
000000a0: 01 30 d0 03 01 02 30 63 02 00 63 01 00 63 00 00 |.0....0c..c..c..|
000000b0: 39 c7 00 00 00 43 82 00 00 00 bd 24 01 00 cb 64 |9....C.....$...d|
000000c0: 00 00 8d cc 39 c7 00 00 00 43 82 00 00 00 64 01 |....9....C....d.|
000000d0: 00 b8 9f 24 01 00 8d cd 64 02 00 b9 9c 2f ca 03 |...$....d..../..|
000000e0: 1a 01 00 30 1c 1b 0e 20 10 17 11 1c 00 1b 0e 1b |...0... ........|
000000f0: 12 16 04 07 05 1c 2f 16 04 07 11 00 0c 02 06 00 |....../.........|
00000100: 00 01 00 01 03 00 00 0e 01 d2 03 00 01 00 39 ea |..............9.|
00000110: 00 00 00 43 eb 00 00 00 d3 25 01 00 ca 03 0a 07 |...C.....%......|
00000120: 0c 02 0a 1b 0e 1b 0a 07 01 00                   |..........|
```

### WASM
```
00000000: 05 08 08 72 75 6e 36 56 5f 5f 74 65 73 74 73 5f |...run6V__tests_|
00000010: 5f 2f 66 69 78 74 75 72 65 73 5f 67 65 6e 65 72 |_/fixtures_gener|
00000020: 61 74 65 64 2f 63 6f 6d 70 6c 65 78 2d 30 30 36 |ated/complex-006|
00000030: 2e 6a 73 02 70 02 61 02 62 02 76 0e 63 6f 6e 73 |.js.p.a.b.v.cons|
00000040: 6f 6c 65 06 6c 6f 67 0c 00 06 00 a4 01 00 01 00 |ole.log.........|
00000050: 03 00 02 20 01 a6 01 00 00 00 40 e4 00 00 00 40 |... ......@....@|
00000060: c2 00 41 e4 00 00 00 00 39 e4 00 00 00 f0 43 81 |..A.....9.....C.|
00000070: 00 00 00 c2 01 24 01 00 cf 28 ca 03 0c 00 00 00 |.....$...(......|
00000080: 0e 0e 00 1b 08 07 04 25 0a 00 0c 62 06 00 c8 03 |.......%...b....|
00000090: 00 03 00 04 00 00 37 03 cc 03 01 00 30 ce 03 01 |......7.....0...|
000000a0: 01 30 d0 03 01 02 30 63 02 00 63 01 00 63 00 00 |.0....0c..c..c..|
000000b0: 39 c7 00 00 00 43 82 00 00 00 bd 24 01 00 cb 64 |9....C.....$...d|
000000c0: 00 00 8d cc 39 c7 00 00 00 43 82 00 00 00 64 01 |....9....C....d.|
000000d0: 00 b8 9f 24 01 00 8d cd 64 02 00 b9 9c 2f ca 03 |...$....d..../..|
000000e0: 1a 01 00 30 1c 1b 0e 20 10 17 11 1c 00 1b 0e 1b |...0... ........|
000000f0: 12 16 04 07 05 1c 2f 16 04 07 11 00 0c 02 06 00 |....../.........|
00000100: 00 01 00 01 03 00 00 0e 01 d2 03 00 01 00 39 ea |..............9.|
00000110: 00 00 00 43 eb 00 00 00 d3 25 01 00 ca 03 0a 07 |...C.....%......|
00000120: 0c 02 0a 1b 0e 1b 0a 07 01 00                   |..........|
```