# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/compiler/fixtures/console-log.ts
**生成时间**: 2025-12-09T09:32:11.442Z

## 大小对比

- TypeScript编译器: 126 字节
- WASM编译器: 126 字节
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
      "rawLength": 84,
      "actualLength": 42,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/console-log.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 45
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 53
    },
    {
      "index": 3,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "Hello World",
      "offset": 57
    }
  ],
  "functionHeader": {
    "offset": 69,
    "tag": "0xd",
    "remaining": 57
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
      "rawLength": 84,
      "actualLength": 42,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/console-log.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 45
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 53
    },
    {
      "index": 3,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "Hello World",
      "offset": 57
    }
  ],
  "functionHeader": {
    "offset": 69,
    "tag": "0xd",
    "remaining": 57
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 04 54 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..T__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6f 6e 73 6f 6c 65 2d 6c 6f 67 2e 6a 73 0e 63 6f |onsole-log.js.co|
00000030: 6e 73 6f 6c 65 06 6c 6f 67 16 48 65 6c 6c 6f 20 |nsole.log.Hello |
00000040: 57 6f 72 6c 64 0d c8 03 00 00 00 00 00 0c 20 06 |World......... .|
00000050: 01 a4 01 00 00 00 03 00 00 19 00 08 ec 02 29 39 |..............)9|
00000060: e5 00 00 00 43 e6 00 00 00 04 e7 00 00 00 24 01 |....C.........$.|
00000070: 00 0e 06 2f c8 03 06 00 00 2f 0e 34 08 00       |.../...../.4..|
```

### WASM
```
00000000: 05 04 54 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..T__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6f 6e 73 6f 6c 65 2d 6c 6f 67 2e 6a 73 0e 63 6f |onsole-log.js.co|
00000030: 6e 73 6f 6c 65 06 6c 6f 67 16 48 65 6c 6c 6f 20 |nsole.log.Hello |
00000040: 57 6f 72 6c 64 0d c8 03 00 00 00 00 00 0c 20 06 |World......... .|
00000050: 01 a4 01 00 00 00 03 00 00 19 00 08 ec 02 29 39 |..............)9|
00000060: e5 00 00 00 43 e6 00 00 00 04 e7 00 00 00 24 01 |....C.........$.|
00000070: 00 0e 06 2f c8 03 06 00 00 2f 0e 34 08 00       |.../...../.4..|
```