# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/compiler/fixtures/script.ts
**生成时间**: 2025-11-22T14:52:37.886Z

## 大小对比

- TypeScript编译器: 118 字节
- WASM编译器: 116 字节
- 差异: 2 字节 (1.72%)

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
      "rawLength": 74,
      "actualLength": 37,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/script.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 40
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 48
    },
    {
      "index": 3,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "script",
      "offset": 52
    }
  ],
  "functionHeader": {
    "offset": 59,
    "tag": "0xd",
    "remaining": 59
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
      "rawLength": 74,
      "actualLength": 37,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/script.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 40
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 48
    },
    {
      "index": 3,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "script",
      "offset": 52
    }
  ],
  "functionHeader": {
    "offset": 59,
    "tag": "0xd",
    "remaining": 57
  }
}
```

## 字节级差异

共发现 6 个字节差异:

- 偏移量 0x6c: TS=0x08 vs WASM=0x06
- 偏移量 0x71: TS=0x1b vs WASM=0x34
- 偏移量 0x72: TS=0x0a vs WASM=0x08
- 偏移量 0x73: TS=0x1b vs WASM=0x00
- 偏移量 0x74: TS=0x01 vs WASM=EOF
- 偏移量 0x75: TS=0x00 vs WASM=EOF

## 十六进制转储对比

### TypeScript
```
00000000: 05 04 4a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..J__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 73 |piler/fixtures/s|
00000020: 63 72 69 70 74 2e 6a 73 0e 63 6f 6e 73 6f 6c 65 |cript.js.console|
00000030: 06 6c 6f 67 0c 73 63 72 69 70 74 0d c8 03 00 00 |.log.script.....|
00000040: 00 00 00 0c 20 06 01 a4 01 00 00 00 03 00 00 19 |.... ...........|
00000050: 00 08 ec 02 29 39 e5 00 00 00 43 e6 00 00 00 04 |....)9....C.....|
00000060: e7 00 00 00 24 01 00 0e 06 2f c8 03 08 00 00 2f |....$..../...../|
00000070: 0e 1b 0a 1b 01 00                               |......|
```

### WASM
```
00000000: 05 04 4a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..J__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 73 |piler/fixtures/s|
00000020: 63 72 69 70 74 2e 6a 73 0e 63 6f 6e 73 6f 6c 65 |cript.js.console|
00000030: 06 6c 6f 67 0c 73 63 72 69 70 74 0d c8 03 00 00 |.log.script.....|
00000040: 00 00 00 0c 20 06 01 a4 01 00 00 00 03 00 00 19 |.... ...........|
00000050: 00 08 ec 02 29 39 e5 00 00 00 43 e6 00 00 00 04 |....)9....C.....|
00000060: e7 00 00 00 24 01 00 0e 06 2f c8 03 06 00 00 2f |....$..../...../|
00000070: 0e 34 08 00                                     |.4..|
```