# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/compiler/fixtures/debug-info-basic.ts
**生成时间**: 2025-12-11T11:32:28.031Z

## 大小对比

- TypeScript编译器: 157 字节
- WASM编译器: 157 字节
- 差异: 0 字节 (0.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 3,
  "atoms": [
    {
      "index": 0,
      "rawLength": 94,
      "actualLength": 47,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/debug-info-basic.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 50
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 58
    }
  ],
  "functionHeader": {
    "offset": 62,
    "tag": "0xd",
    "remaining": 95
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 3,
  "atoms": [
    {
      "index": 0,
      "rawLength": 94,
      "actualLength": 47,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/debug-info-basic.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 50
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 58
    }
  ],
  "functionHeader": {
    "offset": 62,
    "tag": "0xd",
    "remaining": 95
  }
}
```

## 字节级差异

共发现 7 个字节差异:

- 偏移量 0x55: TS=0xff vs WASM=0xec
- 偏移量 0x62: TS=0xcb vs WASM=0xb8
- 偏移量 0x71: TS=0xcc vs WASM=0xb9
- 偏移量 0x80: TS=0xcd vs WASM=0xba
- 偏移量 0x8c: TS=0x39 vs WASM=0x2f
- 偏移量 0x92: TS=0x25 vs WASM=0x1b
- 偏移量 0x98: TS=0x25 vs WASM=0x1b

## 十六进制转储对比

### TypeScript
```
00000000: 05 03 5e 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..^__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 64 |piler/fixtures/d|
00000020: 65 62 75 67 2d 69 6e 66 6f 2d 62 61 73 69 63 2e |ebug-info-basic.|
00000030: 6a 73 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 |js.console.log..|
00000040: 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 03 |....... ........|
00000050: 00 00 33 00 08 ff 02 29 39 e5 00 00 00 43 e6 00 |..3....)9....C..|
00000060: 00 00 cb 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 |...$...9....C...|
00000070: 00 cc 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 00 |..$...9....C....|
00000080: cd 24 01 00 0e 06 2f c8 03 12 00 00 39 0e 20 08 |.$..../.....9. .|
00000090: 17 15 25 0e 20 08 17 15 25 0e 20 08 00          |..%. ...%. ..|
```

### WASM
```
00000000: 05 03 5e 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..^__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 64 |piler/fixtures/d|
00000020: 65 62 75 67 2d 69 6e 66 6f 2d 62 61 73 69 63 2e |ebug-info-basic.|
00000030: 6a 73 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 |js.console.log..|
00000040: 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 03 |....... ........|
00000050: 00 00 33 00 08 ec 02 29 39 e5 00 00 00 43 e6 00 |..3....)9....C..|
00000060: 00 00 b8 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 |...$...9....C...|
00000070: 00 b9 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 00 |..$...9....C....|
00000080: ba 24 01 00 0e 06 2f c8 03 12 00 00 2f 0e 20 08 |.$..../...../. .|
00000090: 17 15 1b 0e 20 08 17 15 1b 0e 20 08 00          |.... ..... ..|
```