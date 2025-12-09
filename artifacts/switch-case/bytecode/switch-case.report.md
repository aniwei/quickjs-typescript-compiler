# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/switch-case.ts
**生成时间**: 2025-12-09T08:59:51.574Z

## 大小对比

- TypeScript编译器: 182 字节
- WASM编译器: 182 字节
- 差异: 0 字节 (0.00%)

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
      "string": "__tests__/compiler/fixtures/switch-case.js",
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
    "remaining": 123
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
      "string": "__tests__/compiler/fixtures/switch-case.js",
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
    "remaining": 123
  }
}
```

## 字节级差异

共发现 54 个字节差异:

- 偏移量 0x57: TS=0x43 vs WASM=0x02
- 偏移量 0x58: TS=0xb8 vs WASM=0x29
- 偏移量 0x59: TS=0xe3 vs WASM=0xb8
- 偏移量 0x5a: TS=0x68 vs WASM=0xe3
- 偏移量 0x5b: TS=0x00 vs WASM=0x68
- 偏移量 0x5d: TS=0x11 vs WASM=0x00
- 偏移量 0x5e: TS=0xb7 vs WASM=0x11
- 偏移量 0x5f: TS=0xad vs WASM=0xb7
- 偏移量 0x60: TS=0xec vs WASM=0xad
- 偏移量 0x61: TS=0x12 vs WASM=0xec
- 偏移量 0x62: TS=0x39 vs WASM=0x12
- 偏移量 0x63: TS=0xe6 vs WASM=0x39
- 偏移量 0x64: TS=0x00 vs WASM=0xe6
- 偏移量 0x67: TS=0x43 vs WASM=0x00
- 偏移量 0x68: TS=0xe7 vs WASM=0x43
- 偏移量 0x69: TS=0x00 vs WASM=0xe7
- 偏移量 0x6c: TS=0xb7 vs WASM=0x00
- 偏移量 0x6d: TS=0x24 vs WASM=0xb7
- 偏移量 0x6e: TS=0x01 vs WASM=0x24
- 偏移量 0x6f: TS=0x00 vs WASM=0x01
- ... (显示前20个差异，总共54个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 04 54 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..T__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 73 |piler/fixtures/s|
00000020: 77 69 74 63 68 2d 63 61 73 65 2e 6a 73 02 61 0e |witch-case.js.a.|
00000030: 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 00 |console.log.....|
00000040: 00 00 00 0c 20 06 01 a4 01 00 00 00 04 01 00 47 |.... ..........G|
00000050: 00 ca 03 00 09 08 ec 43 b8 e3 68 00 00 11 b7 ad |.......C..h.....|
00000060: ec 12 39 e6 00 00 00 43 e7 00 00 00 b7 24 01 00 |..9....C.....$..|
00000070: 0e ee 26 11 b8 ad ec 12 39 e6 00 00 00 43 e7 00 |..&.....9....C..|
00000080: 00 00 b8 24 01 00 0e ee 10 39 e6 00 00 00 43 e7 |...$.....9....C.|
00000090: 00 00 00 b9 24 01 00 0e 0e 29 06 2f c8 03 16 00 |....$....)./....|
000000a0: 00 1c 10 2c 00 1b 0e 20 08 3c 15 1b 0e 20 08 23 |...,... .<... .#|
000000b0: 15 1b 0e 20 08 00                               |... ..|
```

### WASM
```
00000000: 05 04 54 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..T__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 73 |piler/fixtures/s|
00000020: 77 69 74 63 68 2d 63 61 73 65 2e 6a 73 02 61 0e |witch-case.js.a.|
00000030: 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 00 |console.log.....|
00000040: 00 00 00 0c 20 06 01 a4 01 00 00 00 04 01 00 47 |.... ..........G|
00000050: 00 ca 03 00 09 08 ec 02 29 b8 e3 68 00 00 11 b7 |........)..h....|
00000060: ad ec 12 39 e6 00 00 00 43 e7 00 00 00 b7 24 01 |...9....C.....$.|
00000070: 00 0e ee 26 11 b8 ad ec 12 39 e6 00 00 00 43 e7 |...&.....9....C.|
00000080: 00 00 00 b8 24 01 00 0e ee 10 39 e6 00 00 00 43 |....$.....9....C|
00000090: e7 00 00 00 b9 24 01 00 0e 0e 06 2f c8 03 16 00 |.....$...../....|
000000a0: 00 21 10 2c 00 1b 0e 20 08 3c 15 1b 0e 20 08 23 |.!.,... .<... .#|
000000b0: 15 1b 0e 20 08 00                               |... ..|
```