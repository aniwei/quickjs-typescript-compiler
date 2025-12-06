# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/for-of.ts
**生成时间**: 2025-12-06T02:09:56.372Z

## 大小对比

- TypeScript编译器: 149 字节
- WASM编译器: 151 字节
- 差异: -2 字节 (-1.32%)

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
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "arr",
      "offset": 40
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "v",
      "offset": 44
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
    "remaining": 91
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
      "string": "v",
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

共发现 74 个字节差异:

- 偏移量 0x28: TS=0x06 vs WASM=0x02
- 偏移量 0x29: TS=0x61 vs WASM=0x76
- 偏移量 0x2a: TS=0x72 vs WASM=0x06
- 偏移量 0x2b: TS=0x72 vs WASM=0x61
- 偏移量 0x2c: TS=0x02 vs WASM=0x72
- 偏移量 0x2d: TS=0x76 vs WASM=0x72
- 偏移量 0x49: TS=0x00 vs WASM=0x01
- 偏移量 0x4b: TS=0x03 vs WASM=0x06
- 偏移量 0x4e: TS=0x32 vs WASM=0x2e
- 偏移量 0x4f: TS=0x00 vs WASM=0x01
- 偏移量 0x52: TS=0x00 vs WASM=0x02
- 偏移量 0x53: TS=0x0d vs WASM=0x00
- 偏移量 0x54: TS=0x08 vs WASM=0x30
- 偏移量 0x55: TS=0xec vs WASM=0xcc
- 偏移量 0x56: TS=0x02 vs WASM=0x03
- 偏移量 0x57: TS=0x29 vs WASM=0x00
- 偏移量 0x58: TS=0xb8 vs WASM=0x0d
- 偏移量 0x59: TS=0xb9 vs WASM=0x08
- 偏移量 0x5a: TS=0xba vs WASM=0xec
- 偏移量 0x5b: TS=0x26 vs WASM=0x02
- ... (显示前20个差异，总共74个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 05 4a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..J__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 66 |piler/fixtures/f|
00000020: 6f 72 2d 6f 66 2e 6a 73 06 61 72 72 02 76 0e 63 |or-of.js.arr.v.c|
00000030: 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 00 00 |onsole.log......|
00000040: 00 00 0c 20 06 01 a4 01 00 00 00 03 01 00 32 00 |... ..........2.|
00000050: ca 03 00 0d 08 ec 02 29 b8 b9 ba 26 03 00 e3 68 |.......)...&...h|
00000060: 00 00 63 01 00 7f 6e 14 00 00 00 cc 39 e7 00 00 |..c...n.....9...|
00000070: 00 43 e8 00 00 00 c8 24 01 00 0e 82 00 6c ed ff |.C.....$.....l..|
00000080: ff ff 0e 86 06 2f c8 03 00 0a 16 0d 07 03 07 03 |...../..........|
00000090: 1c 7d 44 72 00                                  |.}Dr.|
```

### WASM
```
00000000: 05 05 4a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..J__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 66 |piler/fixtures/f|
00000020: 6f 72 2d 6f 66 2e 6a 73 02 76 06 61 72 72 0e 63 |or-of.js.v.arr.c|
00000030: 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 00 00 |onsole.log......|
00000040: 00 00 0c 20 06 01 a4 01 00 01 00 06 01 00 2e 01 |... ............|
00000050: ca 03 02 00 30 cc 03 00 0d 08 ec 02 29 b8 b9 ba |....0.......)...|
00000060: 26 03 00 e3 63 00 00 68 00 00 7f ee 13 cb 39 e7 |&...c..h......9.|
00000070: 00 00 00 43 e8 00 00 00 64 00 00 24 01 00 0e 82 |...C....d..$....|
00000080: 00 ec eb 0e 86 06 2f c8 03 0c 00 00 49 20 26 17 |....../.....I &.|
00000090: 1b 0e 1b 0a 11 01 00                            |.......|
```