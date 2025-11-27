# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/console-log.ts
**生成时间**: 2025-11-27T11:37:30.986Z

## 大小对比

- TypeScript编译器: 112 字节
- WASM编译器: 110 字节
- 差异: 2 字节 (1.82%)

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
    }
  ],
  "functionHeader": {
    "offset": 57,
    "tag": "0xd",
    "remaining": 55
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
    }
  ],
  "functionHeader": {
    "offset": 57,
    "tag": "0xd",
    "remaining": 53
  }
}
```

## 字节级差异

共发现 8 个字节差异:

- 偏移量 0x66: TS=0x08 vs WASM=0x06
- 偏移量 0x69: TS=0x16 vs WASM=0x2f
- 偏移量 0x6a: TS=0x04 vs WASM=0x0e
- 偏移量 0x6b: TS=0x1b vs WASM=0x20
- 偏移量 0x6c: TS=0x0e vs WASM=0x08
- 偏移量 0x6d: TS=0x20 vs WASM=0x00
- 偏移量 0x6e: TS=0x08 vs WASM=EOF
- 偏移量 0x6f: TS=0x00 vs WASM=EOF

## 十六进制转储对比

### TypeScript
```
00000000: 05 03 54 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..T__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6f 6e 73 6f 6c 65 2d 6c 6f 67 2e 6a 73 0e 63 6f |onsole-log.js.co|
00000030: 6e 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 00 00 00 |nsole.log.......|
00000040: 00 0c 20 06 01 a4 01 00 00 00 03 00 00 15 00 08 |.. .............|
00000050: ec 02 29 39 e5 00 00 00 43 e6 00 00 00 b8 24 01 |..)9....C.....$.|
00000060: 00 0e 06 2f c8 03 08 00 00 16 04 1b 0e 20 08 00 |.../......... ..|
```

### WASM
```
00000000: 05 03 54 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..T__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6f 6e 73 6f 6c 65 2d 6c 6f 67 2e 6a 73 0e 63 6f |onsole-log.js.co|
00000030: 6e 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 00 00 00 |nsole.log.......|
00000040: 00 0c 20 06 01 a4 01 00 00 00 03 00 00 15 00 08 |.. .............|
00000050: ec 02 29 39 e5 00 00 00 43 e6 00 00 00 b8 24 01 |..)9....C.....$.|
00000060: 00 0e 06 2f c8 03 06 00 00 2f 0e 20 08 00       |.../...../. ..|
```