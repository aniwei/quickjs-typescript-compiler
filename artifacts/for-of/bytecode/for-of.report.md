# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/for-of.ts
**生成时间**: 2025-12-09T08:59:51.495Z

## 大小对比

- TypeScript编译器: 151 字节
- WASM编译器: 151 字节
- 差异: 0 字节 (0.00%)

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
      "rawLength": 74,
      "actualLength": 37,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/for-of.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 40
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "arr",
      "offset": 42
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 46
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 54
    }
  ],
  "functionHeader": {
    "offset": 58,
    "tag": "0xd",
    "remaining": 93
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
      "rawLength": 74,
      "actualLength": 37,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/for-of.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 40
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "arr",
      "offset": 42
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 46
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 54
    }
  ],
  "functionHeader": {
    "offset": 58,
    "tag": "0xd",
    "remaining": 93
  }
}
```

## 字节级差异

共发现 36 个字节差异:

- 偏移量 0x5b: TS=0x2a vs WASM=0x02
- 偏移量 0x5c: TS=0xb8 vs WASM=0x29
- 偏移量 0x5d: TS=0xb9 vs WASM=0xb8
- 偏移量 0x5e: TS=0xba vs WASM=0xb9
- 偏移量 0x5f: TS=0x26 vs WASM=0xba
- 偏移量 0x60: TS=0x03 vs WASM=0x26
- 偏移量 0x61: TS=0x00 vs WASM=0x03
- 偏移量 0x62: TS=0xe3 vs WASM=0x00
- 偏移量 0x63: TS=0x63 vs WASM=0xe3
- 偏移量 0x64: TS=0x00 vs WASM=0x63
- 偏移量 0x66: TS=0x68 vs WASM=0x00
- 偏移量 0x67: TS=0x00 vs WASM=0x68
- 偏移量 0x69: TS=0x7f vs WASM=0x00
- 偏移量 0x6a: TS=0xee vs WASM=0x7f
- 偏移量 0x6b: TS=0x13 vs WASM=0xee
- 偏移量 0x6c: TS=0xcb vs WASM=0x13
- 偏移量 0x6d: TS=0x39 vs WASM=0xcb
- 偏移量 0x6e: TS=0xe7 vs WASM=0x39
- 偏移量 0x6f: TS=0x00 vs WASM=0xe7
- 偏移量 0x72: TS=0x43 vs WASM=0x00
- ... (显示前20个差异，总共36个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 05 4a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..J__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 66 |piler/fixtures/f|
00000020: 6f 72 2d 6f 66 2e 6a 73 02 78 06 61 72 72 0e 63 |or-of.js.x.arr.c|
00000030: 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 00 00 |onsole.log......|
00000040: 00 00 0c 20 06 01 a4 01 00 01 00 06 01 00 2e 01 |... ............|
00000050: ca 03 02 00 30 cc 03 00 0d 08 ec 2a b8 b9 ba 26 |....0......*...&|
00000060: 03 00 e3 63 00 00 68 00 00 7f ee 13 cb 39 e7 00 |...c..h......9..|
00000070: 00 00 43 e8 00 00 00 64 00 00 24 01 00 0e 82 00 |..C....d..$.....|
00000080: ec eb 0e 86 29 06 2f c8 03 0c 00 00 44 20 26 17 |....)./.....D &.|
00000090: 1b 0e 1b 0a 11 01 00                            |.......|
```

### WASM
```
00000000: 05 05 4a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..J__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 66 |piler/fixtures/f|
00000020: 6f 72 2d 6f 66 2e 6a 73 02 78 06 61 72 72 0e 63 |or-of.js.x.arr.c|
00000030: 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 00 00 |onsole.log......|
00000040: 00 00 0c 20 06 01 a4 01 00 01 00 06 01 00 2e 01 |... ............|
00000050: ca 03 02 00 30 cc 03 00 0d 08 ec 02 29 b8 b9 ba |....0.......)...|
00000060: 26 03 00 e3 63 00 00 68 00 00 7f ee 13 cb 39 e7 |&...c..h......9.|
00000070: 00 00 00 43 e8 00 00 00 64 00 00 24 01 00 0e 82 |...C....d..$....|
00000080: 00 ec eb 0e 86 06 2f c8 03 0c 00 00 49 20 26 17 |....../.....I &.|
00000090: 1b 0e 1b 0a 11 01 00                            |.......|
```