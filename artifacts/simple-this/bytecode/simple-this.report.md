# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/simple-this.ts
**生成时间**: 2025-12-06T02:09:56.501Z

## 大小对比

- TypeScript编译器: 130 字节
- WASM编译器: 130 字节
- 差异: 0 字节 (0.00%)

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
      "rawLength": 84,
      "actualLength": 42,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/simple-this.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "Bar",
      "offset": 45
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 49
    }
  ],
  "functionHeader": {
    "offset": 51,
    "tag": "0xd",
    "remaining": 79
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
      "rawLength": 84,
      "actualLength": 42,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/simple-this.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "Bar",
      "offset": 45
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 49
    }
  ],
  "functionHeader": {
    "offset": 51,
    "tag": "0xd",
    "remaining": 79
  }
}
```

## 字节级差异

共发现 34 个字节差异:

- 偏移量 0x44: TS=0x03 vs WASM=0x01
- 偏移量 0x58: TS=0x00 vs WASM=0x02
- 偏移量 0x5b: TS=0x0c vs WASM=0x00
- 偏移量 0x5c: TS=0x42 vs WASM=0x0c
- 偏移量 0x5d: TS=0x06 vs WASM=0x43
- 偏移量 0x5e: TS=0x00 vs WASM=0x06
- 偏移量 0x5f: TS=0xca vs WASM=0x01
- 偏移量 0x60: TS=0x03 vs WASM=0xca
- 偏移量 0x61: TS=0x00 vs WASM=0x03
- 偏移量 0x62: TS=0x01 vs WASM=0x00
- 偏移量 0x63: TS=0x00 vs WASM=0x01
- 偏移量 0x64: TS=0x03 vs WASM=0x00
- 偏移量 0x65: TS=0x00 vs WASM=0x02
- 偏移量 0x67: TS=0x0c vs WASM=0x00
- 偏移量 0x68: TS=0x01 vs WASM=0x0a
- 偏移量 0x69: TS=0x10 vs WASM=0x01
- 偏移量 0x6a: TS=0x00 vs WASM=0x10
- 偏移量 0x6c: TS=0x00 vs WASM=0x01
- 偏移量 0x6d: TS=0x08 vs WASM=0x00
- 偏移量 0x6e: TS=0xcb vs WASM=0x08
- ... (显示前20个差异，总共34个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 03 54 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..T__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 73 |piler/fixtures/s|
00000020: 69 6d 70 6c 65 2d 74 68 69 73 2e 6a 73 06 42 61 |imple-this.js.Ba|
00000030: 72 02 78 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 |r.x......... ...|
00000040: 01 00 00 00 03 01 01 09 00 ca 03 00 01 08 ec 05 |................|
00000050: c2 00 e3 29 06 2f c8 03 00 00 00 0c 42 06 00 ca |...)./......B...|
00000060: 03 00 01 00 03 00 00 0c 01 10 00 00 00 08 cb b8 |................|
00000070: b8 c7 1b 44 e6 00 00 00 29 c8 03 00 04 0d 0d 0c |...D....).......|
00000080: 77 00                                           |w.|
```

### WASM
```
00000000: 05 03 54 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..T__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 73 |piler/fixtures/s|
00000020: 69 6d 70 6c 65 2d 74 68 69 73 2e 6a 73 06 42 61 |imple-this.js.Ba|
00000030: 72 02 78 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 |r.x......... ...|
00000040: 01 00 00 00 01 01 01 09 00 ca 03 00 01 08 ec 05 |................|
00000050: c2 00 e3 29 06 2f c8 03 02 00 00 00 0c 43 06 01 |...)./.......C..|
00000060: ca 03 00 01 00 02 00 00 0a 01 10 00 01 00 08 cb |................|
00000070: c7 b8 44 e6 00 00 00 29 c8 03 06 00 00 0d 08 07 |..D....)........|
00000080: 08 00                                           |..|
```