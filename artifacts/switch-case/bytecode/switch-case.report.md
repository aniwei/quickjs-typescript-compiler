# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/switch-case.ts
**生成时间**: 2025-12-16T14:11:02.588Z

## 大小对比

- TypeScript编译器: 195 字节
- WASM编译器: 182 字节
- 差异: 13 字节 (7.14%)

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
      "string": "a",
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
      "rawLength": 66,
      "actualLength": 33,
      "isWideChar": 0,
      "string": "__tests__/fixtures/switch-case.js",
      "offset": 16
    }
  ],
  "functionHeader": {
    "offset": 50,
    "tag": "0xc",
    "remaining": 145
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
      "string": "a",
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
      "rawLength": 66,
      "actualLength": 33,
      "isWideChar": 0,
      "string": "__tests__/fixtures/switch-case.js",
      "offset": 16
    }
  ],
  "functionHeader": {
    "offset": 50,
    "tag": "0xc",
    "remaining": 132
  }
}
```

## 字节级差异

共发现 75 个字节差异:

- 偏移量 0x3e: TS=0x5c vs WASM=0x57
- 偏移量 0x4a: TS=0x00 vs WASM=0x80
- 偏移量 0x50: TS=0x12 vs WASM=0x82
- 偏移量 0x62: TS=0x13 vs WASM=0x12
- 偏移量 0x71: TS=0x0e vs WASM=0xcb
- 偏移量 0x72: TS=0xef vs WASM=0xee
- 偏移量 0x73: TS=0x2b vs WASM=0x26
- 偏移量 0x74: TS=0x00 vs WASM=0x11
- 偏移量 0x75: TS=0x11 vs WASM=0xb8
- 偏移量 0x76: TS=0xb8 vs WASM=0xad
- 偏移量 0x77: TS=0xad vs WASM=0xec
- 偏移量 0x78: TS=0x6c vs WASM=0x12
- 偏移量 0x79: TS=0x16 vs WASM=0x39
- 偏移量 0x7a: TS=0x00 vs WASM=0xe5
- 偏移量 0x7d: TS=0x39 vs WASM=0x00
- 偏移量 0x7e: TS=0xe5 vs WASM=0x43
- 偏移量 0x7f: TS=0x00 vs WASM=0xe6
- 偏移量 0x82: TS=0x43 vs WASM=0x00
- 偏移量 0x83: TS=0xe6 vs WASM=0xb8
- 偏移量 0x84: TS=0x00 vs WASM=0x24
- ... (显示前20个差异，总共75个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 04 02 61 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 |...a.console.log|
00000010: 42 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 |B__tests__/fixtu|
00000020: 72 65 73 2f 73 77 69 74 63 68 2d 63 61 73 65 2e |res/switch-case.|
00000030: 6a 73 0c 00 06 00 a4 01 00 01 00 04 00 00 5c 01 |js............\.|
00000040: a6 01 00 00 00 40 e4 00 00 00 00 3f e4 00 00 00 |.....@.....?....|
00000050: 12 b8 3b e4 00 00 00 06 cb 39 e4 00 00 00 11 b7 |..;......9......|
00000060: ad ec 13 39 e5 00 00 00 43 e6 00 00 00 b7 24 01 |...9....C.....$.|
00000070: 00 0e ef 2b 00 11 b8 ad 6c 16 00 00 00 39 e5 00 |...+....l....9..|
00000080: 00 00 43 e6 00 00 00 b8 24 01 00 0e ef 11 00 39 |..C.....$......9|
00000090: e5 00 00 00 43 e6 00 00 00 b9 24 01 00 0e 0e c7 |....C.....$.....|
000000a0: 28 ce 03 1e 00 00 3e 10 07 07 26 08 21 02 17 01 |(.....>...&.!...|
000000b0: 34 18 07 17 2c 02 26 01 34 18 07 17 28 00 34 18 |4...,.&.4...(.4.|
000000c0: 07 17 00                                        |...|
```

### WASM
```
00000000: 05 04 02 61 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 |...a.console.log|
00000010: 42 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 |B__tests__/fixtu|
00000020: 72 65 73 2f 73 77 69 74 63 68 2d 63 61 73 65 2e |res/switch-case.|
00000030: 6a 73 0c 00 06 00 a4 01 00 01 00 04 00 00 57 01 |js............W.|
00000040: a6 01 00 00 00 40 e4 00 00 00 80 3f e4 00 00 00 |.....@.....?....|
00000050: 82 b8 3b e4 00 00 00 06 cb 39 e4 00 00 00 11 b7 |..;......9......|
00000060: ad ec 12 39 e5 00 00 00 43 e6 00 00 00 b7 24 01 |...9....C.....$.|
00000070: 00 cb ee 26 11 b8 ad ec 12 39 e5 00 00 00 43 e6 |...&.....9....C.|
00000080: 00 00 00 b8 24 01 00 cb ee 10 39 e5 00 00 00 43 |....$.....9....C|
00000090: e6 00 00 00 b9 24 01 00 cb 0e c7 28 ce 03 16 00 |.....$.....(....|
000000a0: 00 67 10 36 00 1b 0e 20 08 3c 15 1b 0e 20 08 23 |.g.6... .<... .#|
000000b0: 15 1b 0e 20 08 00                               |... ..|
```