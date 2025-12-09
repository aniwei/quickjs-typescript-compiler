# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/compiler/fixtures/empty.ts
**生成时间**: 2025-12-09T09:46:45.344Z

## 大小对比

- TypeScript编译器: 73 字节
- WASM编译器: 73 字节
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
      "rawLength": 72,
      "actualLength": 36,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/empty.js",
      "offset": 2
    }
  ],
  "functionHeader": {
    "offset": 39,
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
      "rawLength": 72,
      "actualLength": 36,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/empty.js",
      "offset": 2
    }
  ],
  "functionHeader": {
    "offset": 39,
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
00000000: 05 01 48 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..H__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 65 |piler/fixtures/e|
00000020: 6d 70 74 79 2e 6a 73 0d c8 03 00 00 00 00 00 0c |mpty.js.........|
00000030: 20 06 01 a4 01 00 00 00 01 00 00 06 00 08 ec 02 | ...............|
00000040: 29 06 2f c8 03 02 00 00 00                      |)./......|
```

### WASM
```
00000000: 05 01 48 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..H__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 65 |piler/fixtures/e|
00000020: 6d 70 74 79 2e 6a 73 0d c8 03 00 00 00 00 00 0c |mpty.js.........|
00000030: 20 06 01 a4 01 00 00 00 01 00 00 06 00 08 ec 02 | ...............|
00000040: 29 06 2f c8 03 02 00 00 00                      |)./......|
```