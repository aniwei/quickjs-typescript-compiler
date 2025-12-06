# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/empty-block.ts
**生成时间**: 2025-12-06T02:09:56.356Z

## 大小对比

- TypeScript编译器: 117 字节
- WASM编译器: 122 字节
- 差异: -5 字节 (-4.10%)

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
    "remaining": 58
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

共发现 13 个字节差异:

- 偏移量 0x5a: TS=0xcb vs WASM=0xe3
- 偏移量 0x6e: TS=0x00 vs WASM=0x0a
- 偏移量 0x6f: TS=0x04 vs WASM=0x00
- 偏移量 0x70: TS=0x18 vs WASM=0x00
- 偏移量 0x71: TS=0x0a vs WASM=0x23
- 偏移量 0x72: TS=0x0d vs WASM=0x08
- 偏移量 0x73: TS=0x78 vs WASM=0x1b
- 偏移量 0x74: TS=0x00 vs WASM=0x0e
- 偏移量 0x75: TS=EOF vs WASM=0x1b
- 偏移量 0x76: TS=EOF vs WASM=0x0a
- 偏移量 0x77: TS=EOF vs WASM=0x07
- 偏移量 0x78: TS=EOF vs WASM=0x01
- 偏移量 0x79: TS=EOF vs WASM=0x00

## 十六进制转储对比

### TypeScript
```
00000000: 05 04 54 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..T__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 65 |piler/fixtures/e|
00000020: 6d 70 74 79 2d 62 6c 6f 63 6b 2e 6a 73 02 61 0e |mpty-block.js.a.|
00000030: 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 00 |console.log.....|
00000040: 00 00 00 0c 20 06 01 a4 01 00 00 00 03 01 00 17 |.... ...........|
00000050: 00 ca 03 00 01 08 ec 02 29 b8 cb 39 e6 00 00 00 |........)..9....|
00000060: 43 e7 00 00 00 df 24 01 00 0e 06 2f c8 03 00 04 |C.....$..../....|
00000070: 18 0a 0d 78 00                                  |...x.|
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