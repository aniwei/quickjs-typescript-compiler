# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/loop-break-continue.ts
**生成时间**: 2025-12-08T08:58:52.140Z

## 大小对比

- TypeScript编译器: 190 字节
- WASM编译器: 190 字节
- 差异: 0 字节 (0.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 4,
  "atoms": [
    {
      "index": 0,
      "rawLength": 100,
      "actualLength": 50,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/loop-break-continue.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 53
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 55
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 63
    }
  ],
  "functionHeader": {
    "offset": 67,
    "tag": "0xd",
    "remaining": 123
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 4,
  "atoms": [
    {
      "index": 0,
      "rawLength": 100,
      "actualLength": 50,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/loop-break-continue.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 53
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 55
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 63
    }
  ],
  "functionHeader": {
    "offset": 67,
    "tag": "0xd",
    "remaining": 123
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 04 64 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..d__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6c |piler/fixtures/l|
00000020: 6f 6f 70 2d 62 72 65 61 6b 2d 63 6f 6e 74 69 6e |oop-break-contin|
00000030: 75 65 2e 6a 73 02 69 0e 63 6f 6e 73 6f 6c 65 06 |ue.js.i.console.|
00000040: 6c 6f 67 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 |log......... ...|
00000050: 01 00 01 00 03 00 00 3e 01 ca 03 02 00 20 08 ec |.......>..... ..|
00000060: 02 29 63 00 00 b7 cb 64 00 00 bf 0a a5 ec 2c 64 |.)c....d......,d|
00000070: 00 00 bc ad ed 25 64 00 00 b9 9e b7 ad ed 12 39 |.....%d........9|
00000080: e6 00 00 00 43 e7 00 00 00 64 00 00 24 01 00 0e |....C....d..$...|
00000090: 64 00 00 93 65 00 00 0e ee ce 06 2f c8 03 1e 00 |d...e....../....|
000000a0: 00 2f 20 1b 04 12 13 16 04 14 03 16 04 0c 08 14 |./ .............|
000000b0: 13 1b 0e 1b 0a 11 01 00 04 0d 12 11 02 00       |..............|
```

### WASM
```
00000000: 05 04 64 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..d__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6c |piler/fixtures/l|
00000020: 6f 6f 70 2d 62 72 65 61 6b 2d 63 6f 6e 74 69 6e |oop-break-contin|
00000030: 75 65 2e 6a 73 02 69 0e 63 6f 6e 73 6f 6c 65 06 |ue.js.i.console.|
00000040: 6c 6f 67 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 |log......... ...|
00000050: 01 00 01 00 03 00 00 3e 01 ca 03 02 00 20 08 ec |.......>..... ..|
00000060: 02 29 63 00 00 b7 cb 64 00 00 bf 0a a5 ec 2c 64 |.)c....d......,d|
00000070: 00 00 bc ad ed 25 64 00 00 b9 9e b7 ad ed 12 39 |.....%d........9|
00000080: e6 00 00 00 43 e7 00 00 00 64 00 00 24 01 00 0e |....C....d..$...|
00000090: 64 00 00 93 65 00 00 0e ee ce 06 2f c8 03 1e 00 |d...e....../....|
000000a0: 00 2f 20 1b 04 12 13 16 04 14 03 16 04 0c 08 14 |./ .............|
000000b0: 13 1b 0e 1b 0a 11 01 00 04 0d 12 11 02 00       |..............|
```