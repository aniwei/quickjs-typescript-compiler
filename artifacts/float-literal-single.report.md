# 字节码分析报告

**输入文件**: tmp/float-literal-single.ts
**生成时间**: 2025-10-03T04:46:24.835Z

## 大小对比

- TypeScript编译器: 93 字节
- WASM编译器: 93 字节
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
      "rawLength": 54,
      "actualLength": 27,
      "isWideChar": 0,
      "string": "tmp/float-literal-single.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "floatLiteral",
      "offset": 30
    }
  ],
  "functionHeader": {
    "offset": 43,
    "tag": "0xd",
    "remaining": 50
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
      "rawLength": 54,
      "actualLength": 27,
      "isWideChar": 0,
      "string": "tmp/float-literal-single.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "floatLiteral",
      "offset": 30
    }
  ],
  "functionHeader": {
    "offset": 43,
    "tag": "0xd",
    "remaining": 50
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 02 36 74 6d 70 2f 66 6c 6f 61 74 2d 6c 69 74 |..6tmp/float-lit|
00000010: 65 72 61 6c 2d 73 69 6e 67 6c 65 2e 6a 73 18 66 |eral-single.js.f|
00000020: 6c 6f 61 74 4c 69 74 65 72 61 6c 0d c8 03 00 00 |loatLiteral.....|
00000030: 00 00 00 0c 20 06 01 a4 01 00 00 00 01 01 01 09 |.... ...........|
00000040: 00 ca 03 00 0d 08 ec 02 29 c1 00 e3 06 2f c8 03 |........)..../..|
00000050: 02 00 00 00 06 00 00 00 00 00 00 0c 40          |............@|
```

### WASM
```
00000000: 05 02 36 74 6d 70 2f 66 6c 6f 61 74 2d 6c 69 74 |..6tmp/float-lit|
00000010: 65 72 61 6c 2d 73 69 6e 67 6c 65 2e 6a 73 18 66 |eral-single.js.f|
00000020: 6c 6f 61 74 4c 69 74 65 72 61 6c 0d c8 03 00 00 |loatLiteral.....|
00000030: 00 00 00 0c 20 06 01 a4 01 00 00 00 01 01 01 09 |.... ...........|
00000040: 00 ca 03 00 0d 08 ec 02 29 c1 00 e3 06 2f c8 03 |........)..../..|
00000050: 02 00 00 00 06 00 00 00 00 00 00 0c 40          |............@|
```