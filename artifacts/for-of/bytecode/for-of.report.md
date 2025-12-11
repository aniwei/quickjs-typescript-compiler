# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/compiler/fixtures/for-of.ts
**生成时间**: 2025-12-11T11:32:28.069Z

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

共发现 22 个字节差异:

- 偏移量 0x5a: TS=0xff vs WASM=0xec
- 偏移量 0x5d: TS=0xcb vs WASM=0xb8
- 偏移量 0x5e: TS=0xcc vs WASM=0xb9
- 偏移量 0x5f: TS=0xcd vs WASM=0xba
- 偏移量 0x63: TS=0xf6 vs WASM=0xe3
- 偏移量 0x67: TS=0x64 vs WASM=0x68
- 偏移量 0x6b: TS=0x6e vs WASM=0xee
- 偏移量 0x6c: TS=0x1c vs WASM=0x13
- 偏移量 0x6d: TS=0x00 vs WASM=0xcb
- 偏移量 0x6e: TS=0x00 vs WASM=0x39
- 偏移量 0x6f: TS=0x01 vs WASM=0xe7
- 偏移量 0x70: TS=0x0f vs WASM=0x00
- 偏移量 0x79: TS=0x01 vs WASM=0x00
- 偏移量 0x81: TS=0x6c vs WASM=0xec
- 偏移量 0x82: TS=0xe5 vs WASM=0xeb
- 偏移量 0x83: TS=0xff vs WASM=0x0e
- 偏移量 0x84: TS=0xff vs WASM=0x86
- 偏移量 0x85: TS=0xff vs WASM=0x06
- 偏移量 0x86: TS=0x0e vs WASM=0x2f
- 偏移量 0x8e: TS=0x3a vs WASM=0x26
- ... (显示前20个差异，总共22个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 05 4a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..J__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 66 |piler/fixtures/f|
00000020: 6f 72 2d 6f 66 2e 6a 73 02 78 06 61 72 72 0e 63 |or-of.js.x.arr.c|
00000030: 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 00 00 |onsole.log......|
00000040: 00 00 0c 20 06 01 a4 01 00 01 00 06 01 00 2e 01 |... ............|
00000050: ca 03 02 00 30 cc 03 00 0d 08 ff 02 29 cb cc cd |....0.......)...|
00000060: 26 03 00 f6 63 00 00 64 00 00 7f 6e 1c 00 00 01 |&...c..d...n....|
00000070: 0f 00 00 43 e8 00 00 00 64 01 00 24 01 00 0e 82 |...C....d..$....|
00000080: 00 6c e5 ff ff ff 0e c8 03 0c 00 00 49 20 3a 17 |.l..........I :.|
00000090: 25 0e 1b 0a 25 01 00                            |%...%..|
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