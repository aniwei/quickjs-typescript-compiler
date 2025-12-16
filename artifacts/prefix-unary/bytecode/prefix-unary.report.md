# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/prefix-unary.ts
**生成时间**: 2025-12-16T14:11:02.581Z

## 大小对比

- TypeScript编译器: 182 字节
- WASM编译器: 194 字节
- 差异: -12 字节 (-6.19%)

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
      "rawLength": 68,
      "actualLength": 34,
      "isWideChar": 0,
      "string": "__tests__/fixtures/prefix-unary.js",
      "offset": 16
    }
  ],
  "functionHeader": {
    "offset": 51,
    "tag": "0xc",
    "remaining": 131
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
      "rawLength": 68,
      "actualLength": 34,
      "isWideChar": 0,
      "string": "__tests__/fixtures/prefix-unary.js",
      "offset": 16
    }
  ],
  "functionHeader": {
    "offset": 51,
    "tag": "0xc",
    "remaining": 143
  }
}
```

## 字节级差异

共发现 85 个字节差异:

- 偏移量 0x3c: TS=0x06 vs WASM=0x04
- 偏移量 0x3f: TS=0x54 vs WASM=0x5a
- 偏移量 0x4b: TS=0x00 vs WASM=0x80
- 偏移量 0x51: TS=0x12 vs WASM=0x82
- 偏移量 0x62: TS=0x7d vs WASM=0x39
- 偏移量 0x67: TS=0x3d vs WASM=0x91
- 偏移量 0x68: TS=0x91 vs WASM=0x11
- 偏移量 0x69: TS=0x16 vs WASM=0x3a
- 偏移量 0x6a: TS=0x3e vs WASM=0xe4
- 偏移量 0x6b: TS=0x24 vs WASM=0x00
- 偏移量 0x6c: TS=0x01 vs WASM=0x00
- 偏移量 0x6e: TS=0xcb vs WASM=0x24
- 偏移量 0x6f: TS=0x39 vs WASM=0x01
- 偏移量 0x70: TS=0xe5 vs WASM=0x00
- 偏移量 0x71: TS=0x00 vs WASM=0xcb
- 偏移量 0x72: TS=0x00 vs WASM=0x39
- 偏移量 0x73: TS=0x00 vs WASM=0xe5
- 偏移量 0x74: TS=0x43 vs WASM=0x00
- 偏移量 0x75: TS=0xe6 vs WASM=0x00
- 偏移量 0x77: TS=0x00 vs WASM=0x43
- ... (显示前20个差异，总共85个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 04 02 61 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 |...a.console.log|
00000010: 44 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 |D__tests__/fixtu|
00000020: 72 65 73 2f 70 72 65 66 69 78 2d 75 6e 61 72 79 |res/prefix-unary|
00000030: 2e 6a 73 0c 00 06 00 a4 01 00 01 00 06 00 00 54 |.js............T|
00000040: 01 a6 01 00 00 00 40 e4 00 00 00 00 3f e4 00 00 |......@.....?...|
00000050: 00 12 b8 3b e4 00 00 00 39 e5 00 00 00 43 e6 00 |...;....9....C..|
00000060: 00 00 7d e4 00 00 00 3d 91 16 3e 24 01 00 cb 39 |..}....=..>$...9|
00000070: e5 00 00 00 43 e6 00 00 00 7d e4 00 00 00 3d 90 |....C....}....=.|
00000080: 16 3e 24 01 00 cb 39 e5 00 00 00 43 e6 00 00 00 |.>$...9....C....|
00000090: 39 e4 00 00 00 24 01 00 cf 28 ce 03 18 00 00 3e |9....$...(.....>|
000000a0: 10 07 07 1c 07 52 18 11 17 17 00 52 18 11 17 17 |.....R.....R....|
000000b0: 00 34 18 1b 17 00                               |.4....|
```

### WASM
```
00000000: 05 04 02 61 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 |...a.console.log|
00000010: 44 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 |D__tests__/fixtu|
00000020: 72 65 73 2f 70 72 65 66 69 78 2d 75 6e 61 72 79 |res/prefix-unary|
00000030: 2e 6a 73 0c 00 06 00 a4 01 00 01 00 04 00 00 5a |.js............Z|
00000040: 01 a6 01 00 00 00 40 e4 00 00 00 80 3f e4 00 00 |......@.....?...|
00000050: 00 82 b8 3b e4 00 00 00 39 e5 00 00 00 43 e6 00 |...;....9....C..|
00000060: 00 00 39 e4 00 00 00 91 11 3a e4 00 00 00 24 01 |..9......:....$.|
00000070: 00 cb 39 e5 00 00 00 43 e6 00 00 00 39 e4 00 00 |..9....C....9...|
00000080: 00 90 11 3a e4 00 00 00 24 01 00 cb 39 e5 00 00 |...:....$...9...|
00000090: 00 43 e6 00 00 00 39 e4 00 00 00 24 01 00 cf 28 |.C....9....$...(|
000000a0: ce 03 1e 00 00 5d 00 1b 0e 1b 0e 1b 03 25 01 17 |.....].......%..|
000000b0: 15 1b 0e 1b 0e 1b 03 25 01 17 15 1b 0e 1b 0a 1b |.......%........|
000000c0: 01 00                                           |..|
```