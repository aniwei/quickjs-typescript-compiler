# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/test_closure3.ts
**生成时间**: 2026-01-07T03:19:54.419Z

## 大小对比

- TypeScript编译器: 1812 字节
- WASM编译器: 1812 字节
- 差异: 0 字节 (0.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 47,
  "atoms": [
    {
      "index": 0,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "e",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "assert",
      "offset": 4
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "log_str",
      "offset": 11
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 19
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "f",
      "offset": 23
    },
    {
      "index": 5,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "g1",
      "offset": 25
    },
    {
      "index": 6,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "test_closure1",
      "offset": 28
    },
    {
      "index": 7,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "test_closure2",
      "offset": 42
    },
    {
      "index": 8,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "test_closure3",
      "offset": 56
    },
    {
      "index": 9,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "__loadScript",
      "offset": 70
    },
    {
      "index": 10,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "test_assert.js",
      "offset": 83
    },
    {
      "index": 11,
      "rawLength": 76,
      "actualLength": 38,
      "isWideChar": 0,
      "string": "a=1,b=2,c=3,d=4,x=10,b=2,c=3,d=5,x=10,",
      "offset": 98
    },
    {
      "index": 12,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "closure1",
      "offset": 137
    },
    {
      "index": 13,
      "rawLength": 70,
      "actualLength": 35,
      "isWideChar": 0,
      "string": "__tests__/fixtures/test_closure3.js",
      "offset": 146
    },
    {
      "index": 14,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "actual",
      "offset": 182
    },
    {
      "index": 15,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "expected",
      "offset": 189
    },
    {
      "index": 16,
      "rawLength": 46,
      "actualLength": 23,
      "isWideChar": 0,
      "string": "assertion failed: got |",
      "offset": 198
    },
    {
      "index": 17,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "|",
      "offset": 222
    },
    {
      "index": 18,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": ", expected |",
      "offset": 224
    },
    {
      "index": 19,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": " (",
      "offset": 237
    },
    {
      "index": 20,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": ")",
      "offset": 240
    },
    {
      "index": 21,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "str",
      "offset": 242
    },
    {
      "index": 22,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": ",",
      "offset": 246
    },
    {
      "index": 23,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 248
    },
    {
      "index": 24,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 250
    },
    {
      "index": 25,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 252
    },
    {
      "index": 26,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 254
    },
    {
      "index": 27,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "g",
      "offset": 256
    },
    {
      "index": 28,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "a=",
      "offset": 258
    },
    {
      "index": 29,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "d",
      "offset": 261
    },
    {
      "index": 30,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "h",
      "offset": 263
    },
    {
      "index": 31,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "b=",
      "offset": 265
    },
    {
      "index": 32,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "c=",
      "offset": 268
    },
    {
      "index": 33,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "d=",
      "offset": 271
    },
    {
      "index": 34,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "x=",
      "offset": 274
    },
    {
      "index": 35,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "f2",
      "offset": 277
    },
    {
      "index": 36,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 280
    },
    {
      "index": 37,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "r",
      "offset": 284
    },
    {
      "index": 38,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "closure2",
      "offset": 286
    },
    {
      "index": 39,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "val",
      "offset": 295
    },
    {
      "index": 40,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "expr_func",
      "offset": 299
    },
    {
      "index": 41,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "myfunc1",
      "offset": 309
    },
    {
      "index": 42,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "n",
      "offset": 317
    },
    {
      "index": 43,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "myfunc2",
      "offset": 319
    },
    {
      "index": 44,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "fib",
      "offset": 327
    },
    {
      "index": 45,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "fib_func",
      "offset": 331
    },
    {
      "index": 46,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "fib1",
      "offset": 340
    }
  ],
  "functionHeader": {
    "offset": 345,
    "tag": "0xc",
    "remaining": 1467
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 47,
  "atoms": [
    {
      "index": 0,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "e",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "assert",
      "offset": 4
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "log_str",
      "offset": 11
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 19
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "f",
      "offset": 23
    },
    {
      "index": 5,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "g1",
      "offset": 25
    },
    {
      "index": 6,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "test_closure1",
      "offset": 28
    },
    {
      "index": 7,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "test_closure2",
      "offset": 42
    },
    {
      "index": 8,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "test_closure3",
      "offset": 56
    },
    {
      "index": 9,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "__loadScript",
      "offset": 70
    },
    {
      "index": 10,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "test_assert.js",
      "offset": 83
    },
    {
      "index": 11,
      "rawLength": 76,
      "actualLength": 38,
      "isWideChar": 0,
      "string": "a=1,b=2,c=3,d=4,x=10,b=2,c=3,d=5,x=10,",
      "offset": 98
    },
    {
      "index": 12,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "closure1",
      "offset": 137
    },
    {
      "index": 13,
      "rawLength": 70,
      "actualLength": 35,
      "isWideChar": 0,
      "string": "__tests__/fixtures/test_closure3.js",
      "offset": 146
    },
    {
      "index": 14,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "actual",
      "offset": 182
    },
    {
      "index": 15,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "expected",
      "offset": 189
    },
    {
      "index": 16,
      "rawLength": 46,
      "actualLength": 23,
      "isWideChar": 0,
      "string": "assertion failed: got |",
      "offset": 198
    },
    {
      "index": 17,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "|",
      "offset": 222
    },
    {
      "index": 18,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": ", expected |",
      "offset": 224
    },
    {
      "index": 19,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": " (",
      "offset": 237
    },
    {
      "index": 20,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": ")",
      "offset": 240
    },
    {
      "index": 21,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "str",
      "offset": 242
    },
    {
      "index": 22,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": ",",
      "offset": 246
    },
    {
      "index": 23,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 248
    },
    {
      "index": 24,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 250
    },
    {
      "index": 25,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 252
    },
    {
      "index": 26,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 254
    },
    {
      "index": 27,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "g",
      "offset": 256
    },
    {
      "index": 28,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "a=",
      "offset": 258
    },
    {
      "index": 29,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "d",
      "offset": 261
    },
    {
      "index": 30,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "h",
      "offset": 263
    },
    {
      "index": 31,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "b=",
      "offset": 265
    },
    {
      "index": 32,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "c=",
      "offset": 268
    },
    {
      "index": 33,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "d=",
      "offset": 271
    },
    {
      "index": 34,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "x=",
      "offset": 274
    },
    {
      "index": 35,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "f2",
      "offset": 277
    },
    {
      "index": 36,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 280
    },
    {
      "index": 37,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "r",
      "offset": 284
    },
    {
      "index": 38,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "closure2",
      "offset": 286
    },
    {
      "index": 39,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "val",
      "offset": 295
    },
    {
      "index": 40,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "expr_func",
      "offset": 299
    },
    {
      "index": 41,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "myfunc1",
      "offset": 309
    },
    {
      "index": 42,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "n",
      "offset": 317
    },
    {
      "index": 43,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "myfunc2",
      "offset": 319
    },
    {
      "index": 44,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "fib",
      "offset": 327
    },
    {
      "index": 45,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "fib_func",
      "offset": 331
    },
    {
      "index": 46,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "fib1",
      "offset": 340
    }
  ],
  "functionHeader": {
    "offset": 345,
    "tag": "0xc",
    "remaining": 1467
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 2f 02 65 0c 61 73 73 65 72 74 0e 6c 6f 67 5f |./.e.assert.log_|
00000010: 73 74 72 06 6c 6f 67 02 66 04 67 31 1a 74 65 73 |str.log.f.g1.tes|
00000020: 74 5f 63 6c 6f 73 75 72 65 31 1a 74 65 73 74 5f |t_closure1.test_|
00000030: 63 6c 6f 73 75 72 65 32 1a 74 65 73 74 5f 63 6c |closure2.test_cl|
00000040: 6f 73 75 72 65 33 18 5f 5f 6c 6f 61 64 53 63 72 |osure3.__loadScr|
00000050: 69 70 74 1c 74 65 73 74 5f 61 73 73 65 72 74 2e |ipt.test_assert.|
00000060: 6a 73 4c 61 3d 31 2c 62 3d 32 2c 63 3d 33 2c 64 |jsLa=1,b=2,c=3,d|
00000070: 3d 34 2c 78 3d 31 30 2c 62 3d 32 2c 63 3d 33 2c |=4,x=10,b=2,c=3,|
00000080: 64 3d 35 2c 78 3d 31 30 2c 10 63 6c 6f 73 75 72 |d=5,x=10,.closur|
00000090: 65 31 46 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |e1F__tests__/fix|
000000a0: 74 75 72 65 73 2f 74 65 73 74 5f 63 6c 6f 73 75 |tures/test_closu|
000000b0: 72 65 33 2e 6a 73 0c 61 63 74 75 61 6c 10 65 78 |re3.js.actual.ex|
000000c0: 70 65 63 74 65 64 2e 61 73 73 65 72 74 69 6f 6e |pected.assertion|
000000d0: 20 66 61 69 6c 65 64 3a 20 67 6f 74 20 7c 02 7c | failed: got |.||
000000e0: 18 2c 20 65 78 70 65 63 74 65 64 20 7c 04 20 28 |., expected |. (|
000000f0: 02 29 06 73 74 72 02 2c 02 61 02 62 02 63 02 78 |.).str.,.a.b.c.x|
00000100: 02 67 04 61 3d 02 64 02 68 04 62 3d 04 63 3d 04 |.g.a=.d.h.b=.c=.|
00000110: 64 3d 04 78 3d 04 66 32 06 6f 62 6a 02 72 10 63 |d=.x=.f2.obj.r.c|
00000120: 6c 6f 73 75 72 65 32 06 76 61 6c 12 65 78 70 72 |losure2.val.expr|
00000130: 5f 66 75 6e 63 0e 6d 79 66 75 6e 63 31 02 6e 0e |_func.myfunc1.n.|
00000140: 6d 79 66 75 6e 63 32 06 66 69 62 10 66 69 62 5f |myfunc2.fib.fib_|
00000150: 66 75 6e 63 08 66 69 62 31 0c 00 06 00 a4 01 00 |func.fib1.......|
00000160: 02 00 04 00 06 bf 01 02 a6 01 00 00 00 c8 03 03 |................|
00000170: 00 03 40 e5 00 00 00 40 40 e6 00 00 00 00 40 e7 |..@....@@.....@.|
00000180: 00 00 00 40 40 e8 00 00 00 40 40 e9 00 00 00 00 |...@@....@@.....|
00000190: 40 ea 00 00 00 40 40 eb 00 00 00 40 40 ec 00 00 |@....@@....@@...|
000001a0: 00 40 c2 00 41 e5 00 00 00 00 3f e6 00 00 00 00 |.@..A.....?.....|
000001b0: c2 01 41 e7 00 00 00 00 c2 02 41 e8 00 00 00 00 |..A.......A.....|
000001c0: 3f e9 00 00 00 00 c2 03 41 ea 00 00 00 00 c2 04 |?.......A.......|
000001d0: 41 eb 00 00 00 00 c2 05 41 ec 00 00 00 00 06 cb |A.......A.......|
000001e0: 6f 13 00 00 00 39 ed 00 00 00 04 ee 00 00 00 f1 |o....9..........|
000001f0: cb 0e ee 0b cc 6f 07 00 00 00 0e ee 02 30 c3 3a |.....o.......0.:|
00000200: e6 00 00 00 39 e8 00 00 00 b8 b9 ba f3 3a e9 00 |....9........:..|
00000210: 00 00 39 e9 00 00 00 bc f1 cb 39 e5 00 00 00 39 |..9.......9....9|
00000220: e6 00 00 00 04 ef 00 00 00 04 f0 00 00 00 f3 cf |................|
00000230: 28 e2 03 18 00 00 00 73 24 08 34 18 00 15 2e 0d |(......s$.4.....|
00000240: 2a 02 21 13 20 04 0d 03 1b 0e 4d 01 00 0c 43 06 |*.!. .....M...C.|
00000250: 00 ca 03 03 01 03 04 00 00 79 04 e4 03 00 01 00 |.........y......|
00000260: e6 03 00 01 00 68 00 01 00 9e 01 00 01 00 0c 01 |.....h..........|
00000270: cb c7 eb b8 ab ec 03 0a d8 d3 d4 ad ec 02 29 d3 |..............).|
00000280: f5 ed 2f d4 f5 ed 2b d3 99 04 4b 00 00 00 ab ec |../...+...K.....|
00000290: 21 d4 99 04 4b 00 00 00 ab ec 17 d3 43 39 00 00 |!...K.......C9..|
000002a0: 00 24 00 00 d4 43 39 00 00 00 24 00 00 ad ec 02 |.$...C9...$.....|
000002b0: 29 39 9f 00 00 00 04 f4 00 00 00 d3 9f 04 f5 00 |)9..............|
000002c0: 00 00 9f 04 f6 00 00 00 9f d4 9f 04 f5 00 00 00 |................|
000002d0: 9f d5 ec 10 04 f7 00 00 00 d5 9f 04 f8 00 00 00 |................|
000002e0: 9f ee 02 c3 9f f1 30 e2 03 50 03 00 12 10 07 12 |......0..P......|
000002f0: 0c 10 12 21 0d 00 07 16 07 07 12 0d 08 00 07 0e |...!............|
00000300: 11 18 07 12 12 23 07 0e 2f 2c 07 12 30 59 07 0c |.....#../,..0Y..|
00000310: 1b 12 11 0e 07 10 1b 12 11 29 12 29 08 04 34 44 |.........).)..4D|
00000320: 07 03 20 12 20 0c 08 3f 07 03 20 16 08 31 2a 22 |.. . ..?.. ..1*"|
00000330: 07 03 20 14 15 0c 06 31 07 15 00 0c 43 06 00 ce |.. ....1....C...|
00000340: 03 01 00 01 03 00 00 14 01 f2 03 00 01 00 39 e6 |..............9.|
00000350: 00 00 00 d3 04 fa 00 00 00 9f 9f 11 3a e6 00 00 |............:...|
00000360: 00 29 e2 03 0a 17 00 03 08 1b 16 20 08 07 0d 00 |.)......... ....|
00000370: 0c 43 06 00 d0 03 03 02 03 03 00 01 1a 05 f6 03 |.C..............|
00000380: 00 01 00 f8 03 00 01 40 fa 03 00 01 40 fc 03 00 |.......@....@...|
00000390: 00 40 fe 03 00 01 00 c2 00 cc bf 0a cb 39 e7 00 |.@...........9..|
000003a0: 00 00 04 00 01 00 00 d3 9f f1 0e c8 bb f1 0e c8 |................|
000003b0: 28 e2 03 14 1a 00 22 08 34 16 07 03 07 0b 00 02 |(.....".4.......|
000003c0: 14 05 0c 02 0d 0c 07 0d 00 0c 43 06 00 fe 03 01 |..........C.....|
000003d0: 01 01 03 03 01 22 02 82 04 00 01 40 84 04 00 00 |.....".....@....|
000003e0: 00 fc 03 00 01 f8 03 01 03 fa 03 02 03 c2 00 cb |................|
000003f0: 39 e7 00 00 00 04 03 01 00 00 e0 9f f1 0e 39 e7 |9.............9.|
00000400: 00 00 00 04 04 01 00 00 e1 9f f1 0e c7 f0 29 e2 |..............).|
00000410: 03 18 1d 04 00 03 0a 08 34 16 07 03 07 0b 0d 05 |........4.......|
00000420: 34 16 07 03 07 0b 0d 05 07 02 00 0c 43 06 00 84 |4...........C...|
00000430: 04 00 00 00 03 02 00 1c 00 82 04 00 03 fc 03 00 |................|
00000440: 00 39 e7 00 00 00 04 05 01 00 00 df 9f f1 0e 39 |.9.............9|
00000450: e7 00 00 00 04 06 01 00 00 e0 9f f1 29 e2 03 12 |............)...|
00000460: 1e 08 03 08 34 16 07 03 07 0b 0d 05 34 16 07 03 |....4.......4...|
00000470: 07 0b 00 0c 43 06 00 d4 03 00 03 00 04 00 01 29 |....C..........)|
00000480: 03 8e 04 00 00 00 90 04 00 01 00 92 04 00 02 00 |................|
00000490: c2 00 cf f0 d0 43 44 00 00 00 bf 0a 24 01 00 0e |.....CD.....$...|
000004a0: c8 43 43 00 00 00 24 00 00 cd 39 e5 00 00 00 c9 |.CC...$...9.....|
000004b0: bf 0a 04 0a 01 00 00 f3 29 e2 03 1a 2c 00 00 02 |........)...,...|
000004c0: 16 1c 07 04 08 17 07 06 25 08 18 05 07 06 1b 08 |........%.......|
000004d0: 17 15 1b 0e 2a 01 00 0c 43 06 00 8e 04 00 03 00 |....*...C.......|
000004e0: 02 00 02 16 03 96 04 00 00 40 88 01 00 01 00 86 |.........@......|
000004f0: 01 00 02 00 c2 00 cc c2 01 cd b8 cb 0b c8 4e 44 |..............ND|
00000500: 00 00 00 c9 4e 43 00 00 00 28 e2 03 0a 2d 04 00 |....NC...(...-..|
00000510: 09 10 28 20 18 20 37 00 0c 43 06 00 88 01 01 00 |..( . 7..C......|
00000520: 01 01 01 00 03 01 f6 03 00 01 00 96 04 00 01 d3 |................|
00000530: e3 29 e2 03 04 2f 08 03 14 00 0c 43 06 00 86 01 |.).../.....C....|
00000540: 01 00 01 01 01 00 02 01 f6 03 00 01 00 96 04 00 |................|
00000550: 01 df 28 e2 03 06 32 08 03 16 07 0d 00 0c 43 06 |..(...2.......C.|
00000560: 00 d6 03 00 02 00 04 00 01 14 02 98 04 00 00 00 |................|
00000570: 92 04 00 01 00 c2 00 cf b8 f1 cc 39 e5 00 00 00 |...........9....|
00000580: c8 b7 04 0c 01 00 00 f3 29 e2 03 0e 3d 00 00 02 |........)...=...|
00000590: 16 10 0c 12 0d 19 1b 0e 25 01 00 0c 43 06 00 9a |........%...C...|
000005a0: 04 01 02 01 02 00 01 12 03 9c 04 00 01 00 9e 04 |................|
000005b0: 00 00 00 9a 04 00 01 44 0c 02 cc c2 00 cb d3 b7 |.......D........|
000005c0: ab ec 03 b7 28 c7 d3 23 01 00 e2 03 10 3e 14 00 |....(..#.....>..|
000005d0: 06 08 0f 0c 04 17 03 09 0e 07 10 07 1d 00 0c 43 |...............C|
000005e0: 06 00 9e 04 01 00 01 03 01 00 07 01 9c 04 00 01 |................|
000005f0: 00 9a 04 01 41 df d3 b8 a0 23 01 00 e2 03 0a 3f |....A....#.....?|
00000600: 08 03 16 07 10 0c 04 07 21 00 0c 43 06 00 d8 03 |........!..C....|
00000610: 00 02 00 04 00 02 28 02 a0 04 00 00 40 a2 04 00 |......(.....@...|
00000620: 01 00 c2 00 cb c2 01 cc 39 e5 00 00 00 c7 bd f1 |........9.......|
00000630: bf 08 04 10 01 00 00 f3 0e 39 e5 00 00 00 c8 bd |.........9......|
00000640: f1 bf 08 04 11 01 00 00 f3 29 e2 03 14 4b 00 00 |.........)...K..|
00000650: 06 22 08 1b 0e 0c 06 2a 07 0d 0b 1b 0e 0c 10 2a |.".....*.......*|
00000660: 11 00 0c 43 06 00 a0 04 01 00 01 04 01 00 1a 01 |...C............|
00000670: 9c 04 00 01 00 a0 04 00 01 d3 b7 a6 ec 03 b7 28 |...............(|
00000680: d3 b8 ab ec 03 b8 28 df d3 b8 a0 f1 df d3 b9 a0 |......(.........|
00000690: f1 9f 28 e2 03 22 4c 04 03 10 0c 04 17 03 08 0a |..(.."L.........|
000006a0: 0c 04 17 0d 09 0e 07 08 0c 04 07 05 07 14 07 08 |................|
000006b0: 0c 04 07 05 07 09 07 23 00 0c 43 06 00 a4 04 01 |.......#..C.....|
000006c0: 01 01 04 00 00 1d 02 9c 04 00 01 00 a4 04 00 01 |................|
000006d0: 04 0c 02 cb d3 b7 a6 ec 03 b7 28 d3 b8 ab ec 03 |..........(.....|
000006e0: b8 28 c7 d3 b8 a0 f1 c7 d3 b9 a0 f1 9f 28 e2 03 |.(...........(..|
000006f0: 22 54 13 12 0d 0c 04 17 03 08 0a 0c 04 17 0d 09 |"T..............|
00000700: 0e 07 0a 0c 04 07 05 07 14 07 0a 0c 04 07 05 07 |................|
00000710: 0b 07 25 00                                     |..%.|
```

### WASM
```
00000000: 05 2f 02 65 0c 61 73 73 65 72 74 0e 6c 6f 67 5f |./.e.assert.log_|
00000010: 73 74 72 06 6c 6f 67 02 66 04 67 31 1a 74 65 73 |str.log.f.g1.tes|
00000020: 74 5f 63 6c 6f 73 75 72 65 31 1a 74 65 73 74 5f |t_closure1.test_|
00000030: 63 6c 6f 73 75 72 65 32 1a 74 65 73 74 5f 63 6c |closure2.test_cl|
00000040: 6f 73 75 72 65 33 18 5f 5f 6c 6f 61 64 53 63 72 |osure3.__loadScr|
00000050: 69 70 74 1c 74 65 73 74 5f 61 73 73 65 72 74 2e |ipt.test_assert.|
00000060: 6a 73 4c 61 3d 31 2c 62 3d 32 2c 63 3d 33 2c 64 |jsLa=1,b=2,c=3,d|
00000070: 3d 34 2c 78 3d 31 30 2c 62 3d 32 2c 63 3d 33 2c |=4,x=10,b=2,c=3,|
00000080: 64 3d 35 2c 78 3d 31 30 2c 10 63 6c 6f 73 75 72 |d=5,x=10,.closur|
00000090: 65 31 46 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |e1F__tests__/fix|
000000a0: 74 75 72 65 73 2f 74 65 73 74 5f 63 6c 6f 73 75 |tures/test_closu|
000000b0: 72 65 33 2e 6a 73 0c 61 63 74 75 61 6c 10 65 78 |re3.js.actual.ex|
000000c0: 70 65 63 74 65 64 2e 61 73 73 65 72 74 69 6f 6e |pected.assertion|
000000d0: 20 66 61 69 6c 65 64 3a 20 67 6f 74 20 7c 02 7c | failed: got |.||
000000e0: 18 2c 20 65 78 70 65 63 74 65 64 20 7c 04 20 28 |., expected |. (|
000000f0: 02 29 06 73 74 72 02 2c 02 61 02 62 02 63 02 78 |.).str.,.a.b.c.x|
00000100: 02 67 04 61 3d 02 64 02 68 04 62 3d 04 63 3d 04 |.g.a=.d.h.b=.c=.|
00000110: 64 3d 04 78 3d 04 66 32 06 6f 62 6a 02 72 10 63 |d=.x=.f2.obj.r.c|
00000120: 6c 6f 73 75 72 65 32 06 76 61 6c 12 65 78 70 72 |losure2.val.expr|
00000130: 5f 66 75 6e 63 0e 6d 79 66 75 6e 63 31 02 6e 0e |_func.myfunc1.n.|
00000140: 6d 79 66 75 6e 63 32 06 66 69 62 10 66 69 62 5f |myfunc2.fib.fib_|
00000150: 66 75 6e 63 08 66 69 62 31 0c 00 06 00 a4 01 00 |func.fib1.......|
00000160: 02 00 04 00 06 bf 01 02 a6 01 00 00 00 c8 03 03 |................|
00000170: 00 03 40 e5 00 00 00 40 40 e6 00 00 00 00 40 e7 |..@....@@.....@.|
00000180: 00 00 00 40 40 e8 00 00 00 40 40 e9 00 00 00 00 |...@@....@@.....|
00000190: 40 ea 00 00 00 40 40 eb 00 00 00 40 40 ec 00 00 |@....@@....@@...|
000001a0: 00 40 c2 00 41 e5 00 00 00 00 3f e6 00 00 00 00 |.@..A.....?.....|
000001b0: c2 01 41 e7 00 00 00 00 c2 02 41 e8 00 00 00 00 |..A.......A.....|
000001c0: 3f e9 00 00 00 00 c2 03 41 ea 00 00 00 00 c2 04 |?.......A.......|
000001d0: 41 eb 00 00 00 00 c2 05 41 ec 00 00 00 00 06 cb |A.......A.......|
000001e0: 6f 13 00 00 00 39 ed 00 00 00 04 ee 00 00 00 f1 |o....9..........|
000001f0: cb 0e ee 0b cc 6f 07 00 00 00 0e ee 02 30 c3 3a |.....o.......0.:|
00000200: e6 00 00 00 39 e8 00 00 00 b8 b9 ba f3 3a e9 00 |....9........:..|
00000210: 00 00 39 e9 00 00 00 bc f1 cb 39 e5 00 00 00 39 |..9.......9....9|
00000220: e6 00 00 00 04 ef 00 00 00 04 f0 00 00 00 f3 cf |................|
00000230: 28 e2 03 18 00 00 00 73 24 08 34 18 00 15 2e 0d |(......s$.4.....|
00000240: 2a 02 21 13 20 04 0d 03 1b 0e 4d 01 00 0c 43 06 |*.!. .....M...C.|
00000250: 00 ca 03 03 01 03 04 00 00 79 04 e4 03 00 01 00 |.........y......|
00000260: e6 03 00 01 00 68 00 01 00 9e 01 00 01 00 0c 01 |.....h..........|
00000270: cb c7 eb b8 ab ec 03 0a d8 d3 d4 ad ec 02 29 d3 |..............).|
00000280: f5 ed 2f d4 f5 ed 2b d3 99 04 4b 00 00 00 ab ec |../...+...K.....|
00000290: 21 d4 99 04 4b 00 00 00 ab ec 17 d3 43 39 00 00 |!...K.......C9..|
000002a0: 00 24 00 00 d4 43 39 00 00 00 24 00 00 ad ec 02 |.$...C9...$.....|
000002b0: 29 39 9f 00 00 00 04 f4 00 00 00 d3 9f 04 f5 00 |)9..............|
000002c0: 00 00 9f 04 f6 00 00 00 9f d4 9f 04 f5 00 00 00 |................|
000002d0: 9f d5 ec 10 04 f7 00 00 00 d5 9f 04 f8 00 00 00 |................|
000002e0: 9f ee 02 c3 9f f1 30 e2 03 50 03 00 12 10 07 12 |......0..P......|
000002f0: 0c 10 12 21 0d 00 07 16 07 07 12 0d 08 00 07 0e |...!............|
00000300: 11 18 07 12 12 23 07 0e 2f 2c 07 12 30 59 07 0c |.....#../,..0Y..|
00000310: 1b 12 11 0e 07 10 1b 12 11 29 12 29 08 04 34 44 |.........).)..4D|
00000320: 07 03 20 12 20 0c 08 3f 07 03 20 16 08 31 2a 22 |.. . ..?.. ..1*"|
00000330: 07 03 20 14 15 0c 06 31 07 15 00 0c 43 06 00 ce |.. ....1....C...|
00000340: 03 01 00 01 03 00 00 14 01 f2 03 00 01 00 39 e6 |..............9.|
00000350: 00 00 00 d3 04 fa 00 00 00 9f 9f 11 3a e6 00 00 |............:...|
00000360: 00 29 e2 03 0a 17 00 03 08 1b 16 20 08 07 0d 00 |.)......... ....|
00000370: 0c 43 06 00 d0 03 03 02 03 03 00 01 1a 05 f6 03 |.C..............|
00000380: 00 01 00 f8 03 00 01 40 fa 03 00 01 40 fc 03 00 |.......@....@...|
00000390: 00 40 fe 03 00 01 00 c2 00 cc bf 0a cb 39 e7 00 |.@...........9..|
000003a0: 00 00 04 00 01 00 00 d3 9f f1 0e c8 bb f1 0e c8 |................|
000003b0: 28 e2 03 14 1a 00 22 08 34 16 07 03 07 0b 00 02 |(.....".4.......|
000003c0: 14 05 0c 02 0d 0c 07 0d 00 0c 43 06 00 fe 03 01 |..........C.....|
000003d0: 01 01 03 03 01 22 02 82 04 00 01 40 84 04 00 00 |.....".....@....|
000003e0: 00 fc 03 00 01 f8 03 01 03 fa 03 02 03 c2 00 cb |................|
000003f0: 39 e7 00 00 00 04 03 01 00 00 e0 9f f1 0e 39 e7 |9.............9.|
00000400: 00 00 00 04 04 01 00 00 e1 9f f1 0e c7 f0 29 e2 |..............).|
00000410: 03 18 1d 04 00 03 0a 08 34 16 07 03 07 0b 0d 05 |........4.......|
00000420: 34 16 07 03 07 0b 0d 05 07 02 00 0c 43 06 00 84 |4...........C...|
00000430: 04 00 00 00 03 02 00 1c 00 82 04 00 03 fc 03 00 |................|
00000440: 00 39 e7 00 00 00 04 05 01 00 00 df 9f f1 0e 39 |.9.............9|
00000450: e7 00 00 00 04 06 01 00 00 e0 9f f1 29 e2 03 12 |............)...|
00000460: 1e 08 03 08 34 16 07 03 07 0b 0d 05 34 16 07 03 |....4.......4...|
00000470: 07 0b 00 0c 43 06 00 d4 03 00 03 00 04 00 01 29 |....C..........)|
00000480: 03 8e 04 00 00 00 90 04 00 01 00 92 04 00 02 00 |................|
00000490: c2 00 cf f0 d0 43 44 00 00 00 bf 0a 24 01 00 0e |.....CD.....$...|
000004a0: c8 43 43 00 00 00 24 00 00 cd 39 e5 00 00 00 c9 |.CC...$...9.....|
000004b0: bf 0a 04 0a 01 00 00 f3 29 e2 03 1a 2c 00 00 02 |........)...,...|
000004c0: 16 1c 07 04 08 17 07 06 25 08 18 05 07 06 1b 08 |........%.......|
000004d0: 17 15 1b 0e 2a 01 00 0c 43 06 00 8e 04 00 03 00 |....*...C.......|
000004e0: 02 00 02 16 03 96 04 00 00 40 88 01 00 01 00 86 |.........@......|
000004f0: 01 00 02 00 c2 00 cc c2 01 cd b8 cb 0b c8 4e 44 |..............ND|
00000500: 00 00 00 c9 4e 43 00 00 00 28 e2 03 0a 2d 04 00 |....NC...(...-..|
00000510: 09 10 28 20 18 20 37 00 0c 43 06 00 88 01 01 00 |..( . 7..C......|
00000520: 01 01 01 00 03 01 f6 03 00 01 00 96 04 00 01 d3 |................|
00000530: e3 29 e2 03 04 2f 08 03 14 00 0c 43 06 00 86 01 |.).../.....C....|
00000540: 01 00 01 01 01 00 02 01 f6 03 00 01 00 96 04 00 |................|
00000550: 01 df 28 e2 03 06 32 08 03 16 07 0d 00 0c 43 06 |..(...2.......C.|
00000560: 00 d6 03 00 02 00 04 00 01 14 02 98 04 00 00 00 |................|
00000570: 92 04 00 01 00 c2 00 cf b8 f1 cc 39 e5 00 00 00 |...........9....|
00000580: c8 b7 04 0c 01 00 00 f3 29 e2 03 0e 3d 00 00 02 |........)...=...|
00000590: 16 10 0c 12 0d 19 1b 0e 25 01 00 0c 43 06 00 9a |........%...C...|
000005a0: 04 01 02 01 02 00 01 12 03 9c 04 00 01 00 9e 04 |................|
000005b0: 00 00 00 9a 04 00 01 44 0c 02 cc c2 00 cb d3 b7 |.......D........|
000005c0: ab ec 03 b7 28 c7 d3 23 01 00 e2 03 10 3e 14 00 |....(..#.....>..|
000005d0: 06 08 0f 0c 04 17 03 09 0e 07 10 07 1d 00 0c 43 |...............C|
000005e0: 06 00 9e 04 01 00 01 03 01 00 07 01 9c 04 00 01 |................|
000005f0: 00 9a 04 01 41 df d3 b8 a0 23 01 00 e2 03 0a 3f |....A....#.....?|
00000600: 08 03 16 07 10 0c 04 07 21 00 0c 43 06 00 d8 03 |........!..C....|
00000610: 00 02 00 04 00 02 28 02 a0 04 00 00 40 a2 04 00 |......(.....@...|
00000620: 01 00 c2 00 cb c2 01 cc 39 e5 00 00 00 c7 bd f1 |........9.......|
00000630: bf 08 04 10 01 00 00 f3 0e 39 e5 00 00 00 c8 bd |.........9......|
00000640: f1 bf 08 04 11 01 00 00 f3 29 e2 03 14 4b 00 00 |.........)...K..|
00000650: 06 22 08 1b 0e 0c 06 2a 07 0d 0b 1b 0e 0c 10 2a |.".....*.......*|
00000660: 11 00 0c 43 06 00 a0 04 01 00 01 04 01 00 1a 01 |...C............|
00000670: 9c 04 00 01 00 a0 04 00 01 d3 b7 a6 ec 03 b7 28 |...............(|
00000680: d3 b8 ab ec 03 b8 28 df d3 b8 a0 f1 df d3 b9 a0 |......(.........|
00000690: f1 9f 28 e2 03 22 4c 04 03 10 0c 04 17 03 08 0a |..(.."L.........|
000006a0: 0c 04 17 0d 09 0e 07 08 0c 04 07 05 07 14 07 08 |................|
000006b0: 0c 04 07 05 07 09 07 23 00 0c 43 06 00 a4 04 01 |.......#..C.....|
000006c0: 01 01 04 00 00 1d 02 9c 04 00 01 00 a4 04 00 01 |................|
000006d0: 04 0c 02 cb d3 b7 a6 ec 03 b7 28 d3 b8 ab ec 03 |..........(.....|
000006e0: b8 28 c7 d3 b8 a0 f1 c7 d3 b9 a0 f1 9f 28 e2 03 |.(...........(..|
000006f0: 22 54 13 12 0d 0c 04 17 03 08 0a 0c 04 17 0d 09 |"T..............|
00000700: 0e 07 0a 0c 04 07 05 07 14 07 0a 0c 04 07 05 07 |................|
00000710: 0b 07 25 00                                     |..%.|
```