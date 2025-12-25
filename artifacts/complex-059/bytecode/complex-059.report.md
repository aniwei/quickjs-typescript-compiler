# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures_generated/complex-059.ts
**生成时间**: 2025-12-25T01:17:44.046Z

## 大小对比

- TypeScript编译器: 527 字节
- WASM编译器: 527 字节
- 差异: 0 字节 (0.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 15,
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
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "v1",
      "offset": 6
    },
    {
      "index": 2,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "v2",
      "offset": 9
    },
    {
      "index": 3,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "v3",
      "offset": 12
    },
    {
      "index": 4,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "list",
      "offset": 15
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 20
    },
    {
      "index": 6,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 22
    },
    {
      "index": 7,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 24
    },
    {
      "index": 8,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "f",
      "offset": 26
    },
    {
      "index": 9,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 28
    },
    {
      "index": 10,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "z",
      "offset": 30
    },
    {
      "index": 11,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 32
    },
    {
      "index": 12,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 34
    },
    {
      "index": 13,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 42
    },
    {
      "index": 14,
      "rawLength": 86,
      "actualLength": 43,
      "isWideChar": 0,
      "string": "__tests__/fixtures_generated/complex-059.js",
      "offset": 46
    }
  ],
  "functionHeader": {
    "offset": 90,
    "tag": "0xc",
    "remaining": 437
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 15,
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
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "v1",
      "offset": 6
    },
    {
      "index": 2,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "v2",
      "offset": 9
    },
    {
      "index": 3,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "v3",
      "offset": 12
    },
    {
      "index": 4,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "list",
      "offset": 15
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 20
    },
    {
      "index": 6,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 22
    },
    {
      "index": 7,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 24
    },
    {
      "index": 8,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "f",
      "offset": 26
    },
    {
      "index": 9,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 28
    },
    {
      "index": 10,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "z",
      "offset": 30
    },
    {
      "index": 11,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 32
    },
    {
      "index": 12,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 34
    },
    {
      "index": 13,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 42
    },
    {
      "index": 14,
      "rawLength": 86,
      "actualLength": 43,
      "isWideChar": 0,
      "string": "__tests__/fixtures_generated/complex-059.js",
      "offset": 46
    }
  ],
  "functionHeader": {
    "offset": 90,
    "tag": "0xc",
    "remaining": 437
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 0f 06 6f 62 6a 04 76 31 04 76 32 04 76 33 08 |...obj.v1.v2.v3.|
00000010: 6c 69 73 74 02 63 02 62 02 61 02 66 02 78 02 7a |list.c.b.a.f.x.z|
00000020: 02 79 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 56 5f |.y.console.logV_|
00000030: 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 |_tests__/fixture|
00000040: 73 5f 67 65 6e 65 72 61 74 65 64 2f 63 6f 6d 70 |s_generated/comp|
00000050: 6c 65 78 2d 30 35 39 2e 6a 73 0c 00 06 00 a4 01 |lex-059.js......|
00000060: 00 01 00 07 00 01 d5 02 01 a6 01 00 00 00 40 e4 |..............@.|
00000070: 00 00 00 80 40 e5 00 00 00 80 40 e6 00 00 00 80 |....@.....@.....|
00000080: 40 e7 00 00 00 80 40 e8 00 00 00 80 3f e4 00 00 |@.....@.....?...|
00000090: 00 80 3f e5 00 00 00 80 3f e6 00 00 00 80 3f e7 |..?.....?.....?.|
000000a0: 00 00 00 80 3f e8 00 00 00 80 0b 0b 0b bf 3b 4e |....?.........;N|
000000b0: e9 00 00 00 4e ea 00 00 00 4e eb 00 00 00 c2 00 |....N....N......|
000000c0: 4f ec 00 00 00 4e ec 00 00 00 3b e4 00 00 00 39 |O....N....;....9|
000000d0: e4 00 00 00 11 b2 ec 05 0e 06 ee 20 42 eb 00 00 |........... B...|
000000e0: 00 11 b2 ec 05 0e 06 ee 13 42 ea 00 00 00 11 b2 |.........B......|
000000f0: ec 05 0e 06 ee 06 42 e9 00 00 00 11 b2 ec 03 0e |......B.........|
00000100: b7 3b e5 00 00 00 07 11 b2 ec 05 0e 06 ee 13 42 |.;.............B|
00000110: eb 00 00 00 11 b2 ec 05 0e 06 ee 06 42 ea 00 00 |............B...|
00000120: 00 11 b2 ec 06 0e bf 3b b9 9f 3b e6 00 00 00 39 |.......;..;....9|
00000130: e4 00 00 00 11 b2 ec 05 0e 06 ee 12 43 ec 00 00 |............C...|
00000140: 00 11 b2 ec 06 0e 0e 06 ee 04 24 00 00 11 b2 ec |..........$.....|
00000150: 03 0e b7 3b e7 00 00 00 0b b8 4e ed 00 00 00 07 |...;......N.....|
00000160: 0b 0b bf 3b 4e ee 00 00 00 4e ef 00 00 00 26 03 |...;N....N....&.|
00000170: 00 3b e8 00 00 00 39 f0 00 00 00 43 f1 00 00 00 |.;....9....C....|
00000180: 39 e5 00 00 00 39 e6 00 00 00 39 e7 00 00 00 39 |9....9....9....9|
00000190: e8 00 00 00 11 b2 ec 05 0e 06 ee 1d b9 48 11 b2 |.............H..|
000001a0: ec 05 0e 06 ee 13 42 ef 00 00 00 11 b2 ec 05 0e |......B.........|
000001b0: 06 ee 06 42 ee 00 00 00 11 b2 ec 03 0e b6 24 04 |...B..........$.|
000001c0: 00 cf 28 e4 03 2e 00 00 00 61 04 16 1b 06 43 06 |..(......a....C.|
000001d0: 43 06 80 05 43 06 6b 14 21 25 1b 06 70 0a e0 25 |C...C.k.!%..p..%|
000001e0: 1b 0e 1b 0a 1b 08 1b 08 1b 08 48 08 07 0a 43 06 |..........H...C.|
000001f0: 5c 0e 07 3f 00 0c 02 06 00 00 00 00 00 02 00 00 |\..?............|
00000200: 05 00 bf 3b b8 9f 28 e4 03 04 01 26 11 12 00    |...;..(....&...|
```

### WASM
```
00000000: 05 0f 06 6f 62 6a 04 76 31 04 76 32 04 76 33 08 |...obj.v1.v2.v3.|
00000010: 6c 69 73 74 02 63 02 62 02 61 02 66 02 78 02 7a |list.c.b.a.f.x.z|
00000020: 02 79 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 56 5f |.y.console.logV_|
00000030: 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 |_tests__/fixture|
00000040: 73 5f 67 65 6e 65 72 61 74 65 64 2f 63 6f 6d 70 |s_generated/comp|
00000050: 6c 65 78 2d 30 35 39 2e 6a 73 0c 00 06 00 a4 01 |lex-059.js......|
00000060: 00 01 00 07 00 01 d5 02 01 a6 01 00 00 00 40 e4 |..............@.|
00000070: 00 00 00 80 40 e5 00 00 00 80 40 e6 00 00 00 80 |....@.....@.....|
00000080: 40 e7 00 00 00 80 40 e8 00 00 00 80 3f e4 00 00 |@.....@.....?...|
00000090: 00 80 3f e5 00 00 00 80 3f e6 00 00 00 80 3f e7 |..?.....?.....?.|
000000a0: 00 00 00 80 3f e8 00 00 00 80 0b 0b 0b bf 3b 4e |....?.........;N|
000000b0: e9 00 00 00 4e ea 00 00 00 4e eb 00 00 00 c2 00 |....N....N......|
000000c0: 4f ec 00 00 00 4e ec 00 00 00 3b e4 00 00 00 39 |O....N....;....9|
000000d0: e4 00 00 00 11 b2 ec 05 0e 06 ee 20 42 eb 00 00 |........... B...|
000000e0: 00 11 b2 ec 05 0e 06 ee 13 42 ea 00 00 00 11 b2 |.........B......|
000000f0: ec 05 0e 06 ee 06 42 e9 00 00 00 11 b2 ec 03 0e |......B.........|
00000100: b7 3b e5 00 00 00 07 11 b2 ec 05 0e 06 ee 13 42 |.;.............B|
00000110: eb 00 00 00 11 b2 ec 05 0e 06 ee 06 42 ea 00 00 |............B...|
00000120: 00 11 b2 ec 06 0e bf 3b b9 9f 3b e6 00 00 00 39 |.......;..;....9|
00000130: e4 00 00 00 11 b2 ec 05 0e 06 ee 12 43 ec 00 00 |............C...|
00000140: 00 11 b2 ec 06 0e 0e 06 ee 04 24 00 00 11 b2 ec |..........$.....|
00000150: 03 0e b7 3b e7 00 00 00 0b b8 4e ed 00 00 00 07 |...;......N.....|
00000160: 0b 0b bf 3b 4e ee 00 00 00 4e ef 00 00 00 26 03 |...;N....N....&.|
00000170: 00 3b e8 00 00 00 39 f0 00 00 00 43 f1 00 00 00 |.;....9....C....|
00000180: 39 e5 00 00 00 39 e6 00 00 00 39 e7 00 00 00 39 |9....9....9....9|
00000190: e8 00 00 00 11 b2 ec 05 0e 06 ee 1d b9 48 11 b2 |.............H..|
000001a0: ec 05 0e 06 ee 13 42 ef 00 00 00 11 b2 ec 05 0e |......B.........|
000001b0: 06 ee 06 42 ee 00 00 00 11 b2 ec 03 0e b6 24 04 |...B..........$.|
000001c0: 00 cf 28 e4 03 2e 00 00 00 61 04 16 1b 06 43 06 |..(......a....C.|
000001d0: 43 06 80 05 43 06 6b 14 21 25 1b 06 70 0a e0 25 |C...C.k.!%..p..%|
000001e0: 1b 0e 1b 0a 1b 08 1b 08 1b 08 48 08 07 0a 43 06 |..........H...C.|
000001f0: 5c 0e 07 3f 00 0c 02 06 00 00 00 00 00 02 00 00 |\..?............|
00000200: 05 00 bf 3b b8 9f 28 e4 03 04 01 26 11 12 00    |...;..(....&...|
```