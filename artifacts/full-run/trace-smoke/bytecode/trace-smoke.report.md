# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/trace-smoke.ts
**生成时间**: 2025-12-04T06:33:09.652Z

## 大小对比

- TypeScript编译器: 207 字节
- WASM编译器: 192 字节
- 差异: 15 字节 (7.81%)

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
      "rawLength": 84,
      "actualLength": 42,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/trace-smoke.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "greet",
      "offset": 45
    },
    {
      "index": 2,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "trace-smoke",
      "offset": 51
    },
    {
      "index": 3,
      "rawLength": 44,
      "actualLength": 22,
      "isWideChar": 0,
      "string": "trace guardrail failed",
      "offset": 63
    }
  ],
  "functionHeader": {
    "offset": 86,
    "tag": "0xd",
    "remaining": 121
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
      "rawLength": 84,
      "actualLength": 42,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/trace-smoke.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "greet",
      "offset": 45
    },
    {
      "index": 2,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "trace-smoke",
      "offset": 51
    },
    {
      "index": 3,
      "rawLength": 44,
      "actualLength": 22,
      "isWideChar": 0,
      "string": "trace guardrail failed",
      "offset": 63
    }
  ],
  "functionHeader": {
    "offset": 86,
    "tag": "0xd",
    "remaining": 106
  }
}
```

## 字节级差异

共发现 89 个字节差异:

- 偏移量 0x65: TS=0x01 vs WASM=0x00
- 偏移量 0x6a: TS=0x24 vs WASM=0x22
- 偏移量 0x6b: TS=0x01 vs WASM=0x00
- 偏移量 0x6e: TS=0x01 vs WASM=0x00
- 偏移量 0x6f: TS=0x00 vs WASM=0x01
- 偏移量 0x70: TS=0x20 vs WASM=0x08
- 偏移量 0x71: TS=0xca vs WASM=0xec
- 偏移量 0x72: TS=0x03 vs WASM=0x05
- 偏移量 0x73: TS=0x00 vs WASM=0xc2
- 偏移量 0x74: TS=0x01 vs WASM=0x00
- 偏移量 0x75: TS=0x08 vs WASM=0xe3
- 偏移量 0x76: TS=0xec vs WASM=0x29
- 偏移量 0x77: TS=0x05 vs WASM=0xdf
- 偏移量 0x78: TS=0xc2 vs WASM=0xf0
- 偏移量 0x79: TS=0x00 vs WASM=0x04
- 偏移量 0x7a: TS=0xe3 vs WASM=0xe6
- 偏移量 0x7b: TS=0x29 vs WASM=0x00
- 偏移量 0x7c: TS=0x5a vs WASM=0x00
- 偏移量 0x7e: TS=0x00 vs WASM=0xae
- 偏移量 0x7f: TS=0xf0 vs WASM=0xec
- ... (显示前20个差异，总共89个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 04 54 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..T__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 74 |piler/fixtures/t|
00000020: 72 61 63 65 2d 73 6d 6f 6b 65 2e 6a 73 0a 67 72 |race-smoke.js.gr|
00000030: 65 65 74 16 74 72 61 63 65 2d 73 6d 6f 6b 65 2c |eet.trace-smoke,|
00000040: 74 72 61 63 65 20 67 75 61 72 64 72 61 69 6c 20 |trace guardrail |
00000050: 66 61 69 6c 65 64 0d c8 03 00 00 00 00 00 0c 20 |failed......... |
00000060: 06 01 a4 01 00 01 00 03 01 01 24 01 ca 03 01 00 |..........$.....|
00000070: 20 ca 03 00 01 08 ec 05 c2 00 e3 29 5a 00 00 f0 | ..........)Z...|
00000080: 04 e6 00 00 00 ae ec 10 39 9f 00 00 00 11 04 e7 |........9.......|
00000090: 00 00 00 21 01 00 30 06 2f c8 03 0c 00 00 00 07 |...!..0./.......|
000000a0: 08 08 11 0a 20 06 12 00 00 0c 43 06 01 ca 03 00 |.... .....C.....|
000000b0: 01 00 01 00 00 0b 01 e6 01 00 00 00 0c 03 5b 00 |..............[.|
000000c0: 00 04 e6 00 00 00 28 c8 03 04 00 00 1c 04 00    |......(........|
```

### WASM
```
00000000: 05 04 54 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..T__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 74 |piler/fixtures/t|
00000020: 72 61 63 65 2d 73 6d 6f 6b 65 2e 6a 73 0a 67 72 |race-smoke.js.gr|
00000030: 65 65 74 16 74 72 61 63 65 2d 73 6d 6f 6b 65 2c |eet.trace-smoke,|
00000040: 74 72 61 63 65 20 67 75 61 72 64 72 61 69 6c 20 |trace guardrail |
00000050: 66 61 69 6c 65 64 0d c8 03 00 00 00 00 00 0c 20 |failed......... |
00000060: 06 01 a4 01 00 00 00 03 01 01 22 00 ca 03 00 01 |..........".....|
00000070: 08 ec 05 c2 00 e3 29 df f0 04 e6 00 00 00 ae ec |......).........|
00000080: 10 39 9f 00 00 00 11 04 e7 00 00 00 21 01 00 30 |.9..........!..0|
00000090: 06 2f c8 03 0e 00 00 28 08 07 0a 20 06 12 04 39 |./.....(... ...9|
000000a0: 0a 11 1d 00 0c 43 06 01 ca 03 00 00 00 01 00 00 |.....C..........|
000000b0: 06 00 04 e6 00 00 00 28 c8 03 04 00 00 1c 08 00 |.......(........|
```