# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/number.ts
**生成时间**: 2025-12-09T08:59:51.531Z

## 大小对比

- TypeScript编译器: 74 字节
- WASM编译器: 74 字节
- 差异: 0 字节 (0.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 1,
  "atoms": [
    {
      "index": 0,
      "rawLength": 74,
      "actualLength": 37,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/number.js",
      "offset": 2
    }
  ],
  "functionHeader": {
    "offset": 40,
    "tag": "0xd",
    "remaining": 34
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 1,
  "atoms": [
    {
      "index": 0,
      "rawLength": 74,
      "actualLength": 37,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/number.js",
      "offset": 2
    }
  ],
  "functionHeader": {
    "offset": 40,
    "tag": "0xd",
    "remaining": 34
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 01 4a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..J__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6e |piler/fixtures/n|
00000020: 75 6d 62 65 72 2e 6a 73 0d c8 03 00 00 00 00 00 |umber.js........|
00000030: 0c 20 06 01 a4 01 00 00 00 01 00 00 06 00 08 ec |. ..............|
00000040: 02 29 06 2f c8 03 02 00 00 00                   |.)./......|
```

### WASM
```
00000000: 05 01 4a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..J__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6e |piler/fixtures/n|
00000020: 75 6d 62 65 72 2e 6a 73 0d c8 03 00 00 00 00 00 |umber.js........|
00000030: 0c 20 06 01 a4 01 00 00 00 01 00 00 06 00 08 ec |. ..............|
00000040: 02 29 06 2f c8 03 02 00 00 00                   |.)./......|
```