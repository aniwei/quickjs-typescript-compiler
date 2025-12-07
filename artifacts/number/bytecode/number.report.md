# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/number.ts
**生成时间**: 2025-12-07T03:50:04.870Z

## 大小对比

- TypeScript编译器: 77 字节
- WASM编译器: 74 字节
- 差异: 3 字节 (4.05%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 1,
  "atoms": [
    {
      "index": 0,
      "rawLength": 74,
      "actualLength": 37,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/number.js",
      "offset": 2
    }
  ],
  "functionHeader": {
    "offset": 40,
    "tag": "0xd",
    "remaining": 37
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 1,
  "atoms": [
    {
      "index": 0,
      "rawLength": 74,
      "actualLength": 37,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/number.js",
      "offset": 2
    }
  ],
  "functionHeader": {
    "offset": 40,
    "tag": "0xd",
    "remaining": 34
  }
}
```

## 字节级差异

共发现 12 个字节差异:

- 偏移量 0x3c: TS=0x09 vs WASM=0x06
- 偏移量 0x42: TS=0xbf vs WASM=0x06
- 偏移量 0x43: TS=0x7b vs WASM=0x2f
- 偏移量 0x44: TS=0x0e vs WASM=0xc8
- 偏移量 0x45: TS=0x06 vs WASM=0x03
- 偏移量 0x46: TS=0x2f vs WASM=0x02
- 偏移量 0x47: TS=0xc8 vs WASM=0x00
- 偏移量 0x48: TS=0x03 vs WASM=0x00
- 偏移量 0x49: TS=0x02 vs WASM=0x00
- 偏移量 0x4a: TS=0x00 vs WASM=EOF
- 偏移量 0x4b: TS=0x00 vs WASM=EOF
- 偏移量 0x4c: TS=0x00 vs WASM=EOF

## 十六进制转储对比

### TypeScript
```
00000000: 05 01 4a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..J__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6e |piler/fixtures/n|
00000020: 75 6d 62 65 72 2e 6a 73 0d c8 03 00 00 00 00 00 |umber.js........|
00000030: 0c 20 06 01 a4 01 00 00 00 01 00 00 09 00 08 ec |. ..............|
00000040: 02 29 bf 7b 0e 06 2f c8 03 02 00 00 00          |.).{../......|
```

### WASM
```
00000000: 05 01 4a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..J__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6e |piler/fixtures/n|
00000020: 75 6d 62 65 72 2e 6a 73 0d c8 03 00 00 00 00 00 |umber.js........|
00000030: 0c 20 06 01 a4 01 00 00 00 01 00 00 06 00 08 ec |. ..............|
00000040: 02 29 06 2f c8 03 02 00 00 00                   |.)./......|
```