# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/class-field-initializers.ts
**生成时间**: 2026-01-07T15:26:01.209Z

## 大小对比

- TypeScript编译器: 431 字节
- WASM编译器: 431 字节
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
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "C",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 4
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 6
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 14
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 18
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "t",
      "offset": 20
    },
    {
      "index": 6,
      "rawLength": 92,
      "actualLength": 46,
      "isWideChar": 0,
      "string": "__tests__/fixtures/class-field-initializers.js",
      "offset": 22
    },
    {
      "index": 7,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 69
    },
    {
      "index": 8,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "s",
      "offset": 71
    }
  ],
  "functionHeader": {
    "offset": 73,
    "tag": "0xc",
    "remaining": 358
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
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "C",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 4
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 6
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 14
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 18
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "t",
      "offset": 20
    },
    {
      "index": 6,
      "rawLength": 92,
      "actualLength": 46,
      "isWideChar": 0,
      "string": "__tests__/fixtures/class-field-initializers.js",
      "offset": 22
    },
    {
      "index": 7,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 69
    },
    {
      "index": 8,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "s",
      "offset": 71
    }
  ],
  "functionHeader": {
    "offset": 73,
    "tag": "0xc",
    "remaining": 358
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 09 02 43 02 63 0e 63 6f 6e 73 6f 6c 65 06 6c |...C.c.console.l|
00000010: 6f 67 02 62 02 74 5c 5f 5f 74 65 73 74 73 5f 5f |og.b.t\__tests__|
00000020: 2f 66 69 78 74 75 72 65 73 2f 63 6c 61 73 73 2d |/fixtures/class-|
00000030: 66 69 65 6c 64 2d 69 6e 69 74 69 61 6c 69 7a 65 |field-initialize|
00000040: 72 73 2e 6a 73 02 61 02 73 0c 00 06 00 a4 01 00 |rs.js.a.s.......|
00000050: 03 00 03 00 03 83 01 03 a6 01 00 00 00 c8 03 02 |................|
00000060: 00 70 f0 01 03 02 70 40 e4 00 00 00 80 40 e5 00 |.p....p@.....@..|
00000070: 00 00 80 3f e4 00 00 00 82 3f e5 00 00 00 80 63 |...?.....?.....c|
00000080: 01 00 06 63 02 00 c1 00 58 e4 00 00 00 00 1b 1b |...c....X.......|
00000090: 1b 1b c2 01 52 cd 0e d0 11 c2 02 52 24 00 00 0e |....R......R$...|
000000a0: 6b 02 00 6b 01 00 3b e4 00 00 00 39 e4 00 00 00 |k..k..;....9....|
000000b0: 11 21 00 00 3b e5 00 00 00 39 e6 00 00 00 43 e7 |.!..;....9....C.|
000000c0: 00 00 00 39 e5 00 00 00 42 e8 00 00 00 24 01 00 |...9....B....$..|
000000d0: cb 39 e6 00 00 00 43 e7 00 00 00 39 e4 00 00 00 |.9....C....9....|
000000e0: 42 e9 00 00 00 24 01 00 cf 28 d4 03 1c 00 00 00 |B....$...(......|
000000f0: 44 0e 1c 20 02 2b 1d 1b 0e 1b 0a 1b 02 1b 03 17 |D.. .+..........|
00000100: 15 1b 0e 1b 0a 1b 02 1b 03 00 0c 40 05 01 00 00 |...........@....|
00000110: 01 00 02 01 00 0f 01 10 00 01 00 f0 01 02 0d 08 |................|
00000120: cb 2b 68 00 00 11 ec 06 c7 1b 24 00 00 29 d4 03 |.+h.......$..)..|
00000130: 02 06 00 00 0c 48 05 01 00 00 02 00 04 00 00 1d |.....H..........|
00000140: 02 10 00 01 00 ea 01 00 01 00 0c 04 cc 08 cb ee |................|
00000150: 01 c7 b8 4e eb 00 00 00 c7 c7 42 eb 00 00 00 b8 |...N......B.....|
00000160: 9f 4e e8 00 00 00 29 d4 03 06 00 00 55 18 20 06 |.N....).....U. .|
00000170: 00 0c 40 05 01 00 00 01 00 04 01 00 1b 01 10 00 |..@.............|
00000180: 01 00 c8 03 01 0d 08 cb c7 bf 0a 4e ec 00 00 00 |...........N....|
00000190: c7 68 00 00 42 ec 00 00 00 b8 9f 4e e9 00 00 00 |.h..B......N....|
000001a0: 29 d4 03 0a 00 00 00 0b 0a 1e 11 02 20 06 00    |)........... ..|
```

### WASM
```
00000000: 05 09 02 43 02 63 0e 63 6f 6e 73 6f 6c 65 06 6c |...C.c.console.l|
00000010: 6f 67 02 62 02 74 5c 5f 5f 74 65 73 74 73 5f 5f |og.b.t\__tests__|
00000020: 2f 66 69 78 74 75 72 65 73 2f 63 6c 61 73 73 2d |/fixtures/class-|
00000030: 66 69 65 6c 64 2d 69 6e 69 74 69 61 6c 69 7a 65 |field-initialize|
00000040: 72 73 2e 6a 73 02 61 02 73 0c 00 06 00 a4 01 00 |rs.js.a.s.......|
00000050: 03 00 03 00 03 83 01 03 a6 01 00 00 00 c8 03 02 |................|
00000060: 00 70 f0 01 03 02 70 40 e4 00 00 00 80 40 e5 00 |.p....p@.....@..|
00000070: 00 00 80 3f e4 00 00 00 82 3f e5 00 00 00 80 63 |...?.....?.....c|
00000080: 01 00 06 63 02 00 c1 00 58 e4 00 00 00 00 1b 1b |...c....X.......|
00000090: 1b 1b c2 01 52 cd 0e d0 11 c2 02 52 24 00 00 0e |....R......R$...|
000000a0: 6b 02 00 6b 01 00 3b e4 00 00 00 39 e4 00 00 00 |k..k..;....9....|
000000b0: 11 21 00 00 3b e5 00 00 00 39 e6 00 00 00 43 e7 |.!..;....9....C.|
000000c0: 00 00 00 39 e5 00 00 00 42 e8 00 00 00 24 01 00 |...9....B....$..|
000000d0: cb 39 e6 00 00 00 43 e7 00 00 00 39 e4 00 00 00 |.9....C....9....|
000000e0: 42 e9 00 00 00 24 01 00 cf 28 d4 03 1c 00 00 00 |B....$...(......|
000000f0: 44 0e 1c 20 02 2b 1d 1b 0e 1b 0a 1b 02 1b 03 17 |D.. .+..........|
00000100: 15 1b 0e 1b 0a 1b 02 1b 03 00 0c 40 05 01 00 00 |...........@....|
00000110: 01 00 02 01 00 0f 01 10 00 01 00 f0 01 02 0d 08 |................|
00000120: cb 2b 68 00 00 11 ec 06 c7 1b 24 00 00 29 d4 03 |.+h.......$..)..|
00000130: 02 06 00 00 0c 48 05 01 00 00 02 00 04 00 00 1d |.....H..........|
00000140: 02 10 00 01 00 ea 01 00 01 00 0c 04 cc 08 cb ee |................|
00000150: 01 c7 b8 4e eb 00 00 00 c7 c7 42 eb 00 00 00 b8 |...N......B.....|
00000160: 9f 4e e8 00 00 00 29 d4 03 06 00 00 55 18 20 06 |.N....).....U. .|
00000170: 00 0c 40 05 01 00 00 01 00 04 01 00 1b 01 10 00 |..@.............|
00000180: 01 00 c8 03 01 0d 08 cb c7 bf 0a 4e ec 00 00 00 |...........N....|
00000190: c7 68 00 00 42 ec 00 00 00 b8 9f 4e e9 00 00 00 |.h..B......N....|
000001a0: 29 d4 03 0a 00 00 00 0b 0a 1e 11 02 20 06 00    |)........... ..|
```