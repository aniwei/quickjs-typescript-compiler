# 字节码分析报告

**输入文件**: tmp/simple-assign-chain.ts
**生成时间**: 2025-12-03T04:30:33.777Z

## 大小对比

- TypeScript编译器: 95 字节
- WASM编译器: 99 字节
- 差异: -4 字节 (-4.04%)

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
      "rawLength": 52,
      "actualLength": 26,
      "isWideChar": 0,
      "string": "tmp/simple-assign-chain.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 29
    }
  ],
  "functionHeader": {
    "offset": 31,
    "tag": "0xd",
    "remaining": 64
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
      "rawLength": 52,
      "actualLength": 26,
      "isWideChar": 0,
      "string": "tmp/simple-assign-chain.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 29
    }
  ],
  "functionHeader": {
    "offset": 31,
    "tag": "0xd",
    "remaining": 68
  }
}
```

## 字节级差异

共发现 29 个字节差异:

- 偏移量 0x33: TS=0x18 vs WASM=0x1c
- 偏移量 0x44: TS=0x69 vs WASM=0x11
- 偏移量 0x45: TS=0x00 vs WASM=0x69
- 偏移量 0x47: TS=0x68 vs WASM=0x00
- 偏移量 0x48: TS=0x00 vs WASM=0x0e
- 偏移量 0x49: TS=0x00 vs WASM=0x68
- 偏移量 0x4a: TS=0xb9 vs WASM=0x00
- 偏移量 0x4b: TS=0x9f vs WASM=0x00
- 偏移量 0x4c: TS=0x69 vs WASM=0xb9
- 偏移量 0x4d: TS=0x00 vs WASM=0x9f
- 偏移量 0x4e: TS=0x00 vs WASM=0x11
- 偏移量 0x4f: TS=0x06 vs WASM=0x69
- 偏移量 0x50: TS=0x2f vs WASM=0x00
- 偏移量 0x51: TS=0xc8 vs WASM=0x00
- 偏移量 0x52: TS=0x03 vs WASM=0x0e
- 偏移量 0x53: TS=0x0a vs WASM=0x06
- 偏移量 0x54: TS=0x00 vs WASM=0x2f
- 偏移量 0x55: TS=0x00 vs WASM=0xc8
- 偏移量 0x56: TS=0x21 vs WASM=0x03
- 偏移量 0x57: TS=0x08 vs WASM=0x0a
- ... (显示前20个差异，总共29个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 02 34 74 6d 70 2f 73 69 6d 70 6c 65 2d 61 73 |..4tmp/simple-as|
00000010: 73 69 67 6e 2d 63 68 61 69 6e 2e 6a 73 02 61 0d |sign-chain.js.a.|
00000020: c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 |........ .......|
00000030: 02 01 00 18 00 ca 03 00 09 08 ec 02 29 b7 e3 68 |............)..h|
00000040: 00 00 b8 9f 69 00 00 68 00 00 b9 9f 69 00 00 06 |....i..h....i...|
00000050: 2f c8 03 0a 00 00 21 08 16 04 17 03 16 04 00    |/.....!........|
```

### WASM
```
00000000: 05 02 34 74 6d 70 2f 73 69 6d 70 6c 65 2d 61 73 |..4tmp/simple-as|
00000010: 73 69 67 6e 2d 63 68 61 69 6e 2e 6a 73 02 61 0d |sign-chain.js.a.|
00000020: c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 |........ .......|
00000030: 02 01 00 1c 00 ca 03 00 09 08 ec 02 29 b7 e3 68 |............)..h|
00000040: 00 00 b8 9f 11 69 00 00 0e 68 00 00 b9 9f 11 69 |.....i...h.....i|
00000050: 00 00 0e 06 2f c8 03 0a 00 00 21 08 16 04 21 03 |..../.....!...!.|
00000060: 16 04 00                                        |...|
```