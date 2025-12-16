# 字节码分析报告

**输入文件**: __tests__/fixtures/while.ts
**生成时间**: 2025-12-16T13:04:52.204Z

## 大小对比

- TypeScript编译器: 149 字节
- WASM编译器: 149 字节
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
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 4
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 12
    },
    {
      "index": 3,
      "rawLength": 54,
      "actualLength": 27,
      "isWideChar": 0,
      "string": "__tests__/fixtures/while.js",
      "offset": 16
    }
  ],
  "functionHeader": {
    "offset": 44,
    "tag": "0xc",
    "remaining": 105
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
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 4
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 12
    },
    {
      "index": 3,
      "rawLength": 54,
      "actualLength": 27,
      "isWideChar": 0,
      "string": "__tests__/fixtures/while.js",
      "offset": 16
    }
  ],
  "functionHeader": {
    "offset": 44,
    "tag": "0xc",
    "remaining": 105
  }
}
```

## 字节级差异

共发现 39 个字节差异:

- 偏移量 0x35: TS=0x04 vs WASM=0x03
- 偏移量 0x38: TS=0x3e vs WASM=0x40
- 偏移量 0x44: TS=0x00 vs WASM=0x80
- 偏移量 0x4a: TS=0x12 vs WASM=0x82
- 偏移量 0x5b: TS=0x20 vs WASM=0x22
- 偏移量 0x6e: TS=0x0e vs WASM=0xcb
- 偏移量 0x6f: TS=0x7d vs WASM=0x39
- 偏移量 0x74: TS=0x3d vs WASM=0x93
- 偏移量 0x75: TS=0x93 vs WASM=0x3a
- 偏移量 0x76: TS=0x19 vs WASM=0xe4
- 偏移量 0x77: TS=0x3e vs WASM=0x00
- 偏移量 0x78: TS=0x0e vs WASM=0x00
- 偏移量 0x79: TS=0xee vs WASM=0x00
- 偏移量 0x7a: TS=0xd9 vs WASM=0xcb
- 偏移量 0x7b: TS=0xc7 vs WASM=0xee
- 偏移量 0x7c: TS=0x28 vs WASM=0xd7
- 偏移量 0x7d: TS=0xce vs WASM=0xc7
- 偏移量 0x7e: TS=0x03 vs WASM=0x28
- 偏移量 0x7f: TS=0x14 vs WASM=0xce
- 偏移量 0x80: TS=0x00 vs WASM=0x03
- ... (显示前20个差异，总共39个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 04 02 69 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 |...i.console.log|
00000010: 36 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 |6__tests__/fixtu|
00000020: 72 65 73 2f 77 68 69 6c 65 2e 6a 73 0c 00 06 00 |res/while.js....|
00000030: a4 01 00 01 00 04 00 00 3e 01 a6 01 00 00 00 40 |........>......@|
00000040: e4 00 00 00 00 3f e4 00 00 00 12 b7 3b e4 00 00 |.....?......;...|
00000050: 00 06 cb 39 e4 00 00 00 ba a5 ec 20 39 e5 00 00 |...9....... 9...|
00000060: 00 43 e6 00 00 00 39 e4 00 00 00 24 01 00 0e 7d |.C....9....$...}|
00000070: e4 00 00 00 3d 93 19 3e 0e ee d9 c7 28 ce 03 14 |....=..>....(...|
00000080: 00 00 3e 10 07 07 26 06 1b 08 07 03 12 09 34 18 |..>...&.......4.|
00000090: 1b 17 17 00 00                                  |.....|
```

### WASM
```
00000000: 05 04 02 69 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 |...i.console.log|
00000010: 36 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 |6__tests__/fixtu|
00000020: 72 65 73 2f 77 68 69 6c 65 2e 6a 73 0c 00 06 00 |res/while.js....|
00000030: a4 01 00 01 00 03 00 00 40 01 a6 01 00 00 00 40 |........@......@|
00000040: e4 00 00 00 80 3f e4 00 00 00 82 b7 3b e4 00 00 |.....?......;...|
00000050: 00 06 cb 39 e4 00 00 00 ba a5 ec 22 39 e5 00 00 |...9......."9...|
00000060: 00 43 e6 00 00 00 39 e4 00 00 00 24 01 00 cb 39 |.C....9....$...9|
00000070: e4 00 00 00 93 3a e4 00 00 00 cb ee d7 c7 28 ce |.....:........(.|
00000080: 03 12 00 00 67 0e 20 04 12 09 1b 0e 1b 0a 1b 01 |....g. .........|
00000090: 17 15 1b 02 00                                  |.....|
```