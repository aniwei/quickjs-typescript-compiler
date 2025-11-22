# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/compiler/fixtures/comma-operator.ts
**生成时间**: 2025-11-22T14:52:37.785Z

## 大小对比

- TypeScript编译器: 257 字节
- WASM编译器: 249 字节
- 差异: 8 字节 (3.21%)

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
      "string": "__tests__/compiler/fixtures/comma-operator.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 48
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 50
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 52
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "foo",
      "offset": 54
    },
    {
      "index": 5,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 58
    },
    {
      "index": 6,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 66
    }
  ],
  "functionHeader": {
    "offset": 70,
    "tag": "0xd",
    "remaining": 187
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
      "string": "__tests__/compiler/fixtures/comma-operator.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 48
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 50
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 52
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "foo",
      "offset": 54
    },
    {
      "index": 5,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 58
    },
    {
      "index": 6,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 66
    }
  ],
  "functionHeader": {
    "offset": 70,
    "tag": "0xd",
    "remaining": 179
  }
}
```

## 字节级差异

共发现 90 个字节差异:

- 偏移量 0x73: TS=0xb8 vs WASM=0xb9
- 偏移量 0x74: TS=0x0e vs WASM=0xe3
- 偏移量 0x75: TS=0xb9 vs WASM=0x39
- 偏移量 0x76: TS=0xe3 vs WASM=0xe9
- 偏移量 0x77: TS=0x39 vs WASM=0x00
- 偏移量 0x78: TS=0xe9 vs WASM=0x00
- 偏移量 0x7a: TS=0x00 vs WASM=0x43
- 偏移量 0x7b: TS=0x00 vs WASM=0xea
- 偏移量 0x7c: TS=0x43 vs WASM=0x00
- 偏移量 0x7d: TS=0xea vs WASM=0x00
- 偏移量 0x7f: TS=0x00 vs WASM=0x68
- 偏移量 0x81: TS=0x68 vs WASM=0x00
- 偏移量 0x82: TS=0x00 vs WASM=0x24
- 偏移量 0x83: TS=0x00 vs WASM=0x01
- 偏移量 0x84: TS=0x24 vs WASM=0x00
- 偏移量 0x85: TS=0x01 vs WASM=0x0e
- 偏移量 0x86: TS=0x00 vs WASM=0xb7
- 偏移量 0x87: TS=0x0e vs WASM=0xe4
- 偏移量 0x88: TS=0xb7 vs WASM=0x68
- 偏移量 0x89: TS=0xe4 vs WASM=0x01
- ... (显示前20个差异，总共90个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 07 5a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..Z__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6f 6d 6d 61 2d 6f 70 65 72 61 74 6f 72 2e 6a 73 |omma-operator.js|
00000030: 02 61 02 78 02 62 06 66 6f 6f 0e 63 6f 6e 73 6f |.a.x.b.foo.conso|
00000040: 6c 65 06 6c 6f 67 0d c8 03 00 00 00 00 00 0c 20 |le.log......... |
00000050: 06 01 a4 01 00 00 00 03 04 01 4d 00 ca 03 00 09 |..........M.....|
00000060: cc 03 01 09 ce 03 02 09 d0 03 03 01 08 ec 05 c2 |................|
00000070: 00 e6 29 b8 0e b9 e3 39 e9 00 00 00 43 ea 00 00 |..)....9....C...|
00000080: 00 68 00 00 24 01 00 0e b7 e4 68 01 00 b8 9f 11 |.h..$.....h.....|
00000090: e4 0e 68 01 00 e5 39 e9 00 00 00 43 ea 00 00 00 |..h...9....C....|
000000a0: 68 02 00 24 01 00 0e 39 e9 00 00 00 43 ea 00 00 |h..$...9....C...|
000000b0: 00 e2 f0 24 01 00 0e 06 2f c8 03 28 00 00 2b 00 |...$..../..(..+.|
000000c0: 12 00 1b 0e 1b 0a 11 01 22 04 16 04 07 1d 11 28 |........"......(|
000000d0: 17 27 1b 0e 1b 0a 11 01 00 04 08 15 1b 0e 1b 0a |.'..............|
000000e0: 07 06 07 07 00 0c 43 06 01 d0 03 00 00 00 01 00 |......C.........|
000000f0: 00 06 00 b8 0e b9 0e ba 28 c8 03 04 06 00 08 04 |........(.......|
00000100: 00                                              |.|
```

### WASM
```
00000000: 05 07 5a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..Z__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6f 6d 6d 61 2d 6f 70 65 72 61 74 6f 72 2e 6a 73 |omma-operator.js|
00000030: 02 61 02 78 02 62 06 66 6f 6f 0e 63 6f 6e 73 6f |.a.x.b.foo.conso|
00000040: 6c 65 06 6c 6f 67 0d c8 03 00 00 00 00 00 0c 20 |le.log......... |
00000050: 06 01 a4 01 00 00 00 03 04 01 4d 00 ca 03 00 09 |..........M.....|
00000060: cc 03 01 09 ce 03 02 09 d0 03 03 01 08 ec 05 c2 |................|
00000070: 00 e6 29 b9 e3 39 e9 00 00 00 43 ea 00 00 00 68 |..)..9....C....h|
00000080: 00 00 24 01 00 0e b7 e4 68 01 00 b8 9f 11 69 01 |..$.....h.....i.|
00000090: 00 0e 68 01 00 e5 39 e9 00 00 00 43 ea 00 00 00 |..h...9....C....|
000000a0: 68 02 00 24 01 00 0e 39 e9 00 00 00 43 ea 00 00 |h..$...9....C...|
000000b0: 00 e2 f0 24 01 00 0e 06 2f c8 03 24 00 00 30 00 |...$..../..$..0.|
000000c0: 1b 0e 1b 0a 11 01 22 04 16 04 20 0a 17 27 1b 0e |......"... ..'..|
000000d0: 1b 0a 11 01 00 04 08 15 1b 0e 1b 0a 07 06 07 07 |................|
000000e0: 00 0c 43 06 01 d0 03 00 00 00 01 00 00 02 00 ba |..C.............|
000000f0: 28 c8 03 04 05 00 08 08 00                      |(........|
```