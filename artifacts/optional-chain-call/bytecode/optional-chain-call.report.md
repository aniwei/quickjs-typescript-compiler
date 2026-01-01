# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/optional-chain-call.ts
**生成时间**: 2026-01-01T10:01:39.162Z

## 大小对比

- TypeScript编译器: 354 字节
- WASM编译器: 354 字节
- 差异: 0 字节 (0.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 8,
  "atoms": [
    {
      "index": 0,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 6
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 8
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "f",
      "offset": 10
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 12
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 20
    },
    {
      "index": 6,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "missing",
      "offset": 24
    },
    {
      "index": 7,
      "rawLength": 82,
      "actualLength": 41,
      "isWideChar": 0,
      "string": "__tests__/fixtures/optional-chain-call.js",
      "offset": 32
    }
  ],
  "functionHeader": {
    "offset": 74,
    "tag": "0xc",
    "remaining": 280
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 8,
  "atoms": [
    {
      "index": 0,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 6
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 8
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "f",
      "offset": 10
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 12
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 20
    },
    {
      "index": 6,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "missing",
      "offset": 24
    },
    {
      "index": 7,
      "rawLength": 82,
      "actualLength": 41,
      "isWideChar": 0,
      "string": "__tests__/fixtures/optional-chain-call.js",
      "offset": 32
    }
  ],
  "functionHeader": {
    "offset": 74,
    "tag": "0xc",
    "remaining": 280
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 08 06 6f 62 6a 02 62 02 61 02 66 0e 63 6f 6e |...obj.b.a.f.con|
00000010: 73 6f 6c 65 06 6c 6f 67 0e 6d 69 73 73 69 6e 67 |sole.log.missing|
00000020: 52 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 |R__tests__/fixtu|
00000030: 72 65 73 2f 6f 70 74 69 6f 6e 61 6c 2d 63 68 61 |res/optional-cha|
00000040: 69 6e 2d 63 61 6c 6c 2e 6a 73 0c 00 06 00 a4 01 |in-call.js......|
00000050: 00 01 00 05 00 01 c3 01 01 a6 01 00 00 00 40 e4 |..............@.|
00000060: 00 00 00 80 3f e4 00 00 00 80 0b 0b b8 4e e5 00 |....?........N..|
00000070: 00 00 4e e6 00 00 00 c2 00 4f e7 00 00 00 4e e7 |..N......O....N.|
00000080: 00 00 00 3b e4 00 00 00 39 e8 00 00 00 43 e9 00 |...;....9....C..|
00000090: 00 00 39 e4 00 00 00 11 b2 ec 05 0e 06 ee 13 42 |..9............B|
000000a0: e6 00 00 00 11 b2 ec 05 0e 06 ee 06 42 e5 00 00 |............B...|
000000b0: 00 11 b2 ec 03 0e b7 24 01 00 cb 39 e8 00 00 00 |.......$...9....|
000000c0: 43 e9 00 00 00 39 e4 00 00 00 11 b2 ec 05 0e 06 |C....9..........|
000000d0: ee 13 42 ea 00 00 00 11 b2 ec 05 0e 06 ee 06 42 |..B............B|
000000e0: e5 00 00 00 11 b2 ec 03 0e ba 24 01 00 cb 39 e8 |..........$...9.|
000000f0: 00 00 00 43 e9 00 00 00 39 e4 00 00 00 11 b2 ec |...C....9.......|
00000100: 05 0e 06 ee 12 43 e7 00 00 00 11 b2 ec 06 0e 0e |.....C..........|
00000110: 06 ee 04 24 00 00 11 b2 ec 03 0e bb 24 01 00 cf |...$........$...|
00000120: 28 d6 03 28 00 00 00 2a 0a 00 1b 0e 1b 0a 1b 06 |(..(...*........|
00000130: 43 06 61 0d 17 15 1b 0e 1b 0a 1b 06 43 12 61 19 |C.a.........C.a.|
00000140: 17 15 1b 0e 1b 0a 1b 06 70 0a 2f 11 00 0c 02 06 |........p./.....|
00000150: 00 00 00 00 00 01 00 00 02 00 b9 28 d6 03 02 03 |...........(....|
00000160: 07 00                                           |..|
```

### WASM
```
00000000: 05 08 06 6f 62 6a 02 62 02 61 02 66 0e 63 6f 6e |...obj.b.a.f.con|
00000010: 73 6f 6c 65 06 6c 6f 67 0e 6d 69 73 73 69 6e 67 |sole.log.missing|
00000020: 52 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 |R__tests__/fixtu|
00000030: 72 65 73 2f 6f 70 74 69 6f 6e 61 6c 2d 63 68 61 |res/optional-cha|
00000040: 69 6e 2d 63 61 6c 6c 2e 6a 73 0c 00 06 00 a4 01 |in-call.js......|
00000050: 00 01 00 05 00 01 c3 01 01 a6 01 00 00 00 40 e4 |..............@.|
00000060: 00 00 00 80 3f e4 00 00 00 80 0b 0b b8 4e e5 00 |....?........N..|
00000070: 00 00 4e e6 00 00 00 c2 00 4f e7 00 00 00 4e e7 |..N......O....N.|
00000080: 00 00 00 3b e4 00 00 00 39 e8 00 00 00 43 e9 00 |...;....9....C..|
00000090: 00 00 39 e4 00 00 00 11 b2 ec 05 0e 06 ee 13 42 |..9............B|
000000a0: e6 00 00 00 11 b2 ec 05 0e 06 ee 06 42 e5 00 00 |............B...|
000000b0: 00 11 b2 ec 03 0e b7 24 01 00 cb 39 e8 00 00 00 |.......$...9....|
000000c0: 43 e9 00 00 00 39 e4 00 00 00 11 b2 ec 05 0e 06 |C....9..........|
000000d0: ee 13 42 ea 00 00 00 11 b2 ec 05 0e 06 ee 06 42 |..B............B|
000000e0: e5 00 00 00 11 b2 ec 03 0e ba 24 01 00 cb 39 e8 |..........$...9.|
000000f0: 00 00 00 43 e9 00 00 00 39 e4 00 00 00 11 b2 ec |...C....9.......|
00000100: 05 0e 06 ee 12 43 e7 00 00 00 11 b2 ec 06 0e 0e |.....C..........|
00000110: 06 ee 04 24 00 00 11 b2 ec 03 0e bb 24 01 00 cf |...$........$...|
00000120: 28 d6 03 28 00 00 00 2a 0a 00 1b 0e 1b 0a 1b 06 |(..(...*........|
00000130: 43 06 61 0d 17 15 1b 0e 1b 0a 1b 06 43 12 61 19 |C.a.........C.a.|
00000140: 17 15 1b 0e 1b 0a 1b 06 70 0a 2f 11 00 0c 02 06 |........p./.....|
00000150: 00 00 00 00 00 01 00 00 02 00 b9 28 d6 03 02 03 |...........(....|
00000160: 07 00                                           |..|
```