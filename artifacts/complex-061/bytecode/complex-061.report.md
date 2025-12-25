# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures_generated/complex-061.ts
**生成时间**: 2025-12-25T01:17:44.058Z

## 大小对比

- TypeScript编译器: 260 字节
- WASM编译器: 260 字节
- 差异: 0 字节 (0.00%)

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
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "t",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 4
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "r",
      "offset": 6
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 8
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 16
    },
    {
      "index": 5,
      "rawLength": 86,
      "actualLength": 43,
      "isWideChar": 0,
      "string": "__tests__/fixtures_generated/complex-061.js",
      "offset": 20
    }
  ],
  "functionHeader": {
    "offset": 64,
    "tag": "0xc",
    "remaining": 196
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
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "t",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 4
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "r",
      "offset": 6
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 8
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 16
    },
    {
      "index": 5,
      "rawLength": 86,
      "actualLength": 43,
      "isWideChar": 0,
      "string": "__tests__/fixtures_generated/complex-061.js",
      "offset": 20
    }
  ],
  "functionHeader": {
    "offset": 64,
    "tag": "0xc",
    "remaining": 196
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 06 02 74 02 78 02 72 0e 63 6f 6e 73 6f 6c 65 |...t.x.r.console|
00000010: 06 6c 6f 67 56 5f 5f 74 65 73 74 73 5f 5f 2f 66 |.logV__tests__/f|
00000020: 69 78 74 75 72 65 73 5f 67 65 6e 65 72 61 74 65 |ixtures_generate|
00000030: 64 2f 63 6f 6d 70 6c 65 78 2d 30 36 31 2e 6a 73 |d/complex-061.js|
00000040: 0c 00 06 00 a4 01 00 02 00 04 00 00 87 01 02 a6 |................|
00000050: 01 00 00 00 c8 03 03 00 20 40 e5 00 00 00 80 40 |........ @.....@|
00000060: e6 00 00 00 80 3f e5 00 00 00 82 3f e6 00 00 00 |.....?.....?....|
00000070: 82 bf 3d bb 9e 3b e5 00 00 00 b7 3b e6 00 00 00 |..=..;.....;....|
00000080: 06 cb 39 e5 00 00 00 11 b7 ad ec 11 39 e6 00 00 |..9.........9...|
00000090: 00 b8 9f 11 3a e6 00 00 00 cb ee 06 11 b8 ad ec |....:...........|
000000a0: 11 39 e6 00 00 00 b9 9f 11 3a e6 00 00 00 cb ee |.9.......:......|
000000b0: 16 63 01 00 ba cc 39 e6 00 00 00 64 01 00 9f 11 |.c....9....d....|
000000c0: 3a e6 00 00 00 cb 0e 39 e7 00 00 00 43 e8 00 00 |:......9....C...|
000000d0: 00 39 e5 00 00 00 39 e6 00 00 00 24 02 00 cf 28 |.9....9....$...(|
000000e0: d2 03 20 00 00 8a 16 4a 05 35 08 20 04 4f 0b 20 |.. ....J.5. .O. |
000000f0: 04 00 0f 08 03 1b 0a 11 05 32 13 1b 0e 1b 0a 1b |.........2......|
00000100: 06 1b 07 00                                     |....|
```

### WASM
```
00000000: 05 06 02 74 02 78 02 72 0e 63 6f 6e 73 6f 6c 65 |...t.x.r.console|
00000010: 06 6c 6f 67 56 5f 5f 74 65 73 74 73 5f 5f 2f 66 |.logV__tests__/f|
00000020: 69 78 74 75 72 65 73 5f 67 65 6e 65 72 61 74 65 |ixtures_generate|
00000030: 64 2f 63 6f 6d 70 6c 65 78 2d 30 36 31 2e 6a 73 |d/complex-061.js|
00000040: 0c 00 06 00 a4 01 00 02 00 04 00 00 87 01 02 a6 |................|
00000050: 01 00 00 00 c8 03 03 00 20 40 e5 00 00 00 80 40 |........ @.....@|
00000060: e6 00 00 00 80 3f e5 00 00 00 82 3f e6 00 00 00 |.....?.....?....|
00000070: 82 bf 3d bb 9e 3b e5 00 00 00 b7 3b e6 00 00 00 |..=..;.....;....|
00000080: 06 cb 39 e5 00 00 00 11 b7 ad ec 11 39 e6 00 00 |..9.........9...|
00000090: 00 b8 9f 11 3a e6 00 00 00 cb ee 06 11 b8 ad ec |....:...........|
000000a0: 11 39 e6 00 00 00 b9 9f 11 3a e6 00 00 00 cb ee |.9.......:......|
000000b0: 16 63 01 00 ba cc 39 e6 00 00 00 64 01 00 9f 11 |.c....9....d....|
000000c0: 3a e6 00 00 00 cb 0e 39 e7 00 00 00 43 e8 00 00 |:......9....C...|
000000d0: 00 39 e5 00 00 00 39 e6 00 00 00 24 02 00 cf 28 |.9....9....$...(|
000000e0: d2 03 20 00 00 8a 16 4a 05 35 08 20 04 4f 0b 20 |.. ....J.5. .O. |
000000f0: 04 00 0f 08 03 1b 0a 11 05 32 13 1b 0e 1b 0a 1b |.........2......|
00000100: 06 1b 07 00                                     |....|
```