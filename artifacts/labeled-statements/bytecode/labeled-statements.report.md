# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/labeled-statements.ts
**生成时间**: 2026-01-06T16:09:47.150Z

## 大小对比

- TypeScript编译器: 248 字节
- WASM编译器: 248 字节
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
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "j",
      "offset": 4
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 6
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 14
    },
    {
      "index": 4,
      "rawLength": 80,
      "actualLength": 40,
      "isWideChar": 0,
      "string": "__tests__/fixtures/labeled-statements.js",
      "offset": 18
    }
  ],
  "functionHeader": {
    "offset": 59,
    "tag": "0xc",
    "remaining": 189
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
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "j",
      "offset": 4
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 6
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 14
    },
    {
      "index": 4,
      "rawLength": 80,
      "actualLength": 40,
      "isWideChar": 0,
      "string": "__tests__/fixtures/labeled-statements.js",
      "offset": 18
    }
  ],
  "functionHeader": {
    "offset": 59,
    "tag": "0xc",
    "remaining": 189
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 05 02 69 02 6a 0e 63 6f 6e 73 6f 6c 65 06 6c |...i.j.console.l|
00000010: 6f 67 50 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |ogP__tests__/fix|
00000020: 74 75 72 65 73 2f 6c 61 62 65 6c 65 64 2d 73 74 |tures/labeled-st|
00000030: 61 74 65 6d 65 6e 74 73 2e 6a 73 0c 00 06 00 a4 |atements.js.....|
00000040: 01 00 03 00 04 00 00 6a 03 a6 01 00 00 00 c8 03 |.......j........|
00000050: 02 00 20 ca 03 04 02 20 06 cb 63 01 00 b7 cc 64 |.. .... ..c....d|
00000060: 01 00 ba a5 ec 5b 06 cb 63 02 00 b7 cd 64 02 00 |.....[..c....d..|
00000070: ba a5 ec 43 06 cb 64 01 00 b8 ad ec 0a 06 cb 64 |...C..d........d|
00000080: 02 00 b8 ad ed 31 06 cb 64 01 00 b9 ad ec 0a 06 |.....1..d.......|
00000090: cb 64 02 00 b9 ad ed 1f 39 e6 00 00 00 43 e7 00 |.d......9....C..|
000000a0: 00 00 64 01 00 64 02 00 24 02 00 cb 64 02 00 93 |..d..d..$...d...|
000000b0: 65 02 00 0e ee b8 64 01 00 93 65 01 00 0e ee a0 |e.....d...e.....|
000000c0: c7 28 d0 03 32 00 00 25 2e 16 04 35 04 16 04 1c |.(..2..%...5....|
000000d0: 21 16 04 1c 04 16 04 00 05 08 0b 16 04 1c 04 16 |!...............|
000000e0: 04 00 03 08 13 1b 0e 1b 0a 11 06 11 07 00 04 15 |................|
000000f0: 1e 11 02 24 09 11 02 00                         |...$....|
```

### WASM
```
00000000: 05 05 02 69 02 6a 0e 63 6f 6e 73 6f 6c 65 06 6c |...i.j.console.l|
00000010: 6f 67 50 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |ogP__tests__/fix|
00000020: 74 75 72 65 73 2f 6c 61 62 65 6c 65 64 2d 73 74 |tures/labeled-st|
00000030: 61 74 65 6d 65 6e 74 73 2e 6a 73 0c 00 06 00 a4 |atements.js.....|
00000040: 01 00 03 00 04 00 00 6a 03 a6 01 00 00 00 c8 03 |.......j........|
00000050: 02 00 20 ca 03 04 02 20 06 cb 63 01 00 b7 cc 64 |.. .... ..c....d|
00000060: 01 00 ba a5 ec 5b 06 cb 63 02 00 b7 cd 64 02 00 |.....[..c....d..|
00000070: ba a5 ec 43 06 cb 64 01 00 b8 ad ec 0a 06 cb 64 |...C..d........d|
00000080: 02 00 b8 ad ed 31 06 cb 64 01 00 b9 ad ec 0a 06 |.....1..d.......|
00000090: cb 64 02 00 b9 ad ed 1f 39 e6 00 00 00 43 e7 00 |.d......9....C..|
000000a0: 00 00 64 01 00 64 02 00 24 02 00 cb 64 02 00 93 |..d..d..$...d...|
000000b0: 65 02 00 0e ee b8 64 01 00 93 65 01 00 0e ee a0 |e.....d...e.....|
000000c0: c7 28 d0 03 32 00 00 25 2e 16 04 35 04 16 04 1c |.(..2..%...5....|
000000d0: 21 16 04 1c 04 16 04 00 05 08 0b 16 04 1c 04 16 |!...............|
000000e0: 04 00 03 08 13 1b 0e 1b 0a 11 06 11 07 00 04 15 |................|
000000f0: 1e 11 02 24 09 11 02 00                         |...$....|
```