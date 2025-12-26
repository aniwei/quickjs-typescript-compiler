# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/switch-fallthrough-block-scoped-let-080.ts
**生成时间**: 2025-12-26T13:00:18.844Z

## 大小对比

- TypeScript编译器: 278 字节
- WASM编译器: 278 字节
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
      "rawLength": 122,
      "actualLength": 61,
      "isWideChar": 0,
      "string": "__tests__/fixtures/switch-fallthrough-block-scoped-let-080.js",
      "offset": 20
    }
  ],
  "functionHeader": {
    "offset": 82,
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
      "rawLength": 122,
      "actualLength": 61,
      "isWideChar": 0,
      "string": "__tests__/fixtures/switch-fallthrough-block-scoped-let-080.js",
      "offset": 20
    }
  ],
  "functionHeader": {
    "offset": 82,
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
00000010: 06 6c 6f 67 7a 5f 5f 74 65 73 74 73 5f 5f 2f 66 |.logz__tests__/f|
00000020: 69 78 74 75 72 65 73 2f 73 77 69 74 63 68 2d 66 |ixtures/switch-f|
00000030: 61 6c 6c 74 68 72 6f 75 67 68 2d 62 6c 6f 63 6b |allthrough-block|
00000040: 2d 73 63 6f 70 65 64 2d 6c 65 74 2d 30 38 30 2e |-scoped-let-080.|
00000050: 6a 73 0c 00 06 00 a4 01 00 02 00 04 00 00 87 01 |js..............|
00000060: 02 a6 01 00 00 00 c8 03 03 00 20 40 e5 00 00 00 |.......... @....|
00000070: 80 40 e6 00 00 00 80 3f e5 00 00 00 82 3f e6 00 |.@.....?.....?..|
00000080: 00 00 82 bf 50 bb 9e 3b e5 00 00 00 b7 3b e6 00 |....P..;.....;..|
00000090: 00 00 06 cb 39 e5 00 00 00 11 b7 ad ec 11 39 e6 |....9.........9.|
000000a0: 00 00 00 b8 9f 11 3a e6 00 00 00 cb ee 06 11 b8 |......:.........|
000000b0: ad ec 11 39 e6 00 00 00 b9 9f 11 3a e6 00 00 00 |...9.......:....|
000000c0: cb ee 16 63 01 00 ba cc 39 e6 00 00 00 64 01 00 |...c....9....d..|
000000d0: 9f 11 3a e6 00 00 00 cb 0e 39 e7 00 00 00 43 e8 |..:......9....C.|
000000e0: 00 00 00 39 e5 00 00 00 39 e6 00 00 00 24 02 00 |...9....9....$..|
000000f0: cf 28 d2 03 20 00 00 8a 16 4a 05 35 08 20 04 4f |.(.. ....J.5. .O|
00000100: 0b 20 04 00 0f 08 03 1b 0a 11 05 32 13 1b 0e 1b |. .........2....|
00000110: 0a 1b 06 1b 07 00                               |......|
```

### WASM
```
00000000: 05 06 02 74 02 78 02 72 0e 63 6f 6e 73 6f 6c 65 |...t.x.r.console|
00000010: 06 6c 6f 67 7a 5f 5f 74 65 73 74 73 5f 5f 2f 66 |.logz__tests__/f|
00000020: 69 78 74 75 72 65 73 2f 73 77 69 74 63 68 2d 66 |ixtures/switch-f|
00000030: 61 6c 6c 74 68 72 6f 75 67 68 2d 62 6c 6f 63 6b |allthrough-block|
00000040: 2d 73 63 6f 70 65 64 2d 6c 65 74 2d 30 38 30 2e |-scoped-let-080.|
00000050: 6a 73 0c 00 06 00 a4 01 00 02 00 04 00 00 87 01 |js..............|
00000060: 02 a6 01 00 00 00 c8 03 03 00 20 40 e5 00 00 00 |.......... @....|
00000070: 80 40 e6 00 00 00 80 3f e5 00 00 00 82 3f e6 00 |.@.....?.....?..|
00000080: 00 00 82 bf 50 bb 9e 3b e5 00 00 00 b7 3b e6 00 |....P..;.....;..|
00000090: 00 00 06 cb 39 e5 00 00 00 11 b7 ad ec 11 39 e6 |....9.........9.|
000000a0: 00 00 00 b8 9f 11 3a e6 00 00 00 cb ee 06 11 b8 |......:.........|
000000b0: ad ec 11 39 e6 00 00 00 b9 9f 11 3a e6 00 00 00 |...9.......:....|
000000c0: cb ee 16 63 01 00 ba cc 39 e6 00 00 00 64 01 00 |...c....9....d..|
000000d0: 9f 11 3a e6 00 00 00 cb 0e 39 e7 00 00 00 43 e8 |..:......9....C.|
000000e0: 00 00 00 39 e5 00 00 00 39 e6 00 00 00 24 02 00 |...9....9....$..|
000000f0: cf 28 d2 03 20 00 00 8a 16 4a 05 35 08 20 04 4f |.(.. ....J.5. .O|
00000100: 0b 20 04 00 0f 08 03 1b 0a 11 05 32 13 1b 0e 1b |. .........2....|
00000110: 0a 1b 06 1b 07 00                               |......|
```