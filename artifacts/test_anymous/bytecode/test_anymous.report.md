# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/test_anymous.ts
**生成时间**: 2026-01-01T11:11:34.434Z

## 大小对比

- TypeScript编译器: 111 字节
- WASM编译器: 111 字节
- 差异: 0 字节 (0.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 2,
  "atoms": [
    {
      "index": 0,
      "rawLength": 68,
      "actualLength": 34,
      "isWideChar": 0,
      "string": "__tests__/fixtures/test_anymous.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "g",
      "offset": 37
    }
  ],
  "functionHeader": {
    "offset": 39,
    "tag": "0xd",
    "remaining": 72
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 2,
  "atoms": [
    {
      "index": 0,
      "rawLength": 68,
      "actualLength": 34,
      "isWideChar": 0,
      "string": "__tests__/fixtures/test_anymous.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "g",
      "offset": 37
    }
  ],
  "functionHeader": {
    "offset": 39,
    "tag": "0xd",
    "remaining": 72
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 02 44 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |..D__tests__/fix|
00000010: 74 75 72 65 73 2f 74 65 73 74 5f 61 6e 79 6d 6f |tures/test_anymo|
00000020: 75 73 2e 6a 73 02 67 0d c8 03 00 00 00 00 00 0c |us.js.g.........|
00000030: 20 06 01 a4 01 00 00 00 02 00 01 0f 00 08 ec 02 | ...............|
00000040: 29 c2 00 39 8d 00 00 00 f1 0e 06 2f c8 03 06 00 |)..9......./....|
00000050: 00 21 06 1b 01 00 0c 43 06 01 00 01 00 01 00 00 |.!.....C........|
00000060: 00 01 01 ca 03 00 01 00 29 c8 03 02 00 01 00    |........)......|
```

### WASM
```
00000000: 05 02 44 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |..D__tests__/fix|
00000010: 74 75 72 65 73 2f 74 65 73 74 5f 61 6e 79 6d 6f |tures/test_anymo|
00000020: 75 73 2e 6a 73 02 67 0d c8 03 00 00 00 00 00 0c |us.js.g.........|
00000030: 20 06 01 a4 01 00 00 00 02 00 01 0f 00 08 ec 02 | ...............|
00000040: 29 c2 00 39 8d 00 00 00 f1 0e 06 2f c8 03 06 00 |)..9......./....|
00000050: 00 21 06 1b 01 00 0c 43 06 01 00 01 00 01 00 00 |.!.....C........|
00000060: 00 01 01 ca 03 00 01 00 29 c8 03 02 00 01 00    |........)......|
```