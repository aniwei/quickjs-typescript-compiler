# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/number.ts
**生成时间**: 2025-12-23T10:24:24.210Z

## 大小对比

- TypeScript编译器: 60 字节
- WASM编译器: 60 字节
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
      "rawLength": 56,
      "actualLength": 28,
      "isWideChar": 0,
      "string": "__tests__/fixtures/number.js",
      "offset": 2
    }
  ],
  "functionHeader": {
    "offset": 31,
    "tag": "0xc",
    "remaining": 29
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
      "rawLength": 56,
      "actualLength": 28,
      "isWideChar": 0,
      "string": "__tests__/fixtures/number.js",
      "offset": 2
    }
  ],
  "functionHeader": {
    "offset": 31,
    "tag": "0xc",
    "remaining": 29
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 01 38 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |..8__tests__/fix|
00000010: 74 75 72 65 73 2f 6e 75 6d 62 65 72 2e 6a 73 0c |tures/number.js.|
00000020: 00 06 00 a4 01 00 01 00 01 00 00 04 01 a6 01 00 |................|
00000030: 00 00 bf 7b cf 28 c8 03 02 00 00 00             |...{.(......|
```

### WASM
```
00000000: 05 01 38 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |..8__tests__/fix|
00000010: 74 75 72 65 73 2f 6e 75 6d 62 65 72 2e 6a 73 0c |tures/number.js.|
00000020: 00 06 00 a4 01 00 01 00 01 00 00 04 01 a6 01 00 |................|
00000030: 00 00 bf 7b cf 28 c8 03 02 00 00 00             |...{.(......|
```