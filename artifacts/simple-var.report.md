# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/simple-var.ts
**生成时间**: 2025-09-24T09:28:27.963Z

## 大小对比

- TypeScript编译器: 66 字节
- WASM编译器: 86 字节
- 差异: -20 字节 (-23.26%)

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
      "rawLength": 41,
      "actualLength": 20,
      "isWideChar": 1,
      "string": "__tests__/compiler/f",
      "offset": 2
    },
    {
      "index": 1,
      "error": "String extends beyond bytecode"
    }
  ],
  "functionHeader": {
    "offset": 24,
    "tag": "0x78",
    "remaining": 42
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

共发现 34 个字节差异:

- 偏移量 0x2: TS=0x29 vs WASM=0x52
- 偏移量 0x2a: TS=0x74 vs WASM=0x6a
- 偏移量 0x2c: TS=0x01 vs WASM=0x02
- 偏移量 0x2f: TS=0x00 vs WASM=0xc8
- 偏移量 0x30: TS=0x01 vs WASM=0x03
- 偏移量 0x34: TS=0x0d vs WASM=0x00
- 偏移量 0x35: TS=0x08 vs WASM=0x00
- 偏移量 0x36: TS=0x6c vs WASM=0x0c
- 偏移量 0x37: TS=0x04 vs WASM=0x20
- 偏移量 0x38: TS=0x00 vs WASM=0x06
- 偏移量 0x39: TS=0x29 vs WASM=0x01
- 偏移量 0x3a: TS=0x01 vs WASM=0xa4
- 偏移量 0x3f: TS=0x61 vs WASM=0x01
- 偏移量 0x40: TS=0x00 vs WASM=0x01
- 偏移量 0x42: TS=EOF vs WASM=0x08
- 偏移量 0x43: TS=EOF vs WASM=0x00
- 偏移量 0x44: TS=EOF vs WASM=0xca
- 偏移量 0x45: TS=EOF vs WASM=0x03
- 偏移量 0x46: TS=EOF vs WASM=0x00
- 偏移量 0x47: TS=EOF vs WASM=0x0d
- ... (显示前20个差异，总共34个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 02 29 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..)__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 73 |piler/fixtures/s|
00000020: 69 6d 70 6c 65 2d 76 61 72 2e 74 73 01 78 0d 00 |imple-var.ts.x..|
00000030: 01 00 00 00 0d 08 6c 04 00 29 01 01 00 00 00 61 |......l..).....a|
00000040: 00 00                                           |..|
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