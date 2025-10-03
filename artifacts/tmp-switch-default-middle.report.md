# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/tmp-switch-default-middle.ts
**生成时间**: 2025-10-02T17:28:42.596Z

## 大小对比

- TypeScript编译器: 164 字节
- WASM编译器: 164 字节
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
      "rawLength": 112,
      "actualLength": 56,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/tmp-switch-default-middle.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "mix",
      "offset": 59
    }
  ],
  "functionHeader": {
    "offset": 63,
    "tag": "0xd",
    "remaining": 101
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
      "rawLength": 112,
      "actualLength": 56,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/tmp-switch-default-middle.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "mix",
      "offset": 59
    }
  ],
  "functionHeader": {
    "offset": 63,
    "tag": "0xd",
    "remaining": 101
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 02 70 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..p__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 74 |piler/fixtures/t|
00000020: 6d 70 2d 73 77 69 74 63 68 2d 64 65 66 61 75 6c |mp-switch-defaul|
00000030: 74 2d 6d 69 64 64 6c 65 2e 6a 73 06 6d 69 78 0d |t-middle.js.mix.|
00000040: c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 |........ .......|
00000050: 02 01 01 0d 00 ca 03 00 01 08 ec 05 c2 00 e3 29 |...............)|
00000060: df b8 f1 0e 06 2f c8 03 08 00 00 00 07 14 00 0c |...../..........|
00000070: 06 00 0c 43 06 01 ca 03 01 00 01 03 00 00 11 01 |...C............|
00000080: 84 01 00 01 00 d3 11 b7 ad ec 05 b8 28 b9 28 11 |............(.(.|
00000090: b9 ad ec fa ba 28 c8 03 0a 00 00 03 18 27 00 0e |.....(.......'..|
000000a0: 00 27 00 00                                     |.'..|
```

### WASM
```
00000000: 05 02 70 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..p__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 74 |piler/fixtures/t|
00000020: 6d 70 2d 73 77 69 74 63 68 2d 64 65 66 61 75 6c |mp-switch-defaul|
00000030: 74 2d 6d 69 64 64 6c 65 2e 6a 73 06 6d 69 78 0d |t-middle.js.mix.|
00000040: c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 |........ .......|
00000050: 02 01 01 0d 00 ca 03 00 01 08 ec 05 c2 00 e3 29 |...............)|
00000060: df b8 f1 0e 06 2f c8 03 08 00 00 00 07 14 00 0c |...../..........|
00000070: 06 00 0c 43 06 01 ca 03 01 00 01 03 00 00 11 01 |...C............|
00000080: 84 01 00 01 00 d3 11 b7 ad ec 05 b8 28 b9 28 11 |............(.(.|
00000090: b9 ad ec fa ba 28 c8 03 0a 00 00 03 18 27 00 0e |.....(.......'..|
000000a0: 00 27 00 00                                     |.'..|
```