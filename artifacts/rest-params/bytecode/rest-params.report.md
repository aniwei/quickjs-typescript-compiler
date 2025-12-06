# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/rest-params.ts
**生成时间**: 2025-12-06T02:09:56.487Z

## 大小对比

- TypeScript编译器: 192 字节
- WASM编译器: 193 字节
- 差异: -1 字节 (-0.52%)

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
      "rawLength": 84,
      "actualLength": 42,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/rest-params.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "restBasic",
      "offset": 45
    },
    {
      "index": 2,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "restMixed",
      "offset": 55
    },
    {
      "index": 3,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "args",
      "offset": 65
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 70
    }
  ],
  "functionHeader": {
    "offset": 72,
    "tag": "0xd",
    "remaining": 120
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
      "rawLength": 84,
      "actualLength": 42,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/rest-params.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "restBasic",
      "offset": 45
    },
    {
      "index": 2,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "restMixed",
      "offset": 55
    },
    {
      "index": 3,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "args",
      "offset": 65
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 70
    }
  ],
  "functionHeader": {
    "offset": 72,
    "tag": "0xd",
    "remaining": 121
  }
}
```

## 字节级差异

共发现 68 个字节差异:

- 偏移量 0x59: TS=0x03 vs WASM=0x01
- 偏移量 0x74: TS=0x00 vs WASM=0x02
- 偏移量 0x77: TS=0x0c vs WASM=0x00
- 偏移量 0x78: TS=0x40 vs WASM=0x0c
- 偏移量 0x79: TS=0x06 vs WASM=0x41
- 偏移量 0x7a: TS=0x00 vs WASM=0x06
- 偏移量 0x7b: TS=0xca vs WASM=0x01
- 偏移量 0x7c: TS=0x03 vs WASM=0xca
- 偏移量 0x7d: TS=0x01 vs WASM=0x03
- 偏移量 0x7e: TS=0x00 vs WASM=0x01
- 偏移量 0x7f: TS=0x01 vs WASM=0x00
- 偏移量 0x80: TS=0x03 vs WASM=0x00
- 偏移量 0x81: TS=0x00 vs WASM=0x01
- 偏移量 0x83: TS=0x08 vs WASM=0x00
- 偏移量 0x84: TS=0x01 vs WASM=0x05
- 偏移量 0x85: TS=0xce vs WASM=0x01
- 偏移量 0x86: TS=0x03 vs WASM=0xce
- 偏移量 0x87: TS=0x00 vs WASM=0x03
- 偏移量 0x89: TS=0x00 vs WASM=0x01
- 偏移量 0x8a: TS=0x0d vs WASM=0x00
- ... (显示前20个差异，总共68个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 05 54 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..T__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 72 |piler/fixtures/r|
00000020: 65 73 74 2d 70 61 72 61 6d 73 2e 6a 73 12 72 65 |est-params.js.re|
00000030: 73 74 42 61 73 69 63 12 72 65 73 74 4d 69 78 65 |stBasic.restMixe|
00000040: 64 08 61 72 67 73 02 61 0d c8 03 00 00 00 00 00 |d.args.a........|
00000050: 0c 20 06 01 a4 01 00 00 00 03 02 02 0c 00 ca 03 |. ..............|
00000060: 00 01 cc 03 01 01 08 ec 08 c2 00 e3 c2 01 e4 29 |...............)|
00000070: 06 2f c8 03 00 00 00 0c 40 06 00 ca 03 01 00 01 |./......@.......|
00000080: 03 00 00 08 01 ce 03 00 00 00 0d 00 00 db 0e d3 |................|
00000090: 28 29 c8 03 00 02 1c 09 00 0c 40 06 00 cc 03 02 |()........@.....|
000000a0: 00 02 03 00 00 08 02 d0 03 00 00 00 ce 03 00 00 |................|
000000b0: 00 0d 01 00 dc 0e d4 28 29 c8 03 02 02 1d 08 00 |.......().......|
```

### WASM
```
00000000: 05 05 54 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..T__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 72 |piler/fixtures/r|
00000020: 65 73 74 2d 70 61 72 61 6d 73 2e 6a 73 12 72 65 |est-params.js.re|
00000030: 73 74 42 61 73 69 63 12 72 65 73 74 4d 69 78 65 |stBasic.restMixe|
00000040: 64 08 61 72 67 73 02 61 0d c8 03 00 00 00 00 00 |d.args.a........|
00000050: 0c 20 06 01 a4 01 00 00 00 01 02 02 0c 00 ca 03 |. ..............|
00000060: 00 01 cc 03 01 01 08 ec 08 c2 00 e3 c2 01 e4 29 |...............)|
00000070: 06 2f c8 03 02 00 00 00 0c 41 06 01 ca 03 01 00 |./.......A......|
00000080: 00 01 00 00 05 01 ce 03 00 01 00 0d 00 00 db 28 |...............(|
00000090: c8 03 06 00 00 12 16 07 0d 00 0c 41 06 01 cc 03 |...........A....|
000000a0: 02 00 01 01 00 00 05 02 d0 03 00 01 00 ce 03 00 |................|
000000b0: 01 00 0d 01 00 dc 28 c8 03 06 03 00 12 16 07 0d |......(.........|
000000c0: 00                                              |.|
```