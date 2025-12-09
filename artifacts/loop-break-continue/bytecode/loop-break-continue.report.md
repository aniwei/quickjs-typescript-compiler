# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/loop-break-continue.ts
**生成时间**: 2025-12-09T08:59:51.528Z

## 大小对比

- TypeScript编译器: 186 字节
- WASM编译器: 190 字节
- 差异: -4 字节 (-2.11%)

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
      "rawLength": 100,
      "actualLength": 50,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/loop-break-continue.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 53
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 55
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 63
    }
  ],
  "functionHeader": {
    "offset": 67,
    "tag": "0xd",
    "remaining": 119
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
      "rawLength": 100,
      "actualLength": 50,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/loop-break-continue.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 53
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 55
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 63
    }
  ],
  "functionHeader": {
    "offset": 67,
    "tag": "0xd",
    "remaining": 123
  }
}
```

## 字节级差异

共发现 83 个字节差异:

- 偏移量 0x57: TS=0x3a vs WASM=0x3e
- 偏移量 0x60: TS=0x36 vs WASM=0x02
- 偏移量 0x61: TS=0x63 vs WASM=0x29
- 偏移量 0x62: TS=0x00 vs WASM=0x63
- 偏移量 0x64: TS=0xb7 vs WASM=0x00
- 偏移量 0x65: TS=0xcb vs WASM=0xb7
- 偏移量 0x66: TS=0x64 vs WASM=0xcb
- 偏移量 0x67: TS=0x00 vs WASM=0x64
- 偏移量 0x69: TS=0xbf vs WASM=0x00
- 偏移量 0x6a: TS=0x0a vs WASM=0xbf
- 偏移量 0x6b: TS=0xa5 vs WASM=0x0a
- 偏移量 0x6c: TS=0xec vs WASM=0xa5
- 偏移量 0x6d: TS=0x28 vs WASM=0xec
- 偏移量 0x6e: TS=0x64 vs WASM=0x2c
- 偏移量 0x6f: TS=0x00 vs WASM=0x64
- 偏移量 0x71: TS=0xbc vs WASM=0x00
- 偏移量 0x72: TS=0xad vs WASM=0xbc
- 偏移量 0x73: TS=0xed vs WASM=0xad
- 偏移量 0x74: TS=0x21 vs WASM=0xed
- 偏移量 0x75: TS=0x64 vs WASM=0x25
- ... (显示前20个差异，总共83个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 04 64 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..d__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6c |piler/fixtures/l|
00000020: 6f 6f 70 2d 62 72 65 61 6b 2d 63 6f 6e 74 69 6e |oop-break-contin|
00000030: 75 65 2e 6a 73 02 69 0e 63 6f 6e 73 6f 6c 65 06 |ue.js.i.console.|
00000040: 6c 6f 67 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 |log......... ...|
00000050: 01 00 01 00 03 00 00 3a 01 ca 03 02 00 20 08 ec |.......:..... ..|
00000060: 36 63 00 00 b7 cb 64 00 00 bf 0a a5 ec 28 64 00 |6c....d......(d.|
00000070: 00 bc ad ed 21 64 00 00 b9 9e b7 ad ed 12 39 e6 |....!d........9.|
00000080: 00 00 00 43 e7 00 00 00 64 00 00 24 01 00 0e c7 |...C....d..$....|
00000090: 93 cb 0e ee d2 29 06 2f c8 03 1e 00 00 2a 20 1b |.....)./.....* .|
000000a0: 04 12 13 16 04 14 03 16 04 0c 08 14 13 1b 0e 1b |................|
000000b0: 0a 11 01 00 04 0d 12 07 02 00                   |..........|
```

### WASM
```
00000000: 05 04 64 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..d__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6c |piler/fixtures/l|
00000020: 6f 6f 70 2d 62 72 65 61 6b 2d 63 6f 6e 74 69 6e |oop-break-contin|
00000030: 75 65 2e 6a 73 02 69 0e 63 6f 6e 73 6f 6c 65 06 |ue.js.i.console.|
00000040: 6c 6f 67 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 |log......... ...|
00000050: 01 00 01 00 03 00 00 3e 01 ca 03 02 00 20 08 ec |.......>..... ..|
00000060: 02 29 63 00 00 b7 cb 64 00 00 bf 0a a5 ec 2c 64 |.)c....d......,d|
00000070: 00 00 bc ad ed 25 64 00 00 b9 9e b7 ad ed 12 39 |.....%d........9|
00000080: e6 00 00 00 43 e7 00 00 00 64 00 00 24 01 00 0e |....C....d..$...|
00000090: 64 00 00 93 65 00 00 0e ee ce 06 2f c8 03 1e 00 |d...e....../....|
000000a0: 00 2f 20 1b 04 12 13 16 04 14 03 16 04 0c 08 14 |./ .............|
000000b0: 13 1b 0e 1b 0a 11 01 00 04 0d 12 11 02 00       |..............|
```