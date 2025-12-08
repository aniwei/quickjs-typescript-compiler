# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/default-params.ts
**生成时间**: 2025-12-08T07:07:42.349Z

## 大小对比

- TypeScript编译器: 148 字节
- WASM编译器: 148 字节
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
      "rawLength": 90,
      "actualLength": 45,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/default-params.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "test",
      "offset": 48
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 53
    }
  ],
  "functionHeader": {
    "offset": 55,
    "tag": "0xd",
    "remaining": 93
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
      "rawLength": 90,
      "actualLength": 45,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/default-params.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "test",
      "offset": 48
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 53
    }
  ],
  "functionHeader": {
    "offset": 55,
    "tag": "0xd",
    "remaining": 93
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 03 5a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..Z__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 64 |piler/fixtures/d|
00000020: 65 66 61 75 6c 74 2d 70 61 72 61 6d 73 2e 6a 73 |efault-params.js|
00000030: 08 74 65 73 74 02 61 0d c8 03 00 00 00 00 00 0c |.test.a.........|
00000040: 20 06 01 a4 01 00 00 00 01 01 01 09 00 ca 03 00 | ...............|
00000050: 01 08 ec 05 c2 00 e3 29 06 2f c8 03 02 00 00 00 |.......)./......|
00000060: 0c 41 06 01 ca 03 01 01 00 02 00 00 0e 02 cc 03 |.A..............|
00000070: 00 01 00 cc 03 01 ff ff ff ff 0f 20 63 00 00 d3 |........... c...|
00000080: 11 f4 ec 04 0e b8 db cb d3 28 c8 03 06 00 00 3f |.........(.....?|
00000090: 16 07 0d 00                                     |....|
```

### WASM
```
00000000: 05 03 5a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..Z__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 64 |piler/fixtures/d|
00000020: 65 66 61 75 6c 74 2d 70 61 72 61 6d 73 2e 6a 73 |efault-params.js|
00000030: 08 74 65 73 74 02 61 0d c8 03 00 00 00 00 00 0c |.test.a.........|
00000040: 20 06 01 a4 01 00 00 00 01 01 01 09 00 ca 03 00 | ...............|
00000050: 01 08 ec 05 c2 00 e3 29 06 2f c8 03 02 00 00 00 |.......)./......|
00000060: 0c 41 06 01 ca 03 01 01 00 02 00 00 0e 02 cc 03 |.A..............|
00000070: 00 01 00 cc 03 01 ff ff ff ff 0f 20 63 00 00 d3 |........... c...|
00000080: 11 f4 ec 04 0e b8 db cb d3 28 c8 03 06 00 00 3f |.........(.....?|
00000090: 16 07 0d 00                                     |....|
```