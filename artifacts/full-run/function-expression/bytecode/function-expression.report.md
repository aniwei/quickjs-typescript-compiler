# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/function-expression.ts
**生成时间**: 2025-12-04T06:33:08.114Z

## 大小对比

- TypeScript编译器: 204 字节
- WASM编译器: 191 字节
- 差异: 13 字节 (6.81%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 6,
  "atoms": [
    {
      "index": 0,
      "rawLength": 100,
      "actualLength": 50,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/function-expression.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "fe_add",
      "offset": 53
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 60
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 62
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 64
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 72
    }
  ],
  "functionHeader": {
    "offset": 76,
    "tag": "0xd",
    "remaining": 128
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 6,
  "atoms": [
    {
      "index": 0,
      "rawLength": 100,
      "actualLength": 50,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/function-expression.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "fe_add",
      "offset": 53
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 60
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 68
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 72
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 74
    }
  ],
  "functionHeader": {
    "offset": 76,
    "tag": "0xd",
    "remaining": 115
  }
}
```

## 字节级差异

共发现 107 个字节差异:

- 偏移量 0x3c: TS=0x02 vs WASM=0x0e
- 偏移量 0x3d: TS=0x61 vs WASM=0x63
- 偏移量 0x3e: TS=0x02 vs WASM=0x6f
- 偏移量 0x3f: TS=0x62 vs WASM=0x6e
- 偏移量 0x40: TS=0x0e vs WASM=0x73
- 偏移量 0x41: TS=0x63 vs WASM=0x6f
- 偏移量 0x42: TS=0x6f vs WASM=0x6c
- 偏移量 0x43: TS=0x6e vs WASM=0x65
- 偏移量 0x44: TS=0x73 vs WASM=0x06
- 偏移量 0x45: TS=0x6f vs WASM=0x6c
- 偏移量 0x46: TS=0x6c vs WASM=0x6f
- 偏移量 0x47: TS=0x65 vs WASM=0x67
- 偏移量 0x48: TS=0x06 vs WASM=0x02
- 偏移量 0x49: TS=0x6c vs WASM=0x61
- 偏移量 0x4a: TS=0x6f vs WASM=0x02
- 偏移量 0x4b: TS=0x67 vs WASM=0x62
- 偏移量 0x5b: TS=0x01 vs WASM=0x00
- 偏移量 0x60: TS=0x1d vs WASM=0x20
- 偏移量 0x61: TS=0x01 vs WASM=0x00
- 偏移量 0x64: TS=0x01 vs WASM=0x00
- ... (显示前20个差异，总共107个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 06 64 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..d__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 66 |piler/fixtures/f|
00000020: 75 6e 63 74 69 6f 6e 2d 65 78 70 72 65 73 73 69 |unction-expressi|
00000030: 6f 6e 2e 6a 73 0c 66 65 5f 61 64 64 02 61 02 62 |on.js.fe_add.a.b|
00000040: 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 |.console.log....|
00000050: 00 00 00 00 0c 20 06 01 a4 01 00 01 00 05 01 01 |..... ..........|
00000060: 1d 01 ca 03 01 00 20 ca 03 00 01 08 ec 02 29 c2 |...... .......).|
00000070: 00 e3 39 e8 00 00 00 43 e9 00 00 00 5a 00 00 b8 |..9....C....Z...|
00000080: b9 f2 24 01 00 0e 06 2f c8 03 0c 00 00 28 00 1b |..$..../.....(..|
00000090: 0e 1b 0a 1b 0c 07 0d 00 0c 43 06 01 ca 03 02 01 |.........C......|
000000a0: 02 02 00 00 09 03 cc 03 00 01 00 ce 03 00 01 00 |................|
000000b0: e6 01 00 00 00 0c 03 5b 00 00 d3 d4 9f 28 c8 03 |.......[.....(..|
000000c0: 0a 00 0d 03 07 07 08 07 03 07 11 00             |............|
```

### WASM
```
00000000: 05 06 64 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..d__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 66 |piler/fixtures/f|
00000020: 75 6e 63 74 69 6f 6e 2d 65 78 70 72 65 73 73 69 |unction-expressi|
00000030: 6f 6e 2e 6a 73 0c 66 65 5f 61 64 64 0e 63 6f 6e |on.js.fe_add.con|
00000040: 73 6f 6c 65 06 6c 6f 67 02 61 02 62 0d c8 03 00 |sole.log.a.b....|
00000050: 00 00 00 00 0c 20 06 01 a4 01 00 00 00 05 01 01 |..... ..........|
00000060: 20 00 ca 03 00 01 08 ec 02 29 c2 00 4f e5 00 00 | ........)..O...|
00000070: 00 e3 39 e6 00 00 00 43 e7 00 00 00 df b8 b9 f2 |..9....C........|
00000080: 24 01 00 0e 06 2f c8 03 0c 00 00 41 00 1b 0e 1b |$..../.....A....|
00000090: 0a 11 0c 07 0d 00 0c 43 06 01 00 02 00 02 02 00 |.......C........|
000000a0: 00 04 02 d0 03 00 01 00 d2 03 00 01 00 d3 d4 9f |................|
000000b0: 28 c8 03 0a 00 0d 03 07 07 08 07 03 07 11 00    |(..............|
```