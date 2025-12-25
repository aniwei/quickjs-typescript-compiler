# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/template-literals.ts
**生成时间**: 2025-12-25T08:56:16.828Z

## 大小对比

- TypeScript编译器: 232 字节
- WASM编译器: 232 字节
- 差异: 0 字节 (0.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 8,
  "atoms": [
    {
      "index": 0,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "QuickJS",
      "offset": 4
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 12
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 20
    },
    {
      "index": 4,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "hello ",
      "offset": 24
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": " ",
      "offset": 31
    },
    {
      "index": 6,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "line1\nline2",
      "offset": 33
    },
    {
      "index": 7,
      "rawLength": 78,
      "actualLength": 39,
      "isWideChar": 0,
      "string": "__tests__/fixtures/template-literals.js",
      "offset": 45
    }
  ],
  "functionHeader": {
    "offset": 85,
    "tag": "0xc",
    "remaining": 147
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 8,
  "atoms": [
    {
      "index": 0,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "QuickJS",
      "offset": 4
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 12
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 20
    },
    {
      "index": 4,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "hello ",
      "offset": 24
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": " ",
      "offset": 31
    },
    {
      "index": 6,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "line1\nline2",
      "offset": 33
    },
    {
      "index": 7,
      "rawLength": 78,
      "actualLength": 39,
      "isWideChar": 0,
      "string": "__tests__/fixtures/template-literals.js",
      "offset": 45
    }
  ],
  "functionHeader": {
    "offset": 85,
    "tag": "0xc",
    "remaining": 147
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 08 02 78 0e 51 75 69 63 6b 4a 53 0e 63 6f 6e |...x.QuickJS.con|
00000010: 73 6f 6c 65 06 6c 6f 67 0c 68 65 6c 6c 6f 20 02 |sole.log.hello .|
00000020: 20 16 6c 69 6e 65 31 0a 6c 69 6e 65 32 4e 5f 5f | .line1.line2N__|
00000030: 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 73 |tests__/fixtures|
00000040: 2f 74 65 6d 70 6c 61 74 65 2d 6c 69 74 65 72 61 |/template-litera|
00000050: 6c 73 2e 6a 73 0c 00 06 00 a4 01 00 01 00 08 00 |ls.js...........|
00000060: 00 68 01 a6 01 00 00 00 40 38 00 00 00 80 40 e4 |.h......@8....@.|
00000070: 00 00 00 80 3f 38 00 00 00 80 3f e4 00 00 00 80 |....?8....?.....|
00000080: 04 e5 00 00 00 3b 38 00 00 00 ba 3b e4 00 00 00 |.....;8....;....|
00000090: 39 e6 00 00 00 43 e7 00 00 00 04 e8 00 00 00 43 |9....C.........C|
000000a0: 5e 00 00 00 39 38 00 00 00 04 e9 00 00 00 b8 39 |^...98.........9|
000000b0: e4 00 00 00 9f 24 03 00 24 01 00 cb 39 e6 00 00 |.....$..$...9...|
000000c0: 00 43 e7 00 00 00 04 ea 00 00 00 24 01 00 cf 28 |.C.........$...(|
000000d0: d6 03 14 00 00 cd 00 1b 0e 4d 1c 39 18 1b 03 16 |.........M.9....|
000000e0: 27 17 15 1b 0e 34 08 00                         |'....4..|
```

### WASM
```
00000000: 05 08 02 78 0e 51 75 69 63 6b 4a 53 0e 63 6f 6e |...x.QuickJS.con|
00000010: 73 6f 6c 65 06 6c 6f 67 0c 68 65 6c 6c 6f 20 02 |sole.log.hello .|
00000020: 20 16 6c 69 6e 65 31 0a 6c 69 6e 65 32 4e 5f 5f | .line1.line2N__|
00000030: 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 73 |tests__/fixtures|
00000040: 2f 74 65 6d 70 6c 61 74 65 2d 6c 69 74 65 72 61 |/template-litera|
00000050: 6c 73 2e 6a 73 0c 00 06 00 a4 01 00 01 00 08 00 |ls.js...........|
00000060: 00 68 01 a6 01 00 00 00 40 38 00 00 00 80 40 e4 |.h......@8....@.|
00000070: 00 00 00 80 3f 38 00 00 00 80 3f e4 00 00 00 80 |....?8....?.....|
00000080: 04 e5 00 00 00 3b 38 00 00 00 ba 3b e4 00 00 00 |.....;8....;....|
00000090: 39 e6 00 00 00 43 e7 00 00 00 04 e8 00 00 00 43 |9....C.........C|
000000a0: 5e 00 00 00 39 38 00 00 00 04 e9 00 00 00 b8 39 |^...98.........9|
000000b0: e4 00 00 00 9f 24 03 00 24 01 00 cb 39 e6 00 00 |.....$..$...9...|
000000c0: 00 43 e7 00 00 00 04 ea 00 00 00 24 01 00 cf 28 |.C.........$...(|
000000d0: d6 03 14 00 00 cd 00 1b 0e 4d 1c 39 18 1b 03 16 |.........M.9....|
000000e0: 27 17 15 1b 0e 34 08 00                         |'....4..|
```