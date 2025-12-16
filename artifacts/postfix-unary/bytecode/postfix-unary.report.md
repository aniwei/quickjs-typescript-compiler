# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/postfix-unary.ts
**生成时间**: 2025-12-16T14:11:02.578Z

## 大小对比

- TypeScript编译器: 183 字节
- WASM编译器: 193 字节
- 差异: -10 字节 (-5.18%)

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
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 4
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 12
    },
    {
      "index": 3,
      "rawLength": 70,
      "actualLength": 35,
      "isWideChar": 0,
      "string": "__tests__/fixtures/postfix-unary.js",
      "offset": 16
    }
  ],
  "functionHeader": {
    "offset": 52,
    "tag": "0xc",
    "remaining": 131
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
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 4
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 12
    },
    {
      "index": 3,
      "rawLength": 70,
      "actualLength": 35,
      "isWideChar": 0,
      "string": "__tests__/fixtures/postfix-unary.js",
      "offset": 16
    }
  ],
  "functionHeader": {
    "offset": 52,
    "tag": "0xc",
    "remaining": 141
  }
}
```

## 字节级差异

共发现 83 个字节差异:

- 偏移量 0x3d: TS=0x06 vs WASM=0x04
- 偏移量 0x40: TS=0x54 vs WASM=0x58
- 偏移量 0x4c: TS=0x00 vs WASM=0x80
- 偏移量 0x52: TS=0x12 vs WASM=0x82
- 偏移量 0x63: TS=0x7d vs WASM=0x39
- 偏移量 0x68: TS=0x3d vs WASM=0x93
- 偏移量 0x69: TS=0x93 vs WASM=0x3a
- 偏移量 0x6a: TS=0x19 vs WASM=0xe4
- 偏移量 0x6b: TS=0x3e vs WASM=0x00
- 偏移量 0x6c: TS=0x24 vs WASM=0x00
- 偏移量 0x6d: TS=0x01 vs WASM=0x00
- 偏移量 0x6e: TS=0x00 vs WASM=0x24
- 偏移量 0x6f: TS=0xcb vs WASM=0x01
- 偏移量 0x70: TS=0x39 vs WASM=0x00
- 偏移量 0x71: TS=0xe5 vs WASM=0xcb
- 偏移量 0x72: TS=0x00 vs WASM=0x39
- 偏移量 0x73: TS=0x00 vs WASM=0xe5
- 偏移量 0x75: TS=0x43 vs WASM=0x00
- 偏移量 0x76: TS=0xe6 vs WASM=0x00
- 偏移量 0x77: TS=0x00 vs WASM=0x43
- ... (显示前20个差异，总共83个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 04 02 61 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 |...a.console.log|
00000010: 46 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 |F__tests__/fixtu|
00000020: 72 65 73 2f 70 6f 73 74 66 69 78 2d 75 6e 61 72 |res/postfix-unar|
00000030: 79 2e 6a 73 0c 00 06 00 a4 01 00 01 00 06 00 00 |y.js............|
00000040: 54 01 a6 01 00 00 00 40 e4 00 00 00 00 3f e4 00 |T......@.....?..|
00000050: 00 00 12 b8 3b e4 00 00 00 39 e5 00 00 00 43 e6 |....;....9....C.|
00000060: 00 00 00 7d e4 00 00 00 3d 93 19 3e 24 01 00 cb |...}....=..>$...|
00000070: 39 e5 00 00 00 43 e6 00 00 00 7d e4 00 00 00 3d |9....C....}....=|
00000080: 92 19 3e 24 01 00 cb 39 e5 00 00 00 43 e6 00 00 |..>$...9....C...|
00000090: 00 39 e4 00 00 00 24 01 00 cf 28 ce 03 18 00 00 |.9....$...(.....|
000000a0: 3e 10 07 07 1c 07 52 18 11 17 17 00 52 18 11 17 |>.....R.....R...|
000000b0: 17 00 34 18 1b 17 00                            |..4....|
```

### WASM
```
00000000: 05 04 02 61 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 |...a.console.log|
00000010: 46 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 |F__tests__/fixtu|
00000020: 72 65 73 2f 70 6f 73 74 66 69 78 2d 75 6e 61 72 |res/postfix-unar|
00000030: 79 2e 6a 73 0c 00 06 00 a4 01 00 01 00 04 00 00 |y.js............|
00000040: 58 01 a6 01 00 00 00 40 e4 00 00 00 80 3f e4 00 |X......@.....?..|
00000050: 00 00 82 b8 3b e4 00 00 00 39 e5 00 00 00 43 e6 |....;....9....C.|
00000060: 00 00 00 39 e4 00 00 00 93 3a e4 00 00 00 24 01 |...9.....:....$.|
00000070: 00 cb 39 e5 00 00 00 43 e6 00 00 00 39 e4 00 00 |..9....C....9...|
00000080: 00 92 3a e4 00 00 00 24 01 00 cb 39 e5 00 00 00 |..:....$...9....|
00000090: 43 e6 00 00 00 39 e4 00 00 00 24 01 00 cf 28 ce |C....9....$...(.|
000000a0: 03 1e 00 00 5d 00 1b 0e 1b 0a 1b 02 20 03 17 15 |....]....... ...|
000000b0: 1b 0e 1b 0a 1b 02 20 03 17 15 1b 0e 1b 0a 1b 01 |...... .........|
000000c0: 00                                              |.|
```