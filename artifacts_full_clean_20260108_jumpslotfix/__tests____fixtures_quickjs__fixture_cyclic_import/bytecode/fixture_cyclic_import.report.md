# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures_quickjs/fixture_cyclic_import.ts
**生成时间**: 2026-01-07T17:31:52.790Z

## 大小对比

- TypeScript编译器: 199 字节
- WASM编译器: 199 字节
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
      "rawLength": 102,
      "actualLength": 51,
      "isWideChar": 0,
      "string": "__tests__/fixtures_quickjs/fixture_cyclic_import.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 46,
      "actualLength": 23,
      "isWideChar": 0,
      "string": "./test_cyclic_import.js",
      "offset": 54
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "f",
      "offset": 78
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 80
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 82
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "g",
      "offset": 84
    }
  ],
  "functionHeader": {
    "offset": 86,
    "tag": "0xd",
    "remaining": 113
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
      "rawLength": 102,
      "actualLength": 51,
      "isWideChar": 0,
      "string": "__tests__/fixtures_quickjs/fixture_cyclic_import.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 46,
      "actualLength": 23,
      "isWideChar": 0,
      "string": "./test_cyclic_import.js",
      "offset": 54
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "f",
      "offset": 78
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 80
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 82
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "g",
      "offset": 84
    }
  ],
  "functionHeader": {
    "offset": 86,
    "tag": "0xd",
    "remaining": 113
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 06 66 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |..f__tests__/fix|
00000010: 74 75 72 65 73 5f 71 75 69 63 6b 6a 73 2f 66 69 |tures_quickjs/fi|
00000020: 78 74 75 72 65 5f 63 79 63 6c 69 63 5f 69 6d 70 |xture_cyclic_imp|
00000030: 6f 72 74 2e 6a 73 2e 2e 2f 74 65 73 74 5f 63 79 |ort.js../test_cy|
00000040: 63 6c 69 63 5f 69 6d 70 6f 72 74 2e 6a 73 02 66 |clic_import.js.f|
00000050: 02 61 02 78 02 67 0d c8 03 01 ca 03 02 01 00 01 |.a.x.g..........|
00000060: cc 03 00 01 00 01 fe 01 00 00 0c 20 06 01 a4 01 |........... ....|
00000070: 00 00 00 01 02 01 09 00 ce 03 00 0d cc 03 00 01 |................|
00000080: 08 ec 05 c2 00 e4 29 06 2f c8 03 02 00 00 00 0c |......)./.......|
00000090: 43 06 01 cc 03 01 00 01 04 01 00 0f 01 d0 03 00 |C...............|
000000a0: 01 00 ce 03 00 0c b9 68 00 00 43 e9 00 00 00 d3 |.......h..C.....|
000000b0: 24 01 00 9c 28 c8 03 0e 01 07 07 36 11 02 1b 06 |$...(......6....|
000000c0: 07 01 11 09 07 11 00                            |.......|
```

### WASM
```
00000000: 05 06 66 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |..f__tests__/fix|
00000010: 74 75 72 65 73 5f 71 75 69 63 6b 6a 73 2f 66 69 |tures_quickjs/fi|
00000020: 78 74 75 72 65 5f 63 79 63 6c 69 63 5f 69 6d 70 |xture_cyclic_imp|
00000030: 6f 72 74 2e 6a 73 2e 2e 2f 74 65 73 74 5f 63 79 |ort.js../test_cy|
00000040: 63 6c 69 63 5f 69 6d 70 6f 72 74 2e 6a 73 02 66 |clic_import.js.f|
00000050: 02 61 02 78 02 67 0d c8 03 01 ca 03 02 01 00 01 |.a.x.g..........|
00000060: cc 03 00 01 00 01 fe 01 00 00 0c 20 06 01 a4 01 |........... ....|
00000070: 00 00 00 01 02 01 09 00 ce 03 00 0d cc 03 00 01 |................|
00000080: 08 ec 05 c2 00 e4 29 06 2f c8 03 02 00 00 00 0c |......)./.......|
00000090: 43 06 01 cc 03 01 00 01 04 01 00 0f 01 d0 03 00 |C...............|
000000a0: 01 00 ce 03 00 0c b9 68 00 00 43 e9 00 00 00 d3 |.......h..C.....|
000000b0: 24 01 00 9c 28 c8 03 0e 01 07 07 36 11 02 1b 06 |$...(......6....|
000000c0: 07 01 11 09 07 11 00                            |.......|
```