# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/compiler/fixtures/array-nested.ts
**生成时间**: 2025-12-09T09:00:06.024Z

## 大小对比

- TypeScript编译器: 194 字节
- WASM编译器: 194 字节
- 差异: 0 字节 (0.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 5,
  "atoms": [
    {
      "index": 0,
      "rawLength": 86,
      "actualLength": 43,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/array-nested.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "arr",
      "offset": 46
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 50
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 52
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 60
    }
  ],
  "functionHeader": {
    "offset": 64,
    "tag": "0xd",
    "remaining": 130
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 5,
  "atoms": [
    {
      "index": 0,
      "rawLength": 86,
      "actualLength": 43,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/array-nested.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "arr",
      "offset": 46
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 50
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 52
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 60
    }
  ],
  "functionHeader": {
    "offset": 64,
    "tag": "0xd",
    "remaining": 130
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 05 56 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..V__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 61 |piler/fixtures/a|
00000020: 72 72 61 79 2d 6e 65 73 74 65 64 2e 6a 73 06 61 |rray-nested.js.a|
00000030: 72 72 02 61 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 |rr.a.console.log|
00000040: 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 |......... ......|
00000050: 00 04 01 00 48 00 ca 03 00 0d 08 ec 02 29 b8 b9 |....H........)..|
00000060: 26 02 00 ba bb 26 02 00 0b bc 4e e6 00 00 00 26 |&....&....N....&|
00000070: 03 00 e3 39 e7 00 00 00 43 e8 00 00 00 68 00 00 |...9....C....h..|
00000080: b7 48 b8 48 24 01 00 0e 39 e7 00 00 00 43 e8 00 |.H.H$...9....C..|
00000090: 00 00 68 00 00 b9 48 42 e6 00 00 00 24 01 00 0e |..h...HB....$...|
000000a0: 06 2f c8 03 1c 00 00 00 19 0a 00 1b 0e 1b 0a 16 |./..............|
000000b0: 06 0c 06 07 0d 17 15 1b 0e 1b 0a 16 06 07 06 1b |................|
000000c0: 0d 00                                           |..|
```

### WASM
```
00000000: 05 05 56 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..V__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 61 |piler/fixtures/a|
00000020: 72 72 61 79 2d 6e 65 73 74 65 64 2e 6a 73 06 61 |rray-nested.js.a|
00000030: 72 72 02 61 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 |rr.a.console.log|
00000040: 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 |......... ......|
00000050: 00 04 01 00 48 00 ca 03 00 0d 08 ec 02 29 b8 b9 |....H........)..|
00000060: 26 02 00 ba bb 26 02 00 0b bc 4e e6 00 00 00 26 |&....&....N....&|
00000070: 03 00 e3 39 e7 00 00 00 43 e8 00 00 00 68 00 00 |...9....C....h..|
00000080: b7 48 b8 48 24 01 00 0e 39 e7 00 00 00 43 e8 00 |.H.H$...9....C..|
00000090: 00 00 68 00 00 b9 48 42 e6 00 00 00 24 01 00 0e |..h...HB....$...|
000000a0: 06 2f c8 03 1c 00 00 00 19 0a 00 1b 0e 1b 0a 16 |./..............|
000000b0: 06 0c 06 07 0d 17 15 1b 0e 1b 0a 16 06 07 06 1b |................|
000000c0: 0d 00                                           |..|
```