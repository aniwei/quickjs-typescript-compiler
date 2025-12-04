# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/simple-var.ts
**生成时间**: 2025-12-04T06:33:09.174Z

## 大小对比

- TypeScript编译器: 91 字节
- WASM编译器: 86 字节
- 差异: 5 字节 (5.81%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 2,
  "atoms": [
    {
      "index": 0,
      "rawLength": 82,
      "actualLength": 41,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/simple-var.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 44
    }
  ],
  "functionHeader": {
    "offset": 46,
    "tag": "0xd",
    "remaining": 45
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 2,
  "atoms": [
    {
      "index": 0,
      "rawLength": 82,
      "actualLength": 41,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/simple-var.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 44
    }
  ],
  "functionHeader": {
    "offset": 46,
    "tag": "0xd",
    "remaining": 40
  }
}
```

## 字节级差异

共发现 23 个字节差异:

- 偏移量 0x3d: TS=0x01 vs WASM=0x00
- 偏移量 0x43: TS=0x01 vs WASM=0x00
- 偏移量 0x46: TS=0x01 vs WASM=0x00
- 偏移量 0x47: TS=0x00 vs WASM=0x0d
- 偏移量 0x48: TS=0x30 vs WASM=0x08
- 偏移量 0x49: TS=0xca vs WASM=0xec
- 偏移量 0x4a: TS=0x03 vs WASM=0x02
- 偏移量 0x4b: TS=0x00 vs WASM=0x29
- 偏移量 0x4c: TS=0x0d vs WASM=0xb8
- 偏移量 0x4d: TS=0x08 vs WASM=0xe3
- 偏移量 0x4e: TS=0xec vs WASM=0x06
- 偏移量 0x4f: TS=0x02 vs WASM=0x2f
- 偏移量 0x50: TS=0x29 vs WASM=0xc8
- 偏移量 0x51: TS=0xb8 vs WASM=0x03
- 偏移量 0x52: TS=0xe3 vs WASM=0x02
- 偏移量 0x53: TS=0x06 vs WASM=0x00
- 偏移量 0x54: TS=0x2f vs WASM=0x00
- 偏移量 0x55: TS=0xc8 vs WASM=0x00
- 偏移量 0x56: TS=0x03 vs WASM=EOF
- 偏移量 0x57: TS=0x02 vs WASM=EOF
- ... (显示前20个差异，总共23个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 02 52 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..R__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 73 |piler/fixtures/s|
00000020: 69 6d 70 6c 65 2d 76 61 72 2e 6a 73 02 78 0d c8 |imple-var.js.x..|
00000030: 03 00 00 00 00 00 0c 20 06 01 a4 01 00 01 00 01 |....... ........|
00000040: 01 00 08 01 ca 03 01 00 30 ca 03 00 0d 08 ec 02 |........0.......|
00000050: 29 b8 e3 06 2f c8 03 02 00 00 00                |).../......|
```

### WASM
```
00000000: 05 02 52 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..R__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 73 |piler/fixtures/s|
00000020: 69 6d 70 6c 65 2d 76 61 72 2e 6a 73 02 78 0d c8 |imple-var.js.x..|
00000030: 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 01 |....... ........|
00000040: 01 00 08 00 ca 03 00 0d 08 ec 02 29 b8 e3 06 2f |...........).../|
00000050: c8 03 02 00 00 00                               |......|
```