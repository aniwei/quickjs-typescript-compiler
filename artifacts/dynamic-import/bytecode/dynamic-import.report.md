# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/dynamic-import.ts
**生成时间**: 2025-12-26T13:59:19.504Z

## 大小对比

- TypeScript编译器: 190 字节
- WASM编译器: 190 字节
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
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "p1",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "p2",
      "offset": 5
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "dep1.js",
      "offset": 8
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "dep2.js",
      "offset": 16
    },
    {
      "index": 4,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "json",
      "offset": 24
    },
    {
      "index": 5,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "type",
      "offset": 29
    },
    {
      "index": 6,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "assert",
      "offset": 34
    },
    {
      "index": 7,
      "rawLength": 72,
      "actualLength": 36,
      "isWideChar": 0,
      "string": "__tests__/fixtures/dynamic-import.js",
      "offset": 41
    }
  ],
  "functionHeader": {
    "offset": 78,
    "tag": "0xc",
    "remaining": 112
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
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "p1",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "p2",
      "offset": 5
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "dep1.js",
      "offset": 8
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "dep2.js",
      "offset": 16
    },
    {
      "index": 4,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "json",
      "offset": 24
    },
    {
      "index": 5,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "type",
      "offset": 29
    },
    {
      "index": 6,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "assert",
      "offset": 34
    },
    {
      "index": 7,
      "rawLength": 72,
      "actualLength": 36,
      "isWideChar": 0,
      "string": "__tests__/fixtures/dynamic-import.js",
      "offset": 41
    }
  ],
  "functionHeader": {
    "offset": 78,
    "tag": "0xc",
    "remaining": 112
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 08 04 70 31 04 70 32 0e 64 65 70 31 2e 6a 73 |...p1.p2.dep1.js|
00000010: 0e 64 65 70 32 2e 6a 73 08 6a 73 6f 6e 08 74 79 |.dep2.js.json.ty|
00000020: 70 65 0c 61 73 73 65 72 74 48 5f 5f 74 65 73 74 |pe.assertH__test|
00000030: 73 5f 5f 2f 66 69 78 74 75 72 65 73 2f 64 79 6e |s__/fixtures/dyn|
00000040: 61 6d 69 63 2d 69 6d 70 6f 72 74 2e 6a 73 0c 00 |amic-import.js..|
00000050: 06 00 a4 01 00 01 00 04 00 00 51 01 a6 01 00 00 |..........Q.....|
00000060: 00 40 e4 00 00 00 80 40 e5 00 00 00 80 3f e4 00 |.@.....@.....?..|
00000070: 00 00 80 3f e5 00 00 00 80 04 e6 00 00 00 06 36 |...?...........6|
00000080: 3b e4 00 00 00 04 e7 00 00 00 0b 0b 04 e8 00 00 |;...............|
00000090: 00 4e e9 00 00 00 4e ea 00 00 00 36 3b e5 00 00 |.N....N....6;...|
000000a0: 00 39 e4 00 00 00 0e 06 cb 39 e5 00 00 00 0e 06 |.9.......9......|
000000b0: cf 28 d6 03 08 00 00 00 40 08 0a 2b 00 00       |.(......@..+..|
```

### WASM
```
00000000: 05 08 04 70 31 04 70 32 0e 64 65 70 31 2e 6a 73 |...p1.p2.dep1.js|
00000010: 0e 64 65 70 32 2e 6a 73 08 6a 73 6f 6e 08 74 79 |.dep2.js.json.ty|
00000020: 70 65 0c 61 73 73 65 72 74 48 5f 5f 74 65 73 74 |pe.assertH__test|
00000030: 73 5f 5f 2f 66 69 78 74 75 72 65 73 2f 64 79 6e |s__/fixtures/dyn|
00000040: 61 6d 69 63 2d 69 6d 70 6f 72 74 2e 6a 73 0c 00 |amic-import.js..|
00000050: 06 00 a4 01 00 01 00 04 00 00 51 01 a6 01 00 00 |..........Q.....|
00000060: 00 40 e4 00 00 00 80 40 e5 00 00 00 80 3f e4 00 |.@.....@.....?..|
00000070: 00 00 80 3f e5 00 00 00 80 04 e6 00 00 00 06 36 |...?...........6|
00000080: 3b e4 00 00 00 04 e7 00 00 00 0b 0b 04 e8 00 00 |;...............|
00000090: 00 4e e9 00 00 00 4e ea 00 00 00 36 3b e5 00 00 |.N....N....6;...|
000000a0: 00 39 e4 00 00 00 0e 06 cb 39 e5 00 00 00 0e 06 |.9.......9......|
000000b0: cf 28 d6 03 08 00 00 00 40 08 0a 2b 00 00       |.(......@..+..|
```