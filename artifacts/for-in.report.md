# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/for-in.ts
**生成时间**: 2025-12-05T02:02:33.849Z

## 大小对比

- TypeScript编译器: 161 字节
- WASM编译器: 161 字节
- 差异: 0 字节 (0.00%)

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
      "rawLength": 74,
      "actualLength": 37,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/for-in.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 40
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "k",
      "offset": 44
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 46
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 48
    },
    {
      "index": 5,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 50
    },
    {
      "index": 6,
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
    "remaining": 99
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
      "rawLength": 74,
      "actualLength": 37,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/for-in.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "k",
      "offset": 40
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 42
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 46
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 48
    },
    {
      "index": 5,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 50
    },
    {
      "index": 6,
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
    "remaining": 99
  }
}
```

## 字节级差异

共发现 71 个字节差异:

- 偏移量 0x28: TS=0x06 vs WASM=0x02
- 偏移量 0x29: TS=0x6f vs WASM=0x6b
- 偏移量 0x2a: TS=0x62 vs WASM=0x06
- 偏移量 0x2b: TS=0x6a vs WASM=0x6f
- 偏移量 0x2c: TS=0x02 vs WASM=0x62
- 偏移量 0x2d: TS=0x6b vs WASM=0x6a
- 偏移量 0x4d: TS=0x02 vs WASM=0x01
- 偏移量 0x4f: TS=0x03 vs WASM=0x04
- 偏移量 0x50: TS=0x00 vs WASM=0x01
- 偏移量 0x52: TS=0x3b vs WASM=0x34
- 偏移量 0x53: TS=0x02 vs WASM=0x01
- 偏移量 0x56: TS=0x00 vs WASM=0x02
- 偏移量 0x58: TS=0xcc vs WASM=0x30
- 偏移量 0x59: TS=0x03 vs WASM=0xcc
- 偏移量 0x5a: TS=0x00 vs WASM=0x03
- 偏移量 0x5c: TS=0x08 vs WASM=0x0d
- 偏移量 0x5d: TS=0xec vs WASM=0x08
- 偏移量 0x5e: TS=0x02 vs WASM=0xec
- 偏移量 0x5f: TS=0x29 vs WASM=0x02
- 偏移量 0x60: TS=0x0b vs WASM=0x29
- ... (显示前20个差异，总共71个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 07 4a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..J__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 66 |piler/fixtures/f|
00000020: 6f 72 2d 69 6e 2e 6a 73 06 6f 62 6a 02 6b 02 61 |or-in.js.obj.k.a|
00000030: 02 62 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 |.b.console.log..|
00000040: 03 00 00 00 00 00 0c 20 06 01 a4 01 00 02 00 03 |....... ........|
00000050: 00 00 3b 02 ca 03 00 00 cc 03 00 00 08 ec 02 29 |..;............)|
00000060: 0b b8 4e e7 00 00 00 b9 4e e8 00 00 00 5b 00 00 |..N.....N....[..|
00000070: 5a 00 00 7e 6e 14 00 00 00 5b 01 00 39 e9 00 00 |Z..~n....[..9...|
00000080: 00 43 ea 00 00 00 5a 01 00 24 01 00 0e 81 6c e6 |.C....Z..$....l.|
00000090: ff ff ff 0e 0e 06 2f c8 03 06 00 14 01 00 16 01 |....../.........|
000000a0: 00                                              |.|
```

### WASM
```
00000000: 05 07 4a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..J__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 66 |piler/fixtures/f|
00000020: 6f 72 2d 69 6e 2e 6a 73 02 6b 06 6f 62 6a 02 61 |or-in.js.k.obj.a|
00000030: 02 62 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 |.b.console.log..|
00000040: 03 00 00 00 00 00 0c 20 06 01 a4 01 00 01 00 04 |....... ........|
00000050: 01 00 34 01 ca 03 02 00 30 cc 03 00 0d 08 ec 02 |..4.....0.......|
00000060: 29 0b b8 4e e7 00 00 00 b9 4e e8 00 00 00 e3 63 |)..N.....N.....c|
00000070: 00 00 68 00 00 7e ee 13 cb 39 e9 00 00 00 43 ea |..h..~...9....C.|
00000080: 00 00 00 64 00 00 24 01 00 0e 81 ec ec 0e 0e 06 |...d..$.........|
00000090: 2f c8 03 0c 00 00 6c 20 26 17 1b 0e 1b 0a 11 01 |/.....l &.......|
000000a0: 00                                              |.|
```