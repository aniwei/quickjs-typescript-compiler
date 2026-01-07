# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/computed-property-object-spread-method-065.ts
**生成时间**: 2026-01-07T15:09:29.380Z

## 大小对比

- TypeScript编译器: 356 字节
- WASM编译器: 356 字节
- 差异: 0 字节 (0.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 10,
  "atoms": [
    {
      "index": 0,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "k",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 4
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 6
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 8
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 10
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "m",
      "offset": 12
    },
    {
      "index": 6,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 14
    },
    {
      "index": 7,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 22
    },
    {
      "index": 8,
      "rawLength": 128,
      "actualLength": 64,
      "isWideChar": 0,
      "string": "__tests__/fixtures/computed-property-object-spread-method-065.js",
      "offset": 26
    },
    {
      "index": 9,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "z",
      "offset": 92
    }
  ],
  "functionHeader": {
    "offset": 94,
    "tag": "0xc",
    "remaining": 262
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 10,
  "atoms": [
    {
      "index": 0,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "k",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 4
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 6
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 8
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 10
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "m",
      "offset": 12
    },
    {
      "index": 6,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 14
    },
    {
      "index": 7,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 22
    },
    {
      "index": 8,
      "rawLength": 128,
      "actualLength": 64,
      "isWideChar": 0,
      "string": "__tests__/fixtures/computed-property-object-spread-method-065.js",
      "offset": 26
    },
    {
      "index": 9,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "z",
      "offset": 92
    }
  ],
  "functionHeader": {
    "offset": 94,
    "tag": "0xc",
    "remaining": 262
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 0a 02 6b 02 61 02 62 02 78 02 79 02 6d 0e 63 |...k.a.b.x.y.m.c|
00000010: 6f 6e 73 6f 6c 65 06 6c 6f 67 80 01 5f 5f 74 65 |onsole.log..__te|
00000020: 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 73 2f 63 |sts__/fixtures/c|
00000030: 6f 6d 70 75 74 65 64 2d 70 72 6f 70 65 72 74 79 |omputed-property|
00000040: 2d 6f 62 6a 65 63 74 2d 73 70 72 65 61 64 2d 6d |-object-spread-m|
00000050: 65 74 68 6f 64 2d 30 36 35 2e 6a 73 02 7a 0c 00 |ethod-065.js.z..|
00000060: 06 00 a4 01 00 01 00 05 00 01 98 01 01 a6 01 00 |................|
00000070: 00 00 40 e4 00 00 00 80 40 e5 00 00 00 80 40 e6 |..@.....@.....@.|
00000080: 00 00 00 80 3f e4 00 00 00 80 3f e5 00 00 00 80 |....?.....?.....|
00000090: 3f e6 00 00 00 80 04 e4 00 00 00 bf 41 ba 9e 9f |?...........A...|
000000a0: 3b e4 00 00 00 0b 39 e4 00 00 00 74 bf 41 53 0e |;.....9....t.AS.|
000000b0: b8 4e e7 00 00 00 3b e5 00 00 00 0b 39 e5 00 00 |.N....;.....9...|
000000c0: 00 07 55 06 0e 0e b9 4e e8 00 00 00 c2 00 56 e9 |..U....N......V.|
000000d0: 00 00 00 04 3b e6 00 00 00 39 ea 00 00 00 43 eb |....;....9....C.|
000000e0: 00 00 00 39 e6 00 00 00 43 e9 00 00 00 bc 24 01 |...9....C.....$.|
000000f0: 00 39 e6 00 00 00 42 e7 00 00 00 39 e6 00 00 00 |.9....B....9....|
00000100: 42 e8 00 00 00 24 03 00 cf 28 d8 03 1e 00 00 df |B....$...(......|
00000110: 28 07 0b 26 01 71 04 94 1d 1b 0e 1b 0a 1b 02 20 |(..&.q......... |
00000120: 04 11 0a 1b 02 1b 08 1b 02 1b 1d 00 0c 42 07 00 |.............B..|
00000130: 00 01 01 01 02 00 00 12 02 da 03 00 01 00 10 00 |................|
00000140: 01 00 08 cb c7 39 e4 00 00 00 48 11 b2 ec 03 0e |.....9....H.....|
00000150: b7 d3 9f 28 d8 03 0c 03 18 11 28 1b 01 25 18 07 |...(......(..%..|
00000160: 03 07 2b 00                                     |..+.|
```

### WASM
```
00000000: 05 0a 02 6b 02 61 02 62 02 78 02 79 02 6d 0e 63 |...k.a.b.x.y.m.c|
00000010: 6f 6e 73 6f 6c 65 06 6c 6f 67 80 01 5f 5f 74 65 |onsole.log..__te|
00000020: 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 73 2f 63 |sts__/fixtures/c|
00000030: 6f 6d 70 75 74 65 64 2d 70 72 6f 70 65 72 74 79 |omputed-property|
00000040: 2d 6f 62 6a 65 63 74 2d 73 70 72 65 61 64 2d 6d |-object-spread-m|
00000050: 65 74 68 6f 64 2d 30 36 35 2e 6a 73 02 7a 0c 00 |ethod-065.js.z..|
00000060: 06 00 a4 01 00 01 00 05 00 01 98 01 01 a6 01 00 |................|
00000070: 00 00 40 e4 00 00 00 80 40 e5 00 00 00 80 40 e6 |..@.....@.....@.|
00000080: 00 00 00 80 3f e4 00 00 00 80 3f e5 00 00 00 80 |....?.....?.....|
00000090: 3f e6 00 00 00 80 04 e4 00 00 00 bf 41 ba 9e 9f |?...........A...|
000000a0: 3b e4 00 00 00 0b 39 e4 00 00 00 74 bf 41 53 0e |;.....9....t.AS.|
000000b0: b8 4e e7 00 00 00 3b e5 00 00 00 0b 39 e5 00 00 |.N....;.....9...|
000000c0: 00 07 55 06 0e 0e b9 4e e8 00 00 00 c2 00 56 e9 |..U....N......V.|
000000d0: 00 00 00 04 3b e6 00 00 00 39 ea 00 00 00 43 eb |....;....9....C.|
000000e0: 00 00 00 39 e6 00 00 00 43 e9 00 00 00 bc 24 01 |...9....C.....$.|
000000f0: 00 39 e6 00 00 00 42 e7 00 00 00 39 e6 00 00 00 |.9....B....9....|
00000100: 42 e8 00 00 00 24 03 00 cf 28 d8 03 1e 00 00 df |B....$...(......|
00000110: 28 07 0b 26 01 71 04 94 1d 1b 0e 1b 0a 1b 02 20 |(..&.q......... |
00000120: 04 11 0a 1b 02 1b 08 1b 02 1b 1d 00 0c 42 07 00 |.............B..|
00000130: 00 01 01 01 02 00 00 12 02 da 03 00 01 00 10 00 |................|
00000140: 01 00 08 cb c7 39 e4 00 00 00 48 11 b2 ec 03 0e |.....9....H.....|
00000150: b7 d3 9f 28 d8 03 0c 03 18 11 28 1b 01 25 18 07 |...(......(..%..|
00000160: 03 07 2b 00                                     |..+.|
```