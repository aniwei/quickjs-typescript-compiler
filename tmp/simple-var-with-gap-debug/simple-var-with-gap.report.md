# 字节码分析报告

**输入文件**: tmp/simple-var-with-gap.ts
**生成时间**: 2025-12-03T04:28:22.871Z

## 大小对比

- TypeScript编译器: 119 字节
- WASM编译器: 119 字节
- 差异: 0 字节 (0.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 5,
  "atoms": [
    {
      "index": 0,
      "rawLength": 52,
      "actualLength": 26,
      "isWideChar": 0,
      "string": "tmp/simple-var-with-gap.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 29
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 31
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 39
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 43
    }
  ],
  "functionHeader": {
    "offset": 45,
    "tag": "0xd",
    "remaining": 74
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 5,
  "atoms": [
    {
      "index": 0,
      "rawLength": 52,
      "actualLength": 26,
      "isWideChar": 0,
      "string": "tmp/simple-var-with-gap.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 29
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 31
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 39
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 43
    }
  ],
  "functionHeader": {
    "offset": 45,
    "tag": "0xd",
    "remaining": 74
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 05 34 74 6d 70 2f 73 69 6d 70 6c 65 2d 76 61 |..4tmp/simple-va|
00000010: 72 2d 77 69 74 68 2d 67 61 70 2e 6a 73 02 61 0e |r-with-gap.js.a.|
00000020: 63 6f 6e 73 6f 6c 65 06 6c 6f 67 02 78 0d c8 03 |console.log.x...|
00000030: 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 03 01 |...... .........|
00000040: 00 20 00 ca 03 00 01 08 ec 02 29 bf 0a e3 39 e6 |. ........)...9.|
00000050: 00 00 00 43 e7 00 00 00 04 e8 00 00 00 24 01 00 |...C.........$..|
00000060: 0e df bc 9f e3 06 2f c8 03 0c 00 00 26 00 1b 0e |....../.....&...|
00000070: 34 08 17 15 0c 04 00                            |4......|
```

### WASM
```
00000000: 05 05 34 74 6d 70 2f 73 69 6d 70 6c 65 2d 76 61 |..4tmp/simple-va|
00000010: 72 2d 77 69 74 68 2d 67 61 70 2e 6a 73 02 61 0e |r-with-gap.js.a.|
00000020: 63 6f 6e 73 6f 6c 65 06 6c 6f 67 02 78 0d c8 03 |console.log.x...|
00000030: 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 03 01 |...... .........|
00000040: 00 20 00 ca 03 00 01 08 ec 02 29 bf 0a e3 39 e6 |. ........)...9.|
00000050: 00 00 00 43 e7 00 00 00 04 e8 00 00 00 24 01 00 |...C.........$..|
00000060: 0e df bc 9f e3 06 2f c8 03 0c 00 00 26 00 1b 0e |....../.....&...|
00000070: 34 08 17 15 0c 04 00                            |4......|
```