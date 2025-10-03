# 字节码分析报告

**输入文件**: tmp/array-literal-mixed.ts
**生成时间**: 2025-10-03T04:52:25.757Z

## 大小对比

- TypeScript编译器: 100 字节
- WASM编译器: 100 字节
- 差异: 0 字节 (0.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 3,
  "atoms": [
    {
      "index": 0,
      "rawLength": 52,
      "actualLength": 26,
      "isWideChar": 0,
      "string": "tmp/array-literal-mixed.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "data",
      "offset": 29
    },
    {
      "index": 2,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "hello",
      "offset": 34
    }
  ],
  "functionHeader": {
    "offset": 40,
    "tag": "0xd",
    "remaining": 60
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 3,
  "atoms": [
    {
      "index": 0,
      "rawLength": 52,
      "actualLength": 26,
      "isWideChar": 0,
      "string": "tmp/array-literal-mixed.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "data",
      "offset": 29
    },
    {
      "index": 2,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "hello",
      "offset": 34
    }
  ],
  "functionHeader": {
    "offset": 40,
    "tag": "0xd",
    "remaining": 60
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 03 34 74 6d 70 2f 61 72 72 61 79 2d 6c 69 74 |..4tmp/array-lit|
00000010: 65 72 61 6c 2d 6d 69 78 65 64 2e 6a 73 08 64 61 |eral-mixed.js.da|
00000020: 74 61 0a 68 65 6c 6c 6f 0d c8 03 00 00 00 00 00 |ta.hello........|
00000030: 0c 20 06 01 a4 01 00 00 00 04 01 01 13 00 ca 03 |. ..............|
00000040: 00 0d 08 ec 02 29 b8 b9 c1 00 04 e6 00 00 00 26 |.....).........&|
00000050: 04 00 e3 06 2f c8 03 02 00 00 00 06 00 00 00 00 |..../...........|
00000060: 00 00 0c 40                                     |...@|
```

### WASM
```
00000000: 05 03 34 74 6d 70 2f 61 72 72 61 79 2d 6c 69 74 |..4tmp/array-lit|
00000010: 65 72 61 6c 2d 6d 69 78 65 64 2e 6a 73 08 64 61 |eral-mixed.js.da|
00000020: 74 61 0a 68 65 6c 6c 6f 0d c8 03 00 00 00 00 00 |ta.hello........|
00000030: 0c 20 06 01 a4 01 00 00 00 04 01 01 13 00 ca 03 |. ..............|
00000040: 00 0d 08 ec 02 29 b8 b9 c1 00 04 e6 00 00 00 26 |.....).........&|
00000050: 04 00 e3 06 2f c8 03 02 00 00 00 06 00 00 00 00 |..../...........|
00000060: 00 00 0c 40                                     |...@|
```