# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/quickjs-tests/test_bjson.ts
**生成时间**: 2026-01-08T03:25:32.423Z

## 大小对比

- TypeScript编译器: 3006 字节
- WASM编译器: 3006 字节
- 差异: 0 字节 (0.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 61,
  "atoms": [
    {
      "index": 0,
      "rawLength": 92,
      "actualLength": 46,
      "isWideChar": 0,
      "string": "__tests__/fixtures/quickjs-tests/test_bjson.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "./bjson.so",
      "offset": 49
    },
    {
      "index": 2,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "bjson",
      "offset": 60
    },
    {
      "index": 3,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "assert",
      "offset": 66
    },
    {
      "index": 4,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "toHex",
      "offset": 73
    },
    {
      "index": 5,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "isArrayLike",
      "offset": 79
    },
    {
      "index": 6,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "toStr",
      "offset": 91
    },
    {
      "index": 7,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "bjson_test",
      "offset": 97
    },
    {
      "index": 8,
      "rawLength": 40,
      "actualLength": 20,
      "isWideChar": 0,
      "string": "bjson_test_reference",
      "offset": 108
    },
    {
      "index": 9,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "bjson_test_all",
      "offset": 129
    },
    {
      "index": 10,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "actual",
      "offset": 144
    },
    {
      "index": 11,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "expected",
      "offset": 151
    },
    {
      "index": 12,
      "rawLength": 46,
      "actualLength": 23,
      "isWideChar": 0,
      "string": "assertion failed: got |",
      "offset": 160
    },
    {
      "index": 13,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "|",
      "offset": 184
    },
    {
      "index": 14,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": ", expected |",
      "offset": 186
    },
    {
      "index": 15,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": " (",
      "offset": 199
    },
    {
      "index": 16,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": ")",
      "offset": 202
    },
    {
      "index": 17,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 204
    },
    {
      "index": 18,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 206
    },
    {
      "index": 19,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "s",
      "offset": 208
    },
    {
      "index": 20,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "tab",
      "offset": 210
    },
    {
      "index": 21,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "v",
      "offset": 214
    },
    {
      "index": 22,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": " ",
      "offset": 216
    },
    {
      "index": 23,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "isArray",
      "offset": 218
    },
    {
      "index": 24,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "props",
      "offset": 226
    },
    {
      "index": 25,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "prop",
      "offset": 232
    },
    {
      "index": 26,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "Date(",
      "offset": 237
    },
    {
      "index": 27,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "Number(",
      "offset": 243
    },
    {
      "index": 28,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "String(",
      "offset": 251
    },
    {
      "index": 29,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "Boolean(",
      "offset": 259
    },
    {
      "index": 30,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "[",
      "offset": 268
    },
    {
      "index": 31,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": ",",
      "offset": 270
    },
    {
      "index": 32,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "]",
      "offset": 272
    },
    {
      "index": 33,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "keys",
      "offset": 274
    },
    {
      "index": 34,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "{",
      "offset": 279
    },
    {
      "index": 35,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": ":",
      "offset": 281
    },
    {
      "index": 36,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "}",
      "offset": 283
    },
    {
      "index": 37,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "__quote",
      "offset": 285
    },
    {
      "index": 38,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "buf",
      "offset": 293
    },
    {
      "index": 39,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "r",
      "offset": 297
    },
    {
      "index": 40,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "a_str",
      "offset": 299
    },
    {
      "index": 41,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "r_str",
      "offset": 305
    },
    {
      "index": 42,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "write",
      "offset": 311
    },
    {
      "index": 43,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "read",
      "offset": 317
    },
    {
      "index": 44,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "byteLength",
      "offset": 322
    },
    {
      "index": 45,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "print",
      "offset": 333
    },
    {
      "index": 46,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "array",
      "offset": 339
    },
    {
      "index": 47,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "n",
      "offset": 345
    },
    {
      "index": 48,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "array_buffer",
      "offset": 347
    },
    {
      "index": 49,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "idx",
      "offset": 360
    },
    {
      "index": 50,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "typed_array",
      "offset": 364
    },
    {
      "index": 51,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "buffer",
      "offset": 376
    },
    {
      "index": 52,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "byteOffset",
      "offset": 383
    },
    {
      "index": 53,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 394
    },
    {
      "index": 54,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "e",
      "offset": 398
    },
    {
      "index": 55,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 400
    },
    {
      "index": 56,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 402
    },
    {
      "index": 57,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "aa",
      "offset": 404
    },
    {
      "index": 58,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "0x123456789",
      "offset": 407
    },
    {
      "index": 59,
      "rawLength": 64,
      "actualLength": 32,
      "isWideChar": 0,
      "string": "0x123456789abcdef123456789abcdef",
      "offset": 419
    },
    {
      "index": 60,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "abc",
      "offset": 452
    }
  ],
  "functionHeader": {
    "offset": 456,
    "tag": "0xd",
    "remaining": 2550
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 61,
  "atoms": [
    {
      "index": 0,
      "rawLength": 92,
      "actualLength": 46,
      "isWideChar": 0,
      "string": "__tests__/fixtures/quickjs-tests/test_bjson.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "./bjson.so",
      "offset": 49
    },
    {
      "index": 2,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "bjson",
      "offset": 60
    },
    {
      "index": 3,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "assert",
      "offset": 66
    },
    {
      "index": 4,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "toHex",
      "offset": 73
    },
    {
      "index": 5,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "isArrayLike",
      "offset": 79
    },
    {
      "index": 6,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "toStr",
      "offset": 91
    },
    {
      "index": 7,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "bjson_test",
      "offset": 97
    },
    {
      "index": 8,
      "rawLength": 40,
      "actualLength": 20,
      "isWideChar": 0,
      "string": "bjson_test_reference",
      "offset": 108
    },
    {
      "index": 9,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "bjson_test_all",
      "offset": 129
    },
    {
      "index": 10,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "actual",
      "offset": 144
    },
    {
      "index": 11,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "expected",
      "offset": 151
    },
    {
      "index": 12,
      "rawLength": 46,
      "actualLength": 23,
      "isWideChar": 0,
      "string": "assertion failed: got |",
      "offset": 160
    },
    {
      "index": 13,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "|",
      "offset": 184
    },
    {
      "index": 14,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": ", expected |",
      "offset": 186
    },
    {
      "index": 15,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": " (",
      "offset": 199
    },
    {
      "index": 16,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": ")",
      "offset": 202
    },
    {
      "index": 17,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 204
    },
    {
      "index": 18,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 206
    },
    {
      "index": 19,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "s",
      "offset": 208
    },
    {
      "index": 20,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "tab",
      "offset": 210
    },
    {
      "index": 21,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "v",
      "offset": 214
    },
    {
      "index": 22,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": " ",
      "offset": 216
    },
    {
      "index": 23,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "isArray",
      "offset": 218
    },
    {
      "index": 24,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "props",
      "offset": 226
    },
    {
      "index": 25,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "prop",
      "offset": 232
    },
    {
      "index": 26,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "Date(",
      "offset": 237
    },
    {
      "index": 27,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "Number(",
      "offset": 243
    },
    {
      "index": 28,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "String(",
      "offset": 251
    },
    {
      "index": 29,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "Boolean(",
      "offset": 259
    },
    {
      "index": 30,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "[",
      "offset": 268
    },
    {
      "index": 31,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": ",",
      "offset": 270
    },
    {
      "index": 32,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "]",
      "offset": 272
    },
    {
      "index": 33,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "keys",
      "offset": 274
    },
    {
      "index": 34,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "{",
      "offset": 279
    },
    {
      "index": 35,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": ":",
      "offset": 281
    },
    {
      "index": 36,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "}",
      "offset": 283
    },
    {
      "index": 37,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "__quote",
      "offset": 285
    },
    {
      "index": 38,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "buf",
      "offset": 293
    },
    {
      "index": 39,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "r",
      "offset": 297
    },
    {
      "index": 40,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "a_str",
      "offset": 299
    },
    {
      "index": 41,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "r_str",
      "offset": 305
    },
    {
      "index": 42,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "write",
      "offset": 311
    },
    {
      "index": 43,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "read",
      "offset": 317
    },
    {
      "index": 44,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "byteLength",
      "offset": 322
    },
    {
      "index": 45,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "print",
      "offset": 333
    },
    {
      "index": 46,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "array",
      "offset": 339
    },
    {
      "index": 47,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "n",
      "offset": 345
    },
    {
      "index": 48,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "array_buffer",
      "offset": 347
    },
    {
      "index": 49,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "idx",
      "offset": 360
    },
    {
      "index": 50,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "typed_array",
      "offset": 364
    },
    {
      "index": 51,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "buffer",
      "offset": 376
    },
    {
      "index": 52,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "byteOffset",
      "offset": 383
    },
    {
      "index": 53,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 394
    },
    {
      "index": 54,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "e",
      "offset": 398
    },
    {
      "index": 55,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 400
    },
    {
      "index": 56,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 402
    },
    {
      "index": 57,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "aa",
      "offset": 404
    },
    {
      "index": 58,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "0x123456789",
      "offset": 407
    },
    {
      "index": 59,
      "rawLength": 64,
      "actualLength": 32,
      "isWideChar": 0,
      "string": "0x123456789abcdef123456789abcdef",
      "offset": 419
    },
    {
      "index": 60,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "abc",
      "offset": 452
    }
  ],
  "functionHeader": {
    "offset": 456,
    "tag": "0xd",
    "remaining": 2550
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 3d 5c 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |.=\__tests__/fix|
00000010: 74 75 72 65 73 2f 71 75 69 63 6b 6a 73 2d 74 65 |tures/quickjs-te|
00000020: 73 74 73 2f 74 65 73 74 5f 62 6a 73 6f 6e 2e 6a |sts/test_bjson.j|
00000030: 73 14 2e 2f 62 6a 73 6f 6e 2e 73 6f 0a 62 6a 73 |s../bjson.so.bjs|
00000040: 6f 6e 0c 61 73 73 65 72 74 0a 74 6f 48 65 78 16 |on.assert.toHex.|
00000050: 69 73 41 72 72 61 79 4c 69 6b 65 0a 74 6f 53 74 |isArrayLike.toSt|
00000060: 72 14 62 6a 73 6f 6e 5f 74 65 73 74 28 62 6a 73 |r.bjson_test(bjs|
00000070: 6f 6e 5f 74 65 73 74 5f 72 65 66 65 72 65 6e 63 |on_test_referenc|
00000080: 65 1c 62 6a 73 6f 6e 5f 74 65 73 74 5f 61 6c 6c |e.bjson_test_all|
00000090: 0c 61 63 74 75 61 6c 10 65 78 70 65 63 74 65 64 |.actual.expected|
000000a0: 2e 61 73 73 65 72 74 69 6f 6e 20 66 61 69 6c 65 |.assertion faile|
000000b0: 64 3a 20 67 6f 74 20 7c 02 7c 18 2c 20 65 78 70 |d: got |.|., exp|
000000c0: 65 63 74 65 64 20 7c 04 20 28 02 29 02 61 02 69 |ected |. (.).a.i|
000000d0: 02 73 06 74 61 62 02 76 02 20 0e 69 73 41 72 72 |.s.tab.v. .isArr|
000000e0: 61 79 0a 70 72 6f 70 73 08 70 72 6f 70 0a 44 61 |ay.props.prop.Da|
000000f0: 74 65 28 0e 4e 75 6d 62 65 72 28 0e 53 74 72 69 |te(.Number(.Stri|
00000100: 6e 67 28 10 42 6f 6f 6c 65 61 6e 28 02 5b 02 2c |ng(.Boolean(.[.,|
00000110: 02 5d 08 6b 65 79 73 02 7b 02 3a 02 7d 0e 5f 5f |.].keys.{.:.}.__|
00000120: 71 75 6f 74 65 06 62 75 66 02 72 0a 61 5f 73 74 |quote.buf.r.a_st|
00000130: 72 0a 72 5f 73 74 72 0a 77 72 69 74 65 08 72 65 |r.r_str.write.re|
00000140: 61 64 14 62 79 74 65 4c 65 6e 67 74 68 0a 70 72 |ad.byteLength.pr|
00000150: 69 6e 74 0a 61 72 72 61 79 02 6e 18 61 72 72 61 |int.array.n.arra|
00000160: 79 5f 62 75 66 66 65 72 06 69 64 78 16 74 79 70 |y_buffer.idx.typ|
00000170: 65 64 5f 61 72 72 61 79 0c 62 75 66 66 65 72 14 |ed_array.buffer.|
00000180: 62 79 74 65 4f 66 66 73 65 74 06 6f 62 6a 02 65 |byteOffset.obj.e|
00000190: 02 78 02 79 04 61 61 16 30 78 31 32 33 34 35 36 |.x.y.aa.0x123456|
000001a0: 37 38 39 40 30 78 31 32 33 34 35 36 37 38 39 61 |789@0x123456789a|
000001b0: 62 63 64 65 66 31 32 33 34 35 36 37 38 39 61 62 |bcdef123456789ab|
000001c0: 63 64 65 66 06 61 62 63 0d c8 03 01 ca 03 02 00 |cdef.abc........|
000001d0: 00 01 00 01 fe 01 00 00 0c 20 06 01 a4 01 00 00 |......... ......|
000001e0: 00 01 08 07 28 00 cc 03 00 0d ce 03 00 01 d0 03 |....(...........|
000001f0: 01 01 d2 03 02 01 d4 03 03 01 d6 03 04 01 d8 03 |................|
00000200: 05 01 da 03 06 01 08 ec 1f c2 00 e4 c2 01 e5 c2 |................|
00000210: 02 e6 c2 03 61 04 00 c2 04 61 05 00 c2 05 61 06 |....a....a....a.|
00000220: 00 c2 06 61 07 00 29 60 07 00 f0 0e 06 2f c8 03 |...a..)`...../..|
00000230: 09 00 00 00 21 c2 02 00 11 1c 00 0c 43 06 01 ce |....!.......C...|
00000240: 03 03 01 03 04 00 00 79 04 dc 03 00 01 00 de 03 |.......y........|
00000250: 00 01 00 68 00 01 00 9e 01 00 01 00 0c 00 cb c7 |...h............|
00000260: eb b8 ab ec 03 0a d8 d3 d4 ad ec 02 29 d3 f5 ed |............)...|
00000270: 2f d4 f5 ed 2b d3 99 04 4b 00 00 00 ab ec 21 d4 |/...+...K.....!.|
00000280: 99 04 4b 00 00 00 ab ec 17 d3 43 39 00 00 00 24 |..K.......C9...$|
00000290: 00 00 d4 43 39 00 00 00 24 00 00 ad ec 02 29 39 |...C9...$.....)9|
000002a0: 9f 00 00 00 04 f0 00 00 00 d3 9f 04 f1 00 00 00 |................|
000002b0: 9f 04 f2 00 00 00 9f d4 9f 04 f1 00 00 00 9f d5 |................|
000002c0: ec 10 04 f3 00 00 00 d5 9f 04 f4 00 00 00 9f ee |................|
000002d0: 02 c3 9f f1 30 c8 03 50 04 00 12 10 07 12 0c 10 |....0..P........|
000002e0: 12 21 0d 00 07 16 07 07 12 0d 08 00 07 0e 11 18 |.!..............|
000002f0: 07 12 12 23 07 0e 2f 2c 07 12 30 59 07 0c 1b 12 |...#../,..0Y....|
00000300: 11 0e 07 10 1b 12 11 29 12 29 08 04 34 44 07 03 |.......).)..4D..|
00000310: 20 12 20 0c 08 3f 07 03 20 16 08 31 2a 22 07 03 | . ..?.. ..1*"..|
00000320: 20 14 15 0c 06 31 07 15 00 0c 43 06 01 d0 03 01 | ....1....C.....|
00000330: 04 01 03 00 01 42 05 ea 03 00 01 00 ec 03 00 00 |.....B..........|
00000340: 00 ee 03 00 01 00 f0 03 00 02 00 f2 03 00 03 00 |................|
00000350: c3 cc 39 b0 00 00 00 11 d3 21 01 00 cd b7 cb c7 |..9......!......|
00000360: c9 eb a5 ec 2c c9 c7 48 43 39 00 00 00 bf 10 24 |....,..HC9.....$|
00000370: 01 00 d2 eb b9 a5 ec 06 c1 00 ca 9f ce c7 b7 ae |................|
00000380: ec 08 04 fa 00 00 00 96 01 ca 96 01 95 00 ee d0 |................|
00000390: c8 28 c8 03 38 11 00 0e 1c 20 16 07 01 17 1d 0c |.(..8.... ......|
000003a0: 0e 07 08 07 06 07 09 12 0b 07 08 07 01 07 06 25 |...............%|
000003b0: 12 17 1b 0c 10 12 11 0c 14 07 03 0d 0f 0c 04 12 |................|
000003c0: 00 26 07 00 03 0b 2e 00 04 10 2b 07 0d 00 07 02 |.&........+.....|
000003d0: 30 0c 43 06 01 d2 03 01 00 01 03 00 00 7d 01 ea |0.C..........}..|
000003e0: 03 00 01 00 39 9e 00 00 00 43 fb 00 00 00 d3 24 |....9....C.....$|
000003f0: 01 00 11 ed 6c 0e d3 39 ae 00 00 00 a9 11 ed 61 |....l..9.......a|
00000400: 0e d3 39 b0 00 00 00 a9 11 ed 56 0e d3 39 b2 00 |..9.......V..9..|
00000410: 00 00 a9 11 ed 4b 0e d3 39 b4 00 00 00 a9 11 ed |.....K..9.......|
00000420: 40 0e d3 39 af 00 00 00 a9 11 ed 35 0e d3 39 b1 |@..9.......5..9.|
00000430: 00 00 00 a9 11 ed 2a 0e d3 39 b3 00 00 00 a9 11 |......*..9......|
00000440: ed 1f 0e d3 39 b5 00 00 00 a9 11 ed 14 0e d3 39 |....9..........9|
00000450: b6 00 00 00 a9 11 ed 09 0e d3 39 b7 00 00 00 a9 |..........9.....|
00000460: 28 c8 03 4a 1e 00 03 16 1b 0a 1b 12 07 01 26 1d |(..J..........&.|
00000470: 07 1a 1b 15 1c 03 07 1a 1b 15 1c 03 07 1a 1b 15 |................|
00000480: 1c 03 07 1a 1b 15 1c 03 07 1a 1b 15 1c 03 07 1a |................|
00000490: 1b 15 1c 03 07 1a 1b 15 1c 03 07 1a 1b 15 1c 03 |................|
000004a0: 07 1a 1b 15 1c 03 07 1a 1b 15 00 01 13 0d 00 0c |................|
000004b0: 43 06 01 d4 03 01 04 01 06 02 00 f4 02 05 ea 03 |C...............|
000004c0: 00 01 00 ee 03 00 00 00 ec 03 00 01 00 f8 03 00 |................|
000004d0: 02 00 fa 03 00 03 00 d4 03 04 00 d2 03 03 00 d3 |................|
000004e0: 99 11 04 4b 00 00 00 ad 6c 1c 01 00 00 d3 f5 ec |...K....l.......|
000004f0: 07 04 01 00 00 00 28 d3 39 a7 00 00 00 a9 ec 1c |......(.9.......|
00000500: 04 fe 00 00 00 df d3 43 3b 00 00 00 24 00 00 f1 |.......C;...$...|
00000510: 9f 04 f4 00 00 00 9f cb ef ea 00 d3 39 a0 00 00 |............9...|
00000520: 00 a9 ec 1c 04 ff 00 00 00 df d3 43 3b 00 00 00 |...........C;...|
00000530: 24 00 00 f1 9f 04 f4 00 00 00 9f cb ef c6 00 d3 |$...............|
00000540: 39 a1 00 00 00 a9 ec 1c 04 00 01 00 00 df d3 43 |9..............C|
00000550: 3b 00 00 00 24 00 00 f1 9f 04 f4 00 00 00 9f cb |;...$...........|
00000560: ef a2 00 d3 39 a2 00 00 00 a9 ec 1c 04 01 01 00 |....9...........|
00000570: 00 df d3 43 3b 00 00 00 24 00 00 f1 9f 04 f4 00 |...C;...$.......|
00000580: 00 00 9f cb ef 7e 00 e0 d3 f1 ec 30 04 02 01 00 |.....~.....0....|
00000590: 00 cb b7 cc c8 d3 eb a5 ec 19 c8 b7 ac ec 08 04 |................|
000005a0: 03 01 00 00 96 00 c7 df d3 c8 48 f1 9f cb 95 01 |..........H.....|
000005b0: ee e3 04 04 01 00 00 96 00 ee 49 39 9d 00 00 00 |..........I9....|
000005c0: 43 05 01 00 00 d3 24 01 00 cd 04 06 01 00 00 cb |C.....$.........|
000005d0: b7 cc c8 c9 eb a5 ec 25 c8 b7 ac ec 08 04 03 01 |.......%........|
000005e0: 00 00 96 00 c9 c8 48 ce c7 ca 04 07 01 00 00 9f |......H.........|
000005f0: df d3 ca 48 f1 9f 9f cb 95 01 ee d7 04 08 01 00 |...H............|
00000600: 00 96 00 c7 28 11 04 47 00 00 00 ad ec 07 04 47 |....(..G.......G|
00000610: 00 00 00 28 11 04 4a 00 00 00 ad ec 0a d3 43 09 |...(..J.......C.|
00000620: 01 00 00 25 00 00 11 04 48 00 00 00 ad ec 1c d3 |...%....H.......|
00000630: b7 ab ec 0e b8 d3 9d b7 a5 ec 07 04 8f 00 00 00 |................|
00000640: 28 d3 43 39 00 00 00 25 00 00 d3 43 39 00 00 00 |(.C9...%...C9...|
00000650: 25 00 00 c8 03 f0 01 2b 00 04 28 4a 07 07 04 2b |%......+..(J...+|
00000660: 03 08 00 07 1a 1b 15 12 03 1b 1c 07 0c 07 02 1b |................|
00000670: 10 11 13 07 0d 20 2a 1d 37 07 1a 1b 15 12 0d 1b |..... *.7.......|
00000680: 20 07 0c 07 02 1b 10 11 13 07 0d 20 2a 1d 3b 07 | .......... *.;.|
00000690: 1a 1b 15 12 0d 1b 20 07 0c 07 02 1b 10 11 13 07 |...... .........|
000006a0: 0d 20 2a 1d 3b 07 1a 1b 15 12 0d 1b 22 07 0c 07 |. *.;......."...|
000006b0: 02 1b 10 11 13 07 0d 20 2a 1d 3d 07 18 07 01 12 |....... *.=.....|
000006c0: 1f 21 0a 0c 0e 07 08 07 02 07 05 12 0b 0c 04 12 |.!..............|
000006d0: 00 26 0b 07 0a 07 0c 07 04 07 01 07 03 07 0f 00 |.&..............|
000006e0: 02 05 2a 00 04 0a 31 32 0c 1b 0c 1b 0c 07 01 17 |..*...12........|
000006f0: 25 21 0a 0c 0e 07 08 07 0a 07 0d 12 0b 0c 04 12 |%!..............|
00000700: 00 26 02 07 0c 07 01 0d 17 07 0a 20 0a 07 10 07 |.&......... ....|
00000710: 0c 07 04 07 01 07 03 07 0d 07 1b 00 02 07 32 00 |..............2.|
00000720: 04 0c 39 27 02 07 0d 4f 00 36 0e 07 02 1b 0f 40 |..9'...O.6.....@|
00000730: 08 0c 04 16 18 07 03 0c 08 2b 1f 09 0e 07 02 1b |.........+......|
00000740: 0f 14 06 07 02 1b 0f 00 0c 43 06 01 d6 03 01 04 |.........C......|
00000750: 01 05 04 00 45 05 ea 03 00 01 00 94 04 00 00 00 |....E...........|
00000760: 96 04 00 01 00 98 04 00 02 00 9a 04 00 03 00 d4 |................|
00000770: 03 04 00 cc 03 00 0c d0 03 02 00 ce 03 01 00 df |................|
00000780: d3 f1 cd 68 01 00 43 0e 01 00 00 d3 24 01 00 cb |...h..C.....$...|
00000790: ee 01 68 01 00 43 0f 01 00 00 c7 b7 c7 42 10 01 |..h..C.......B..|
000007a0: 00 00 24 03 00 cc df c8 f1 ce c9 ca ac ec 15 39 |..$............9|
000007b0: 11 01 00 00 c9 f1 0e 39 11 01 00 00 ca f1 0e e2 |.......9........|
000007c0: 09 f1 0e 29 c8 03 3a 60 00 04 18 07 0c 07 01 0d |...)..:`........|
000007d0: 0d 11 0a 1b 0e 07 01 00 06 08 19 11 0a 1b 0c 0c |................|
000007e0: 10 07 06 1b 17 17 0b 07 0c 07 01 0d 11 07 12 07 |................|
000007f0: 05 12 0b 1b 0c 07 01 0d 09 1b 0c 07 01 0d 09 0c |................|
00000800: 0c 00 0c 43 06 01 d8 03 00 05 00 06 02 00 d7 01 |...C............|
00000810: 05 a4 04 00 00 00 94 04 00 01 00 ec 03 00 02 00 |................|
00000820: a6 04 00 03 00 a8 04 00 04 00 cc 03 00 0c ce 03 |................|
00000830: 01 00 bf 10 ce 26 00 00 cb b7 cd c9 ca a5 ec 09 |.....&..........|
00000840: c7 c9 0b 4b 95 02 ee f4 39 ac 00 00 00 11 ca 21 |...K....9......!|
00000850: 01 00 c5 04 b7 cd c9 ca a5 ec 32 c7 c9 48 c7 c9 |..........2..H..|
00000860: b8 9f ca 9e 48 44 6c 00 00 00 c7 c9 48 c9 44 15 |....HDl.....H.D.|
00000870: 01 00 00 c7 c9 48 39 b0 00 00 00 11 c4 04 c9 b8 |.....H9.........|
00000880: 21 03 00 44 16 01 00 00 95 02 ee cb 68 00 00 43 |!..D........h..C|
00000890: 0e 01 00 00 c7 0a 24 02 00 cc 68 00 00 43 0f 01 |......$...h..C..|
000008a0: 00 00 c8 b7 c8 42 10 01 00 00 0a 24 04 00 cb b7 |.....B.....$....|
000008b0: cd c9 ca a5 ec 53 e0 c7 c9 48 42 6c 00 00 00 c7 |.....S...HBl....|
000008c0: c9 b8 9f ca 9e 48 f2 0e e0 c7 c9 48 42 15 01 00 |.....H.....HB...|
000008d0: 00 c9 f2 0e e0 c7 c9 48 42 16 01 00 00 42 17 01 |.......HB....B..|
000008e0: 00 00 c4 04 f2 0e e0 c7 c9 48 42 16 01 00 00 eb |.........HB.....|
000008f0: b8 f2 0e e0 c7 c9 48 42 16 01 00 00 42 18 01 00 |......HB....B...|
00000900: 00 c9 f2 0e 95 02 ee aa 29 c8 03 c6 01 71 00 04 |........)....q..|
00000910: 08 12 00 17 0a 0c 0e 07 08 07 03 12 13 07 0c 07 |................|
00000920: 01 0b 16 18 01 20 18 07 01 1c 31 0c 0e 07 08 07 |..... ....1.....|
00000930: 03 12 13 07 0c 07 01 07 16 07 0e 0c 04 07 0e 07 |................|
00000940: 03 07 11 21 29 07 0c 07 01 07 14 21 1d 07 0c 07 |...!)......!....|
00000950: 01 07 2c 20 16 0c 1c 0c 1d 00 08 05 29 00 04 0a |.., ........)...|
00000960: 1b 11 0a 1b 0e 0c 01 17 11 11 0a 1b 0c 0c 10 07 |................|
00000970: 06 20 17 18 19 0c 0e 07 08 07 03 12 13 07 0e 07 |. ..............|
00000980: 0c 07 01 07 06 1b 0e 07 0e 0c 04 07 0e 07 03 07 |................|
00000990: 11 07 29 0d 0b 07 0e 07 0c 07 01 07 06 1b 0c 07 |..).............|
000009a0: 1d 0d 0b 07 0e 07 0c 07 01 07 06 1b 18 1b 12 0c |................|
000009b0: 3b 0d 0b 07 0e 07 0c 07 01 07 06 1b 18 0c 29 0d |;.............).|
000009c0: 0b 07 0e 07 0c 07 01 07 06 1b 18 1b 1a 07 43 00 |..............C.|
000009d0: 02 09 14 00 0c 43 06 01 da 03 00 02 00 0a 04 04 |.....C..........|
000009e0: a1 02 02 b2 04 00 00 00 b4 04 05 00 03 d6 03 05 |................|
000009f0: 00 cc 03 00 0c ce 03 01 00 d8 03 06 00 df 0b b8 |................|
00000a00: 4e 1b 01 00 00 b9 4e 1c 01 00 00 ba 4e 04 00 00 |N.....N.....N...|
00000a10: 00 f1 0e df b8 b9 ba 26 03 00 f1 0e df b8 04 1d |.......&........|
00000a20: 01 00 00 0a 09 39 47 00 00 00 07 39 92 00 00 00 |.....9G....9....|
00000a30: 39 90 00 00 00 8e b7 8e 26 09 00 f1 0e 38 b9 00 |9.......&....8..|
00000a40: 00 00 f6 ed 26 df 39 b9 00 00 00 c1 00 f1 39 b9 |....&.9.......9.|
00000a50: 00 00 00 04 1e 01 00 00 f1 8e 39 b9 00 00 00 04 |..........9.....|
00000a60: 1f 01 00 00 f1 26 03 00 f1 0e df 39 a7 00 00 00 |.....&.....9....|
00000a70: 11 c0 d2 04 21 01 00 39 a1 00 00 00 11 04 20 01 |....!..9...... .|
00000a80: 00 00 21 01 00 39 a0 00 00 00 11 c1 01 8e 21 01 |..!..9........!.|
00000a90: 00 39 a2 00 00 00 11 0a 21 01 00 26 04 00 f1 0e |.9......!..&....|
00000aa0: df 39 b3 00 00 00 11 01 f3 e0 01 00 01 9f 63 03 |.9............c.|
00000ab0: 00 c0 22 82 26 03 00 21 01 00 f1 0e df 39 b5 00 |..".&..!.....9..|
00000ac0: 00 00 11 c0 00 04 c1 02 26 02 00 21 01 00 f1 0e |........&..!....|
00000ad0: df 39 b7 00 00 00 11 01 f3 e0 01 00 c1 03 26 02 |.9............&.|
00000ae0: 00 21 01 00 f1 0e 0b cf c7 44 1b 01 00 00 6f 18 |.!.......D....o.|
00000af0: 00 00 00 68 01 00 43 0e 01 00 00 c7 24 01 00 0e |...h..C.....$...|
00000b00: e1 09 f1 0e 0e ee 15 cc 6f 11 00 00 00 e1 c8 39 |........o......9|
00000b10: d3 00 00 00 a9 f1 0e 0e ee 02 30 e2 f0 29 c8 03 |..........0..)..|
00000b20: 7e 88 01 00 04 08 66 14 0d 13 25 14 0d 13 2f 48 |~.....f...%.../H|
00000b30: 20 22 1b 0c 1b 01 0c 16 16 75 0d 02 1b 0e 12 1b | ".......u......|
00000b40: 07 18 25 0c 07 10 34 0c 07 0d 08 29 34 0c 15 00 |..%...4....)4...|
00000b50: 0f 1b 07 20 2f 08 11 18 39 0c 11 1a 2a 0e 07 01 |... /...9...*...|
00000b60: 11 1a 25 0e 20 85 01 0d 13 07 1e 52 38 20 23 11 |..%. ......R8 #.|
00000b70: 1d 0d 13 07 1e 48 18 11 21 0d 13 07 1e 52 18 11 |.....H..!....R..|
00000b80: 21 0e 13 0d 10 3b 07 11 0a 1b 0e 07 01 17 15 0c |!....;..........|
00000b90: 0c 3c 0b 07 0e 07 1a 1b 15 07 05 22 13 07 28 00 |.<........."..(.|
00000ba0: 07 02 31 06 33 33 33 33 33 33 28 40 06 00 00 00 |..1.333333(@....|
00000bb0: 00 00 02 90 40 06 00 00 00 00 fc 1c 0b 41       |....@........A|
```

### WASM
```
00000000: 05 3d 5c 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |.=\__tests__/fix|
00000010: 74 75 72 65 73 2f 71 75 69 63 6b 6a 73 2d 74 65 |tures/quickjs-te|
00000020: 73 74 73 2f 74 65 73 74 5f 62 6a 73 6f 6e 2e 6a |sts/test_bjson.j|
00000030: 73 14 2e 2f 62 6a 73 6f 6e 2e 73 6f 0a 62 6a 73 |s../bjson.so.bjs|
00000040: 6f 6e 0c 61 73 73 65 72 74 0a 74 6f 48 65 78 16 |on.assert.toHex.|
00000050: 69 73 41 72 72 61 79 4c 69 6b 65 0a 74 6f 53 74 |isArrayLike.toSt|
00000060: 72 14 62 6a 73 6f 6e 5f 74 65 73 74 28 62 6a 73 |r.bjson_test(bjs|
00000070: 6f 6e 5f 74 65 73 74 5f 72 65 66 65 72 65 6e 63 |on_test_referenc|
00000080: 65 1c 62 6a 73 6f 6e 5f 74 65 73 74 5f 61 6c 6c |e.bjson_test_all|
00000090: 0c 61 63 74 75 61 6c 10 65 78 70 65 63 74 65 64 |.actual.expected|
000000a0: 2e 61 73 73 65 72 74 69 6f 6e 20 66 61 69 6c 65 |.assertion faile|
000000b0: 64 3a 20 67 6f 74 20 7c 02 7c 18 2c 20 65 78 70 |d: got |.|., exp|
000000c0: 65 63 74 65 64 20 7c 04 20 28 02 29 02 61 02 69 |ected |. (.).a.i|
000000d0: 02 73 06 74 61 62 02 76 02 20 0e 69 73 41 72 72 |.s.tab.v. .isArr|
000000e0: 61 79 0a 70 72 6f 70 73 08 70 72 6f 70 0a 44 61 |ay.props.prop.Da|
000000f0: 74 65 28 0e 4e 75 6d 62 65 72 28 0e 53 74 72 69 |te(.Number(.Stri|
00000100: 6e 67 28 10 42 6f 6f 6c 65 61 6e 28 02 5b 02 2c |ng(.Boolean(.[.,|
00000110: 02 5d 08 6b 65 79 73 02 7b 02 3a 02 7d 0e 5f 5f |.].keys.{.:.}.__|
00000120: 71 75 6f 74 65 06 62 75 66 02 72 0a 61 5f 73 74 |quote.buf.r.a_st|
00000130: 72 0a 72 5f 73 74 72 0a 77 72 69 74 65 08 72 65 |r.r_str.write.re|
00000140: 61 64 14 62 79 74 65 4c 65 6e 67 74 68 0a 70 72 |ad.byteLength.pr|
00000150: 69 6e 74 0a 61 72 72 61 79 02 6e 18 61 72 72 61 |int.array.n.arra|
00000160: 79 5f 62 75 66 66 65 72 06 69 64 78 16 74 79 70 |y_buffer.idx.typ|
00000170: 65 64 5f 61 72 72 61 79 0c 62 75 66 66 65 72 14 |ed_array.buffer.|
00000180: 62 79 74 65 4f 66 66 73 65 74 06 6f 62 6a 02 65 |byteOffset.obj.e|
00000190: 02 78 02 79 04 61 61 16 30 78 31 32 33 34 35 36 |.x.y.aa.0x123456|
000001a0: 37 38 39 40 30 78 31 32 33 34 35 36 37 38 39 61 |789@0x123456789a|
000001b0: 62 63 64 65 66 31 32 33 34 35 36 37 38 39 61 62 |bcdef123456789ab|
000001c0: 63 64 65 66 06 61 62 63 0d c8 03 01 ca 03 02 00 |cdef.abc........|
000001d0: 00 01 00 01 fe 01 00 00 0c 20 06 01 a4 01 00 00 |......... ......|
000001e0: 00 01 08 07 28 00 cc 03 00 0d ce 03 00 01 d0 03 |....(...........|
000001f0: 01 01 d2 03 02 01 d4 03 03 01 d6 03 04 01 d8 03 |................|
00000200: 05 01 da 03 06 01 08 ec 1f c2 00 e4 c2 01 e5 c2 |................|
00000210: 02 e6 c2 03 61 04 00 c2 04 61 05 00 c2 05 61 06 |....a....a....a.|
00000220: 00 c2 06 61 07 00 29 60 07 00 f0 0e 06 2f c8 03 |...a..)`...../..|
00000230: 09 00 00 00 21 c2 02 00 11 1c 00 0c 43 06 01 ce |....!.......C...|
00000240: 03 03 01 03 04 00 00 79 04 dc 03 00 01 00 de 03 |.......y........|
00000250: 00 01 00 68 00 01 00 9e 01 00 01 00 0c 00 cb c7 |...h............|
00000260: eb b8 ab ec 03 0a d8 d3 d4 ad ec 02 29 d3 f5 ed |............)...|
00000270: 2f d4 f5 ed 2b d3 99 04 4b 00 00 00 ab ec 21 d4 |/...+...K.....!.|
00000280: 99 04 4b 00 00 00 ab ec 17 d3 43 39 00 00 00 24 |..K.......C9...$|
00000290: 00 00 d4 43 39 00 00 00 24 00 00 ad ec 02 29 39 |...C9...$.....)9|
000002a0: 9f 00 00 00 04 f0 00 00 00 d3 9f 04 f1 00 00 00 |................|
000002b0: 9f 04 f2 00 00 00 9f d4 9f 04 f1 00 00 00 9f d5 |................|
000002c0: ec 10 04 f3 00 00 00 d5 9f 04 f4 00 00 00 9f ee |................|
000002d0: 02 c3 9f f1 30 c8 03 50 04 00 12 10 07 12 0c 10 |....0..P........|
000002e0: 12 21 0d 00 07 16 07 07 12 0d 08 00 07 0e 11 18 |.!..............|
000002f0: 07 12 12 23 07 0e 2f 2c 07 12 30 59 07 0c 1b 12 |...#../,..0Y....|
00000300: 11 0e 07 10 1b 12 11 29 12 29 08 04 34 44 07 03 |.......).)..4D..|
00000310: 20 12 20 0c 08 3f 07 03 20 16 08 31 2a 22 07 03 | . ..?.. ..1*"..|
00000320: 20 14 15 0c 06 31 07 15 00 0c 43 06 01 d0 03 01 | ....1....C.....|
00000330: 04 01 03 00 01 42 05 ea 03 00 01 00 ec 03 00 00 |.....B..........|
00000340: 00 ee 03 00 01 00 f0 03 00 02 00 f2 03 00 03 00 |................|
00000350: c3 cc 39 b0 00 00 00 11 d3 21 01 00 cd b7 cb c7 |..9......!......|
00000360: c9 eb a5 ec 2c c9 c7 48 43 39 00 00 00 bf 10 24 |....,..HC9.....$|
00000370: 01 00 d2 eb b9 a5 ec 06 c1 00 ca 9f ce c7 b7 ae |................|
00000380: ec 08 04 fa 00 00 00 96 01 ca 96 01 95 00 ee d0 |................|
00000390: c8 28 c8 03 38 11 00 0e 1c 20 16 07 01 17 1d 0c |.(..8.... ......|
000003a0: 0e 07 08 07 06 07 09 12 0b 07 08 07 01 07 06 25 |...............%|
000003b0: 12 17 1b 0c 10 12 11 0c 14 07 03 0d 0f 0c 04 12 |................|
000003c0: 00 26 07 00 03 0b 2e 00 04 10 2b 07 0d 00 07 02 |.&........+.....|
000003d0: 30 0c 43 06 01 d2 03 01 00 01 03 00 00 7d 01 ea |0.C..........}..|
000003e0: 03 00 01 00 39 9e 00 00 00 43 fb 00 00 00 d3 24 |....9....C.....$|
000003f0: 01 00 11 ed 6c 0e d3 39 ae 00 00 00 a9 11 ed 61 |....l..9.......a|
00000400: 0e d3 39 b0 00 00 00 a9 11 ed 56 0e d3 39 b2 00 |..9.......V..9..|
00000410: 00 00 a9 11 ed 4b 0e d3 39 b4 00 00 00 a9 11 ed |.....K..9.......|
00000420: 40 0e d3 39 af 00 00 00 a9 11 ed 35 0e d3 39 b1 |@..9.......5..9.|
00000430: 00 00 00 a9 11 ed 2a 0e d3 39 b3 00 00 00 a9 11 |......*..9......|
00000440: ed 1f 0e d3 39 b5 00 00 00 a9 11 ed 14 0e d3 39 |....9..........9|
00000450: b6 00 00 00 a9 11 ed 09 0e d3 39 b7 00 00 00 a9 |..........9.....|
00000460: 28 c8 03 4a 1e 00 03 16 1b 0a 1b 12 07 01 26 1d |(..J..........&.|
00000470: 07 1a 1b 15 1c 03 07 1a 1b 15 1c 03 07 1a 1b 15 |................|
00000480: 1c 03 07 1a 1b 15 1c 03 07 1a 1b 15 1c 03 07 1a |................|
00000490: 1b 15 1c 03 07 1a 1b 15 1c 03 07 1a 1b 15 1c 03 |................|
000004a0: 07 1a 1b 15 1c 03 07 1a 1b 15 00 01 13 0d 00 0c |................|
000004b0: 43 06 01 d4 03 01 04 01 06 02 00 f4 02 05 ea 03 |C...............|
000004c0: 00 01 00 ee 03 00 00 00 ec 03 00 01 00 f8 03 00 |................|
000004d0: 02 00 fa 03 00 03 00 d4 03 04 00 d2 03 03 00 d3 |................|
000004e0: 99 11 04 4b 00 00 00 ad 6c 1c 01 00 00 d3 f5 ec |...K....l.......|
000004f0: 07 04 01 00 00 00 28 d3 39 a7 00 00 00 a9 ec 1c |......(.9.......|
00000500: 04 fe 00 00 00 df d3 43 3b 00 00 00 24 00 00 f1 |.......C;...$...|
00000510: 9f 04 f4 00 00 00 9f cb ef ea 00 d3 39 a0 00 00 |............9...|
00000520: 00 a9 ec 1c 04 ff 00 00 00 df d3 43 3b 00 00 00 |...........C;...|
00000530: 24 00 00 f1 9f 04 f4 00 00 00 9f cb ef c6 00 d3 |$...............|
00000540: 39 a1 00 00 00 a9 ec 1c 04 00 01 00 00 df d3 43 |9..............C|
00000550: 3b 00 00 00 24 00 00 f1 9f 04 f4 00 00 00 9f cb |;...$...........|
00000560: ef a2 00 d3 39 a2 00 00 00 a9 ec 1c 04 01 01 00 |....9...........|
00000570: 00 df d3 43 3b 00 00 00 24 00 00 f1 9f 04 f4 00 |...C;...$.......|
00000580: 00 00 9f cb ef 7e 00 e0 d3 f1 ec 30 04 02 01 00 |.....~.....0....|
00000590: 00 cb b7 cc c8 d3 eb a5 ec 19 c8 b7 ac ec 08 04 |................|
000005a0: 03 01 00 00 96 00 c7 df d3 c8 48 f1 9f cb 95 01 |..........H.....|
000005b0: ee e3 04 04 01 00 00 96 00 ee 49 39 9d 00 00 00 |..........I9....|
000005c0: 43 05 01 00 00 d3 24 01 00 cd 04 06 01 00 00 cb |C.....$.........|
000005d0: b7 cc c8 c9 eb a5 ec 25 c8 b7 ac ec 08 04 03 01 |.......%........|
000005e0: 00 00 96 00 c9 c8 48 ce c7 ca 04 07 01 00 00 9f |......H.........|
000005f0: df d3 ca 48 f1 9f 9f cb 95 01 ee d7 04 08 01 00 |...H............|
00000600: 00 96 00 c7 28 11 04 47 00 00 00 ad ec 07 04 47 |....(..G.......G|
00000610: 00 00 00 28 11 04 4a 00 00 00 ad ec 0a d3 43 09 |...(..J.......C.|
00000620: 01 00 00 25 00 00 11 04 48 00 00 00 ad ec 1c d3 |...%....H.......|
00000630: b7 ab ec 0e b8 d3 9d b7 a5 ec 07 04 8f 00 00 00 |................|
00000640: 28 d3 43 39 00 00 00 25 00 00 d3 43 39 00 00 00 |(.C9...%...C9...|
00000650: 25 00 00 c8 03 f0 01 2b 00 04 28 4a 07 07 04 2b |%......+..(J...+|
00000660: 03 08 00 07 1a 1b 15 12 03 1b 1c 07 0c 07 02 1b |................|
00000670: 10 11 13 07 0d 20 2a 1d 37 07 1a 1b 15 12 0d 1b |..... *.7.......|
00000680: 20 07 0c 07 02 1b 10 11 13 07 0d 20 2a 1d 3b 07 | .......... *.;.|
00000690: 1a 1b 15 12 0d 1b 20 07 0c 07 02 1b 10 11 13 07 |...... .........|
000006a0: 0d 20 2a 1d 3b 07 1a 1b 15 12 0d 1b 22 07 0c 07 |. *.;......."...|
000006b0: 02 1b 10 11 13 07 0d 20 2a 1d 3d 07 18 07 01 12 |....... *.=.....|
000006c0: 1f 21 0a 0c 0e 07 08 07 02 07 05 12 0b 0c 04 12 |.!..............|
000006d0: 00 26 0b 07 0a 07 0c 07 04 07 01 07 03 07 0f 00 |.&..............|
000006e0: 02 05 2a 00 04 0a 31 32 0c 1b 0c 1b 0c 07 01 17 |..*...12........|
000006f0: 25 21 0a 0c 0e 07 08 07 0a 07 0d 12 0b 0c 04 12 |%!..............|
00000700: 00 26 02 07 0c 07 01 0d 17 07 0a 20 0a 07 10 07 |.&......... ....|
00000710: 0c 07 04 07 01 07 03 07 0d 07 1b 00 02 07 32 00 |..............2.|
00000720: 04 0c 39 27 02 07 0d 4f 00 36 0e 07 02 1b 0f 40 |..9'...O.6.....@|
00000730: 08 0c 04 16 18 07 03 0c 08 2b 1f 09 0e 07 02 1b |.........+......|
00000740: 0f 14 06 07 02 1b 0f 00 0c 43 06 01 d6 03 01 04 |.........C......|
00000750: 01 05 04 00 45 05 ea 03 00 01 00 94 04 00 00 00 |....E...........|
00000760: 96 04 00 01 00 98 04 00 02 00 9a 04 00 03 00 d4 |................|
00000770: 03 04 00 cc 03 00 0c d0 03 02 00 ce 03 01 00 df |................|
00000780: d3 f1 cd 68 01 00 43 0e 01 00 00 d3 24 01 00 cb |...h..C.....$...|
00000790: ee 01 68 01 00 43 0f 01 00 00 c7 b7 c7 42 10 01 |..h..C.......B..|
000007a0: 00 00 24 03 00 cc df c8 f1 ce c9 ca ac ec 15 39 |..$............9|
000007b0: 11 01 00 00 c9 f1 0e 39 11 01 00 00 ca f1 0e e2 |.......9........|
000007c0: 09 f1 0e 29 c8 03 3a 60 00 04 18 07 0c 07 01 0d |...)..:`........|
000007d0: 0d 11 0a 1b 0e 07 01 00 06 08 19 11 0a 1b 0c 0c |................|
000007e0: 10 07 06 1b 17 17 0b 07 0c 07 01 0d 11 07 12 07 |................|
000007f0: 05 12 0b 1b 0c 07 01 0d 09 1b 0c 07 01 0d 09 0c |................|
00000800: 0c 00 0c 43 06 01 d8 03 00 05 00 06 02 00 d7 01 |...C............|
00000810: 05 a4 04 00 00 00 94 04 00 01 00 ec 03 00 02 00 |................|
00000820: a6 04 00 03 00 a8 04 00 04 00 cc 03 00 0c ce 03 |................|
00000830: 01 00 bf 10 ce 26 00 00 cb b7 cd c9 ca a5 ec 09 |.....&..........|
00000840: c7 c9 0b 4b 95 02 ee f4 39 ac 00 00 00 11 ca 21 |...K....9......!|
00000850: 01 00 c5 04 b7 cd c9 ca a5 ec 32 c7 c9 48 c7 c9 |..........2..H..|
00000860: b8 9f ca 9e 48 44 6c 00 00 00 c7 c9 48 c9 44 15 |....HDl.....H.D.|
00000870: 01 00 00 c7 c9 48 39 b0 00 00 00 11 c4 04 c9 b8 |.....H9.........|
00000880: 21 03 00 44 16 01 00 00 95 02 ee cb 68 00 00 43 |!..D........h..C|
00000890: 0e 01 00 00 c7 0a 24 02 00 cc 68 00 00 43 0f 01 |......$...h..C..|
000008a0: 00 00 c8 b7 c8 42 10 01 00 00 0a 24 04 00 cb b7 |.....B.....$....|
000008b0: cd c9 ca a5 ec 53 e0 c7 c9 48 42 6c 00 00 00 c7 |.....S...HBl....|
000008c0: c9 b8 9f ca 9e 48 f2 0e e0 c7 c9 48 42 15 01 00 |.....H.....HB...|
000008d0: 00 c9 f2 0e e0 c7 c9 48 42 16 01 00 00 42 17 01 |.......HB....B..|
000008e0: 00 00 c4 04 f2 0e e0 c7 c9 48 42 16 01 00 00 eb |.........HB.....|
000008f0: b8 f2 0e e0 c7 c9 48 42 16 01 00 00 42 18 01 00 |......HB....B...|
00000900: 00 c9 f2 0e 95 02 ee aa 29 c8 03 c6 01 71 00 04 |........)....q..|
00000910: 08 12 00 17 0a 0c 0e 07 08 07 03 12 13 07 0c 07 |................|
00000920: 01 0b 16 18 01 20 18 07 01 1c 31 0c 0e 07 08 07 |..... ....1.....|
00000930: 03 12 13 07 0c 07 01 07 16 07 0e 0c 04 07 0e 07 |................|
00000940: 03 07 11 21 29 07 0c 07 01 07 14 21 1d 07 0c 07 |...!)......!....|
00000950: 01 07 2c 20 16 0c 1c 0c 1d 00 08 05 29 00 04 0a |.., ........)...|
00000960: 1b 11 0a 1b 0e 0c 01 17 11 11 0a 1b 0c 0c 10 07 |................|
00000970: 06 20 17 18 19 0c 0e 07 08 07 03 12 13 07 0e 07 |. ..............|
00000980: 0c 07 01 07 06 1b 0e 07 0e 0c 04 07 0e 07 03 07 |................|
00000990: 11 07 29 0d 0b 07 0e 07 0c 07 01 07 06 1b 0c 07 |..).............|
000009a0: 1d 0d 0b 07 0e 07 0c 07 01 07 06 1b 18 1b 12 0c |................|
000009b0: 3b 0d 0b 07 0e 07 0c 07 01 07 06 1b 18 0c 29 0d |;.............).|
000009c0: 0b 07 0e 07 0c 07 01 07 06 1b 18 1b 1a 07 43 00 |..............C.|
000009d0: 02 09 14 00 0c 43 06 01 da 03 00 02 00 0a 04 04 |.....C..........|
000009e0: a1 02 02 b2 04 00 00 00 b4 04 05 00 03 d6 03 05 |................|
000009f0: 00 cc 03 00 0c ce 03 01 00 d8 03 06 00 df 0b b8 |................|
00000a00: 4e 1b 01 00 00 b9 4e 1c 01 00 00 ba 4e 04 00 00 |N.....N.....N...|
00000a10: 00 f1 0e df b8 b9 ba 26 03 00 f1 0e df b8 04 1d |.......&........|
00000a20: 01 00 00 0a 09 39 47 00 00 00 07 39 92 00 00 00 |.....9G....9....|
00000a30: 39 90 00 00 00 8e b7 8e 26 09 00 f1 0e 38 b9 00 |9.......&....8..|
00000a40: 00 00 f6 ed 26 df 39 b9 00 00 00 c1 00 f1 39 b9 |....&.9.......9.|
00000a50: 00 00 00 04 1e 01 00 00 f1 8e 39 b9 00 00 00 04 |..........9.....|
00000a60: 1f 01 00 00 f1 26 03 00 f1 0e df 39 a7 00 00 00 |.....&.....9....|
00000a70: 11 c0 d2 04 21 01 00 39 a1 00 00 00 11 04 20 01 |....!..9...... .|
00000a80: 00 00 21 01 00 39 a0 00 00 00 11 c1 01 8e 21 01 |..!..9........!.|
00000a90: 00 39 a2 00 00 00 11 0a 21 01 00 26 04 00 f1 0e |.9......!..&....|
00000aa0: df 39 b3 00 00 00 11 01 f3 e0 01 00 01 9f 63 03 |.9............c.|
00000ab0: 00 c0 22 82 26 03 00 21 01 00 f1 0e df 39 b5 00 |..".&..!.....9..|
00000ac0: 00 00 11 c0 00 04 c1 02 26 02 00 21 01 00 f1 0e |........&..!....|
00000ad0: df 39 b7 00 00 00 11 01 f3 e0 01 00 c1 03 26 02 |.9............&.|
00000ae0: 00 21 01 00 f1 0e 0b cf c7 44 1b 01 00 00 6f 18 |.!.......D....o.|
00000af0: 00 00 00 68 01 00 43 0e 01 00 00 c7 24 01 00 0e |...h..C.....$...|
00000b00: e1 09 f1 0e 0e ee 15 cc 6f 11 00 00 00 e1 c8 39 |........o......9|
00000b10: d3 00 00 00 a9 f1 0e 0e ee 02 30 e2 f0 29 c8 03 |..........0..)..|
00000b20: 7e 88 01 00 04 08 66 14 0d 13 25 14 0d 13 2f 48 |~.....f...%.../H|
00000b30: 20 22 1b 0c 1b 01 0c 16 16 75 0d 02 1b 0e 12 1b | ".......u......|
00000b40: 07 18 25 0c 07 10 34 0c 07 0d 08 29 34 0c 15 00 |..%...4....)4...|
00000b50: 0f 1b 07 20 2f 08 11 18 39 0c 11 1a 2a 0e 07 01 |... /...9...*...|
00000b60: 11 1a 25 0e 20 85 01 0d 13 07 1e 52 38 20 23 11 |..%. ......R8 #.|
00000b70: 1d 0d 13 07 1e 48 18 11 21 0d 13 07 1e 52 18 11 |.....H..!....R..|
00000b80: 21 0e 13 0d 10 3b 07 11 0a 1b 0e 07 01 17 15 0c |!....;..........|
00000b90: 0c 3c 0b 07 0e 07 1a 1b 15 07 05 22 13 07 28 00 |.<........."..(.|
00000ba0: 07 02 31 06 33 33 33 33 33 33 28 40 06 00 00 00 |..1.333333(@....|
00000bb0: 00 00 02 90 40 06 00 00 00 00 fc 1c 0b 41       |....@........A|
```