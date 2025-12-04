# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/empty-block.ts
**生成时间**: 2025-12-04T06:33:07.842Z

## 大小对比

- TypeScript编译器: 125 字节
- WASM编译器: 122 字节
- 差异: 3 字节 (2.46%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 4,
  "atoms": [
    {
      "index": 0,
      "rawLength": 84,
      "actualLength": 42,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/empty-block.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 45
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 47
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 55
    }
  ],
  "functionHeader": {
    "offset": 59,
    "tag": "0xd",
    "remaining": 66
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 4,
  "atoms": [
    {
      "index": 0,
      "rawLength": 84,
      "actualLength": 42,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/empty-block.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 45
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 47
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 55
    }
  ],
  "functionHeader": {
    "offset": 59,
    "tag": "0xd",
    "remaining": 63
  }
}
```

## 字节级差异

共发现 41 个字节差异:

- 偏移量 0x4a: TS=0x01 vs WASM=0x00
- 偏移量 0x4d: TS=0x00 vs WASM=0x01
- 偏移量 0x4f: TS=0x19 vs WASM=0x17
- 偏移量 0x50: TS=0x01 vs WASM=0x00
- 偏移量 0x53: TS=0x02 vs WASM=0x00
- 偏移量 0x54: TS=0x00 vs WASM=0x01
- 偏移量 0x55: TS=0x20 vs WASM=0x08
- 偏移量 0x56: TS=0x08 vs WASM=0xec
- 偏移量 0x57: TS=0xec vs WASM=0x02
- 偏移量 0x58: TS=0x02 vs WASM=0x29
- 偏移量 0x59: TS=0x29 vs WASM=0xb8
- 偏移量 0x5a: TS=0xb8 vs WASM=0xe3
- 偏移量 0x5b: TS=0xcb vs WASM=0x39
- 偏移量 0x5c: TS=0x39 vs WASM=0xe6
- 偏移量 0x5d: TS=0xe6 vs WASM=0x00
- 偏移量 0x60: TS=0x00 vs WASM=0x43
- 偏移量 0x61: TS=0x43 vs WASM=0xe7
- 偏移量 0x62: TS=0xe7 vs WASM=0x00
- 偏移量 0x65: TS=0x00 vs WASM=0xdf
- 偏移量 0x66: TS=0x5a vs WASM=0x24
- ... (显示前20个差异，总共41个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 04 54 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..T__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 65 |piler/fixtures/e|
00000020: 6d 70 74 79 2d 62 6c 6f 63 6b 2e 6a 73 02 61 0e |mpty-block.js.a.|
00000030: 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 00 |console.log.....|
00000040: 00 00 00 0c 20 06 01 a4 01 00 01 00 03 00 00 19 |.... ...........|
00000050: 01 ca 03 02 00 20 08 ec 02 29 b8 cb 39 e6 00 00 |..... ...)..9...|
00000060: 00 43 e7 00 00 00 5a 00 00 24 01 00 0e 06 2f c8 |.C....Z..$..../.|
00000070: 03 0a 00 00 23 04 1b 0e 1b 0a 11 01 00          |....#........|
```

### WASM
```
00000000: 05 04 54 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..T__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 65 |piler/fixtures/e|
00000020: 6d 70 74 79 2d 62 6c 6f 63 6b 2e 6a 73 02 61 0e |mpty-block.js.a.|
00000030: 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 00 |console.log.....|
00000040: 00 00 00 0c 20 06 01 a4 01 00 00 00 03 01 00 17 |.... ...........|
00000050: 00 ca 03 00 01 08 ec 02 29 b8 e3 39 e6 00 00 00 |........)..9....|
00000060: 43 e7 00 00 00 df 24 01 00 0e 06 2f c8 03 0a 00 |C.....$..../....|
00000070: 00 23 08 1b 0e 1b 0a 07 01 00                   |.#........|
```