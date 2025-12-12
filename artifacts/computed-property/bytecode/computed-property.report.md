# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/computed-property.ts
**生成时间**: 2025-12-12T09:59:18.492Z

## 大小对比

- TypeScript编译器: 177 字节
- WASM编译器: 156 字节
- 差异: 21 字节 (13.46%)

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
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "<eval>",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "_ret_",
      "offset": 9
    },
    {
      "index": 2,
      "rawLength": 78,
      "actualLength": 39,
      "isWideChar": 0,
      "string": "__tests__/fixtures/computed-property.js",
      "offset": 15
    }
  ],
  "functionHeader": {
    "offset": 55,
    "tag": "0xc",
    "remaining": 122
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 6,
  "atoms": [
    {
      "index": 0,
      "rawLength": 78,
      "actualLength": 39,
      "isWideChar": 0,
      "string": "__tests__/fixtures/computed-property.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "key",
      "offset": 42
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 46
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 50
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 52
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 60
    }
  ],
  "functionHeader": {
    "offset": 64,
    "tag": "0xd",
    "remaining": 92
  }
}
```

## 字节级差异

共发现 158 个字节差异:

- 偏移量 0x1: TS=0x03 vs WASM=0x06
- 偏移量 0x2: TS=0x0c vs WASM=0x4e
- 偏移量 0x3: TS=0x3c vs WASM=0x5f
- 偏移量 0x4: TS=0x65 vs WASM=0x5f
- 偏移量 0x5: TS=0x76 vs WASM=0x74
- 偏移量 0x6: TS=0x61 vs WASM=0x65
- 偏移量 0x7: TS=0x6c vs WASM=0x73
- 偏移量 0x8: TS=0x3e vs WASM=0x74
- 偏移量 0x9: TS=0x0a vs WASM=0x73
- 偏移量 0xb: TS=0x72 vs WASM=0x5f
- 偏移量 0xc: TS=0x65 vs WASM=0x2f
- 偏移量 0xd: TS=0x74 vs WASM=0x66
- 偏移量 0xe: TS=0x5f vs WASM=0x69
- 偏移量 0xf: TS=0x4e vs WASM=0x78
- 偏移量 0x10: TS=0x5f vs WASM=0x74
- 偏移量 0x11: TS=0x5f vs WASM=0x75
- 偏移量 0x12: TS=0x74 vs WASM=0x72
- 偏移量 0x15: TS=0x74 vs WASM=0x2f
- 偏移量 0x16: TS=0x73 vs WASM=0x63
- 偏移量 0x17: TS=0x5f vs WASM=0x6f
- ... (显示前20个差异，总共158个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 03 0c 3c 65 76 61 6c 3e 0a 5f 72 65 74 5f 4e |...<eval>._ret_N|
00000010: 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 |__tests__/fixtur|
00000020: 65 73 2f 63 6f 6d 70 75 74 65 64 2d 70 72 6f 70 |es/computed-prop|
00000030: 65 72 74 79 2e 6a 73 0c 02 06 00 00 00 00 00 00 |erty.js.........|
00000040: 01 00 05 00 00 41 01 01 00 00 00 00 00 00 40 e6 |.....A........@.|
00000050: 00 00 00 01 40 e8 00 00 00 01 b6 01 00 04 e7 00 |....@...........|
00000060: 00 00 3b e6 00 00 00 0b 39 e6 00 00 00 cb 53 3b |..;.....9.....S;|
00000070: e8 00 00 00 39 e9 00 00 00 43 ea 00 00 00 39 e8 |....9....C....9.|
00000080: 00 00 00 39 e6 00 00 00 48 24 01 00 de da 28 02 |...9....H$....(.|
00000090: 00 00 00 1c 00 00 11 18 1b 0b 26 0b 02 18 07 06 |..........&.....|
000000a0: 25 0c 07 0d 07 0f 26 0b 3e 18 25 08 25 07 07 17 |%.....&.>.%.%...|
000000b0: 00                                              |.|
```

### WASM
```
00000000: 05 06 4e 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |..N__tests__/fix|
00000010: 74 75 72 65 73 2f 63 6f 6d 70 75 74 65 64 2d 70 |tures/computed-p|
00000020: 72 6f 70 65 72 74 79 2e 6a 73 06 6b 65 79 06 6f |roperty.js.key.o|
00000030: 62 6a 02 61 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 |bj.a.console.log|
00000040: 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 |......... ......|
00000050: 00 04 02 00 2a 00 ca 03 00 0d cc 03 01 0d 08 ec |....*...........|
00000060: 02 29 04 e7 00 00 00 e3 0b 68 00 00 74 b8 53 0e |.).......h..t.S.|
00000070: e4 39 e8 00 00 00 43 e9 00 00 00 68 01 00 68 00 |.9....C....h..h.|
00000080: 00 48 24 01 00 0e 06 2f c8 03 10 00 00 3a 1e 2b |.H$..../.....:.+|
00000090: 1d 1b 0e 1b 0a 11 08 11 01 07 07 00             |............|
```