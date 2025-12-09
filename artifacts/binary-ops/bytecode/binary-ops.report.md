# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/binary-ops.ts
**生成时间**: 2025-12-09T14:28:02.593Z

## 大小对比

- TypeScript编译器: 193 字节
- WASM编译器: 213 字节
- 差异: -20 字节 (-9.39%)

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
      "rawLength": 82,
      "actualLength": 41,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/binary-ops.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 44
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 52
    }
  ],
  "functionHeader": {
    "offset": 56,
    "tag": "0xd",
    "remaining": 137
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
      "rawLength": 82,
      "actualLength": 41,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/binary-ops.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 44
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 52
    }
  ],
  "functionHeader": {
    "offset": 56,
    "tag": "0xd",
    "remaining": 157
  }
}
```

## 字节级差异

共发现 40 个字节差异:

- 偏移量 0xab: TS=0x14 vs WASM=0x28
- 偏移量 0xae: TS=0x52 vs WASM=0x2f
- 偏移量 0xaf: TS=0x1c vs WASM=0x0e
- 偏移量 0xb0: TS=0x1c vs WASM=0x25
- 偏移量 0xb1: TS=0x1b vs WASM=0x0e
- 偏移量 0xb2: TS=0x3e vs WASM=0x07
- 偏移量 0xb3: TS=0x1c vs WASM=0x05
- 偏移量 0xb4: TS=0x1c vs WASM=0x17
- 偏移量 0xb5: TS=0x1b vs WASM=0x15
- 偏移量 0xb6: TS=0x3e vs WASM=0x1b
- 偏移量 0xb7: TS=0x1c vs WASM=0x0e
- 偏移量 0xb8: TS=0x1c vs WASM=0x25
- 偏移量 0xb9: TS=0x1b vs WASM=0x0e
- 偏移量 0xba: TS=0x3e vs WASM=0x07
- 偏移量 0xbb: TS=0x1c vs WASM=0x05
- 偏移量 0xbc: TS=0x1c vs WASM=0x17
- 偏移量 0xbd: TS=0x1b vs WASM=0x15
- 偏移量 0xbe: TS=0x3e vs WASM=0x1b
- 偏移量 0xbf: TS=0x1c vs WASM=0x0e
- 偏移量 0xc0: TS=0x00 vs WASM=0x25
- ... (显示前20个差异，总共40个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 03 52 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..R__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 62 |piler/fixtures/b|
00000020: 69 6e 61 72 79 2d 6f 70 73 2e 6a 73 0e 63 6f 6e |inary-ops.js.con|
00000030: 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 00 00 00 00 |sole.log........|
00000040: 0c 20 06 01 a4 01 00 00 00 04 00 00 5b 00 08 ec |. ..........[...|
00000050: 02 29 39 e5 00 00 00 43 e6 00 00 00 b8 b9 9f 24 |.)9....C.......$|
00000060: 01 00 0e 39 e5 00 00 00 43 e6 00 00 00 b8 b9 a0 |...9....C.......|
00000070: 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 00 b9 ba |$...9....C......|
00000080: 9c 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 00 bb |.$...9....C.....|
00000090: b9 9d 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 00 |..$...9....C....|
000000a0: bc b9 9e 24 01 00 0e 06 2f c8 03 14 00 00 52 1c |...$..../.....R.|
000000b0: 1c 1b 3e 1c 1c 1b 3e 1c 1c 1b 3e 1c 1c 1b 3e 1c |..>...>...>...>.|
000000c0: 00                                              |.|
```

### WASM
```
00000000: 05 03 52 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..R__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 62 |piler/fixtures/b|
00000020: 69 6e 61 72 79 2d 6f 70 73 2e 6a 73 0e 63 6f 6e |inary-ops.js.con|
00000030: 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 00 00 00 00 |sole.log........|
00000040: 0c 20 06 01 a4 01 00 00 00 04 00 00 5b 00 08 ec |. ..........[...|
00000050: 02 29 39 e5 00 00 00 43 e6 00 00 00 b8 b9 9f 24 |.)9....C.......$|
00000060: 01 00 0e 39 e5 00 00 00 43 e6 00 00 00 b8 b9 a0 |...9....C.......|
00000070: 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 00 b9 ba |$...9....C......|
00000080: 9c 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 00 bb |.$...9....C.....|
00000090: b9 9d 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 00 |..$...9....C....|
000000a0: bc b9 9e 24 01 00 0e 06 2f c8 03 28 00 00 2f 0e |...$..../..(../.|
000000b0: 25 0e 07 05 17 15 1b 0e 25 0e 07 05 17 15 1b 0e |%.......%.......|
000000c0: 25 0e 07 05 17 15 1b 0e 25 0e 07 05 17 15 1b 0e |%.......%.......|
000000d0: 25 0e 07 05 00                                  |%....|
```