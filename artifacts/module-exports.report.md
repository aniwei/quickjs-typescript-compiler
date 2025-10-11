# 字节码分析报告

**输入文件**: /Users/weiyanhai/Desktop/workspace/quickjs-typescript-compiler/__tests__/compiler/fixtures/module-exports.ts
**生成时间**: 2025-10-11T10:43:16.390Z

## 大小对比

- TypeScript编译器: 263 字节
- WASM编译器: 269 字节
- 差异: -6 字节 (-2.23%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 7,
  "atoms": [
    {
      "index": 0,
      "rawLength": 90,
      "actualLength": 45,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/module-exports.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "alpha",
      "offset": 48
    },
    {
      "index": 2,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "gamma",
      "offset": 54
    },
    {
      "index": 3,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "delta",
      "offset": 60
    },
    {
      "index": 4,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "beta",
      "offset": 66
    },
    {
      "index": 5,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "helper",
      "offset": 71
    },
    {
      "index": 6,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "offset",
      "offset": 78
    }
  ],
  "functionHeader": {
    "offset": 85,
    "tag": "0xd",
    "remaining": 178
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 7,
  "atoms": [
    {
      "index": 0,
      "rawLength": 90,
      "actualLength": 45,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/module-exports.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "alpha",
      "offset": 48
    },
    {
      "index": 2,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "gamma",
      "offset": 54
    },
    {
      "index": 3,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "delta",
      "offset": 60
    },
    {
      "index": 4,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "beta",
      "offset": 66
    },
    {
      "index": 5,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "helper",
      "offset": 71
    },
    {
      "index": 6,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "offset",
      "offset": 78
    }
  ],
  "functionHeader": {
    "offset": 85,
    "tag": "0xd",
    "remaining": 184
  }
}
```

## 字节级差异

共发现 91 个字节差异:

- 偏移量 0xa4: TS=0x08 vs WASM=0x06
- 偏移量 0xab: TS=0x07 vs WASM=0x00
- 偏移量 0xac: TS=0x1d vs WASM=0x0c
- 偏移量 0xad: TS=0x00 vs WASM=0x43
- 偏移量 0xae: TS=0x0c vs WASM=0x06
- 偏移量 0xaf: TS=0x43 vs WASM=0x01
- 偏移量 0xb0: TS=0x06 vs WASM=0xd2
- 偏移量 0xb1: TS=0x01 vs WASM=0x03
- 偏移量 0xb2: TS=0xd2 vs WASM=0x00
- 偏移量 0xb3: TS=0x03 vs WASM=0x00
- 偏移量 0xb5: TS=0x00 vs WASM=0x01
- 偏移量 0xb6: TS=0x00 vs WASM=0x01
- 偏移量 0xb7: TS=0x01 vs WASM=0x00
- 偏移量 0xb8: TS=0x01 vs WASM=0x04
- 偏移量 0xba: TS=0x04 vs WASM=0xd0
- 偏移量 0xbb: TS=0x00 vs WASM=0x03
- 偏移量 0xbc: TS=0xd0 vs WASM=0x01
- 偏移量 0xbd: TS=0x03 vs WASM=0x0c
- 偏移量 0xbe: TS=0x01 vs WASM=0x68
- 偏移量 0xbf: TS=0x0c vs WASM=0x00
- ... (显示前20个差异，总共91个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 07 5a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..Z__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6d |piler/fixtures/m|
00000020: 6f 64 75 6c 65 2d 65 78 70 6f 72 74 73 2e 6a 73 |odule-exports.js|
00000030: 0a 61 6c 70 68 61 0a 67 61 6d 6d 61 0a 64 65 6c |.alpha.gamma.del|
00000040: 74 61 08 62 65 74 61 0c 68 65 6c 70 65 72 0c 6f |ta.beta.helper.o|
00000050: 66 66 73 65 74 0d c8 03 00 04 00 00 ca 03 00 01 |ffset...........|
00000060: cc 03 00 03 2c 00 04 ce 03 00 00 00 0c 20 06 01 |....,........ ..|
00000070: a4 01 00 00 00 01 05 02 14 00 ca 03 00 0d d0 03 |................|
00000080: 01 0d d2 03 02 01 fc 01 03 09 ce 03 04 01 08 ec |................|
00000090: 0a c2 00 e5 c2 01 61 04 00 29 b8 e3 b9 e4 e1 e6 |......a..)......|
000000a0: 06 2f c8 03 08 00 00 00 10 10 1e 07 1d 00 0c 43 |./.............C|
000000b0: 06 01 d2 03 00 00 00 01 01 00 04 00 d0 03 01 0c |................|
000000c0: 68 00 00 28 c8 03 06 03 00 03 12 11 0d 00 0c 41 |h..(...........A|
000000d0: 06 01 ce 03 01 00 01 02 01 00 10 01 d4 03 00 01 |................|
000000e0: 00 d2 03 02 00 d3 11 f4 ec 06 0e b7 d7 ee 02 0e |................|
000000f0: df f0 d3 9f 28 c8 03 0e 0a 00 02 3e 3a 2b 07 0c |....(......>:+..|
00000100: 07 0a 07 03 07 1f 00                            |.......|
```

### WASM
```
00000000: 05 07 5a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..Z__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6d |piler/fixtures/m|
00000020: 6f 64 75 6c 65 2d 65 78 70 6f 72 74 73 2e 6a 73 |odule-exports.js|
00000030: 0a 61 6c 70 68 61 0a 67 61 6d 6d 61 0a 64 65 6c |.alpha.gamma.del|
00000040: 74 61 08 62 65 74 61 0c 68 65 6c 70 65 72 0c 6f |ta.beta.helper.o|
00000050: 66 66 73 65 74 0d c8 03 00 04 00 00 ca 03 00 01 |ffset...........|
00000060: cc 03 00 03 2c 00 04 ce 03 00 00 00 0c 20 06 01 |....,........ ..|
00000070: a4 01 00 00 00 01 05 02 14 00 ca 03 00 0d d0 03 |................|
00000080: 01 0d d2 03 02 01 fc 01 03 09 ce 03 04 01 08 ec |................|
00000090: 0a c2 00 e5 c2 01 61 04 00 29 b8 e3 b9 e4 e1 e6 |......a..)......|
000000a0: 06 2f c8 03 06 00 00 00 10 10 1e 00 0c 43 06 01 |./...........C..|
000000b0: d2 03 00 00 00 01 01 00 04 00 d0 03 01 0c 68 00 |..............h.|
000000c0: 00 28 c8 03 06 03 00 03 12 11 0d 00 0c 41 06 01 |.(...........A..|
000000d0: ce 03 01 01 00 02 01 00 11 02 d4 03 00 01 00 d4 |................|
000000e0: 03 01 ff ff ff ff 0f 20 d2 03 02 00 63 00 00 d3 |....... ....c...|
000000f0: 11 f4 ec 04 0e b7 db cb df f0 d3 9f 28 c8 03 0c |............(...|
00000100: 0a 07 3f 04 07 0c 07 0a 07 03 07 1f 00          |..?..........|
```