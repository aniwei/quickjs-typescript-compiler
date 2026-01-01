# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/test_global_write.ts
**生成时间**: 2026-01-01T07:23:50.959Z

## 大小对比

- TypeScript编译器: 420 字节
- WASM编译器: 420 字节
- 差异: 0 字节 (0.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 3,
  "atoms": [
    {
      "index": 0,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "global_write",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 608,
      "actualLength": 304,
      "isWideChar": 0,
      "string": "(function global_write(n)\n           {\n               var j;\n               for(j = 0; j < n; j++) {\n                   global_var0 = j;\n                   global_var0 = j;\n                   global_var0 = j;\n                   global_var0 = j;\n               }\n               return n * 4;\n           })",
      "offset": 15
    },
    {
      "index": 2,
      "rawLength": 78,
      "actualLength": 39,
      "isWideChar": 0,
      "string": "__tests__/fixtures/test_global_write.js",
      "offset": 321
    }
  ],
  "functionHeader": {
    "offset": 361,
    "tag": "0xc",
    "remaining": 59
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 3,
  "atoms": [
    {
      "index": 0,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "global_write",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 608,
      "actualLength": 304,
      "isWideChar": 0,
      "string": "(function global_write(n)\n           {\n               var j;\n               for(j = 0; j < n; j++) {\n                   global_var0 = j;\n                   global_var0 = j;\n                   global_var0 = j;\n                   global_var0 = j;\n               }\n               return n * 4;\n           })",
      "offset": 15
    },
    {
      "index": 2,
      "rawLength": 78,
      "actualLength": 39,
      "isWideChar": 0,
      "string": "__tests__/fixtures/test_global_write.js",
      "offset": 321
    }
  ],
  "functionHeader": {
    "offset": 361,
    "tag": "0xc",
    "remaining": 59
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 03 18 67 6c 6f 62 61 6c 5f 77 72 69 74 65 e0 |...global_write.|
00000010: 04 28 66 75 6e 63 74 69 6f 6e 20 67 6c 6f 62 61 |.(function globa|
00000020: 6c 5f 77 72 69 74 65 28 6e 29 0a 20 20 20 20 20 |l_write(n).     |
00000030: 20 20 20 20 20 20 7b 0a 20 20 20 20 20 20 20 20 |      {.        |
00000040: 20 20 20 20 20 20 20 76 61 72 20 6a 3b 0a 20 20 |       var j;.  |
00000050: 20 20 20 20 20 20 20 20 20 20 20 20 20 66 6f 72 |             for|
00000060: 28 6a 20 3d 20 30 3b 20 6a 20 3c 20 6e 3b 20 6a |(j = 0; j < n; j|
00000070: 2b 2b 29 20 7b 0a 20 20 20 20 20 20 20 20 20 20 |++) {.          |
00000080: 20 20 20 20 20 20 20 20 20 67 6c 6f 62 61 6c 5f |         global_|
00000090: 76 61 72 30 20 3d 20 6a 3b 0a 20 20 20 20 20 20 |var0 = j;.      |
000000a0: 20 20 20 20 20 20 20 20 20 20 20 20 20 67 6c 6f |             glo|
000000b0: 62 61 6c 5f 76 61 72 30 20 3d 20 6a 3b 0a 20 20 |bal_var0 = j;.  |
000000c0: 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 |                |
000000d0: 20 67 6c 6f 62 61 6c 5f 76 61 72 30 20 3d 20 6a | global_var0 = j|
000000e0: 3b 0a 20 20 20 20 20 20 20 20 20 20 20 20 20 20 |;.              |
000000f0: 20 20 20 20 20 67 6c 6f 62 61 6c 5f 76 61 72 30 |     global_var0|
00000100: 20 3d 20 6a 3b 0a 20 20 20 20 20 20 20 20 20 20 | = j;.          |
00000110: 20 20 20 20 20 7d 0a 20 20 20 20 20 20 20 20 20 |     }.         |
00000120: 20 20 20 20 20 20 72 65 74 75 72 6e 20 6e 20 2a |      return n *|
00000130: 20 34 3b 0a 20 20 20 20 20 20 20 20 20 20 20 7d | 4;.           }|
00000140: 29 4e 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 |)N__tests__/fixt|
00000150: 75 72 65 73 2f 74 65 73 74 5f 67 6c 6f 62 61 6c |ures/test_global|
00000160: 5f 77 72 69 74 65 2e 6a 73 0c 00 06 00 a4 01 00 |_write.js.......|
00000170: 01 00 02 00 00 1e 01 a6 01 00 00 00 40 e4 00 00 |............@...|
00000180: 00 00 3f e4 00 00 00 00 39 3c 00 00 00 04 e5 00 |..?.....9<......|
00000190: 00 00 f1 3a e4 00 00 00 c7 28 cc 03 06 00 00 3e |...:.....(.....>|
000001a0: 2e 34 0a 00                                     |.4..|
```

### WASM
```
00000000: 05 03 18 67 6c 6f 62 61 6c 5f 77 72 69 74 65 e0 |...global_write.|
00000010: 04 28 66 75 6e 63 74 69 6f 6e 20 67 6c 6f 62 61 |.(function globa|
00000020: 6c 5f 77 72 69 74 65 28 6e 29 0a 20 20 20 20 20 |l_write(n).     |
00000030: 20 20 20 20 20 20 7b 0a 20 20 20 20 20 20 20 20 |      {.        |
00000040: 20 20 20 20 20 20 20 76 61 72 20 6a 3b 0a 20 20 |       var j;.  |
00000050: 20 20 20 20 20 20 20 20 20 20 20 20 20 66 6f 72 |             for|
00000060: 28 6a 20 3d 20 30 3b 20 6a 20 3c 20 6e 3b 20 6a |(j = 0; j < n; j|
00000070: 2b 2b 29 20 7b 0a 20 20 20 20 20 20 20 20 20 20 |++) {.          |
00000080: 20 20 20 20 20 20 20 20 20 67 6c 6f 62 61 6c 5f |         global_|
00000090: 76 61 72 30 20 3d 20 6a 3b 0a 20 20 20 20 20 20 |var0 = j;.      |
000000a0: 20 20 20 20 20 20 20 20 20 20 20 20 20 67 6c 6f |             glo|
000000b0: 62 61 6c 5f 76 61 72 30 20 3d 20 6a 3b 0a 20 20 |bal_var0 = j;.  |
000000c0: 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 |                |
000000d0: 20 67 6c 6f 62 61 6c 5f 76 61 72 30 20 3d 20 6a | global_var0 = j|
000000e0: 3b 0a 20 20 20 20 20 20 20 20 20 20 20 20 20 20 |;.              |
000000f0: 20 20 20 20 20 67 6c 6f 62 61 6c 5f 76 61 72 30 |     global_var0|
00000100: 20 3d 20 6a 3b 0a 20 20 20 20 20 20 20 20 20 20 | = j;.          |
00000110: 20 20 20 20 20 7d 0a 20 20 20 20 20 20 20 20 20 |     }.         |
00000120: 20 20 20 20 20 20 72 65 74 75 72 6e 20 6e 20 2a |      return n *|
00000130: 20 34 3b 0a 20 20 20 20 20 20 20 20 20 20 20 7d | 4;.           }|
00000140: 29 4e 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 |)N__tests__/fixt|
00000150: 75 72 65 73 2f 74 65 73 74 5f 67 6c 6f 62 61 6c |ures/test_global|
00000160: 5f 77 72 69 74 65 2e 6a 73 0c 00 06 00 a4 01 00 |_write.js.......|
00000170: 01 00 02 00 00 1e 01 a6 01 00 00 00 40 e4 00 00 |............@...|
00000180: 00 00 3f e4 00 00 00 00 39 3c 00 00 00 04 e5 00 |..?.....9<......|
00000190: 00 00 f1 3a e4 00 00 00 c7 28 cc 03 06 00 00 3e |...:.....(.....>|
000001a0: 2e 34 0a 00                                     |.4..|
```