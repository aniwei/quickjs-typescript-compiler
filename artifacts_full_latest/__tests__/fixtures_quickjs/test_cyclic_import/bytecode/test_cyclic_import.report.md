# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures_quickjs/test_cyclic_import.ts
**生成时间**: 2026-01-03T05:22:43.229Z

## 大小对比

- TypeScript编译器: 232 字节
- WASM编译器: 232 字节
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
      "rawLength": 96,
      "actualLength": 48,
      "isWideChar": 0,
      "string": "__tests__/fixtures_quickjs/test_cyclic_import.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "./assert.js",
      "offset": 51
    },
    {
      "index": 2,
      "rawLength": 52,
      "actualLength": 26,
      "isWideChar": 0,
      "string": "./fixture_cyclic_import.js",
      "offset": 63
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "f",
      "offset": 90
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "g",
      "offset": 92
    },
    {
      "index": 5,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "assert",
      "offset": 94
    },
    {
      "index": 6,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 101
    }
  ],
  "functionHeader": {
    "offset": 103,
    "tag": "0xd",
    "remaining": 129
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
      "rawLength": 96,
      "actualLength": 48,
      "isWideChar": 0,
      "string": "__tests__/fixtures_quickjs/test_cyclic_import.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "./assert.js",
      "offset": 51
    },
    {
      "index": 2,
      "rawLength": 52,
      "actualLength": 26,
      "isWideChar": 0,
      "string": "./fixture_cyclic_import.js",
      "offset": 63
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "f",
      "offset": 90
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "g",
      "offset": 92
    },
    {
      "index": 5,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "assert",
      "offset": 94
    },
    {
      "index": 6,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 101
    }
  ],
  "functionHeader": {
    "offset": 103,
    "tag": "0xd",
    "remaining": 129
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 07 60 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |..`__tests__/fix|
00000010: 74 75 72 65 73 5f 71 75 69 63 6b 6a 73 2f 74 65 |tures_quickjs/te|
00000020: 73 74 5f 63 79 63 6c 69 63 5f 69 6d 70 6f 72 74 |st_cyclic_import|
00000030: 2e 6a 73 16 2e 2f 61 73 73 65 72 74 2e 6a 73 34 |.js../assert.js4|
00000040: 2e 2f 66 69 78 74 75 72 65 5f 63 79 63 6c 69 63 |./fixture_cyclic|
00000050: 5f 69 6d 70 6f 72 74 2e 6a 73 02 66 02 67 0c 61 |_import.js.f.g.a|
00000060: 73 73 65 72 74 02 78 0d c8 03 02 ca 03 02 cc 03 |ssert.x.........|
00000070: 02 02 00 01 ce 03 00 02 d0 03 00 02 00 00 d2 03 |................|
00000080: 00 01 00 ce 03 01 00 0c 20 06 01 a4 01 00 00 00 |........ .......|
00000090: 03 03 01 14 00 d2 03 00 0c ce 03 01 0c d0 03 00 |................|
000000a0: 01 08 ec 05 c2 00 e5 29 68 00 00 68 01 00 b8 f1 |.......)h..h....|
000000b0: bb f2 0e 06 2f c8 03 0c 00 00 00 07 16 00 11 0e |..../...........|
000000c0: 16 02 0c 03 00 0c 43 06 01 d0 03 01 00 01 02 00 |......C.........|
000000d0: 00 04 01 d4 03 00 01 00 d3 b8 9f 28 c8 03 08 0a |...........(....|
000000e0: 07 02 2e 0c 04 07 11 00                         |........|
```

### WASM
```
00000000: 05 07 60 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |..`__tests__/fix|
00000010: 74 75 72 65 73 5f 71 75 69 63 6b 6a 73 2f 74 65 |tures_quickjs/te|
00000020: 73 74 5f 63 79 63 6c 69 63 5f 69 6d 70 6f 72 74 |st_cyclic_import|
00000030: 2e 6a 73 16 2e 2f 61 73 73 65 72 74 2e 6a 73 34 |.js../assert.js4|
00000040: 2e 2f 66 69 78 74 75 72 65 5f 63 79 63 6c 69 63 |./fixture_cyclic|
00000050: 5f 69 6d 70 6f 72 74 2e 6a 73 02 66 02 67 0c 61 |_import.js.f.g.a|
00000060: 73 73 65 72 74 02 78 0d c8 03 02 ca 03 02 cc 03 |ssert.x.........|
00000070: 02 02 00 01 ce 03 00 02 d0 03 00 02 00 00 d2 03 |................|
00000080: 00 01 00 ce 03 01 00 0c 20 06 01 a4 01 00 00 00 |........ .......|
00000090: 03 03 01 14 00 d2 03 00 0c ce 03 01 0c d0 03 00 |................|
000000a0: 01 08 ec 05 c2 00 e5 29 68 00 00 68 01 00 b8 f1 |.......)h..h....|
000000b0: bb f2 0e 06 2f c8 03 0c 00 00 00 07 16 00 11 0e |..../...........|
000000c0: 16 02 0c 03 00 0c 43 06 01 d0 03 01 00 01 02 00 |......C.........|
000000d0: 00 04 01 d4 03 00 01 00 d3 b8 9f 28 c8 03 08 0a |...........(....|
000000e0: 07 02 2e 0c 04 07 11 00                         |........|
```