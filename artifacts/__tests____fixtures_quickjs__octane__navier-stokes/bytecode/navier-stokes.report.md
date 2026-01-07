# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures_quickjs/octane/navier-stokes.ts
**生成时间**: 2026-01-06T16:58:59.747Z

## 大小对比

- TypeScript编译器: 7900 字节
- WASM编译器: 7884 字节
- 差异: 16 字节 (0.20%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 120,
  "atoms": [
    {
      "index": 0,
      "rawLength": 100,
      "actualLength": 50,
      "isWideChar": 0,
      "string": "__tests__/fixtures_quickjs/octane/navier-stokes.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "./base.js",
      "offset": 53
    },
    {
      "index": 2,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "Benchmark",
      "offset": 63
    },
    {
      "index": 3,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "BenchmarkSuite",
      "offset": 73
    },
    {
      "index": 4,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "NavierStokes",
      "offset": 88
    },
    {
      "index": 5,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "solver",
      "offset": 101
    },
    {
      "index": 6,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "nsFrameCounter",
      "offset": 108
    },
    {
      "index": 7,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "runNavierStokes",
      "offset": 123
    },
    {
      "index": 8,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "checkResult",
      "offset": 139
    },
    {
      "index": 9,
      "rawLength": 34,
      "actualLength": 17,
      "isWideChar": 0,
      "string": "setupNavierStokes",
      "offset": 151
    },
    {
      "index": 10,
      "rawLength": 40,
      "actualLength": 20,
      "isWideChar": 0,
      "string": "tearDownNavierStokes",
      "offset": 169
    },
    {
      "index": 11,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "addPoints",
      "offset": 190
    },
    {
      "index": 12,
      "rawLength": 44,
      "actualLength": 22,
      "isWideChar": 0,
      "string": "framesTillAddingPoints",
      "offset": 200
    },
    {
      "index": 13,
      "rawLength": 50,
      "actualLength": 25,
      "isWideChar": 0,
      "string": "framesBetweenAddingPoints",
      "offset": 223
    },
    {
      "index": 14,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "prepareFrame",
      "offset": 249
    },
    {
      "index": 15,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "FluidField",
      "offset": 262
    },
    {
      "index": 16,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "update",
      "offset": 273
    },
    {
      "index": 17,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "getDens",
      "offset": 280
    },
    {
      "index": 18,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "dens",
      "offset": 288
    },
    {
      "index": 19,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "result",
      "offset": 293
    },
    {
      "index": 20,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 300
    },
    {
      "index": 21,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "checksum failed",
      "offset": 302
    },
    {
      "index": 22,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "setResolution",
      "offset": 318
    },
    {
      "index": 23,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "setIterations",
      "offset": 332
    },
    {
      "index": 24,
      "rawLength": 36,
      "actualLength": 18,
      "isWideChar": 0,
      "string": "setDisplayFunction",
      "offset": 346
    },
    {
      "index": 25,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "setUICallback",
      "offset": 365
    },
    {
      "index": 26,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "reset",
      "offset": 379
    },
    {
      "index": 27,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "field",
      "offset": 385
    },
    {
      "index": 28,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "n",
      "offset": 391
    },
    {
      "index": 29,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "setVelocity",
      "offset": 393
    },
    {
      "index": 30,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "setDensity",
      "offset": 405
    },
    {
      "index": 31,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "canvas",
      "offset": 416
    },
    {
      "index": 32,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "addFields",
      "offset": 423
    },
    {
      "index": 33,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "set_bnd",
      "offset": 433
    },
    {
      "index": 34,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "lin_solve",
      "offset": 441
    },
    {
      "index": 35,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "diffuse",
      "offset": 451
    },
    {
      "index": 36,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "lin_solve2",
      "offset": 459
    },
    {
      "index": 37,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "diffuse2",
      "offset": 470
    },
    {
      "index": 38,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "advect",
      "offset": 479
    },
    {
      "index": 39,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "project",
      "offset": 486
    },
    {
      "index": 40,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "dens_step",
      "offset": 494
    },
    {
      "index": 41,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "vel_step",
      "offset": 504
    },
    {
      "index": 42,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "uiCallback",
      "offset": 513
    },
    {
      "index": 43,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "Field",
      "offset": 524
    },
    {
      "index": 44,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "queryUI",
      "offset": 530
    },
    {
      "index": 45,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "iterations",
      "offset": 538
    },
    {
      "index": 46,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "visc",
      "offset": 549
    },
    {
      "index": 47,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "dt",
      "offset": 554
    },
    {
      "index": 48,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "dens_prev",
      "offset": 557
    },
    {
      "index": 49,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "u",
      "offset": 567
    },
    {
      "index": 50,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "u_prev",
      "offset": 569
    },
    {
      "index": 51,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "v",
      "offset": 576
    },
    {
      "index": 52,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "v_prev",
      "offset": 578
    },
    {
      "index": 53,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "width",
      "offset": 585
    },
    {
      "index": 54,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "height",
      "offset": 591
    },
    {
      "index": 55,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "rowSize",
      "offset": 598
    },
    {
      "index": 56,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "size",
      "offset": 606
    },
    {
      "index": 57,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "displayFunc",
      "offset": 611
    },
    {
      "index": 58,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 623
    },
    {
      "index": 59,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "s",
      "offset": 625
    },
    {
      "index": 60,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 627
    },
    {
      "index": 61,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "j",
      "offset": 629
    },
    {
      "index": 62,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "maxEdge",
      "offset": 631
    },
    {
      "index": 63,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "x0",
      "offset": 639
    },
    {
      "index": 64,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 642
    },
    {
      "index": 65,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 644
    },
    {
      "index": 66,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "currentRow",
      "offset": 646
    },
    {
      "index": 67,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "invC",
      "offset": 657
    },
    {
      "index": 68,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "k",
      "offset": 662
    },
    {
      "index": 69,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "lastRow",
      "offset": 664
    },
    {
      "index": 70,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "nextRow",
      "offset": 672
    },
    {
      "index": 71,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "lastX",
      "offset": 680
    },
    {
      "index": 72,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 686
    },
    {
      "index": 73,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "y0",
      "offset": 688
    },
    {
      "index": 74,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "lastY",
      "offset": 691
    },
    {
      "index": 75,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "d",
      "offset": 697
    },
    {
      "index": 76,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "d0",
      "offset": 699
    },
    {
      "index": 77,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "Wdt0",
      "offset": 702
    },
    {
      "index": 78,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "Hdt0",
      "offset": 707
    },
    {
      "index": 79,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "Wp5",
      "offset": 712
    },
    {
      "index": 80,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "Hp5",
      "offset": 716
    },
    {
      "index": 81,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "pos",
      "offset": 720
    },
    {
      "index": 82,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "i0",
      "offset": 724
    },
    {
      "index": 83,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "i1",
      "offset": 727
    },
    {
      "index": 84,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "j0",
      "offset": 730
    },
    {
      "index": 85,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "j1",
      "offset": 733
    },
    {
      "index": 86,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "s1",
      "offset": 736
    },
    {
      "index": 87,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "s0",
      "offset": 739
    },
    {
      "index": 88,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "t1",
      "offset": 742
    },
    {
      "index": 89,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "t0",
      "offset": 745
    },
    {
      "index": 90,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "row1",
      "offset": 748
    },
    {
      "index": 91,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "row2",
      "offset": 753
    },
    {
      "index": 92,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "p",
      "offset": 758
    },
    {
      "index": 93,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "div",
      "offset": 760
    },
    {
      "index": 94,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "h",
      "offset": 764
    },
    {
      "index": 95,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "row",
      "offset": 766
    },
    {
      "index": 96,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "previousRow",
      "offset": 770
    },
    {
      "index": 97,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "prevValue",
      "offset": 782
    },
    {
      "index": 98,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "nextValue",
      "offset": 792
    },
    {
      "index": 99,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "wScale",
      "offset": 802
    },
    {
      "index": 100,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "hScale",
      "offset": 809
    },
    {
      "index": 101,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "prevPos",
      "offset": 816
    },
    {
      "index": 102,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "currentPos",
      "offset": 824
    },
    {
      "index": 103,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "nextPos",
      "offset": 835
    },
    {
      "index": 104,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "prevRow",
      "offset": 843
    },
    {
      "index": 105,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "sqrt",
      "offset": 851
    },
    {
      "index": 106,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "u0",
      "offset": 856
    },
    {
      "index": 107,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "v0",
      "offset": 859
    },
    {
      "index": 108,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "temp",
      "offset": 862
    },
    {
      "index": 109,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "getDensity",
      "offset": 867
    },
    {
      "index": 110,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "getXVelocity",
      "offset": 878
    },
    {
      "index": 111,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "getYVelocity",
      "offset": 891
    },
    {
      "index": 112,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "xv",
      "offset": 904
    },
    {
      "index": 113,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "yv",
      "offset": 907
    },
    {
      "index": 114,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "func",
      "offset": 910
    },
    {
      "index": 115,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "iters",
      "offset": 915
    },
    {
      "index": 116,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "callback",
      "offset": 921
    },
    {
      "index": 117,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "hRes",
      "offset": 930
    },
    {
      "index": 118,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "wRes",
      "offset": 935
    },
    {
      "index": 119,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "res",
      "offset": 940
    }
  ],
  "functionHeader": {
    "offset": 944,
    "tag": "0xd",
    "remaining": 6956
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 120,
  "atoms": [
    {
      "index": 0,
      "rawLength": 100,
      "actualLength": 50,
      "isWideChar": 0,
      "string": "__tests__/fixtures_quickjs/octane/navier-stokes.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "./base.js",
      "offset": 53
    },
    {
      "index": 2,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "Benchmark",
      "offset": 63
    },
    {
      "index": 3,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "BenchmarkSuite",
      "offset": 73
    },
    {
      "index": 4,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "NavierStokes",
      "offset": 88
    },
    {
      "index": 5,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "solver",
      "offset": 101
    },
    {
      "index": 6,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "nsFrameCounter",
      "offset": 108
    },
    {
      "index": 7,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "runNavierStokes",
      "offset": 123
    },
    {
      "index": 8,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "checkResult",
      "offset": 139
    },
    {
      "index": 9,
      "rawLength": 34,
      "actualLength": 17,
      "isWideChar": 0,
      "string": "setupNavierStokes",
      "offset": 151
    },
    {
      "index": 10,
      "rawLength": 40,
      "actualLength": 20,
      "isWideChar": 0,
      "string": "tearDownNavierStokes",
      "offset": 169
    },
    {
      "index": 11,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "addPoints",
      "offset": 190
    },
    {
      "index": 12,
      "rawLength": 44,
      "actualLength": 22,
      "isWideChar": 0,
      "string": "framesTillAddingPoints",
      "offset": 200
    },
    {
      "index": 13,
      "rawLength": 50,
      "actualLength": 25,
      "isWideChar": 0,
      "string": "framesBetweenAddingPoints",
      "offset": 223
    },
    {
      "index": 14,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "prepareFrame",
      "offset": 249
    },
    {
      "index": 15,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "FluidField",
      "offset": 262
    },
    {
      "index": 16,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "update",
      "offset": 273
    },
    {
      "index": 17,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "getDens",
      "offset": 280
    },
    {
      "index": 18,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "dens",
      "offset": 288
    },
    {
      "index": 19,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "result",
      "offset": 293
    },
    {
      "index": 20,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 300
    },
    {
      "index": 21,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "checksum failed",
      "offset": 302
    },
    {
      "index": 22,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "setResolution",
      "offset": 318
    },
    {
      "index": 23,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "setIterations",
      "offset": 332
    },
    {
      "index": 24,
      "rawLength": 36,
      "actualLength": 18,
      "isWideChar": 0,
      "string": "setDisplayFunction",
      "offset": 346
    },
    {
      "index": 25,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "setUICallback",
      "offset": 365
    },
    {
      "index": 26,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "reset",
      "offset": 379
    },
    {
      "index": 27,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "field",
      "offset": 385
    },
    {
      "index": 28,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "n",
      "offset": 391
    },
    {
      "index": 29,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "setVelocity",
      "offset": 393
    },
    {
      "index": 30,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "setDensity",
      "offset": 405
    },
    {
      "index": 31,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "canvas",
      "offset": 416
    },
    {
      "index": 32,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "addFields",
      "offset": 423
    },
    {
      "index": 33,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "set_bnd",
      "offset": 433
    },
    {
      "index": 34,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "lin_solve",
      "offset": 441
    },
    {
      "index": 35,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "diffuse",
      "offset": 451
    },
    {
      "index": 36,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "lin_solve2",
      "offset": 459
    },
    {
      "index": 37,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "diffuse2",
      "offset": 470
    },
    {
      "index": 38,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "advect",
      "offset": 479
    },
    {
      "index": 39,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "project",
      "offset": 486
    },
    {
      "index": 40,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "dens_step",
      "offset": 494
    },
    {
      "index": 41,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "vel_step",
      "offset": 504
    },
    {
      "index": 42,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "uiCallback",
      "offset": 513
    },
    {
      "index": 43,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "Field",
      "offset": 524
    },
    {
      "index": 44,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "queryUI",
      "offset": 530
    },
    {
      "index": 45,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "iterations",
      "offset": 538
    },
    {
      "index": 46,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "visc",
      "offset": 549
    },
    {
      "index": 47,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "dt",
      "offset": 554
    },
    {
      "index": 48,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "dens_prev",
      "offset": 557
    },
    {
      "index": 49,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "u",
      "offset": 567
    },
    {
      "index": 50,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "u_prev",
      "offset": 569
    },
    {
      "index": 51,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "v",
      "offset": 576
    },
    {
      "index": 52,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "v_prev",
      "offset": 578
    },
    {
      "index": 53,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "width",
      "offset": 585
    },
    {
      "index": 54,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "height",
      "offset": 591
    },
    {
      "index": 55,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "rowSize",
      "offset": 598
    },
    {
      "index": 56,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "size",
      "offset": 606
    },
    {
      "index": 57,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "displayFunc",
      "offset": 611
    },
    {
      "index": 58,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 623
    },
    {
      "index": 59,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "s",
      "offset": 625
    },
    {
      "index": 60,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 627
    },
    {
      "index": 61,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "j",
      "offset": 629
    },
    {
      "index": 62,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "maxEdge",
      "offset": 631
    },
    {
      "index": 63,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "x0",
      "offset": 639
    },
    {
      "index": 64,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 642
    },
    {
      "index": 65,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 644
    },
    {
      "index": 66,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "currentRow",
      "offset": 646
    },
    {
      "index": 67,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "invC",
      "offset": 657
    },
    {
      "index": 68,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "k",
      "offset": 662
    },
    {
      "index": 69,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "lastRow",
      "offset": 664
    },
    {
      "index": 70,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "nextRow",
      "offset": 672
    },
    {
      "index": 71,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "lastX",
      "offset": 680
    },
    {
      "index": 72,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 686
    },
    {
      "index": 73,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "y0",
      "offset": 688
    },
    {
      "index": 74,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "lastY",
      "offset": 691
    },
    {
      "index": 75,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "d",
      "offset": 697
    },
    {
      "index": 76,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "d0",
      "offset": 699
    },
    {
      "index": 77,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "Wdt0",
      "offset": 702
    },
    {
      "index": 78,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "Hdt0",
      "offset": 707
    },
    {
      "index": 79,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "Wp5",
      "offset": 712
    },
    {
      "index": 80,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "Hp5",
      "offset": 716
    },
    {
      "index": 81,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "pos",
      "offset": 720
    },
    {
      "index": 82,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "i0",
      "offset": 724
    },
    {
      "index": 83,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "i1",
      "offset": 727
    },
    {
      "index": 84,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "j0",
      "offset": 730
    },
    {
      "index": 85,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "j1",
      "offset": 733
    },
    {
      "index": 86,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "s1",
      "offset": 736
    },
    {
      "index": 87,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "s0",
      "offset": 739
    },
    {
      "index": 88,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "t1",
      "offset": 742
    },
    {
      "index": 89,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "t0",
      "offset": 745
    },
    {
      "index": 90,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "row1",
      "offset": 748
    },
    {
      "index": 91,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "row2",
      "offset": 753
    },
    {
      "index": 92,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "p",
      "offset": 758
    },
    {
      "index": 93,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "div",
      "offset": 760
    },
    {
      "index": 94,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "h",
      "offset": 764
    },
    {
      "index": 95,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "row",
      "offset": 766
    },
    {
      "index": 96,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "previousRow",
      "offset": 770
    },
    {
      "index": 97,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "prevValue",
      "offset": 782
    },
    {
      "index": 98,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "nextValue",
      "offset": 792
    },
    {
      "index": 99,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "wScale",
      "offset": 802
    },
    {
      "index": 100,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "hScale",
      "offset": 809
    },
    {
      "index": 101,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "prevPos",
      "offset": 816
    },
    {
      "index": 102,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "currentPos",
      "offset": 824
    },
    {
      "index": 103,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "nextPos",
      "offset": 835
    },
    {
      "index": 104,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "prevRow",
      "offset": 843
    },
    {
      "index": 105,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "sqrt",
      "offset": 851
    },
    {
      "index": 106,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "u0",
      "offset": 856
    },
    {
      "index": 107,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "v0",
      "offset": 859
    },
    {
      "index": 108,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "temp",
      "offset": 862
    },
    {
      "index": 109,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "getDensity",
      "offset": 867
    },
    {
      "index": 110,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "getXVelocity",
      "offset": 878
    },
    {
      "index": 111,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "getYVelocity",
      "offset": 891
    },
    {
      "index": 112,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "xv",
      "offset": 904
    },
    {
      "index": 113,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "yv",
      "offset": 907
    },
    {
      "index": 114,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "func",
      "offset": 910
    },
    {
      "index": 115,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "iters",
      "offset": 915
    },
    {
      "index": 116,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "callback",
      "offset": 921
    },
    {
      "index": 117,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "hRes",
      "offset": 930
    },
    {
      "index": 118,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "wRes",
      "offset": 935
    },
    {
      "index": 119,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "res",
      "offset": 940
    }
  ],
  "functionHeader": {
    "offset": 944,
    "tag": "0xd",
    "remaining": 6940
  }
}
```

## 字节级差异

共发现 4011 个字节差异:

- 偏移量 0x566: TS=0xe6 vs WASM=0xd2
- 偏移量 0x568: TS=0x0d vs WASM=0x03
- 偏移量 0x56a: TS=0xd2 vs WASM=0xe6
- 偏移量 0x56c: TS=0x03 vs WASM=0x0d
- 偏移量 0x572: TS=0xdf vs WASM=0xe0
- 偏移量 0x578: TS=0xe8 vs WASM=0xe7
- 偏移量 0x588: TS=0xe0 vs WASM=0xdf
- 偏移量 0x594: TS=0xe0 vs WASM=0xdf
- 偏移量 0x5a0: TS=0xe0 vs WASM=0xdf
- 偏移量 0x5ab: TS=0xe0 vs WASM=0xdf
- 偏移量 0xcc6: TS=0xa8 vs WASM=0xa6
- 偏移量 0xd22: TS=0x33 vs WASM=0x32
- 偏移量 0xd29: TS=0x2c vs WASM=0x2b
- 偏移量 0xd30: TS=0x1f vs WASM=0x1e
- 偏移量 0xd3d: TS=0x0e vs WASM=0x0d
- 偏移量 0xd44: TS=0xc8 vs WASM=0x95
- 偏移量 0xd45: TS=0x91 vs WASM=0x01
- 偏移量 0xd46: TS=0xcc vs WASM=0x95
- 偏移量 0xd47: TS=0x95 vs WASM=0x02
- 偏移量 0xd48: TS=0x02 vs WASM=0xee
- ... (显示前20个差异，总共4011个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 78 64 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |.xd__tests__/fix|
00000010: 74 75 72 65 73 5f 71 75 69 63 6b 6a 73 2f 6f 63 |tures_quickjs/oc|
00000020: 74 61 6e 65 2f 6e 61 76 69 65 72 2d 73 74 6f 6b |tane/navier-stok|
00000030: 65 73 2e 6a 73 12 2e 2f 62 61 73 65 2e 6a 73 12 |es.js../base.js.|
00000040: 42 65 6e 63 68 6d 61 72 6b 1c 42 65 6e 63 68 6d |Benchmark.Benchm|
00000050: 61 72 6b 53 75 69 74 65 18 4e 61 76 69 65 72 53 |arkSuite.NavierS|
00000060: 74 6f 6b 65 73 0c 73 6f 6c 76 65 72 1c 6e 73 46 |tokes.solver.nsF|
00000070: 72 61 6d 65 43 6f 75 6e 74 65 72 1e 72 75 6e 4e |rameCounter.runN|
00000080: 61 76 69 65 72 53 74 6f 6b 65 73 16 63 68 65 63 |avierStokes.chec|
00000090: 6b 52 65 73 75 6c 74 22 73 65 74 75 70 4e 61 76 |kResult"setupNav|
000000a0: 69 65 72 53 74 6f 6b 65 73 28 74 65 61 72 44 6f |ierStokes(tearDo|
000000b0: 77 6e 4e 61 76 69 65 72 53 74 6f 6b 65 73 12 61 |wnNavierStokes.a|
000000c0: 64 64 50 6f 69 6e 74 73 2c 66 72 61 6d 65 73 54 |ddPoints,framesT|
000000d0: 69 6c 6c 41 64 64 69 6e 67 50 6f 69 6e 74 73 32 |illAddingPoints2|
000000e0: 66 72 61 6d 65 73 42 65 74 77 65 65 6e 41 64 64 |framesBetweenAdd|
000000f0: 69 6e 67 50 6f 69 6e 74 73 18 70 72 65 70 61 72 |ingPoints.prepar|
00000100: 65 46 72 61 6d 65 14 46 6c 75 69 64 46 69 65 6c |eFrame.FluidFiel|
00000110: 64 0c 75 70 64 61 74 65 0e 67 65 74 44 65 6e 73 |d.update.getDens|
00000120: 08 64 65 6e 73 0c 72 65 73 75 6c 74 02 69 1e 63 |.dens.result.i.c|
00000130: 68 65 63 6b 73 75 6d 20 66 61 69 6c 65 64 1a 73 |hecksum failed.s|
00000140: 65 74 52 65 73 6f 6c 75 74 69 6f 6e 1a 73 65 74 |etResolution.set|
00000150: 49 74 65 72 61 74 69 6f 6e 73 24 73 65 74 44 69 |Iterations$setDi|
00000160: 73 70 6c 61 79 46 75 6e 63 74 69 6f 6e 1a 73 65 |splayFunction.se|
00000170: 74 55 49 43 61 6c 6c 62 61 63 6b 0a 72 65 73 65 |tUICallback.rese|
00000180: 74 0a 66 69 65 6c 64 02 6e 16 73 65 74 56 65 6c |t.field.n.setVel|
00000190: 6f 63 69 74 79 14 73 65 74 44 65 6e 73 69 74 79 |ocity.setDensity|
000001a0: 0c 63 61 6e 76 61 73 12 61 64 64 46 69 65 6c 64 |.canvas.addField|
000001b0: 73 0e 73 65 74 5f 62 6e 64 12 6c 69 6e 5f 73 6f |s.set_bnd.lin_so|
000001c0: 6c 76 65 0e 64 69 66 66 75 73 65 14 6c 69 6e 5f |lve.diffuse.lin_|
000001d0: 73 6f 6c 76 65 32 10 64 69 66 66 75 73 65 32 0c |solve2.diffuse2.|
000001e0: 61 64 76 65 63 74 0e 70 72 6f 6a 65 63 74 12 64 |advect.project.d|
000001f0: 65 6e 73 5f 73 74 65 70 10 76 65 6c 5f 73 74 65 |ens_step.vel_ste|
00000200: 70 14 75 69 43 61 6c 6c 62 61 63 6b 0a 46 69 65 |p.uiCallback.Fie|
00000210: 6c 64 0e 71 75 65 72 79 55 49 14 69 74 65 72 61 |ld.queryUI.itera|
00000220: 74 69 6f 6e 73 08 76 69 73 63 04 64 74 12 64 65 |tions.visc.dt.de|
00000230: 6e 73 5f 70 72 65 76 02 75 0c 75 5f 70 72 65 76 |ns_prev.u.u_prev|
00000240: 02 76 0c 76 5f 70 72 65 76 0a 77 69 64 74 68 0c |.v.v_prev.width.|
00000250: 68 65 69 67 68 74 0e 72 6f 77 53 69 7a 65 08 73 |height.rowSize.s|
00000260: 69 7a 65 16 64 69 73 70 6c 61 79 46 75 6e 63 02 |ize.displayFunc.|
00000270: 78 02 73 02 62 02 6a 0e 6d 61 78 45 64 67 65 04 |x.s.b.j.maxEdge.|
00000280: 78 30 02 61 02 63 14 63 75 72 72 65 6e 74 52 6f |x0.a.c.currentRo|
00000290: 77 08 69 6e 76 43 02 6b 0e 6c 61 73 74 52 6f 77 |w.invC.k.lastRow|
000002a0: 0e 6e 65 78 74 52 6f 77 0a 6c 61 73 74 58 02 79 |.nextRow.lastX.y|
000002b0: 04 79 30 0a 6c 61 73 74 59 02 64 04 64 30 08 57 |.y0.lastY.d.d0.W|
000002c0: 64 74 30 08 48 64 74 30 06 57 70 35 06 48 70 35 |dt0.Hdt0.Wp5.Hp5|
000002d0: 06 70 6f 73 04 69 30 04 69 31 04 6a 30 04 6a 31 |.pos.i0.i1.j0.j1|
000002e0: 04 73 31 04 73 30 04 74 31 04 74 30 08 72 6f 77 |.s1.s0.t1.t0.row|
000002f0: 31 08 72 6f 77 32 02 70 06 64 69 76 02 68 06 72 |1.row2.p.div.h.r|
00000300: 6f 77 16 70 72 65 76 69 6f 75 73 52 6f 77 12 70 |ow.previousRow.p|
00000310: 72 65 76 56 61 6c 75 65 12 6e 65 78 74 56 61 6c |revValue.nextVal|
00000320: 75 65 0c 77 53 63 61 6c 65 0c 68 53 63 61 6c 65 |ue.wScale.hScale|
00000330: 0e 70 72 65 76 50 6f 73 14 63 75 72 72 65 6e 74 |.prevPos.current|
00000340: 50 6f 73 0e 6e 65 78 74 50 6f 73 0e 70 72 65 76 |Pos.nextPos.prev|
00000350: 52 6f 77 08 73 71 72 74 04 75 30 04 76 30 08 74 |Row.sqrt.u0.v0.t|
00000360: 65 6d 70 14 67 65 74 44 65 6e 73 69 74 79 18 67 |emp.getDensity.g|
00000370: 65 74 58 56 65 6c 6f 63 69 74 79 18 67 65 74 59 |etXVelocity.getY|
00000380: 56 65 6c 6f 63 69 74 79 04 78 76 04 79 76 08 66 |Velocity.xv.yv.f|
00000390: 75 6e 63 0a 69 74 65 72 73 10 63 61 6c 6c 62 61 |unc.iters.callba|
000003a0: 63 6b 08 68 52 65 73 08 77 52 65 73 06 72 65 73 |ck.hRes.wRes.res|
000003b0: 0d c8 03 01 ca 03 02 00 00 02 00 00 cc 03 00 01 |................|
000003c0: 00 ce 03 00 00 0c 20 06 01 a4 01 00 00 00 0f 0e |...... .........|
000003d0: 07 6c 00 cc 03 00 0c ce 03 01 0c d0 03 00 01 d2 |.l..............|
000003e0: 03 01 01 d4 03 02 01 d6 03 03 01 d8 03 04 01 da |................|
000003f0: 03 05 01 dc 03 06 01 de 03 07 01 e0 03 08 01 e2 |................|
00000400: 03 09 01 e4 03 0a 01 e6 03 0b 01 08 ec 25 c2 00 |.............%..|
00000410: 61 05 00 c2 01 61 06 00 c2 02 61 07 00 c2 03 61 |a....a....a....a|
00000420: 08 00 c2 04 61 09 00 c2 05 61 0c 00 c2 06 61 0d |....a....a....a.|
00000430: 00 29 68 01 00 11 04 e8 00 00 00 01 e0 a4 16 00 |.)h.............|
00000440: 26 01 00 68 00 00 11 04 e8 00 00 00 0a 09 c0 b4 |&..h............|
00000450: 00 60 05 00 60 07 00 60 08 00 07 bf 10 21 09 00 |.`..`..`.....!..|
00000460: 26 01 00 21 03 00 e5 07 e6 b7 61 04 00 b7 61 0a |&..!......a...a.|
00000470: 00 bc 61 0b 00 06 2f c8 03 13 00 00 00 27 38 2e |..a.../......'8.|
00000480: 57 5e 48 58 11 22 11 26 20 8d 01 20 53 00 0c 43 |W^HX.".& .. S..C|
00000490: 06 01 d6 03 00 00 00 03 03 00 1f 00 d2 03 03 00 |................|
000004a0: d4 03 04 00 d8 03 06 00 df 43 f4 00 00 00 24 00 |.........C....$.|
000004b0: 00 0e e0 91 e8 bf 0f ab ec 0d e1 df 43 f5 00 00 |............C...|
000004c0: 00 24 00 00 f1 0e 29 c8 03 18 1f 00 03 08 07 0c |.$....).........|
000004d0: 1b 0e 17 19 08 08 16 1e 12 1d 07 18 07 0c 1b 10 |................|
000004e0: 11 1d 00 0c 43 06 01 d8 03 01 02 01 03 00 00 32 |....C..........2|
000004f0: 03 ec 03 00 01 00 ee 03 00 00 00 f0 03 00 01 00 |................|
00000500: b7 cb c0 58 1b cc c8 c0 bc 1b a5 ec 10 c7 d3 c8 |...X............|
00000510: 48 bf 0a 9c 97 97 9f cb 95 01 ee eb c7 bf 4d ac |H.............M.|
00000520: ec 10 39 9f 00 00 00 11 04 f9 00 00 00 21 01 00 |..9..........!..|
00000530: 30 29 c8 03 22 25 00 22 2e 16 04 12 21 07 1c 07 |0).."%."....!...|
00000540: 0a 07 01 11 08 07 15 07 01 07 05 0b 26 19 33 11 |............&.3.|
00000550: 0e 12 08 39 0a 11 1f 00 0c 43 06 01 da 03 00 00 |...9.....C......|
00000560: 00 04 03 01 43 00 e6 03 0d 00 d2 03 03 00 e4 03 |....C...........|
00000570: 0c 00 df 11 07 21 01 00 e8 43 fa 00 00 00 c0 80 |.....!...C......|
00000580: 00 c0 80 00 24 02 00 0e e0 43 fb 00 00 00 bf 14 |....$....C......|
00000590: 24 01 00 0e e0 43 fc 00 00 00 c2 00 24 01 00 0e |$....C......$...|
000005a0: e0 43 fd 00 00 00 e1 24 01 00 0e e0 43 fe 00 00 |.C.....$....C...|
000005b0: 00 24 00 00 29 c8 03 24 2e 00 03 22 11 14 17 21 |.$..)..$..."...!|
000005c0: 39 1c 17 27 07 0c 25 1c 17 27 07 0c 25 26 17 31 |9..'..%..'..%&.1|
000005d0: 07 0c 1b 1e 07 01 17 27 07 0c 1b 0c 00 0c 43 06 |.......'......C.|
000005e0: 01 00 00 00 00 00 00 00 01 00 29 c8 03 02 32 1e |..........)...2.|
000005f0: 00 0c 43 06 01 dc 03 00 00 00 01 01 00 03 00 d2 |..C.............|
00000600: 03 03 00 07 e3 29 c8 03 04 36 00 03 08 00 0c 43 |.....)...6.....C|
00000610: 06 01 de 03 01 02 01 06 00 00 76 03 fe 03 00 01 |..........v.....|
00000620: 00 80 04 00 00 00 f0 03 00 01 00 bf 40 cb b8 cc |............@...|
00000630: c8 c7 a6 ec 6c d3 43 01 01 00 00 c8 c8 c7 c7 24 |....l.C........$|
00000640: 04 00 0e d3 43 02 01 00 00 c8 c8 bc 24 03 00 0e |....C.......$...|
00000650: d3 43 01 01 00 00 c8 c7 c8 a0 c7 8e c7 8e 24 04 |.C............$.|
00000660: 00 0e d3 43 02 01 00 00 c8 c7 c8 a0 bf 14 24 03 |...C..........$.|
00000670: 00 0e d3 43 01 01 00 00 c0 80 00 c8 a0 c7 c8 9f |...C............|
00000680: c7 8e c7 8e 24 04 00 0e d3 43 02 01 00 00 c0 80 |....$....C......|
00000690: 00 c8 a0 c7 c8 9f bf 1e 24 03 00 0e 95 01 ee 91 |........$.......|
000006a0: 29 c8 03 70 39 00 1d 28 07 0a 07 05 12 1b 07 0a |)..p9..(........|
000006b0: 1b 1a 07 06 07 06 07 06 07 13 17 21 07 0a 1b 18 |...........!....|
000006c0: 07 06 0c 07 17 1f 07 0a 1b 1a 07 06 07 08 07 03 |................|
000006d0: 07 0c 07 01 07 0a 07 01 07 1d 17 21 07 0a 1b 18 |...........!....|
000006e0: 07 06 07 08 07 03 11 0b 17 1f 07 0a 2a 26 07 03 |............*&..|
000006f0: 07 0a 07 08 07 03 07 0c 07 01 07 0a 07 01 07 29 |...............)|
00000700: 17 21 07 0a 2a 24 07 03 07 0a 07 08 07 03 11 17 |.!..*$..........|
00000710: 00 04 0b 0a 00 0c 43 06 01 e4 03 01 00 01 02 03 |......C.........|
00000720: 00 13 01 fe 03 00 01 00 e0 03 0a 00 de 03 09 00 |................|
00000730: e2 03 0b 00 df b7 ab ec 0b e0 d3 f1 0e e1 e3 e1 |................|
00000740: 91 e5 29 df 90 e3 29 c8 03 16 46 00 03 10 0c 2e |..)...)...F.....|
00000750: 12 2d 07 14 07 01 0d 20 0d 31 07 32 14 31 07 2c |.-..... .1.2.1.,|
00000760: 00 0c 43 06 01 e6 03 01 1d 01 04 00 17 9f 01 1e |..C.............|
00000770: 86 04 00 01 00 88 04 00 00 40 8a 04 00 01 40 8c |.........@....@.|
00000780: 04 00 02 40 8e 04 00 03 40 90 04 00 04 40 92 04 |...@....@....@..|
00000790: 00 05 40 94 04 00 06 40 96 04 00 07 40 98 04 00 |..@....@....@...|
000007a0: 08 40 9a 04 00 09 40 9c 04 00 0a 40 9e 04 00 0b |.@....@....@....|
000007b0: 40 a0 04 00 0c 40 a2 04 00 0d 40 a4 04 00 0e 00 |@....@....@.....|
000007c0: a6 04 00 0f 40 ec 03 00 10 40 a8 04 00 11 40 aa |....@....@....@.|
000007d0: 04 00 12 40 ac 04 00 13 40 ae 04 00 14 40 b0 04 |...@....@....@..|
000007e0: 00 15 40 b2 04 00 16 40 b4 04 00 17 40 b6 04 00 |..@....@....@...|
000007f0: 18 40 b8 04 00 19 40 ba 04 00 1a 40 fc 03 00 1b |.@....@....@....|
00000800: 40 10 00 01 00 08 c5 1c c2 00 cb c2 01 cc c2 02 |@...............|
00000810: cd c2 03 ce c2 04 c5 04 c2 05 c5 05 c2 06 c5 06 |................|
00000820: c2 07 c5 07 c2 08 c5 08 c2 09 c5 09 c2 0b c5 0b |................|
00000830: c2 0c c5 0c c2 14 c5 1b c2 0a 4f 0e 01 00 00 c5 |..........O.....|
00000840: 0a c4 1c c2 0d 44 f4 00 00 00 c4 1c c2 0e 44 fc |.....D........D.|
00000850: 00 00 00 c4 1c c2 0f 44 11 01 00 00 c4 1c c2 10 |.......D........|
00000860: 44 fb 00 00 00 c4 1c c2 11 44 fd 00 00 00 bf 0a |D........D......|
00000870: c5 0d c1 12 c5 0e c1 13 c5 0f c4 1c c4 1b 44 fe |..............D.|
00000880: 00 00 00 c4 1c c2 15 44 f5 00 00 00 c4 1c c2 16 |.......D........|
00000890: 44 fa 00 00 00 c4 1c 43 fa 00 00 00 bf 40 bf 40 |D......C.....@.@|
000008a0: 24 02 00 29 c8 03 33 51 00 00 3c d2 03 08 0c 08 |$..)..3Q..<.....|
000008b0: 00 07 0c 07 0c 08 28 07 0c 08 26 07 0c 08 00 07 |......(...&.....|
000008c0: 08 07 0c 08 00 13 3a 07 0c 1a 26 19 0c 08 28 07 |......:...&...(.|
000008d0: 0c 08 00 07 14 07 0c 08 2f 1c 00 0c 43 06 01 88 |......../...C...|
000008e0: 04 03 01 03 06 01 00 16 04 bc 04 00 01 00 be 04 |................|
000008f0: 00 01 00 a6 04 00 01 00 f0 03 00 00 00 b8 04 19 |................|
00000900: 01 b7 cb c7 df a5 ec 0f d3 c7 4a d5 d4 c7 48 9c |..........J...H.|
00000910: 9f 4b 95 00 ee ee 29 c8 03 1c 52 04 0d 28 07 08 |.K....)...R..(..|
00000920: 07 03 12 1b 07 04 07 01 07 0e 07 0a 07 04 07 01 |................|
00000930: 07 05 07 0b 0b 24 00 0c 43 06 01 8a 04 02 03 02 |.....$..C.......|
00000940: 08 03 04 c0 02 05 c0 04 00 01 00 bc 04 00 01 00 |................|
00000950: f0 03 00 00 00 c2 04 00 01 00 c4 04 00 02 00 b2 |................|
00000960: 04 16 01 b6 04 18 01 b4 04 17 01 d3 b8 ad ec 50 |...............P|
00000970: b8 cb c7 df a6 ec 1d d4 c7 d4 c7 e0 9f 48 4b d4 |.............HK.|
00000980: c7 e1 b8 9f e0 9c 9f d4 c7 e1 e0 9c 9f 48 4b 95 |.............HK.|
00000990: 00 ee e0 b8 cc c8 e1 a6 6c c1 00 00 00 d4 c8 e0 |........l.......|
000009a0: 9c d4 b8 c8 e0 9c 9f 48 8e 4b d4 df b8 9f c8 e0 |.......H.K......|
000009b0: 9c 9f d4 df c8 e0 9c 9f 48 8e 4b 95 01 ee d7 d3 |........H.K.....|
000009c0: b9 ad ec 4d b8 cb c7 df a6 ec 1f d4 c7 d4 c7 e0 |...M............|
000009d0: 9f 48 8e 4b d4 c7 e1 b8 9f e0 9c 9f d4 c7 e1 e0 |.H.K............|
000009e0: 9c 9f 48 8e 4b 95 00 ee de b8 cc c8 e1 a6 ec 6b |..H.K..........k|
000009f0: d4 c8 e0 9c d4 b8 c8 e0 9c 9f 48 4b d4 df b8 9f |..........HK....|
00000a00: c8 e0 9c 9f d4 df c8 e0 9c 9f 48 4b 95 01 ee dc |..........HK....|
00000a10: b8 cb c7 df a6 ec 1d d4 c7 d4 c7 e0 9f 48 4b d4 |.............HK.|
00000a20: c7 e1 b8 9f e0 9c 9f d4 c7 e1 e0 9c 9f 48 4b 95 |.............HK.|
00000a30: 00 ee e0 b8 cc c8 e1 a6 ec 21 d4 c8 e0 9c d4 b8 |.........!......|
00000a40: c8 e0 9c 9f 48 4b d4 df b8 9f c8 e0 9c 9f d4 df |....HK..........|
00000a50: c8 e0 9c 9f 48 4b 95 01 ee dc e1 b8 9f e0 9c cd |....HK..........|
00000a60: d4 b7 c1 00 d4 b8 48 d4 e0 48 9f 9c 4b d4 c9 c1 |......H..H..K...|
00000a70: 01 d4 b8 c9 9f 48 d4 e1 e0 9c 48 9f 9c 4b d4 df |.....H....H..K..|
00000a80: b8 9f c1 02 d4 df 48 d4 df b8 9f e0 9f 48 9f 9c |......H......H..|
00000a90: 4b d4 df b8 9f c9 9f c1 03 d4 df c9 9f 48 d4 df |K............H..|
00000aa0: b8 9f e1 e0 9c 9f 48 9f 9c 4b 29 c8 03 e6 03 56 |......H..K)....V|
00000ab0: 04 03 10 0c 04 1c 1c 07 0a 07 05 12 1b 07 04 07 |................|
00000ac0: 0a 07 04 07 08 07 03 07 05 0d 0f 07 04 07 0a 0c |................|
00000ad0: 0e 07 0e 07 03 07 1d 07 38 07 04 07 08 07 12 07 |........8.......|
00000ae0: 03 07 11 07 05 00 02 03 0f 00 06 08 19 07 0a 07 |................|
00000af0: 05 21 1b 07 04 07 08 07 03 07 1c 0c 0c 07 08 07 |.!..............|
00000b00: 03 07 07 07 05 07 03 0d 21 07 06 0c 0c 07 0e 07 |........!.......|
00000b10: 08 07 03 07 07 07 24 07 04 07 10 07 08 07 03 07 |......$.........|
00000b20: 07 07 0d 07 03 00 02 03 09 00 04 0a 31 0c 04 1c |............1...|
00000b30: 12 07 0a 07 05 12 1b 07 04 07 0c 07 04 07 08 07 |................|
00000b40: 03 07 05 07 03 0d 0d 07 04 07 0a 0c 0e 07 0e 07 |................|
00000b50: 03 07 1d 07 3a 07 04 07 08 07 12 07 03 07 11 07 |....:...........|
00000b60: 05 07 03 00 02 03 0d 00 06 08 19 07 0a 07 05 12 |................|
00000b70: 1b 07 04 07 08 07 03 07 1a 0c 0c 07 08 07 03 07 |................|
00000b80: 07 07 05 0d 23 07 06 0c 0c 07 0e 07 08 07 03 07 |....#...........|
00000b90: 07 07 22 07 04 07 10 07 08 07 03 07 07 07 0d 00 |..".............|
00000ba0: 02 03 0b 00 06 0c 1b 07 0a 07 05 12 1b 07 04 07 |................|
00000bb0: 0a 07 04 07 08 07 03 07 05 0d 0f 07 04 07 0a 0c |................|
00000bc0: 0e 07 0e 07 03 07 1d 07 38 07 04 07 08 07 12 07 |........8.......|
00000bd0: 03 07 11 07 05 00 02 03 0f 00 06 08 19 07 0a 07 |................|
00000be0: 05 12 1b 07 04 07 08 07 03 07 1a 0c 0c 07 08 07 |................|
00000bf0: 03 07 07 07 05 0d 23 07 06 0c 0c 07 0e 07 08 07 |......#.........|
00000c00: 03 07 07 07 22 07 04 07 10 07 08 07 03 07 07 07 |...."...........|
00000c10: 0d 00 02 03 0b 00 04 0a 25 0c 0e 07 0e 07 03 0d |........%.......|
00000c20: 35 0c 02 0c 1a 0c 02 07 0c 07 04 07 01 07 05 07 |5...............|
00000c30: 0f 0d 15 07 04 07 01 0c 26 0c 0c 07 03 07 05 07 |........&.......|
00000c40: 20 07 04 07 12 07 03 07 0f 07 05 07 23 0d 21 07 | ...........#.!.|
00000c50: 06 0c 0c 07 0f 0c 2e 07 04 07 01 07 14 07 06 0c |................|
00000c60: 0c 07 0e 07 03 07 19 07 05 07 17 0d 29 07 06 0c |............)...|
00000c70: 0c 07 0e 07 03 07 19 0c 42 07 04 07 10 07 03 07 |........B.......|
00000c80: 0d 07 28 07 06 0c 0c 07 0e 07 12 07 03 07 11 07 |..(.............|
00000c90: 19 07 05 07 2b 00 06 00 00 00 00 00 00 e0 3f 06 |....+.........?.|
00000ca0: 00 00 00 00 00 00 e0 3f 06 00 00 00 00 00 00 e0 |.......?........|
00000cb0: 3f 06 00 00 00 00 00 00 e0 3f 0c 43 06 01 8c 04 |?........?.C....|
00000cc0: 05 08 05 07 05 00 a8 01 0d c0 04 00 01 00 bc 04 |................|
00000cd0: 00 01 00 c6 04 00 01 00 c8 04 00 01 00 ca 04 00 |................|
00000ce0: 01 00 c2 04 00 00 00 cc 04 00 01 00 f0 03 00 02 |................|
00000cf0: 00 ce 04 00 03 00 d0 04 00 04 00 d2 04 00 05 00 |................|
00000d00: d4 04 00 06 00 d6 04 00 07 00 b4 04 17 01 b6 04 |................|
00000d10: 18 01 b2 04 16 01 8a 04 01 01 a2 04 0d 01 d6 b7 |................|
00000d20: ad ec 33 5d 04 00 b8 ad ec 2c b8 cb c7 df a6 ec |..3].....,......|
00000d30: 1f c7 e0 9c d0 91 cc b7 cd c9 e1 a5 ec 0e d4 c8 |................|
00000d40: d5 c8 48 4b c8 91 cc 95 02 ee ef 95 00 ee de e2 |..HK............|
00000d50: d3 d4 f2 0e 29 b8 5d 04 00 9d ce b7 c5 04 c4 04 |....).].........|
00000d60: 60 04 00 a5 ec 60 b8 cb c7 df a6 ec 50 c7 b8 a0 |`....`......P...|
00000d70: e0 9c c5 05 c7 e0 9c cc c7 b8 9f e0 9c c5 06 d4 |................|
00000d80: c8 48 c5 07 c8 91 cc b8 cd c9 e1 a6 ec 2b d4 c8 |.H...........+..|
00000d90: d5 c8 48 d6 c4 07 d4 c8 91 d0 48 9f d4 c4 05 91 |..H.......H.....|
00000da0: c6 05 48 9f d4 c4 06 91 c6 06 48 9f 9c 9f ca 9c |..H.......H.....|
00000db0: 16 4b c5 07 95 02 ee d2 95 00 ee ad e2 d3 d4 f2 |.K..............|
00000dc0: 0e 95 04 ee 9a 29 c8 03 c0 01 7b 04 03 10 0c 04 |.....)....{.....|
00000dd0: 11 12 16 04 1c 06 07 0a 07 05 12 06 07 08 07 03 |................|
00000de0: 08 21 07 03 17 20 07 08 07 03 12 1b 07 04 07 1c |.!... ..........|
00000df0: 07 06 07 01 0d 1f 07 03 00 02 03 30 00 04 05 03 |...........0....|
00000e00: 00 04 10 3b 07 10 07 06 07 07 19 10 11 03 1c 06 |...;............|
00000e10: 0c 08 11 03 1c 04 07 0a 07 05 12 02 0c 04 07 0e |................|
00000e20: 07 03 12 09 07 08 07 03 0d 07 0c 04 07 0e 07 03 |................|
00000e30: 12 13 07 04 07 01 12 15 07 03 17 20 07 0a 07 05 |........... ....|
00000e40: 12 0b 07 04 07 1e 07 06 07 01 07 1e 07 0a 0c 10 |................|
00000e50: 07 08 07 03 0c 01 07 05 07 28 07 08 0c 03 11 01 |.........(......|
00000e60: 07 05 07 22 07 08 0c 03 11 01 07 05 07 53 07 07 |...".........S..|
00000e70: 07 82 01 07 03 1a 9b 01 00 04 0b 05 00 04 12 3b |...............;|
00000e80: 07 10 07 06 07 07 00 02 13 2c 00 0c 43 06 01 8e |.........,..C...|
00000e90: 04 04 01 04 08 01 00 10 05 c0 04 00 01 00 bc 04 |................|
00000ea0: 00 01 00 c6 04 00 01 00 a6 04 00 01 00 c8 04 00 |................|
00000eb0: 00 00 8c 04 02 01 b7 cb df d3 d4 d5 c7 b8 bb c7 |................|
00000ec0: 9c 9f 22 05 00 29 c8 03 15 97 01 04 0e 08 07 14 |.."..)..........|
00000ed0: 07 06 07 06 07 08 11 16 07 03 07 07 07 1f 00 0c |................|
00000ee0: 43 06 01 90 04 06 09 06 07 05 00 e5 01 0f bc 04 |C...............|
00000ef0: 00 01 00 c6 04 00 01 00 d8 04 00 01 00 da 04 00 |................|
00000f00: 01 00 c8 04 00 01 00 ca 04 00 01 00 c2 04 00 00 |................|
00000f10: 00 cc 04 00 01 00 f0 03 00 02 00 ce 04 00 03 00 |................|
00000f20: d0 04 00 04 00 d2 04 00 05 00 d4 04 00 06 00 d6 |................|
00000f30: 04 00 07 00 dc 04 00 08 00 b4 04 17 01 b6 04 18 |................|
00000f40: 01 b2 04 16 01 8a 04 01 01 a2 04 0d 01 5d 04 00 |.............]..|
00000f50: b7 ad ec 3e 5d 05 00 b8 ad ec 37 b8 cb c7 df a6 |...>].....7.....|
00000f60: ec 25 c7 e0 9c d0 91 cc b7 cd c9 e1 a5 ec 14 d3 |.%..............|
00000f70: c8 d4 c8 48 4b d5 c8 d6 c8 48 4b c8 91 cc 95 02 |...HK....HK.....|
00000f80: ee e9 95 00 ee d8 e2 b8 d3 f2 0e e2 b9 d5 f2 0e |................|
00000f90: 29 b8 5d 05 00 9d ce b7 c5 04 c4 04 60 04 00 a5 |).].........`...|
00000fa0: 6c 90 00 00 00 b8 cb c7 df a6 ec 77 c7 b8 a0 e0 |l..........w....|
00000fb0: 9c c5 05 c7 e0 9c cc c7 b8 9f e0 9c c5 06 d3 c8 |................|
00000fc0: 48 c5 07 d5 c8 48 c5 08 c8 91 cc b8 cd c9 e1 a6 |H....H..........|
00000fd0: ec 4d d3 c8 d4 c8 48 5d 04 00 c4 07 d3 c8 48 9f |.M....H]......H.|
00000fe0: d3 c4 05 48 9f d3 c4 06 48 9f 9c 9f ca 9c 16 4b |...H....H......K|
00000ff0: c5 07 d5 c8 d6 c8 48 5d 04 00 c4 08 d5 c8 91 d0 |......H]........|
00001000: 48 9f d5 c4 05 91 c6 05 48 9f d5 c4 06 91 c6 06 |H.......H.......|
00001010: 48 9f 9c 9f ca 9c 16 4b c5 08 95 02 ee b0 95 00 |H......K........|
00001020: ee 86 e2 b8 d3 f2 0e e2 b9 d5 f2 0e 95 04 ef 6b |...............k|
00001030: ff 29 c8 03 8a 02 9b 01 04 03 10 16 04 11 12 16 |.)..............|
00001040: 04 1c 06 07 0a 07 05 12 06 07 08 07 03 08 21 07 |..............!.|
00001050: 03 17 20 07 08 07 03 12 1b 07 04 07 1c 07 06 07 |.. .............|
00001060: 01 0d 23 07 04 07 1c 07 06 07 01 0d 1f 07 03 00 |..#.............|
00001070: 02 05 30 00 04 05 03 00 04 12 3b 0c 16 07 07 0d |..0.......;.....|
00001080: 0d 0c 16 07 07 19 10 11 03 1c 06 0c 08 11 03 2b |...............+|
00001090: 04 07 0a 07 05 12 02 0c 04 07 0e 07 03 12 09 07 |................|
000010a0: 08 07 03 0d 07 0c 04 07 0e 07 03 12 13 07 04 07 |................|
000010b0: 01 12 01 07 04 07 01 12 15 07 03 17 20 07 0a 07 |............ ...|
000010c0: 05 12 0b 07 04 07 1e 07 06 07 01 07 1e 11 0a 0c |................|
000010d0: 10 07 04 07 01 07 05 07 24 07 04 0c 01 07 05 07 |........$.......|
000010e0: 1e 07 04 0c 01 07 05 07 4b 07 07 07 76 07 03 1c |........K...v...|
000010f0: b1 01 07 04 07 1e 07 06 07 01 07 1e 11 0a 0c 10 |................|
00001100: 07 08 07 03 0c 01 07 05 07 28 07 08 0c 03 11 01 |.........(......|
00001110: 07 05 07 22 07 08 0c 03 11 01 07 05 07 53 07 07 |...".........S..|
00001120: 07 82 01 07 03 00 05 03 9b 01 00 04 0d 05 00 04 |................|
00001130: 18 3b 0c 16 07 07 0d 0d 0c 16 07 07 00 02 1b 2c |.;.............,|
00001140: 00 0c 43 06 01 92 04 05 01 05 09 01 00 11 06 bc |..C.............|
00001150: 04 00 01 00 c6 04 00 01 00 d8 04 00 01 00 da 04 |................|
00001160: 00 01 00 a6 04 00 01 00 c8 04 00 00 00 90 04 04 |................|
00001170: 01 b7 cb df d3 d4 d5 d6 c7 b8 bb c7 9c 9f 22 06 |..............".|
00001180: 00 29 c8 03 17 bd 01 04 0e 08 07 16 07 06 07 08 |.)..............|
00001190: 07 06 07 08 11 16 07 03 07 07 07 27 00 0c 43 06 |...........'..C.|
000011a0: 01 94 04 06 13 06 09 04 06 f9 01 19 c0 04 00 01 |................|
000011b0: 00 de 04 00 01 00 e0 04 00 01 00 aa 04 00 01 00 |................|
000011c0: ae 04 00 01 00 a6 04 00 01 00 e2 04 00 00 00 e4 |................|
000011d0: 04 00 01 00 e6 04 00 02 00 e8 04 00 03 00 c2 04 |................|
000011e0: 00 04 00 ea 04 00 05 00 f0 03 00 06 00 bc 04 00 |................|
000011f0: 07 00 d8 04 00 08 00 ec 04 00 09 00 ee 04 00 0a |................|
00001200: 00 f0 04 00 0b 00 f2 04 00 0c 00 f4 04 00 0d 00 |................|
00001210: f6 04 00 0e 00 f8 04 00 0f 00 fa 04 00 10 00 fc |................|
00001220: 04 00 11 00 fe 04 00 12 00 b2 04 16 01 b4 04 17 |................|
00001230: 01 b6 04 18 01 8a 04 01 01 5d 05 00 df 9c cb 5d |.........].....]|
00001240: 05 00 e0 9c cc df c1 00 9f cd e0 c1 01 9f ce b8 |................|
00001250: c5 04 c4 04 e0 a6 6c d6 00 00 00 c4 04 e1 9c c5 |......l.........|
00001260: 05 b8 c5 06 c4 06 df a6 6c bf 00 00 00 c4 06 c7 |........l.......|
00001270: d6 c4 05 91 c6 05 48 9c a0 c5 07 c4 04 c8 5d 04 |......H.......].|
00001280: 00 c4 05 48 9c a0 c5 08 c4 07 c1 02 a5 ec 07 c1 |...H............|
00001290: 03 c5 07 ee 0a c4 07 c9 a7 ec 04 c9 c5 07 c4 07 |................|
000012a0: b7 b1 c6 09 b8 9f c5 0a c4 08 c1 04 a5 ec 07 c1 |................|
000012b0: 05 c5 08 ee 0a c4 08 ca a7 ec 04 ca c5 08 c4 08 |................|
000012c0: b7 b1 c6 0b b8 9f c5 0c c4 07 c4 09 a0 c5 0d b8 |................|
000012d0: c4 0d a0 c5 0e c4 08 c4 0b a0 c5 0f b8 c4 0f a0 |................|
000012e0: c5 10 c4 0b e1 9c c5 11 c4 0c e1 9c c5 12 d4 c4 |................|
000012f0: 05 c4 0e c4 10 d5 c4 09 c4 11 9f 48 9c c4 0f d5 |...........H....|
00001300: c4 09 c4 12 9f 48 9c 9f 9c c4 0d c4 10 d5 c4 0a |.....H..........|
00001310: c4 11 9f 48 9c c4 0f d5 c4 0a c4 12 9f 48 9c 9f |...H.........H..|
00001320: 9c 9f 4b 95 06 ef 3e ff 95 04 ef 27 ff e2 d3 d4 |..K...>....'....|
00001330: f2 29 c8 03 ef 01 c1 01 04 03 1e 11 0a 07 03 0d |.)..............|
00001340: 05 11 0a 07 03 0d 07 11 0c 0d 0b 11 0e 1c 01 0c |................|
00001350: 0a 07 05 21 07 0c 08 07 03 21 08 0c 0a 07 05 21 |...!.....!.....!|
00001360: 0b 0c 08 07 0e 07 08 0c 03 11 01 07 05 07 0d 12 |................|
00001370: 03 0c 08 07 0e 11 04 0c 01 07 05 07 0d 12 0b 16 |................|
00001380: 04 12 03 21 0a 0c 08 07 03 12 05 12 02 11 04 08 |...!............|
00001390: 03 11 06 12 0f 16 04 12 03 21 0a 0c 08 07 03 12 |.........!......|
000013a0: 05 12 02 11 04 08 03 11 06 12 05 0c 08 0c 03 17 |................|
000013b0: 04 0c 03 12 03 0c 08 0c 03 17 04 0c 03 12 00 0c |................|
000013c0: 0a 07 03 12 05 0c 0a 07 03 12 1b 07 04 0c 0e 0c |................|
000013d0: 0c 0c 0a 07 06 0c 0a 0c 03 07 07 07 07 07 24 0c |..............$.|
000013e0: 0a 07 06 0c 0a 0c 03 07 07 07 07 07 09 07 2b 07 |..............+.|
000013f0: 5c 0c 0c 0c 0a 07 06 0c 0a 0c 03 07 07 07 07 07 |\...............|
00001400: 24 0c 0a 07 06 0c 0a 0c 03 07 07 07 07 07 09 07 |$...............|
00001410: 2b 07 09 00 02 29 3d 00 05 03 05 00 05 34 3b 07 |+....)=......4;.|
00001420: 10 07 06 07 07 00 06 00 00 00 00 00 00 e0 3f 06 |..............?.|
00001430: 00 00 00 00 00 00 e0 3f 06 00 00 00 00 00 00 e0 |.......?........|
00001440: 3f 06 00 00 00 00 00 00 e0 3f 06 00 00 00 00 00 |?........?......|
00001450: 00 e0 3f 06 00 00 00 00 00 00 e0 3f 0c 43 06 01 |..?........?.C..|
00001460: 96 04 04 0f 04 07 05 03 93 02 13 aa 04 00 01 00 |................|
00001470: ae 04 00 01 00 80 05 00 01 00 82 05 00 01 00 84 |................|
00001480: 05 00 00 00 c2 04 00 01 00 86 05 00 02 00 88 05 |................|
00001490: 00 03 00 8a 05 00 04 00 cc 04 00 05 00 8c 05 00 |................|
000014a0: 06 00 d4 04 00 07 00 f0 03 00 08 00 8e 05 00 09 |................|
000014b0: 00 90 05 00 0a 00 92 05 00 0b 00 94 05 00 0c 00 |................|
000014c0: 96 05 00 0d 00 98 05 00 0e 00 b2 04 16 01 b4 04 |................|
000014d0: 17 01 b6 04 18 01 8a 04 01 01 8c 04 02 01 c1 00 |................|
000014e0: 8e 39 a5 00 00 00 43 4d 01 00 00 df e0 9c 24 01 |.9....CM......$.|
000014f0: 00 9d cb b8 cc c8 e0 a6 ec 5b c8 e1 9c cd c8 b8 |.........[......|
00001500: a0 e1 9c ce c9 b8 a0 c5 04 c9 c5 05 c9 b8 9f c5 |................|
00001510: 06 c8 b8 9f e1 9c c5 07 b8 c5 08 c4 08 df a6 ec |................|
00001520: 30 d6 c4 05 91 c6 05 c7 d3 c4 06 91 c6 06 48 d3 |0.............H.|
00001530: c4 04 91 c6 04 48 a0 d4 c4 07 91 c6 07 48 9f d4 |.....H.......H..|
00001540: ca 91 d2 48 a0 9c 4b d5 c4 05 b7 4b 95 08 ee cc |...H..K....K....|
00001550: 95 01 ee a2 e2 b7 d6 f2 0e e2 b7 d5 f2 0e 60 04 |..............`.|
00001560: 00 b7 d5 d6 b8 bb 22 05 00 0e c1 01 df 9c c5 09 |......".........|
00001570: c1 02 e0 9c c5 0a b8 cc c8 e0 a6 ec 6b c8 e1 9c |............k...|
00001580: b8 a0 c5 0b c8 e1 9c c5 0c c8 e1 9c b8 9f c5 0d |................|
00001590: c8 b8 a0 e1 9c c5 0e c8 e1 9c c5 05 c8 b8 9f e1 |................|
000015a0: 9c c5 07 b8 c5 08 c4 08 df a6 ec 38 d3 c4 0c 91 |...........8....|
000015b0: c6 0c 4a c4 09 d5 c4 0d 91 c6 0d 48 d5 c4 0b 91 |..J........H....|
000015c0: c6 0b 48 a0 9c a0 4b d4 c4 0c 4a c4 0a d5 c4 07 |..H...K...J.....|
000015d0: 91 c6 07 48 d5 c4 0e 91 c6 0e 48 a0 9c a0 4b 95 |...H......H...K.|
000015e0: 08 ee c4 95 01 ee 92 e2 b8 d3 f2 0e e2 b9 d4 f2 |................|
000015f0: 29 c8 03 a7 02 e2 01 04 0d 18 07 0e 1b 08 1b 0c |)...............|
00001600: 07 10 07 03 07 0d 11 15 17 06 07 0a 07 05 12 07 |................|
00001610: 07 08 07 03 0d 0e 0c 04 07 0e 07 03 0d 13 0c 08 |................|
00001620: 12 05 12 01 0c 08 12 09 0c 04 07 0e 07 03 21 0b |..............!.|
00001630: 0c 0a 07 05 12 1b 07 0c 0c 03 11 20 07 0a 07 08 |........... ....|
00001640: 0c 03 11 01 07 20 07 08 0c 03 11 01 07 05 07 26 |..... .........&|
00001650: 07 08 0c 03 11 01 07 05 07 22 07 08 07 03 0c 01 |........."......|
00001660: 07 05 07 63 0d 2b 07 04 0c 01 00 02 03 30 00 04 |...c.+.......0..|
00001670: 0d 05 00 04 18 3b 0c 16 07 07 0d 0d 0c 16 07 07 |.....;..........|
00001680: 0d 0d 16 1a 07 06 11 0d 21 14 07 03 1c 04 07 03 |........!.......|
00001690: 1c 01 07 0a 07 05 12 00 07 08 07 03 0c 14 12 11 |................|
000016a0: 07 08 07 03 12 09 07 08 07 03 0c 14 12 15 0c 04 |................|
000016b0: 07 0e 07 03 12 09 07 08 07 03 12 07 0c 04 07 0e |................|
000016c0: 07 03 21 0b 0c 0a 07 05 12 1b 07 08 0c 03 11 01 |..!.............|
000016d0: 07 24 0c 14 07 08 0c 03 11 01 07 1c 07 08 0c 03 |.$..............|
000016e0: 11 01 07 05 07 1f 07 13 0d 1f 07 04 0c 01 07 20 |............... |
000016f0: 0c 14 07 08 0c 03 11 01 07 1c 07 08 0c 03 11 01 |................|
00001700: 07 05 07 1f 07 13 00 02 03 16 00 04 0d 05 00 04 |................|
00001710: 18 3b 0c 16 07 07 0d 0d 0c 16 07 07 00 06 00 00 |.;..............|
00001720: 00 00 00 00 e0 3f 06 00 00 00 00 00 00 e0 3f 06 |.....?........?.|
00001730: 00 00 00 00 00 00 e0 3f 0c 43 06 01 98 04 05 00 |.......?.C......|
00001740: 05 07 03 00 20 05 bc 04 00 01 00 c6 04 00 01 00 |.... ...........|
00001750: aa 04 00 01 00 ae 04 00 01 00 a6 04 00 01 00 88 |................|
00001760: 04 00 01 8e 04 03 01 94 04 06 01 df d3 d4 5d 04 |..............].|
00001770: 00 f3 0e e0 b7 d4 d3 5d 04 00 22 04 00 0e e1 b7 |.......]..".....|
00001780: d3 d4 d5 d6 5d 04 00 22 06 00 29 c8 03 25 84 02 |....].."..)..%..|
00001790: 04 03 08 07 14 07 06 07 08 11 0f 0d 11 0c 16 07 |................|
000017a0: 08 07 06 11 15 17 0d 0c 14 07 06 07 08 07 06 07 |................|
000017b0: 06 11 21 00 0c 43 06 01 9a 04 05 01 05 07 04 00 |..!..C..........|
000017c0: 60 06 aa 04 00 01 00 ae 04 00 01 00 9c 05 00 01 |`...............|
000017d0: 00 9e 05 00 01 00 a6 04 00 01 00 a0 05 00 00 00 |................|
000017e0: 88 04 00 01 92 04 05 01 96 04 07 01 94 04 06 01 |................|
000017f0: df d3 d5 5d 04 00 f3 0e df d4 d6 5d 04 00 f3 0e |...].......]....|
00001800: d5 cb d3 d9 c7 d7 d6 cb d4 da c7 d8 e0 d3 d5 d4 |................|
00001810: d6 5d 04 00 22 05 00 0e e1 d3 d4 d5 d6 22 04 00 |.].."........"..|
00001820: 0e d5 cb d3 d9 c7 d7 d6 cb d4 da c7 d8 e2 b8 d3 |................|
00001830: d5 d5 d6 5d 04 00 22 06 00 0e e2 b9 d4 d6 d5 d6 |...]..".........|
00001840: 5d 04 00 22 06 00 0e e1 d3 d4 d5 d6 22 04 00 29 |].."........"..)|
00001850: c8 03 71 89 02 04 03 08 07 14 07 06 07 08 11 0f |..q.............|
00001860: 0d 11 07 14 07 06 07 08 11 0f 0d 04 0d 0b 0d 01 |................|
00001870: 0d 0e 0d 0b 0d 01 0d 07 07 12 07 06 07 08 07 06 |................|
00001880: 07 08 11 1d 17 0f 07 10 07 06 07 06 07 08 07 15 |................|
00001890: 17 08 0d 0b 0d 01 0d 0e 0d 0b 0d 01 0d 07 0c 14 |................|
000018a0: 07 06 07 08 07 08 07 08 11 25 17 0b 0c 14 07 06 |.........%......|
000018b0: 07 08 07 08 07 08 11 25 17 0b 07 10 07 06 07 06 |.......%........|
000018c0: 07 08 07 15 00 0c 43 06 01 00 03 00 03 00 00 00 |......C.........|
000018d0: 01 03 de 04 00 01 00 aa 04 00 01 00 ae 04 00 01 |................|
000018e0: 00 29 c8 03 03 9e 02 15 00 0c 43 06 01 9e 04 03 |.)........C.....|
000018f0: 01 03 02 03 07 3b 04 ec 03 00 01 40 aa 04 00 01 |.....;.....@....|
00001900: 40 ae 04 00 01 40 10 00 01 00 b6 04 18 01 b2 04 |@....@..........|
00001910: 16 01 b4 04 17 01 08 cb c7 c2 00 44 02 01 00 00 |...........D....|
00001920: c7 c2 01 44 51 01 00 00 c7 c2 02 44 01 01 00 00 |...DQ......D....|
00001930: c7 c2 03 44 52 01 00 00 c7 c2 04 44 53 01 00 00 |...DR......DS...|
00001940: c7 c2 05 44 19 01 00 00 c7 c2 06 44 1a 01 00 00 |...D.......D....|
00001950: 29 c8 03 21 9f 02 04 0f 08 07 08 28 07 07 08 28 |)..!.......(...(|
00001960: 07 07 08 00 07 08 07 07 08 28 07 07 08 28 07 07 |.........(...(..|
00001970: 08 26 07 07 08 00 0c 43 06 01 00 03 00 03 04 02 |.&.....C........|
00001980: 00 0d 03 bc 04 00 01 00 d8 04 00 01 00 de 04 00 |................|
00001990: 01 00 ec 03 00 03 b6 04 00 00 df d3 b8 9f d4 b8 |................|
000019a0: 9f e0 9c 9f d5 4b 29 c8 03 15 a2 02 1a 03 1b 07 |.....K).........|
000019b0: 0c 0c 04 07 10 0c 04 07 0e 07 03 07 13 07 2e 00 |................|
000019c0: 0c 43 06 01 00 02 00 02 04 02 00 0c 02 bc 04 00 |.C..............|
000019d0: 01 00 d8 04 00 01 00 ec 03 00 03 b6 04 00 00 df |................|
000019e0: d3 b8 9f d4 b8 9f e0 9c 9f 48 28 c8 03 17 a5 02 |.........H(.....|
000019f0: 1a 03 0d 07 0c 0c 04 07 10 0c 04 07 0e 07 03 07 |................|
00001a00: 13 07 11 07 15 00 0c 43 06 01 00 04 00 04 04 03 |.......C........|
00001a10: 00 19 04 bc 04 00 01 00 d8 04 00 01 00 a8 05 00 |................|
00001a20: 01 00 aa 05 00 01 00 aa 04 01 03 b6 04 00 00 ae |................|
00001a30: 04 02 03 df d3 b8 9f d4 b8 9f e0 9c 9f d5 4b e1 |..............K.|
00001a40: d3 b8 9f d4 b8 9f e0 9c 9f d6 4b 29 c8 03 27 a8 |..........K)..'.|
00001a50: 02 1b 03 1d 07 06 0c 04 07 10 0c 04 07 0e 07 03 |................|
00001a60: 07 13 07 2e 0d 41 07 06 0c 04 07 10 0c 04 07 0e |.....A..........|
00001a70: 07 03 07 13 07 2e 00 0c 43 06 01 00 02 00 02 04 |........C.......|
00001a80: 02 00 0c 02 bc 04 00 01 00 d8 04 00 01 00 aa 04 |................|
00001a90: 01 03 b6 04 00 00 df d3 b8 9f d4 b8 9f e0 9c 9f |................|
00001aa0: 48 28 c8 03 17 ac 02 1c 03 11 07 06 0c 04 07 10 |H(..............|
00001ab0: 0c 04 07 0e 07 03 07 13 07 11 07 0f 00 0c 43 06 |..............C.|
00001ac0: 01 00 02 00 02 04 02 00 0c 02 bc 04 00 01 00 d8 |................|
00001ad0: 04 00 01 00 ae 04 02 03 b6 04 00 00 df d3 b8 9f |................|
00001ae0: d4 b8 9f e0 9c 9f 48 28 c8 03 17 af 02 1c 03 11 |......H(........|
00001af0: 07 06 0c 04 07 10 0c 04 07 0e 07 03 07 13 07 11 |................|
00001b00: 07 0f 00 0c 43 06 01 00 00 00 00 01 01 00 02 00 |....C...........|
00001b10: b2 04 01 00 df 28 c8 03 07 b2 02 15 02 2a 07 0d |.....(.......*..|
00001b20: 00 0c 43 06 01 00 00 00 00 01 01 00 02 00 b4 04 |..C.............|
00001b30: 02 00 df 28 c8 03 07 b3 02 16 02 2a 07 0d 00 0c |...(.......*....|
00001b40: 43 06 01 a0 04 03 01 03 08 03 00 22 04 de 04 00 |C.........."....|
00001b50: 01 00 aa 04 00 01 00 ae 04 00 01 00 f0 03 00 00 |................|
00001b60: 00 b8 04 19 01 9c 04 0a 01 9e 04 0b 01 b7 cb c7 |................|
00001b70: df a5 ec 11 d4 c7 d5 c7 d3 c7 b7 16 4b 16 4b 4b |............K.KK|
00001b80: 95 00 ee ec e0 e1 11 d3 d4 d5 21 03 00 f1 29 c8 |..........!...).|
00001b90: 03 27 b5 02 04 0d 28 07 08 07 03 12 1b 07 04 07 |.'....(.........|
00001ba0: 0a 07 04 07 0a 07 04 07 01 1f 10 18 35 07 1e 0c |............5...|
00001bb0: 0c 07 06 07 06 07 0d 11 13 00 0c 43 06 01 00 00 |...........C....|
00001bc0: 00 00 06 0c 00 41 00 a0 04 0c 01 a8 04 11 01 ac |.....A..........|
00001bd0: 04 13 01 b0 04 15 01 9a 04 09 01 aa 04 12 01 ae |................|
00001be0: 04 14 01 a6 04 0f 01 98 04 08 01 ec 03 10 01 ba |................|
00001bf0: 04 1a 01 9e 04 0b 01 df e0 e1 e2 f3 0e 60 04 00 |.............`..|
00001c00: 60 05 00 60 06 00 e1 e2 60 07 00 22 05 00 0e 60 |`..`....`.."...`|
00001c10: 08 00 60 09 00 e0 60 05 00 60 06 00 60 07 00 22 |..`...`..`..`.."|
00001c20: 05 00 0e 60 0a 00 60 0b 00 11 60 09 00 60 05 00 |...`..`...`..`..|
00001c30: 60 06 00 21 03 00 f1 29 c8 03 37 ba 02 12 03 13 |`..!...)..7.....|
00001c40: 07 10 07 16 07 10 07 27 0d 0d 11 12 11 06 11 06 |.......'........|
00001c50: 07 10 07 10 11 2d 17 0f 11 14 11 0c 07 16 11 06 |.....-..........|
00001c60: 11 06 11 2f 17 11 11 20 16 0c 11 0c 11 06 11 13 |.../... ........|
00001c70: 11 13 00 0c 43 06 01 00 01 00 01 01 01 00 03 01 |....C...........|
00001c80: ac 05 00 01 00 ba 04 1a 01 d3 e3 29 c8 03 05 c0 |...........)....|
00001c90: 02 1e 03 0f 00 0c 43 06 01 00 00 00 00 01 01 00 |......C.........|
00001ca0: 02 00 a2 04 0d 01 df 28 c8 03 07 c3 02 16 02 2a |.......(.......*|
00001cb0: 07 0d 00 0c 43 06 01 00 01 00 01 02 01 00 0e 01 |....C...........|
00001cc0: ae 05 00 01 00 a2 04 0d 01 d3 b7 a7 ec 09 d3 bf |................|
00001cd0: 64 a6 ec 03 d3 e3 29 c8 03 0d c4 02 19 03 19 0c |d.....).........|
00001ce0: 0c 11 0e 11 0c 12 0b 00 0c 43 06 01 00 01 00 01 |.........C......|
00001cf0: 01 01 00 03 01 b0 05 00 01 00 9c 04 0a 01 d3 e3 |................|
00001d00: 29 c8 03 05 c8 02 19 03 07 00 06 00 00 00 00 00 |)...............|
00001d10: 00 e0 3f 06 9a 99 99 99 99 99 b9 3f 0c 43 06 01 |..?........?.C..|
00001d20: fc 03 00 01 00 0e 0a 00 8a 01 01 f0 03 00 00 00 |................|
00001d30: b2 04 16 01 b6 04 18 01 b4 04 17 01 b8 04 19 01 |................|
00001d40: ec 03 10 01 a8 04 11 01 aa 04 12 01 ac 04 13 01 |................|
00001d50: ae 04 14 01 b0 04 15 01 df b9 9f e4 df b9 9f e1 |................|
00001d60: b9 9f 9c e6 39 9e 00 00 00 11 e2 21 01 00 61 04 |....9......!..a.|
00001d70: 00 39 9e 00 00 00 11 e2 21 01 00 61 05 00 39 9e |.9......!..a..9.|
00001d80: 00 00 00 11 e2 21 01 00 61 06 00 39 9e 00 00 00 |.....!..a..9....|
00001d90: 11 e2 21 01 00 61 07 00 39 9e 00 00 00 11 e2 21 |..!..a..9......!|
00001da0: 01 00 61 08 00 39 9e 00 00 00 11 e2 21 01 00 61 |..a..9......!..a|
00001db0: 09 00 b7 cb c7 e2 a5 ec 29 60 05 00 c7 60 07 00 |........)`...`..|
00001dc0: c7 60 09 00 c7 60 04 00 c7 60 06 00 c7 60 08 00 |.`...`...`...`..|
00001dd0: c7 b7 16 4b 16 4b 16 4b 16 4b 16 4b 4b 95 00 ee |...K.K.K.K.KK...|
00001de0: d4 29 c8 03 57 d9 02 04 03 1c 0c 0c 0d 0f 0c 0c |.)..W...........|
00001df0: 07 10 0c 0e 07 13 0d 0f 20 0c 07 01 21 00 20 0c |........ ...!. .|
00001e00: 07 01 21 19 20 0c 07 01 21 00 20 0c 07 01 21 13 |..!. ...!. ...!.|
00001e10: 20 0c 07 01 21 00 20 0c 07 01 2b 03 07 08 07 03 | ...!. ...+.....|
00001e20: 12 1b 11 14 07 0a 11 0e 07 0a 11 0e 07 0a 11 0a |................|
00001e30: 07 0a 11 04 07 0a 11 04 07 01 3d 43 00 0c 43 06 |..........=C..C.|
00001e40: 01 00 00 00 00 01 01 00 02 00 ec 03 10 01 df 28 |...............(|
00001e50: c8 03 07 e6 02 13 03 07 07 0d 00 0c 43 06 01 00 |............C...|
00001e60: 02 01 02 02 03 00 2c 03 b2 05 00 01 00 b4 05 00 |......,.........|
00001e70: 01 00 b6 05 00 00 00 b2 04 16 01 b4 04 17 01 fc |................|
00001e80: 03 1b 01 d4 d3 9c cf b7 a7 11 ec 17 0e c7 01 40 |...............@|
00001e90: 42 0f 00 a5 11 ec 0c 0e d4 df ac 11 ed 05 0e d3 |B...............|
00001ea0: e0 ac ec 0a d4 e3 d3 e4 e1 f0 0e 0a 28 09 28 c8 |............(.(.|
00001eb0: 03 29 e9 02 19 03 0d 07 0e 07 03 08 15 0c 08 1b |.)..............|
00001ec0: 0e 20 08 1b 1c 07 10 07 05 1b 18 07 10 07 05 12 |. ..............|
00001ed0: 55 0d 02 0d 11 07 0a 12 09 0e 07 00             |U...........|
```

### WASM
```
00000000: 05 78 64 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |.xd__tests__/fix|
00000010: 74 75 72 65 73 5f 71 75 69 63 6b 6a 73 2f 6f 63 |tures_quickjs/oc|
00000020: 74 61 6e 65 2f 6e 61 76 69 65 72 2d 73 74 6f 6b |tane/navier-stok|
00000030: 65 73 2e 6a 73 12 2e 2f 62 61 73 65 2e 6a 73 12 |es.js../base.js.|
00000040: 42 65 6e 63 68 6d 61 72 6b 1c 42 65 6e 63 68 6d |Benchmark.Benchm|
00000050: 61 72 6b 53 75 69 74 65 18 4e 61 76 69 65 72 53 |arkSuite.NavierS|
00000060: 74 6f 6b 65 73 0c 73 6f 6c 76 65 72 1c 6e 73 46 |tokes.solver.nsF|
00000070: 72 61 6d 65 43 6f 75 6e 74 65 72 1e 72 75 6e 4e |rameCounter.runN|
00000080: 61 76 69 65 72 53 74 6f 6b 65 73 16 63 68 65 63 |avierStokes.chec|
00000090: 6b 52 65 73 75 6c 74 22 73 65 74 75 70 4e 61 76 |kResult"setupNav|
000000a0: 69 65 72 53 74 6f 6b 65 73 28 74 65 61 72 44 6f |ierStokes(tearDo|
000000b0: 77 6e 4e 61 76 69 65 72 53 74 6f 6b 65 73 12 61 |wnNavierStokes.a|
000000c0: 64 64 50 6f 69 6e 74 73 2c 66 72 61 6d 65 73 54 |ddPoints,framesT|
000000d0: 69 6c 6c 41 64 64 69 6e 67 50 6f 69 6e 74 73 32 |illAddingPoints2|
000000e0: 66 72 61 6d 65 73 42 65 74 77 65 65 6e 41 64 64 |framesBetweenAdd|
000000f0: 69 6e 67 50 6f 69 6e 74 73 18 70 72 65 70 61 72 |ingPoints.prepar|
00000100: 65 46 72 61 6d 65 14 46 6c 75 69 64 46 69 65 6c |eFrame.FluidFiel|
00000110: 64 0c 75 70 64 61 74 65 0e 67 65 74 44 65 6e 73 |d.update.getDens|
00000120: 08 64 65 6e 73 0c 72 65 73 75 6c 74 02 69 1e 63 |.dens.result.i.c|
00000130: 68 65 63 6b 73 75 6d 20 66 61 69 6c 65 64 1a 73 |hecksum failed.s|
00000140: 65 74 52 65 73 6f 6c 75 74 69 6f 6e 1a 73 65 74 |etResolution.set|
00000150: 49 74 65 72 61 74 69 6f 6e 73 24 73 65 74 44 69 |Iterations$setDi|
00000160: 73 70 6c 61 79 46 75 6e 63 74 69 6f 6e 1a 73 65 |splayFunction.se|
00000170: 74 55 49 43 61 6c 6c 62 61 63 6b 0a 72 65 73 65 |tUICallback.rese|
00000180: 74 0a 66 69 65 6c 64 02 6e 16 73 65 74 56 65 6c |t.field.n.setVel|
00000190: 6f 63 69 74 79 14 73 65 74 44 65 6e 73 69 74 79 |ocity.setDensity|
000001a0: 0c 63 61 6e 76 61 73 12 61 64 64 46 69 65 6c 64 |.canvas.addField|
000001b0: 73 0e 73 65 74 5f 62 6e 64 12 6c 69 6e 5f 73 6f |s.set_bnd.lin_so|
000001c0: 6c 76 65 0e 64 69 66 66 75 73 65 14 6c 69 6e 5f |lve.diffuse.lin_|
000001d0: 73 6f 6c 76 65 32 10 64 69 66 66 75 73 65 32 0c |solve2.diffuse2.|
000001e0: 61 64 76 65 63 74 0e 70 72 6f 6a 65 63 74 12 64 |advect.project.d|
000001f0: 65 6e 73 5f 73 74 65 70 10 76 65 6c 5f 73 74 65 |ens_step.vel_ste|
00000200: 70 14 75 69 43 61 6c 6c 62 61 63 6b 0a 46 69 65 |p.uiCallback.Fie|
00000210: 6c 64 0e 71 75 65 72 79 55 49 14 69 74 65 72 61 |ld.queryUI.itera|
00000220: 74 69 6f 6e 73 08 76 69 73 63 04 64 74 12 64 65 |tions.visc.dt.de|
00000230: 6e 73 5f 70 72 65 76 02 75 0c 75 5f 70 72 65 76 |ns_prev.u.u_prev|
00000240: 02 76 0c 76 5f 70 72 65 76 0a 77 69 64 74 68 0c |.v.v_prev.width.|
00000250: 68 65 69 67 68 74 0e 72 6f 77 53 69 7a 65 08 73 |height.rowSize.s|
00000260: 69 7a 65 16 64 69 73 70 6c 61 79 46 75 6e 63 02 |ize.displayFunc.|
00000270: 78 02 73 02 62 02 6a 0e 6d 61 78 45 64 67 65 04 |x.s.b.j.maxEdge.|
00000280: 78 30 02 61 02 63 14 63 75 72 72 65 6e 74 52 6f |x0.a.c.currentRo|
00000290: 77 08 69 6e 76 43 02 6b 0e 6c 61 73 74 52 6f 77 |w.invC.k.lastRow|
000002a0: 0e 6e 65 78 74 52 6f 77 0a 6c 61 73 74 58 02 79 |.nextRow.lastX.y|
000002b0: 04 79 30 0a 6c 61 73 74 59 02 64 04 64 30 08 57 |.y0.lastY.d.d0.W|
000002c0: 64 74 30 08 48 64 74 30 06 57 70 35 06 48 70 35 |dt0.Hdt0.Wp5.Hp5|
000002d0: 06 70 6f 73 04 69 30 04 69 31 04 6a 30 04 6a 31 |.pos.i0.i1.j0.j1|
000002e0: 04 73 31 04 73 30 04 74 31 04 74 30 08 72 6f 77 |.s1.s0.t1.t0.row|
000002f0: 31 08 72 6f 77 32 02 70 06 64 69 76 02 68 06 72 |1.row2.p.div.h.r|
00000300: 6f 77 16 70 72 65 76 69 6f 75 73 52 6f 77 12 70 |ow.previousRow.p|
00000310: 72 65 76 56 61 6c 75 65 12 6e 65 78 74 56 61 6c |revValue.nextVal|
00000320: 75 65 0c 77 53 63 61 6c 65 0c 68 53 63 61 6c 65 |ue.wScale.hScale|
00000330: 0e 70 72 65 76 50 6f 73 14 63 75 72 72 65 6e 74 |.prevPos.current|
00000340: 50 6f 73 0e 6e 65 78 74 50 6f 73 0e 70 72 65 76 |Pos.nextPos.prev|
00000350: 52 6f 77 08 73 71 72 74 04 75 30 04 76 30 08 74 |Row.sqrt.u0.v0.t|
00000360: 65 6d 70 14 67 65 74 44 65 6e 73 69 74 79 18 67 |emp.getDensity.g|
00000370: 65 74 58 56 65 6c 6f 63 69 74 79 18 67 65 74 59 |etXVelocity.getY|
00000380: 56 65 6c 6f 63 69 74 79 04 78 76 04 79 76 08 66 |Velocity.xv.yv.f|
00000390: 75 6e 63 0a 69 74 65 72 73 10 63 61 6c 6c 62 61 |unc.iters.callba|
000003a0: 63 6b 08 68 52 65 73 08 77 52 65 73 06 72 65 73 |ck.hRes.wRes.res|
000003b0: 0d c8 03 01 ca 03 02 00 00 02 00 00 cc 03 00 01 |................|
000003c0: 00 ce 03 00 00 0c 20 06 01 a4 01 00 00 00 0f 0e |...... .........|
000003d0: 07 6c 00 cc 03 00 0c ce 03 01 0c d0 03 00 01 d2 |.l..............|
000003e0: 03 01 01 d4 03 02 01 d6 03 03 01 d8 03 04 01 da |................|
000003f0: 03 05 01 dc 03 06 01 de 03 07 01 e0 03 08 01 e2 |................|
00000400: 03 09 01 e4 03 0a 01 e6 03 0b 01 08 ec 25 c2 00 |.............%..|
00000410: 61 05 00 c2 01 61 06 00 c2 02 61 07 00 c2 03 61 |a....a....a....a|
00000420: 08 00 c2 04 61 09 00 c2 05 61 0c 00 c2 06 61 0d |....a....a....a.|
00000430: 00 29 68 01 00 11 04 e8 00 00 00 01 e0 a4 16 00 |.)h.............|
00000440: 26 01 00 68 00 00 11 04 e8 00 00 00 0a 09 c0 b4 |&..h............|
00000450: 00 60 05 00 60 07 00 60 08 00 07 bf 10 21 09 00 |.`..`..`.....!..|
00000460: 26 01 00 21 03 00 e5 07 e6 b7 61 04 00 b7 61 0a |&..!......a...a.|
00000470: 00 bc 61 0b 00 06 2f c8 03 13 00 00 00 27 38 2e |..a.../......'8.|
00000480: 57 5e 48 58 11 22 11 26 20 8d 01 20 53 00 0c 43 |W^HX.".& .. S..C|
00000490: 06 01 d6 03 00 00 00 03 03 00 1f 00 d2 03 03 00 |................|
000004a0: d4 03 04 00 d8 03 06 00 df 43 f4 00 00 00 24 00 |.........C....$.|
000004b0: 00 0e e0 91 e8 bf 0f ab ec 0d e1 df 43 f5 00 00 |............C...|
000004c0: 00 24 00 00 f1 0e 29 c8 03 18 1f 00 03 08 07 0c |.$....).........|
000004d0: 1b 0e 17 19 08 08 16 1e 12 1d 07 18 07 0c 1b 10 |................|
000004e0: 11 1d 00 0c 43 06 01 d8 03 01 02 01 03 00 00 32 |....C..........2|
000004f0: 03 ec 03 00 01 00 ee 03 00 00 00 f0 03 00 01 00 |................|
00000500: b7 cb c0 58 1b cc c8 c0 bc 1b a5 ec 10 c7 d3 c8 |...X............|
00000510: 48 bf 0a 9c 97 97 9f cb 95 01 ee eb c7 bf 4d ac |H.............M.|
00000520: ec 10 39 9f 00 00 00 11 04 f9 00 00 00 21 01 00 |..9..........!..|
00000530: 30 29 c8 03 22 25 00 22 2e 16 04 12 21 07 1c 07 |0).."%."....!...|
00000540: 0a 07 01 11 08 07 15 07 01 07 05 0b 26 19 33 11 |............&.3.|
00000550: 0e 12 08 39 0a 11 1f 00 0c 43 06 01 da 03 00 00 |...9.....C......|
00000560: 00 04 03 01 43 00 d2 03 03 00 e6 03 0d 00 e4 03 |....C...........|
00000570: 0c 00 e0 11 07 21 01 00 e7 43 fa 00 00 00 c0 80 |.....!...C......|
00000580: 00 c0 80 00 24 02 00 0e df 43 fb 00 00 00 bf 14 |....$....C......|
00000590: 24 01 00 0e df 43 fc 00 00 00 c2 00 24 01 00 0e |$....C......$...|
000005a0: df 43 fd 00 00 00 e1 24 01 00 0e df 43 fe 00 00 |.C.....$....C...|
000005b0: 00 24 00 00 29 c8 03 24 2e 00 03 22 11 14 17 21 |.$..)..$..."...!|
000005c0: 39 1c 17 27 07 0c 25 1c 17 27 07 0c 25 26 17 31 |9..'..%..'..%&.1|
000005d0: 07 0c 1b 1e 07 01 17 27 07 0c 1b 0c 00 0c 43 06 |.......'......C.|
000005e0: 01 00 00 00 00 00 00 00 01 00 29 c8 03 02 32 1e |..........)...2.|
000005f0: 00 0c 43 06 01 dc 03 00 00 00 01 01 00 03 00 d2 |..C.............|
00000600: 03 03 00 07 e3 29 c8 03 04 36 00 03 08 00 0c 43 |.....)...6.....C|
00000610: 06 01 de 03 01 02 01 06 00 00 76 03 fe 03 00 01 |..........v.....|
00000620: 00 80 04 00 00 00 f0 03 00 01 00 bf 40 cb b8 cc |............@...|
00000630: c8 c7 a6 ec 6c d3 43 01 01 00 00 c8 c8 c7 c7 24 |....l.C........$|
00000640: 04 00 0e d3 43 02 01 00 00 c8 c8 bc 24 03 00 0e |....C.......$...|
00000650: d3 43 01 01 00 00 c8 c7 c8 a0 c7 8e c7 8e 24 04 |.C............$.|
00000660: 00 0e d3 43 02 01 00 00 c8 c7 c8 a0 bf 14 24 03 |...C..........$.|
00000670: 00 0e d3 43 01 01 00 00 c0 80 00 c8 a0 c7 c8 9f |...C............|
00000680: c7 8e c7 8e 24 04 00 0e d3 43 02 01 00 00 c0 80 |....$....C......|
00000690: 00 c8 a0 c7 c8 9f bf 1e 24 03 00 0e 95 01 ee 91 |........$.......|
000006a0: 29 c8 03 70 39 00 1d 28 07 0a 07 05 12 1b 07 0a |)..p9..(........|
000006b0: 1b 1a 07 06 07 06 07 06 07 13 17 21 07 0a 1b 18 |...........!....|
000006c0: 07 06 0c 07 17 1f 07 0a 1b 1a 07 06 07 08 07 03 |................|
000006d0: 07 0c 07 01 07 0a 07 01 07 1d 17 21 07 0a 1b 18 |...........!....|
000006e0: 07 06 07 08 07 03 11 0b 17 1f 07 0a 2a 26 07 03 |............*&..|
000006f0: 07 0a 07 08 07 03 07 0c 07 01 07 0a 07 01 07 29 |...............)|
00000700: 17 21 07 0a 2a 24 07 03 07 0a 07 08 07 03 11 17 |.!..*$..........|
00000710: 00 04 0b 0a 00 0c 43 06 01 e4 03 01 00 01 02 03 |......C.........|
00000720: 00 13 01 fe 03 00 01 00 e0 03 0a 00 de 03 09 00 |................|
00000730: e2 03 0b 00 df b7 ab ec 0b e0 d3 f1 0e e1 e3 e1 |................|
00000740: 91 e5 29 df 90 e3 29 c8 03 16 46 00 03 10 0c 2e |..)...)...F.....|
00000750: 12 2d 07 14 07 01 0d 20 0d 31 07 32 14 31 07 2c |.-..... .1.2.1.,|
00000760: 00 0c 43 06 01 e6 03 01 1d 01 04 00 17 9f 01 1e |..C.............|
00000770: 86 04 00 01 00 88 04 00 00 40 8a 04 00 01 40 8c |.........@....@.|
00000780: 04 00 02 40 8e 04 00 03 40 90 04 00 04 40 92 04 |...@....@....@..|
00000790: 00 05 40 94 04 00 06 40 96 04 00 07 40 98 04 00 |..@....@....@...|
000007a0: 08 40 9a 04 00 09 40 9c 04 00 0a 40 9e 04 00 0b |.@....@....@....|
000007b0: 40 a0 04 00 0c 40 a2 04 00 0d 40 a4 04 00 0e 00 |@....@....@.....|
000007c0: a6 04 00 0f 40 ec 03 00 10 40 a8 04 00 11 40 aa |....@....@....@.|
000007d0: 04 00 12 40 ac 04 00 13 40 ae 04 00 14 40 b0 04 |...@....@....@..|
000007e0: 00 15 40 b2 04 00 16 40 b4 04 00 17 40 b6 04 00 |..@....@....@...|
000007f0: 18 40 b8 04 00 19 40 ba 04 00 1a 40 fc 03 00 1b |.@....@....@....|
00000800: 40 10 00 01 00 08 c5 1c c2 00 cb c2 01 cc c2 02 |@...............|
00000810: cd c2 03 ce c2 04 c5 04 c2 05 c5 05 c2 06 c5 06 |................|
00000820: c2 07 c5 07 c2 08 c5 08 c2 09 c5 09 c2 0b c5 0b |................|
00000830: c2 0c c5 0c c2 14 c5 1b c2 0a 4f 0e 01 00 00 c5 |..........O.....|
00000840: 0a c4 1c c2 0d 44 f4 00 00 00 c4 1c c2 0e 44 fc |.....D........D.|
00000850: 00 00 00 c4 1c c2 0f 44 11 01 00 00 c4 1c c2 10 |.......D........|
00000860: 44 fb 00 00 00 c4 1c c2 11 44 fd 00 00 00 bf 0a |D........D......|
00000870: c5 0d c1 12 c5 0e c1 13 c5 0f c4 1c c4 1b 44 fe |..............D.|
00000880: 00 00 00 c4 1c c2 15 44 f5 00 00 00 c4 1c c2 16 |.......D........|
00000890: 44 fa 00 00 00 c4 1c 43 fa 00 00 00 bf 40 bf 40 |D......C.....@.@|
000008a0: 24 02 00 29 c8 03 33 51 00 00 3c d2 03 08 0c 08 |$..)..3Q..<.....|
000008b0: 00 07 0c 07 0c 08 28 07 0c 08 26 07 0c 08 00 07 |......(...&.....|
000008c0: 08 07 0c 08 00 13 3a 07 0c 1a 26 19 0c 08 28 07 |......:...&...(.|
000008d0: 0c 08 00 07 14 07 0c 08 2f 1c 00 0c 43 06 01 88 |......../...C...|
000008e0: 04 03 01 03 06 01 00 16 04 bc 04 00 01 00 be 04 |................|
000008f0: 00 01 00 a6 04 00 01 00 f0 03 00 00 00 b8 04 19 |................|
00000900: 01 b7 cb c7 df a5 ec 0f d3 c7 4a d5 d4 c7 48 9c |..........J...H.|
00000910: 9f 4b 95 00 ee ee 29 c8 03 1c 52 04 0d 28 07 08 |.K....)...R..(..|
00000920: 07 03 12 1b 07 04 07 01 07 0e 07 0a 07 04 07 01 |................|
00000930: 07 05 07 0b 0b 24 00 0c 43 06 01 8a 04 02 03 02 |.....$..C.......|
00000940: 08 03 04 c0 02 05 c0 04 00 01 00 bc 04 00 01 00 |................|
00000950: f0 03 00 00 00 c2 04 00 01 00 c4 04 00 02 00 b2 |................|
00000960: 04 16 01 b6 04 18 01 b4 04 17 01 d3 b8 ad ec 50 |...............P|
00000970: b8 cb c7 df a6 ec 1d d4 c7 d4 c7 e0 9f 48 4b d4 |.............HK.|
00000980: c7 e1 b8 9f e0 9c 9f d4 c7 e1 e0 9c 9f 48 4b 95 |.............HK.|
00000990: 00 ee e0 b8 cc c8 e1 a6 6c c1 00 00 00 d4 c8 e0 |........l.......|
000009a0: 9c d4 b8 c8 e0 9c 9f 48 8e 4b d4 df b8 9f c8 e0 |.......H.K......|
000009b0: 9c 9f d4 df c8 e0 9c 9f 48 8e 4b 95 01 ee d7 d3 |........H.K.....|
000009c0: b9 ad ec 4d b8 cb c7 df a6 ec 1f d4 c7 d4 c7 e0 |...M............|
000009d0: 9f 48 8e 4b d4 c7 e1 b8 9f e0 9c 9f d4 c7 e1 e0 |.H.K............|
000009e0: 9c 9f 48 8e 4b 95 00 ee de b8 cc c8 e1 a6 ec 6b |..H.K..........k|
000009f0: d4 c8 e0 9c d4 b8 c8 e0 9c 9f 48 4b d4 df b8 9f |..........HK....|
00000a00: c8 e0 9c 9f d4 df c8 e0 9c 9f 48 4b 95 01 ee dc |..........HK....|
00000a10: b8 cb c7 df a6 ec 1d d4 c7 d4 c7 e0 9f 48 4b d4 |.............HK.|
00000a20: c7 e1 b8 9f e0 9c 9f d4 c7 e1 e0 9c 9f 48 4b 95 |.............HK.|
00000a30: 00 ee e0 b8 cc c8 e1 a6 ec 21 d4 c8 e0 9c d4 b8 |.........!......|
00000a40: c8 e0 9c 9f 48 4b d4 df b8 9f c8 e0 9c 9f d4 df |....HK..........|
00000a50: c8 e0 9c 9f 48 4b 95 01 ee dc e1 b8 9f e0 9c cd |....HK..........|
00000a60: d4 b7 c1 00 d4 b8 48 d4 e0 48 9f 9c 4b d4 c9 c1 |......H..H..K...|
00000a70: 01 d4 b8 c9 9f 48 d4 e1 e0 9c 48 9f 9c 4b d4 df |.....H....H..K..|
00000a80: b8 9f c1 02 d4 df 48 d4 df b8 9f e0 9f 48 9f 9c |......H......H..|
00000a90: 4b d4 df b8 9f c9 9f c1 03 d4 df c9 9f 48 d4 df |K............H..|
00000aa0: b8 9f e1 e0 9c 9f 48 9f 9c 4b 29 c8 03 e6 03 56 |......H..K)....V|
00000ab0: 04 03 10 0c 04 1c 1c 07 0a 07 05 12 1b 07 04 07 |................|
00000ac0: 0a 07 04 07 08 07 03 07 05 0d 0f 07 04 07 0a 0c |................|
00000ad0: 0e 07 0e 07 03 07 1d 07 38 07 04 07 08 07 12 07 |........8.......|
00000ae0: 03 07 11 07 05 00 02 03 0f 00 06 08 19 07 0a 07 |................|
00000af0: 05 21 1b 07 04 07 08 07 03 07 1c 0c 0c 07 08 07 |.!..............|
00000b00: 03 07 07 07 05 07 03 0d 21 07 06 0c 0c 07 0e 07 |........!.......|
00000b10: 08 07 03 07 07 07 24 07 04 07 10 07 08 07 03 07 |......$.........|
00000b20: 07 07 0d 07 03 00 02 03 09 00 04 0a 31 0c 04 1c |............1...|
00000b30: 12 07 0a 07 05 12 1b 07 04 07 0c 07 04 07 08 07 |................|
00000b40: 03 07 05 07 03 0d 0d 07 04 07 0a 0c 0e 07 0e 07 |................|
00000b50: 03 07 1d 07 3a 07 04 07 08 07 12 07 03 07 11 07 |....:...........|
00000b60: 05 07 03 00 02 03 0d 00 06 08 19 07 0a 07 05 12 |................|
00000b70: 1b 07 04 07 08 07 03 07 1a 0c 0c 07 08 07 03 07 |................|
00000b80: 07 07 05 0d 23 07 06 0c 0c 07 0e 07 08 07 03 07 |....#...........|
00000b90: 07 07 22 07 04 07 10 07 08 07 03 07 07 07 0d 00 |..".............|
00000ba0: 02 03 0b 00 06 0c 1b 07 0a 07 05 12 1b 07 04 07 |................|
00000bb0: 0a 07 04 07 08 07 03 07 05 0d 0f 07 04 07 0a 0c |................|
00000bc0: 0e 07 0e 07 03 07 1d 07 38 07 04 07 08 07 12 07 |........8.......|
00000bd0: 03 07 11 07 05 00 02 03 0f 00 06 08 19 07 0a 07 |................|
00000be0: 05 12 1b 07 04 07 08 07 03 07 1a 0c 0c 07 08 07 |................|
00000bf0: 03 07 07 07 05 0d 23 07 06 0c 0c 07 0e 07 08 07 |......#.........|
00000c00: 03 07 07 07 22 07 04 07 10 07 08 07 03 07 07 07 |...."...........|
00000c10: 0d 00 02 03 0b 00 04 0a 25 0c 0e 07 0e 07 03 0d |........%.......|
00000c20: 35 0c 02 0c 1a 0c 02 07 0c 07 04 07 01 07 05 07 |5...............|
00000c30: 0f 0d 15 07 04 07 01 0c 26 0c 0c 07 03 07 05 07 |........&.......|
00000c40: 20 07 04 07 12 07 03 07 0f 07 05 07 23 0d 21 07 | ...........#.!.|
00000c50: 06 0c 0c 07 0f 0c 2e 07 04 07 01 07 14 07 06 0c |................|
00000c60: 0c 07 0e 07 03 07 19 07 05 07 17 0d 29 07 06 0c |............)...|
00000c70: 0c 07 0e 07 03 07 19 0c 42 07 04 07 10 07 03 07 |........B.......|
00000c80: 0d 07 28 07 06 0c 0c 07 0e 07 12 07 03 07 11 07 |..(.............|
00000c90: 19 07 05 07 2b 00 06 00 00 00 00 00 00 e0 3f 06 |....+.........?.|
00000ca0: 00 00 00 00 00 00 e0 3f 06 00 00 00 00 00 00 e0 |.......?........|
00000cb0: 3f 06 00 00 00 00 00 00 e0 3f 0c 43 06 01 8c 04 |?........?.C....|
00000cc0: 05 08 05 07 05 00 a6 01 0d c0 04 00 01 00 bc 04 |................|
00000cd0: 00 01 00 c6 04 00 01 00 c8 04 00 01 00 ca 04 00 |................|
00000ce0: 01 00 c2 04 00 00 00 cc 04 00 01 00 f0 03 00 02 |................|
00000cf0: 00 ce 04 00 03 00 d0 04 00 04 00 d2 04 00 05 00 |................|
00000d00: d4 04 00 06 00 d6 04 00 07 00 b4 04 17 01 b6 04 |................|
00000d10: 18 01 b2 04 16 01 8a 04 01 01 a2 04 0d 01 d6 b7 |................|
00000d20: ad ec 32 5d 04 00 b8 ad ec 2b b8 cb c7 df a6 ec |..2].....+......|
00000d30: 1e c7 e0 9c d0 91 cc b7 cd c9 e1 a5 ec 0d d4 c8 |................|
00000d40: d5 c8 48 4b 95 01 95 02 ee f0 95 00 ee df e2 d3 |..HK............|
00000d50: d4 f2 0e 29 b8 5d 04 00 9d ce b7 c5 04 c4 04 60 |...).].........`|
00000d60: 04 00 a5 ec 5f b8 cb c7 df a6 ec 4f c7 b8 a0 e0 |...._......O....|
00000d70: 9c c5 05 c7 e0 9c cc c7 b8 9f e0 9c c5 06 d4 c8 |................|
00000d80: 48 c5 07 95 01 b8 cd c9 e1 a6 ec 2b d4 c8 d5 c8 |H..........+....|
00000d90: 48 d6 c4 07 d4 c8 91 d0 48 9f d4 c4 05 91 c6 05 |H.......H.......|
00000da0: 48 9f d4 c4 06 91 c6 06 48 9f 9c 9f ca 9c 16 4b |H.......H......K|
00000db0: c5 07 95 02 ee d2 95 00 ee ae e2 d3 d4 f2 0e 95 |................|
00000dc0: 04 ee 9b 29 c8 03 bc 01 7b 04 03 10 0c 04 11 12 |...)....{.......|
00000dd0: 16 04 1c 06 07 0a 07 05 12 06 07 08 07 03 08 21 |...............!|
00000de0: 07 03 17 20 07 08 07 03 12 1b 07 04 07 1c 07 06 |... ............|
00000df0: 07 01 0d 23 00 02 03 30 00 04 05 03 00 04 10 3b |...#...0.......;|
00000e00: 07 10 07 06 07 07 19 10 11 03 1c 06 0c 08 11 03 |................|
00000e10: 1c 04 07 0a 07 05 12 02 0c 04 07 0e 07 03 12 09 |................|
00000e20: 07 08 07 03 0d 07 0c 04 07 0e 07 03 12 13 07 04 |................|
00000e30: 07 01 12 19 17 20 07 0a 07 05 12 0b 07 04 07 1e |..... ..........|
00000e40: 07 06 07 01 07 1e 07 0a 0c 10 07 08 07 03 0c 01 |................|
00000e50: 07 05 07 28 07 08 0c 03 11 01 07 05 07 22 07 08 |...(........."..|
00000e60: 0c 03 11 01 07 05 07 53 07 07 07 82 01 07 03 1a |.......S........|
00000e70: 9b 01 00 04 0b 05 00 04 12 3b 07 10 07 06 07 07 |.........;......|
00000e80: 00 02 13 2c 00 0c 43 06 01 8e 04 04 01 04 08 01 |...,..C.........|
00000e90: 00 10 05 c0 04 00 01 00 bc 04 00 01 00 c6 04 00 |................|
00000ea0: 01 00 a6 04 00 01 00 c8 04 00 00 00 8c 04 02 01 |................|
00000eb0: b7 cb df d3 d4 d5 c7 b8 bb c7 9c 9f 22 05 00 29 |............"..)|
00000ec0: c8 03 15 97 01 04 0e 08 07 14 07 06 07 06 07 08 |................|
00000ed0: 11 16 07 03 07 07 07 1f 00 0c 43 06 01 90 04 06 |..........C.....|
00000ee0: 09 06 07 05 00 e3 01 0f bc 04 00 01 00 c6 04 00 |................|
00000ef0: 01 00 d8 04 00 01 00 da 04 00 01 00 c8 04 00 01 |................|
00000f00: 00 ca 04 00 01 00 c2 04 00 00 00 cc 04 00 01 00 |................|
00000f10: f0 03 00 02 00 ce 04 00 03 00 d0 04 00 04 00 d2 |................|
00000f20: 04 00 05 00 d4 04 00 06 00 d6 04 00 07 00 dc 04 |................|
00000f30: 00 08 00 b4 04 17 01 b6 04 18 01 b2 04 16 01 8a |................|
00000f40: 04 01 01 a2 04 0d 01 5d 04 00 b7 ad ec 3d 5d 05 |.......].....=].|
00000f50: 00 b8 ad ec 36 b8 cb c7 df a6 ec 24 c7 e0 9c d0 |....6......$....|
00000f60: 91 cc b7 cd c9 e1 a5 ec 13 d3 c8 d4 c8 48 4b d5 |.............HK.|
00000f70: c8 d6 c8 48 4b 95 01 95 02 ee ea 95 00 ee d9 e2 |...HK...........|
00000f80: b8 d3 f2 0e e2 b9 d5 f2 0e 29 b8 5d 05 00 9d ce |.........).]....|
00000f90: b7 c5 04 c4 04 60 04 00 a5 6c 8f 00 00 00 b8 cb |.....`...l......|
00000fa0: c7 df a6 ec 76 c7 b8 a0 e0 9c c5 05 c7 e0 9c cc |....v...........|
00000fb0: c7 b8 9f e0 9c c5 06 d3 c8 48 c5 07 d5 c8 48 c5 |.........H....H.|
00000fc0: 08 95 01 b8 cd c9 e1 a6 ec 4d d3 c8 d4 c8 48 5d |.........M....H]|
00000fd0: 04 00 c4 07 d3 c8 48 9f d3 c4 05 48 9f d3 c4 06 |......H....H....|
00000fe0: 48 9f 9c 9f ca 9c 16 4b c5 07 d5 c8 d6 c8 48 5d |H......K......H]|
00000ff0: 04 00 c4 08 d5 c8 91 d0 48 9f d5 c4 05 91 c6 05 |........H.......|
00001000: 48 9f d5 c4 06 91 c6 06 48 9f 9c 9f ca 9c 16 4b |H.......H......K|
00001010: c5 08 95 02 ee b0 95 00 ee 87 e2 b8 d3 f2 0e e2 |................|
00001020: b9 d5 f2 0e 95 04 ef 6c ff 29 c8 03 86 02 9b 01 |.......l.)......|
00001030: 04 03 10 16 04 11 12 16 04 1c 06 07 0a 07 05 12 |................|
00001040: 06 07 08 07 03 08 21 07 03 17 20 07 08 07 03 12 |......!... .....|
00001050: 1b 07 04 07 1c 07 06 07 01 0d 23 07 04 07 1c 07 |..........#.....|
00001060: 06 07 01 0d 23 00 02 05 30 00 04 05 03 00 04 12 |....#...0.......|
00001070: 3b 0c 16 07 07 0d 0d 0c 16 07 07 19 10 11 03 1c |;...............|
00001080: 06 0c 08 11 03 2b 04 07 0a 07 05 12 02 0c 04 07 |.....+..........|
00001090: 0e 07 03 12 09 07 08 07 03 0d 07 0c 04 07 0e 07 |................|
000010a0: 03 12 13 07 04 07 01 12 01 07 04 07 01 12 19 17 |................|
000010b0: 20 07 0a 07 05 12 0b 07 04 07 1e 07 06 07 01 07 | ...............|
000010c0: 1e 11 0a 0c 10 07 04 07 01 07 05 07 24 07 04 0c |............$...|
000010d0: 01 07 05 07 1e 07 04 0c 01 07 05 07 4b 07 07 07 |............K...|
000010e0: 76 07 03 1c b1 01 07 04 07 1e 07 06 07 01 07 1e |v...............|
000010f0: 11 0a 0c 10 07 08 07 03 0c 01 07 05 07 28 07 08 |.............(..|
00001100: 0c 03 11 01 07 05 07 22 07 08 0c 03 11 01 07 05 |......."........|
00001110: 07 53 07 07 07 82 01 07 03 00 05 03 9b 01 00 04 |.S..............|
00001120: 0d 05 00 04 18 3b 0c 16 07 07 0d 0d 0c 16 07 07 |.....;..........|
00001130: 00 02 1b 2c 00 0c 43 06 01 92 04 05 01 05 09 01 |...,..C.........|
00001140: 00 11 06 bc 04 00 01 00 c6 04 00 01 00 d8 04 00 |................|
00001150: 01 00 da 04 00 01 00 a6 04 00 01 00 c8 04 00 00 |................|
00001160: 00 90 04 04 01 b7 cb df d3 d4 d5 d6 c7 b8 bb c7 |................|
00001170: 9c 9f 22 06 00 29 c8 03 17 bd 01 04 0e 08 07 16 |.."..)..........|
00001180: 07 06 07 08 07 06 07 08 11 16 07 03 07 07 07 27 |...............'|
00001190: 00 0c 43 06 01 94 04 06 13 06 09 04 06 f9 01 19 |..C.............|
000011a0: c0 04 00 01 00 de 04 00 01 00 e0 04 00 01 00 aa |................|
000011b0: 04 00 01 00 ae 04 00 01 00 a6 04 00 01 00 e2 04 |................|
000011c0: 00 00 00 e4 04 00 01 00 e6 04 00 02 00 e8 04 00 |................|
000011d0: 03 00 c2 04 00 04 00 ea 04 00 05 00 f0 03 00 06 |................|
000011e0: 00 bc 04 00 07 00 d8 04 00 08 00 ec 04 00 09 00 |................|
000011f0: ee 04 00 0a 00 f0 04 00 0b 00 f2 04 00 0c 00 f4 |................|
00001200: 04 00 0d 00 f6 04 00 0e 00 f8 04 00 0f 00 fa 04 |................|
00001210: 00 10 00 fc 04 00 11 00 fe 04 00 12 00 b2 04 16 |................|
00001220: 01 b4 04 17 01 b6 04 18 01 8a 04 01 01 5d 05 00 |.............]..|
00001230: df 9c cb 5d 05 00 e0 9c cc df c1 00 9f cd e0 c1 |...]............|
00001240: 01 9f ce b8 c5 04 c4 04 e0 a6 6c d6 00 00 00 c4 |..........l.....|
00001250: 04 e1 9c c5 05 b8 c5 06 c4 06 df a6 6c bf 00 00 |............l...|
00001260: 00 c4 06 c7 d6 c4 05 91 c6 05 48 9c a0 c5 07 c4 |..........H.....|
00001270: 04 c8 5d 04 00 c4 05 48 9c a0 c5 08 c4 07 c1 02 |..]....H........|
00001280: a5 ec 07 c1 03 c5 07 ee 0a c4 07 c9 a7 ec 04 c9 |................|
00001290: c5 07 c4 07 b7 b1 c6 09 b8 9f c5 0a c4 08 c1 04 |................|
000012a0: a5 ec 07 c1 05 c5 08 ee 0a c4 08 ca a7 ec 04 ca |................|
000012b0: c5 08 c4 08 b7 b1 c6 0b b8 9f c5 0c c4 07 c4 09 |................|
000012c0: a0 c5 0d b8 c4 0d a0 c5 0e c4 08 c4 0b a0 c5 0f |................|
000012d0: b8 c4 0f a0 c5 10 c4 0b e1 9c c5 11 c4 0c e1 9c |................|
000012e0: c5 12 d4 c4 05 c4 0e c4 10 d5 c4 09 c4 11 9f 48 |...............H|
000012f0: 9c c4 0f d5 c4 09 c4 12 9f 48 9c 9f 9c c4 0d c4 |.........H......|
00001300: 10 d5 c4 0a c4 11 9f 48 9c c4 0f d5 c4 0a c4 12 |.......H........|
00001310: 9f 48 9c 9f 9c 9f 4b 95 06 ef 3e ff 95 04 ef 27 |.H....K...>....'|
00001320: ff e2 d3 d4 f2 29 c8 03 ef 01 c1 01 04 03 1e 11 |.....)..........|
00001330: 0a 07 03 0d 05 11 0a 07 03 0d 07 11 0c 0d 0b 11 |................|
00001340: 0e 1c 01 0c 0a 07 05 21 07 0c 08 07 03 21 08 0c |.......!.....!..|
00001350: 0a 07 05 21 0b 0c 08 07 0e 07 08 0c 03 11 01 07 |...!............|
00001360: 05 07 0d 12 03 0c 08 07 0e 11 04 0c 01 07 05 07 |................|
00001370: 0d 12 0b 16 04 12 03 21 0a 0c 08 07 03 12 05 12 |.......!........|
00001380: 02 11 04 08 03 11 06 12 0f 16 04 12 03 21 0a 0c |.............!..|
00001390: 08 07 03 12 05 12 02 11 04 08 03 11 06 12 05 0c |................|
000013a0: 08 0c 03 17 04 0c 03 12 03 0c 08 0c 03 17 04 0c |................|
000013b0: 03 12 00 0c 0a 07 03 12 05 0c 0a 07 03 12 1b 07 |................|
000013c0: 04 0c 0e 0c 0c 0c 0a 07 06 0c 0a 0c 03 07 07 07 |................|
000013d0: 07 07 24 0c 0a 07 06 0c 0a 0c 03 07 07 07 07 07 |..$.............|
000013e0: 09 07 2b 07 5c 0c 0c 0c 0a 07 06 0c 0a 0c 03 07 |..+.\...........|
000013f0: 07 07 07 07 24 0c 0a 07 06 0c 0a 0c 03 07 07 07 |....$...........|
00001400: 07 07 09 07 2b 07 09 00 02 29 3d 00 05 03 05 00 |....+....)=.....|
00001410: 05 34 3b 07 10 07 06 07 07 00 06 00 00 00 00 00 |.4;.............|
00001420: 00 e0 3f 06 00 00 00 00 00 00 e0 3f 06 00 00 00 |..?........?....|
00001430: 00 00 00 e0 3f 06 00 00 00 00 00 00 e0 3f 06 00 |....?........?..|
00001440: 00 00 00 00 00 e0 3f 06 00 00 00 00 00 00 e0 3f |......?........?|
00001450: 0c 43 06 01 96 04 04 0f 04 07 05 03 93 02 13 aa |.C..............|
00001460: 04 00 01 00 ae 04 00 01 00 80 05 00 01 00 82 05 |................|
00001470: 00 01 00 84 05 00 00 00 c2 04 00 01 00 86 05 00 |................|
00001480: 02 00 88 05 00 03 00 8a 05 00 04 00 cc 04 00 05 |................|
00001490: 00 8c 05 00 06 00 d4 04 00 07 00 f0 03 00 08 00 |................|
000014a0: 8e 05 00 09 00 90 05 00 0a 00 92 05 00 0b 00 94 |................|
000014b0: 05 00 0c 00 96 05 00 0d 00 98 05 00 0e 00 b2 04 |................|
000014c0: 16 01 b4 04 17 01 b6 04 18 01 8a 04 01 01 8c 04 |................|
000014d0: 02 01 c1 00 8e 39 a5 00 00 00 43 4d 01 00 00 df |.....9....CM....|
000014e0: e0 9c 24 01 00 9d cb b8 cc c8 e0 a6 ec 5b c8 e1 |..$..........[..|
000014f0: 9c cd c8 b8 a0 e1 9c ce c9 b8 a0 c5 04 c9 c5 05 |................|
00001500: c9 b8 9f c5 06 c8 b8 9f e1 9c c5 07 b8 c5 08 c4 |................|
00001510: 08 df a6 ec 30 d6 c4 05 91 c6 05 c7 d3 c4 06 91 |....0...........|
00001520: c6 06 48 d3 c4 04 91 c6 04 48 a0 d4 c4 07 91 c6 |..H......H......|
00001530: 07 48 9f d4 ca 91 d2 48 a0 9c 4b d5 c4 05 b7 4b |.H.....H..K....K|
00001540: 95 08 ee cc 95 01 ee a2 e2 b7 d6 f2 0e e2 b7 d5 |................|
00001550: f2 0e 60 04 00 b7 d5 d6 b8 bb 22 05 00 0e c1 01 |..`.......".....|
00001560: df 9c c5 09 c1 02 e0 9c c5 0a b8 cc c8 e0 a6 ec |................|
00001570: 6b c8 e1 9c b8 a0 c5 0b c8 e1 9c c5 0c c8 e1 9c |k...............|
00001580: b8 9f c5 0d c8 b8 a0 e1 9c c5 0e c8 e1 9c c5 05 |................|
00001590: c8 b8 9f e1 9c c5 07 b8 c5 08 c4 08 df a6 ec 38 |...............8|
000015a0: d3 c4 0c 91 c6 0c 4a c4 09 d5 c4 0d 91 c6 0d 48 |......J........H|
000015b0: d5 c4 0b 91 c6 0b 48 a0 9c a0 4b d4 c4 0c 4a c4 |......H...K...J.|
000015c0: 0a d5 c4 07 91 c6 07 48 d5 c4 0e 91 c6 0e 48 a0 |.......H......H.|
000015d0: 9c a0 4b 95 08 ee c4 95 01 ee 92 e2 b8 d3 f2 0e |..K.............|
000015e0: e2 b9 d4 f2 29 c8 03 a7 02 e2 01 04 0d 18 07 0e |....)...........|
000015f0: 1b 08 1b 0c 07 10 07 03 07 0d 11 15 17 06 07 0a |................|
00001600: 07 05 12 07 07 08 07 03 0d 0e 0c 04 07 0e 07 03 |................|
00001610: 0d 13 0c 08 12 05 12 01 0c 08 12 09 0c 04 07 0e |................|
00001620: 07 03 21 0b 0c 0a 07 05 12 1b 07 0c 0c 03 11 20 |..!............ |
00001630: 07 0a 07 08 0c 03 11 01 07 20 07 08 0c 03 11 01 |......... ......|
00001640: 07 05 07 26 07 08 0c 03 11 01 07 05 07 22 07 08 |...&........."..|
00001650: 07 03 0c 01 07 05 07 63 0d 2b 07 04 0c 01 00 02 |.......c.+......|
00001660: 03 30 00 04 0d 05 00 04 18 3b 0c 16 07 07 0d 0d |.0.......;......|
00001670: 0c 16 07 07 0d 0d 16 1a 07 06 11 0d 21 14 07 03 |............!...|
00001680: 1c 04 07 03 1c 01 07 0a 07 05 12 00 07 08 07 03 |................|
00001690: 0c 14 12 11 07 08 07 03 12 09 07 08 07 03 0c 14 |................|
000016a0: 12 15 0c 04 07 0e 07 03 12 09 07 08 07 03 12 07 |................|
000016b0: 0c 04 07 0e 07 03 21 0b 0c 0a 07 05 12 1b 07 08 |......!.........|
000016c0: 0c 03 11 01 07 24 0c 14 07 08 0c 03 11 01 07 1c |.....$..........|
000016d0: 07 08 0c 03 11 01 07 05 07 1f 07 13 0d 1f 07 04 |................|
000016e0: 0c 01 07 20 0c 14 07 08 0c 03 11 01 07 1c 07 08 |... ............|
000016f0: 0c 03 11 01 07 05 07 1f 07 13 00 02 03 16 00 04 |................|
00001700: 0d 05 00 04 18 3b 0c 16 07 07 0d 0d 0c 16 07 07 |.....;..........|
00001710: 00 06 00 00 00 00 00 00 e0 3f 06 00 00 00 00 00 |.........?......|
00001720: 00 e0 3f 06 00 00 00 00 00 00 e0 3f 0c 43 06 01 |..?........?.C..|
00001730: 98 04 05 00 05 07 03 00 20 05 bc 04 00 01 00 c6 |........ .......|
00001740: 04 00 01 00 aa 04 00 01 00 ae 04 00 01 00 a6 04 |................|
00001750: 00 01 00 88 04 00 01 8e 04 03 01 94 04 06 01 df |................|
00001760: d3 d4 5d 04 00 f3 0e e0 b7 d4 d3 5d 04 00 22 04 |..]........]..".|
00001770: 00 0e e1 b7 d3 d4 d5 d6 5d 04 00 22 06 00 29 c8 |........].."..).|
00001780: 03 25 84 02 04 03 08 07 14 07 06 07 08 11 0f 0d |.%..............|
00001790: 11 0c 16 07 08 07 06 11 15 17 0d 0c 14 07 06 07 |................|
000017a0: 08 07 06 07 06 11 21 00 0c 43 06 01 9a 04 05 01 |......!..C......|
000017b0: 05 07 04 00 60 06 aa 04 00 01 00 ae 04 00 01 00 |....`...........|
000017c0: 9c 05 00 01 00 9e 05 00 01 00 a6 04 00 01 00 a0 |................|
000017d0: 05 00 00 00 88 04 00 01 92 04 05 01 96 04 07 01 |................|
000017e0: 94 04 06 01 df d3 d5 5d 04 00 f3 0e df d4 d6 5d |.......].......]|
000017f0: 04 00 f3 0e d5 cb d3 d9 c7 d7 d6 cb d4 da c7 d8 |................|
00001800: e0 d3 d5 d4 d6 5d 04 00 22 05 00 0e e1 d3 d4 d5 |.....]..".......|
00001810: d6 22 04 00 0e d5 cb d3 d9 c7 d7 d6 cb d4 da c7 |."..............|
00001820: d8 e2 b8 d3 d5 d5 d6 5d 04 00 22 06 00 0e e2 b9 |.......]..".....|
00001830: d4 d6 d5 d6 5d 04 00 22 06 00 0e e1 d3 d4 d5 d6 |....].."........|
00001840: 22 04 00 29 c8 03 71 89 02 04 03 08 07 14 07 06 |"..)..q.........|
00001850: 07 08 11 0f 0d 11 07 14 07 06 07 08 11 0f 0d 04 |................|
00001860: 0d 0b 0d 01 0d 0e 0d 0b 0d 01 0d 07 07 12 07 06 |................|
00001870: 07 08 07 06 07 08 11 1d 17 0f 07 10 07 06 07 06 |................|
00001880: 07 08 07 15 17 08 0d 0b 0d 01 0d 0e 0d 0b 0d 01 |................|
00001890: 0d 07 0c 14 07 06 07 08 07 08 07 08 11 25 17 0b |.............%..|
000018a0: 0c 14 07 06 07 08 07 08 07 08 11 25 17 0b 07 10 |...........%....|
000018b0: 07 06 07 06 07 08 07 15 00 0c 43 06 01 00 03 00 |..........C.....|
000018c0: 03 00 00 00 01 03 de 04 00 01 00 aa 04 00 01 00 |................|
000018d0: ae 04 00 01 00 29 c8 03 03 9e 02 15 00 0c 43 06 |.....)........C.|
000018e0: 01 9e 04 03 01 03 02 03 07 3b 04 ec 03 00 01 40 |.........;.....@|
000018f0: aa 04 00 01 40 ae 04 00 01 40 10 00 01 00 b6 04 |....@....@......|
00001900: 18 01 b2 04 16 01 b4 04 17 01 08 cb c7 c2 00 44 |...............D|
00001910: 02 01 00 00 c7 c2 01 44 51 01 00 00 c7 c2 02 44 |.......DQ......D|
00001920: 01 01 00 00 c7 c2 03 44 52 01 00 00 c7 c2 04 44 |.......DR......D|
00001930: 53 01 00 00 c7 c2 05 44 19 01 00 00 c7 c2 06 44 |S......D.......D|
00001940: 1a 01 00 00 29 c8 03 21 9f 02 04 0f 08 07 08 28 |....)..!.......(|
00001950: 07 07 08 28 07 07 08 00 07 08 07 07 08 28 07 07 |...(.........(..|
00001960: 08 28 07 07 08 26 07 07 08 00 0c 43 06 01 00 03 |.(...&.....C....|
00001970: 00 03 04 02 00 0d 03 bc 04 00 01 00 d8 04 00 01 |................|
00001980: 00 de 04 00 01 00 ec 03 00 03 b6 04 00 00 df d3 |................|
00001990: b8 9f d4 b8 9f e0 9c 9f d5 4b 29 c8 03 15 a2 02 |.........K).....|
000019a0: 1a 03 1b 07 0c 0c 04 07 10 0c 04 07 0e 07 03 07 |................|
000019b0: 13 07 2e 00 0c 43 06 01 00 02 00 02 04 02 00 0c |.....C..........|
000019c0: 02 bc 04 00 01 00 d8 04 00 01 00 ec 03 00 03 b6 |................|
000019d0: 04 00 00 df d3 b8 9f d4 b8 9f e0 9c 9f 48 28 c8 |.............H(.|
000019e0: 03 17 a5 02 1a 03 0d 07 0c 0c 04 07 10 0c 04 07 |................|
000019f0: 0e 07 03 07 13 07 11 07 15 00 0c 43 06 01 00 04 |...........C....|
00001a00: 00 04 04 03 00 19 04 bc 04 00 01 00 d8 04 00 01 |................|
00001a10: 00 a8 05 00 01 00 aa 05 00 01 00 aa 04 01 03 b6 |................|
00001a20: 04 00 00 ae 04 02 03 df d3 b8 9f d4 b8 9f e0 9c |................|
00001a30: 9f d5 4b e1 d3 b8 9f d4 b8 9f e0 9c 9f d6 4b 29 |..K...........K)|
00001a40: c8 03 27 a8 02 1b 03 1d 07 06 0c 04 07 10 0c 04 |..'.............|
00001a50: 07 0e 07 03 07 13 07 2e 0d 41 07 06 0c 04 07 10 |.........A......|
00001a60: 0c 04 07 0e 07 03 07 13 07 2e 00 0c 43 06 01 00 |............C...|
00001a70: 02 00 02 04 02 00 0c 02 bc 04 00 01 00 d8 04 00 |................|
00001a80: 01 00 aa 04 01 03 b6 04 00 00 df d3 b8 9f d4 b8 |................|
00001a90: 9f e0 9c 9f 48 28 c8 03 17 ac 02 1c 03 11 07 06 |....H(..........|
00001aa0: 0c 04 07 10 0c 04 07 0e 07 03 07 13 07 11 07 0f |................|
00001ab0: 00 0c 43 06 01 00 02 00 02 04 02 00 0c 02 bc 04 |..C.............|
00001ac0: 00 01 00 d8 04 00 01 00 ae 04 02 03 b6 04 00 00 |................|
00001ad0: df d3 b8 9f d4 b8 9f e0 9c 9f 48 28 c8 03 17 af |..........H(....|
00001ae0: 02 1c 03 11 07 06 0c 04 07 10 0c 04 07 0e 07 03 |................|
00001af0: 07 13 07 11 07 0f 00 0c 43 06 01 00 00 00 00 01 |........C.......|
00001b00: 01 00 02 00 b2 04 01 00 df 28 c8 03 07 b2 02 15 |.........(......|
00001b10: 02 2a 07 0d 00 0c 43 06 01 00 00 00 00 01 01 00 |.*....C.........|
00001b20: 02 00 b4 04 02 00 df 28 c8 03 07 b3 02 16 02 2a |.......(.......*|
00001b30: 07 0d 00 0c 43 06 01 a0 04 03 01 03 08 03 00 22 |....C.........."|
00001b40: 04 de 04 00 01 00 aa 04 00 01 00 ae 04 00 01 00 |................|
00001b50: f0 03 00 00 00 b8 04 19 01 9c 04 0a 01 9e 04 0b |................|
00001b60: 01 b7 cb c7 df a5 ec 11 d4 c7 d5 c7 d3 c7 b7 16 |................|
00001b70: 4b 16 4b 4b 95 00 ee ec e0 e1 11 d3 d4 d5 21 03 |K.KK..........!.|
00001b80: 00 f1 29 c8 03 27 b5 02 04 0d 28 07 08 07 03 12 |..)..'....(.....|
00001b90: 1b 07 04 07 0a 07 04 07 0a 07 04 07 01 1f 10 18 |................|
00001ba0: 35 07 1e 0c 0c 07 06 07 06 07 0d 11 13 00 0c 43 |5..............C|
00001bb0: 06 01 00 00 00 00 06 0c 00 41 00 a0 04 0c 01 a8 |.........A......|
00001bc0: 04 11 01 ac 04 13 01 b0 04 15 01 9a 04 09 01 aa |................|
00001bd0: 04 12 01 ae 04 14 01 a6 04 0f 01 98 04 08 01 ec |................|
00001be0: 03 10 01 ba 04 1a 01 9e 04 0b 01 df e0 e1 e2 f3 |................|
00001bf0: 0e 60 04 00 60 05 00 60 06 00 e1 e2 60 07 00 22 |.`..`..`....`.."|
00001c00: 05 00 0e 60 08 00 60 09 00 e0 60 05 00 60 06 00 |...`..`...`..`..|
00001c10: 60 07 00 22 05 00 0e 60 0a 00 60 0b 00 11 60 09 |`.."...`..`...`.|
00001c20: 00 60 05 00 60 06 00 21 03 00 f1 29 c8 03 37 ba |.`..`..!...)..7.|
00001c30: 02 12 03 13 07 10 07 16 07 10 07 27 0d 0d 11 12 |...........'....|
00001c40: 11 06 11 06 07 10 07 10 11 2d 17 0f 11 14 11 0c |.........-......|
00001c50: 07 16 11 06 11 06 11 2f 17 11 11 20 16 0c 11 0c |......./... ....|
00001c60: 11 06 11 13 11 13 00 0c 43 06 01 00 01 00 01 01 |........C.......|
00001c70: 01 00 03 01 ac 05 00 01 00 ba 04 1a 01 d3 e3 29 |...............)|
00001c80: c8 03 05 c0 02 1e 03 0f 00 0c 43 06 01 00 00 00 |..........C.....|
00001c90: 00 01 01 00 02 00 a2 04 0d 01 df 28 c8 03 07 c3 |...........(....|
00001ca0: 02 16 02 2a 07 0d 00 0c 43 06 01 00 01 00 01 02 |...*....C.......|
00001cb0: 01 00 0e 01 ae 05 00 01 00 a2 04 0d 01 d3 b7 a7 |................|
00001cc0: ec 09 d3 bf 64 a6 ec 03 d3 e3 29 c8 03 0d c4 02 |....d.....).....|
00001cd0: 19 03 19 0c 0c 11 0e 11 0c 12 0b 00 0c 43 06 01 |.............C..|
00001ce0: 00 01 00 01 01 01 00 03 01 b0 05 00 01 00 9c 04 |................|
00001cf0: 0a 01 d3 e3 29 c8 03 05 c8 02 19 03 07 00 06 00 |....)...........|
00001d00: 00 00 00 00 00 e0 3f 06 9a 99 99 99 99 99 b9 3f |......?........?|
00001d10: 0c 43 06 01 fc 03 00 01 00 0e 0a 00 8a 01 01 f0 |.C..............|
00001d20: 03 00 00 00 b6 04 18 01 b2 04 16 01 b8 04 19 01 |................|
00001d30: b4 04 17 01 ec 03 10 01 a8 04 11 01 aa 04 12 01 |................|
00001d40: ac 04 13 01 ae 04 14 01 b0 04 15 01 e0 b9 9f e3 |................|
00001d50: e0 b9 9f e2 b9 9f 9c e5 39 9e 00 00 00 11 e1 21 |........9......!|
00001d60: 01 00 61 04 00 39 9e 00 00 00 11 e1 21 01 00 61 |..a..9......!..a|
00001d70: 05 00 39 9e 00 00 00 11 e1 21 01 00 61 06 00 39 |..9......!..a..9|
00001d80: 9e 00 00 00 11 e1 21 01 00 61 07 00 39 9e 00 00 |......!..a..9...|
00001d90: 00 11 e1 21 01 00 61 08 00 39 9e 00 00 00 11 e1 |...!..a..9......|
00001da0: 21 01 00 61 09 00 b7 cb c7 e1 a5 ec 29 60 05 00 |!..a........)`..|
00001db0: c7 60 07 00 c7 60 09 00 c7 60 04 00 c7 60 06 00 |.`...`...`...`..|
00001dc0: c7 60 08 00 c7 b7 16 4b 16 4b 16 4b 16 4b 16 4b |.`.....K.K.K.K.K|
00001dd0: 4b 95 00 ee d4 29 c8 03 57 d9 02 04 03 1c 0c 0c |K....)..W.......|
00001de0: 0d 0f 0c 0c 07 10 0c 0e 07 13 0d 0f 20 0c 07 01 |............ ...|
00001df0: 21 00 20 0c 07 01 21 19 20 0c 07 01 21 00 20 0c |!. ...!. ...!. .|
00001e00: 07 01 21 13 20 0c 07 01 21 00 20 0c 07 01 2b 03 |..!. ...!. ...+.|
00001e10: 07 08 07 03 12 1b 11 14 07 0a 11 0e 07 0a 11 0e |................|
00001e20: 07 0a 11 0a 07 0a 11 04 07 0a 11 04 07 01 3d 43 |..............=C|
00001e30: 00 0c 43 06 01 00 00 00 00 01 01 00 02 00 ec 03 |..C.............|
00001e40: 10 01 df 28 c8 03 07 e6 02 13 03 07 07 0d 00 0c |...(............|
00001e50: 43 06 01 00 02 01 02 02 03 00 28 03 b2 05 00 01 |C.........(.....|
00001e60: 00 b4 05 00 01 00 b6 05 00 00 00 b2 04 16 01 b4 |................|
00001e70: 04 17 01 fc 03 1b 01 d4 d3 9c cf b7 a7 ec 1f c7 |................|
00001e80: 01 40 42 0f 00 a5 ec 16 d4 df ac 11 ed 05 0e d3 |.@B.............|
00001e90: e0 ac ec 0a d4 e3 d3 e4 e1 f0 0e 0a 28 09 28 c8 |............(.(.|
00001ea0: 03 29 e9 02 19 03 0d 07 0e 07 03 08 15 0c 08 11 |.)..............|
00001eb0: 0e 20 08 11 1c 07 10 07 05 1b 18 07 10 07 05 12 |. ..............|
00001ec0: 55 0d 02 0d 11 07 0a 12 09 0e 07 00             |U...........|
```