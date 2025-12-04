# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/function-hoisting.ts
**生成时间**: 2025-12-02T17:07:51.244Z

## 大小对比

- TypeScript编译器: 195 字节
- WASM编译器: 181 字节
- 差异: 14 字节 (7.73%)

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
      "rawLength": 96,
      "actualLength": 48,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/function-hoisting.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 51
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 59
    },
    {
      "index": 3,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "hoistedFunc",
      "offset": 63
    },
    {
      "index": 4,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "I am hoisted",
      "offset": 75
    }
  ],
  "functionHeader": {
    "offset": 88,
    "tag": "0xd",
    "remaining": 107
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
      "rawLength": 96,
      "actualLength": 48,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/function-hoisting.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "hoistedFunc",
      "offset": 51
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 63
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 71
    },
    {
      "index": 4,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "I am hoisted",
      "offset": 75
    }
  ],
  "functionHeader": {
    "offset": 88,
    "tag": "0xd",
    "remaining": 93
  }
}
```

## 字节级差异

共发现 100 个字节差异:

- 偏移量 0x33: TS=0x0e vs WASM=0x16
- 偏移量 0x34: TS=0x63 vs WASM=0x68
- 偏移量 0x36: TS=0x6e vs WASM=0x69
- 偏移量 0x38: TS=0x6f vs WASM=0x74
- 偏移量 0x39: TS=0x6c vs WASM=0x65
- 偏移量 0x3a: TS=0x65 vs WASM=0x64
- 偏移量 0x3b: TS=0x06 vs WASM=0x46
- 偏移量 0x3c: TS=0x6c vs WASM=0x75
- 偏移量 0x3d: TS=0x6f vs WASM=0x6e
- 偏移量 0x3e: TS=0x67 vs WASM=0x63
- 偏移量 0x3f: TS=0x16 vs WASM=0x0e
- 偏移量 0x40: TS=0x68 vs WASM=0x63
- 偏移量 0x42: TS=0x69 vs WASM=0x6e
- 偏移量 0x44: TS=0x74 vs WASM=0x6f
- 偏移量 0x45: TS=0x65 vs WASM=0x6c
- 偏移量 0x46: TS=0x64 vs WASM=0x65
- 偏移量 0x47: TS=0x46 vs WASM=0x06
- 偏移量 0x48: TS=0x75 vs WASM=0x6c
- 偏移量 0x49: TS=0x6e vs WASM=0x6f
- 偏移量 0x4a: TS=0x63 vs WASM=0x67
- ... (显示前20个差异，总共100个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 05 60 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..`__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 66 |piler/fixtures/f|
00000020: 75 6e 63 74 69 6f 6e 2d 68 6f 69 73 74 69 6e 67 |unction-hoisting|
00000030: 2e 6a 73 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 16 |.js.console.log.|
00000040: 68 6f 69 73 74 65 64 46 75 6e 63 18 49 20 61 6d |hoistedFunc.I am|
00000050: 20 68 6f 69 73 74 65 64 0d c8 03 00 00 00 00 00 | hoisted........|
00000060: 0c 20 06 01 a4 01 00 00 00 03 01 01 19 00 ce 03 |. ..............|
00000070: ff ff ff ff 0f 00 08 ec 05 c2 00 e3 29 39 e5 00 |............)9..|
00000080: 00 00 43 e6 00 00 00 df f0 24 01 00 0e 06 2f c8 |..C......$..../.|
00000090: 03 0a 00 00 3e 0e 1b 0a 07 16 07 17 00 0c 43 06 |....>.........C.|
000000a0: 01 ce 03 00 01 00 01 00 00 0b 01 e6 01 00 00 00 |................|
000000b0: 0c 03 5b 00 00 04 e8 00 00 00 28 c8 03 04 01 00 |..[.......(.....|
000000c0: 1c 04 00                                        |...|
```

### WASM
```
00000000: 05 05 60 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..`__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 66 |piler/fixtures/f|
00000020: 75 6e 63 74 69 6f 6e 2d 68 6f 69 73 74 69 6e 67 |unction-hoisting|
00000030: 2e 6a 73 16 68 6f 69 73 74 65 64 46 75 6e 63 0e |.js.hoistedFunc.|
00000040: 63 6f 6e 73 6f 6c 65 06 6c 6f 67 18 49 20 61 6d |console.log.I am|
00000050: 20 68 6f 69 73 74 65 64 0d c8 03 00 00 00 00 00 | hoisted........|
00000060: 0c 20 06 01 a4 01 00 00 00 03 01 01 19 00 ca 03 |. ..............|
00000070: 00 01 08 ec 05 c2 00 e3 29 39 e6 00 00 00 43 e7 |........)9....C.|
00000080: 00 00 00 df f0 24 01 00 0e 06 2f c8 03 0a 00 00 |.....$..../.....|
00000090: 3e 0e 1b 0a 07 16 07 17 00 0c 43 06 01 ca 03 00 |>.........C.....|
000000a0: 00 00 01 00 00 06 00 04 e8 00 00 00 28 c8 03 04 |............(...|
000000b0: 01 00 1c 04 00                                  |.....|
```