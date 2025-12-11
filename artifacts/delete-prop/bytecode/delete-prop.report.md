# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/compiler/fixtures/delete-prop.ts
**生成时间**: 2025-12-11T11:32:28.035Z

## 大小对比

- TypeScript编译器: 135 字节
- WASM编译器: 135 字节
- 差异: 0 字节 (0.00%)

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
      "rawLength": 84,
      "actualLength": 42,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/delete-prop.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 45
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "arr",
      "offset": 49
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 53
    }
  ],
  "functionHeader": {
    "offset": 55,
    "tag": "0xd",
    "remaining": 80
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
      "rawLength": 84,
      "actualLength": 42,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/delete-prop.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 45
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "arr",
      "offset": 49
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 53
    }
  ],
  "functionHeader": {
    "offset": 55,
    "tag": "0xd",
    "remaining": 80
  }
}
```

## 字节级差异

共发现 12 个字节差异:

- 偏移量 0x48: TS=0x03 vs WASM=0x02
- 偏移量 0x56: TS=0xff vs WASM=0xec
- 偏移量 0x5a: TS=0xcb vs WASM=0xb8
- 偏移量 0x60: TS=0xf6 vs WASM=0xe3
- 偏移量 0x61: TS=0x64 vs WASM=0x68
- 偏移量 0x6b: TS=0xcb vs WASM=0xb8
- 偏移量 0x6c: TS=0xcc vs WASM=0xb9
- 偏移量 0x70: TS=0xf7 vs WASM=0xe4
- 偏移量 0x71: TS=0x64 vs WASM=0x68
- 偏移量 0x74: TS=0xca vs WASM=0xb7
- 偏移量 0x80: TS=0x25 vs WASM=0x11
- 偏移量 0x84: TS=0x2a vs WASM=0x16

## 十六进制转储对比

### TypeScript
```
00000000: 05 04 54 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..T__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 64 |piler/fixtures/d|
00000020: 65 6c 65 74 65 2d 70 72 6f 70 2e 6a 73 06 6f 62 |elete-prop.js.ob|
00000030: 6a 06 61 72 72 02 61 0d c8 03 00 00 00 00 00 0c |j.arr.a.........|
00000040: 20 06 01 a4 01 00 00 00 03 02 00 24 00 ca 03 00 | ..........$....|
00000050: 0d cc 03 01 0d 08 ff 02 29 0b cb 4e e7 00 00 00 |........)..N....|
00000060: f6 64 00 00 04 e7 00 00 00 9a 0e cb cc 26 02 00 |.d...........&..|
00000070: f7 64 01 00 ca 9a 0e 06 2f c8 03 0a 00 00 3f 0e |.d....../.....?.|
00000080: 25 06 45 05 2a 06 00                            |%.E.*..|
```

### WASM
```
00000000: 05 04 54 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..T__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 64 |piler/fixtures/d|
00000020: 65 6c 65 74 65 2d 70 72 6f 70 2e 6a 73 06 6f 62 |elete-prop.js.ob|
00000030: 6a 06 61 72 72 02 61 0d c8 03 00 00 00 00 00 0c |j.arr.a.........|
00000040: 20 06 01 a4 01 00 00 00 02 02 00 24 00 ca 03 00 | ..........$....|
00000050: 0d cc 03 01 0d 08 ec 02 29 0b b8 4e e7 00 00 00 |........)..N....|
00000060: e3 68 00 00 04 e7 00 00 00 9a 0e b8 b9 26 02 00 |.h...........&..|
00000070: e4 68 01 00 b7 9a 0e 06 2f c8 03 0a 00 00 3f 0e |.h....../.....?.|
00000080: 11 06 45 05 16 06 00                            |..E....|
```