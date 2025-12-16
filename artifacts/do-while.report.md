# 字节码分析报告

**输入文件**: __tests__/fixtures/do-while.ts
**生成时间**: 2025-12-16T13:04:51.683Z

## 大小对比

- TypeScript编译器: 150 字节
- WASM编译器: 150 字节
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
      "rawLength": 60,
      "actualLength": 30,
      "isWideChar": 0,
      "string": "__tests__/fixtures/do-while.js",
      "offset": 16
    }
  ],
  "functionHeader": {
    "offset": 47,
    "tag": "0xc",
    "remaining": 103
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
      "rawLength": 60,
      "actualLength": 30,
      "isWideChar": 0,
      "string": "__tests__/fixtures/do-while.js",
      "offset": 16
    }
  ],
  "functionHeader": {
    "offset": 47,
    "tag": "0xc",
    "remaining": 103
  }
}
```

## 字节级差异

共发现 41 个字节差异:

- 偏移量 0x38: TS=0x04 vs WASM=0x03
- 偏移量 0x3b: TS=0x3c vs WASM=0x3e
- 偏移量 0x47: TS=0x00 vs WASM=0x80
- 偏移量 0x4d: TS=0x12 vs WASM=0x82
- 偏移量 0x68: TS=0x0e vs WASM=0xcb
- 偏移量 0x69: TS=0x7d vs WASM=0x39
- 偏移量 0x6e: TS=0x3d vs WASM=0x93
- 偏移量 0x6f: TS=0x93 vs WASM=0x3a
- 偏移量 0x70: TS=0x19 vs WASM=0xe4
- 偏移量 0x71: TS=0x3e vs WASM=0x00
- 偏移量 0x72: TS=0x0e vs WASM=0x00
- 偏移量 0x73: TS=0x39 vs WASM=0x00
- 偏移量 0x74: TS=0xe4 vs WASM=0xcb
- 偏移量 0x75: TS=0x00 vs WASM=0x39
- 偏移量 0x76: TS=0x00 vs WASM=0xe4
- 偏移量 0x78: TS=0xba vs WASM=0x00
- 偏移量 0x79: TS=0xa5 vs WASM=0x00
- 偏移量 0x7a: TS=0xed vs WASM=0xba
- 偏移量 0x7b: TS=0xdb vs WASM=0xa5
- 偏移量 0x7c: TS=0xc7 vs WASM=0xed
- ... (显示前20个差异，总共41个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 04 02 69 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 |...i.console.log|
00000010: 3c 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 |<__tests__/fixtu|
00000020: 72 65 73 2f 64 6f 2d 77 68 69 6c 65 2e 6a 73 0c |res/do-while.js.|
00000030: 00 06 00 a4 01 00 01 00 04 00 00 3c 01 a6 01 00 |...........<....|
00000040: 00 00 40 e4 00 00 00 00 3f e4 00 00 00 12 b7 3b |..@.....?......;|
00000050: e4 00 00 00 06 cb 39 e5 00 00 00 43 e6 00 00 00 |......9....C....|
00000060: 39 e4 00 00 00 24 01 00 0e 7d e4 00 00 00 3d 93 |9....$...}....=.|
00000070: 19 3e 0e 39 e4 00 00 00 ba a5 ed db c7 28 ce 03 |.>.9.........(..|
00000080: 14 00 00 3e 10 07 07 27 00 34 18 1b 17 17 00 35 |...>...'.4.....5|
00000090: 0a 1b 08 07 03 00                               |......|
```

### WASM
```
00000000: 05 04 02 69 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 |...i.console.log|
00000010: 3c 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 |<__tests__/fixtu|
00000020: 72 65 73 2f 64 6f 2d 77 68 69 6c 65 2e 6a 73 0c |res/do-while.js.|
00000030: 00 06 00 a4 01 00 01 00 03 00 00 3e 01 a6 01 00 |...........>....|
00000040: 00 00 40 e4 00 00 00 80 3f e4 00 00 00 82 b7 3b |..@.....?......;|
00000050: e4 00 00 00 06 cb 39 e5 00 00 00 43 e6 00 00 00 |......9....C....|
00000060: 39 e4 00 00 00 24 01 00 cb 39 e4 00 00 00 93 3a |9....$...9.....:|
00000070: e4 00 00 00 cb 39 e4 00 00 00 ba a5 ed d7 c7 28 |.....9.........(|
00000080: ce 03 12 00 00 68 08 1b 0e 1b 0a 1b 01 17 15 1b |.....h..........|
00000090: 02 26 08 20 04 00                               |.&. ..|
```