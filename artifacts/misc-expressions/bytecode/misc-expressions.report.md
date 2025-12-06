# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/misc-expressions.ts
**生成时间**: 2025-12-06T02:09:56.420Z

## 大小对比

- TypeScript编译器: 121 字节
- WASM编译器: 102 字节
- 差异: 19 字节 (18.63%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 3,
  "atoms": [
    {
      "index": 0,
      "rawLength": 94,
      "actualLength": 47,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/misc-expressions.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 50
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 52
    }
  ],
  "functionHeader": {
    "offset": 54,
    "tag": "0xd",
    "remaining": 67
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 3,
  "atoms": [
    {
      "index": 0,
      "rawLength": 94,
      "actualLength": 47,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/misc-expressions.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 50
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 52
    }
  ],
  "functionHeader": {
    "offset": 54,
    "tag": "0xd",
    "remaining": 48
  }
}
```

## 字节级差异

共发现 34 个字节差异:

- 偏移量 0x47: TS=0x03 vs WASM=0x01
- 偏移量 0x4a: TS=0x18 vs WASM=0x0c
- 偏移量 0x58: TS=0x0a vs WASM=0xb8
- 偏移量 0x59: TS=0x6c vs WASM=0xee
- 偏移量 0x5a: TS=0x0a vs WASM=0x01
- 偏移量 0x5b: TS=0x00 vs WASM=0xe3
- 偏移量 0x5c: TS=0x00 vs WASM=0xb9
- 偏移量 0x5d: TS=0x00 vs WASM=0xe4
- 偏移量 0x5e: TS=0xb8 vs WASM=0x06
- 偏移量 0x5f: TS=0x6e vs WASM=0x2f
- 偏移量 0x60: TS=0x05 vs WASM=0xc8
- 偏移量 0x61: TS=0x00 vs WASM=0x03
- 偏移量 0x62: TS=0x00 vs WASM=0x02
- 偏移量 0x64: TS=0xb9 vs WASM=0x00
- 偏移量 0x65: TS=0xe3 vs WASM=0x00
- 偏移量 0x66: TS=0xb8 vs WASM=EOF
- 偏移量 0x67: TS=0x0e vs WASM=EOF
- 偏移量 0x68: TS=0xb9 vs WASM=EOF
- 偏移量 0x69: TS=0xe4 vs WASM=EOF
- 偏移量 0x6a: TS=0x06 vs WASM=EOF
- ... (显示前20个差异，总共34个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 03 5e 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..^__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6d |piler/fixtures/m|
00000020: 69 73 63 2d 65 78 70 72 65 73 73 69 6f 6e 73 2e |isc-expressions.|
00000030: 6a 73 02 78 02 79 0d c8 03 00 00 00 00 00 0c 20 |js.x.y......... |
00000040: 06 01 a4 01 00 00 00 03 02 00 18 00 ca 03 00 0d |................|
00000050: cc 03 01 0d 08 ec 02 29 0a 6c 0a 00 00 00 b8 6e |.......).l.....n|
00000060: 05 00 00 00 b9 e3 b8 0e b9 e4 06 2f c8 03 00 08 |.........../....|
00000070: 16 0a 20 07 20 04 0d 76 00                      |.. . ..v.|
```

### WASM
```
00000000: 05 03 5e 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..^__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6d |piler/fixtures/m|
00000020: 69 73 63 2d 65 78 70 72 65 73 73 69 6f 6e 73 2e |isc-expressions.|
00000030: 6a 73 02 78 02 79 0d c8 03 00 00 00 00 00 0c 20 |js.x.y......... |
00000040: 06 01 a4 01 00 00 00 01 02 00 0c 00 ca 03 00 0d |................|
00000050: cc 03 01 0d 08 ec 02 29 b8 ee 01 e3 b9 e4 06 2f |.......)......./|
00000060: c8 03 02 00 00 00                               |......|
```