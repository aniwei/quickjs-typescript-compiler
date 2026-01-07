# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/regexp-literal.ts
**生成时间**: 2026-01-07T03:19:54.274Z

## 大小对比

- TypeScript编译器: 349 字节
- WASM编译器: 349 字节
- 差异: 0 字节 (0.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 9,
  "atoms": [
    {
      "index": 0,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "C",
      "offset": 6
    },
    {
      "index": 2,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "inst",
      "offset": 8
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 13
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 15
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 23
    },
    {
      "index": 6,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 27
    },
    {
      "index": 7,
      "rawLength": 72,
      "actualLength": 36,
      "isWideChar": 0,
      "string": "__tests__/fixtures/regexp-literal.js",
      "offset": 29
    },
    {
      "index": 8,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "v",
      "offset": 66
    }
  ],
  "functionHeader": {
    "offset": 68,
    "tag": "0xc",
    "remaining": 281
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 9,
  "atoms": [
    {
      "index": 0,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "C",
      "offset": 6
    },
    {
      "index": 2,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "inst",
      "offset": 8
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 13
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 15
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 23
    },
    {
      "index": 6,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 27
    },
    {
      "index": 7,
      "rawLength": 72,
      "actualLength": 36,
      "isWideChar": 0,
      "string": "__tests__/fixtures/regexp-literal.js",
      "offset": 29
    },
    {
      "index": 8,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "v",
      "offset": 66
    }
  ],
  "functionHeader": {
    "offset": 68,
    "tag": "0xc",
    "remaining": 281
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 09 06 6f 62 6a 02 43 08 69 6e 73 74 02 78 0e |...obj.C.inst.x.|
00000010: 63 6f 6e 73 6f 6c 65 06 6c 6f 67 02 79 48 5f 5f |console.log.yH__|
00000020: 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 73 |tests__/fixtures|
00000030: 2f 72 65 67 65 78 70 2d 6c 69 74 65 72 61 6c 2e |/regexp-literal.|
00000040: 6a 73 02 76 0c 00 06 00 a4 01 00 01 00 04 00 01 |js.v............|
00000050: a5 01 01 a6 01 00 00 00 40 e4 00 00 00 80 40 e5 |........@.....@.|
00000060: 00 00 00 40 40 e6 00 00 00 80 3f e4 00 00 00 80 |...@@.....?.....|
00000070: c2 00 41 e5 00 00 00 00 3f e6 00 00 00 80 0b b8 |..A.....?.......|
00000080: 4e e7 00 00 00 3b e4 00 00 00 39 e8 00 00 00 43 |N....;....9....C|
00000090: e9 00 00 00 04 e7 00 00 00 39 e4 00 00 00 aa 24 |.........9.....$|
000000a0: 01 00 cb 39 e8 00 00 00 43 e9 00 00 00 04 ea 00 |...9....C.......|
000000b0: 00 00 39 e4 00 00 00 aa 24 01 00 cb 39 e5 00 00 |..9.....$...9...|
000000c0: 00 11 21 00 00 3b e6 00 00 00 39 e8 00 00 00 43 |..!..;....9....C|
000000d0: e9 00 00 00 39 e6 00 00 00 39 e5 00 00 00 a9 24 |....9....9.....$|
000000e0: 01 00 cb 39 e8 00 00 00 43 e9 00 00 00 39 e6 00 |...9....C....9..|
000000f0: 00 00 39 9d 00 00 00 a9 24 01 00 cf 28 d6 03 36 |..9.....$...(..6|
00000100: 00 00 00 32 08 00 1b 0e 34 18 1b 05 07 09 17 15 |...2....4.......|
00000110: 1b 0e 34 18 1b 05 07 09 00 04 0a 0c 20 02 2b 23 |..4......... .+#|
00000120: 1b 0e 1b 0a 1b 20 1b 15 07 0b 17 15 1b 0e 1b 0a |..... ..........|
00000130: 1b 20 1b 15 07 0b 00 0c 43 06 00 ca 03 00 01 00 |. ......C.......|
00000140: 02 00 00 0a 01 10 00 01 00 08 cb c7 b8 44 ec 00 |.............D..|
00000150: 00 00 29 d6 03 06 07 00 0d 08 07 08 00          |..)..........|
```

### WASM
```
00000000: 05 09 06 6f 62 6a 02 43 08 69 6e 73 74 02 78 0e |...obj.C.inst.x.|
00000010: 63 6f 6e 73 6f 6c 65 06 6c 6f 67 02 79 48 5f 5f |console.log.yH__|
00000020: 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 73 |tests__/fixtures|
00000030: 2f 72 65 67 65 78 70 2d 6c 69 74 65 72 61 6c 2e |/regexp-literal.|
00000040: 6a 73 02 76 0c 00 06 00 a4 01 00 01 00 04 00 01 |js.v............|
00000050: a5 01 01 a6 01 00 00 00 40 e4 00 00 00 80 40 e5 |........@.....@.|
00000060: 00 00 00 40 40 e6 00 00 00 80 3f e4 00 00 00 80 |...@@.....?.....|
00000070: c2 00 41 e5 00 00 00 00 3f e6 00 00 00 80 0b b8 |..A.....?.......|
00000080: 4e e7 00 00 00 3b e4 00 00 00 39 e8 00 00 00 43 |N....;....9....C|
00000090: e9 00 00 00 04 e7 00 00 00 39 e4 00 00 00 aa 24 |.........9.....$|
000000a0: 01 00 cb 39 e8 00 00 00 43 e9 00 00 00 04 ea 00 |...9....C.......|
000000b0: 00 00 39 e4 00 00 00 aa 24 01 00 cb 39 e5 00 00 |..9.....$...9...|
000000c0: 00 11 21 00 00 3b e6 00 00 00 39 e8 00 00 00 43 |..!..;....9....C|
000000d0: e9 00 00 00 39 e6 00 00 00 39 e5 00 00 00 a9 24 |....9....9.....$|
000000e0: 01 00 cb 39 e8 00 00 00 43 e9 00 00 00 39 e6 00 |...9....C....9..|
000000f0: 00 00 39 9d 00 00 00 a9 24 01 00 cf 28 d6 03 36 |..9.....$...(..6|
00000100: 00 00 00 32 08 00 1b 0e 34 18 1b 05 07 09 17 15 |...2....4.......|
00000110: 1b 0e 34 18 1b 05 07 09 00 04 0a 0c 20 02 2b 23 |..4......... .+#|
00000120: 1b 0e 1b 0a 1b 20 1b 15 07 0b 17 15 1b 0e 1b 0a |..... ..........|
00000130: 1b 20 1b 15 07 0b 00 0c 43 06 00 ca 03 00 01 00 |. ......C.......|
00000140: 02 00 00 0a 01 10 00 01 00 08 cb c7 b8 44 ec 00 |.............D..|
00000150: 00 00 29 d6 03 06 07 00 0d 08 07 08 00          |..)..........|
```