# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/quickjs-tests/test_closure.ts
**生成时间**: 2025-12-25T17:57:15.591Z

## 大小对比

- TypeScript编译器: 3451 字节
- WASM编译器: 5349 字节
- 差异: -1898 字节 (-35.48%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 71,
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
      "rawLength": 38,
      "actualLength": 19,
      "isWideChar": 0,
      "string": "test_arrow_function",
      "offset": 70
    },
    {
      "index": 10,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "test_with",
      "offset": 90
    },
    {
      "index": 11,
      "rawLength": 34,
      "actualLength": 17,
      "isWideChar": 0,
      "string": "test_eval_closure",
      "offset": 100
    },
    {
      "index": 12,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "test_eval_const",
      "offset": 118
    },
    {
      "index": 13,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "__loadScript",
      "offset": 134
    },
    {
      "index": 14,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "test_assert.js",
      "offset": 147
    },
    {
      "index": 15,
      "rawLength": 76,
      "actualLength": 38,
      "isWideChar": 0,
      "string": "a=1,b=2,c=3,d=4,x=10,b=2,c=3,d=5,x=10,",
      "offset": 162
    },
    {
      "index": 16,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "closure1",
      "offset": 201
    },
    {
      "index": 17,
      "rawLength": 96,
      "actualLength": 48,
      "isWideChar": 0,
      "string": "__tests__/fixtures/quickjs-tests/test_closure.js",
      "offset": 210
    },
    {
      "index": 18,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "actual",
      "offset": 259
    },
    {
      "index": 19,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "expected",
      "offset": 266
    },
    {
      "index": 20,
      "rawLength": 46,
      "actualLength": 23,
      "isWideChar": 0,
      "string": "assertion failed: got |",
      "offset": 275
    },
    {
      "index": 21,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "|",
      "offset": 299
    },
    {
      "index": 22,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": ", expected |",
      "offset": 301
    },
    {
      "index": 23,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": " (",
      "offset": 314
    },
    {
      "index": 24,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": ")",
      "offset": 317
    },
    {
      "index": 25,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "str",
      "offset": 319
    },
    {
      "index": 26,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": ",",
      "offset": 323
    },
    {
      "index": 27,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 325
    },
    {
      "index": 28,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 327
    },
    {
      "index": 29,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 329
    },
    {
      "index": 30,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 331
    },
    {
      "index": 31,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "g",
      "offset": 333
    },
    {
      "index": 32,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "a=",
      "offset": 335
    },
    {
      "index": 33,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "d",
      "offset": 338
    },
    {
      "index": 34,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "h",
      "offset": 340
    },
    {
      "index": 35,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "b=",
      "offset": 342
    },
    {
      "index": 36,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "c=",
      "offset": 345
    },
    {
      "index": 37,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "d=",
      "offset": 348
    },
    {
      "index": 38,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "x=",
      "offset": 351
    },
    {
      "index": 39,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "f2",
      "offset": 354
    },
    {
      "index": 40,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 357
    },
    {
      "index": 41,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "r",
      "offset": 361
    },
    {
      "index": 42,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "closure2",
      "offset": 363
    },
    {
      "index": 43,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "val",
      "offset": 372
    },
    {
      "index": 44,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "expr_func",
      "offset": 376
    },
    {
      "index": 45,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "myfunc1",
      "offset": 386
    },
    {
      "index": 46,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "n",
      "offset": 394
    },
    {
      "index": 47,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "myfunc2",
      "offset": 396
    },
    {
      "index": 48,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "fib",
      "offset": 404
    },
    {
      "index": 49,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "fib_func",
      "offset": 408
    },
    {
      "index": 50,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "fib1",
      "offset": 417
    },
    {
      "index": 51,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "f1",
      "offset": 422
    },
    {
      "index": 52,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "f3",
      "offset": 425
    },
    {
      "index": 53,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "f4",
      "offset": 428
    },
    {
      "index": 54,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "o1",
      "offset": 431
    },
    {
      "index": 55,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "o2",
      "offset": 434
    },
    {
      "index": 56,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "use strict",
      "offset": 437
    },
    {
      "index": 57,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "call",
      "offset": 448
    },
    {
      "index": 58,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "this_val",
      "offset": 453
    },
    {
      "index": 59,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "super.f()",
      "offset": 462
    },
    {
      "index": 60,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 472
    },
    {
      "index": 61,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "local",
      "offset": 474
    },
    {
      "index": 62,
      "rawLength": 32,
      "actualLength": 16,
      "isWideChar": 0,
      "string": "var z=\"var_obj\";",
      "offset": 480
    },
    {
      "index": 63,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "z",
      "offset": 497
    },
    {
      "index": 64,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "var_obj",
      "offset": 499
    },
    {
      "index": 65,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "tab",
      "offset": 507
    },
    {
      "index": 66,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 511
    },
    {
      "index": 67,
      "rawLength": 74,
      "actualLength": 37,
      "isWideChar": 0,
      "string": "tab.push(function g1() { return i; })",
      "offset": 513
    },
    {
      "index": 68,
      "rawLength": 74,
      "actualLength": 37,
      "isWideChar": 0,
      "string": "tab.push(function g2() { return i; })",
      "offset": 551
    },
    {
      "index": 69,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "success",
      "offset": 589
    },
    {
      "index": 70,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "a = 1",
      "offset": 597
    }
  ],
  "functionHeader": {
    "offset": 603,
    "tag": "0xc",
    "remaining": 2848
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 71,
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
      "rawLength": 38,
      "actualLength": 19,
      "isWideChar": 0,
      "string": "test_arrow_function",
      "offset": 70
    },
    {
      "index": 10,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "test_with",
      "offset": 90
    },
    {
      "index": 11,
      "rawLength": 34,
      "actualLength": 17,
      "isWideChar": 0,
      "string": "test_eval_closure",
      "offset": 100
    },
    {
      "index": 12,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "test_eval_const",
      "offset": 118
    },
    {
      "index": 13,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "__loadScript",
      "offset": 134
    },
    {
      "index": 14,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "test_assert.js",
      "offset": 147
    },
    {
      "index": 15,
      "rawLength": 76,
      "actualLength": 38,
      "isWideChar": 0,
      "string": "a=1,b=2,c=3,d=4,x=10,b=2,c=3,d=5,x=10,",
      "offset": 162
    },
    {
      "index": 16,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "closure1",
      "offset": 201
    },
    {
      "index": 17,
      "rawLength": 96,
      "actualLength": 48,
      "isWideChar": 0,
      "string": "__tests__/fixtures/quickjs-tests/test_closure.js",
      "offset": 210
    },
    {
      "index": 18,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "actual",
      "offset": 259
    },
    {
      "index": 19,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "expected",
      "offset": 266
    },
    {
      "index": 20,
      "rawLength": 46,
      "actualLength": 23,
      "isWideChar": 0,
      "string": "assertion failed: got |",
      "offset": 275
    },
    {
      "index": 21,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "|",
      "offset": 299
    },
    {
      "index": 22,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": ", expected |",
      "offset": 301
    },
    {
      "index": 23,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": " (",
      "offset": 314
    },
    {
      "index": 24,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": ")",
      "offset": 317
    },
    {
      "index": 25,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "str",
      "offset": 319
    },
    {
      "index": 26,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": ",",
      "offset": 323
    },
    {
      "index": 27,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 325
    },
    {
      "index": 28,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 327
    },
    {
      "index": 29,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 329
    },
    {
      "index": 30,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 331
    },
    {
      "index": 31,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "g",
      "offset": 333
    },
    {
      "index": 32,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "a=",
      "offset": 335
    },
    {
      "index": 33,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "d",
      "offset": 338
    },
    {
      "index": 34,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "h",
      "offset": 340
    },
    {
      "index": 35,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "b=",
      "offset": 342
    },
    {
      "index": 36,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "c=",
      "offset": 345
    },
    {
      "index": 37,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "d=",
      "offset": 348
    },
    {
      "index": 38,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "x=",
      "offset": 351
    },
    {
      "index": 39,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "f2",
      "offset": 354
    },
    {
      "index": 40,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 357
    },
    {
      "index": 41,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "r",
      "offset": 361
    },
    {
      "index": 42,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "closure2",
      "offset": 363
    },
    {
      "index": 43,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "val",
      "offset": 372
    },
    {
      "index": 44,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "expr_func",
      "offset": 376
    },
    {
      "index": 45,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "myfunc1",
      "offset": 386
    },
    {
      "index": 46,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "n",
      "offset": 394
    },
    {
      "index": 47,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "myfunc2",
      "offset": 396
    },
    {
      "index": 48,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "fib",
      "offset": 404
    },
    {
      "index": 49,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "fib_func",
      "offset": 408
    },
    {
      "index": 50,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "fib1",
      "offset": 417
    },
    {
      "index": 51,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "f1",
      "offset": 422
    },
    {
      "index": 52,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "f3",
      "offset": 425
    },
    {
      "index": 53,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "f4",
      "offset": 428
    },
    {
      "index": 54,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "o1",
      "offset": 431
    },
    {
      "index": 55,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "o2",
      "offset": 434
    },
    {
      "index": 56,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "call",
      "offset": 437
    },
    {
      "index": 57,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "this_val",
      "offset": 442
    },
    {
      "index": 58,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "super.f()",
      "offset": 451
    },
    {
      "index": 59,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 461
    },
    {
      "index": 60,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "local",
      "offset": 463
    },
    {
      "index": 61,
      "rawLength": 32,
      "actualLength": 16,
      "isWideChar": 0,
      "string": "var z=\"var_obj\";",
      "offset": 469
    },
    {
      "index": 62,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "z",
      "offset": 486
    },
    {
      "index": 63,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "var_obj",
      "offset": 488
    },
    {
      "index": 64,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "eval(\"x\")",
      "offset": 496
    },
    {
      "index": 65,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "tab",
      "offset": 506
    },
    {
      "index": 66,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 510
    },
    {
      "index": 67,
      "rawLength": 74,
      "actualLength": 37,
      "isWideChar": 0,
      "string": "tab.push(function g1() { return i; })",
      "offset": 512
    },
    {
      "index": 68,
      "rawLength": 74,
      "actualLength": 37,
      "isWideChar": 0,
      "string": "tab.push(function g2() { return i; })",
      "offset": 550
    },
    {
      "index": 69,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "success",
      "offset": 588
    },
    {
      "index": 70,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "a = 1",
      "offset": 596
    }
  ],
  "functionHeader": {
    "offset": 602,
    "tag": "0xc",
    "remaining": 4747
  }
}
```

## 字节级差异

共发现 4569 个字节差异:

- 偏移量 0x1b5: TS=0x14 vs WASM=0x08
- 偏移量 0x1b6: TS=0x75 vs WASM=0x63
- 偏移量 0x1b7: TS=0x73 vs WASM=0x61
- 偏移量 0x1b8: TS=0x65 vs WASM=0x6c
- 偏移量 0x1b9: TS=0x20 vs WASM=0x6c
- 偏移量 0x1ba: TS=0x73 vs WASM=0x10
- 偏移量 0x1bc: TS=0x72 vs WASM=0x68
- 偏移量 0x1be: TS=0x63 vs WASM=0x73
- 偏移量 0x1bf: TS=0x74 vs WASM=0x5f
- 偏移量 0x1c0: TS=0x08 vs WASM=0x76
- 偏移量 0x1c1: TS=0x63 vs WASM=0x61
- 偏移量 0x1c2: TS=0x61 vs WASM=0x6c
- 偏移量 0x1c3: TS=0x6c vs WASM=0x12
- 偏移量 0x1c4: TS=0x6c vs WASM=0x73
- 偏移量 0x1c5: TS=0x10 vs WASM=0x75
- 偏移量 0x1c6: TS=0x74 vs WASM=0x70
- 偏移量 0x1c7: TS=0x68 vs WASM=0x65
- 偏移量 0x1c8: TS=0x69 vs WASM=0x72
- 偏移量 0x1c9: TS=0x73 vs WASM=0x2e
- 偏移量 0x1ca: TS=0x5f vs WASM=0x66
- ... (显示前20个差异，总共4569个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 47 02 65 0c 61 73 73 65 72 74 0e 6c 6f 67 5f |.G.e.assert.log_|
00000010: 73 74 72 06 6c 6f 67 02 66 04 67 31 1a 74 65 73 |str.log.f.g1.tes|
00000020: 74 5f 63 6c 6f 73 75 72 65 31 1a 74 65 73 74 5f |t_closure1.test_|
00000030: 63 6c 6f 73 75 72 65 32 1a 74 65 73 74 5f 63 6c |closure2.test_cl|
00000040: 6f 73 75 72 65 33 26 74 65 73 74 5f 61 72 72 6f |osure3&test_arro|
00000050: 77 5f 66 75 6e 63 74 69 6f 6e 12 74 65 73 74 5f |w_function.test_|
00000060: 77 69 74 68 22 74 65 73 74 5f 65 76 61 6c 5f 63 |with"test_eval_c|
00000070: 6c 6f 73 75 72 65 1e 74 65 73 74 5f 65 76 61 6c |losure.test_eval|
00000080: 5f 63 6f 6e 73 74 18 5f 5f 6c 6f 61 64 53 63 72 |_const.__loadScr|
00000090: 69 70 74 1c 74 65 73 74 5f 61 73 73 65 72 74 2e |ipt.test_assert.|
000000a0: 6a 73 4c 61 3d 31 2c 62 3d 32 2c 63 3d 33 2c 64 |jsLa=1,b=2,c=3,d|
000000b0: 3d 34 2c 78 3d 31 30 2c 62 3d 32 2c 63 3d 33 2c |=4,x=10,b=2,c=3,|
000000c0: 64 3d 35 2c 78 3d 31 30 2c 10 63 6c 6f 73 75 72 |d=5,x=10,.closur|
000000d0: 65 31 60 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |e1`__tests__/fix|
000000e0: 74 75 72 65 73 2f 71 75 69 63 6b 6a 73 2d 74 65 |tures/quickjs-te|
000000f0: 73 74 73 2f 74 65 73 74 5f 63 6c 6f 73 75 72 65 |sts/test_closure|
00000100: 2e 6a 73 0c 61 63 74 75 61 6c 10 65 78 70 65 63 |.js.actual.expec|
00000110: 74 65 64 2e 61 73 73 65 72 74 69 6f 6e 20 66 61 |ted.assertion fa|
00000120: 69 6c 65 64 3a 20 67 6f 74 20 7c 02 7c 18 2c 20 |iled: got |.|., |
00000130: 65 78 70 65 63 74 65 64 20 7c 04 20 28 02 29 06 |expected |. (.).|
00000140: 73 74 72 02 2c 02 61 02 62 02 63 02 78 02 67 04 |str.,.a.b.c.x.g.|
00000150: 61 3d 02 64 02 68 04 62 3d 04 63 3d 04 64 3d 04 |a=.d.h.b=.c=.d=.|
00000160: 78 3d 04 66 32 06 6f 62 6a 02 72 10 63 6c 6f 73 |x=.f2.obj.r.clos|
00000170: 75 72 65 32 06 76 61 6c 12 65 78 70 72 5f 66 75 |ure2.val.expr_fu|
00000180: 6e 63 0e 6d 79 66 75 6e 63 31 02 6e 0e 6d 79 66 |nc.myfunc1.n.myf|
00000190: 75 6e 63 32 06 66 69 62 10 66 69 62 5f 66 75 6e |unc2.fib.fib_fun|
000001a0: 63 08 66 69 62 31 04 66 31 04 66 33 04 66 34 04 |c.fib1.f1.f3.f4.|
000001b0: 6f 31 04 6f 32 14 75 73 65 20 73 74 72 69 63 74 |o1.o2.use strict|
000001c0: 08 63 61 6c 6c 10 74 68 69 73 5f 76 61 6c 12 73 |.call.this_val.s|
000001d0: 75 70 65 72 2e 66 28 29 02 79 0a 6c 6f 63 61 6c |uper.f().y.local|
000001e0: 20 76 61 72 20 7a 3d 22 76 61 72 5f 6f 62 6a 22 | var z="var_obj"|
000001f0: 3b 02 7a 0e 76 61 72 5f 6f 62 6a 06 74 61 62 02 |;.z.var_obj.tab.|
00000200: 69 4a 74 61 62 2e 70 75 73 68 28 66 75 6e 63 74 |iJtab.push(funct|
00000210: 69 6f 6e 20 67 31 28 29 20 7b 20 72 65 74 75 72 |ion g1() { retur|
00000220: 6e 20 69 3b 20 7d 29 4a 74 61 62 2e 70 75 73 68 |n i; })Jtab.push|
00000230: 28 66 75 6e 63 74 69 6f 6e 20 67 32 28 29 20 7b |(function g2() {|
00000240: 20 72 65 74 75 72 6e 20 69 3b 20 7d 29 0e 73 75 | return i; }).su|
00000250: 63 63 65 73 73 0a 61 20 3d 20 31 0c 00 06 00 a4 |ccess.a = 1.....|
00000260: 01 00 02 00 04 00 0a a8 02 02 a6 01 00 00 00 c8 |................|
00000270: 03 03 00 03 40 e5 00 00 00 40 40 e6 00 00 00 00 |....@....@@.....|
00000280: 40 e7 00 00 00 40 40 e8 00 00 00 40 40 e9 00 00 |@....@@....@@...|
00000290: 00 00 40 ea 00 00 00 40 40 eb 00 00 00 40 40 ec |..@....@@....@@.|
000002a0: 00 00 00 40 40 ed 00 00 00 40 40 ee 00 00 00 40 |...@@....@@....@|
000002b0: 40 ef 00 00 00 40 40 f0 00 00 00 40 c2 00 41 e5 |@....@@....@..A.|
000002c0: 00 00 00 00 3f e6 00 00 00 00 c2 01 41 e7 00 00 |....?.......A...|
000002d0: 00 00 c2 02 41 e8 00 00 00 00 3f e9 00 00 00 00 |....A.....?.....|
000002e0: c2 03 41 ea 00 00 00 00 c2 04 41 eb 00 00 00 00 |..A.......A.....|
000002f0: c2 05 41 ec 00 00 00 00 c2 06 41 ed 00 00 00 00 |..A.......A.....|
00000300: c2 07 41 ee 00 00 00 00 c2 08 41 ef 00 00 00 00 |..A.......A.....|
00000310: c2 09 41 f0 00 00 00 00 06 cb 6f 13 00 00 00 39 |..A.......o....9|
00000320: f1 00 00 00 04 f2 00 00 00 f1 cb 0e ee 0b cc 6f |...............o|
00000330: 07 00 00 00 0e ee 02 30 c3 3a e6 00 00 00 39 e8 |.......0.:....9.|
00000340: 00 00 00 b8 b9 ba f3 3a e9 00 00 00 39 e9 00 00 |.......:....9...|
00000350: 00 bc f1 cb 39 e5 00 00 00 39 e6 00 00 00 04 f3 |....9....9......|
00000360: 00 00 00 04 f4 00 00 00 f3 cb 39 ea 00 00 00 f0 |..........9.....|
00000370: cb 39 eb 00 00 00 f0 cb 39 ec 00 00 00 f0 cb 39 |.9......9......9|
00000380: ed 00 00 00 f0 cb 39 ee 00 00 00 f0 cb 39 ef 00 |......9......9..|
00000390: 00 00 f0 cb 39 f0 00 00 00 f0 cf 28 ea 03 38 00 |....9......(..8.|
000003a0: 00 00 ab 01 24 08 34 18 00 15 2e 0d 2a 02 21 13 |....$.4.....*.!.|
000003b0: 20 04 0d 03 1b 0e 4d 01 00 02 92 02 0b 1b 1a 0d | .....M.........|
000003c0: 19 1b 1a 0d 19 1b 1a 0d 19 1b 26 0d 25 1b 12 0d |..........&.%...|
000003d0: 11 1b 22 0d 21 1b 1e 00 0c 43 06 00 ca 03 03 01 |..".!....C......|
000003e0: 03 04 00 00 83 01 04 ec 03 00 01 00 ee 03 00 01 |................|
000003f0: 00 68 00 01 00 9e 01 00 01 00 0c 01 cb c7 eb b8 |.h..............|
00000400: ab ec 03 0a d8 d3 d4 ad ec 02 29 d3 07 ae 11 ec |..........).....|
00000410: 05 0e d4 07 ae 11 ec 0a 0e d3 99 04 4b 00 00 00 |............K...|
00000420: ab 11 ec 0a 0e d4 99 04 4b 00 00 00 ab 11 ec 15 |........K.......|
00000430: 0e d3 43 39 00 00 00 24 00 00 d4 43 39 00 00 00 |..C9...$...C9...|
00000440: 24 00 00 ad ec 02 29 39 9f 00 00 00 04 f8 00 00 |$.....)9........|
00000450: 00 d3 9f 04 f9 00 00 00 9f 04 fa 00 00 00 9f d4 |................|
00000460: 9f 04 f9 00 00 00 9f d5 ec 10 04 fb 00 00 00 d5 |................|
00000470: 9f 04 fc 00 00 00 9f ee 02 c3 9f f1 30 ea 03 50 |............0..P|
00000480: 03 00 12 10 07 12 0c 10 12 21 0d 00 07 16 07 07 |.........!......|
00000490: 12 0d 08 00 0c 0e 1b 18 0c 12 1c 23 07 0e 39 2c |...........#..9,|
000004a0: 07 12 3a 59 07 0c 1b 12 11 0e 07 10 1b 12 11 29 |..:Y...........)|
000004b0: 12 29 08 04 34 44 07 03 20 12 20 0c 08 3f 07 03 |.)..4D.. . ..?..|
000004c0: 20 16 08 31 2a 22 07 03 20 14 15 0c 06 31 07 15 | ..1*".. ....1..|
000004d0: 00 0c 43 06 00 ce 03 01 00 01 03 00 00 14 01 fa |..C.............|
000004e0: 03 00 01 00 39 e6 00 00 00 d3 04 fe 00 00 00 9f |....9...........|
000004f0: 9f 11 3a e6 00 00 00 29 ea 03 0a 17 00 03 08 1b |..:....)........|
00000500: 16 20 08 07 0d 00 0c 43 06 00 d0 03 03 02 03 03 |. .....C........|
00000510: 00 01 1a 05 fe 03 00 01 00 80 04 00 01 40 82 04 |.............@..|
00000520: 00 01 40 84 04 00 00 40 86 04 00 01 00 c2 00 cc |..@....@........|
00000530: bf 0a cb 39 e7 00 00 00 04 04 01 00 00 d3 9f f1 |...9............|
00000540: 0e c8 bb f1 0e c8 28 ea 03 14 1a 00 22 08 34 16 |......(.....".4.|
00000550: 07 03 07 0b 00 02 14 05 0c 02 0d 0c 07 0d 00 0c |................|
00000560: 43 06 00 86 04 01 01 01 03 03 01 22 02 8a 04 00 |C.........."....|
00000570: 01 40 8c 04 00 00 00 84 04 00 01 80 04 01 03 82 |.@..............|
00000580: 04 02 03 c2 00 cb 39 e7 00 00 00 04 07 01 00 00 |......9.........|
00000590: e0 9f f1 0e 39 e7 00 00 00 04 08 01 00 00 e1 9f |....9...........|
000005a0: f1 0e c7 f0 29 ea 03 18 1d 04 00 03 0a 08 34 16 |....).........4.|
000005b0: 07 03 07 0b 0d 05 34 16 07 03 07 0b 0d 05 07 02 |......4.........|
000005c0: 00 0c 43 06 00 8c 04 00 00 00 03 02 00 1c 00 8a |..C.............|
000005d0: 04 00 03 84 04 00 00 39 e7 00 00 00 04 09 01 00 |.......9........|
000005e0: 00 df 9f f1 0e 39 e7 00 00 00 04 0a 01 00 00 e0 |.....9..........|
000005f0: 9f f1 29 ea 03 12 1e 08 03 08 34 16 07 03 07 0b |..).......4.....|
00000600: 0d 05 34 16 07 03 07 0b 00 0c 43 06 00 d4 03 00 |..4.......C.....|
00000610: 03 00 04 00 01 29 03 96 04 00 00 00 98 04 00 01 |.....)..........|
00000620: 00 9a 04 00 02 00 c2 00 cf f0 d0 43 44 00 00 00 |...........CD...|
00000630: bf 0a 24 01 00 0e c8 43 43 00 00 00 24 00 00 cd |..$....CC...$...|
00000640: 39 e5 00 00 00 c9 bf 0a 04 0e 01 00 00 f3 29 ea |9.............).|
00000650: 03 1a 2c 00 00 02 16 1c 07 04 08 17 07 06 25 08 |..,...........%.|
00000660: 18 05 07 06 1b 08 17 15 1b 0e 2a 01 00 0c 43 06 |..........*...C.|
00000670: 00 96 04 00 03 00 02 00 02 16 03 9e 04 00 00 40 |...............@|
00000680: 88 01 00 01 00 86 01 00 02 00 c2 00 cc c2 01 cd |................|
00000690: b8 cb 0b c8 4e 44 00 00 00 c9 4e 43 00 00 00 28 |....ND....NC...(|
000006a0: ea 03 0a 2d 04 00 09 10 28 20 18 20 37 00 0c 43 |...-....( . 7..C|
000006b0: 06 00 88 01 01 00 01 01 01 00 03 01 fe 03 00 01 |................|
000006c0: 00 9e 04 00 01 d3 e3 29 ea 03 04 2f 08 03 14 00 |.......).../....|
000006d0: 0c 43 06 00 86 01 01 00 01 01 01 00 02 01 fe 03 |.C..............|
000006e0: 00 01 00 9e 04 00 01 df 28 ea 03 06 32 08 03 16 |........(...2...|
000006f0: 07 0d 00 0c 43 06 00 d6 03 00 02 00 04 00 01 14 |....C...........|
00000700: 02 a0 04 00 00 00 9a 04 00 01 00 c2 00 cf b8 f1 |................|
00000710: cc 39 e5 00 00 00 c8 b7 04 10 01 00 00 f3 29 ea |.9............).|
00000720: 03 0e 3d 00 00 02 16 10 0c 12 0d 19 1b 0e 25 01 |..=...........%.|
00000730: 00 0c 43 06 00 a2 04 01 02 01 02 00 01 12 03 a4 |..C.............|
00000740: 04 00 01 00 a6 04 00 00 00 a2 04 00 01 44 0c 02 |.............D..|
00000750: cc c2 00 cb d3 b7 ab ec 03 b7 28 c7 d3 23 01 00 |..........(..#..|
00000760: ea 03 10 3e 14 00 06 08 0f 0c 04 17 03 09 0e 07 |...>............|
00000770: 10 07 1d 00 0c 43 06 00 a6 04 01 00 01 03 01 00 |.....C..........|
00000780: 07 01 a4 04 00 01 00 a2 04 01 41 df d3 b8 a0 23 |..........A....#|
00000790: 01 00 ea 03 0a 3f 08 03 16 07 10 0c 04 07 21 00 |.....?........!.|
000007a0: 0c 43 06 00 d8 03 00 02 00 04 00 02 28 02 a8 04 |.C..........(...|
000007b0: 00 00 40 aa 04 00 01 00 c2 00 cb c2 01 cc 39 e5 |..@...........9.|
000007c0: 00 00 00 c7 bd f1 bf 08 04 14 01 00 00 f3 0e 39 |...............9|
000007d0: e5 00 00 00 c8 bd f1 bf 08 04 15 01 00 00 f3 29 |...............)|
000007e0: ea 03 14 4b 00 00 06 22 08 1b 0e 0c 06 2a 07 0d |...K...".....*..|
000007f0: 0b 1b 0e 0c 10 2a 11 00 0c 43 06 00 a8 04 01 00 |.....*...C......|
00000800: 01 04 01 00 1a 01 a4 04 00 01 00 a8 04 00 01 d3 |................|
00000810: b7 a6 ec 03 b7 28 d3 b8 ab ec 03 b8 28 df d3 b8 |.....(......(...|
00000820: a0 f1 df d3 b9 a0 f1 9f 28 ea 03 22 4c 04 03 10 |........(.."L...|
00000830: 0c 04 17 03 08 0a 0c 04 17 0d 09 0e 07 08 0c 04 |................|
00000840: 07 05 07 14 07 08 0c 04 07 05 07 09 07 23 00 0c |.............#..|
00000850: 43 06 00 ac 04 01 01 01 04 00 00 1d 02 a4 04 00 |C...............|
00000860: 01 00 ac 04 00 00 04 0c 02 cb d3 b7 a6 ec 03 b7 |................|
00000870: 28 d3 b8 ab ec 03 b8 28 c7 d3 b8 a0 f1 c7 d3 b9 |(......(........|
00000880: a0 f1 9f 28 ea 03 22 54 13 12 0d 0c 04 17 03 08 |...(.."T........|
00000890: 0a 0c 04 17 0d 09 0e 07 0a 0c 04 07 05 07 14 07 |................|
000008a0: 0a 0c 04 07 05 07 0b 07 25 00 0c 43 06 00 da 03 |........%..C....|
000008b0: 00 07 00 04 00 06 af 01 07 ae 04 00 00 00 96 04 |................|
000008c0: 00 01 00 b0 04 00 02 00 b2 04 00 03 00 fe 03 00 |................|
000008d0: 04 00 b4 04 00 05 00 b6 04 00 06 00 c2 00 cb c2 |................|
000008e0: 01 cc c2 02 cd c2 03 ce 04 1c 01 00 00 0e c7 b8 |................|
000008f0: b9 f2 c5 04 39 e5 00 00 00 c4 04 eb b9 f2 0e 39 |....9..........9|
00000900: e5 00 00 00 c4 04 b7 48 b8 ad 11 ec 08 0e c4 04 |.......H........|
00000910: b8 48 b9 ad f1 0e 39 e5 00 00 00 c8 43 1d 01 00 |.H....9.....C...|
00000920: 00 04 1e 01 00 00 24 01 00 04 1e 01 00 00 ad f1 |......$.........|
00000930: 0e 39 e5 00 00 00 c9 43 1d 01 00 00 04 1e 01 00 |.9.....C........|
00000940: 00 24 01 00 04 1e 01 00 00 ad f1 0e 39 e5 00 00 |.$..........9...|
00000950: 00 ca 11 21 00 00 ca ad f1 0e 0b c2 04 56 e8 00 |...!.........V..|
00000960: 00 00 04 c5 05 0b c2 05 56 e8 00 00 00 04 c6 06 |........V.......|
00000970: c4 05 44 46 00 00 00 39 e5 00 00 00 c4 06 43 e8 |..DF...9......C.|
00000980: 00 00 00 24 00 00 c4 06 ad f1 29 ea 03 5a 5f 00 |...$......)..Z_.|
00000990: 3f 08 00 06 1c 08 11 04 12 0b 1b 0e 0c 02 0c 03 |?...............|
000009a0: 0d 0b 1b 0e 11 02 0c 08 1b 12 11 02 0c 08 07 27 |...............'|
000009b0: 0d 0b 1b 0e 07 04 34 0a 2a 1a 07 29 0d 0b 1b 0e |......4.*..)....|
000009c0: 07 04 34 0a 2a 1a 07 29 0d 0b 1b 16 0c 04 11 0e |..4.*..)........|
000009d0: 07 07 07 13 00 16 0a 0b 0c 1e 26 1d 1b 0e 0c 04 |..........&.....|
000009e0: 1b 04 11 0e 0c 07 07 0f 00 0c 43 06 00 ae 04 00 |..........C.....|
000009f0: 01 00 01 00 01 08 01 9e 01 00 01 40 0c 01 cb c2 |...........@....|
00000a00: 00 23 00 00 ea 03 04 61 04 1c 08 00 0c 42 06 00 |.#.....a.....B..|
00000a10: 00 00 00 00 01 01 00 02 00 9e 01 00 01 df 28 ea |..............(.|
00000a20: 03 04 62 10 02 0c 00 0c 43 06 00 96 04 00 01 00 |..b.....C.......|
00000a30: 01 00 01 07 01 10 00 01 40 08 cb c2 00 23 00 00 |........@....#..|
00000a40: ea 03 04 64 04 17 08 00 0c 42 06 00 00 00 00 00 |...d.....B......|
00000a50: 01 01 00 02 00 10 00 01 df 28 ea 03 02 65 10 00 |.........(...e..|
00000a60: 0c 43 06 00 b0 04 00 00 00 01 00 01 05 00 c2 00 |.C..............|
00000a70: 23 00 00 ea 03 04 67 04 0d 08 00 0c 42 06 00 00 |#.....g.....B...|
00000a80: 00 00 00 02 00 00 0d 00 39 3c 00 00 00 04 08 00 |........9<......|
00000a90: 00 00 23 01 00 ea 03 06 68 10 02 0c 34 08 00 0c |..#.....h...4...|
00000aa0: 43 06 00 b2 04 00 00 00 01 00 01 05 00 c2 00 23 |C..............#|
00000ab0: 00 00 ea 03 04 6a 04 0d 08 00 0c 42 06 00 00 00 |.....j.....B....|
00000ac0: 00 00 02 00 00 0d 00 39 3c 00 00 00 04 73 00 00 |.......9<....s..|
00000ad0: 00 23 01 00 ea 03 06 6b 10 02 0c 34 08 00 0c 42 |.#.....k...4...B|
00000ae0: 07 00 00 00 01 00 01 00 00 04 01 10 00 01 00 08 |................|
00000af0: cb c7 28 ea 03 04 74 0f 11 0c 00 0c 42 07 00 00 |..(...t.....B...|
00000b00: 00 00 00 01 00 01 05 00 c2 00 23 00 00 ea 03 04 |..........#.....|
00000b10: 75 0f 0d 05 00 0c 42 07 00 00 00 00 00 02 00 00 |u.....B.........|
00000b20: 0d 00 39 3c 00 00 00 04 1f 01 00 00 23 01 00 ea |..9<........#...|
00000b30: 03 06 76 14 02 0c 34 08 00 0c 43 06 00 dc 03 00 |..v...4...C.....|
00000b40: 02 00 03 00 00 3a 02 b4 04 00 00 00 84 04 00 01 |.....:..........|
00000b50: 00 0b 04 1a 01 00 00 4e 02 01 00 00 04 1a 01 00 |.......N........|
00000b60: 00 4e 20 01 00 00 cb 04 21 01 00 00 cc 39 3c 00 |.N .....!....9<.|
00000b70: 00 00 04 22 01 00 00 f1 0e 39 e5 00 00 00 39 23 |...".....9....9#|
00000b80: 01 00 00 04 24 01 00 00 ad f1 29 ea 03 0e 7b 00 |....$.....)...{.|
00000b90: 91 08 34 08 0d 07 1b 0e 34 04 07 05 00 0c 43 06 |..4.....4.....C.|
00000ba0: 00 de 03 00 06 00 03 00 01 a0 01 06 ca 04 00 00 |................|
00000bb0: 00 cc 04 02 00 20 cc 04 04 00 20 cc 04 06 00 20 |..... .... .... |
00000bc0: d0 03 07 04 20 cc 04 08 00 20 26 00 00 cb 63 01 |.... .... &...c.|
00000bd0: 00 b7 cc 64 01 00 ba a5 ec 17 39 3c 00 00 00 04 |...d......9<....|
00000be0: 27 01 00 00 f1 0e 64 01 00 93 65 01 00 0e ee e4 |'.....d...e.....|
00000bf0: 63 02 00 b7 cd 64 02 00 ba a5 ec 1e 39 e5 00 00 |c....d......9...|
00000c00: 00 c7 64 02 00 49 24 00 00 64 02 00 ad f1 0e 64 |..d..I$..d.....d|
00000c10: 02 00 93 65 02 00 0e ee dd 26 00 00 cb 63 03 00 |...e.....&...c..|
00000c20: b7 ce 64 03 00 ba a5 ec 17 63 04 00 c2 00 c5 04 |..d......c......|
00000c30: 64 04 00 f0 0e 64 03 00 93 65 03 00 0e ee e4 63 |d....d...e.....c|
00000c40: 05 00 b7 c5 05 64 05 00 ba a5 ec 1e 39 e5 00 00 |.....d......9...|
00000c50: 00 c7 64 05 00 49 24 00 00 64 05 00 ad f1 0e 64 |..d..I$..d.....d|
00000c60: 05 00 93 65 05 00 0e ee dd 29 ea 03 55 92 01 00 |...e.....)..U...|
00000c70: 04 08 30 20 16 04 12 1b 34 08 0b 1e 11 02 41 0f |..0 ....4.....A.|
00000c80: 16 04 12 1b 1b 0e 07 08 11 07 07 0c 11 0e 11 07 |................|
00000c90: 07 13 0b 1a 11 02 28 2f 30 20 16 04 00 0a 08 1b |......(/0 ......|
00000ca0: 11 02 00 02 07 24 11 02 00 0d 0c 0f 16 04 12 1b |.....$..........|
00000cb0: 1b 0e 07 08 11 07 07 0c 11 0e 11 07 07 13 0b 1a |................|
00000cc0: 11 02 00 0c 43 06 00 d0 03 00 00 00 02 00 00 0c |....C...........|
00000cd0: 00 39 3c 00 00 00 04 28 01 00 00 f1 29 ea 03 07 |.9<....(....)...|
00000ce0: 9d 01 10 03 07 34 08 00 0c 43 06 00 e0 03 00 04 |.....4...C......|
00000cf0: 00 03 00 01 34 04 fe 03 01 00 30 d2 04 00 00 00 |....4.....0.....|
00000d00: d0 03 00 02 00 c8 03 03 01 03 63 00 00 b8 cb 09 |..........c.....|
00000d10: cc c2 00 4f e8 00 00 00 cd 6f 0a 00 00 00 c9 f0 |...O.....o......|
00000d20: 0e 0e ee 13 ce 6f 0f 00 00 00 ca 39 d3 00 00 00 |.....o.....9....|
00000d30: a9 cc 0e ee 02 30 39 e5 00 00 00 c8 f1 29 ea 03 |.....09......)..|
00000d40: 15 a6 01 00 00 14 0e 10 07 02 3c 14 07 1a 1b 15 |..........<.....|
00000d50: 22 21 1b 0e 07 01 00 0c 43 06 00 00 00 00 00 02 |"!......C.......|
00000d60: 00 00 0c 00 39 3c 00 00 00 04 2a 01 00 00 f1 29 |....9<....*....)|
00000d70: ea 03 07 a9 01 0c 03 07 34 08 00                |........4..|
```

### WASM
```
00000000: 05 47 02 65 0c 61 73 73 65 72 74 0e 6c 6f 67 5f |.G.e.assert.log_|
00000010: 73 74 72 06 6c 6f 67 02 66 04 67 31 1a 74 65 73 |str.log.f.g1.tes|
00000020: 74 5f 63 6c 6f 73 75 72 65 31 1a 74 65 73 74 5f |t_closure1.test_|
00000030: 63 6c 6f 73 75 72 65 32 1a 74 65 73 74 5f 63 6c |closure2.test_cl|
00000040: 6f 73 75 72 65 33 26 74 65 73 74 5f 61 72 72 6f |osure3&test_arro|
00000050: 77 5f 66 75 6e 63 74 69 6f 6e 12 74 65 73 74 5f |w_function.test_|
00000060: 77 69 74 68 22 74 65 73 74 5f 65 76 61 6c 5f 63 |with"test_eval_c|
00000070: 6c 6f 73 75 72 65 1e 74 65 73 74 5f 65 76 61 6c |losure.test_eval|
00000080: 5f 63 6f 6e 73 74 18 5f 5f 6c 6f 61 64 53 63 72 |_const.__loadScr|
00000090: 69 70 74 1c 74 65 73 74 5f 61 73 73 65 72 74 2e |ipt.test_assert.|
000000a0: 6a 73 4c 61 3d 31 2c 62 3d 32 2c 63 3d 33 2c 64 |jsLa=1,b=2,c=3,d|
000000b0: 3d 34 2c 78 3d 31 30 2c 62 3d 32 2c 63 3d 33 2c |=4,x=10,b=2,c=3,|
000000c0: 64 3d 35 2c 78 3d 31 30 2c 10 63 6c 6f 73 75 72 |d=5,x=10,.closur|
000000d0: 65 31 60 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |e1`__tests__/fix|
000000e0: 74 75 72 65 73 2f 71 75 69 63 6b 6a 73 2d 74 65 |tures/quickjs-te|
000000f0: 73 74 73 2f 74 65 73 74 5f 63 6c 6f 73 75 72 65 |sts/test_closure|
00000100: 2e 6a 73 0c 61 63 74 75 61 6c 10 65 78 70 65 63 |.js.actual.expec|
00000110: 74 65 64 2e 61 73 73 65 72 74 69 6f 6e 20 66 61 |ted.assertion fa|
00000120: 69 6c 65 64 3a 20 67 6f 74 20 7c 02 7c 18 2c 20 |iled: got |.|., |
00000130: 65 78 70 65 63 74 65 64 20 7c 04 20 28 02 29 06 |expected |. (.).|
00000140: 73 74 72 02 2c 02 61 02 62 02 63 02 78 02 67 04 |str.,.a.b.c.x.g.|
00000150: 61 3d 02 64 02 68 04 62 3d 04 63 3d 04 64 3d 04 |a=.d.h.b=.c=.d=.|
00000160: 78 3d 04 66 32 06 6f 62 6a 02 72 10 63 6c 6f 73 |x=.f2.obj.r.clos|
00000170: 75 72 65 32 06 76 61 6c 12 65 78 70 72 5f 66 75 |ure2.val.expr_fu|
00000180: 6e 63 0e 6d 79 66 75 6e 63 31 02 6e 0e 6d 79 66 |nc.myfunc1.n.myf|
00000190: 75 6e 63 32 06 66 69 62 10 66 69 62 5f 66 75 6e |unc2.fib.fib_fun|
000001a0: 63 08 66 69 62 31 04 66 31 04 66 33 04 66 34 04 |c.fib1.f1.f3.f4.|
000001b0: 6f 31 04 6f 32 08 63 61 6c 6c 10 74 68 69 73 5f |o1.o2.call.this_|
000001c0: 76 61 6c 12 73 75 70 65 72 2e 66 28 29 02 79 0a |val.super.f().y.|
000001d0: 6c 6f 63 61 6c 20 76 61 72 20 7a 3d 22 76 61 72 |local var z="var|
000001e0: 5f 6f 62 6a 22 3b 02 7a 0e 76 61 72 5f 6f 62 6a |_obj";.z.var_obj|
000001f0: 12 65 76 61 6c 28 22 78 22 29 06 74 61 62 02 69 |.eval("x").tab.i|
00000200: 4a 74 61 62 2e 70 75 73 68 28 66 75 6e 63 74 69 |Jtab.push(functi|
00000210: 6f 6e 20 67 31 28 29 20 7b 20 72 65 74 75 72 6e |on g1() { return|
00000220: 20 69 3b 20 7d 29 4a 74 61 62 2e 70 75 73 68 28 | i; })Jtab.push(|
00000230: 66 75 6e 63 74 69 6f 6e 20 67 32 28 29 20 7b 20 |function g2() { |
00000240: 72 65 74 75 72 6e 20 69 3b 20 7d 29 0e 73 75 63 |return i; }).suc|
00000250: 63 65 73 73 0a 61 20 3d 20 31 0c 00 06 00 a4 01 |cess.a = 1......|
00000260: 00 02 00 04 00 0a a8 02 02 a6 01 00 00 00 c8 03 |................|
00000270: 03 00 03 40 e5 00 00 00 40 40 e6 00 00 00 00 40 |...@....@@.....@|
00000280: e7 00 00 00 40 40 e8 00 00 00 40 40 e9 00 00 00 |....@@....@@....|
00000290: 00 40 ea 00 00 00 40 40 eb 00 00 00 40 40 ec 00 |.@....@@....@@..|
000002a0: 00 00 40 40 ed 00 00 00 40 40 ee 00 00 00 40 40 |..@@....@@....@@|
000002b0: ef 00 00 00 40 40 f0 00 00 00 40 c2 00 41 e5 00 |....@@....@..A..|
000002c0: 00 00 00 3f e6 00 00 00 00 c2 01 41 e7 00 00 00 |...?.......A....|
000002d0: 00 c2 02 41 e8 00 00 00 00 3f e9 00 00 00 00 c2 |...A.....?......|
000002e0: 03 41 ea 00 00 00 00 c2 04 41 eb 00 00 00 00 c2 |.A.......A......|
000002f0: 05 41 ec 00 00 00 00 c2 06 41 ed 00 00 00 00 c2 |.A.......A......|
00000300: 07 41 ee 00 00 00 00 c2 08 41 ef 00 00 00 00 c2 |.A.......A......|
00000310: 09 41 f0 00 00 00 00 06 cb 6f 13 00 00 00 39 f1 |.A.......o....9.|
00000320: 00 00 00 04 f2 00 00 00 f1 cb 0e ee 0b cc 6f 07 |..............o.|
00000330: 00 00 00 0e ee 02 30 c3 3a e6 00 00 00 39 e8 00 |......0.:....9..|
00000340: 00 00 b8 b9 ba f3 3a e9 00 00 00 39 e9 00 00 00 |......:....9....|
00000350: bc f1 cb 39 e5 00 00 00 39 e6 00 00 00 04 f3 00 |...9....9.......|
00000360: 00 00 04 f4 00 00 00 f3 cb 39 ea 00 00 00 f0 cb |.........9......|
00000370: 39 eb 00 00 00 f0 cb 39 ec 00 00 00 f0 cb 39 ed |9......9......9.|
00000380: 00 00 00 f0 cb 39 ee 00 00 00 f0 cb 39 ef 00 00 |.....9......9...|
00000390: 00 f0 cb 39 f0 00 00 00 f0 cf 28 ea 03 38 00 00 |...9......(..8..|
000003a0: 00 ab 01 24 08 34 18 00 15 2e 0d 2a 02 21 13 20 |...$.4.....*.!. |
000003b0: 04 0d 03 1b 0e 4d 01 00 02 92 02 0b 1b 1a 0d 19 |.....M..........|
000003c0: 1b 1a 0d 19 1b 1a 0d 19 1b 26 0d 25 1b 12 0d 11 |.........&.%....|
000003d0: 1b 22 0d 21 1b 1e 00 0c 43 06 00 ca 03 03 01 03 |.".!....C.......|
000003e0: 04 00 00 79 04 ec 03 00 01 00 ee 03 00 01 00 68 |...y...........h|
000003f0: 00 01 00 9e 01 00 01 00 0c 01 cb c7 eb b8 ab ec |................|
00000400: 03 0a d8 d3 d4 ad ec 02 29 d3 f5 ed 2f d4 f5 ed |........).../...|
00000410: 2b d3 99 04 4b 00 00 00 ab ec 21 d4 99 04 4b 00 |+...K.....!...K.|
00000420: 00 00 ab ec 17 d3 43 39 00 00 00 24 00 00 d4 43 |......C9...$...C|
00000430: 39 00 00 00 24 00 00 ad ec 02 29 39 9f 00 00 00 |9...$.....)9....|
00000440: 04 f8 00 00 00 d3 9f 04 f9 00 00 00 9f 04 fa 00 |................|
00000450: 00 00 9f d4 9f 04 f9 00 00 00 9f d5 ec 10 04 fb |................|
00000460: 00 00 00 d5 9f 04 fc 00 00 00 9f ee 02 c3 9f f1 |................|
00000470: 30 ea 03 50 03 00 12 10 07 12 0c 10 12 21 0d 00 |0..P.........!..|
00000480: 07 16 07 07 12 0d 08 00 07 0e 11 18 07 12 12 23 |...............#|
00000490: 07 0e 2f 2c 07 12 30 59 07 0c 1b 12 11 0e 07 10 |../,..0Y........|
000004a0: 1b 12 11 29 12 29 08 04 34 44 07 03 20 12 20 0c |...).)..4D.. . .|
000004b0: 08 3f 07 03 20 16 08 31 2a 22 07 03 20 14 15 0c |.?.. ..1*".. ...|
000004c0: 06 31 07 15 00 0c 43 06 00 ce 03 01 00 01 03 00 |.1....C.........|
000004d0: 00 14 01 fa 03 00 01 00 39 e6 00 00 00 d3 04 fe |........9.......|
000004e0: 00 00 00 9f 9f 11 3a e6 00 00 00 29 ea 03 0a 17 |......:....)....|
000004f0: 00 03 08 1b 16 20 08 07 0d 00 0c 43 06 00 d0 03 |..... .....C....|
00000500: 03 02 03 03 00 01 1a 05 fe 03 00 01 00 80 04 00 |................|
00000510: 01 40 82 04 00 01 40 84 04 00 00 40 86 04 00 01 |.@....@....@....|
00000520: 00 c2 00 cc bf 0a cb 39 e7 00 00 00 04 04 01 00 |.......9........|
00000530: 00 d3 9f f1 0e c8 bb f1 0e c8 28 ea 03 14 1a 00 |..........(.....|
00000540: 22 08 34 16 07 03 07 0b 00 02 14 05 0c 02 0d 0c |".4.............|
00000550: 07 0d 00 0c 43 06 00 86 04 01 01 01 03 03 01 22 |....C.........."|
00000560: 02 8a 04 00 01 40 8c 04 00 00 00 84 04 00 01 80 |.....@..........|
00000570: 04 01 03 82 04 02 03 c2 00 cb 39 e7 00 00 00 04 |..........9.....|
00000580: 07 01 00 00 e0 9f f1 0e 39 e7 00 00 00 04 08 01 |........9.......|
00000590: 00 00 e1 9f f1 0e c7 f0 29 ea 03 18 1d 04 00 03 |........).......|
000005a0: 0a 08 34 16 07 03 07 0b 0d 05 34 16 07 03 07 0b |..4.......4.....|
000005b0: 0d 05 07 02 00 0c 43 06 00 8c 04 00 00 00 03 02 |......C.........|
000005c0: 00 1c 00 8a 04 00 03 84 04 00 00 39 e7 00 00 00 |...........9....|
000005d0: 04 09 01 00 00 df 9f f1 0e 39 e7 00 00 00 04 0a |.........9......|
000005e0: 01 00 00 e0 9f f1 29 ea 03 12 1e 08 03 08 34 16 |......).......4.|
000005f0: 07 03 07 0b 0d 05 34 16 07 03 07 0b 00 0c 43 06 |......4.......C.|
00000600: 00 d4 03 00 03 00 04 00 01 29 03 96 04 00 00 00 |.........)......|
00000610: 98 04 00 01 00 9a 04 00 02 00 c2 00 cf f0 d0 43 |...............C|
00000620: 44 00 00 00 bf 0a 24 01 00 0e c8 43 43 00 00 00 |D.....$....CC...|
00000630: 24 00 00 cd 39 e5 00 00 00 c9 bf 0a 04 0e 01 00 |$...9...........|
00000640: 00 f3 29 ea 03 1a 2c 00 00 02 16 1c 07 04 08 17 |..)...,.........|
00000650: 07 06 25 08 18 05 07 06 1b 08 17 15 1b 0e 2a 01 |..%...........*.|
00000660: 00 0c 43 06 00 96 04 00 03 00 02 00 02 16 03 9e |..C.............|
00000670: 04 00 00 40 88 01 00 01 00 86 01 00 02 00 c2 00 |...@............|
00000680: cc c2 01 cd b8 cb 0b c8 4e 44 00 00 00 c9 4e 43 |........ND....NC|
00000690: 00 00 00 28 ea 03 0a 2d 04 00 09 10 28 20 18 20 |...(...-....( . |
000006a0: 37 00 0c 43 06 00 88 01 01 00 01 01 01 00 03 01 |7..C............|
000006b0: fe 03 00 01 00 9e 04 00 01 d3 e3 29 ea 03 04 2f |...........).../|
000006c0: 08 03 14 00 0c 43 06 00 86 01 01 00 01 01 01 00 |.....C..........|
000006d0: 02 01 fe 03 00 01 00 9e 04 00 01 df 28 ea 03 06 |............(...|
000006e0: 32 08 03 16 07 0d 00 0c 43 06 00 d6 03 00 02 00 |2.......C.......|
000006f0: 04 00 01 14 02 a0 04 00 00 00 9a 04 00 01 00 c2 |................|
00000700: 00 cf b8 f1 cc 39 e5 00 00 00 c8 b7 04 10 01 00 |.....9..........|
00000710: 00 f3 29 ea 03 0e 3d 00 00 02 16 10 0c 12 0d 19 |..)...=.........|
00000720: 1b 0e 25 01 00 0c 43 06 00 a2 04 01 02 01 02 00 |..%...C.........|
00000730: 01 12 03 a4 04 00 01 00 a6 04 00 00 00 a2 04 00 |................|
00000740: 01 44 0c 02 cc c2 00 cb d3 b7 ab ec 03 b7 28 c7 |.D............(.|
00000750: d3 23 01 00 ea 03 10 3e 14 00 06 08 0f 0c 04 17 |.#.....>........|
00000760: 03 09 0e 07 10 07 1d 00 0c 43 06 00 a6 04 01 00 |.........C......|
00000770: 01 03 01 00 07 01 a4 04 00 01 00 a2 04 01 41 df |..............A.|
00000780: d3 b8 a0 23 01 00 ea 03 0a 3f 08 03 16 07 10 0c |...#.....?......|
00000790: 04 07 21 00 0c 43 06 00 d8 03 00 02 00 04 00 02 |..!..C..........|
000007a0: 28 02 a8 04 00 00 40 aa 04 00 01 00 c2 00 cb c2 |(.....@.........|
000007b0: 01 cc 39 e5 00 00 00 c7 bd f1 bf 08 04 14 01 00 |..9.............|
000007c0: 00 f3 0e 39 e5 00 00 00 c8 bd f1 bf 08 04 15 01 |...9............|
000007d0: 00 00 f3 29 ea 03 14 4b 00 00 06 22 08 1b 0e 0c |...)...K..."....|
000007e0: 06 2a 07 0d 0b 1b 0e 0c 10 2a 11 00 0c 43 06 00 |.*.......*...C..|
000007f0: a8 04 01 00 01 04 01 00 1a 01 a4 04 00 01 00 a8 |................|
00000800: 04 00 01 d3 b7 a6 ec 03 b7 28 d3 b8 ab ec 03 b8 |.........(......|
00000810: 28 df d3 b8 a0 f1 df d3 b9 a0 f1 9f 28 ea 03 22 |(...........(.."|
00000820: 4c 04 03 10 0c 04 17 03 08 0a 0c 04 17 0d 09 0e |L...............|
00000830: 07 08 0c 04 07 05 07 14 07 08 0c 04 07 05 07 09 |................|
00000840: 07 23 00 0c 43 06 00 ac 04 01 01 01 04 00 00 1d |.#..C...........|
00000850: 02 a4 04 00 01 00 ac 04 00 01 04 0c 02 cb d3 b7 |................|
00000860: a6 ec 03 b7 28 d3 b8 ab ec 03 b8 28 c7 d3 b8 a0 |....(......(....|
00000870: f1 c7 d3 b9 a0 f1 9f 28 ea 03 22 54 13 12 0d 0c |.......(.."T....|
00000880: 04 17 03 08 0a 0c 04 17 0d 09 0e 07 0a 0c 04 07 |................|
00000890: 05 07 14 07 0a 0c 04 07 05 07 0b 07 25 00 0c 43 |............%..C|
000008a0: 06 01 da 03 00 07 00 04 00 06 a9 01 07 ae 04 00 |................|
000008b0: 00 00 96 04 00 01 00 b0 04 00 02 00 b2 04 00 03 |................|
000008c0: 00 fe 03 00 04 00 b4 04 00 05 00 b6 04 00 06 00 |................|
000008d0: c2 00 cb c2 01 cc c2 02 cd c2 03 ce c7 b8 b9 f2 |................|
000008e0: c5 04 39 e5 00 00 00 c4 04 eb b9 f2 0e 39 e5 00 |..9..........9..|
000008f0: 00 00 c4 04 b7 48 b8 ad 11 ec 08 0e c4 04 b8 48 |.....H.........H|
00000900: b9 ad f1 0e 39 e5 00 00 00 c8 43 1c 01 00 00 04 |....9.....C.....|
00000910: 1d 01 00 00 24 01 00 04 1d 01 00 00 ad f1 0e 39 |....$..........9|
00000920: e5 00 00 00 c9 43 1c 01 00 00 04 1d 01 00 00 24 |.....C.........$|
00000930: 01 00 04 1d 01 00 00 ad f1 0e 39 e5 00 00 00 ca |..........9.....|
00000940: 11 21 00 00 ca ad f1 0e 0b c2 04 56 e8 00 00 00 |.!.........V....|
00000950: 04 c5 05 0b c2 05 56 e8 00 00 00 04 c6 06 c4 05 |......V.........|
00000960: 44 46 00 00 00 39 e5 00 00 00 c4 06 43 e8 00 00 |DF...9......C...|
00000970: 00 24 00 00 c4 06 ad f1 29 ea 03 58 5f 00 00 0c |.$......)..X_...|
00000980: 1e 10 11 04 12 0b 1b 0e 0c 02 0c 03 0d 0b 1b 0e |................|
00000990: 11 02 0c 08 1b 12 11 02 0c 08 07 27 0d 0b 1b 0e |...........'....|
000009a0: 07 04 34 0a 2a 1a 07 29 0d 0b 1b 0e 07 04 34 0a |..4.*..)......4.|
000009b0: 2a 1a 07 29 0d 0b 1b 16 0c 04 11 0e 07 07 07 13 |*..)............|
000009c0: 00 16 0a 0b 0c 1e 26 1d 1b 0e 0c 04 1b 04 11 0e |......&.........|
000009d0: 0c 07 07 0f 00 0c 43 06 01 ae 04 00 01 00 01 00 |......C.........|
000009e0: 01 08 01 9e 01 00 01 40 0c 00 cb c2 00 23 00 00 |.......@.....#..|
000009f0: ea 03 04 61 04 1c 08 00 0c 42 06 01 00 00 00 00 |...a.....B......|
00000a00: 01 01 00 02 00 9e 01 00 01 df 28 ea 03 04 62 10 |..........(...b.|
00000a10: 02 0c 00 0c 43 06 01 96 04 00 01 00 01 00 01 07 |....C...........|
00000a20: 01 10 00 01 40 08 cb c2 00 23 00 00 ea 03 04 64 |....@....#.....d|
00000a30: 04 17 08 00 0c 42 06 01 00 00 00 00 01 01 00 02 |.....B..........|
00000a40: 00 10 00 01 df 28 ea 03 02 65 10 00 0c 43 06 01 |.....(...e...C..|
00000a50: b0 04 00 03 00 01 07 01 0d 03 10 00 01 00 e6 01 |................|
00000a60: 00 01 00 9e 01 00 01 00 ae 04 00 01 96 04 01 01 |................|
00000a70: b0 04 02 01 b2 04 03 01 fe 03 04 01 b4 04 05 01 |................|
00000a80: b6 04 06 01 0c 03 cc 08 cb 0c 00 cd c2 00 23 00 |..............#.|
00000a90: 00 ea 03 04 67 04 35 08 00 0c 42 06 01 00 00 00 |....g.5...B.....|
00000aa0: 00 02 0a 00 10 00 10 00 01 e6 01 01 01 9e 01 02 |................|
00000ab0: 01 ae 04 00 00 96 04 01 00 b0 04 02 00 b2 04 03 |................|
00000ac0: 00 fe 03 04 00 b4 04 05 00 b6 04 06 00 39 3c 00 |.............9<.|
00000ad0: 00 00 04 08 00 00 00 32 01 00 01 00 28 ea 03 06 |.......2....(...|
00000ae0: 68 10 02 0c 34 08 00 0c 43 06 01 b2 04 00 03 00 |h...4...C.......|
00000af0: 01 07 01 0d 03 10 00 01 00 e6 01 00 01 00 9e 01 |................|
00000b00: 00 01 00 ae 04 00 01 96 04 01 01 b0 04 02 01 b2 |................|
00000b10: 04 03 01 fe 03 04 01 b4 04 05 01 b6 04 06 01 0c |................|
00000b20: 03 cc 08 cb 0c 00 cd c2 00 23 00 00 ea 03 04 6a |.........#.....j|
00000b30: 04 35 08 00 0c 42 06 01 00 00 00 00 02 0a 00 10 |.5...B..........|
00000b40: 00 10 00 01 e6 01 01 01 9e 01 02 01 ae 04 00 00 |................|
00000b50: 96 04 01 00 b0 04 02 00 b2 04 03 00 fe 03 04 00 |................|
00000b60: b4 04 05 00 b6 04 06 00 39 3c 00 00 00 04 73 00 |........9<....s.|
00000b70: 00 00 32 01 00 01 00 28 ea 03 06 6b 10 02 0c 34 |..2....(...k...4|
00000b80: 08 00 0c 42 07 01 00 00 01 00 01 00 00 04 01 10 |...B............|
00000b90: 00 01 00 08 cb c7 28 ea 03 04 74 0f 11 0c 00 0c |......(...t.....|
00000ba0: 4a 07 01 00 00 04 00 01 07 01 10 04 10 00 01 00 |J...............|
00000bb0: e6 01 00 01 00 ea 01 00 01 00 9e 01 00 01 00 ae |................|
00000bc0: 04 00 01 96 04 01 01 b0 04 02 01 b2 04 03 01 fe |................|
00000bd0: 03 04 01 b4 04 05 01 b6 04 06 01 0c 04 cd 0c 03 |................|
00000be0: cc 08 cb 0c 00 ce c2 00 23 00 00 ea 03 04 75 0f |........#.....u.|
00000bf0: 44 05 00 0c 42 07 01 00 00 00 00 02 0b 00 10 00 |D...B...........|
00000c00: 10 00 01 e6 01 01 01 ea 01 02 01 9e 01 03 01 ae |................|
00000c10: 04 00 00 96 04 01 00 b0 04 02 00 b2 04 03 00 fe |................|
00000c20: 03 04 00 b4 04 05 00 b6 04 06 00 39 3c 00 00 00 |...........9<...|
00000c30: 04 1e 01 00 00 32 01 00 01 00 28 ea 03 06 76 14 |.....2....(...v.|
00000c40: 02 0c 34 08 00 0c 43 06 00 dc 03 00 08 00 04 00 |..4...C.........|
00000c50: 01 a5 02 08 b4 04 00 00 00 84 04 00 01 40 ac 01 |.............@..|
00000c60: 02 00 40 d0 03 00 02 00 a8 01 00 01 40 10 00 01 |..@.........@...|
00000c70: 00 e6 01 00 01 00 9e 01 00 01 00 0c 03 c5 06 08 |................|
00000c80: c5 05 0c 01 c5 07 0c 05 c5 04 0b 04 1a 01 00 00 |................|
00000c90: 4e 02 01 00 00 04 1a 01 00 00 4e 1f 01 00 00 cb |N.........N.....|
00000ca0: 04 20 01 00 00 cc c4 04 75 3c 00 00 00 0a 00 00 |. ......u<......|
00000cb0: 00 00 39 3c 00 00 00 04 21 01 00 00 32 01 00 01 |..9<....!...2...|
00000cc0: 00 0e c4 04 75 e5 00 00 00 0a 00 00 00 00 39 e5 |....u.........9.|
00000cd0: 00 00 00 c4 04 75 22 01 00 00 0a 00 00 00 00 39 |.....u"........9|
00000ce0: 22 01 00 00 04 23 01 00 00 ad f1 0e c7 63 02 00 |"....#.......c..|
00000cf0: 73 d1 79 e5 00 00 00 17 00 00 00 01 c4 04 79 e5 |s.y...........y.|
00000d00: 00 00 00 0b 00 00 00 00 06 39 e5 00 00 00 c9 75 |.........9.....u|
00000d10: 02 01 00 00 06 00 00 00 01 c8 04 1a 01 00 00 ad |................|
00000d20: 24 01 00 0e c9 79 e5 00 00 00 17 00 00 00 01 c4 |$....y..........|
00000d30: 04 79 e5 00 00 00 0b 00 00 00 00 06 39 e5 00 00 |.y..........9...|
00000d40: 00 c9 75 3c 00 00 00 16 00 00 00 01 c4 04 75 3c |..u<..........u<|
00000d50: 00 00 00 0a 00 00 00 00 39 3c 00 00 00 04 02 01 |........9<......|
00000d60: 00 00 32 01 00 04 00 04 1a 01 00 00 ad 24 01 00 |..2..........$..|
00000d70: 0e c9 78 e8 00 00 00 0c 00 00 00 01 7a e8 00 00 |..x.........z...|
00000d80: 00 03 00 c2 00 4f e8 00 00 00 3e c9 79 e8 00 00 |.....O....>.y...|
00000d90: 00 07 00 00 00 01 06 ca 24 00 00 0e 6b 02 00 29 |........$...k..)|
00000da0: ea 03 28 7b 00 dc 08 70 08 21 07 57 0e 70 04 07 |..({...p.!.W.p..|
00000db0: 05 0d 00 1c 03 93 0e 57 04 07 05 17 0b 93 0e a7 |.......W........|
00000dc0: 08 34 0c 07 15 00 1e 1a 0b 43 02 00 0c 43 06 00 |.4.......C...C..|
00000dd0: 00 00 05 00 04 08 00 9e 07 05 ac 01 02 00 40 a8 |..............@.|
00000de0: 01 00 01 00 10 00 01 00 e6 01 00 01 00 9e 01 00 |................|
00000df0: 01 00 ac 01 02 01 b4 04 00 01 84 04 01 01 d0 03 |................|
00000e00: 03 01 a8 01 04 01 10 05 01 e6 01 06 01 9e 01 07 |................|
00000e10: 01 0c 03 ce 08 cd 0c 01 c5 04 0c 05 cc c8 78 1b |..............x.|
00000e20: 01 00 00 22 00 00 00 00 df 78 1b 01 00 00 17 00 |...".....x......|
00000e30: 00 00 01 60 04 00 78 1b 01 00 00 0a 00 00 00 00 |...`..x.........|
00000e40: 7d 1b 01 00 00 0b 04 1b 01 00 00 4e 02 01 00 00 |}..........N....|
00000e50: 3e c8 75 1b 01 00 00 22 00 00 00 00 df 75 1b 01 |>.u....".....u..|
00000e60: 00 00 17 00 00 00 01 60 04 00 75 1b 01 00 00 0a |.......`..u.....|
00000e70: 00 00 00 00 39 1b 01 00 00 63 00 00 73 cf 79 e5 |....9....c..s.y.|
00000e80: 00 00 00 2e 00 00 00 01 c8 79 e5 00 00 00 23 00 |.........y....#.|
00000e90: 00 00 00 df 79 e5 00 00 00 18 00 00 00 01 60 04 |....y.........`.|
00000ea0: 00 79 e5 00 00 00 0b 00 00 00 00 06 39 e5 00 00 |.y..........9...|
00000eb0: 00 c7 75 02 01 00 00 1c 00 00 00 01 c8 75 02 01 |..u..........u..|
00000ec0: 00 00 11 00 00 00 00 df 75 02 01 00 00 06 00 00 |........u.......|
00000ed0: 00 01 e1 04 1b 01 00 00 ad 24 01 00 0e c7 79 e5 |.........$....y.|
00000ee0: 00 00 00 2e 00 00 00 01 c8 79 e5 00 00 00 23 00 |.........y....#.|
00000ef0: 00 00 00 df 79 e5 00 00 00 18 00 00 00 01 60 04 |....y.........`.|
00000f00: 00 79 e5 00 00 00 0b 00 00 00 00 06 39 e5 00 00 |.y..........9...|
00000f10: 00 c7 75 1f 01 00 00 2d 00 00 00 01 c8 75 1f 01 |..u....-.....u..|
00000f20: 00 00 22 00 00 00 00 df 75 1f 01 00 00 17 00 00 |..".....u.......|
00000f30: 00 01 60 04 00 75 1f 01 00 00 0a 00 00 00 00 39 |..`..u.........9|
00000f40: 1f 01 00 00 04 1a 01 00 00 ad 24 01 00 0e c7 79 |..........$....y|
00000f50: e5 00 00 00 2e 00 00 00 01 c8 79 e5 00 00 00 23 |..........y....#|
00000f60: 00 00 00 00 df 79 e5 00 00 00 18 00 00 00 01 60 |.....y.........`|
00000f70: 04 00 79 e5 00 00 00 0b 00 00 00 00 06 39 e5 00 |..y..........9..|
00000f80: 00 00 c7 75 22 01 00 00 2d 00 00 00 01 c8 75 22 |...u"...-.....u"|
00000f90: 01 00 00 22 00 00 00 00 df 75 22 01 00 00 17 00 |...".....u".....|
00000fa0: 00 00 01 60 04 00 75 22 01 00 00 0a 00 00 00 00 |...`..u"........|
00000fb0: 39 22 01 00 00 04 23 01 00 00 ad 24 01 00 0e c7 |9"....#....$....|
00000fc0: 79 e5 00 00 00 2e 00 00 00 01 c8 79 e5 00 00 00 |y..........y....|
00000fd0: 23 00 00 00 00 df 79 e5 00 00 00 18 00 00 00 01 |#.....y.........|
00000fe0: 60 04 00 79 e5 00 00 00 0b 00 00 00 00 06 39 e5 |`..y..........9.|
00000ff0: 00 00 00 c7 75 3c 00 00 00 2d 00 00 00 01 c8 75 |....u<...-.....u|
00001000: 3c 00 00 00 22 00 00 00 00 df 75 3c 00 00 00 17 |<...".....u<....|
00001010: 00 00 00 01 60 04 00 75 3c 00 00 00 0a 00 00 00 |....`..u<.......|
00001020: 00 39 3c 00 00 00 04 02 01 00 00 32 01 00 02 00 |.9<........2....|
00001030: 04 1b 01 00 00 ad 24 01 00 0e c7 79 e5 00 00 00 |......$....y....|
00001040: 2e 00 00 00 01 c8 79 e5 00 00 00 23 00 00 00 00 |......y....#....|
00001050: df 79 e5 00 00 00 18 00 00 00 01 60 04 00 79 e5 |.y.........`..y.|
00001060: 00 00 00 0b 00 00 00 00 06 39 e5 00 00 00 c7 75 |.........9.....u|
00001070: 3c 00 00 00 2d 00 00 00 01 c8 75 3c 00 00 00 22 |<...-.....u<..."|
00001080: 00 00 00 00 df 75 3c 00 00 00 17 00 00 00 01 60 |.....u<........`|
00001090: 04 00 75 3c 00 00 00 0a 00 00 00 00 39 3c 00 00 |..u<........9<..|
000010a0: 00 04 1f 01 00 00 32 01 00 02 00 04 1a 01 00 00 |......2.........|
000010b0: ad 24 01 00 0e c7 79 e5 00 00 00 2e 00 00 00 01 |.$....y.........|
000010c0: c8 79 e5 00 00 00 23 00 00 00 00 df 79 e5 00 00 |.y....#.....y...|
000010d0: 00 18 00 00 00 01 60 04 00 79 e5 00 00 00 0b 00 |......`..y......|
000010e0: 00 00 00 06 39 e5 00 00 00 c7 75 3c 00 00 00 2d |....9.....u<...-|
000010f0: 00 00 00 01 c8 75 3c 00 00 00 22 00 00 00 00 df |.....u<...".....|
00001100: 75 3c 00 00 00 17 00 00 00 01 60 04 00 75 3c 00 |u<........`..u<.|
00001110: 00 00 0a 00 00 00 00 39 3c 00 00 00 04 22 01 00 |.......9<...."..|
00001120: 00 32 01 00 02 00 04 23 01 00 00 ad 24 01 00 0e |.2.....#....$...|
00001130: c7 79 e5 00 00 00 2e 00 00 00 01 c8 79 e5 00 00 |.y..........y...|
00001140: 00 23 00 00 00 00 df 79 e5 00 00 00 18 00 00 00 |.#.....y........|
00001150: 01 60 04 00 79 e5 00 00 00 0b 00 00 00 00 06 39 |.`..y..........9|
00001160: e5 00 00 00 c7 75 3c 00 00 00 2d 00 00 00 01 c8 |.....u<...-.....|
00001170: 75 3c 00 00 00 22 00 00 00 00 df 75 3c 00 00 00 |u<...".....u<...|
00001180: 17 00 00 00 01 60 04 00 75 3c 00 00 00 0a 00 00 |.....`..u<......|
00001190: 00 00 39 3c 00 00 00 04 24 01 00 00 32 01 00 02 |..9<....$...2...|
000011a0: 00 04 1b 01 00 00 ad 24 01 00 0e 6b 00 00 29 ea |.......$...k..).|
000011b0: 03 63 83 01 10 3f 07 00 34 02 0c df 03 00 34 00 |.c...?..4.....4.|
000011c0: 0e c5 04 07 05 17 0b 00 34 00 0e 00 38 00 04 07 |........4...8...|
000011d0: 05 17 0b 00 34 00 0e 00 38 00 04 07 05 17 0b 00 |....4...8.......|
000011e0: 34 00 0e 00 38 00 08 34 0c 07 15 17 0b 00 34 00 |4...8..4......4.|
000011f0: 0e 00 38 00 08 34 0c 07 15 17 0b 00 34 00 0e 00 |..8..4......4...|
00001200: 38 00 08 34 0c 07 15 17 0b 00 34 00 0e 00 38 00 |8..4......4...8.|
00001210: 08 34 1c 07 25 00 0c 43 06 00 de 03 00 0a 00 03 |.4..%..C........|
00001220: 00 01 e9 01 0a ca 04 00 00 00 cc 04 02 00 60 cc |..............`.|
00001230: 04 04 00 20 cc 04 06 00 60 d0 03 07 04 60 cc 04 |... ....`....`..|
00001240: 08 00 20 a8 01 00 01 40 10 00 01 00 e6 01 00 01 |.. ....@........|
00001250: 00 9e 01 00 01 00 0c 03 c5 08 08 c5 07 0c 01 c5 |................|
00001260: 09 0c 05 c5 06 26 00 00 cb 63 01 00 b7 cc 64 01 |.....&...c....d.|
00001270: 00 ba a5 ec 2a c4 06 75 3c 00 00 00 0a 00 00 00 |....*..u<.......|
00001280: 00 39 3c 00 00 00 04 27 01 00 00 32 01 00 03 00 |.9<....'...2....|
00001290: 0e 6b 01 00 64 01 00 93 65 01 00 0e ee d1 6b 01 |.k..d...e.....k.|
000012a0: 00 63 02 00 b7 cd 64 02 00 ba a5 ec 2a c4 06 75 |.c....d.....*..u|
000012b0: e5 00 00 00 0a 00 00 00 00 39 e5 00 00 00 c7 64 |.........9.....d|
000012c0: 02 00 49 24 00 00 64 02 00 ad f1 0e 64 02 00 93 |..I$..d.....d...|
000012d0: 65 02 00 0e ee d1 26 00 00 cb 63 03 00 b7 ce 6b |e.....&...c....k|
000012e0: 03 00 64 03 00 ba a5 ec 1d 63 04 00 c2 00 c5 04 |..d......c......|
000012f0: 64 04 00 f0 0e 6b 04 00 6b 03 00 64 03 00 93 65 |d....k..k..d...e|
00001300: 03 00 0e ee de 6b 03 00 63 05 00 b7 c5 05 64 05 |.....k..c.....d.|
00001310: 00 ba a5 ec 2a c4 06 75 e5 00 00 00 0a 00 00 00 |....*..u........|
00001320: 00 39 e5 00 00 00 c7 64 05 00 49 24 00 00 64 05 |.9.....d..I$..d.|
00001330: 00 ad f1 0e 64 05 00 93 65 05 00 0e ee d1 29 ea |....d...e.....).|
00001340: 03 55 92 01 00 4f 08 30 20 16 04 12 1b 70 08 2e |.U...O.0 ....p..|
00001350: 1e 11 02 50 0f 16 04 12 1b 57 0e 07 08 11 01 07 |...P.....W......|
00001360: 06 11 0e 11 07 07 13 0b 1a 11 02 28 2f 3f 20 16 |...........(/? .|
00001370: 04 00 0a 08 1b 11 02 00 08 07 24 11 02 00 10 0c |..........$.....|
00001380: 0f 16 04 12 1b 57 0e 07 08 11 01 07 06 11 0e 11 |.....W..........|
00001390: 07 07 13 0b 1a 11 02 00 0c 43 06 00 d0 03 00 05 |.........C......|
000013a0: 00 02 07 00 35 05 a8 01 00 01 00 10 00 01 00 e6 |....5...........|
000013b0: 01 00 01 00 9e 01 00 01 00 d0 03 00 01 04 d0 03 |................|
000013c0: 04 09 cc 04 03 09 ca 04 00 01 a8 01 06 01 10 07 |................|
000013d0: 01 e6 01 08 01 9e 01 09 01 0c 03 cd 08 cc 0c 01 |................|
000013e0: ce 0c 02 c5 04 0c 05 cb c7 75 3c 00 00 00 15 00 |.........u<.....|
000013f0: 00 00 00 e2 75 3c 00 00 00 0a 00 00 00 00 39 3c |....u<........9<|
00001400: 00 00 00 04 28 01 00 00 32 01 00 01 00 29 ea 03 |....(...2....)..|
00001410: 07 9d 01 10 4e 07 a2 08 00 0c 43 06 00 e0 03 00 |....N.....C.....|
00001420: 04 00 03 00 01 34 04 fe 03 01 00 70 d2 04 00 00 |.....4.....p....|
00001430: 00 d0 03 00 02 00 c8 03 03 01 03 63 00 00 b8 cb |...........c....|
00001440: 09 cc c2 00 4f e8 00 00 00 cd 6f 0a 00 00 00 c9 |....O.....o.....|
00001450: f0 0e 0e ee 13 ce 6f 0f 00 00 00 ca 39 d3 00 00 |......o.....9...|
00001460: 00 a9 cc 0e ee 02 30 39 e5 00 00 00 c8 f1 29 ea |......09......).|
00001470: 03 15 a6 01 00 00 14 0e 10 07 02 3c 14 07 1a 1b |...........<....|
00001480: 15 22 21 1b 0e 07 01 00 0c 43 06 00 00 00 04 00 |."!......C......|
00001490: 02 03 00 26 04 a8 01 00 01 00 10 00 01 00 e6 01 |...&............|
000014a0: 00 01 00 9e 01 00 01 00 fe 03 00 0d d2 04 01 01 |................|
000014b0: d0 03 02 01 0c 03 cd 08 cc 0c 01 ce 0c 05 cb c7 |................|
000014c0: 75 3c 00 00 00 0a 00 00 00 00 39 3c 00 00 00 04 |u<........9<....|
000014d0: 2a 01 00 00 32 01 00 01 00 29 ea 03 07 a9 01 0c |*...2....)......|
000014e0: 3a 07 6b 08 00                                  |:.k..|
```