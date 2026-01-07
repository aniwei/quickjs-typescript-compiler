# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures_quickjs/octane/run.ts
**生成时间**: 2026-01-06T16:08:32.095Z

## 大小对比

- TypeScript编译器: 1307 字节
- WASM编译器: 1326 字节
- 差异: -19 字节 (-1.43%)

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
      "rawLength": 80,
      "actualLength": 40,
      "isWideChar": 0,
      "string": "__tests__/fixtures_quickjs/octane/run.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "./base.js",
      "offset": 43
    },
    {
      "index": 2,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "./richards.js",
      "offset": 53
    },
    {
      "index": 3,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "./deltablue.js",
      "offset": 67
    },
    {
      "index": 4,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "./crypto.js",
      "offset": 82
    },
    {
      "index": 5,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "./raytrace.js",
      "offset": 94
    },
    {
      "index": 6,
      "rawLength": 34,
      "actualLength": 17,
      "isWideChar": 0,
      "string": "./earley-boyer.js",
      "offset": 108
    },
    {
      "index": 7,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "./regexp.js",
      "offset": 126
    },
    {
      "index": 8,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "./splay.js",
      "offset": 138
    },
    {
      "index": 9,
      "rawLength": 36,
      "actualLength": 18,
      "isWideChar": 0,
      "string": "./navier-stokes.js",
      "offset": 149
    },
    {
      "index": 10,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "./mandreel.js",
      "offset": 168
    },
    {
      "index": 11,
      "rawLength": 32,
      "actualLength": 16,
      "isWideChar": 0,
      "string": "./gbemu-part1.js",
      "offset": 182
    },
    {
      "index": 12,
      "rawLength": 32,
      "actualLength": 16,
      "isWideChar": 0,
      "string": "./gbemu-part2.js",
      "offset": 199
    },
    {
      "index": 13,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "./code-load.js",
      "offset": 216
    },
    {
      "index": 14,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "./box2d.js",
      "offset": 231
    },
    {
      "index": 15,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "./typescript.js",
      "offset": 242
    },
    {
      "index": 16,
      "rawLength": 42,
      "actualLength": 21,
      "isWideChar": 0,
      "string": "./typescript-input.js",
      "offset": 258
    },
    {
      "index": 17,
      "rawLength": 48,
      "actualLength": 24,
      "isWideChar": 0,
      "string": "./typescript-compiler.js",
      "offset": 280
    },
    {
      "index": 18,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "BenchmarkSuite",
      "offset": 305
    },
    {
      "index": 19,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "success",
      "offset": 320
    },
    {
      "index": 20,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "print",
      "offset": 328
    },
    {
      "index": 21,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "PrintResult",
      "offset": 334
    },
    {
      "index": 22,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "run",
      "offset": 346
    },
    {
      "index": 23,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "args",
      "offset": 350
    },
    {
      "index": 24,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 355
    },
    {
      "index": 25,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 363
    },
    {
      "index": 26,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "push",
      "offset": 367
    },
    {
      "index": 27,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "notify",
      "offset": 372
    },
    {
      "index": 28,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "result",
      "offset": 379
    },
    {
      "index": 29,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": ": ",
      "offset": 386
    },
    {
      "index": 30,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "config",
      "offset": 389
    },
    {
      "index": 31,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "doWarmup",
      "offset": 396
    },
    {
      "index": 32,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "doDeterministic",
      "offset": 405
    },
    {
      "index": 33,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "RunSuites",
      "offset": 421
    },
    {
      "index": 34,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "NotifyResult",
      "offset": 431
    },
    {
      "index": 35,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "NotifyError",
      "offset": 444
    },
    {
      "index": 36,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "NotifyScore",
      "offset": 456
    },
    {
      "index": 37,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "NotifyStep",
      "offset": 468
    },
    {
      "index": 38,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "error",
      "offset": 479
    },
    {
      "index": 39,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "score",
      "offset": 485
    },
    {
      "index": 40,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "----",
      "offset": 491
    },
    {
      "index": 41,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "Score (version ",
      "offset": 496
    },
    {
      "index": 42,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "version",
      "offset": 512
    },
    {
      "index": 43,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "): ",
      "offset": 520
    },
    {
      "index": 44,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "time",
      "offset": 524
    },
    {
      "index": 45,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "parseInt",
      "offset": 529
    },
    {
      "index": 46,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "ms",
      "offset": 538
    }
  ],
  "functionHeader": {
    "offset": 541,
    "tag": "0xd",
    "remaining": 766
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
      "rawLength": 80,
      "actualLength": 40,
      "isWideChar": 0,
      "string": "__tests__/fixtures_quickjs/octane/run.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "./base.js",
      "offset": 43
    },
    {
      "index": 2,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "./richards.js",
      "offset": 53
    },
    {
      "index": 3,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "./deltablue.js",
      "offset": 67
    },
    {
      "index": 4,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "./crypto.js",
      "offset": 82
    },
    {
      "index": 5,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "./raytrace.js",
      "offset": 94
    },
    {
      "index": 6,
      "rawLength": 34,
      "actualLength": 17,
      "isWideChar": 0,
      "string": "./earley-boyer.js",
      "offset": 108
    },
    {
      "index": 7,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "./regexp.js",
      "offset": 126
    },
    {
      "index": 8,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "./splay.js",
      "offset": 138
    },
    {
      "index": 9,
      "rawLength": 36,
      "actualLength": 18,
      "isWideChar": 0,
      "string": "./navier-stokes.js",
      "offset": 149
    },
    {
      "index": 10,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "./mandreel.js",
      "offset": 168
    },
    {
      "index": 11,
      "rawLength": 32,
      "actualLength": 16,
      "isWideChar": 0,
      "string": "./gbemu-part1.js",
      "offset": 182
    },
    {
      "index": 12,
      "rawLength": 32,
      "actualLength": 16,
      "isWideChar": 0,
      "string": "./gbemu-part2.js",
      "offset": 199
    },
    {
      "index": 13,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "./code-load.js",
      "offset": 216
    },
    {
      "index": 14,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "./box2d.js",
      "offset": 231
    },
    {
      "index": 15,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "./typescript.js",
      "offset": 242
    },
    {
      "index": 16,
      "rawLength": 42,
      "actualLength": 21,
      "isWideChar": 0,
      "string": "./typescript-input.js",
      "offset": 258
    },
    {
      "index": 17,
      "rawLength": 48,
      "actualLength": 24,
      "isWideChar": 0,
      "string": "./typescript-compiler.js",
      "offset": 280
    },
    {
      "index": 18,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "BenchmarkSuite",
      "offset": 305
    },
    {
      "index": 19,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "success",
      "offset": 320
    },
    {
      "index": 20,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "print",
      "offset": 328
    },
    {
      "index": 21,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "PrintResult",
      "offset": 334
    },
    {
      "index": 22,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "run",
      "offset": 346
    },
    {
      "index": 23,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "args",
      "offset": 350
    },
    {
      "index": 24,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 355
    },
    {
      "index": 25,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 363
    },
    {
      "index": 26,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "push",
      "offset": 367
    },
    {
      "index": 27,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "notify",
      "offset": 372
    },
    {
      "index": 28,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "result",
      "offset": 379
    },
    {
      "index": 29,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": ": ",
      "offset": 386
    },
    {
      "index": 30,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "config",
      "offset": 389
    },
    {
      "index": 31,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "doWarmup",
      "offset": 396
    },
    {
      "index": 32,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "doDeterministic",
      "offset": 405
    },
    {
      "index": 33,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "RunSuites",
      "offset": 421
    },
    {
      "index": 34,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "NotifyResult",
      "offset": 431
    },
    {
      "index": 35,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "NotifyError",
      "offset": 444
    },
    {
      "index": 36,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "NotifyScore",
      "offset": 456
    },
    {
      "index": 37,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "NotifyStep",
      "offset": 468
    },
    {
      "index": 38,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "error",
      "offset": 479
    },
    {
      "index": 39,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "score",
      "offset": 485
    },
    {
      "index": 40,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "----",
      "offset": 491
    },
    {
      "index": 41,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "Score (version ",
      "offset": 496
    },
    {
      "index": 42,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "version",
      "offset": 512
    },
    {
      "index": 43,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "): ",
      "offset": 520
    },
    {
      "index": 44,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "time",
      "offset": 524
    },
    {
      "index": 45,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "parseInt",
      "offset": 529
    },
    {
      "index": 46,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "ms",
      "offset": 538
    }
  ],
  "functionHeader": {
    "offset": 541,
    "tag": "0xd",
    "remaining": 785
  }
}
```

## 字节级差异

共发现 556 个字节差异:

- 偏移量 0x2ad: TS=0x03 vs WASM=0x05
- 偏移量 0x2b0: TS=0x4f vs WASM=0x5d
- 偏移量 0x2c9: TS=0xd3 vs WASM=0x26
- 偏移量 0x2ca: TS=0x24 vs WASM=0x00
- 偏移量 0x2cb: TS=0x01 vs WASM=0x00
- 偏移量 0x2cc: TS=0x00 vs WASM=0xb7
- 偏移量 0x2cd: TS=0x0e vs WASM=0xd3
- 偏移量 0x2ce: TS=0x68 vs WASM=0x54
- 偏移量 0x2cf: TS=0x00 vs WASM=0x0e
- 偏移量 0x2d0: TS=0x00 vs WASM=0x18
- 偏移量 0x2d1: TS=0x42 vs WASM=0x27
- 偏移量 0x2d2: TS=0xf8 vs WASM=0x00
- 偏移量 0x2d4: TS=0x00 vs WASM=0x0e
- 偏移量 0x2d5: TS=0x00 vs WASM=0x68
- 偏移量 0x2d6: TS=0x98 vs WASM=0x00
- 偏移量 0x2d7: TS=0xec vs WASM=0x00
- 偏移量 0x2d8: TS=0x0c vs WASM=0x42
- 偏移量 0x2d9: TS=0x68 vs WASM=0xf8
- 偏移量 0x2dc: TS=0x26 vs WASM=0x00
- 偏移量 0x2dd: TS=0x00 vs WASM=0x98
- ... (显示前20个差异，总共556个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 2f 50 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |./P__tests__/fix|
00000010: 74 75 72 65 73 5f 71 75 69 63 6b 6a 73 2f 6f 63 |tures_quickjs/oc|
00000020: 74 61 6e 65 2f 72 75 6e 2e 6a 73 12 2e 2f 62 61 |tane/run.js../ba|
00000030: 73 65 2e 6a 73 1a 2e 2f 72 69 63 68 61 72 64 73 |se.js../richards|
00000040: 2e 6a 73 1c 2e 2f 64 65 6c 74 61 62 6c 75 65 2e |.js../deltablue.|
00000050: 6a 73 16 2e 2f 63 72 79 70 74 6f 2e 6a 73 1a 2e |js../crypto.js..|
00000060: 2f 72 61 79 74 72 61 63 65 2e 6a 73 22 2e 2f 65 |/raytrace.js"./e|
00000070: 61 72 6c 65 79 2d 62 6f 79 65 72 2e 6a 73 16 2e |arley-boyer.js..|
00000080: 2f 72 65 67 65 78 70 2e 6a 73 14 2e 2f 73 70 6c |/regexp.js../spl|
00000090: 61 79 2e 6a 73 24 2e 2f 6e 61 76 69 65 72 2d 73 |ay.js$./navier-s|
000000a0: 74 6f 6b 65 73 2e 6a 73 1a 2e 2f 6d 61 6e 64 72 |tokes.js../mandr|
000000b0: 65 65 6c 2e 6a 73 20 2e 2f 67 62 65 6d 75 2d 70 |eel.js ./gbemu-p|
000000c0: 61 72 74 31 2e 6a 73 20 2e 2f 67 62 65 6d 75 2d |art1.js ./gbemu-|
000000d0: 70 61 72 74 32 2e 6a 73 1c 2e 2f 63 6f 64 65 2d |part2.js../code-|
000000e0: 6c 6f 61 64 2e 6a 73 14 2e 2f 62 6f 78 32 64 2e |load.js../box2d.|
000000f0: 6a 73 1e 2e 2f 74 79 70 65 73 63 72 69 70 74 2e |js../typescript.|
00000100: 6a 73 2a 2e 2f 74 79 70 65 73 63 72 69 70 74 2d |js*./typescript-|
00000110: 69 6e 70 75 74 2e 6a 73 30 2e 2f 74 79 70 65 73 |input.js0./types|
00000120: 63 72 69 70 74 2d 63 6f 6d 70 69 6c 65 72 2e 6a |cript-compiler.j|
00000130: 73 1c 42 65 6e 63 68 6d 61 72 6b 53 75 69 74 65 |s.BenchmarkSuite|
00000140: 0e 73 75 63 63 65 73 73 0a 70 72 69 6e 74 16 50 |.success.print.P|
00000150: 72 69 6e 74 52 65 73 75 6c 74 06 72 75 6e 08 61 |rintResult.run.a|
00000160: 72 67 73 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 08 |rgs.console.log.|
00000170: 70 75 73 68 0c 6e 6f 74 69 66 79 0c 72 65 73 75 |push.notify.resu|
00000180: 6c 74 04 3a 20 0c 63 6f 6e 66 69 67 10 64 6f 57 |lt.: .config.doW|
00000190: 61 72 6d 75 70 1e 64 6f 44 65 74 65 72 6d 69 6e |armup.doDetermin|
000001a0: 69 73 74 69 63 12 52 75 6e 53 75 69 74 65 73 18 |istic.RunSuites.|
000001b0: 4e 6f 74 69 66 79 52 65 73 75 6c 74 16 4e 6f 74 |NotifyResult.Not|
000001c0: 69 66 79 45 72 72 6f 72 16 4e 6f 74 69 66 79 53 |ifyError.NotifyS|
000001d0: 63 6f 72 65 14 4e 6f 74 69 66 79 53 74 65 70 0a |core.NotifyStep.|
000001e0: 65 72 72 6f 72 0a 73 63 6f 72 65 08 2d 2d 2d 2d |error.score.----|
000001f0: 1e 53 63 6f 72 65 20 28 76 65 72 73 69 6f 6e 20 |.Score (version |
00000200: 0e 76 65 72 73 69 6f 6e 06 29 3a 20 08 74 69 6d |.version.): .tim|
00000210: 65 10 70 61 72 73 65 49 6e 74 04 6d 73 0d c8 03 |e.parseInt.ms...|
00000220: 11 ca 03 02 cc 03 02 ce 03 02 d0 03 02 d2 03 02 |................|
00000230: d4 03 02 d6 03 02 d8 03 02 da 03 02 dc 03 02 de |................|
00000240: 03 02 e0 03 02 e2 03 02 e4 03 02 e6 03 02 e8 03 |................|
00000250: 02 ea 03 02 00 00 01 00 00 ec 03 00 00 0c 20 06 |.............. .|
00000260: 01 a4 01 00 00 00 01 05 03 18 00 ec 03 00 0c ee |................|
00000270: 03 00 01 f0 03 01 01 f2 03 02 01 f4 03 03 01 08 |................|
00000280: ec 0d c2 00 e5 c2 01 e6 c2 02 61 04 00 29 0a e4 |..........a..)..|
00000290: 60 04 00 f0 0e 06 2f c8 03 09 00 00 00 11 a4 01 |`...../.........|
000002a0: 00 11 06 00 0c 41 06 01 f0 03 01 00 00 03 01 00 |.....A..........|
000002b0: 4f 01 f6 03 00 01 00 ec 03 00 0c 0d 00 00 d7 39 |O..............9|
000002c0: fc 00 00 00 43 fd 00 00 00 d3 24 01 00 0e 68 00 |....C.....$...h.|
000002d0: 00 42 f8 00 00 00 98 ec 0c 68 00 00 26 00 00 44 |.B.......h..&..D|
000002e0: f8 00 00 00 68 00 00 42 f8 00 00 00 43 fe 00 00 |....h..B....C...|
000002f0: 00 d3 24 01 00 0e 68 00 00 43 ff 00 00 00 68 00 |..$...h..C....h.|
00000300: 00 42 f8 00 00 00 24 01 00 29 c8 03 26 2f 00 17 |.B....$..)..&/..|
00000310: 08 1b 0e 1b 10 07 07 17 0b 11 1c 2b 1d 11 1c 2c |...........+...,|
00000320: 23 11 1c 1b 0c 1b 12 07 07 17 31 11 1c 1b 10 11 |#.........1.....|
00000330: 1c 1b 1d 00 0c 43 06 01 f2 03 02 00 02 03 01 00 |.....C..........|
00000340: 0c 02 70 00 01 00 80 04 00 01 00 f0 03 02 00 df |..p.............|
00000350: d3 04 01 01 00 00 9f d4 9f f1 29 c8 03 0e 37 00 |..........)...7.|
00000360: 03 08 07 0c 20 0a 07 12 07 03 07 19 00 0c 41 06 |.... .........A.|
00000370: 01 f4 03 01 01 00 04 04 04 71 02 fe 03 00 01 00 |.........q......|
00000380: fe 03 01 ff ff ff ff 0f 20 f2 03 03 00 ee 03 01 |........ .......|
00000390: 00 f0 03 02 00 ec 03 00 0c 63 00 00 d3 11 f4 ec |.........c......|
000003a0: 05 0e c2 00 db cb 68 03 00 d3 44 ff 00 00 00 68 |......h...D....h|
000003b0: 03 00 42 02 01 00 00 39 47 00 00 00 44 03 01 00 |..B....9G...D...|
000003c0: 00 68 03 00 42 02 01 00 00 39 47 00 00 00 44 04 |.h..B....9G...D.|
000003d0: 01 00 00 68 03 00 43 05 01 00 00 0b df 4e 06 01 |...h..C......N..|
000003e0: 00 00 c2 01 4f 07 01 00 00 4e 07 01 00 00 c2 02 |....O....N......|
000003f0: 4f 08 01 00 00 4e 08 01 00 00 c2 03 4f 09 01 00 |O....N......O...|
00000400: 00 4e 09 01 00 00 24 01 00 29 c8 03 1a 3a 00 44 |.N....$..)...:.D|
00000410: 08 11 30 21 2f 11 1c 1b 26 35 41 11 1c 1b 34 35 |..0!/...&5A...45|
00000420: 4f 11 1c 21 08 d3 0c 00 0c 42 06 01 00 00 00 00 |O..!.....B......|
00000430: 00 00 00 01 00 29 c8 03 02 3a 16 00 0c 42 06 01 |.....)...:...B..|
00000440: 00 02 00 02 03 02 00 08 02 70 00 01 00 94 04 00 |.........p......|
00000450: 01 00 f2 03 00 00 ee 03 01 00 df d3 d4 f2 0e 09 |................|
00000460: e4 29 c8 03 0c 40 15 03 11 07 18 07 0c 07 0d 0d |.)...@..........|
00000470: 15 00 0c 42 06 01 00 01 00 01 03 02 00 21 01 96 |...B.........!..|
00000480: 04 00 01 00 f0 03 02 00 ec 03 03 0c df 04 0c 01 |................|
00000490: 00 00 f1 0e df 04 0d 01 00 00 68 01 00 42 0e 01 |..........h..B..|
000004a0: 00 00 9f 04 0f 01 00 00 9f d3 9f f1 29 c8 03 16 |............)...|
000004b0: 44 15 04 11 20 0a 0d 09 20 34 11 1c 1b 1f 20 32 |D... ... 4.... 2|
000004c0: 07 14 07 03 07 67 00 0c 42 06 01 00 02 00 02 07 |.....g..B.......|
000004d0: 01 00 26 02 70 00 01 00 a0 04 00 01 00 f0 03 02 |..&.p...........|
000004e0: 00 d4 ec 23 df 04 0c 01 00 00 43 5e 00 00 00 d3 |...#......C^....|
000004f0: 04 01 01 00 00 39 11 01 00 00 d4 f1 04 12 01 00 |.....9..........|
00000500: 00 24 04 00 f1 0e 29 c8 03 10 4a 14 03 07 12 00 |.$....)...J.....|
00000510: 39 1a 20 12 1b 12 07 01 2f 31 00                |9. ...../1.|
```

### WASM
```
00000000: 05 2f 50 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |./P__tests__/fix|
00000010: 74 75 72 65 73 5f 71 75 69 63 6b 6a 73 2f 6f 63 |tures_quickjs/oc|
00000020: 74 61 6e 65 2f 72 75 6e 2e 6a 73 12 2e 2f 62 61 |tane/run.js../ba|
00000030: 73 65 2e 6a 73 1a 2e 2f 72 69 63 68 61 72 64 73 |se.js../richards|
00000040: 2e 6a 73 1c 2e 2f 64 65 6c 74 61 62 6c 75 65 2e |.js../deltablue.|
00000050: 6a 73 16 2e 2f 63 72 79 70 74 6f 2e 6a 73 1a 2e |js../crypto.js..|
00000060: 2f 72 61 79 74 72 61 63 65 2e 6a 73 22 2e 2f 65 |/raytrace.js"./e|
00000070: 61 72 6c 65 79 2d 62 6f 79 65 72 2e 6a 73 16 2e |arley-boyer.js..|
00000080: 2f 72 65 67 65 78 70 2e 6a 73 14 2e 2f 73 70 6c |/regexp.js../spl|
00000090: 61 79 2e 6a 73 24 2e 2f 6e 61 76 69 65 72 2d 73 |ay.js$./navier-s|
000000a0: 74 6f 6b 65 73 2e 6a 73 1a 2e 2f 6d 61 6e 64 72 |tokes.js../mandr|
000000b0: 65 65 6c 2e 6a 73 20 2e 2f 67 62 65 6d 75 2d 70 |eel.js ./gbemu-p|
000000c0: 61 72 74 31 2e 6a 73 20 2e 2f 67 62 65 6d 75 2d |art1.js ./gbemu-|
000000d0: 70 61 72 74 32 2e 6a 73 1c 2e 2f 63 6f 64 65 2d |part2.js../code-|
000000e0: 6c 6f 61 64 2e 6a 73 14 2e 2f 62 6f 78 32 64 2e |load.js../box2d.|
000000f0: 6a 73 1e 2e 2f 74 79 70 65 73 63 72 69 70 74 2e |js../typescript.|
00000100: 6a 73 2a 2e 2f 74 79 70 65 73 63 72 69 70 74 2d |js*./typescript-|
00000110: 69 6e 70 75 74 2e 6a 73 30 2e 2f 74 79 70 65 73 |input.js0./types|
00000120: 63 72 69 70 74 2d 63 6f 6d 70 69 6c 65 72 2e 6a |cript-compiler.j|
00000130: 73 1c 42 65 6e 63 68 6d 61 72 6b 53 75 69 74 65 |s.BenchmarkSuite|
00000140: 0e 73 75 63 63 65 73 73 0a 70 72 69 6e 74 16 50 |.success.print.P|
00000150: 72 69 6e 74 52 65 73 75 6c 74 06 72 75 6e 08 61 |rintResult.run.a|
00000160: 72 67 73 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 08 |rgs.console.log.|
00000170: 70 75 73 68 0c 6e 6f 74 69 66 79 0c 72 65 73 75 |push.notify.resu|
00000180: 6c 74 04 3a 20 0c 63 6f 6e 66 69 67 10 64 6f 57 |lt.: .config.doW|
00000190: 61 72 6d 75 70 1e 64 6f 44 65 74 65 72 6d 69 6e |armup.doDetermin|
000001a0: 69 73 74 69 63 12 52 75 6e 53 75 69 74 65 73 18 |istic.RunSuites.|
000001b0: 4e 6f 74 69 66 79 52 65 73 75 6c 74 16 4e 6f 74 |NotifyResult.Not|
000001c0: 69 66 79 45 72 72 6f 72 16 4e 6f 74 69 66 79 53 |ifyError.NotifyS|
000001d0: 63 6f 72 65 14 4e 6f 74 69 66 79 53 74 65 70 0a |core.NotifyStep.|
000001e0: 65 72 72 6f 72 0a 73 63 6f 72 65 08 2d 2d 2d 2d |error.score.----|
000001f0: 1e 53 63 6f 72 65 20 28 76 65 72 73 69 6f 6e 20 |.Score (version |
00000200: 0e 76 65 72 73 69 6f 6e 06 29 3a 20 08 74 69 6d |.version.): .tim|
00000210: 65 10 70 61 72 73 65 49 6e 74 04 6d 73 0d c8 03 |e.parseInt.ms...|
00000220: 11 ca 03 02 cc 03 02 ce 03 02 d0 03 02 d2 03 02 |................|
00000230: d4 03 02 d6 03 02 d8 03 02 da 03 02 dc 03 02 de |................|
00000240: 03 02 e0 03 02 e2 03 02 e4 03 02 e6 03 02 e8 03 |................|
00000250: 02 ea 03 02 00 00 01 00 00 ec 03 00 00 0c 20 06 |.............. .|
00000260: 01 a4 01 00 00 00 01 05 03 18 00 ec 03 00 0c ee |................|
00000270: 03 00 01 f0 03 01 01 f2 03 02 01 f4 03 03 01 08 |................|
00000280: ec 0d c2 00 e5 c2 01 e6 c2 02 61 04 00 29 0a e4 |..........a..)..|
00000290: 60 04 00 f0 0e 06 2f c8 03 09 00 00 00 11 a4 01 |`...../.........|
000002a0: 00 11 06 00 0c 41 06 01 f0 03 01 00 00 05 01 00 |.....A..........|
000002b0: 5d 01 f6 03 00 01 00 ec 03 00 0c 0d 00 00 d7 39 |]..............9|
000002c0: fc 00 00 00 43 fd 00 00 00 26 00 00 b7 d3 54 0e |....C....&....T.|
000002d0: 18 27 00 00 0e 68 00 00 42 f8 00 00 00 98 ec 0c |.'...h..B.......|
000002e0: 68 00 00 26 00 00 44 f8 00 00 00 68 00 00 42 f8 |h..&..D....h..B.|
000002f0: 00 00 00 43 fe 00 00 00 26 00 00 b7 d3 54 0e 18 |...C....&....T..|
00000300: 27 00 00 0e 68 00 00 43 ff 00 00 00 68 00 00 42 |'...h..C....h..B|
00000310: f8 00 00 00 24 01 00 29 c8 03 26 2f 00 17 08 1b |....$..)..&/....|
00000320: 0e 2f 10 11 07 1c 0b 11 1c 2b 1d 11 1c 2c 23 11 |./.......+...,#.|
00000330: 1c 1b 0c 2f 12 11 07 1c 31 11 1c 1b 10 11 1c 1b |.../....1.......|
00000340: 1d 00 0c 43 06 01 f2 03 02 00 02 03 01 00 0c 02 |...C............|
00000350: 70 00 01 00 80 04 00 01 00 f0 03 02 00 df d3 04 |p...............|
00000360: 01 01 00 00 9f d4 9f f1 29 c8 03 0e 37 00 03 08 |........)...7...|
00000370: 07 0c 20 0a 07 12 07 03 07 19 00 0c 41 06 01 f4 |.. .........A...|
00000380: 03 01 01 00 04 04 04 76 02 fe 03 00 01 00 fe 03 |.......v........|
00000390: 01 ff ff ff ff 0f 20 f2 03 03 00 ee 03 01 00 f0 |...... .........|
000003a0: 03 02 00 ec 03 00 0c 63 00 00 d3 11 f4 ec 0a 0e |.......c........|
000003b0: c2 00 4f ff 00 00 00 db cb 68 03 00 d3 44 ff 00 |..O......h...D..|
000003c0: 00 00 68 03 00 42 02 01 00 00 39 47 00 00 00 44 |..h..B....9G...D|
000003d0: 03 01 00 00 68 03 00 42 02 01 00 00 39 47 00 00 |....h..B....9G..|
000003e0: 00 44 04 01 00 00 68 03 00 43 05 01 00 00 0b df |.D....h..C......|
000003f0: 4e 06 01 00 00 c2 01 4f 07 01 00 00 4e 07 01 00 |N......O....N...|
00000400: 00 c2 02 4f 08 01 00 00 4e 08 01 00 00 c2 03 4f |...O....N......O|
00000410: 09 01 00 00 4e 09 01 00 00 24 01 00 29 c8 03 1a |....N....$..)...|
00000420: 3a 00 5d 08 11 30 21 2f 11 1c 1b 26 35 41 11 1c |:.]..0!/...&5A..|
00000430: 1b 34 35 4f 11 1c 21 08 d3 0c 00 0c 42 06 01 00 |.45O..!.....B...|
00000440: 00 00 00 00 00 00 01 00 29 c8 03 02 3a 16 00 0c |........)...:...|
00000450: 42 06 01 00 02 00 02 03 02 00 08 02 70 00 01 00 |B...........p...|
00000460: 94 04 00 01 00 f2 03 00 00 ee 03 01 00 df d3 d4 |................|
00000470: f2 0e 09 e4 29 c8 03 0c 40 15 03 11 07 18 07 0c |....)...@.......|
00000480: 07 0d 0d 15 00 0c 42 06 01 00 01 00 01 03 02 00 |......B.........|
00000490: 21 01 96 04 00 01 00 f0 03 02 00 ec 03 03 0c df |!...............|
000004a0: 04 0c 01 00 00 f1 0e df 04 0d 01 00 00 68 01 00 |.............h..|
000004b0: 42 0e 01 00 00 9f 04 0f 01 00 00 9f d3 9f f1 29 |B..............)|
000004c0: c8 03 16 44 15 04 11 20 0a 0d 09 20 34 11 1c 1b |...D... ... 4...|
000004d0: 1f 20 32 07 14 07 03 07 67 00 0c 42 06 01 00 02 |. 2.....g..B....|
000004e0: 00 02 07 01 00 26 02 70 00 01 00 a0 04 00 01 00 |.....&.p........|
000004f0: f0 03 02 00 d4 ec 23 df 04 0c 01 00 00 43 5e 00 |......#......C^.|
00000500: 00 00 d3 04 01 01 00 00 39 11 01 00 00 d4 f1 04 |........9.......|
00000510: 12 01 00 00 24 04 00 f1 0e 29 c8 03 10 4a 14 03 |....$....)...J..|
00000520: 07 12 00 39 1a 20 12 1b 12 07 01 2f 31 00       |...9. ...../1.|
```