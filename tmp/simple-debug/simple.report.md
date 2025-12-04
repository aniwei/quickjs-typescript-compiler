# 字节码分析报告

**输入文件**: tmp/simple.ts
**生成时间**: 2025-12-03T04:26:09.455Z

## 大小对比

- TypeScript编译器: 59 字节
- WASM编译器: 59 字节
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
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "tmp/simple.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 16
    }
  ],
  "functionHeader": {
    "offset": 18,
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
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "tmp/simple.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 16
    }
  ],
  "functionHeader": {
    "offset": 18,
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
00000000: 05 02 1a 74 6d 70 2f 73 69 6d 70 6c 65 2e 6a 73 |...tmp/simple.js|
00000010: 02 61 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 |.a......... ....|
00000020: 00 00 00 01 01 00 09 00 ca 03 00 09 08 ec 02 29 |...............)|
00000030: bf 0a e3 06 2f c8 03 02 00 00 00                |..../......|
```

### WASM
```
00000000: 05 02 1a 74 6d 70 2f 73 69 6d 70 6c 65 2e 6a 73 |...tmp/simple.js|
00000010: 02 61 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 |.a......... ....|
00000020: 00 00 00 01 01 00 09 00 ca 03 00 09 08 ec 02 29 |...............)|
00000030: bf 0a e3 06 2f c8 03 02 00 00 00                |..../......|
```