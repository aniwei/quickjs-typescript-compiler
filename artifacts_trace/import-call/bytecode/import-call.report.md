# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/import-call.ts
**生成时间**: 2025-12-25T03:14:00.895Z

## 大小对比

- TypeScript编译器: 227 字节
- WASM编译器: 227 字节
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
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "main",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 66,
      "actualLength": 33,
      "isWideChar": 0,
      "string": "__tests__/fixtures/import-call.js",
      "offset": 7
    },
    {
      "index": 2,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "m1",
      "offset": 41
    },
    {
      "index": 3,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "m2",
      "offset": 44
    },
    {
      "index": 4,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "./dep1.js",
      "offset": 47
    },
    {
      "index": 5,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "./dep2.js",
      "offset": 57
    },
    {
      "index": 6,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "json",
      "offset": 67
    },
    {
      "index": 7,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "type",
      "offset": 72
    },
    {
      "index": 8,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "assert",
      "offset": 77
    }
  ],
  "functionHeader": {
    "offset": 84,
    "tag": "0xc",
    "remaining": 143
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
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "main",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 66,
      "actualLength": 33,
      "isWideChar": 0,
      "string": "__tests__/fixtures/import-call.js",
      "offset": 7
    },
    {
      "index": 2,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "m1",
      "offset": 41
    },
    {
      "index": 3,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "m2",
      "offset": 44
    },
    {
      "index": 4,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "./dep1.js",
      "offset": 47
    },
    {
      "index": 5,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "./dep2.js",
      "offset": 57
    },
    {
      "index": 6,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "json",
      "offset": 67
    },
    {
      "index": 7,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "type",
      "offset": 72
    },
    {
      "index": 8,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "assert",
      "offset": 77
    }
  ],
  "functionHeader": {
    "offset": 84,
    "tag": "0xc",
    "remaining": 143
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 09 08 6d 61 69 6e 42 5f 5f 74 65 73 74 73 5f |...mainB__tests_|
00000010: 5f 2f 66 69 78 74 75 72 65 73 2f 69 6d 70 6f 72 |_/fixtures/impor|
00000020: 74 2d 63 61 6c 6c 2e 6a 73 04 6d 31 04 6d 32 12 |t-call.js.m1.m2.|
00000030: 2e 2f 64 65 70 31 2e 6a 73 12 2e 2f 64 65 70 32 |./dep1.js../dep2|
00000040: 2e 6a 73 08 6a 73 6f 6e 08 74 79 70 65 0c 61 73 |.js.json.type.as|
00000050: 73 65 72 74 0c 00 06 00 a4 01 00 01 00 01 00 01 |sert............|
00000060: 18 01 a6 01 00 00 00 40 e4 00 00 00 40 c2 00 41 |.......@....@..A|
00000070: e4 00 00 00 00 39 e4 00 00 00 f0 0e 06 cf 28 ca |.....9........(.|
00000080: 03 08 00 00 00 0e 0e 0a 1b 08 00 0c 62 06 00 c8 |............b...|
00000090: 03 00 02 00 04 00 00 32 02 cc 03 01 00 30 ce 03 |.......2.....0..|
000000a0: 01 01 30 63 01 00 63 00 00 04 e8 00 00 00 06 36 |..0c..c........6|
000000b0: 8d cb 04 e9 00 00 00 0b 0b 04 ea 00 00 00 4e eb |..............N.|
000000c0: 00 00 00 4e ec 00 00 00 36 8d cc 64 00 00 64 01 |...N....6..d..d.|
000000d0: 00 26 02 00 2f ca 03 0a 01 00 00 28 08 18 11 08 |.&../......(....|
000000e0: 20 17 00                                        | ..|
```

### WASM
```
00000000: 05 09 08 6d 61 69 6e 42 5f 5f 74 65 73 74 73 5f |...mainB__tests_|
00000010: 5f 2f 66 69 78 74 75 72 65 73 2f 69 6d 70 6f 72 |_/fixtures/impor|
00000020: 74 2d 63 61 6c 6c 2e 6a 73 04 6d 31 04 6d 32 12 |t-call.js.m1.m2.|
00000030: 2e 2f 64 65 70 31 2e 6a 73 12 2e 2f 64 65 70 32 |./dep1.js../dep2|
00000040: 2e 6a 73 08 6a 73 6f 6e 08 74 79 70 65 0c 61 73 |.js.json.type.as|
00000050: 73 65 72 74 0c 00 06 00 a4 01 00 01 00 01 00 01 |sert............|
00000060: 18 01 a6 01 00 00 00 40 e4 00 00 00 40 c2 00 41 |.......@....@..A|
00000070: e4 00 00 00 00 39 e4 00 00 00 f0 0e 06 cf 28 ca |.....9........(.|
00000080: 03 08 00 00 00 0e 0e 0a 1b 08 00 0c 62 06 00 c8 |............b...|
00000090: 03 00 02 00 04 00 00 32 02 cc 03 01 00 30 ce 03 |.......2.....0..|
000000a0: 01 01 30 63 01 00 63 00 00 04 e8 00 00 00 06 36 |..0c..c........6|
000000b0: 8d cb 04 e9 00 00 00 0b 0b 04 ea 00 00 00 4e eb |..............N.|
000000c0: 00 00 00 4e ec 00 00 00 36 8d cc 64 00 00 64 01 |...N....6..d..d.|
000000d0: 00 26 02 00 2f ca 03 0a 01 00 00 28 08 18 11 08 |.&../......(....|
000000e0: 20 17 00                                        | ..|
```