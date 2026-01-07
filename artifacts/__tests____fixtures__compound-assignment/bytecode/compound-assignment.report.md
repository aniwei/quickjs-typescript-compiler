# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/compound-assignment.ts
**生成时间**: 2026-01-07T17:32:03.196Z

## 大小对比

- TypeScript编译器: 347 字节
- WASM编译器: 347 字节
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
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "n",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 4
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 12
    },
    {
      "index": 3,
      "rawLength": 82,
      "actualLength": 41,
      "isWideChar": 0,
      "string": "__tests__/fixtures/compound-assignment.js",
      "offset": 16
    }
  ],
  "functionHeader": {
    "offset": 58,
    "tag": "0xc",
    "remaining": 289
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
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "n",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 4
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 12
    },
    {
      "index": 3,
      "rawLength": 82,
      "actualLength": 41,
      "isWideChar": 0,
      "string": "__tests__/fixtures/compound-assignment.js",
      "offset": 16
    }
  ],
  "functionHeader": {
    "offset": 58,
    "tag": "0xc",
    "remaining": 289
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 04 02 6e 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 |...n.console.log|
00000010: 52 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 |R__tests__/fixtu|
00000020: 72 65 73 2f 63 6f 6d 70 6f 75 6e 64 2d 61 73 73 |res/compound-ass|
00000030: 69 67 6e 6d 65 6e 74 2e 6a 73 0c 00 06 00 a4 01 |ignment.js......|
00000040: 00 01 00 03 00 00 cf 01 01 a6 01 00 00 00 40 e4 |..............@.|
00000050: 00 00 00 80 3f e4 00 00 00 82 bc 3b e4 00 00 00 |....?......;....|
00000060: 39 e4 00 00 00 b8 9f 11 3a e4 00 00 00 cb 39 e4 |9.......:.....9.|
00000070: 00 00 00 b9 a0 11 3a e4 00 00 00 cb 39 e4 00 00 |......:.....9...|
00000080: 00 ba 9c 11 3a e4 00 00 00 cb 39 e4 00 00 00 b9 |....:.....9.....|
00000090: 9d 11 3a e4 00 00 00 cb 39 e4 00 00 00 bb 9e 11 |..:.....9.......|
000000a0: 3a e4 00 00 00 cb 39 e4 00 00 00 b9 a1 11 3a e4 |:.....9.......:.|
000000b0: 00 00 00 cb 39 e4 00 00 00 b8 a2 11 3a e4 00 00 |....9.......:...|
000000c0: 00 cb 39 e4 00 00 00 b8 a3 11 3a e4 00 00 00 cb |..9.......:.....|
000000d0: 39 e4 00 00 00 b8 a4 11 3a e4 00 00 00 cb 39 e4 |9.......:.....9.|
000000e0: 00 00 00 be af 11 3a e4 00 00 00 cb 39 e4 00 00 |......:.....9...|
000000f0: 00 bf 08 b1 11 3a e4 00 00 00 cb 39 e4 00 00 00 |.....:.....9....|
00000100: ba b0 11 3a e4 00 00 00 cb 39 e5 00 00 00 43 e6 |...:.....9....C.|
00000110: 00 00 00 39 e4 00 00 00 24 01 00 cf 28 ce 03 3a |...9....$...(..:|
00000120: 00 00 5e 00 20 04 2b 03 20 04 2b 03 20 04 2b 03 |..^. .+. .+. .+.|
00000130: 20 04 2b 03 20 04 2b 03 20 04 2b 03 20 04 2b 03 | .+. .+. .+. .+.|
00000140: 20 04 2b 03 20 04 2b 03 20 04 2b 03 25 04 2b 03 | .+. .+. .+.%.+.|
00000150: 20 04 2b 03 1b 0e 1b 0a 1b 01 00                | .+........|
```

### WASM
```
00000000: 05 04 02 6e 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 |...n.console.log|
00000010: 52 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 |R__tests__/fixtu|
00000020: 72 65 73 2f 63 6f 6d 70 6f 75 6e 64 2d 61 73 73 |res/compound-ass|
00000030: 69 67 6e 6d 65 6e 74 2e 6a 73 0c 00 06 00 a4 01 |ignment.js......|
00000040: 00 01 00 03 00 00 cf 01 01 a6 01 00 00 00 40 e4 |..............@.|
00000050: 00 00 00 80 3f e4 00 00 00 82 bc 3b e4 00 00 00 |....?......;....|
00000060: 39 e4 00 00 00 b8 9f 11 3a e4 00 00 00 cb 39 e4 |9.......:.....9.|
00000070: 00 00 00 b9 a0 11 3a e4 00 00 00 cb 39 e4 00 00 |......:.....9...|
00000080: 00 ba 9c 11 3a e4 00 00 00 cb 39 e4 00 00 00 b9 |....:.....9.....|
00000090: 9d 11 3a e4 00 00 00 cb 39 e4 00 00 00 bb 9e 11 |..:.....9.......|
000000a0: 3a e4 00 00 00 cb 39 e4 00 00 00 b9 a1 11 3a e4 |:.....9.......:.|
000000b0: 00 00 00 cb 39 e4 00 00 00 b8 a2 11 3a e4 00 00 |....9.......:...|
000000c0: 00 cb 39 e4 00 00 00 b8 a3 11 3a e4 00 00 00 cb |..9.......:.....|
000000d0: 39 e4 00 00 00 b8 a4 11 3a e4 00 00 00 cb 39 e4 |9.......:.....9.|
000000e0: 00 00 00 be af 11 3a e4 00 00 00 cb 39 e4 00 00 |......:.....9...|
000000f0: 00 bf 08 b1 11 3a e4 00 00 00 cb 39 e4 00 00 00 |.....:.....9....|
00000100: ba b0 11 3a e4 00 00 00 cb 39 e5 00 00 00 43 e6 |...:.....9....C.|
00000110: 00 00 00 39 e4 00 00 00 24 01 00 cf 28 ce 03 3a |...9....$...(..:|
00000120: 00 00 5e 00 20 04 2b 03 20 04 2b 03 20 04 2b 03 |..^. .+. .+. .+.|
00000130: 20 04 2b 03 20 04 2b 03 20 04 2b 03 20 04 2b 03 | .+. .+. .+. .+.|
00000140: 20 04 2b 03 20 04 2b 03 20 04 2b 03 25 04 2b 03 | .+. .+. .+.%.+.|
00000150: 20 04 2b 03 1b 0e 1b 0a 1b 01 00                | .+........|
```