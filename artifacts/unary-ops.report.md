# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/unary-ops.ts
**生成时间**: 2025-12-06T14:46:20.942Z

## 大小对比

- TypeScript编译器: 223 字节
- WASM编译器: 223 字节
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
      "rawLength": 80,
      "actualLength": 40,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/unary-ops.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 43
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 51
    }
  ],
  "functionHeader": {
    "offset": 55,
    "tag": "0xd",
    "remaining": 168
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
      "rawLength": 80,
      "actualLength": 40,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/unary-ops.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 43
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 51
    }
  ],
  "functionHeader": {
    "offset": 55,
    "tag": "0xd",
    "remaining": 168
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 03 50 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..P__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 75 |piler/fixtures/u|
00000020: 6e 61 72 79 2d 6f 70 73 2e 6a 73 0e 63 6f 6e 73 |nary-ops.js.cons|
00000030: 6f 6c 65 06 6c 6f 67 0d c8 03 00 00 00 00 00 0c |ole.log.........|
00000040: 20 06 01 a4 01 00 00 00 03 00 00 64 00 08 ec 02 | ..........d....|
00000050: 29 39 e5 00 00 00 43 e6 00 00 00 0a 98 24 01 00 |)9....C......$..|
00000060: 0e 39 e5 00 00 00 43 e6 00 00 00 b8 97 24 01 00 |.9....C......$..|
00000070: 0e 39 e5 00 00 00 43 e6 00 00 00 b8 8f 24 01 00 |.9....C......$..|
00000080: 0e 39 e5 00 00 00 43 e6 00 00 00 b6 24 01 00 0e |.9....C.....$...|
00000090: 39 e5 00 00 00 43 e6 00 00 00 b8 99 24 01 00 0e |9....C......$...|
000000a0: 39 e5 00 00 00 43 e6 00 00 00 06 24 01 00 0e 06 |9....C.....$....|
000000b0: 2f c8 03 2a 00 00 2f 0e 25 08 17 15 1b 0e 20 0a |/..*../.%..... .|
000000c0: 07 01 17 15 1b 0e 20 0a 07 01 17 15 1b 0e 1b 0a |...... .........|
000000d0: 07 01 17 15 1b 0e 25 08 17 15 1b 0e 20 08 00    |......%..... ..|
```

### WASM
```
00000000: 05 03 50 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..P__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 75 |piler/fixtures/u|
00000020: 6e 61 72 79 2d 6f 70 73 2e 6a 73 0e 63 6f 6e 73 |nary-ops.js.cons|
00000030: 6f 6c 65 06 6c 6f 67 0d c8 03 00 00 00 00 00 0c |ole.log.........|
00000040: 20 06 01 a4 01 00 00 00 03 00 00 64 00 08 ec 02 | ..........d....|
00000050: 29 39 e5 00 00 00 43 e6 00 00 00 0a 98 24 01 00 |)9....C......$..|
00000060: 0e 39 e5 00 00 00 43 e6 00 00 00 b8 97 24 01 00 |.9....C......$..|
00000070: 0e 39 e5 00 00 00 43 e6 00 00 00 b8 8f 24 01 00 |.9....C......$..|
00000080: 0e 39 e5 00 00 00 43 e6 00 00 00 b6 24 01 00 0e |.9....C.....$...|
00000090: 39 e5 00 00 00 43 e6 00 00 00 b8 99 24 01 00 0e |9....C......$...|
000000a0: 39 e5 00 00 00 43 e6 00 00 00 06 24 01 00 0e 06 |9....C.....$....|
000000b0: 2f c8 03 2a 00 00 2f 0e 25 08 17 15 1b 0e 20 0a |/..*../.%..... .|
000000c0: 07 01 17 15 1b 0e 20 0a 07 01 17 15 1b 0e 1b 0a |...... .........|
000000d0: 07 01 17 15 1b 0e 25 08 17 15 1b 0e 20 08 00    |......%..... ..|
```