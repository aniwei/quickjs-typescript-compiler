# 字节码分析报告

**输入文件**: /Users/weiyanhai/Desktop/workspace/quickjs-typescript-compiler/__tests__/compiler/fixtures/tmp-switch-default-middle.ts
**生成时间**: 2025-10-11T18:26:02.528Z

## 大小对比

- TypeScript编译器: 162 字节
- WASM编译器: 164 字节
- 差异: -2 字节 (-1.22%)

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
      "rawLength": 112,
      "actualLength": 56,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/tmp-switch-default-middle.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "mix",
      "offset": 59
    }
  ],
  "functionHeader": {
    "offset": 63,
    "tag": "0xd",
    "remaining": 99
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
      "rawLength": 112,
      "actualLength": 56,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/tmp-switch-default-middle.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "mix",
      "offset": 59
    }
  ],
  "functionHeader": {
    "offset": 63,
    "tag": "0xd",
    "remaining": 101
  }
}
```

## 字节级差异

共发现 49 个字节差异:

- 偏移量 0x68: TS=0x06 vs WASM=0x08
- 偏移量 0x6c: TS=0x09 vs WASM=0x07
- 偏移量 0x6e: TS=0x06 vs WASM=0x00
- 偏移量 0x6f: TS=0x00 vs WASM=0x0c
- 偏移量 0x70: TS=0x0c vs WASM=0x06
- 偏移量 0x71: TS=0x43 vs WASM=0x00
- 偏移量 0x72: TS=0x06 vs WASM=0x0c
- 偏移量 0x73: TS=0x01 vs WASM=0x43
- 偏移量 0x74: TS=0xca vs WASM=0x06
- 偏移量 0x75: TS=0x03 vs WASM=0x01
- 偏移量 0x76: TS=0x01 vs WASM=0xca
- 偏移量 0x77: TS=0x00 vs WASM=0x03
- 偏移量 0x79: TS=0x03 vs WASM=0x00
- 偏移量 0x7a: TS=0x00 vs WASM=0x01
- 偏移量 0x7b: TS=0x00 vs WASM=0x03
- 偏移量 0x7c: TS=0x11 vs WASM=0x00
- 偏移量 0x7d: TS=0x01 vs WASM=0x00
- 偏移量 0x7e: TS=0x84 vs WASM=0x11
- 偏移量 0x80: TS=0x00 vs WASM=0x84
- 偏移量 0x83: TS=0xd3 vs WASM=0x01
- ... (显示前20个差异，总共49个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 02 70 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..p__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 74 |piler/fixtures/t|
00000020: 6d 70 2d 73 77 69 74 63 68 2d 64 65 66 61 75 6c |mp-switch-defaul|
00000030: 74 2d 6d 69 64 64 6c 65 2e 6a 73 06 6d 69 78 0d |t-middle.js.mix.|
00000040: c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 |........ .......|
00000050: 02 01 01 0d 00 ca 03 00 01 08 ec 05 c2 00 e3 29 |...............)|
00000060: df b8 f1 0e 06 2f c8 03 06 00 00 00 09 14 06 00 |...../..........|
00000070: 0c 43 06 01 ca 03 01 00 01 03 00 00 11 01 84 01 |.C..............|
00000080: 00 01 00 d3 11 b7 ad ec 05 b8 28 b9 28 11 b9 ad |..........(.(...|
00000090: ec fa ba 28 c8 03 0a 00 00 03 18 27 00 0e 00 27 |...(.......'...'|
000000a0: 00 00                                           |..|
```

### WASM
```
00000000: 05 02 70 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..p__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 74 |piler/fixtures/t|
00000020: 6d 70 2d 73 77 69 74 63 68 2d 64 65 66 61 75 6c |mp-switch-defaul|
00000030: 74 2d 6d 69 64 64 6c 65 2e 6a 73 06 6d 69 78 0d |t-middle.js.mix.|
00000040: c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 |........ .......|
00000050: 02 01 01 0d 00 ca 03 00 01 08 ec 05 c2 00 e3 29 |...............)|
00000060: df b8 f1 0e 06 2f c8 03 08 00 00 00 07 14 00 0c |...../..........|
00000070: 06 00 0c 43 06 01 ca 03 01 00 01 03 00 00 11 01 |...C............|
00000080: 84 01 00 01 00 d3 11 b7 ad ec 05 b8 28 b9 28 11 |............(.(.|
00000090: b9 ad ec fa ba 28 c8 03 0a 00 00 03 18 27 00 0e |.....(.......'..|
000000a0: 00 27 00 00                                     |.'..|
```