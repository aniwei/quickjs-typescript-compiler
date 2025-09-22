# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/simple.ts
**生成时间**: 2025-09-22T09:25:36.397Z

## 大小对比

- TypeScript编译器: 73 字节
- WASM编译器: 86 字节
- 差异: -13 字节 (-15.12%)

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
      "rawLength": 74,
      "actualLength": 37,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/simple.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 40
    }
  ],
  "functionHeader": {
    "offset": 42,
    "tag": "0xd",
    "remaining": 31
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
      "rawLength": 74,
      "actualLength": 37,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/simple.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 40
    }
  ],
  "functionHeader": {
    "offset": 42,
    "tag": "0xd",
    "remaining": 44
  }
}
```

## 字节级差异

共发现 34 个字节差异:

- 偏移量 0x30: TS=0x01 vs WASM=0x00
- 偏移量 0x32: TS=0x06 vs WASM=0x0c
- 偏移量 0x33: TS=0x01 vs WASM=0x20
- 偏移量 0x34: TS=0x00 vs WASM=0x06
- 偏移量 0x35: TS=0x0f vs WASM=0x01
- 偏移量 0x36: TS=0x00 vs WASM=0xa4
- 偏移量 0x37: TS=0x72 vs WASM=0x01
- 偏移量 0x39: TS=0x01 vs WASM=0x00
- 偏移量 0x3a: TS=0x01 vs WASM=0x00
- 偏移量 0x3b: TS=0x01 vs WASM=0x02
- 偏移量 0x3c: TS=0x00 vs WASM=0x01
- 偏移量 0x3e: TS=0x00 vs WASM=0x0a
- 偏移量 0x3f: TS=0x01 vs WASM=0x00
- 偏移量 0x40: TS=0x02 vs WASM=0xca
- 偏移量 0x41: TS=0x00 vs WASM=0x03
- 偏移量 0x43: TS=0x00 vs WASM=0x0d
- 偏移量 0x44: TS=0x48 vs WASM=0x08
- 偏移量 0x45: TS=0x2f vs WASM=0xec
- 偏移量 0x46: TS=0x00 vs WASM=0x02
- 偏移量 0x47: TS=0x00 vs WASM=0x29
- ... (显示前20个差异，总共34个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 02 4a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..J__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 73 |piler/fixtures/s|
00000020: 69 6d 70 6c 65 2e 6a 73 02 61 0d c8 03 00 00 00 |imple.js.a......|
00000030: 01 00 06 01 00 0f 00 72 00 01 01 01 00 00 00 01 |.......r........|
00000040: 02 00 00 00 48 2f 00 00 29                      |....H/..)|
```

### WASM
```
00000000: 05 02 4a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..J__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 73 |piler/fixtures/s|
00000020: 69 6d 70 6c 65 2e 6a 73 02 61 0d c8 03 00 00 00 |imple.js.a......|
00000030: 00 00 0c 20 06 01 a4 01 00 00 00 02 01 00 0a 00 |... ............|
00000040: ca 03 00 0d 08 ec 02 29 b8 b9 9f e3 06 2f c8 03 |.......)...../..|
00000050: 04 00 00 20 18 00                               |... ..|
```