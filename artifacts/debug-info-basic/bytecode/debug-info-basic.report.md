# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/debug-info-basic.ts
**生成时间**: 2025-12-09T08:59:51.461Z

## 大小对比

- TypeScript编译器: 157 字节
- WASM编译器: 157 字节
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
      "rawLength": 94,
      "actualLength": 47,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/debug-info-basic.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 50
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 58
    }
  ],
  "functionHeader": {
    "offset": 62,
    "tag": "0xd",
    "remaining": 95
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
      "rawLength": 94,
      "actualLength": 47,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/debug-info-basic.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 50
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 58
    }
  ],
  "functionHeader": {
    "offset": 62,
    "tag": "0xd",
    "remaining": 95
  }
}
```

## 字节级差异

共发现 36 个字节差异:

- 偏移量 0x56: TS=0x2f vs WASM=0x02
- 偏移量 0x57: TS=0x39 vs WASM=0x29
- 偏移量 0x58: TS=0xe5 vs WASM=0x39
- 偏移量 0x59: TS=0x00 vs WASM=0xe5
- 偏移量 0x5c: TS=0x43 vs WASM=0x00
- 偏移量 0x5d: TS=0xe6 vs WASM=0x43
- 偏移量 0x5e: TS=0x00 vs WASM=0xe6
- 偏移量 0x61: TS=0xb8 vs WASM=0x00
- 偏移量 0x62: TS=0x24 vs WASM=0xb8
- 偏移量 0x63: TS=0x01 vs WASM=0x24
- 偏移量 0x64: TS=0x00 vs WASM=0x01
- 偏移量 0x65: TS=0x0e vs WASM=0x00
- 偏移量 0x66: TS=0x39 vs WASM=0x0e
- 偏移量 0x67: TS=0xe5 vs WASM=0x39
- 偏移量 0x68: TS=0x00 vs WASM=0xe5
- 偏移量 0x6b: TS=0x43 vs WASM=0x00
- 偏移量 0x6c: TS=0xe6 vs WASM=0x43
- 偏移量 0x6d: TS=0x00 vs WASM=0xe6
- 偏移量 0x70: TS=0xb9 vs WASM=0x00
- 偏移量 0x71: TS=0x24 vs WASM=0xb9
- ... (显示前20个差异，总共36个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 03 5e 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..^__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 64 |piler/fixtures/d|
00000020: 65 62 75 67 2d 69 6e 66 6f 2d 62 61 73 69 63 2e |ebug-info-basic.|
00000030: 6a 73 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 |js.console.log..|
00000040: 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 03 |....... ........|
00000050: 00 00 33 00 08 ec 2f 39 e5 00 00 00 43 e6 00 00 |..3.../9....C...|
00000060: 00 b8 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 00 |..$...9....C....|
00000070: b9 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 00 ba |.$...9....C.....|
00000080: 24 01 00 0e 29 06 2f c8 03 12 00 00 2a 0e 20 08 |$...)./.....*. .|
00000090: 17 15 1b 0e 20 08 17 15 1b 0e 20 08 00          |.... ..... ..|
```

### WASM
```
00000000: 05 03 5e 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..^__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 64 |piler/fixtures/d|
00000020: 65 62 75 67 2d 69 6e 66 6f 2d 62 61 73 69 63 2e |ebug-info-basic.|
00000030: 6a 73 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 |js.console.log..|
00000040: 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 03 |....... ........|
00000050: 00 00 33 00 08 ec 02 29 39 e5 00 00 00 43 e6 00 |..3....)9....C..|
00000060: 00 00 b8 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 |...$...9....C...|
00000070: 00 b9 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 00 |..$...9....C....|
00000080: ba 24 01 00 0e 06 2f c8 03 12 00 00 2f 0e 20 08 |.$..../...../. .|
00000090: 17 15 1b 0e 20 08 17 15 1b 0e 20 08 00          |.... ..... ..|
```