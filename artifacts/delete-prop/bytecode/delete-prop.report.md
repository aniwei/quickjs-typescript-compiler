# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/delete-prop.ts
**生成时间**: 2025-12-25T17:39:29.017Z

## 大小对比

- TypeScript编译器: 146 字节
- WASM编译器: 146 字节
- 差异: 0 字节 (0.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 4,
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
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "arr",
      "offset": 6
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 10
    },
    {
      "index": 3,
      "rawLength": 66,
      "actualLength": 33,
      "isWideChar": 0,
      "string": "__tests__/fixtures/delete-prop.js",
      "offset": 12
    }
  ],
  "functionHeader": {
    "offset": 46,
    "tag": "0xc",
    "remaining": 100
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 4,
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
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "arr",
      "offset": 6
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 10
    },
    {
      "index": 3,
      "rawLength": 66,
      "actualLength": 33,
      "isWideChar": 0,
      "string": "__tests__/fixtures/delete-prop.js",
      "offset": 12
    }
  ],
  "functionHeader": {
    "offset": 46,
    "tag": "0xc",
    "remaining": 100
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 04 06 6f 62 6a 06 61 72 72 02 61 42 5f 5f 74 |...obj.arr.aB__t|
00000010: 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 73 2f |ests__/fixtures/|
00000020: 64 65 6c 65 74 65 2d 70 72 6f 70 2e 6a 73 0c 00 |delete-prop.js..|
00000030: 06 00 a4 01 00 01 00 02 00 00 43 01 a6 01 00 00 |..........C.....|
00000040: 00 40 e4 00 00 00 80 40 e5 00 00 00 80 3f e4 00 |.@.....@.....?..|
00000050: 00 00 80 3f e5 00 00 00 80 0b b8 4e e6 00 00 00 |...?.......N....|
00000060: 3b e4 00 00 00 39 e4 00 00 00 04 e6 00 00 00 9a |;....9..........|
00000070: cb b8 b9 26 02 00 3b e5 00 00 00 39 e5 00 00 00 |...&..;....9....|
00000080: b7 9a cf 28 ce 03 0a 00 00 b7 0e 1b 06 59 05 20 |...(.........Y. |
00000090: 06 00                                           |..|
```

### WASM
```
00000000: 05 04 06 6f 62 6a 06 61 72 72 02 61 42 5f 5f 74 |...obj.arr.aB__t|
00000010: 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 73 2f |ests__/fixtures/|
00000020: 64 65 6c 65 74 65 2d 70 72 6f 70 2e 6a 73 0c 00 |delete-prop.js..|
00000030: 06 00 a4 01 00 01 00 02 00 00 43 01 a6 01 00 00 |..........C.....|
00000040: 00 40 e4 00 00 00 80 40 e5 00 00 00 80 3f e4 00 |.@.....@.....?..|
00000050: 00 00 80 3f e5 00 00 00 80 0b b8 4e e6 00 00 00 |...?.......N....|
00000060: 3b e4 00 00 00 39 e4 00 00 00 04 e6 00 00 00 9a |;....9..........|
00000070: cb b8 b9 26 02 00 3b e5 00 00 00 39 e5 00 00 00 |...&..;....9....|
00000080: b7 9a cf 28 ce 03 0a 00 00 b7 0e 1b 06 59 05 20 |...(.........Y. |
00000090: 06 00                                           |..|
```