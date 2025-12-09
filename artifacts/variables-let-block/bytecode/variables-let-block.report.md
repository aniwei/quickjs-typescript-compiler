# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/variables-let-block.ts
**生成时间**: 2025-12-09T08:59:51.594Z

## 大小对比

- TypeScript编译器: 169 字节
- WASM编译器: 169 字节
- 差异: 0 字节 (0.00%)

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
    "remaining": 100
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

共发现 33 个字节差异:

- 偏移量 0x66: TS=0x2b vs WASM=0x02
- 偏移量 0x67: TS=0xb8 vs WASM=0x29
- 偏移量 0x68: TS=0xe3 vs WASM=0xb8
- 偏移量 0x69: TS=0x63 vs WASM=0xe3
- 偏移量 0x6a: TS=0x00 vs WASM=0x63
- 偏移量 0x6c: TS=0xb9 vs WASM=0x00
- 偏移量 0x6d: TS=0xcb vs WASM=0xb9
- 偏移量 0x6e: TS=0x39 vs WASM=0xcb
- 偏移量 0x6f: TS=0xe7 vs WASM=0x39
- 偏移量 0x70: TS=0x00 vs WASM=0xe7
- 偏移量 0x73: TS=0x43 vs WASM=0x00
- 偏移量 0x74: TS=0xe8 vs WASM=0x43
- 偏移量 0x75: TS=0x00 vs WASM=0xe8
- 偏移量 0x78: TS=0x64 vs WASM=0x00
- 偏移量 0x79: TS=0x00 vs WASM=0x64
- 偏移量 0x7b: TS=0x24 vs WASM=0x00
- 偏移量 0x7c: TS=0x01 vs WASM=0x24
- 偏移量 0x7d: TS=0x00 vs WASM=0x01
- 偏移量 0x7e: TS=0x0e vs WASM=0x00
- 偏移量 0x7f: TS=0x39 vs WASM=0x0e
- ... (显示前20个差异，总共33个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 05 64 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..d__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 76 |piler/fixtures/v|
00000020: 61 72 69 61 62 6c 65 73 2d 6c 65 74 2d 62 6c 6f |ariables-let-blo|
00000030: 63 6b 2e 6a 73 02 62 02 61 0e 63 6f 6e 73 6f 6c |ck.js.b.a.consol|
00000040: 65 06 6c 6f 67 0d c8 03 00 00 00 00 00 0c 20 06 |e.log......... .|
00000050: 01 a4 01 00 01 00 03 01 00 2f 01 ca 03 02 00 20 |........./..... |
00000060: cc 03 00 09 08 ec 2b b8 e3 63 00 00 b9 cb 39 e7 |......+..c....9.|
00000070: 00 00 00 43 e8 00 00 00 64 00 00 24 01 00 0e 39 |...C....d..$...9|
00000080: e7 00 00 00 43 e8 00 00 00 68 00 00 24 01 00 0e |....C....h..$...|
00000090: 29 06 2f c8 03 12 00 00 37 08 1b 0e 1b 0a 11 01 |)./.....7.......|
000000a0: 18 1d 1b 0e 1b 0a 11 01 00                      |.........|
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