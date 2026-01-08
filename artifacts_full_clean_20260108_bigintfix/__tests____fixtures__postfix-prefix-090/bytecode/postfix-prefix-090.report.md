# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/postfix-prefix-090.ts
**生成时间**: 2026-01-08T02:49:38.044Z

## 大小对比

- TypeScript编译器: 263 字节
- WASM编译器: 263 字节
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
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "r1",
      "offset": 4
    },
    {
      "index": 2,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "r2",
      "offset": 7
    },
    {
      "index": 3,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "r3",
      "offset": 10
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 13
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 21
    },
    {
      "index": 6,
      "rawLength": 80,
      "actualLength": 40,
      "isWideChar": 0,
      "string": "__tests__/fixtures/postfix-prefix-090.js",
      "offset": 25
    }
  ],
  "functionHeader": {
    "offset": 66,
    "tag": "0xc",
    "remaining": 197
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
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "r1",
      "offset": 4
    },
    {
      "index": 2,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "r2",
      "offset": 7
    },
    {
      "index": 3,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "r3",
      "offset": 10
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 13
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 21
    },
    {
      "index": 6,
      "rawLength": 80,
      "actualLength": 40,
      "isWideChar": 0,
      "string": "__tests__/fixtures/postfix-prefix-090.js",
      "offset": 25
    }
  ],
  "functionHeader": {
    "offset": 66,
    "tag": "0xc",
    "remaining": 197
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 07 02 61 04 72 31 04 72 32 04 72 33 0e 63 6f |...a.r1.r2.r3.co|
00000010: 6e 73 6f 6c 65 06 6c 6f 67 50 5f 5f 74 65 73 74 |nsole.logP__test|
00000020: 73 5f 5f 2f 66 69 78 74 75 72 65 73 2f 70 6f 73 |s__/fixtures/pos|
00000030: 74 66 69 78 2d 70 72 65 66 69 78 2d 30 39 30 2e |tfix-prefix-090.|
00000040: 6a 73 0c 00 06 00 a4 01 00 01 00 06 00 00 8d 01 |js..............|
00000050: 01 a6 01 00 00 00 40 e4 00 00 00 80 40 e5 00 00 |......@.....@...|
00000060: 00 80 40 e6 00 00 00 80 40 e7 00 00 00 80 3f e4 |..@.....@.....?.|
00000070: 00 00 00 82 3f e5 00 00 00 80 3f e6 00 00 00 80 |....?.....?.....|
00000080: 3f e7 00 00 00 80 bf 5a bc 9e 3b e4 00 00 00 39 |?......Z..;....9|
00000090: e4 00 00 00 93 3a e4 00 00 00 3b e5 00 00 00 39 |.....:....;....9|
000000a0: e4 00 00 00 91 11 3a e4 00 00 00 3b e6 00 00 00 |......:....;....|
000000b0: 39 e4 00 00 00 92 3a e4 00 00 00 3b e7 00 00 00 |9.....:....;....|
000000c0: 39 e8 00 00 00 43 e9 00 00 00 39 e5 00 00 00 39 |9....C....9....9|
000000d0: e6 00 00 00 39 e7 00 00 00 39 e4 00 00 00 24 04 |....9....9....$.|
000000e0: 00 cf 28 d4 03 20 00 00 00 33 02 16 21 00 1b 02 |..(.. ...3..!...|
000000f0: 3a 02 1b 03 3f 00 1b 02 3a 17 1b 0e 1b 0a 1b 08 |:...?...:.......|
00000100: 1b 08 1b 08 1b 19 00                            |.......|
```

### WASM
```
00000000: 05 07 02 61 04 72 31 04 72 32 04 72 33 0e 63 6f |...a.r1.r2.r3.co|
00000010: 6e 73 6f 6c 65 06 6c 6f 67 50 5f 5f 74 65 73 74 |nsole.logP__test|
00000020: 73 5f 5f 2f 66 69 78 74 75 72 65 73 2f 70 6f 73 |s__/fixtures/pos|
00000030: 74 66 69 78 2d 70 72 65 66 69 78 2d 30 39 30 2e |tfix-prefix-090.|
00000040: 6a 73 0c 00 06 00 a4 01 00 01 00 06 00 00 8d 01 |js..............|
00000050: 01 a6 01 00 00 00 40 e4 00 00 00 80 40 e5 00 00 |......@.....@...|
00000060: 00 80 40 e6 00 00 00 80 40 e7 00 00 00 80 3f e4 |..@.....@.....?.|
00000070: 00 00 00 82 3f e5 00 00 00 80 3f e6 00 00 00 80 |....?.....?.....|
00000080: 3f e7 00 00 00 80 bf 5a bc 9e 3b e4 00 00 00 39 |?......Z..;....9|
00000090: e4 00 00 00 93 3a e4 00 00 00 3b e5 00 00 00 39 |.....:....;....9|
000000a0: e4 00 00 00 91 11 3a e4 00 00 00 3b e6 00 00 00 |......:....;....|
000000b0: 39 e4 00 00 00 92 3a e4 00 00 00 3b e7 00 00 00 |9.....:....;....|
000000c0: 39 e8 00 00 00 43 e9 00 00 00 39 e5 00 00 00 39 |9....C....9....9|
000000d0: e6 00 00 00 39 e7 00 00 00 39 e4 00 00 00 24 04 |....9....9....$.|
000000e0: 00 cf 28 d4 03 20 00 00 00 33 02 16 21 00 1b 02 |..(.. ...3..!...|
000000f0: 3a 02 1b 03 3f 00 1b 02 3a 17 1b 0e 1b 0a 1b 08 |:...?...:.......|
00000100: 1b 08 1b 08 1b 19 00                            |.......|
```