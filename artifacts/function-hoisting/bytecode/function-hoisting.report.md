# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/function-hoisting.ts
**生成时间**: 2025-12-06T02:09:56.380Z

## 大小对比

- TypeScript编译器: 176 字节
- WASM编译器: 181 字节
- 差异: -5 字节 (-2.76%)

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
    "remaining": 88
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

共发现 35 个字节差异:

- 偏移量 0x8d: TS=0x00 vs WASM=0x0a
- 偏移量 0x8e: TS=0x04 vs WASM=0x00
- 偏移量 0x8f: TS=0x12 vs WASM=0x00
- 偏移量 0x90: TS=0x00 vs WASM=0x3e
- 偏移量 0x91: TS=0x15 vs WASM=0x0e
- 偏移量 0x92: TS=0x00 vs WASM=0x1b
- 偏移量 0x93: TS=0x00 vs WASM=0x0a
- 偏移量 0x94: TS=0x0c vs WASM=0x07
- 偏移量 0x95: TS=0x42 vs WASM=0x16
- 偏移量 0x96: TS=0x06 vs WASM=0x07
- 偏移量 0x97: TS=0x00 vs WASM=0x17
- 偏移量 0x98: TS=0xca vs WASM=0x00
- 偏移量 0x99: TS=0x03 vs WASM=0x0c
- 偏移量 0x9a: TS=0x00 vs WASM=0x43
- 偏移量 0x9b: TS=0x00 vs WASM=0x06
- 偏移量 0x9c: TS=0x00 vs WASM=0x01
- 偏移量 0x9d: TS=0x03 vs WASM=0xca
- 偏移量 0x9e: TS=0x00 vs WASM=0x03
- 偏移量 0xa0: TS=0x07 vs WASM=0x00
- 偏移量 0xa2: TS=0x04 vs WASM=0x01
- ... (显示前20个差异，总共35个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 05 60 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..`__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 66 |piler/fixtures/f|
00000020: 75 6e 63 74 69 6f 6e 2d 68 6f 69 73 74 69 6e 67 |unction-hoisting|
00000030: 2e 6a 73 16 68 6f 69 73 74 65 64 46 75 6e 63 0e |.js.hoistedFunc.|
00000040: 63 6f 6e 73 6f 6c 65 06 6c 6f 67 18 49 20 61 6d |console.log.I am|
00000050: 20 68 6f 69 73 74 65 64 0d c8 03 00 00 00 00 00 | hoisted........|
00000060: 0c 20 06 01 a4 01 00 00 00 03 01 01 19 00 ca 03 |. ..............|
00000070: 00 01 08 ec 05 c2 00 e3 29 39 e6 00 00 00 43 e7 |........)9....C.|
00000080: 00 00 00 df f0 24 01 00 0e 06 2f c8 03 00 04 12 |.....$..../.....|
00000090: 00 15 00 00 0c 42 06 00 ca 03 00 00 00 03 00 00 |.....B..........|
000000a0: 07 00 04 e8 00 00 00 28 29 c8 03 00 02 04 6e 00 |.......().....n.|
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