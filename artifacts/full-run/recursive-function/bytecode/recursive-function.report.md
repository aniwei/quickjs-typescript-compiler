# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/recursive-function.ts
**生成时间**: 2025-12-04T06:33:08.967Z

## 大小对比

- TypeScript编译器: 229 字节
- WASM编译器: 210 字节
- 差异: 19 字节 (9.05%)

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
      "rawLength": 98,
      "actualLength": 49,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/recursive-function.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "factorial",
      "offset": 52
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "n",
      "offset": 62
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 64
    },
    {
      "index": 4,
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
    "remaining": 153
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
      "rawLength": 98,
      "actualLength": 49,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/recursive-function.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "factorial",
      "offset": 52
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 62
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 70
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "n",
      "offset": 74
    }
  ],
  "functionHeader": {
    "offset": 76,
    "tag": "0xd",
    "remaining": 134
  }
}
```

## 字节级差异

共发现 136 个字节差异:

- 偏移量 0x3e: TS=0x02 vs WASM=0x0e
- 偏移量 0x3f: TS=0x6e vs WASM=0x63
- 偏移量 0x40: TS=0x0e vs WASM=0x6f
- 偏移量 0x41: TS=0x63 vs WASM=0x6e
- 偏移量 0x42: TS=0x6f vs WASM=0x73
- 偏移量 0x43: TS=0x6e vs WASM=0x6f
- 偏移量 0x44: TS=0x73 vs WASM=0x6c
- 偏移量 0x45: TS=0x6f vs WASM=0x65
- 偏移量 0x46: TS=0x6c vs WASM=0x06
- 偏移量 0x47: TS=0x65 vs WASM=0x6c
- 偏移量 0x48: TS=0x06 vs WASM=0x6f
- 偏移量 0x49: TS=0x6c vs WASM=0x67
- 偏移量 0x4a: TS=0x6f vs WASM=0x02
- 偏移量 0x4b: TS=0x67 vs WASM=0x6e
- 偏移量 0x5b: TS=0x01 vs WASM=0x00
- 偏移量 0x60: TS=0x1c vs WASM=0x1a
- 偏移量 0x61: TS=0x01 vs WASM=0x00
- 偏移量 0x64: TS=0x01 vs WASM=0x00
- 偏移量 0x65: TS=0x00 vs WASM=0x01
- 偏移量 0x66: TS=0x60 vs WASM=0x08
- ... (显示前20个差异，总共136个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 05 62 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..b__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 72 |piler/fixtures/r|
00000020: 65 63 75 72 73 69 76 65 2d 66 75 6e 63 74 69 6f |ecursive-functio|
00000030: 6e 2e 6a 73 12 66 61 63 74 6f 72 69 61 6c 02 6e |n.js.factorial.n|
00000040: 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 |.console.log....|
00000050: 00 00 00 00 0c 20 06 01 a4 01 00 01 00 04 01 01 |..... ..........|
00000060: 1c 01 ca 03 01 00 60 ca 03 00 01 08 ec 05 c2 00 |......`.........|
00000070: e3 29 39 e7 00 00 00 43 e8 00 00 00 5a 00 00 bc |.)9....C....Z...|
00000080: f1 24 01 00 0e 06 2f c8 03 0e 00 00 00 07 08 00 |.$..../.........|
00000090: 1b 0e 1b 0a 16 12 07 13 00 0c 43 06 01 ca 03 01 |..........C.....|
000000a0: 01 01 04 01 00 16 02 cc 03 00 01 00 e6 01 00 00 |................|
000000b0: 00 ca 03 00 09 0c 03 5b 00 00 d3 b8 a6 ec 03 b8 |.......[........|
000000c0: 28 d3 68 00 00 d3 b8 a0 f1 9c 28 c8 03 16 00 00 |(.h.......(.....|
000000d0: 03 0c 0c 04 16 0c 08 09 07 08 11 14 0c 04 07 05 |................|
000000e0: 07 15 07 11 00                                  |.....|
```

### WASM
```
00000000: 05 05 62 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..b__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 72 |piler/fixtures/r|
00000020: 65 63 75 72 73 69 76 65 2d 66 75 6e 63 74 69 6f |ecursive-functio|
00000030: 6e 2e 6a 73 12 66 61 63 74 6f 72 69 61 6c 0e 63 |n.js.factorial.c|
00000040: 6f 6e 73 6f 6c 65 06 6c 6f 67 02 6e 0d c8 03 00 |onsole.log.n....|
00000050: 00 00 00 00 0c 20 06 01 a4 01 00 00 00 04 01 01 |..... ..........|
00000060: 1a 00 ca 03 00 01 08 ec 05 c2 00 e3 29 39 e6 00 |............)9..|
00000070: 00 00 43 e7 00 00 00 df bc f1 24 01 00 0e 06 2f |..C.......$..../|
00000080: c8 03 0e 00 00 00 07 08 00 1b 0e 1b 0a 0c 12 07 |................|
00000090: 13 00 0c 43 06 01 ca 03 01 00 01 04 01 00 0f 01 |...C............|
000000a0: d0 03 00 01 00 ca 03 00 00 d3 b8 a6 ec 03 b8 28 |...............(|
000000b0: d3 df d3 b8 a0 f1 9c 28 c8 03 16 00 00 03 0c 0c |.......(........|
000000c0: 04 16 0c 08 09 07 08 07 14 0c 04 07 05 07 15 07 |................|
000000d0: 11 00                                           |..|
```