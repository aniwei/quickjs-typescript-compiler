# 字节码分析报告

**输入文件**: test-atom-order.ts
**生成时间**: 2025-11-26T03:13:49.101Z

## 大小对比

- TypeScript编译器: 71 字节
- WASM编译器: 71 字节
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
      "rawLength": 36,
      "actualLength": 18,
      "isWideChar": 0,
      "string": "test-atom-order.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 21
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 23
    }
  ],
  "functionHeader": {
    "offset": 25,
    "tag": "0xd",
    "remaining": 46
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
      "rawLength": 36,
      "actualLength": 18,
      "isWideChar": 0,
      "string": "test-atom-order.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 21
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 23
    }
  ],
  "functionHeader": {
    "offset": 25,
    "tag": "0xd",
    "remaining": 46
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 03 24 74 65 73 74 2d 61 74 6f 6d 2d 6f 72 64 |..$test-atom-ord|
00000010: 65 72 2e 6a 73 02 61 02 62 0d c8 03 00 00 00 00 |er.js.a.b.......|
00000020: 00 0c 20 06 01 a4 01 00 00 00 01 02 00 0a 00 ca |.. .............|
00000030: 03 00 0d cc 03 01 0d 08 ec 02 29 b8 e3 b9 e4 06 |..........).....|
00000040: 2f c8 03 02 00 00 00                            |/......|
```

### WASM
```
00000000: 05 03 24 74 65 73 74 2d 61 74 6f 6d 2d 6f 72 64 |..$test-atom-ord|
00000010: 65 72 2e 6a 73 02 61 02 62 0d c8 03 00 00 00 00 |er.js.a.b.......|
00000020: 00 0c 20 06 01 a4 01 00 00 00 01 02 00 0a 00 ca |.. .............|
00000030: 03 00 0d cc 03 01 0d 08 ec 02 29 b8 e3 b9 e4 06 |..........).....|
00000040: 2f c8 03 02 00 00 00                            |/......|
```