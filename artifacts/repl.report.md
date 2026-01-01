# 字节码分析报告

**输入文件**: __tests__/fixtures/quickjs-tests/repl.ts
**生成时间**: 2026-01-01T09:18:35.540Z

## 大小对比

- TypeScript编译器: 117 字节
- WASM编译器: 117 字节
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
      "rawLength": 80,
      "actualLength": 40,
      "isWideChar": 0,
      "string": "__tests__/fixtures/quickjs-tests/repl.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "g",
      "offset": 43
    }
  ],
  "functionHeader": {
    "offset": 45,
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
      "rawLength": 80,
      "actualLength": 40,
      "isWideChar": 0,
      "string": "__tests__/fixtures/quickjs-tests/repl.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "g",
      "offset": 43
    }
  ],
  "functionHeader": {
    "offset": 45,
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
00000000: 05 02 50 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |..P__tests__/fix|
00000010: 74 75 72 65 73 2f 71 75 69 63 6b 6a 73 2d 74 65 |tures/quickjs-te|
00000020: 73 74 73 2f 72 65 70 6c 2e 6a 73 02 67 0d c8 03 |sts/repl.js.g...|
00000030: 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 02 00 |...... .........|
00000040: 01 0f 00 08 ec 02 29 c2 00 39 8d 00 00 00 f1 0e |......)..9......|
00000050: 06 2f c8 03 06 00 00 21 06 1b 01 00 0c 43 06 01 |./.....!.....C..|
00000060: 00 01 00 01 00 00 00 01 01 ca 03 00 01 00 29 c8 |..............).|
00000070: 03 02 00 01 00                                  |.....|
```

### WASM
```
00000000: 05 02 50 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |..P__tests__/fix|
00000010: 74 75 72 65 73 2f 71 75 69 63 6b 6a 73 2d 74 65 |tures/quickjs-te|
00000020: 73 74 73 2f 72 65 70 6c 2e 6a 73 02 67 0d c8 03 |sts/repl.js.g...|
00000030: 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 02 00 |...... .........|
00000040: 01 0f 00 08 ec 02 29 c2 00 39 8d 00 00 00 f1 0e |......)..9......|
00000050: 06 2f c8 03 06 00 00 21 06 1b 01 00 0c 43 06 01 |./.....!.....C..|
00000060: 00 01 00 01 00 00 00 01 01 ca 03 00 01 00 29 c8 |..............).|
00000070: 03 02 00 01 00                                  |.....|
```