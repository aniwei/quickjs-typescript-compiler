# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/variables-let-block.ts
**生成时间**: 2025-12-09T14:28:02.817Z

## 大小对比

- TypeScript编译器: 161 字节
- WASM编译器: 169 字节
- 差异: -8 字节 (-4.73%)

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
      "rawLength": 100,
      "actualLength": 50,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/variables-let-block.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 53
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 55
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 57
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 65
    }
  ],
  "functionHeader": {
    "offset": 69,
    "tag": "0xd",
    "remaining": 92
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
      "rawLength": 100,
      "actualLength": 50,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/variables-let-block.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 53
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 55
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 57
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 65
    }
  ],
  "functionHeader": {
    "offset": 69,
    "tag": "0xd",
    "remaining": 100
  }
}
```

## 字节级差异

共发现 19 个字节差异:

- 偏移量 0x6b: TS=0x01 vs WASM=0x00
- 偏移量 0x6e: TS=0xcc vs WASM=0xcb
- 偏移量 0x7a: TS=0x01 vs WASM=0x00
- 偏移量 0x95: TS=0x0a vs WASM=0x12
- 偏移量 0x9a: TS=0x34 vs WASM=0x1b
- 偏移量 0x9b: TS=0x18 vs WASM=0x0e
- 偏移量 0x9c: TS=0x27 vs WASM=0x1b
- 偏移量 0x9d: TS=0x1f vs WASM=0x0a
- 偏移量 0x9e: TS=0x34 vs WASM=0x11
- 偏移量 0x9f: TS=0x18 vs WASM=0x01
- 偏移量 0xa0: TS=0x00 vs WASM=0x18
- 偏移量 0xa1: TS=EOF vs WASM=0x1d
- 偏移量 0xa2: TS=EOF vs WASM=0x1b
- 偏移量 0xa3: TS=EOF vs WASM=0x0e
- 偏移量 0xa4: TS=EOF vs WASM=0x1b
- 偏移量 0xa5: TS=EOF vs WASM=0x0a
- 偏移量 0xa6: TS=EOF vs WASM=0x11
- 偏移量 0xa7: TS=EOF vs WASM=0x01
- 偏移量 0xa8: TS=EOF vs WASM=0x00

## 十六进制转储对比

### TypeScript
```
00000000: 05 05 64 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..d__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 76 |piler/fixtures/v|
00000020: 61 72 69 61 62 6c 65 73 2d 6c 65 74 2d 62 6c 6f |ariables-let-blo|
00000030: 63 6b 2e 6a 73 02 62 02 61 0e 63 6f 6e 73 6f 6c |ck.js.b.a.consol|
00000040: 65 06 6c 6f 67 0d c8 03 00 00 00 00 00 0c 20 06 |e.log......... .|
00000050: 01 a4 01 00 01 00 03 01 00 2f 01 ca 03 02 00 20 |........./..... |
00000060: cc 03 00 09 08 ec 02 29 b8 e3 63 01 00 b9 cc 39 |.......)..c....9|
00000070: e7 00 00 00 43 e8 00 00 00 64 01 00 24 01 00 0e |....C....d..$...|
00000080: 39 e7 00 00 00 43 e8 00 00 00 68 00 00 24 01 00 |9....C....h..$..|
00000090: 0e 06 2f c8 03 0a 00 00 3c 08 34 18 27 1f 34 18 |../.....<.4.'.4.|
000000a0: 00                                              |.|
```

### WASM
```
00000000: 05 05 64 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..d__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 76 |piler/fixtures/v|
00000020: 61 72 69 61 62 6c 65 73 2d 6c 65 74 2d 62 6c 6f |ariables-let-blo|
00000030: 63 6b 2e 6a 73 02 62 02 61 0e 63 6f 6e 73 6f 6c |ck.js.b.a.consol|
00000040: 65 06 6c 6f 67 0d c8 03 00 00 00 00 00 0c 20 06 |e.log......... .|
00000050: 01 a4 01 00 01 00 03 01 00 2f 01 ca 03 02 00 20 |........./..... |
00000060: cc 03 00 09 08 ec 02 29 b8 e3 63 00 00 b9 cb 39 |.......)..c....9|
00000070: e7 00 00 00 43 e8 00 00 00 64 00 00 24 01 00 0e |....C....d..$...|
00000080: 39 e7 00 00 00 43 e8 00 00 00 68 00 00 24 01 00 |9....C....h..$..|
00000090: 0e 06 2f c8 03 12 00 00 3c 08 1b 0e 1b 0a 11 01 |../.....<.......|
000000a0: 18 1d 1b 0e 1b 0a 11 01 00                      |.........|
```