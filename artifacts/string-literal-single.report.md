# 字节码分析报告

**输入文件**: tmp/string-literal-single.ts
**生成时间**: 2025-10-03T04:46:55.865Z

## 大小对比

- TypeScript编译器: 95 字节
- WASM编译器: 95 字节
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
      "rawLength": 56,
      "actualLength": 28,
      "isWideChar": 0,
      "string": "tmp/string-literal-single.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "stringLiteral",
      "offset": 31
    },
    {
      "index": 2,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "hello",
      "offset": 45
    }
  ],
  "functionHeader": {
    "offset": 51,
    "tag": "0xd",
    "remaining": 44
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
      "rawLength": 56,
      "actualLength": 28,
      "isWideChar": 0,
      "string": "tmp/string-literal-single.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "stringLiteral",
      "offset": 31
    },
    {
      "index": 2,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "hello",
      "offset": 45
    }
  ],
  "functionHeader": {
    "offset": 51,
    "tag": "0xd",
    "remaining": 44
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 03 38 74 6d 70 2f 73 74 72 69 6e 67 2d 6c 69 |..8tmp/string-li|
00000010: 74 65 72 61 6c 2d 73 69 6e 67 6c 65 2e 6a 73 1a |teral-single.js.|
00000020: 73 74 72 69 6e 67 4c 69 74 65 72 61 6c 0a 68 65 |stringLiteral.he|
00000030: 6c 6c 6f 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 |llo......... ...|
00000040: 01 00 00 00 01 01 00 0c 00 ca 03 00 0d 08 ec 02 |................|
00000050: 29 04 e6 00 00 00 e3 06 2f c8 03 02 00 00 00    |)......./......|
```

### WASM
```
00000000: 05 03 38 74 6d 70 2f 73 74 72 69 6e 67 2d 6c 69 |..8tmp/string-li|
00000010: 74 65 72 61 6c 2d 73 69 6e 67 6c 65 2e 6a 73 1a |teral-single.js.|
00000020: 73 74 72 69 6e 67 4c 69 74 65 72 61 6c 0a 68 65 |stringLiteral.he|
00000030: 6c 6c 6f 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 |llo......... ...|
00000040: 01 00 00 00 01 01 00 0c 00 ca 03 00 0d 08 ec 02 |................|
00000050: 29 04 e6 00 00 00 e3 06 2f c8 03 02 00 00 00    |)......./......|
```