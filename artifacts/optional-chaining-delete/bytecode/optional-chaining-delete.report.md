# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/optional-chaining-delete.ts
**生成时间**: 2025-12-23T10:34:39.939Z

## 大小对比

- TypeScript编译器: 409 字节
- WASM编译器: 409 字节
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
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "Counter",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "#x",
      "offset": 10
    },
    {
      "index": 2,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "getY",
      "offset": 13
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 18
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 26
    },
    {
      "index": 5,
      "rawLength": 92,
      "actualLength": 46,
      "isWideChar": 0,
      "string": "__tests__/fixtures/optional-chaining-delete.js",
      "offset": 30
    },
    {
      "index": 6,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 77
    }
  ],
  "functionHeader": {
    "offset": 79,
    "tag": "0xc",
    "remaining": 330
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
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "Counter",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "#x",
      "offset": 10
    },
    {
      "index": 2,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "getY",
      "offset": 13
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 18
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 26
    },
    {
      "index": 5,
      "rawLength": 92,
      "actualLength": 46,
      "isWideChar": 0,
      "string": "__tests__/fixtures/optional-chaining-delete.js",
      "offset": 30
    },
    {
      "index": 6,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 77
    }
  ],
  "functionHeader": {
    "offset": 79,
    "tag": "0xc",
    "remaining": 330
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 07 0e 43 6f 75 6e 74 65 72 04 23 78 08 67 65 |...Counter.#x.ge|
00000010: 74 59 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 5c 5f |tY.console.log\_|
00000020: 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 |_tests__/fixture|
00000030: 73 2f 6f 70 74 69 6f 6e 61 6c 2d 63 68 61 69 6e |s/optional-chain|
00000040: 69 6e 67 2d 64 65 6c 65 74 65 2e 6a 73 02 79 0c |ing-delete.js.y.|
00000050: 00 06 00 a4 01 00 04 00 04 00 03 65 04 a6 01 00 |...........e....|
00000060: 00 00 c8 03 02 00 30 ca 03 03 02 75 f0 01 03 03 |......0....u....|
00000070: 70 40 e4 00 00 00 80 3f e4 00 00 00 82 63 01 00 |p@.....?.....c..|
00000080: 06 63 03 00 63 02 00 c1 01 58 e4 00 00 00 00 1b |.c..c....X......|
00000090: 05 e5 00 00 00 cd 1b 1b 1b 1b c2 00 56 e6 00 00 |............V...|
000000a0: 00 00 1b 06 ce 0e d0 11 c2 02 52 24 00 00 0e 6b |..........R$...k|
000000b0: 03 00 6b 02 00 3b e4 00 00 00 39 e7 00 00 00 43 |..k..;....9....C|
000000c0: e8 00 00 00 39 e4 00 00 00 43 e6 00 00 00 24 00 |....9....C....$.|
000000d0: 00 24 01 00 cf 28 d2 03 10 00 00 00 49 16 00 1b |.$...(......I...|
000000e0: 0e 1b 0a 1b 0e 1b 0a 11 19 00 0c 42 07 01 00 00 |...........B....|
000000f0: 01 00 01 00 00 09 01 10 00 01 00 08 cb c7 42 ea |..............B.|
00000100: 00 00 00 28 d2 03 06 07 0b 12 10 1b 15 00 0c 40 |...(...........@|
00000110: 05 01 00 00 01 00 02 01 00 0f 01 10 00 01 00 f0 |................|
00000120: 01 03 0d 08 cb 2b 68 00 00 11 ec 06 c7 1b 24 00 |.....+h.......$.|
00000130: 00 29 d2 03 02 0a 00 00 0c 40 05 01 00 00 01 00 |.).......@......|
00000140: 04 01 01 17 01 10 00 01 40 ca 03 02 0d 08 cb c7 |........@.......|
00000150: 68 00 00 b8 47 c7 b7 4e ea 00 00 00 c2 00 c7 1b |h...G..N........|
00000160: 24 00 00 29 d2 03 02 00 00 00 0c 42 05 01 00 00 |$..).......B....|
00000170: 00 00 03 02 00 0d 00 10 00 01 ca 03 00 0c df df |................|
00000180: e0 45 bf 0a 9f 44 ea 00 00 00 29 d2 03 0a 04 0b |.E...D....).....|
00000190: 03 05 07 08 07 12 16 08 00                      |.........|
```

### WASM
```
00000000: 05 07 0e 43 6f 75 6e 74 65 72 04 23 78 08 67 65 |...Counter.#x.ge|
00000010: 74 59 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 5c 5f |tY.console.log\_|
00000020: 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 |_tests__/fixture|
00000030: 73 2f 6f 70 74 69 6f 6e 61 6c 2d 63 68 61 69 6e |s/optional-chain|
00000040: 69 6e 67 2d 64 65 6c 65 74 65 2e 6a 73 02 79 0c |ing-delete.js.y.|
00000050: 00 06 00 a4 01 00 04 00 04 00 03 65 04 a6 01 00 |...........e....|
00000060: 00 00 c8 03 02 00 30 ca 03 03 02 75 f0 01 03 03 |......0....u....|
00000070: 70 40 e4 00 00 00 80 3f e4 00 00 00 82 63 01 00 |p@.....?.....c..|
00000080: 06 63 03 00 63 02 00 c1 01 58 e4 00 00 00 00 1b |.c..c....X......|
00000090: 05 e5 00 00 00 cd 1b 1b 1b 1b c2 00 56 e6 00 00 |............V...|
000000a0: 00 00 1b 06 ce 0e d0 11 c2 02 52 24 00 00 0e 6b |..........R$...k|
000000b0: 03 00 6b 02 00 3b e4 00 00 00 39 e7 00 00 00 43 |..k..;....9....C|
000000c0: e8 00 00 00 39 e4 00 00 00 43 e6 00 00 00 24 00 |....9....C....$.|
000000d0: 00 24 01 00 cf 28 d2 03 10 00 00 00 49 16 00 1b |.$...(......I...|
000000e0: 0e 1b 0a 1b 0e 1b 0a 11 19 00 0c 42 07 01 00 00 |...........B....|
000000f0: 01 00 01 00 00 09 01 10 00 01 00 08 cb c7 42 ea |..............B.|
00000100: 00 00 00 28 d2 03 06 07 0b 12 10 1b 15 00 0c 40 |...(...........@|
00000110: 05 01 00 00 01 00 02 01 00 0f 01 10 00 01 00 f0 |................|
00000120: 01 03 0d 08 cb 2b 68 00 00 11 ec 06 c7 1b 24 00 |.....+h.......$.|
00000130: 00 29 d2 03 02 0a 00 00 0c 40 05 01 00 00 01 00 |.).......@......|
00000140: 04 01 01 17 01 10 00 01 40 ca 03 02 0d 08 cb c7 |........@.......|
00000150: 68 00 00 b8 47 c7 b7 4e ea 00 00 00 c2 00 c7 1b |h...G..N........|
00000160: 24 00 00 29 d2 03 02 00 00 00 0c 42 05 01 00 00 |$..).......B....|
00000170: 00 00 03 02 00 0d 00 10 00 01 ca 03 00 0c df df |................|
00000180: e0 45 bf 0a 9f 44 ea 00 00 00 29 d2 03 0a 04 0b |.E...D....).....|
00000190: 03 05 07 08 07 12 16 08 00                      |.........|
```