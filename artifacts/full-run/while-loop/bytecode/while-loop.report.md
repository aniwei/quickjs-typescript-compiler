# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/while-loop.ts
**生成时间**: 2025-12-04T06:33:09.935Z

## 大小对比

- TypeScript编译器: 181 字节
- WASM编译器: 180 字节
- 差异: 1 字节 (0.56%)

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
      "rawLength": 82,
      "actualLength": 41,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/while-loop.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 44
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 46
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 54
    },
    {
      "index": 4,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "Done",
      "offset": 58
    }
  ],
  "functionHeader": {
    "offset": 63,
    "tag": "0xd",
    "remaining": 118
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
      "rawLength": 82,
      "actualLength": 41,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/while-loop.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 44
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 46
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 54
    },
    {
      "index": 4,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "Done",
      "offset": 58
    }
  ],
  "functionHeader": {
    "offset": 63,
    "tag": "0xd",
    "remaining": 117
  }
}
```

## 字节级差异

共发现 85 个字节差异:

- 偏移量 0x4e: TS=0x01 vs WASM=0x00
- 偏移量 0x53: TS=0x3b vs WASM=0x3f
- 偏移量 0x54: TS=0x01 vs WASM=0x00
- 偏移量 0x57: TS=0x01 vs WASM=0x00
- 偏移量 0x58: TS=0x00 vs WASM=0x09
- 偏移量 0x59: TS=0x20 vs WASM=0x08
- 偏移量 0x5a: TS=0xca vs WASM=0xec
- 偏移量 0x5b: TS=0x03 vs WASM=0x02
- 偏移量 0x5c: TS=0x00 vs WASM=0x29
- 偏移量 0x5d: TS=0x09 vs WASM=0xb7
- 偏移量 0x5e: TS=0x08 vs WASM=0xe3
- 偏移量 0x5f: TS=0xec vs WASM=0x68
- 偏移量 0x60: TS=0x02 vs WASM=0x00
- 偏移量 0x61: TS=0x29 vs WASM=0x00
- 偏移量 0x62: TS=0xb7 vs WASM=0xba
- 偏移量 0x63: TS=0xe3 vs WASM=0xa5
- 偏移量 0x64: TS=0x5a vs WASM=0xec
- 偏移量 0x65: TS=0x00 vs WASM=0x1e
- 偏移量 0x66: TS=0x00 vs WASM=0x39
- 偏移量 0x67: TS=0xba vs WASM=0xe6
- ... (显示前20个差异，总共85个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 05 52 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..R__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 77 |piler/fixtures/w|
00000020: 68 69 6c 65 2d 6c 6f 6f 70 2e 6a 73 02 69 0e 63 |hile-loop.js.i.c|
00000030: 6f 6e 73 6f 6c 65 06 6c 6f 67 08 44 6f 6e 65 0d |onsole.log.Done.|
00000040: c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 01 00 |........ .......|
00000050: 03 01 00 3b 01 ca 03 01 00 20 ca 03 00 09 08 ec |...;..... ......|
00000060: 02 29 b7 e3 5a 00 00 ba a5 ec 1a 39 e6 00 00 00 |.)..Z......9....|
00000070: 43 e7 00 00 00 5a 00 00 24 01 00 0e 5a 00 00 b8 |C....Z..$...Z...|
00000080: 9f cb ee e1 39 e6 00 00 00 43 e7 00 00 00 04 e8 |....9....C......|
00000090: 00 00 00 24 01 00 0e 06 2f c8 03 18 00 00 21 0e |...$..../.....!.|
000000a0: 16 04 12 09 1b 0e 1b 0a 11 01 17 0d 16 04 18 13 |................|
000000b0: 1b 0e 34 08 00                                  |..4..|
```

### WASM
```
00000000: 05 05 52 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..R__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 77 |piler/fixtures/w|
00000020: 68 69 6c 65 2d 6c 6f 6f 70 2e 6a 73 02 69 0e 63 |hile-loop.js.i.c|
00000030: 6f 6e 73 6f 6c 65 06 6c 6f 67 08 44 6f 6e 65 0d |onsole.log.Done.|
00000040: c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 |........ .......|
00000050: 03 01 00 3f 00 ca 03 00 09 08 ec 02 29 b7 e3 68 |...?........)..h|
00000060: 00 00 ba a5 ec 1e 39 e6 00 00 00 43 e7 00 00 00 |......9....C....|
00000070: 68 00 00 24 01 00 0e 68 00 00 b8 9f 11 69 00 00 |h..$...h.....i..|
00000080: 0e ee dd 39 e6 00 00 00 43 e7 00 00 00 04 e8 00 |...9....C.......|
00000090: 00 00 24 01 00 0e 06 2f c8 03 18 00 00 21 0e 16 |..$..../.....!..|
000000a0: 04 12 09 1b 0e 1b 0a 11 01 17 0d 16 04 2c 13 1b |.............,..|
000000b0: 0e 34 08 00                                     |.4..|
```