# 字节码分析报告

**输入文件**: __tests__/fixtures/binary-ops.ts
**生成时间**: 2025-12-16T11:47:24.566Z

## 大小对比

- TypeScript编译器: 206 字节
- WASM编译器: 196 字节
- 差异: 10 字节 (5.10%)

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
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 10
    },
    {
      "index": 2,
      "rawLength": 64,
      "actualLength": 32,
      "isWideChar": 0,
      "string": "__tests__/fixtures/binary-ops.js",
      "offset": 14
    }
  ],
  "functionHeader": {
    "offset": 47,
    "tag": "0xc",
    "remaining": 159
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
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 10
    },
    {
      "index": 2,
      "rawLength": 64,
      "actualLength": 32,
      "isWideChar": 0,
      "string": "__tests__/fixtures/binary-ops.js",
      "offset": 14
    }
  ],
  "functionHeader": {
    "offset": 47,
    "tag": "0xc",
    "remaining": 149
  }
}
```

## 字节级差异

共发现 47 个字节差异:

- 偏移量 0x9a: TS=0x32 vs WASM=0x28
- 偏移量 0x9d: TS=0x4d vs WASM=0x1b
- 偏移量 0x9e: TS=0x18 vs WASM=0x0e
- 偏移量 0x9f: TS=0x1b vs WASM=0x25
- 偏移量 0xa0: TS=0x08 vs WASM=0x0e
- 偏移量 0xa1: TS=0x1b vs WASM=0x07
- 偏移量 0xa2: TS=0x03 vs WASM=0x05
- 偏移量 0xa3: TS=0x07 vs WASM=0x17
- 偏移量 0xa4: TS=0x1b vs WASM=0x15
- 偏移量 0xa5: TS=0x3a vs WASM=0x1b
- 偏移量 0xa6: TS=0x00 vs WASM=0x0e
- 偏移量 0xa7: TS=0x3e vs WASM=0x25
- 偏移量 0xa8: TS=0x18 vs WASM=0x0e
- 偏移量 0xa9: TS=0x1b vs WASM=0x07
- 偏移量 0xaa: TS=0x08 vs WASM=0x05
- 偏移量 0xab: TS=0x1b vs WASM=0x17
- 偏移量 0xac: TS=0x03 vs WASM=0x15
- 偏移量 0xad: TS=0x07 vs WASM=0x1b
- 偏移量 0xae: TS=0x1b vs WASM=0x0e
- 偏移量 0xaf: TS=0x3a vs WASM=0x25
- ... (显示前20个差异，总共47个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 03 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 40 5f |...console.log@_|
00000010: 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 |_tests__/fixture|
00000020: 73 2f 62 69 6e 61 72 79 2d 6f 70 73 2e 6a 73 0c |s/binary-ops.js.|
00000030: 00 06 00 a4 01 00 01 00 04 00 00 56 01 a6 01 00 |...........V....|
00000040: 00 00 39 e4 00 00 00 43 e5 00 00 00 b8 b9 9f 24 |..9....C.......$|
00000050: 01 00 cb 39 e4 00 00 00 43 e5 00 00 00 b8 b9 a0 |...9....C.......|
00000060: 24 01 00 cb 39 e4 00 00 00 43 e5 00 00 00 b9 ba |$...9....C......|
00000070: 9c 24 01 00 cb 39 e4 00 00 00 43 e5 00 00 00 bb |.$...9....C.....|
00000080: b9 9d 24 01 00 cb 39 e4 00 00 00 43 e5 00 00 00 |..$...9....C....|
00000090: bc b9 9e 24 01 00 cf 28 cc 03 32 00 00 4d 18 1b |...$...(..2..M..|
000000a0: 08 1b 03 07 1b 3a 00 3e 18 1b 08 1b 03 07 1b 3a |.....:.>.......:|
000000b0: 00 3e 18 1b 08 1b 03 07 1b 3a 00 3e 18 1b 08 1b |.>.......:.>....|
000000c0: 03 07 1b 3a 00 3e 18 1b 08 1b 03 07 1b 00       |...:.>........|
```

### WASM
```
00000000: 05 03 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 40 5f |...console.log@_|
00000010: 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 |_tests__/fixture|
00000020: 73 2f 62 69 6e 61 72 79 2d 6f 70 73 2e 6a 73 0c |s/binary-ops.js.|
00000030: 00 06 00 a4 01 00 01 00 04 00 00 56 01 a6 01 00 |...........V....|
00000040: 00 00 39 e4 00 00 00 43 e5 00 00 00 b8 b9 9f 24 |..9....C.......$|
00000050: 01 00 cb 39 e4 00 00 00 43 e5 00 00 00 b8 b9 a0 |...9....C.......|
00000060: 24 01 00 cb 39 e4 00 00 00 43 e5 00 00 00 b9 ba |$...9....C......|
00000070: 9c 24 01 00 cb 39 e4 00 00 00 43 e5 00 00 00 bb |.$...9....C.....|
00000080: b9 9d 24 01 00 cb 39 e4 00 00 00 43 e5 00 00 00 |..$...9....C....|
00000090: bc b9 9e 24 01 00 cf 28 cc 03 28 00 00 1b 0e 25 |...$...(..(....%|
000000a0: 0e 07 05 17 15 1b 0e 25 0e 07 05 17 15 1b 0e 25 |.......%.......%|
000000b0: 0e 07 05 17 15 1b 0e 25 0e 07 05 17 15 1b 0e 25 |.......%.......%|
000000c0: 0e 07 05 00                                     |....|
```