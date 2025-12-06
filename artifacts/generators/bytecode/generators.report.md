# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/generators.ts
**生成时间**: 2025-12-06T02:09:56.385Z

## 大小对比

- TypeScript编译器: 204 字节
- WASM编译器: 218 字节
- 差异: -14 字节 (-6.42%)

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
      "rawLength": 82,
      "actualLength": 41,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/generators.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "gen",
      "offset": 44
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "g",
      "offset": 48
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 50
    }
  ],
  "functionHeader": {
    "offset": 52,
    "tag": "0xd",
    "remaining": 152
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
      "rawLength": 82,
      "actualLength": 41,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/generators.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "gen",
      "offset": 44
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "g",
      "offset": 48
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 50
    }
  ],
  "functionHeader": {
    "offset": 52,
    "tag": "0xd",
    "remaining": 166
  }
}
```

## 字节级差异

共发现 117 个字节差异:

- 偏移量 0x45: TS=0x03 vs WASM=0x02
- 偏移量 0x48: TS=0x35 vs WASM=0x32
- 偏移量 0x5a: TS=0x01 vs WASM=0xbf
- 偏移量 0x5c: TS=0x00 vs WASM=0xf1
- 偏移量 0x5d: TS=0x00 vs WASM=0xe4
- 偏移量 0x5e: TS=0x00 vs WASM=0x68
- 偏移量 0x5f: TS=0xf1 vs WASM=0x01
- 偏移量 0x60: TS=0xe4 vs WASM=0x00
- 偏移量 0x61: TS=0x68 vs WASM=0x43
- 偏移量 0x62: TS=0x01 vs WASM=0x6c
- 偏移量 0x64: TS=0x43 vs WASM=0x00
- 偏移量 0x65: TS=0x6c vs WASM=0x00
- 偏移量 0x66: TS=0x00 vs WASM=0x24
- 偏移量 0x69: TS=0x24 vs WASM=0x0e
- 偏移量 0x6a: TS=0x00 vs WASM=0x68
- 偏移量 0x6b: TS=0x00 vs WASM=0x01
- 偏移量 0x6c: TS=0x0e vs WASM=0x00
- 偏移量 0x6d: TS=0x68 vs WASM=0x43
- 偏移量 0x6e: TS=0x01 vs WASM=0x6c
- 偏移量 0x70: TS=0x43 vs WASM=0x00
- ... (显示前20个差异，总共117个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 04 52 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..R__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 67 |piler/fixtures/g|
00000020: 65 6e 65 72 61 74 6f 72 73 2e 6a 73 06 67 65 6e |enerators.js.gen|
00000030: 02 67 02 78 0d c8 03 00 00 00 00 00 0c 20 06 01 |.g.x......... ..|
00000040: a4 01 00 00 00 03 02 01 35 00 ca 03 00 01 cc 03 |........5.......|
00000050: 01 0d 08 ec 05 c2 00 e3 29 df 01 0a 00 00 00 f1 |........).......|
00000060: e4 68 01 00 43 6c 00 00 00 24 00 00 0e 68 01 00 |.h..Cl...$...h..|
00000070: 43 6c 00 00 00 24 00 00 0e 68 01 00 43 6c 00 00 |Cl...$...h..Cl..|
00000080: 00 24 00 00 0e 06 2f c8 03 00 0a 00 07 06 0a 07 |.$..../.........|
00000090: 04 26 72 3f 00 00 0c 52 06 00 ca 03 01 00 01 03 |.&r?...R........|
000000a0: 00 00 14 01 ce 03 00 00 00 89 d3 8a ec 02 2f 0e |............../.|
000000b0: d3 b8 9f 8a ec 02 2f 0e d3 b9 9f 2f 29 c8 03 00 |....../..../)...|
000000c0: 0a 08 0a 21 00 07 04 26 7d 07 04 00             |...!...&}...|
```

### WASM
```
00000000: 05 04 52 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..R__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 67 |piler/fixtures/g|
00000020: 65 6e 65 72 61 74 6f 72 73 2e 6a 73 06 67 65 6e |enerators.js.gen|
00000030: 02 67 02 78 0d c8 03 00 00 00 00 00 0c 20 06 01 |.g.x......... ..|
00000040: a4 01 00 00 00 02 02 01 32 00 ca 03 00 01 cc 03 |........2.......|
00000050: 01 0d 08 ec 05 c2 00 e3 29 df bf 0a f1 e4 68 01 |........).....h.|
00000060: 00 43 6c 00 00 00 24 00 00 0e 68 01 00 43 6c 00 |.Cl...$...h..Cl.|
00000070: 00 00 24 00 00 0e 68 01 00 43 6c 00 00 00 24 00 |..$...h..Cl...$.|
00000080: 00 0e 06 2f c8 03 1a 00 00 00 07 0a 14 11 06 0d |.../............|
00000090: 19 11 02 1b 0a 17 0b 11 02 1b 0a 17 0b 11 02 1b |................|
000000a0: 0a 00 0c 52 06 01 ca 03 01 00 01 02 00 00 13 01 |...R............|
000000b0: ce 03 00 01 00 89 d3 8a ec 02 2f 0e d3 b8 9f 8a |........../.....|
000000c0: ec 02 2f 0e d3 b9 9f 2f c8 03 0e 00 00 08 14 21 |../..../.......!|
000000d0: 00 0c 04 21 01 0c 04 07 11 00                   |...!......|
```