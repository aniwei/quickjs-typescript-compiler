# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/switch-fallthrough.ts
**生成时间**: 2025-12-09T14:28:02.808Z

## 大小对比

- TypeScript编译器: 177 字节
- WASM编译器: 189 字节
- 差异: -12 字节 (-6.35%)

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
      "rawLength": 98,
      "actualLength": 49,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/switch-fallthrough.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 52
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 54
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 62
    }
  ],
  "functionHeader": {
    "offset": 66,
    "tag": "0xd",
    "remaining": 111
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
      "rawLength": 98,
      "actualLength": 49,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/switch-fallthrough.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 52
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 54
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 62
    }
  ],
  "functionHeader": {
    "offset": 66,
    "tag": "0xd",
    "remaining": 123
  }
}
```

## 字节级差异

共发现 18 个字节差异:

- 偏移量 0xa5: TS=0x0a vs WASM=0x16
- 偏移量 0xac: TS=0x72 vs WASM=0x1b
- 偏移量 0xad: TS=0x00 vs WASM=0x0e
- 偏移量 0xae: TS=0x5a vs WASM=0x20
- 偏移量 0xaf: TS=0x00 vs WASM=0x08
- 偏移量 0xb0: TS=0x00 vs WASM=0x3b
- 偏移量 0xb1: TS=EOF vs WASM=0x15
- 偏移量 0xb2: TS=EOF vs WASM=0x1b
- 偏移量 0xb3: TS=EOF vs WASM=0x0e
- 偏移量 0xb4: TS=EOF vs WASM=0x20
- 偏移量 0xb5: TS=EOF vs WASM=0x08
- 偏移量 0xb6: TS=EOF vs WASM=0x23
- 偏移量 0xb7: TS=EOF vs WASM=0x15
- 偏移量 0xb8: TS=EOF vs WASM=0x1b
- 偏移量 0xb9: TS=EOF vs WASM=0x0e
- 偏移量 0xba: TS=EOF vs WASM=0x20
- 偏移量 0xbb: TS=EOF vs WASM=0x08
- 偏移量 0xbc: TS=EOF vs WASM=0x00

## 十六进制转储对比

### TypeScript
```
00000000: 05 04 62 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..b__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 73 |piler/fixtures/s|
00000020: 77 69 74 63 68 2d 66 61 6c 6c 74 68 72 6f 75 67 |witch-fallthroug|
00000030: 68 2e 6a 73 02 61 0e 63 6f 6e 73 6f 6c 65 06 6c |h.js.a.console.l|
00000040: 6f 67 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 |og......... ....|
00000050: 00 00 00 04 01 00 47 00 ca 03 00 09 08 ec 02 29 |......G........)|
00000060: b7 e3 68 00 00 11 b7 ad ec 12 39 e6 00 00 00 43 |..h.......9....C|
00000070: e7 00 00 00 b7 24 01 00 0e ee 06 11 b8 ad ec 12 |.....$..........|
00000080: 39 e6 00 00 00 43 e7 00 00 00 b8 24 01 00 0e ee |9....C.....$....|
00000090: 10 39 e6 00 00 00 43 e7 00 00 00 b9 24 01 00 0e |.9....C.....$...|
000000a0: 0e 06 2f c8 03 0a 00 00 21 10 2c 00 72 00 5a 00 |../.....!.,.r.Z.|
000000b0: 00                                              |.|
```

### WASM
```
00000000: 05 04 62 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..b__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 73 |piler/fixtures/s|
00000020: 77 69 74 63 68 2d 66 61 6c 6c 74 68 72 6f 75 67 |witch-fallthroug|
00000030: 68 2e 6a 73 02 61 0e 63 6f 6e 73 6f 6c 65 06 6c |h.js.a.console.l|
00000040: 6f 67 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 |og......... ....|
00000050: 00 00 00 04 01 00 47 00 ca 03 00 09 08 ec 02 29 |......G........)|
00000060: b7 e3 68 00 00 11 b7 ad ec 12 39 e6 00 00 00 43 |..h.......9....C|
00000070: e7 00 00 00 b7 24 01 00 0e ee 06 11 b8 ad ec 12 |.....$..........|
00000080: 39 e6 00 00 00 43 e7 00 00 00 b8 24 01 00 0e ee |9....C.....$....|
00000090: 10 39 e6 00 00 00 43 e7 00 00 00 b9 24 01 00 0e |.9....C.....$...|
000000a0: 0e 06 2f c8 03 16 00 00 21 10 2c 00 1b 0e 20 08 |../.....!.,... .|
000000b0: 3b 15 1b 0e 20 08 23 15 1b 0e 20 08 00          |;... .#... ..|
```