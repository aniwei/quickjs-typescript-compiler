# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/arrow-fn-complex.ts
**生成时间**: 2026-01-08T02:49:37.134Z

## 大小对比

- TypeScript编译器: 224 字节
- WASM编译器: 224 字节
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
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "complex",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 10
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 18
    },
    {
      "index": 3,
      "rawLength": 76,
      "actualLength": 38,
      "isWideChar": 0,
      "string": "__tests__/fixtures/arrow-fn-complex.js",
      "offset": 22
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 61
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 63
    }
  ],
  "functionHeader": {
    "offset": 65,
    "tag": "0xc",
    "remaining": 159
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
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "complex",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 10
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 18
    },
    {
      "index": 3,
      "rawLength": 76,
      "actualLength": 38,
      "isWideChar": 0,
      "string": "__tests__/fixtures/arrow-fn-complex.js",
      "offset": 22
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 61
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 63
    }
  ],
  "functionHeader": {
    "offset": 65,
    "tag": "0xc",
    "remaining": 159
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 06 0e 63 6f 6d 70 6c 65 78 0e 63 6f 6e 73 6f |...complex.conso|
00000010: 6c 65 06 6c 6f 67 4c 5f 5f 74 65 73 74 73 5f 5f |le.logL__tests__|
00000020: 2f 66 69 78 74 75 72 65 73 2f 61 72 72 6f 77 2d |/fixtures/arrow-|
00000030: 66 6e 2d 63 6f 6d 70 6c 65 78 2e 6a 73 02 78 02 |fn-complex.js.x.|
00000040: 79 0c 00 06 00 a4 01 00 01 00 04 00 01 2e 01 a6 |y...............|
00000050: 01 00 00 00 40 e4 00 00 00 80 3f e4 00 00 00 80 |....@.....?.....|
00000060: c2 00 4f e4 00 00 00 3b e4 00 00 00 39 e5 00 00 |..O....;....9...|
00000070: 00 43 e6 00 00 00 39 e4 00 00 00 bc f1 24 01 00 |.C....9......$..|
00000080: cf 28 ce 03 0e 00 00 00 18 0e 00 1b 0e 1b 0a 20 |.(............. |
00000090: 0e 07 0f 00 0c 02 06 00 00 01 01 01 02 00 00 19 |................|
000000a0: 02 d0 03 00 01 00 d2 03 01 00 30 63 00 00 bf 0a |..........0c....|
000000b0: cb d3 64 00 00 a7 ec 07 d3 64 00 00 a0 28 64 00 |..d......d...(d.|
000000c0: 00 d3 a0 28 ce 03 18 00 10 22 0f 07 08 11 03 12 |...(....."......|
000000d0: 0a 07 08 11 03 07 11 09 06 11 08 07 03 07 11 00 |................|
```

### WASM
```
00000000: 05 06 0e 63 6f 6d 70 6c 65 78 0e 63 6f 6e 73 6f |...complex.conso|
00000010: 6c 65 06 6c 6f 67 4c 5f 5f 74 65 73 74 73 5f 5f |le.logL__tests__|
00000020: 2f 66 69 78 74 75 72 65 73 2f 61 72 72 6f 77 2d |/fixtures/arrow-|
00000030: 66 6e 2d 63 6f 6d 70 6c 65 78 2e 6a 73 02 78 02 |fn-complex.js.x.|
00000040: 79 0c 00 06 00 a4 01 00 01 00 04 00 01 2e 01 a6 |y...............|
00000050: 01 00 00 00 40 e4 00 00 00 80 3f e4 00 00 00 80 |....@.....?.....|
00000060: c2 00 4f e4 00 00 00 3b e4 00 00 00 39 e5 00 00 |..O....;....9...|
00000070: 00 43 e6 00 00 00 39 e4 00 00 00 bc f1 24 01 00 |.C....9......$..|
00000080: cf 28 ce 03 0e 00 00 00 18 0e 00 1b 0e 1b 0a 20 |.(............. |
00000090: 0e 07 0f 00 0c 02 06 00 00 01 01 01 02 00 00 19 |................|
000000a0: 02 d0 03 00 01 00 d2 03 01 00 30 63 00 00 bf 0a |..........0c....|
000000b0: cb d3 64 00 00 a7 ec 07 d3 64 00 00 a0 28 64 00 |..d......d...(d.|
000000c0: 00 d3 a0 28 ce 03 18 00 10 22 0f 07 08 11 03 12 |...(....."......|
000000d0: 0a 07 08 11 03 07 11 09 06 11 08 07 03 07 11 00 |................|
```