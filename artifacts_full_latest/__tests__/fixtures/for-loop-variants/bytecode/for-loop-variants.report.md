# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/for-loop-variants.ts
**生成时间**: 2026-01-03T05:23:09.574Z

## 大小对比

- TypeScript编译器: 277 字节
- WASM编译器: 277 字节
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
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "j",
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
      "rawLength": 78,
      "actualLength": 39,
      "isWideChar": 0,
      "string": "__tests__/fixtures/for-loop-variants.js",
      "offset": 18
    }
  ],
  "functionHeader": {
    "offset": 58,
    "tag": "0xc",
    "remaining": 219
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
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "j",
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
      "rawLength": 78,
      "actualLength": 39,
      "isWideChar": 0,
      "string": "__tests__/fixtures/for-loop-variants.js",
      "offset": 18
    }
  ],
  "functionHeader": {
    "offset": 58,
    "tag": "0xc",
    "remaining": 219
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 05 02 69 02 6a 0e 63 6f 6e 73 6f 6c 65 06 6c |...i.j.console.l|
00000010: 6f 67 4e 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |ogN__tests__/fix|
00000020: 74 75 72 65 73 2f 66 6f 72 2d 6c 6f 6f 70 2d 76 |tures/for-loop-v|
00000030: 61 72 69 61 6e 74 73 2e 6a 73 0c 00 06 00 a4 01 |ariants.js......|
00000040: 00 01 00 03 00 00 99 01 01 a6 01 00 00 00 40 e4 |..............@.|
00000050: 00 00 00 80 40 e5 00 00 00 80 3f e4 00 00 00 82 |....@.....?.....|
00000060: 3f e5 00 00 00 82 b7 3b e4 00 00 00 06 cb 06 cb |?......;........|
00000070: 39 e4 00 00 00 b9 a8 ed 22 39 e6 00 00 00 43 e7 |9......."9....C.|
00000080: 00 00 00 39 e4 00 00 00 24 01 00 cb 39 e4 00 00 |...9....$...9...|
00000090: 00 93 3a e4 00 00 00 cb ee d5 b7 3b e5 00 00 00 |..:........;....|
000000a0: 06 cb 39 e5 00 00 00 ba a5 ec 3b 06 cb 39 e5 00 |..9.......;..9..|
000000b0: 00 00 b8 ad ec 0f 39 e5 00 00 00 93 3a e5 00 00 |......9.....:...|
000000c0: 00 cb ee df 39 e6 00 00 00 43 e7 00 00 00 39 e5 |....9....C....9.|
000000d0: 00 00 00 24 01 00 cb 39 e5 00 00 00 93 3a e5 00 |...$...9.....:..|
000000e0: 00 00 cb ee be c7 28 d0 03 2a 00 00 af 10 20 04 |......(..*.... .|
000000f0: 13 0b 1b 0e 1b 0a 1b 01 17 15 1b 02 5a 04 20 04 |............Z. .|
00000100: 1c 01 20 04 12 03 1b 02 32 09 1b 0e 1b 0a 1b 01 |.. .....2.......|
00000110: 17 15 1b 02 00                                  |.....|
```

### WASM
```
00000000: 05 05 02 69 02 6a 0e 63 6f 6e 73 6f 6c 65 06 6c |...i.j.console.l|
00000010: 6f 67 4e 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |ogN__tests__/fix|
00000020: 74 75 72 65 73 2f 66 6f 72 2d 6c 6f 6f 70 2d 76 |tures/for-loop-v|
00000030: 61 72 69 61 6e 74 73 2e 6a 73 0c 00 06 00 a4 01 |ariants.js......|
00000040: 00 01 00 03 00 00 99 01 01 a6 01 00 00 00 40 e4 |..............@.|
00000050: 00 00 00 80 40 e5 00 00 00 80 3f e4 00 00 00 82 |....@.....?.....|
00000060: 3f e5 00 00 00 82 b7 3b e4 00 00 00 06 cb 06 cb |?......;........|
00000070: 39 e4 00 00 00 b9 a8 ed 22 39 e6 00 00 00 43 e7 |9......."9....C.|
00000080: 00 00 00 39 e4 00 00 00 24 01 00 cb 39 e4 00 00 |...9....$...9...|
00000090: 00 93 3a e4 00 00 00 cb ee d5 b7 3b e5 00 00 00 |..:........;....|
000000a0: 06 cb 39 e5 00 00 00 ba a5 ec 3b 06 cb 39 e5 00 |..9.......;..9..|
000000b0: 00 00 b8 ad ec 0f 39 e5 00 00 00 93 3a e5 00 00 |......9.....:...|
000000c0: 00 cb ee df 39 e6 00 00 00 43 e7 00 00 00 39 e5 |....9....C....9.|
000000d0: 00 00 00 24 01 00 cb 39 e5 00 00 00 93 3a e5 00 |...$...9.....:..|
000000e0: 00 00 cb ee be c7 28 d0 03 2a 00 00 af 10 20 04 |......(..*.... .|
000000f0: 13 0b 1b 0e 1b 0a 1b 01 17 15 1b 02 5a 04 20 04 |............Z. .|
00000100: 1c 01 20 04 12 03 1b 02 32 09 1b 0e 1b 0a 1b 01 |.. .....2.......|
00000110: 17 15 1b 02 00                                  |.....|
```