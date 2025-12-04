# 字节码分析报告

**输入文件**: tmp/simple-var-only.ts
**生成时间**: 2025-12-03T04:26:37.030Z

## 大小对比

- TypeScript编译器: 68 字节
- WASM编译器: 68 字节
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
      "rawLength": 44,
      "actualLength": 22,
      "isWideChar": 0,
      "string": "tmp/simple-var-only.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 25
    }
  ],
  "functionHeader": {
    "offset": 27,
    "tag": "0xd",
    "remaining": 41
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
      "rawLength": 44,
      "actualLength": 22,
      "isWideChar": 0,
      "string": "tmp/simple-var-only.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 25
    }
  ],
  "functionHeader": {
    "offset": 27,
    "tag": "0xd",
    "remaining": 41
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 02 2c 74 6d 70 2f 73 69 6d 70 6c 65 2d 76 61 |..,tmp/simple-va|
00000010: 72 2d 6f 6e 6c 79 2e 6a 73 02 61 0d c8 03 00 00 |r-only.js.a.....|
00000020: 00 00 00 0c 20 06 01 a4 01 00 00 00 01 01 00 09 |.... ...........|
00000030: 00 ca 03 00 01 08 ec 02 29 bf 0a e3 06 2f c8 03 |........)..../..|
00000040: 02 00 00 00                                     |....|
```

### WASM
```
00000000: 05 02 2c 74 6d 70 2f 73 69 6d 70 6c 65 2d 76 61 |..,tmp/simple-va|
00000010: 72 2d 6f 6e 6c 79 2e 6a 73 02 61 0d c8 03 00 00 |r-only.js.a.....|
00000020: 00 00 00 0c 20 06 01 a4 01 00 00 00 01 01 00 09 |.... ...........|
00000030: 00 ca 03 00 01 08 ec 02 29 bf 0a e3 06 2f c8 03 |........)..../..|
00000040: 02 00 00 00                                     |....|
```