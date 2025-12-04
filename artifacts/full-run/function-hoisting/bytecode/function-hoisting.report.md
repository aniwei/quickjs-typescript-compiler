# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/function-hoisting.ts
**生成时间**: 2025-12-04T06:33:08.149Z

## 大小对比

- TypeScript编译器: 198 字节
- WASM编译器: 181 字节
- 差异: 17 字节 (9.39%)

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
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "hoistedFunc",
      "offset": 51
    },
    {
      "index": 2,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "I am hoisted",
      "offset": 63
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 76
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 84
    }
  ],
  "functionHeader": {
    "offset": 88,
    "tag": "0xd",
    "remaining": 110
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

共发现 102 个字节差异:

- 偏移量 0x3f: TS=0x18 vs WASM=0x0e
- 偏移量 0x40: TS=0x49 vs WASM=0x63
- 偏移量 0x41: TS=0x20 vs WASM=0x6f
- 偏移量 0x42: TS=0x61 vs WASM=0x6e
- 偏移量 0x43: TS=0x6d vs WASM=0x73
- 偏移量 0x44: TS=0x20 vs WASM=0x6f
- 偏移量 0x45: TS=0x68 vs WASM=0x6c
- 偏移量 0x46: TS=0x6f vs WASM=0x65
- 偏移量 0x47: TS=0x69 vs WASM=0x06
- 偏移量 0x48: TS=0x73 vs WASM=0x6c
- 偏移量 0x49: TS=0x74 vs WASM=0x6f
- 偏移量 0x4a: TS=0x65 vs WASM=0x67
- 偏移量 0x4b: TS=0x64 vs WASM=0x18
- 偏移量 0x4c: TS=0x0e vs WASM=0x49
- 偏移量 0x4d: TS=0x63 vs WASM=0x20
- 偏移量 0x4e: TS=0x6f vs WASM=0x61
- 偏移量 0x4f: TS=0x6e vs WASM=0x6d
- 偏移量 0x50: TS=0x73 vs WASM=0x20
- 偏移量 0x51: TS=0x6f vs WASM=0x68
- 偏移量 0x52: TS=0x6c vs WASM=0x6f
- ... (显示前20个差异，总共102个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 05 60 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..`__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 66 |piler/fixtures/f|
00000020: 75 6e 63 74 69 6f 6e 2d 68 6f 69 73 74 69 6e 67 |unction-hoisting|
00000030: 2e 6a 73 16 68 6f 69 73 74 65 64 46 75 6e 63 18 |.js.hoistedFunc.|
00000040: 49 20 61 6d 20 68 6f 69 73 74 65 64 0e 63 6f 6e |I am hoisted.con|
00000050: 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 00 00 00 00 |sole.log........|
00000060: 0c 20 06 01 a4 01 00 01 00 03 01 01 1b 01 ca 03 |. ..............|
00000070: 01 00 20 ca 03 00 01 08 ec 05 c2 00 e3 29 39 e7 |.. ..........)9.|
00000080: 00 00 00 43 e8 00 00 00 5a 00 00 f0 24 01 00 0e |...C....Z...$...|
00000090: 06 2f c8 03 0a 00 00 3e 0e 1b 0a 11 16 07 17 00 |./.....>........|
000000a0: 0c 43 06 01 ca 03 00 01 00 01 00 00 0b 01 e6 01 |.C..............|
000000b0: 00 00 00 0c 03 5b 00 00 04 e6 00 00 00 28 c8 03 |.....[.......(..|
000000c0: 04 01 00 1c 04 00                               |......|
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