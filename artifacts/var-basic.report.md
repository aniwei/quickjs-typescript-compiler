# 字节码分析报告

**输入文件**: /Users/weiyanhai/Desktop/workspace/quickjs-typescript-compiler/__tests__/compiler/fixtures/var-basic.ts
**生成时间**: 2025-10-14T16:45:42.846Z

## 大小对比

- TypeScript编译器: 101 字节
- WASM编译器: 101 字节
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
      "rawLength": 80,
      "actualLength": 40,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/var-basic.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 43
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 45
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 47
    }
  ],
  "functionHeader": {
    "offset": 49,
    "tag": "0xd",
    "remaining": 52
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
      "rawLength": 80,
      "actualLength": 40,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/var-basic.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 43
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 45
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 47
    }
  ],
  "functionHeader": {
    "offset": 49,
    "tag": "0xd",
    "remaining": 52
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 04 50 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..P__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 76 |piler/fixtures/v|
00000020: 61 72 2d 62 61 73 69 63 2e 6a 73 02 61 02 62 02 |ar-basic.js.a.b.|
00000030: 63 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 |c......... .....|
00000040: 00 00 01 03 00 0c 00 ca 03 00 01 cc 03 01 09 ce |................|
00000050: 03 02 0d 08 ec 02 29 b8 e3 06 e4 b9 e5 06 2f c8 |......)......./.|
00000060: 03 02 00 00 00                                  |.....|
```

### WASM
```
00000000: 05 04 50 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..P__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 76 |piler/fixtures/v|
00000020: 61 72 2d 62 61 73 69 63 2e 6a 73 02 61 02 62 02 |ar-basic.js.a.b.|
00000030: 63 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 |c......... .....|
00000040: 00 00 01 03 00 0c 00 ca 03 00 01 cc 03 01 09 ce |................|
00000050: 03 02 0d 08 ec 02 29 b8 e3 06 e4 b9 e5 06 2f c8 |......)......./.|
00000060: 03 02 00 00 00                                  |.....|
```