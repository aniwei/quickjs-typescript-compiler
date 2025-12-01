# 字节码分析报告

**输入文件**: tmp/trace-smoke.ts
**生成时间**: 2025-12-01T06:49:09.281Z

## 大小对比

- TypeScript编译器: 93 字节
- WASM编译器: 96 字节
- 差异: -3 字节 (-3.13%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 2,
  "atoms": [
    {
      "index": 0,
      "rawLength": 36,
      "actualLength": 18,
      "isWideChar": 0,
      "string": "tmp/trace-smoke.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "greet",
      "offset": 21
    }
  ],
  "functionHeader": {
    "offset": 27,
    "tag": "0xd",
    "remaining": 66
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 2,
  "atoms": [
    {
      "index": 0,
      "rawLength": 36,
      "actualLength": 18,
      "isWideChar": 0,
      "string": "tmp/trace-smoke.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "greet",
      "offset": 21
    }
  ],
  "functionHeader": {
    "offset": 27,
    "tag": "0xd",
    "remaining": 69
  }
}
```

## 字节级差异

共发现 59 个字节差异:

- 偏移量 0x1f: TS=0x00 vs WASM=0x01
- 偏移量 0x22: TS=0x00 vs WASM=0x2c
- 偏移量 0x23: TS=0x0c vs WASM=0x00
- 偏移量 0x24: TS=0x20 vs WASM=0x00
- 偏移量 0x25: TS=0x06 vs WASM=0x00
- 偏移量 0x26: TS=0x01 vs WASM=0x0c
- 偏移量 0x27: TS=0xa4 vs WASM=0x20
- 偏移量 0x28: TS=0x01 vs WASM=0x06
- 偏移量 0x29: TS=0x00 vs WASM=0x01
- 偏移量 0x2a: TS=0x00 vs WASM=0xa4
- 偏移量 0x2b: TS=0x00 vs WASM=0x01
- 偏移量 0x2c: TS=0x01 vs WASM=0x00
- 偏移量 0x2d: TS=0x01 vs WASM=0x00
- 偏移量 0x2e: TS=0x01 vs WASM=0x00
- 偏移量 0x2f: TS=0x09 vs WASM=0x01
- 偏移量 0x30: TS=0x00 vs WASM=0x01
- 偏移量 0x31: TS=0xca vs WASM=0x01
- 偏移量 0x32: TS=0x03 vs WASM=0x09
- 偏移量 0x34: TS=0x01 vs WASM=0xca
- 偏移量 0x35: TS=0x08 vs WASM=0x03
- ... (显示前20个差异，总共59个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 02 24 74 6d 70 2f 74 72 61 63 65 2d 73 6d 6f |..$tmp/trace-smo|
00000010: 6b 65 2e 6a 73 0a 67 72 65 65 74 0d c8 03 00 00 |ke.js.greet.....|
00000020: 00 00 00 0c 20 06 01 a4 01 00 00 00 01 01 01 09 |.... ...........|
00000030: 00 ca 03 00 01 08 ec 05 c2 00 e3 29 06 2f c8 03 |...........)./..|
00000040: 02 00 00 00 0c 43 06 01 ca 03 00 00 00 01 00 00 |.....C..........|
00000050: 03 00 bf 2a 28 c8 03 04 00 00 0d 04 00          |...*(........|
```

### WASM
```
00000000: 05 02 24 74 6d 70 2f 74 72 61 63 65 2d 73 6d 6f |..$tmp/trace-smo|
00000010: 6b 65 2e 6a 73 0a 67 72 65 65 74 0d c8 03 00 01 |ke.js.greet.....|
00000020: 00 00 2c 00 00 00 0c 20 06 01 a4 01 00 00 00 01 |..,.... ........|
00000030: 01 01 09 00 ca 03 00 01 08 ec 05 c2 00 e3 29 06 |..............).|
00000040: 2f c8 03 02 00 00 00 0c 43 06 01 ca 03 00 00 00 |/.......C.......|
00000050: 01 00 00 03 00 bf 2a 28 c8 03 04 00 0f 0d 15 00 |......*(........|
```