# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/new-target.ts
**生成时间**: 2025-12-26T13:00:18.148Z

## 大小对比

- TypeScript编译器: 308 字节
- WASM编译器: 308 字节
- 差异: 0 字节 (0.00%)

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
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "Plain",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "Ctor",
      "offset": 8
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 13
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 21
    },
    {
      "index": 4,
      "rawLength": 64,
      "actualLength": 32,
      "isWideChar": 0,
      "string": "__tests__/fixtures/new-target.js",
      "offset": 25
    }
  ],
  "functionHeader": {
    "offset": 58,
    "tag": "0xc",
    "remaining": 250
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
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "Plain",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "Ctor",
      "offset": 8
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 13
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 21
    },
    {
      "index": 4,
      "rawLength": 64,
      "actualLength": 32,
      "isWideChar": 0,
      "string": "__tests__/fixtures/new-target.js",
      "offset": 25
    }
  ],
  "functionHeader": {
    "offset": 58,
    "tag": "0xc",
    "remaining": 250
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 05 0a 50 6c 61 69 6e 08 43 74 6f 72 0e 63 6f |...Plain.Ctor.co|
00000010: 6e 73 6f 6c 65 06 6c 6f 67 40 5f 5f 74 65 73 74 |nsole.log@__test|
00000020: 73 5f 5f 2f 66 69 78 74 75 72 65 73 2f 6e 65 77 |s__/fixtures/new|
00000030: 2d 74 61 72 67 65 74 2e 6a 73 0c 00 06 00 a4 01 |-target.js......|
00000040: 00 01 00 04 00 02 6d 01 a6 01 00 00 00 40 e4 00 |......m......@..|
00000050: 00 00 40 40 e5 00 00 00 40 c2 00 41 e4 00 00 00 |..@@....@..A....|
00000060: 00 c2 01 41 e5 00 00 00 00 39 e6 00 00 00 43 e7 |...A.....9....C.|
00000070: 00 00 00 39 e4 00 00 00 f0 39 47 00 00 00 ad 24 |...9.....9G....$|
00000080: 01 00 cb 39 e6 00 00 00 43 e7 00 00 00 39 e4 00 |...9....C....9..|
00000090: 00 00 11 21 00 00 39 e4 00 00 00 ad 24 01 00 cb |...!..9.....$...|
000000a0: 39 e6 00 00 00 43 e7 00 00 00 39 e5 00 00 00 11 |9....C....9.....|
000000b0: 21 00 00 0a ad 24 01 00 cf 28 d0 03 2c 00 00 00 |!....$...(..,...|
000000c0: 1c 0c 00 1b 0e 1b 0a 1b 0a 07 0e 1b 07 07 11 17 |................|
000000d0: 15 1b 0e 1b 12 20 0a 11 0e 1b 07 07 19 17 15 1b |..... ..........|
000000e0: 0e 1b 12 20 08 16 06 07 17 00 0c 43 06 00 c8 03 |... .......C....|
000000f0: 00 01 00 01 00 00 05 01 e6 01 00 01 00 0c 03 cb |................|
00000100: c7 28 d0 03 04 00 00 17 08 00 0c 43 06 00 ca 03 |.(.........C....|
00000110: 00 01 00 02 00 00 0b 01 e6 01 00 01 00 0c 03 cb |................|
00000120: c7 39 e5 00 00 00 ad 28 d0 03 08 03 00 17 34 1b |.9.....(......4.|
00000130: 07 07 23 00                                     |..#.|
```

### WASM
```
00000000: 05 05 0a 50 6c 61 69 6e 08 43 74 6f 72 0e 63 6f |...Plain.Ctor.co|
00000010: 6e 73 6f 6c 65 06 6c 6f 67 40 5f 5f 74 65 73 74 |nsole.log@__test|
00000020: 73 5f 5f 2f 66 69 78 74 75 72 65 73 2f 6e 65 77 |s__/fixtures/new|
00000030: 2d 74 61 72 67 65 74 2e 6a 73 0c 00 06 00 a4 01 |-target.js......|
00000040: 00 01 00 04 00 02 6d 01 a6 01 00 00 00 40 e4 00 |......m......@..|
00000050: 00 00 40 40 e5 00 00 00 40 c2 00 41 e4 00 00 00 |..@@....@..A....|
00000060: 00 c2 01 41 e5 00 00 00 00 39 e6 00 00 00 43 e7 |...A.....9....C.|
00000070: 00 00 00 39 e4 00 00 00 f0 39 47 00 00 00 ad 24 |...9.....9G....$|
00000080: 01 00 cb 39 e6 00 00 00 43 e7 00 00 00 39 e4 00 |...9....C....9..|
00000090: 00 00 11 21 00 00 39 e4 00 00 00 ad 24 01 00 cb |...!..9.....$...|
000000a0: 39 e6 00 00 00 43 e7 00 00 00 39 e5 00 00 00 11 |9....C....9.....|
000000b0: 21 00 00 0a ad 24 01 00 cf 28 d0 03 2c 00 00 00 |!....$...(..,...|
000000c0: 1c 0c 00 1b 0e 1b 0a 1b 0a 07 0e 1b 07 07 11 17 |................|
000000d0: 15 1b 0e 1b 12 20 0a 11 0e 1b 07 07 19 17 15 1b |..... ..........|
000000e0: 0e 1b 12 20 08 16 06 07 17 00 0c 43 06 00 c8 03 |... .......C....|
000000f0: 00 01 00 01 00 00 05 01 e6 01 00 01 00 0c 03 cb |................|
00000100: c7 28 d0 03 04 00 00 17 08 00 0c 43 06 00 ca 03 |.(.........C....|
00000110: 00 01 00 02 00 00 0b 01 e6 01 00 01 00 0c 03 cb |................|
00000120: c7 39 e5 00 00 00 ad 28 d0 03 08 03 00 17 34 1b |.9.....(......4.|
00000130: 07 07 23 00                                     |..#.|
```