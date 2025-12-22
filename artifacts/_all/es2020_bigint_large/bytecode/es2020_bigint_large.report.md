# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/es2020_bigint_large.ts
**生成时间**: 2025-12-22T03:08:38.410Z

## 大小对比

- TypeScript编译器: 181 字节
- WASM编译器: 195 字节
- 差异: -14 字节 (-7.18%)

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
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 4
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 6
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 14
    },
    {
      "index": 4,
      "rawLength": 82,
      "actualLength": 41,
      "isWideChar": 0,
      "string": "__tests__/fixtures/es2020_bigint_large.js",
      "offset": 18
    }
  ],
  "functionHeader": {
    "offset": 60,
    "tag": "0xc",
    "remaining": 121
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
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 4
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 6
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 14
    },
    {
      "index": 4,
      "rawLength": 82,
      "actualLength": 41,
      "isWideChar": 0,
      "string": "__tests__/fixtures/es2020_bigint_large.js",
      "offset": 18
    }
  ],
  "functionHeader": {
    "offset": 60,
    "tag": "0xc",
    "remaining": 135
  }
}
```

## 字节级差异

共发现 29 个字节差异:

- 偏移量 0x9f: TS=0x12 vs WASM=0x14
- 偏移量 0xa2: TS=0xc7 vs WASM=0xa8
- 偏移量 0xa3: TS=0x00 vs WASM=0x14
- 偏移量 0xa4: TS=0x1b vs WASM=0x21
- 偏移量 0xa5: TS=0x0e vs WASM=0x13
- 偏移量 0xa7: TS=0x0a vs WASM=0x0e
- 偏移量 0xa9: TS=0x01 vs WASM=0x0a
- 偏移量 0xaa: TS=0x17 vs WASM=0x1b
- 偏移量 0xab: TS=0x15 vs WASM=0x01
- 偏移量 0xac: TS=0x1b vs WASM=0x17
- 偏移量 0xad: TS=0x0e vs WASM=0x15
- 偏移量 0xaf: TS=0x0a vs WASM=0x0e
- 偏移量 0xb1: TS=0x01 vs WASM=0x0a
- 偏移量 0xb2: TS=0x00 vs WASM=0x1b
- 偏移量 0xb4: TS=0x01 vs WASM=0x00
- 偏移量 0xb5: TS=EOF vs WASM=0x0a
- 偏移量 0xb6: TS=EOF vs WASM=0x05
- 偏移量 0xb7: TS=EOF vs WASM=0x00
- 偏移量 0xb8: TS=EOF vs WASM=0x00
- 偏移量 0xb9: TS=EOF vs WASM=0x00
- ... (显示前20个差异，总共29个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 05 02 61 02 62 0e 63 6f 6e 73 6f 6c 65 06 6c |...a.b.console.l|
00000010: 6f 67 52 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |ogR__tests__/fix|
00000020: 74 75 72 65 73 2f 65 73 32 30 32 30 5f 62 69 67 |tures/es2020_big|
00000030: 69 6e 74 5f 6c 61 72 67 65 2e 6a 73 0c 00 06 00 |int_large.js....|
00000040: a4 01 00 01 00 03 00 02 4e 01 a6 01 00 00 00 40 |........N......@|
00000050: e4 00 00 00 80 40 e5 00 00 00 80 3f e4 00 00 00 |.....@.....?....|
00000060: 80 3f e5 00 00 00 80 c1 00 3b e4 00 00 00 c1 01 |.?.......;......|
00000070: 8e 3b e5 00 00 00 39 e6 00 00 00 43 e7 00 00 00 |.;....9....C....|
00000080: 39 e4 00 00 00 24 01 00 cb 39 e6 00 00 00 43 e7 |9....$...9....C.|
00000090: 00 00 00 39 e5 00 00 00 24 01 00 cf 28 d0 03 12 |...9....$...(...|
000000a0: 00 00 c7 00 1b 0e 1b 0a 1b 01 17 15 1b 0e 1b 0a |................|
000000b0: 1b 01 00 01 01                                  |.....|
```

### WASM
```
00000000: 05 05 02 61 02 62 0e 63 6f 6e 73 6f 6c 65 06 6c |...a.b.console.l|
00000010: 6f 67 52 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |ogR__tests__/fix|
00000020: 74 75 72 65 73 2f 65 73 32 30 32 30 5f 62 69 67 |tures/es2020_big|
00000030: 69 6e 74 5f 6c 61 72 67 65 2e 6a 73 0c 00 06 00 |int_large.js....|
00000040: a4 01 00 01 00 03 00 02 4e 01 a6 01 00 00 00 40 |........N......@|
00000050: e4 00 00 00 80 40 e5 00 00 00 80 3f e4 00 00 00 |.....@.....?....|
00000060: 80 3f e5 00 00 00 80 c1 00 3b e4 00 00 00 c1 01 |.?.......;......|
00000070: 8e 3b e5 00 00 00 39 e6 00 00 00 43 e7 00 00 00 |.;....9....C....|
00000080: 39 e4 00 00 00 24 01 00 cb 39 e6 00 00 00 43 e7 |9....$...9....C.|
00000090: 00 00 00 39 e5 00 00 00 24 01 00 cf 28 d0 03 14 |...9....$...(...|
000000a0: 00 00 a8 14 21 13 1b 0e 1b 0a 1b 01 17 15 1b 0e |....!...........|
000000b0: 1b 0a 1b 01 00 0a 05 00 00 00 80 00 0a 05 01 00 |................|
000000c0: 00 80 00                                        |...|
```