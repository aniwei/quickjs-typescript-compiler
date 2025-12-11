# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/compiler/fixtures/computed-property.ts
**生成时间**: 2025-12-11T11:32:28.020Z

## 大小对比

- TypeScript编译器: 163 字节
- WASM编译器: 165 字节
- 差异: -2 字节 (-1.21%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 6,
  "atoms": [
    {
      "index": 0,
      "rawLength": 96,
      "actualLength": 48,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/computed-property.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "key",
      "offset": 51
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 55
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 59
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 61
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 69
    }
  ],
  "functionHeader": {
    "offset": 73,
    "tag": "0xd",
    "remaining": 90
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
      "rawLength": 96,
      "actualLength": 48,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/computed-property.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "key",
      "offset": 51
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 55
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 59
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 61
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 69
    }
  ],
  "functionHeader": {
    "offset": 73,
    "tag": "0xd",
    "remaining": 92
  }
}
```

## 字节级差异

共发现 16 个字节差异:

- 偏移量 0x68: TS=0xff vs WASM=0xec
- 偏移量 0x70: TS=0xf6 vs WASM=0xe3
- 偏移量 0x72: TS=0x64 vs WASM=0x68
- 偏移量 0x76: TS=0xcb vs WASM=0xb8
- 偏移量 0x79: TS=0xf7 vs WASM=0xe4
- 偏移量 0x84: TS=0x64 vs WASM=0x68
- 偏移量 0x87: TS=0x64 vs WASM=0x68
- 偏移量 0x93: TS=0x0e vs WASM=0x10
- 偏移量 0x98: TS=0x3f vs WASM=0x2b
- 偏移量 0x9a: TS=0x25 vs WASM=0x1b
- 偏移量 0x9e: TS=0x25 vs WASM=0x11
- 偏移量 0xa0: TS=0x2a vs WASM=0x11
- 偏移量 0xa1: TS=0x09 vs WASM=0x01
- 偏移量 0xa2: TS=0x00 vs WASM=0x07
- 偏移量 0xa3: TS=EOF vs WASM=0x07
- 偏移量 0xa4: TS=EOF vs WASM=0x00

## 十六进制转储对比

### TypeScript
```
00000000: 05 06 60 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..`__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6f 6d 70 75 74 65 64 2d 70 72 6f 70 65 72 74 79 |omputed-property|
00000030: 2e 6a 73 06 6b 65 79 06 6f 62 6a 02 61 0e 63 6f |.js.key.obj.a.co|
00000040: 6e 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 00 00 00 |nsole.log.......|
00000050: 00 0c 20 06 01 a4 01 00 00 00 04 02 00 2a 00 ca |.. ..........*..|
00000060: 03 00 0d cc 03 01 0d 08 ff 02 29 04 e7 00 00 00 |..........).....|
00000070: f6 0b 64 00 00 74 cb 53 0e f7 39 e8 00 00 00 43 |..d..t.S..9....C|
00000080: e9 00 00 00 64 01 00 64 00 00 48 24 01 00 0e 06 |....d..d..H$....|
00000090: 2f c8 03 0e 00 00 3a 1e 3f 1d 25 0e 1b 0a 25 08 |/.....:.?.%...%.|
000000a0: 2a 09 00                                        |*..|
```

### WASM
```
00000000: 05 06 60 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..`__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6f 6d 70 75 74 65 64 2d 70 72 6f 70 65 72 74 79 |omputed-property|
00000030: 2e 6a 73 06 6b 65 79 06 6f 62 6a 02 61 0e 63 6f |.js.key.obj.a.co|
00000040: 6e 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 00 00 00 |nsole.log.......|
00000050: 00 0c 20 06 01 a4 01 00 00 00 04 02 00 2a 00 ca |.. ..........*..|
00000060: 03 00 0d cc 03 01 0d 08 ec 02 29 04 e7 00 00 00 |..........).....|
00000070: e3 0b 68 00 00 74 b8 53 0e e4 39 e8 00 00 00 43 |..h..t.S..9....C|
00000080: e9 00 00 00 68 01 00 68 00 00 48 24 01 00 0e 06 |....h..h..H$....|
00000090: 2f c8 03 10 00 00 3a 1e 2b 1d 1b 0e 1b 0a 11 08 |/.....:.+.......|
000000a0: 11 01 07 07 00                                  |.....|
```