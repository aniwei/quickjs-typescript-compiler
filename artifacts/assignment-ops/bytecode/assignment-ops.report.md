# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/assignment-ops.ts
**生成时间**: 2025-12-06T02:09:56.245Z

## 大小对比

- TypeScript编译器: 270 字节
- WASM编译器: 304 字节
- 差异: -34 字节 (-11.18%)

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
      "rawLength": 90,
      "actualLength": 45,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/assignment-ops.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 48
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 50
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 58
    }
  ],
  "functionHeader": {
    "offset": 62,
    "tag": "0xd",
    "remaining": 208
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
      "rawLength": 90,
      "actualLength": 45,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/assignment-ops.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 48
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 50
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 58
    }
  ],
  "functionHeader": {
    "offset": 62,
    "tag": "0xd",
    "remaining": 242
  }
}
```

## 字节级差异

共发现 200 个字节差异:

- 偏移量 0x52: TS=0x7b vs WASM=0x97
- 偏移量 0x53: TS=0x00 vs WASM=0x01
- 偏移量 0x54: TS=0xca vs WASM=0x00
- 偏移量 0x55: TS=0x03 vs WASM=0xca
- 偏移量 0x56: TS=0x00 vs WASM=0x03
- 偏移量 0x57: TS=0x09 vs WASM=0x00
- 偏移量 0x58: TS=0x08 vs WASM=0x09
- 偏移量 0x59: TS=0xec vs WASM=0x08
- 偏移量 0x5a: TS=0x02 vs WASM=0xec
- 偏移量 0x5b: TS=0x29 vs WASM=0x02
- 偏移量 0x5c: TS=0xb8 vs WASM=0x29
- 偏移量 0x5d: TS=0xe3 vs WASM=0xb8
- 偏移量 0x5e: TS=0xb9 vs WASM=0xe3
- 偏移量 0x5f: TS=0xcb vs WASM=0xb9
- 偏移量 0x60: TS=0x68 vs WASM=0x11
- 偏移量 0x61: TS=0x00 vs WASM=0x69
- 偏移量 0x63: TS=0xb8 vs WASM=0x00
- 偏移量 0x64: TS=0x9f vs WASM=0x0e
- 偏移量 0x65: TS=0x5b vs WASM=0x68
- 偏移量 0x68: TS=0x68 vs WASM=0xb8
- ... (显示前20个差异，总共200个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 04 5a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..Z__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 61 |piler/fixtures/a|
00000020: 73 73 69 67 6e 6d 65 6e 74 2d 6f 70 73 2e 6a 73 |ssignment-ops.js|
00000030: 02 78 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 |.x.console.log..|
00000040: 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 03 |....... ........|
00000050: 01 00 7b 00 ca 03 00 09 08 ec 02 29 b8 e3 b9 cb |..{........)....|
00000060: 68 00 00 b8 9f 5b 00 00 68 00 00 b8 a0 5b 00 00 |h....[..h....[..|
00000070: 68 00 00 b9 9c 5b 00 00 68 00 00 b9 9d 5b 00 00 |h....[..h....[..|
00000080: 68 00 00 b9 9e 5b 00 00 68 00 00 b9 a1 5b 00 00 |h....[..h....[..|
00000090: 68 00 00 b8 a2 5b 00 00 68 00 00 b8 a3 5b 00 00 |h....[..h....[..|
000000a0: 68 00 00 b8 a4 5b 00 00 68 00 00 b8 af 5b 00 00 |h....[..h....[..|
000000b0: 68 00 00 b8 b1 5b 00 00 68 00 00 b8 b0 5b 00 00 |h....[..h....[..|
000000c0: 39 e6 00 00 00 43 e7 00 00 00 68 00 00 24 01 00 |9....C....h..$..|
000000d0: 0e 06 2f c8 03 00 36 16 08 0d 7c 0d 7c 11 05 1c |../...6...|.|...|
000000e0: 7b 11 05 1c 7b 11 05 1c 7b 11 05 1c 7b 11 05 1c |{...{...{...{...|
000000f0: 7b 11 06 1c 7a 11 06 1c 7a 11 06 1c 7a 11 07 1c |{...z...z...z...|
00000100: 79 11 05 1c 7b 11 05 1c 7b 11 05 1c 7b 00       |y...{...{...{.|
```

### WASM
```
00000000: 05 04 5a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..Z__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 61 |piler/fixtures/a|
00000020: 73 73 69 67 6e 6d 65 6e 74 2d 6f 70 73 2e 6a 73 |ssignment-ops.js|
00000030: 02 78 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 |.x.console.log..|
00000040: 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 03 |....... ........|
00000050: 01 00 97 01 00 ca 03 00 09 08 ec 02 29 b8 e3 b9 |............)...|
00000060: 11 69 00 00 0e 68 00 00 b8 9f 11 69 00 00 0e 68 |.i...h.....i...h|
00000070: 00 00 b8 a0 11 69 00 00 0e 68 00 00 b9 9c 11 69 |.....i...h.....i|
00000080: 00 00 0e 68 00 00 b9 9d 11 69 00 00 0e 68 00 00 |...h.....i...h..|
00000090: b9 9e 11 69 00 00 0e 68 00 00 b9 a1 11 69 00 00 |...i...h.....i..|
000000a0: 0e 68 00 00 b8 a2 11 69 00 00 0e 68 00 00 b8 a3 |.h.....i...h....|
000000b0: 11 69 00 00 0e 68 00 00 b8 a4 11 69 00 00 0e 68 |.i...h.....i...h|
000000c0: 00 00 b8 af 11 69 00 00 0e 68 00 00 b8 b1 11 69 |.....i...h.....i|
000000d0: 00 00 0e 68 00 00 b8 b0 11 69 00 00 0e 39 e6 00 |...h.....i...9..|
000000e0: 00 00 43 e7 00 00 00 68 00 00 24 01 00 0e 06 2f |..C....h..$..../|
000000f0: c8 03 3c 00 00 21 00 21 00 16 04 21 03 16 04 21 |..<..!.!...!...!|
00000100: 03 16 04 21 03 16 04 21 03 16 04 21 03 16 04 21 |...!...!...!...!|
00000110: 03 16 04 21 03 16 04 21 03 16 04 21 03 16 04 21 |...!...!...!...!|
00000120: 03 16 04 21 03 16 04 21 03 1b 0e 1b 0a 11 01 00 |...!...!........|
```