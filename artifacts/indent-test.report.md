# 字节码分析报告

**输入文件**: tmp/indent-test.ts
**生成时间**: 2025-09-29T07:39:55.371Z

## 大小对比

- TypeScript编译器: 97 字节
- WASM编译器: 95 字节
- 差异: 2 字节 (2.11%)

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
      "rawLength": 36,
      "actualLength": 18,
      "isWideChar": 0,
      "string": "tmp/indent-test.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 21
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 29
    },
    {
      "index": 3,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "hi",
      "offset": 33
    }
  ],
  "functionHeader": {
    "offset": 36,
    "tag": "0xd",
    "remaining": 61
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
      "rawLength": 36,
      "actualLength": 18,
      "isWideChar": 0,
      "string": "tmp/indent-test.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 21
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 29
    },
    {
      "index": 3,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "hi",
      "offset": 33
    }
  ],
  "functionHeader": {
    "offset": 36,
    "tag": "0xd",
    "remaining": 59
  }
}
```

## 字节级差异

共发现 7 个字节差异:

- 偏移量 0x55: TS=0x0a vs WASM=0x08
- 偏移量 0x59: TS=0x04 vs WASM=0x08
- 偏移量 0x5c: TS=0x1b vs WASM=0x34
- 偏移量 0x5d: TS=0x0a vs WASM=0x08
- 偏移量 0x5e: TS=0x1b vs WASM=0x00
- 偏移量 0x5f: TS=0x01 vs WASM=EOF
- 偏移量 0x60: TS=0x00 vs WASM=EOF

## 十六进制转储对比

### TypeScript
```
00000000: 05 04 24 74 6d 70 2f 69 6e 64 65 6e 74 2d 74 65 |..$tmp/indent-te|
00000010: 73 74 2e 6a 73 0e 63 6f 6e 73 6f 6c 65 06 6c 6f |st.js.console.lo|
00000020: 67 04 68 69 0d c8 03 00 00 00 00 00 0c 20 06 01 |g.hi......... ..|
00000030: a4 01 00 00 00 03 00 00 19 00 08 ec 02 29 39 e5 |.............)9.|
00000040: 00 00 00 43 e6 00 00 00 04 e7 00 00 00 24 01 00 |...C.........$..|
00000050: 0e 06 2f c8 03 0a 00 00 17 04 1b 0e 1b 0a 1b 01 |../.............|
00000060: 00                                              |.|
```

### WASM
```
00000000: 05 04 24 74 6d 70 2f 69 6e 64 65 6e 74 2d 74 65 |..$tmp/indent-te|
00000010: 73 74 2e 6a 73 0e 63 6f 6e 73 6f 6c 65 06 6c 6f |st.js.console.lo|
00000020: 67 04 68 69 0d c8 03 00 00 00 00 00 0c 20 06 01 |g.hi......... ..|
00000030: a4 01 00 00 00 03 00 00 19 00 08 ec 02 29 39 e5 |.............)9.|
00000040: 00 00 00 43 e6 00 00 00 04 e7 00 00 00 24 01 00 |...C.........$..|
00000050: 0e 06 2f c8 03 08 00 00 17 08 1b 0e 34 08 00    |../.........4..|
```