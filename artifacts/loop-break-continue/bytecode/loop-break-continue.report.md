# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/compiler/fixtures/loop-break-continue.ts
**生成时间**: 2025-12-11T11:32:28.106Z

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

共发现 73 个字节差异:

- 偏移量 0x57: TS=0x3a vs WASM=0x3e
- 偏移量 0x5f: TS=0xff vs WASM=0xec
- 偏移量 0x65: TS=0xca vs WASM=0xb7
- 偏移量 0x66: TS=0xde vs WASM=0xcb
- 偏移量 0x6a: TS=0xd2 vs WASM=0xbf
- 偏移量 0x6d: TS=0x6c vs WASM=0xec
- 偏移量 0x6e: TS=0x42 vs WASM=0x2c
- 偏移量 0x6f: TS=0x00 vs WASM=0x64
- 偏移量 0x71: TS=0xff vs WASM=0x00
- 偏移量 0x72: TS=0x27 vs WASM=0xbc
- 偏移量 0x74: TS=0x6d vs WASM=0xed
- 偏移量 0x75: TS=0x34 vs WASM=0x25
- 偏移量 0x76: TS=0x00 vs WASM=0x64
- 偏移量 0x79: TS=0x64 vs WASM=0xb9
- 偏移量 0x7a: TS=0x00 vs WASM=0x9e
- 偏移量 0x7b: TS=0x00 vs WASM=0xb7
- 偏移量 0x7c: TS=0x00 vs WASM=0xad
- 偏移量 0x7d: TS=0x1c vs WASM=0xed
- 偏移量 0x7e: TS=0x1b vs WASM=0x12
- 偏移量 0x7f: TS=0x00 vs WASM=0x39
- ... (显示前20个差异，总共73个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 04 64 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..d__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6c |piler/fixtures/l|
00000020: 6f 6f 70 2d 62 72 65 61 6b 2d 63 6f 6e 74 69 6e |oop-break-contin|
00000030: 75 65 2e 6a 73 02 69 0e 63 6f 6e 73 6f 6c 65 06 |ue.js.i.console.|
00000040: 6c 6f 67 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 |log......... ...|
00000050: 01 00 01 00 03 00 00 3a 01 ca 03 02 00 20 08 ff |.......:..... ..|
00000060: 02 29 63 00 00 ca de 64 00 00 d2 0a a5 6c 42 00 |.)c....d.....lB.|
00000070: 00 ff 27 ad 6d 34 00 00 00 64 00 00 00 1c 1b 00 |..'.m4...d......|
00000080: 00 00 39 e6 00 00 00 43 e7 00 06 00 24 01 00 0e |..9....C....$...|
00000090: da 93 de 0e 6e b7 ff ff c8 03 1e 00 00 2f 20 2f |....n......../ /|
000000a0: 04 12 13 2a 04 14 03 2a 04 0c 08 14 13 25 0e 1b |...*...*.....%..|
000000b0: 0a 25 01 00 04 0d 12 07 02 00                   |.%........|
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