# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/closure-basic.ts
**生成时间**: 2025-12-20T21:36:56.978Z

## 大小对比

- TypeScript编译器: 172 字节
- WASM编译器: 186 字节
- 差异: -14 字节 (-7.53%)

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
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "outer",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 70,
      "actualLength": 35,
      "isWideChar": 0,
      "string": "__tests__/fixtures/closure-basic.js",
      "offset": 8
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 44
    },
    {
      "index": 3,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "inner",
      "offset": 46
    }
  ],
  "functionHeader": {
    "offset": 52,
    "tag": "0xc",
    "remaining": 120
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
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "outer",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 70,
      "actualLength": 35,
      "isWideChar": 0,
      "string": "__tests__/fixtures/closure-basic.js",
      "offset": 8
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 44
    },
    {
      "index": 3,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "inner",
      "offset": 46
    }
  ],
  "functionHeader": {
    "offset": 52,
    "tag": "0xc",
    "remaining": 134
  }
}
```

## 字节级差异

共发现 35 个字节差异:

- 偏移量 0x90: TS=0x00 vs WASM=0x08
- 偏移量 0x92: TS=0x0c vs WASM=0x00
- 偏移量 0x93: TS=0x43 vs WASM=0x00
- 偏移量 0x94: TS=0x06 vs WASM=0x09
- 偏移量 0x95: TS=0x00 vs WASM=0x0a
- 偏移量 0x96: TS=0xce vs WASM=0x16
- 偏移量 0x97: TS=0x03 vs WASM=0x07
- 偏移量 0x98: TS=0x00 vs WASM=0x0d
- 偏移量 0x9a: TS=0x00 vs WASM=0x0c
- 偏移量 0x9b: TS=0x01 vs WASM=0x43
- 偏移量 0x9c: TS=0x01 vs WASM=0x06
- 偏移量 0x9e: TS=0x04 vs WASM=0xce
- 偏移量 0x9f: TS=0x00 vs WASM=0x03
- 偏移量 0xa0: TS=0xcc vs WASM=0x00
- 偏移量 0xa1: TS=0x03 vs WASM=0x00
- 偏移量 0xa3: TS=0x09 vs WASM=0x01
- 偏移量 0xa4: TS=0x68 vs WASM=0x01
- 偏移量 0xa6: TS=0x00 vs WASM=0x04
- 偏移量 0xa7: TS=0x28 vs WASM=0x00
- 偏移量 0xa8: TS=0xca vs WASM=0xcc
- ... (显示前20个差异，总共35个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 04 0a 6f 75 74 65 72 46 5f 5f 74 65 73 74 73 |...outerF__tests|
00000010: 5f 5f 2f 66 69 78 74 75 72 65 73 2f 63 6c 6f 73 |__/fixtures/clos|
00000020: 75 72 65 2d 62 61 73 69 63 2e 6a 73 02 78 0a 69 |ure-basic.js.x.i|
00000030: 6e 6e 65 72 0c 00 06 00 a4 01 00 01 00 01 00 01 |nner............|
00000040: 16 01 a6 01 00 00 00 40 e4 00 00 00 40 c2 00 41 |.......@....@..A|
00000050: e4 00 00 00 00 39 e4 00 00 00 f0 cf 28 ca 03 08 |.....9......(...|
00000060: 00 00 00 0e 0e 00 1b 0a 00 0c 43 06 00 c8 03 00 |..........C.....|
00000070: 02 00 01 00 01 0d 02 cc 03 01 00 60 ce 03 00 00 |...........`....|
00000080: 00 c2 00 cc 63 00 00 bf 0a cb c8 23 00 00 ca 03 |....c......#....|
00000090: 00 00 0c 43 06 00 ce 03 00 00 00 01 01 00 04 00 |...C............|
000000a0: cc 03 00 09 68 00 00 28 ca 03 00 00             |....h..(....|
```

### WASM
```
00000000: 05 04 0a 6f 75 74 65 72 46 5f 5f 74 65 73 74 73 |...outerF__tests|
00000010: 5f 5f 2f 66 69 78 74 75 72 65 73 2f 63 6c 6f 73 |__/fixtures/clos|
00000020: 75 72 65 2d 62 61 73 69 63 2e 6a 73 02 78 0a 69 |ure-basic.js.x.i|
00000030: 6e 6e 65 72 0c 00 06 00 a4 01 00 01 00 01 00 01 |nner............|
00000040: 16 01 a6 01 00 00 00 40 e4 00 00 00 40 c2 00 41 |.......@....@..A|
00000050: e4 00 00 00 00 39 e4 00 00 00 f0 cf 28 ca 03 08 |.....9......(...|
00000060: 00 00 00 0e 0e 00 1b 0a 00 0c 43 06 00 c8 03 00 |..........C.....|
00000070: 02 00 01 00 01 0d 02 cc 03 01 00 60 ce 03 00 00 |...........`....|
00000080: 00 c2 00 cc 63 00 00 bf 0a cb c8 23 00 00 ca 03 |....c......#....|
00000090: 08 00 00 00 09 0a 16 07 0d 00 0c 43 06 00 ce 03 |...........C....|
000000a0: 00 00 00 01 01 00 04 00 cc 03 00 09 68 00 00 28 |............h..(|
000000b0: ca 03 06 02 04 03 16 11 0d 00                   |..........|
```