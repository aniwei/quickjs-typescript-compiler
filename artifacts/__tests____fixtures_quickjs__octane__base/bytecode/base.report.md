# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures_quickjs/octane/base.ts
**生成时间**: 2026-01-06T16:53:52.631Z

## 大小对比

- TypeScript编译器: 5388 字节
- WASM编译器: 5388 字节
- 差异: 0 字节 (0.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 89,
  "atoms": [
    {
      "index": 0,
      "rawLength": 82,
      "actualLength": 41,
      "isWideChar": 0,
      "string": "__tests__/fixtures_quickjs/octane/base.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "performance",
      "offset": 44
    },
    {
      "index": 2,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "Benchmark",
      "offset": 56
    },
    {
      "index": 3,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "BenchmarkSuite",
      "offset": 66
    },
    {
      "index": 4,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "BenchmarkResult",
      "offset": 81
    },
    {
      "index": 5,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "alert",
      "offset": 97
    },
    {
      "index": 6,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "now",
      "offset": 103
    },
    {
      "index": 7,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "suites",
      "offset": 107
    },
    {
      "index": 8,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "version",
      "offset": 114
    },
    {
      "index": 9,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "doWarmup",
      "offset": 122
    },
    {
      "index": 10,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "doDeterministic",
      "offset": 131
    },
    {
      "index": 11,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "config",
      "offset": 147
    },
    {
      "index": 12,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "ResetRNG",
      "offset": 154
    },
    {
      "index": 13,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "RunSuites",
      "offset": 163
    },
    {
      "index": 14,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "CountBenchmarks",
      "offset": 173
    },
    {
      "index": 15,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "GeometricMean",
      "offset": 189
    },
    {
      "index": 16,
      "rawLength": 34,
      "actualLength": 17,
      "isWideChar": 0,
      "string": "GeometricMeanTime",
      "offset": 203
    },
    {
      "index": 17,
      "rawLength": 40,
      "actualLength": 20,
      "isWideChar": 0,
      "string": "GeometricMeanLatency",
      "offset": 221
    },
    {
      "index": 18,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "FormatScore",
      "offset": 242
    },
    {
      "index": 19,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "NotifyStep",
      "offset": 254
    },
    {
      "index": 20,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "NotifyResult",
      "offset": 265
    },
    {
      "index": 21,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "NotifySkipped",
      "offset": 278
    },
    {
      "index": 22,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "NotifyError",
      "offset": 292
    },
    {
      "index": 23,
      "rawLength": 36,
      "actualLength": 18,
      "isWideChar": 0,
      "string": "RunSingleBenchmark",
      "offset": 304
    },
    {
      "index": 24,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "RunStep",
      "offset": 323
    },
    {
      "index": 25,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "mozNow",
      "offset": 331
    },
    {
      "index": 26,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "msNow",
      "offset": 338
    },
    {
      "index": 27,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "oNow",
      "offset": 344
    },
    {
      "index": 28,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "webkitNow",
      "offset": 349
    },
    {
      "index": 29,
      "rawLength": 46,
      "actualLength": 23,
      "isWideChar": 0,
      "string": "deterministicIterations",
      "offset": 359
    },
    {
      "index": 30,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "run",
      "offset": 383
    },
    {
      "index": 31,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "setup",
      "offset": 387
    },
    {
      "index": 32,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "tearDown",
      "offset": 393
    },
    {
      "index": 33,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "rmsResult",
      "offset": 402
    },
    {
      "index": 34,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "minIterations",
      "offset": 412
    },
    {
      "index": 35,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "Setup",
      "offset": 426
    },
    {
      "index": 36,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "TearDown",
      "offset": 432
    },
    {
      "index": 37,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "benchmark",
      "offset": 441
    },
    {
      "index": 38,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "time",
      "offset": 451
    },
    {
      "index": 39,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "latency",
      "offset": 456
    },
    {
      "index": 40,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "reference",
      "offset": 464
    },
    {
      "index": 41,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "benchmarks",
      "offset": 474
    },
    {
      "index": 42,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "push",
      "offset": 485
    },
    {
      "index": 43,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "s",
      "offset": 490
    },
    {
      "index": 44,
      "rawLength": 56,
      "actualLength": 28,
      "isWideChar": 0,
      "string": "Alert called with argument: ",
      "offset": 492
    },
    {
      "index": 45,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "random",
      "offset": 521
    },
    {
      "index": 46,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "seed",
      "offset": 528
    },
    {
      "index": 47,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "runner",
      "offset": 533
    },
    {
      "index": 48,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "skipBenchmarks",
      "offset": 540
    },
    {
      "index": 49,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "continuation",
      "offset": 555
    },
    {
      "index": 50,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "print",
      "offset": 568
    },
    {
      "index": 51,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "scores",
      "offset": 574
    },
    {
      "index": 52,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "suite",
      "offset": 581
    },
    {
      "index": 53,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "score",
      "offset": 587
    },
    {
      "index": 54,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "formatted",
      "offset": 593
    },
    {
      "index": 55,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "NotifyStart",
      "offset": 603
    },
    {
      "index": 56,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "indexOf",
      "offset": 615
    },
    {
      "index": 57,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "window",
      "offset": 623
    },
    {
      "index": 58,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "setTimeout",
      "offset": 630
    },
    {
      "index": 59,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "NotifyScore",
      "offset": 641
    },
    {
      "index": 60,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "result",
      "offset": 653
    },
    {
      "index": 61,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 660
    },
    {
      "index": 62,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "numbers",
      "offset": 662
    },
    {
      "index": 63,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 670
    },
    {
      "index": 64,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "pow",
      "offset": 674
    },
    {
      "index": 65,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "E",
      "offset": 678
    },
    {
      "index": 66,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "measurements",
      "offset": 680
    },
    {
      "index": 67,
      "rawLength": 32,
      "actualLength": 16,
      "isWideChar": 0,
      "string": "hasLatencyResult",
      "offset": 693
    },
    {
      "index": 68,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "toFixed",
      "offset": 710
    },
    {
      "index": 69,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "toPrecision",
      "offset": 718
    },
    {
      "index": 70,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "results",
      "offset": 730
    },
    {
      "index": 71,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "mean",
      "offset": 738
    },
    {
      "index": 72,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "meanLatency",
      "offset": 743
    },
    {
      "index": 73,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "scoreLatency",
      "offset": 755
    },
    {
      "index": 74,
      "rawLength": 32,
      "actualLength": 16,
      "isWideChar": 0,
      "string": "formattedLatency",
      "offset": 768
    },
    {
      "index": 75,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "Latency",
      "offset": 785
    },
    {
      "index": 76,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "Skipped",
      "offset": 793
    },
    {
      "index": 77,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "error",
      "offset": 801
    },
    {
      "index": 78,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "data",
      "offset": 807
    },
    {
      "index": 79,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "Measure",
      "offset": 812
    },
    {
      "index": 80,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "usec",
      "offset": 820
    },
    {
      "index": 81,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "rms",
      "offset": 825
    },
    {
      "index": 82,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "runs",
      "offset": 829
    },
    {
      "index": 83,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "elapsed",
      "offset": 834
    },
    {
      "index": 84,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "start",
      "offset": 842
    },
    {
      "index": 85,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "RunNextSetup",
      "offset": 848
    },
    {
      "index": 86,
      "rawLength": 32,
      "actualLength": 16,
      "isWideChar": 0,
      "string": "RunNextBenchmark",
      "offset": 861
    },
    {
      "index": 87,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "RunNextTearDown",
      "offset": 878
    },
    {
      "index": 88,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "e",
      "offset": 894
    }
  ],
  "functionHeader": {
    "offset": 896,
    "tag": "0xd",
    "remaining": 4492
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 89,
  "atoms": [
    {
      "index": 0,
      "rawLength": 82,
      "actualLength": 41,
      "isWideChar": 0,
      "string": "__tests__/fixtures_quickjs/octane/base.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "performance",
      "offset": 44
    },
    {
      "index": 2,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "Benchmark",
      "offset": 56
    },
    {
      "index": 3,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "BenchmarkSuite",
      "offset": 66
    },
    {
      "index": 4,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "BenchmarkResult",
      "offset": 81
    },
    {
      "index": 5,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "alert",
      "offset": 97
    },
    {
      "index": 6,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "now",
      "offset": 103
    },
    {
      "index": 7,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "suites",
      "offset": 107
    },
    {
      "index": 8,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "version",
      "offset": 114
    },
    {
      "index": 9,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "doWarmup",
      "offset": 122
    },
    {
      "index": 10,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "doDeterministic",
      "offset": 131
    },
    {
      "index": 11,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "config",
      "offset": 147
    },
    {
      "index": 12,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "ResetRNG",
      "offset": 154
    },
    {
      "index": 13,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "RunSuites",
      "offset": 163
    },
    {
      "index": 14,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "CountBenchmarks",
      "offset": 173
    },
    {
      "index": 15,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "GeometricMean",
      "offset": 189
    },
    {
      "index": 16,
      "rawLength": 34,
      "actualLength": 17,
      "isWideChar": 0,
      "string": "GeometricMeanTime",
      "offset": 203
    },
    {
      "index": 17,
      "rawLength": 40,
      "actualLength": 20,
      "isWideChar": 0,
      "string": "GeometricMeanLatency",
      "offset": 221
    },
    {
      "index": 18,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "FormatScore",
      "offset": 242
    },
    {
      "index": 19,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "NotifyStep",
      "offset": 254
    },
    {
      "index": 20,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "NotifyResult",
      "offset": 265
    },
    {
      "index": 21,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "NotifySkipped",
      "offset": 278
    },
    {
      "index": 22,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "NotifyError",
      "offset": 292
    },
    {
      "index": 23,
      "rawLength": 36,
      "actualLength": 18,
      "isWideChar": 0,
      "string": "RunSingleBenchmark",
      "offset": 304
    },
    {
      "index": 24,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "RunStep",
      "offset": 323
    },
    {
      "index": 25,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "mozNow",
      "offset": 331
    },
    {
      "index": 26,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "msNow",
      "offset": 338
    },
    {
      "index": 27,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "oNow",
      "offset": 344
    },
    {
      "index": 28,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "webkitNow",
      "offset": 349
    },
    {
      "index": 29,
      "rawLength": 46,
      "actualLength": 23,
      "isWideChar": 0,
      "string": "deterministicIterations",
      "offset": 359
    },
    {
      "index": 30,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "run",
      "offset": 383
    },
    {
      "index": 31,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "setup",
      "offset": 387
    },
    {
      "index": 32,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "tearDown",
      "offset": 393
    },
    {
      "index": 33,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "rmsResult",
      "offset": 402
    },
    {
      "index": 34,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "minIterations",
      "offset": 412
    },
    {
      "index": 35,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "Setup",
      "offset": 426
    },
    {
      "index": 36,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "TearDown",
      "offset": 432
    },
    {
      "index": 37,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "benchmark",
      "offset": 441
    },
    {
      "index": 38,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "time",
      "offset": 451
    },
    {
      "index": 39,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "latency",
      "offset": 456
    },
    {
      "index": 40,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "reference",
      "offset": 464
    },
    {
      "index": 41,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "benchmarks",
      "offset": 474
    },
    {
      "index": 42,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "push",
      "offset": 485
    },
    {
      "index": 43,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "s",
      "offset": 490
    },
    {
      "index": 44,
      "rawLength": 56,
      "actualLength": 28,
      "isWideChar": 0,
      "string": "Alert called with argument: ",
      "offset": 492
    },
    {
      "index": 45,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "random",
      "offset": 521
    },
    {
      "index": 46,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "seed",
      "offset": 528
    },
    {
      "index": 47,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "runner",
      "offset": 533
    },
    {
      "index": 48,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "skipBenchmarks",
      "offset": 540
    },
    {
      "index": 49,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "continuation",
      "offset": 555
    },
    {
      "index": 50,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "print",
      "offset": 568
    },
    {
      "index": 51,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "scores",
      "offset": 574
    },
    {
      "index": 52,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "suite",
      "offset": 581
    },
    {
      "index": 53,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "score",
      "offset": 587
    },
    {
      "index": 54,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "formatted",
      "offset": 593
    },
    {
      "index": 55,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "NotifyStart",
      "offset": 603
    },
    {
      "index": 56,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "indexOf",
      "offset": 615
    },
    {
      "index": 57,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "window",
      "offset": 623
    },
    {
      "index": 58,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "setTimeout",
      "offset": 630
    },
    {
      "index": 59,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "NotifyScore",
      "offset": 641
    },
    {
      "index": 60,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "result",
      "offset": 653
    },
    {
      "index": 61,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 660
    },
    {
      "index": 62,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "numbers",
      "offset": 662
    },
    {
      "index": 63,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 670
    },
    {
      "index": 64,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "pow",
      "offset": 674
    },
    {
      "index": 65,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "E",
      "offset": 678
    },
    {
      "index": 66,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "measurements",
      "offset": 680
    },
    {
      "index": 67,
      "rawLength": 32,
      "actualLength": 16,
      "isWideChar": 0,
      "string": "hasLatencyResult",
      "offset": 693
    },
    {
      "index": 68,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "toFixed",
      "offset": 710
    },
    {
      "index": 69,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "toPrecision",
      "offset": 718
    },
    {
      "index": 70,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "results",
      "offset": 730
    },
    {
      "index": 71,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "mean",
      "offset": 738
    },
    {
      "index": 72,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "meanLatency",
      "offset": 743
    },
    {
      "index": 73,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "scoreLatency",
      "offset": 755
    },
    {
      "index": 74,
      "rawLength": 32,
      "actualLength": 16,
      "isWideChar": 0,
      "string": "formattedLatency",
      "offset": 768
    },
    {
      "index": 75,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "Latency",
      "offset": 785
    },
    {
      "index": 76,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "Skipped",
      "offset": 793
    },
    {
      "index": 77,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "error",
      "offset": 801
    },
    {
      "index": 78,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "data",
      "offset": 807
    },
    {
      "index": 79,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "Measure",
      "offset": 812
    },
    {
      "index": 80,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "usec",
      "offset": 820
    },
    {
      "index": 81,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "rms",
      "offset": 825
    },
    {
      "index": 82,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "runs",
      "offset": 829
    },
    {
      "index": 83,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "elapsed",
      "offset": 834
    },
    {
      "index": 84,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "start",
      "offset": 842
    },
    {
      "index": 85,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "RunNextSetup",
      "offset": 848
    },
    {
      "index": 86,
      "rawLength": 32,
      "actualLength": 16,
      "isWideChar": 0,
      "string": "RunNextBenchmark",
      "offset": 861
    },
    {
      "index": 87,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "RunNextTearDown",
      "offset": 878
    },
    {
      "index": 88,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "e",
      "offset": 894
    }
  ],
  "functionHeader": {
    "offset": 896,
    "tag": "0xd",
    "remaining": 4492
  }
}
```

## 字节级差异

共发现 15 个字节差异:

- 偏移量 0x141b: TS=0xb0 vs WASM=0xe4
- 偏移量 0x141d: TS=0x02 vs WASM=0x03
- 偏移量 0x141f: TS=0xb2 vs WASM=0xb0
- 偏移量 0x1420: TS=0x01 vs WASM=0x04
- 偏移量 0x1421: TS=0x01 vs WASM=0x02
- 偏移量 0x1423: TS=0xe4 vs WASM=0xb2
- 偏移量 0x1424: TS=0x04 vs WASM=0x01
- 偏移量 0x1425: TS=0x03 vs WASM=0x01
- 偏移量 0x1434: TS=0xdf vs WASM=0xe0
- 偏移量 0x143a: TS=0xdf vs WASM=0xe0
- 偏移量 0x1440: TS=0xe0 vs WASM=0xe1
- 偏移量 0x1442: TS=0xe1 vs WASM=0xdf
- 偏移量 0x1446: TS=0xe5 vs WASM=0xe3
- 偏移量 0x1450: TS=0xdf vs WASM=0xe0
- 偏移量 0x145f: TS=0xe1 vs WASM=0xdf

## 十六进制转储对比

### TypeScript
```
00000000: 05 59 52 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |.YR__tests__/fix|
00000010: 74 75 72 65 73 5f 71 75 69 63 6b 6a 73 2f 6f 63 |tures_quickjs/oc|
00000020: 74 61 6e 65 2f 62 61 73 65 2e 6a 73 16 70 65 72 |tane/base.js.per|
00000030: 66 6f 72 6d 61 6e 63 65 12 42 65 6e 63 68 6d 61 |formance.Benchma|
00000040: 72 6b 1c 42 65 6e 63 68 6d 61 72 6b 53 75 69 74 |rk.BenchmarkSuit|
00000050: 65 1e 42 65 6e 63 68 6d 61 72 6b 52 65 73 75 6c |e.BenchmarkResul|
00000060: 74 0a 61 6c 65 72 74 06 6e 6f 77 0c 73 75 69 74 |t.alert.now.suit|
00000070: 65 73 0e 76 65 72 73 69 6f 6e 10 64 6f 57 61 72 |es.version.doWar|
00000080: 6d 75 70 1e 64 6f 44 65 74 65 72 6d 69 6e 69 73 |mup.doDeterminis|
00000090: 74 69 63 0c 63 6f 6e 66 69 67 10 52 65 73 65 74 |tic.config.Reset|
000000a0: 52 4e 47 12 52 75 6e 53 75 69 74 65 73 1e 43 6f |RNG.RunSuites.Co|
000000b0: 75 6e 74 42 65 6e 63 68 6d 61 72 6b 73 1a 47 65 |untBenchmarks.Ge|
000000c0: 6f 6d 65 74 72 69 63 4d 65 61 6e 22 47 65 6f 6d |ometricMean"Geom|
000000d0: 65 74 72 69 63 4d 65 61 6e 54 69 6d 65 28 47 65 |etricMeanTime(Ge|
000000e0: 6f 6d 65 74 72 69 63 4d 65 61 6e 4c 61 74 65 6e |ometricMeanLaten|
000000f0: 63 79 16 46 6f 72 6d 61 74 53 63 6f 72 65 14 4e |cy.FormatScore.N|
00000100: 6f 74 69 66 79 53 74 65 70 18 4e 6f 74 69 66 79 |otifyStep.Notify|
00000110: 52 65 73 75 6c 74 1a 4e 6f 74 69 66 79 53 6b 69 |Result.NotifySki|
00000120: 70 70 65 64 16 4e 6f 74 69 66 79 45 72 72 6f 72 |pped.NotifyError|
00000130: 24 52 75 6e 53 69 6e 67 6c 65 42 65 6e 63 68 6d |$RunSingleBenchm|
00000140: 61 72 6b 0e 52 75 6e 53 74 65 70 0c 6d 6f 7a 4e |ark.RunStep.mozN|
00000150: 6f 77 0a 6d 73 4e 6f 77 08 6f 4e 6f 77 12 77 65 |ow.msNow.oNow.we|
00000160: 62 6b 69 74 4e 6f 77 2e 64 65 74 65 72 6d 69 6e |bkitNow.determin|
00000170: 69 73 74 69 63 49 74 65 72 61 74 69 6f 6e 73 06 |isticIterations.|
00000180: 72 75 6e 0a 73 65 74 75 70 10 74 65 61 72 44 6f |run.setup.tearDo|
00000190: 77 6e 12 72 6d 73 52 65 73 75 6c 74 1a 6d 69 6e |wn.rmsResult.min|
000001a0: 49 74 65 72 61 74 69 6f 6e 73 0a 53 65 74 75 70 |Iterations.Setup|
000001b0: 10 54 65 61 72 44 6f 77 6e 12 62 65 6e 63 68 6d |.TearDown.benchm|
000001c0: 61 72 6b 08 74 69 6d 65 0e 6c 61 74 65 6e 63 79 |ark.time.latency|
000001d0: 12 72 65 66 65 72 65 6e 63 65 14 62 65 6e 63 68 |.reference.bench|
000001e0: 6d 61 72 6b 73 08 70 75 73 68 02 73 38 41 6c 65 |marks.push.s8Ale|
000001f0: 72 74 20 63 61 6c 6c 65 64 20 77 69 74 68 20 61 |rt called with a|
00000200: 72 67 75 6d 65 6e 74 3a 20 0c 72 61 6e 64 6f 6d |rgument: .random|
00000210: 08 73 65 65 64 0c 72 75 6e 6e 65 72 1c 73 6b 69 |.seed.runner.ski|
00000220: 70 42 65 6e 63 68 6d 61 72 6b 73 18 63 6f 6e 74 |pBenchmarks.cont|
00000230: 69 6e 75 61 74 69 6f 6e 0a 70 72 69 6e 74 0c 73 |inuation.print.s|
00000240: 63 6f 72 65 73 0a 73 75 69 74 65 0a 73 63 6f 72 |cores.suite.scor|
00000250: 65 12 66 6f 72 6d 61 74 74 65 64 16 4e 6f 74 69 |e.formatted.Noti|
00000260: 66 79 53 74 61 72 74 0e 69 6e 64 65 78 4f 66 0c |fyStart.indexOf.|
00000270: 77 69 6e 64 6f 77 14 73 65 74 54 69 6d 65 6f 75 |window.setTimeou|
00000280: 74 16 4e 6f 74 69 66 79 53 63 6f 72 65 0c 72 65 |t.NotifyScore.re|
00000290: 73 75 6c 74 02 69 0e 6e 75 6d 62 65 72 73 06 6c |sult.i.numbers.l|
000002a0: 6f 67 06 70 6f 77 02 45 18 6d 65 61 73 75 72 65 |og.pow.E.measure|
000002b0: 6d 65 6e 74 73 20 68 61 73 4c 61 74 65 6e 63 79 |ments hasLatency|
000002c0: 52 65 73 75 6c 74 0e 74 6f 46 69 78 65 64 16 74 |Result.toFixed.t|
000002d0: 6f 50 72 65 63 69 73 69 6f 6e 0e 72 65 73 75 6c |oPrecision.resul|
000002e0: 74 73 08 6d 65 61 6e 16 6d 65 61 6e 4c 61 74 65 |ts.mean.meanLate|
000002f0: 6e 63 79 18 73 63 6f 72 65 4c 61 74 65 6e 63 79 |ncy.scoreLatency|
00000300: 20 66 6f 72 6d 61 74 74 65 64 4c 61 74 65 6e 63 | formattedLatenc|
00000310: 79 0e 4c 61 74 65 6e 63 79 0e 53 6b 69 70 70 65 |y.Latency.Skippe|
00000320: 64 0a 65 72 72 6f 72 08 64 61 74 61 0e 4d 65 61 |d.error.data.Mea|
00000330: 73 75 72 65 08 75 73 65 63 06 72 6d 73 08 72 75 |sure.usec.rms.ru|
00000340: 6e 73 0e 65 6c 61 70 73 65 64 0a 73 74 61 72 74 |ns.elapsed.start|
00000350: 18 52 75 6e 4e 65 78 74 53 65 74 75 70 20 52 75 |.RunNextSetup Ru|
00000360: 6e 4e 65 78 74 42 65 6e 63 68 6d 61 72 6b 1e 52 |nNextBenchmark.R|
00000370: 75 6e 4e 65 78 74 54 65 61 72 44 6f 77 6e 02 65 |unNextTearDown.e|
00000380: 0d c8 03 00 03 00 00 ca 03 00 01 cc 03 00 03 ce |................|
00000390: 03 00 00 00 0c 20 06 01 a4 01 00 00 00 03 05 14 |..... ..........|
000003a0: e7 01 00 ca 03 00 01 cc 03 01 01 d0 03 02 01 ce |................|
000003b0: 03 03 01 d2 03 04 01 08 ec 0b c2 01 e4 c2 02 e5 |................|
000003c0: c2 04 e6 29 df 11 ed 03 0e 0b e7 c2 00 f0 44 ea |...)..........D.|
000003d0: 00 00 00 e1 42 3d 00 00 00 c2 03 44 3b 00 00 00 |....B=.....D;...|
000003e0: e2 26 00 00 44 eb 00 00 00 e2 c1 05 44 ec 00 00 |.&..D.......D...|
000003f0: 00 e2 0b 39 47 00 00 00 4e ed 00 00 00 39 47 00 |...9G...N....9G.|
00000400: 00 00 4e ee 00 00 00 44 ef 00 00 00 c2 06 4f e9 |..N....D......O.|
00000410: 00 00 00 61 04 00 e2 c2 07 44 f0 00 00 00 e2 c2 |...a.....D......|
00000420: 08 44 f1 00 00 00 e2 c2 09 44 f2 00 00 00 e2 c2 |.D.......D......|
00000430: 0a 44 f3 00 00 00 e2 c2 0b 44 f4 00 00 00 e2 c2 |.D.......D......|
00000440: 0c 44 f5 00 00 00 e2 c2 0d 44 f6 00 00 00 e2 42 |.D.......D.....B|
00000450: 3d 00 00 00 c2 0e 44 f7 00 00 00 e2 42 3d 00 00 |=.....D.....B=..|
00000460: 00 c2 0f 44 f8 00 00 00 e2 42 3d 00 00 00 c2 10 |...D.....B=.....|
00000470: 44 f9 00 00 00 e2 42 3d 00 00 00 c2 11 44 fa 00 |D.....B=.....D..|
00000480: 00 00 e2 42 3d 00 00 00 c2 12 44 fb 00 00 00 e2 |...B=.....D.....|
00000490: 42 3d 00 00 00 c2 13 44 fc 00 00 00 06 2f c8 03 |B=.....D...../..|
000004a0: 86 01 00 00 00 0d 36 32 21 31 07 16 00 02 0e 11 |......62!1......|
000004b0: 00 06 3c 03 07 1e 1b 14 00 07 1c 31 07 1c 00 08 |..<........1....|
000004c0: 08 1b 07 1c 00 07 08 1b 07 1c 08 00 35 0e 00 19 |............5...|
000004d0: 10 29 07 1c 00 07 26 1b 07 1c 00 07 50 1b 07 1c |.)....&.....P...|
000004e0: 00 07 12 1b 07 1c 00 07 10 1b 07 1c 00 07 10 1b |................|
000004f0: 07 1c 00 07 24 1b 07 1c 00 07 14 1b 07 1c 1b 14 |....$...........|
00000500: 00 07 0e 2f 07 1c 1b 14 00 07 28 2f 07 1c 1b 14 |.../......(/....|
00000510: 00 07 0e 2f 07 1c 1b 14 00 07 14 2f 07 1c 1b 14 |.../......./....|
00000520: 00 07 5c 2f 07 1c 1b 14 00 0c 43 06 01 00 00 00 |..\/......C.....|
00000530: 00 02 01 00 3d 00 ca 03 00 00 df 42 ea 00 00 00 |....=......B....|
00000540: 11 ed 34 0e df 42 fd 00 00 00 11 ed 2a 0e df 42 |..4..B......*..B|
00000550: fe 00 00 00 11 ed 20 0e df 42 ff 00 00 00 11 ed |...... ..B......|
00000560: 16 0e df 42 00 01 00 00 11 ed 0c 0e 39 a7 00 00 |...B........9...|
00000570: 00 42 ea 00 00 00 28 c8 03 1e 1c 13 03 0f 07 16 |.B....(.........|
00000580: 30 1b 07 16 30 15 07 16 30 15 07 16 30 15 07 16 |0...0...0...0...|
00000590: 30 15 1b 08 00 05 09 0f 00 0c 43 06 01 cc 03 09 |0.........C.....|
000005a0: 01 09 02 00 02 6f 0a 70 00 01 00 da 03 00 01 00 |.....o.p........|
000005b0: dc 03 00 01 00 82 04 00 01 00 84 04 00 01 00 86 |................|
000005c0: 04 00 01 00 88 04 00 01 00 8a 04 00 01 00 8c 04 |................|
000005d0: 00 01 00 10 00 01 00 08 cb c7 d3 44 38 00 00 00 |...........D8...|
000005e0: c7 d4 44 ed 00 00 00 c7 d5 44 ee 00 00 00 c7 d6 |..D......D......|
000005f0: 44 01 01 00 00 c7 5d 04 00 44 02 01 00 00 c7 5d |D.....]..D.....]|
00000600: 05 00 ec 06 5d 05 00 ee 03 c2 00 44 07 01 00 00 |....]......D....|
00000610: c7 5d 06 00 ec 06 5d 06 00 ee 03 c2 01 44 08 01 |.]....]......D..|
00000620: 00 00 c7 5d 07 00 ec 06 5d 07 00 ee 02 07 44 05 |...]....].....D.|
00000630: 01 00 00 c7 5d 08 00 ec 06 5d 08 00 ee 03 bf 20 |....]....]..... |
00000640: 44 06 01 00 00 29 c8 03 2e 2b 07 0d 05 07 18 21 |D....)...+.....!|
00000650: 17 07 20 21 1f 07 2e 21 2d 07 3e 21 3d 07 16 2b |.. !...!-.>!=..+|
00000660: 15 07 1a 1b 10 3f 29 07 20 1b 16 3f 35 07 22 1b |.....?). ..?5.".|
00000670: 18 3a 39 07 2a 1b 20 00 0c 43 06 01 00 00 00 00 |.:9.*. ..C......|
00000680: 00 00 00 01 00 29 c8 03 02 31 21 00 0c 43 06 01 |.....)...1!..C..|
00000690: 00 00 00 00 00 00 00 01 00 29 c8 03 02 32 2a 00 |.........)...2*.|
000006a0: 0c 43 06 01 d0 03 03 01 03 02 00 00 18 04 92 04 |.C..............|
000006b0: 00 01 00 94 04 00 01 00 96 04 00 01 00 10 00 01 |................|
000006c0: 00 08 cb c7 d3 44 09 01 00 00 c7 d4 44 0a 01 00 |.....D......D...|
000006d0: 00 c7 d5 44 0b 01 00 00 29 c8 03 0e 3a 00 0d 08 |...D....)...:...|
000006e0: 07 22 21 21 07 18 21 17 07 1e 00 0c 43 06 01 00 |."!!..!.....C...|
000006f0: 00 01 00 01 00 00 09 01 10 00 01 00 08 cb c7 42 |...............B|
00000700: 0a 01 00 00 28 c8 03 06 41 24 12 29 1b 15 00 0c |....(...A$.)....|
00000710: 43 06 01 ce 03 03 01 03 03 01 00 27 04 70 00 01 |C..........'.p..|
00000720: 00 98 04 00 01 00 9a 04 00 01 00 10 00 01 00 ce |................|
00000730: 03 03 00 08 cb c7 d3 44 38 00 00 00 c7 d4 44 0c |.......D8.....D.|
00000740: 01 00 00 c7 d5 44 0d 01 00 00 df 42 eb 00 00 00 |.....D.....B....|
00000750: 43 0e 01 00 00 c7 24 01 00 29 c8 03 16 48 07 0d |C.....$..)...H..|
00000760: 05 07 18 21 17 07 22 21 21 07 24 21 23 07 1c 1b |...!.."!!.$!#...|
00000770: 0e 20 0a 00 07 02 39 0c 43 06 01 00 01 00 01 02 |. ....9.C.......|
00000780: 00 00 08 01 9e 04 00 01 00 04 10 01 00 00 d3 9f |................|
00000790: 30 c8 03 08 5c 0c 1c 3e 07 03 07 49 00 0c 43 06 |0...\..>...I..C.|
000007a0: 01 00 00 00 00 02 00 01 0e 00 39 a5 00 00 00 c2 |..........9.....|
000007b0: 00 f0 44 11 01 00 00 29 c8 03 0a 61 1a 03 2b 1b |..D....)...a..+.|
000007c0: 08 00 02 18 03 00 0c 43 06 01 00 00 01 00 01 00 |.......C........|
000007d0: 01 09 01 a4 04 00 00 40 01 b1 e2 f6 02 cb c2 00 |.......@........|
000007e0: 28 c8 03 04 62 13 2c 15 00 0c 43 06 01 00 00 00 |(...b.,...C.....|
000007f0: 00 03 01 0a 5a 00 a4 04 00 01 df 01 16 5d d5 7e |....Z........].~|
00000800: 9f df bf 0c a2 9f c1 00 af e7 c1 01 b0 df bf 13 |................|
00000810: a4 b0 c1 02 af e7 01 b1 67 56 16 9f df bc a2 9f |........gV......|
00000820: c1 03 af e7 c1 04 9f df bf 09 a2 b0 c1 05 af e7 |................|
00000830: c1 06 9f df ba a2 9f c1 07 af e7 c1 08 b0 df bf |................|
00000840: 10 a4 b0 c1 09 af e7 01 ff ff ff 0f af 01 00 00 |................|
00000850: 00 10 9d 28 c8 03 52 64 0f 04 0c 20 0a 07 22 11 |...(..Rd... ..".|
00000860: 0a 07 0f 11 20 0d 45 0c 0a 07 22 11 0a 07 0f 11 |.... .E...".....|
00000870: 22 0d 47 1b 0a 07 22 0c 0a 07 0f 11 1e 0d 43 0c |".G...".......C.|
00000880: 0a 07 22 11 0a 07 0f 11 1e 0d 43 0c 0a 07 22 0c |..".......C...".|
00000890: 0a 07 0f 11 1e 0d 43 0c 0a 07 22 11 0a 07 0f 11 |......C...".....|
000008a0: 22 0d 49 1b 0a 20 1a 07 33 00 06 00 00 e0 ff ff |".I.. ..3.......|
000008b0: ff ef 41 06 00 00 80 47 38 ec e8 41 06 00 00 e0 |..A....G8..A....|
000008c0: ff ff ff ef 41 06 00 00 e0 ff ff ff ef 41 06 00 |....A........A..|
000008d0: 00 80 8d 4c 74 ea 41 06 00 00 e0 ff ff ff ef 41 |...Lt.A........A|
000008e0: 06 00 00 a0 d8 08 ae ef 41 06 00 00 e0 ff ff ff |........A.......|
000008f0: ef 41 06 00 00 20 e1 49 ab e6 41 06 00 00 e0 ff |.A... .I..A.....|
00000900: ff ff ef 41 0c 43 06 01 00 02 05 02 02 01 01 32 |...A.C.........2|
00000910: 07 a6 04 00 01 40 a8 04 00 01 40 aa 04 00 00 40 |.....@....@....@|
00000920: d6 03 00 01 40 60 00 02 40 b2 01 00 03 40 f8 03 |....@`..@....@..|
00000930: 00 04 40 ce 03 03 00 c2 00 c5 04 df 26 00 00 44 |..@.........&..D|
00000940: 16 01 00 00 d4 f6 ec 06 26 00 00 ee 02 d4 d8 07 |........&.......|
00000950: cb df 42 eb 00 00 00 d0 eb cd df 26 00 00 44 17 |..B........&..D.|
00000960: 01 00 00 b7 ce c4 04 f0 29 c8 03 1e 74 1b 17 2d |........)...t..-|
00000970: 07 1c 2b 14 07 1e 2a 2e 18 61 07 1c 1c 1b 07 0c |..+...*..a......|
00000980: 0d 25 07 1c 00 0a 3c 1b 0c 0e 00 0c 43 06 01 f8 |.%....<.....C...|
00000990: 03 00 03 00 04 08 00 d1 01 03 b0 04 00 00 00 b2 |................|
000009a0: 04 00 01 00 b4 04 00 02 00 aa 04 00 01 b2 01 03 |................|
000009b0: 01 60 02 01 d6 03 01 01 a6 04 00 03 a8 04 01 03 |.`..............|
000009c0: f8 03 04 01 ce 03 00 00 df 11 ed 05 0e e0 e1 a5 |................|
000009d0: 6c 8c 00 00 00 df ec 06 df f0 e3 ee 54 e2 e0 93 |l...........T...|
000009e0: e4 48 cb 60 04 00 42 1b 01 00 00 ec 13 60 04 00 |.H.`..B......`..|
000009f0: 43 1b 01 00 00 c7 42 38 00 00 00 24 01 00 0e 60 |C.....B8...$...`|
00000a00: 05 00 43 1c 01 00 00 c7 42 38 00 00 00 24 01 00 |..C.....B8...$..|
00000a10: b6 a7 ec 10 c7 43 f9 00 00 00 60 04 00 24 01 00 |.....C....`..$..|
00000a20: 0e ee 0e c7 43 fc 00 00 00 60 04 00 24 01 00 e3 |....C....`..$...|
00000a30: df ec 96 38 1d 01 00 00 f6 ed 20 39 1d 01 00 00 |...8...... 9....|
00000a40: 42 1e 01 00 00 ec 82 39 1d 01 00 00 43 1e 01 00 |B......9....C...|
00000a50: 00 60 06 00 bf 19 24 02 00 29 ef 6d ff 60 04 00 |.`....$..).m.`..|
00000a60: 42 1f 01 00 00 ec 32 60 07 00 43 f3 00 00 00 60 |B.....2`..C....`|
00000a70: 07 00 42 17 01 00 00 24 01 00 cc 60 07 00 43 f6 |..B....$...`..C.|
00000a80: 00 00 00 bf 64 c8 9c 24 01 00 cd 60 04 00 43 1f |....d..$...`..C.|
00000a90: 01 00 00 c9 24 01 00 0e 29 c8 03 7a 7c 04 03 16 |....$...)..z|...|
00000aa0: 1b 20 07 10 07 03 21 29 12 1e 07 18 19 1d 07 0e |. ....!)........|
00000ab0: 07 0a 0c 0b 0d 1b 11 0c 26 0b 11 0c 1b 1a 07 0a |........&.......|
00000ac0: 1b 0b 17 23 11 1c 1b 12 07 0a 1b 0b 11 1e 07 03 |...#............|
00000ad0: 12 45 07 0a 1b 1e 11 01 23 07 07 0a 1b 12 11 01 |.E......#.......|
00000ae0: 19 3f 11 2e 1b 0e 11 24 1b 0c 26 6b 1b 0c 1b 18 |.?.....$..&k....|
00000af0: 1b 01 12 21 00 04 08 07 11 0c 26 0c 11 1c 1b 1e |...!......&.....|
00000b00: 11 1c 1b 1d 17 2f 11 1c 25 26 07 03 07 09 17 53 |...../..%&.....S|
00000b10: 11 0c 1b 1a 07 01 00 0c 43 06 01 00 00 03 00 03 |........C.......|
00000b20: 01 00 23 03 c0 04 00 00 00 d6 03 00 01 00 c2 04 |..#.............|
00000b30: 00 02 00 ce 03 03 00 b7 cb df 42 eb 00 00 00 cc |..........B.....|
00000b40: b7 cd c9 c8 eb a5 ec 11 c7 c8 c9 48 42 0d 01 00 |...........HB...|
00000b50: 00 eb 9f cb 95 02 ee eb c7 28 c8 03 23 9c 01 21 |.........(..#..!|
00000b60: 0e 1f 07 1c 2b 15 07 08 07 0c 07 0f 12 1b 07 14 |....+...........|
00000b70: 07 0e 07 01 07 06 1b 16 07 2d 0b 32 19 39 07 0d |.........-.2.9..|
00000b80: 00 0c 43 06 01 00 01 02 01 05 00 00 3c 03 c4 04 |..C.........<...|
00000b90: 00 01 00 c6 04 00 00 00 c2 04 00 01 00 b7 cb b7 |................|
00000ba0: cc c8 d3 eb a5 ec 18 c7 39 a5 00 00 00 43 23 01 |........9....C#.|
00000bb0: 00 00 d3 c8 48 24 01 00 9f cb 95 01 ee e4 39 a5 |....H$........9.|
00000bc0: 00 00 00 43 24 01 00 00 39 a5 00 00 00 42 25 01 |...C$...9....B%.|
00000bd0: 00 00 c7 d3 eb 9d 25 02 00 c8 03 2f a5 01 1f 18 |......%..../....|
00000be0: 15 07 08 07 0e 07 11 12 1b 07 0e 1b 08 1b 0a 07 |................|
00000bf0: 10 07 01 07 0f 11 15 0b 3a 19 3b 1b 08 1b 0a 1b |........:.;.....|
00000c00: 08 1b 08 07 0c 07 0e 07 11 07 37 00 0c 43 06 01 |..........7..C..|
00000c10: 00 01 02 01 05 00 00 41 03 cc 04 00 01 00 c6 04 |.......A........|
00000c20: 00 00 00 c2 04 00 01 00 b7 cb b7 cc c8 d3 eb a5 |................|
00000c30: ec 1d c7 39 a5 00 00 00 43 23 01 00 00 d3 c8 48 |...9....C#.....H|
00000c40: 42 0a 01 00 00 24 01 00 9f cb 95 01 ee df 39 a5 |B....$........9.|
00000c50: 00 00 00 43 24 01 00 00 39 a5 00 00 00 42 25 01 |...C$...9....B%.|
00000c60: 00 00 c7 d3 eb 9d 25 02 00 c8 03 31 ad 01 23 18 |......%....1..#.|
00000c70: 1d 07 08 07 18 07 1b 12 1b 07 0e 1b 08 1b 0a 07 |................|
00000c80: 1a 07 01 07 06 1b 1f 11 15 0b 44 19 45 1b 08 1b |..........D.E...|
00000c90: 0a 1b 08 1b 08 07 0c 07 18 07 1b 07 37 00 0c 43 |............7..C|
00000ca0: 06 01 00 01 03 01 05 00 00 56 04 cc 04 00 01 00 |.........V......|
00000cb0: c6 04 00 00 00 ce 04 00 01 00 c2 04 00 02 00 b7 |................|
00000cc0: cb 09 cc b7 cd c9 d3 eb a5 ec 2b d3 c9 48 42 0b |..........+..HB.|
00000cd0: 01 00 00 b7 ac ec 1b c7 39 a5 00 00 00 43 23 01 |........9....C#.|
00000ce0: 00 00 d3 c9 48 42 0b 01 00 00 24 01 00 9f cb 0a |....HB....$.....|
00000cf0: cc 95 02 ee d1 c8 ec 1c 39 a5 00 00 00 43 24 01 |........9....C$.|
00000d00: 00 00 39 a5 00 00 00 42 25 01 00 00 c7 d3 eb 9d |..9....B%.......|
00000d10: 25 02 00 b7 28 c8 03 45 b5 01 26 23 23 07 08 07 |%...(..E..&##...|
00000d20: 18 07 1b 12 13 07 1a 07 01 07 06 20 12 12 2f 07 |........... ../.|
00000d30: 0e 1b 08 1b 0a 07 1a 07 01 07 06 1b 1f 11 15 0d |................|
00000d40: 07 00 02 05 44 00 04 0c 4b 12 0e 1b 08 1b 0a 1b |....D...K.......|
00000d50: 08 1b 08 07 0c 07 18 07 1b 07 37 19 00 00 0c 43 |..........7....C|
00000d60: 06 01 00 01 00 01 03 00 00 1a 01 84 01 00 01 00 |................|
00000d70: d3 bf 64 a7 ec 0b d3 43 28 01 00 00 b7 25 01 00 |..d....C(....%..|
00000d80: d3 43 29 01 00 00 ba 25 01 00 c8 03 13 c7 01 1d |.C)....%........|
00000d90: 03 29 11 0c 12 02 07 0a 20 17 14 0e 07 0a 20 17 |.)...... ..... .|
00000da0: 00 0c 43 06 01 00 01 01 01 03 00 00 3a 02 c0 04 |..C.........:...|
00000db0: 00 01 00 10 00 01 00 08 cb c7 42 2a 01 00 00 43 |..........B*...C|
00000dc0: 0e 01 00 00 d3 24 01 00 0e c7 42 13 01 00 00 42 |.....$....B....B|
00000dd0: f7 00 00 00 ec 1b c7 42 13 01 00 00 43 f7 00 00 |.......B....C...|
00000de0: 00 d3 42 09 01 00 00 42 38 00 00 00 24 01 00 0e |..B....B8...$...|
00000df0: 29 c8 03 1f d1 01 26 0d 43 07 08 1b 10 1b 0c 07 |).....&.C.......|
00000e00: 01 1c 11 1b 0e 26 15 07 08 1b 0e 1b 18 07 0c 1b |.....&..........|
00000e10: 14 1b 21 00 0c 43 06 01 00 00 07 00 04 01 00 e1 |..!..C..........|
00000e20: 01 07 d6 04 00 00 00 b2 04 00 01 00 b4 04 00 02 |................|
00000e30: 00 d8 04 00 03 00 da 04 00 04 00 dc 04 00 05 00 |................|
00000e40: 10 00 01 00 ce 03 03 00 08 c5 06 df 43 f4 00 00 |............C...|
00000e50: 00 c4 06 42 2a 01 00 00 24 01 00 cb c4 06 42 0c |...B*...$.....B.|
00000e60: 01 00 00 b7 48 c7 9d cc df 42 17 01 00 00 43 0e |....H....B....C.|
00000e70: 01 00 00 c8 24 01 00 0e c4 06 42 13 01 00 00 42 |....$.....B....B|
00000e80: f8 00 00 00 ec 27 df 43 f6 00 00 00 bf 64 c8 9c |.....'.C.....d..|
00000e90: 24 01 00 cd c4 06 42 13 01 00 00 43 f8 00 00 00 |$.....B....C....|
00000ea0: c4 06 42 38 00 00 00 c9 24 02 00 0e c4 06 42 0c |..B8....$.....B.|
00000eb0: 01 00 00 eb b9 ab ec 71 df 43 f5 00 00 00 c4 06 |.......q.C......|
00000ec0: 42 2a 01 00 00 24 01 00 d2 b7 ac ec 5c c4 06 42 |B*...$......\..B|
00000ed0: 0c 01 00 00 b8 48 ca 9d c5 04 df 42 17 01 00 00 |.....H.....B....|
00000ee0: 43 0e 01 00 00 c4 04 24 01 00 0e c4 06 42 13 01 |C......$.....B..|
00000ef0: 00 00 42 f8 00 00 00 ec 30 df 43 f6 00 00 00 bf |..B.....0.C.....|
00000f00: 64 c4 04 9c 24 01 00 c5 05 c4 06 42 13 01 00 00 |d...$......B....|
00000f10: 43 f8 00 00 00 c4 06 42 38 00 00 00 04 2f 01 00 |C......B8..../..|
00000f20: 00 9f c4 05 24 02 00 0e 29 c8 03 77 d8 01 28 12 |....$...)..w..(.|
00000f30: 31 07 1c 25 2e 1b 09 21 35 20 14 07 0c 07 03 0d |1..%...!5 ......|
00000f40: 3b 07 1c 1b 0e 1b 0c 07 01 21 23 1b 0e 26 0a 07 |;........!#..&..|
00000f50: 1c 25 26 07 03 07 09 17 53 0c 08 1b 0e 25 24 1b |.%&.....S....%$.|
00000f60: 0e 07 17 22 27 1b 14 0c 10 12 07 07 1c 25 34 1b |..."'........%4.|
00000f70: 09 12 61 0c 18 1c 16 20 14 07 0c 07 03 12 49 07 |..a.... ......I.|
00000f80: 1c 1b 0e 1b 0c 0c 01 21 23 1b 0e 26 18 07 1c 25 |.......!#..&...%|
00000f90: 26 0c 03 07 09 1c 61 0c 08 1b 0e 25 24 34 0c 07 |&.....a....%$4..|
00000fa0: 1a 0c 2f 00 0c 43 06 01 00 01 01 01 04 01 00 30 |../..C.........0|
00000fb0: 02 a6 04 00 01 00 10 00 01 00 ce 03 03 00 08 cb |................|
00000fc0: df 42 17 01 00 00 43 0e 01 00 00 b8 24 01 00 0e |.B....C.....$...|
00000fd0: d3 42 f8 00 00 00 ec 16 d3 43 f8 00 00 00 c7 42 |.B.......C.....B|
00000fe0: 38 00 00 00 04 30 01 00 00 24 02 00 0e 29 c8 03 |8....0...$...)..|
00000ff0: 17 ec 01 29 0d 49 07 1c 1b 0e 20 0a 17 2b 07 0c |...).I.... ..+..|
00001000: 26 0b 07 0c 20 24 34 09 00 0c 43 06 01 00 01 01 |&... $4...C.....|
00001010: 01 04 00 00 48 02 e2 04 00 01 00 10 00 01 00 08 |....H...........|
00001020: cb c7 42 13 01 00 00 42 fa 00 00 00 ec 17 c7 42 |..B....B.......B|
00001030: 13 01 00 00 43 fa 00 00 00 c7 42 38 00 00 00 d3 |....C.....B8....|
00001040: 24 02 00 0e c7 42 13 01 00 00 42 f7 00 00 00 ec |$....B....B.....|
00001050: 16 c7 42 13 01 00 00 43 f7 00 00 00 c7 42 38 00 |..B....C.....B8.|
00001060: 00 00 24 01 00 0e 29 c8 03 21 f3 01 27 12 35 1b |..$...)..!..'.5.|
00001070: 0e 26 15 07 08 1b 0e 20 22 1b 0e 07 17 1d 25 1b |.&..... ".....%.|
00001080: 0e 26 15 07 08 1b 0e 20 20 1b 09 00 0c 43 06 01 |.&.....  ....C..|
00001090: 00 02 07 02 07 02 01 cb 01 09 92 04 00 01 40 e4 |..............@.|
000010a0: 04 00 01 00 de 03 00 00 00 da 03 00 01 00 dc 03 |................|
000010b0: 00 02 40 e6 04 00 03 00 e8 04 00 04 00 ea 04 00 |..@.............|
000010c0: 05 00 10 00 01 00 ce 03 03 00 d0 03 02 00 08 c5 |................|
000010d0: 06 c2 00 ce df 42 ef 00 00 00 cf 42 ed 00 00 00 |.....B.....B....|
000010e0: 39 47 00 00 00 ae ec 09 c7 42 ed 00 00 00 ee 07 |9G.......B......|
000010f0: d3 42 ed 00 00 00 cc c7 42 ee 00 00 00 39 47 00 |.B......B....9G.|
00001100: 00 00 ae ec 09 c7 42 ee 00 00 00 ee 07 d3 42 ee |......B.......B.|
00001110: 00 00 00 cd c8 98 ec 14 d4 07 ab ec 0f 0b b7 4e |...............N|
00001120: 36 01 00 00 b7 4e 37 01 00 00 d8 d4 07 ab ec 13 |6....N7.........|
00001130: ca 07 f1 0e 0b b7 4e 36 01 00 00 b7 4e 37 01 00 |......N6....N7..|
00001140: 00 28 ca d4 f1 0e d4 42 36 01 00 00 d3 42 06 01 |.(.....B6....B..|
00001150: 00 00 a5 ec 03 d4 28 d4 42 37 01 00 00 c0 e8 03 |......(.B7......|
00001160: 9c d4 42 36 01 00 00 9d c5 04 d3 42 05 01 00 00 |..B6.......B....|
00001170: 07 ac ec 0c d3 43 05 01 00 00 24 00 00 ee 02 b7 |.....C....$.....|
00001180: c5 05 c4 06 43 f7 00 00 00 e0 11 d3 c4 04 c4 05 |....C...........|
00001190: 21 03 00 24 01 00 0e 07 28 c8 03 79 fd 01 2e 21 |!..$....(..y...!|
000011a0: 39 07 1c 1c 17 07 0c 1b 1c 1b 07 12 31 07 0c 26 |9...........1..&|
000011b0: 0b 07 12 21 0e 07 0c 1b 2a 1b 07 12 4d 07 0c 26 |...!....*...M..&|
000011c0: 0b 07 12 00 06 22 13 16 18 0c 0a 12 23 4a 00 0c |....."......#J..|
000011d0: 0a 12 09 0c 0e 4e 0d 0a 00 07 10 07 01 0e 05 07 |.....N..........|
000011e0: 08 1b 10 07 12 1b 15 12 05 07 0d 08 10 07 08 2a |...............*|
000011f0: 12 07 14 07 08 1b 0b 12 2b 07 12 20 16 11 16 07 |........+.. ....|
00001200: 12 1b 14 2b 79 0c 08 1b 20 0c 20 07 16 0c 0c 0c |...+y... . .....|
00001210: 23 11 27 1c 1d 00 0c 43 06 01 e6 04 01 03 01 03 |#.'....C........|
00001220: 02 00 5c 04 e4 04 00 01 00 ee 04 00 00 00 f0 04 |..\.............|
00001230: 00 01 00 c2 04 00 02 00 dc 03 02 01 92 04 00 03 |................|
00001240: b7 cb 39 a7 00 00 00 11 21 00 00 cc b7 cd df ec |..9.....!.......|
00001250: 0b c9 e0 42 01 01 00 00 a5 ee 06 c7 c0 e8 03 a5 |...B............|
00001260: ec 1b e0 43 02 01 00 00 24 00 00 0e 39 a7 00 00 |...C....$...9...|
00001270: 00 11 21 00 00 c8 a0 cb 95 02 ee d3 d3 07 ac ec |..!.............|
00001280: 1b d3 43 36 01 00 00 c9 9f 44 36 01 00 00 d3 43 |..C6.....D6....C|
00001290: 37 01 00 00 c7 9f 44 37 01 00 00 29 c8 03 3d 85 |7.....D7...)..=.|
000012a0: 02 04 0e 28 20 08 23 05 12 19 07 08 07 12 1b 15 |...( .#.........|
000012b0: 11 4c 16 10 12 5f 07 12 1b 08 17 02 20 08 11 0a |.L..._...... ...|
000012c0: 07 03 00 02 03 4a 00 04 08 73 0c 0a 12 09 07 08 |.....J...s......|
000012d0: 1b 12 07 05 21 13 07 08 1b 18 07 05 00 0c 43 06 |....!.........C.|
000012e0: 01 00 01 08 01 02 01 03 3e 09 a6 04 00 01 00 60 |........>......`|
000012f0: 00 00 40 b2 01 00 01 40 b0 04 00 02 40 e4 04 00 |..@....@....@...|
00001300: 03 40 f2 04 00 04 40 f4 04 00 05 40 f6 04 00 06 |.@....@....@....|
00001310: 40 10 00 01 00 ce 03 03 00 08 c5 07 c2 00 c5 04 |@...............|
00001320: c2 01 c5 05 c2 02 c5 06 df 43 f0 00 00 00 24 00 |.........C....$.|
00001330: 00 0e c4 07 26 00 00 44 2a 01 00 00 c4 07 d3 44 |....&..D*......D|
00001340: 13 01 00 00 c4 07 42 0d 01 00 00 eb cb b7 cc c4 |......B.........|
00001350: 07 cd c4 04 23 00 00 c8 03 1b ab 02 23 4e 3d 07 |....#.......#N=.|
00001360: 1c 1b 12 17 2d 0c 08 2b 07 0c 1c 2b 06 1b 16 00 |....-..+...+....|
00001370: 07 56 29 0c 0d 00 0c 43 06 01 f2 04 00 01 00 04 |.V)....C........|
00001380: 04 00 41 01 f8 04 05 00 03 b2 01 01 01 60 00 01 |..A..........`..|
00001390: b0 04 02 01 f4 04 05 01 df e0 a5 ec 31 6f 18 00 |............1o..|
000013a0: 00 00 e1 42 0d 01 00 00 df 48 43 07 01 00 00 24 |...B.....HC....$|
000013b0: 00 00 0e 0e ee 16 cb 6f 12 00 00 00 e1 43 fa 00 |.......o.....C..|
000013c0: 00 00 c7 24 01 00 0e 07 72 28 30 e2 28 e1 43 f8 |...$....r(0.(.C.|
000013d0: 00 00 00 24 00 00 0e 07 28 c8 03 2b b6 02 04 03 |...$....(..+....|
000013e0: 10 07 10 07 03 2c 03 07 0a 1b 18 07 01 07 0e 1b |.....,..........|
000013f0: 0c 46 39 07 0a 1b 1a 07 01 1c 21 13 06 07 0d 09 |.F9.......!.....|
00001400: 07 07 0a 1b 1a 1c 23 00 0c 43 06 01 f4 04 00 01 |......#..C......|
00001410: 00 05 05 00 3c 01 f8 04 03 00 03 b0 04 02 01 b2 |....<...........|
00001420: 01 01 01 e4 04 03 01 f6 04 06 01 f4 04 05 01 6f |...............o|
00001430: 1a 00 00 00 df 43 fb 00 00 00 df 42 0d 01 00 00 |.....C.....B....|
00001440: e0 48 e1 24 02 00 e5 0e ee 16 cb 6f 12 00 00 00 |.H.$.......o....|
00001450: df 43 fa 00 00 00 c7 24 01 00 0e 07 72 28 30 e1 |.C.....$....r(0.|
00001460: 07 ab ec 03 e2 28 60 04 00 f0 28 c8 03 29 c4 02 |.....(`...(..)..|
00001470: 04 1d 1e 07 0a 1b 28 07 0a 1b 18 07 01 07 12 07 |......(.........|
00001480: 33 46 3d 07 0a 1b 1a 07 01 1c 21 14 08 0c 0a 11 |3F=.......!.....|
00001490: 16 0c 24 11 20 07 73 00 0c 43 06 01 f6 04 00 01 |..$. .s..C......|
000014a0: 00 04 03 00 32 01 f8 04 03 00 03 b0 04 02 01 b2 |....2...........|
000014b0: 01 01 01 f2 04 04 01 6f 1a 00 00 00 df 42 0d 01 |.......o.....B..|
000014c0: 00 00 e0 93 e4 48 43 08 01 00 00 24 00 00 0e 0e |.....HC....$....|
000014d0: ee 16 cb 6f 12 00 00 00 df 43 fa 00 00 00 c7 24 |...o.....C.....$|
000014e0: 01 00 0e 07 72 28 30 e1 28 c8 03 1f cf 02 04 1d |....r(0.(.......|
000014f0: 10 07 0a 1b 18 07 0a 0c 0b 07 12 1b 12 46 43 07 |.............FC.|
00001500: 0a 1b 1a 07 01 1c 21 13 06 07 0d 00             |......!.....|
```

### WASM
```
00000000: 05 59 52 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |.YR__tests__/fix|
00000010: 74 75 72 65 73 5f 71 75 69 63 6b 6a 73 2f 6f 63 |tures_quickjs/oc|
00000020: 74 61 6e 65 2f 62 61 73 65 2e 6a 73 16 70 65 72 |tane/base.js.per|
00000030: 66 6f 72 6d 61 6e 63 65 12 42 65 6e 63 68 6d 61 |formance.Benchma|
00000040: 72 6b 1c 42 65 6e 63 68 6d 61 72 6b 53 75 69 74 |rk.BenchmarkSuit|
00000050: 65 1e 42 65 6e 63 68 6d 61 72 6b 52 65 73 75 6c |e.BenchmarkResul|
00000060: 74 0a 61 6c 65 72 74 06 6e 6f 77 0c 73 75 69 74 |t.alert.now.suit|
00000070: 65 73 0e 76 65 72 73 69 6f 6e 10 64 6f 57 61 72 |es.version.doWar|
00000080: 6d 75 70 1e 64 6f 44 65 74 65 72 6d 69 6e 69 73 |mup.doDeterminis|
00000090: 74 69 63 0c 63 6f 6e 66 69 67 10 52 65 73 65 74 |tic.config.Reset|
000000a0: 52 4e 47 12 52 75 6e 53 75 69 74 65 73 1e 43 6f |RNG.RunSuites.Co|
000000b0: 75 6e 74 42 65 6e 63 68 6d 61 72 6b 73 1a 47 65 |untBenchmarks.Ge|
000000c0: 6f 6d 65 74 72 69 63 4d 65 61 6e 22 47 65 6f 6d |ometricMean"Geom|
000000d0: 65 74 72 69 63 4d 65 61 6e 54 69 6d 65 28 47 65 |etricMeanTime(Ge|
000000e0: 6f 6d 65 74 72 69 63 4d 65 61 6e 4c 61 74 65 6e |ometricMeanLaten|
000000f0: 63 79 16 46 6f 72 6d 61 74 53 63 6f 72 65 14 4e |cy.FormatScore.N|
00000100: 6f 74 69 66 79 53 74 65 70 18 4e 6f 74 69 66 79 |otifyStep.Notify|
00000110: 52 65 73 75 6c 74 1a 4e 6f 74 69 66 79 53 6b 69 |Result.NotifySki|
00000120: 70 70 65 64 16 4e 6f 74 69 66 79 45 72 72 6f 72 |pped.NotifyError|
00000130: 24 52 75 6e 53 69 6e 67 6c 65 42 65 6e 63 68 6d |$RunSingleBenchm|
00000140: 61 72 6b 0e 52 75 6e 53 74 65 70 0c 6d 6f 7a 4e |ark.RunStep.mozN|
00000150: 6f 77 0a 6d 73 4e 6f 77 08 6f 4e 6f 77 12 77 65 |ow.msNow.oNow.we|
00000160: 62 6b 69 74 4e 6f 77 2e 64 65 74 65 72 6d 69 6e |bkitNow.determin|
00000170: 69 73 74 69 63 49 74 65 72 61 74 69 6f 6e 73 06 |isticIterations.|
00000180: 72 75 6e 0a 73 65 74 75 70 10 74 65 61 72 44 6f |run.setup.tearDo|
00000190: 77 6e 12 72 6d 73 52 65 73 75 6c 74 1a 6d 69 6e |wn.rmsResult.min|
000001a0: 49 74 65 72 61 74 69 6f 6e 73 0a 53 65 74 75 70 |Iterations.Setup|
000001b0: 10 54 65 61 72 44 6f 77 6e 12 62 65 6e 63 68 6d |.TearDown.benchm|
000001c0: 61 72 6b 08 74 69 6d 65 0e 6c 61 74 65 6e 63 79 |ark.time.latency|
000001d0: 12 72 65 66 65 72 65 6e 63 65 14 62 65 6e 63 68 |.reference.bench|
000001e0: 6d 61 72 6b 73 08 70 75 73 68 02 73 38 41 6c 65 |marks.push.s8Ale|
000001f0: 72 74 20 63 61 6c 6c 65 64 20 77 69 74 68 20 61 |rt called with a|
00000200: 72 67 75 6d 65 6e 74 3a 20 0c 72 61 6e 64 6f 6d |rgument: .random|
00000210: 08 73 65 65 64 0c 72 75 6e 6e 65 72 1c 73 6b 69 |.seed.runner.ski|
00000220: 70 42 65 6e 63 68 6d 61 72 6b 73 18 63 6f 6e 74 |pBenchmarks.cont|
00000230: 69 6e 75 61 74 69 6f 6e 0a 70 72 69 6e 74 0c 73 |inuation.print.s|
00000240: 63 6f 72 65 73 0a 73 75 69 74 65 0a 73 63 6f 72 |cores.suite.scor|
00000250: 65 12 66 6f 72 6d 61 74 74 65 64 16 4e 6f 74 69 |e.formatted.Noti|
00000260: 66 79 53 74 61 72 74 0e 69 6e 64 65 78 4f 66 0c |fyStart.indexOf.|
00000270: 77 69 6e 64 6f 77 14 73 65 74 54 69 6d 65 6f 75 |window.setTimeou|
00000280: 74 16 4e 6f 74 69 66 79 53 63 6f 72 65 0c 72 65 |t.NotifyScore.re|
00000290: 73 75 6c 74 02 69 0e 6e 75 6d 62 65 72 73 06 6c |sult.i.numbers.l|
000002a0: 6f 67 06 70 6f 77 02 45 18 6d 65 61 73 75 72 65 |og.pow.E.measure|
000002b0: 6d 65 6e 74 73 20 68 61 73 4c 61 74 65 6e 63 79 |ments hasLatency|
000002c0: 52 65 73 75 6c 74 0e 74 6f 46 69 78 65 64 16 74 |Result.toFixed.t|
000002d0: 6f 50 72 65 63 69 73 69 6f 6e 0e 72 65 73 75 6c |oPrecision.resul|
000002e0: 74 73 08 6d 65 61 6e 16 6d 65 61 6e 4c 61 74 65 |ts.mean.meanLate|
000002f0: 6e 63 79 18 73 63 6f 72 65 4c 61 74 65 6e 63 79 |ncy.scoreLatency|
00000300: 20 66 6f 72 6d 61 74 74 65 64 4c 61 74 65 6e 63 | formattedLatenc|
00000310: 79 0e 4c 61 74 65 6e 63 79 0e 53 6b 69 70 70 65 |y.Latency.Skippe|
00000320: 64 0a 65 72 72 6f 72 08 64 61 74 61 0e 4d 65 61 |d.error.data.Mea|
00000330: 73 75 72 65 08 75 73 65 63 06 72 6d 73 08 72 75 |sure.usec.rms.ru|
00000340: 6e 73 0e 65 6c 61 70 73 65 64 0a 73 74 61 72 74 |ns.elapsed.start|
00000350: 18 52 75 6e 4e 65 78 74 53 65 74 75 70 20 52 75 |.RunNextSetup Ru|
00000360: 6e 4e 65 78 74 42 65 6e 63 68 6d 61 72 6b 1e 52 |nNextBenchmark.R|
00000370: 75 6e 4e 65 78 74 54 65 61 72 44 6f 77 6e 02 65 |unNextTearDown.e|
00000380: 0d c8 03 00 03 00 00 ca 03 00 01 cc 03 00 03 ce |................|
00000390: 03 00 00 00 0c 20 06 01 a4 01 00 00 00 03 05 14 |..... ..........|
000003a0: e7 01 00 ca 03 00 01 cc 03 01 01 d0 03 02 01 ce |................|
000003b0: 03 03 01 d2 03 04 01 08 ec 0b c2 01 e4 c2 02 e5 |................|
000003c0: c2 04 e6 29 df 11 ed 03 0e 0b e7 c2 00 f0 44 ea |...)..........D.|
000003d0: 00 00 00 e1 42 3d 00 00 00 c2 03 44 3b 00 00 00 |....B=.....D;...|
000003e0: e2 26 00 00 44 eb 00 00 00 e2 c1 05 44 ec 00 00 |.&..D.......D...|
000003f0: 00 e2 0b 39 47 00 00 00 4e ed 00 00 00 39 47 00 |...9G...N....9G.|
00000400: 00 00 4e ee 00 00 00 44 ef 00 00 00 c2 06 4f e9 |..N....D......O.|
00000410: 00 00 00 61 04 00 e2 c2 07 44 f0 00 00 00 e2 c2 |...a.....D......|
00000420: 08 44 f1 00 00 00 e2 c2 09 44 f2 00 00 00 e2 c2 |.D.......D......|
00000430: 0a 44 f3 00 00 00 e2 c2 0b 44 f4 00 00 00 e2 c2 |.D.......D......|
00000440: 0c 44 f5 00 00 00 e2 c2 0d 44 f6 00 00 00 e2 42 |.D.......D.....B|
00000450: 3d 00 00 00 c2 0e 44 f7 00 00 00 e2 42 3d 00 00 |=.....D.....B=..|
00000460: 00 c2 0f 44 f8 00 00 00 e2 42 3d 00 00 00 c2 10 |...D.....B=.....|
00000470: 44 f9 00 00 00 e2 42 3d 00 00 00 c2 11 44 fa 00 |D.....B=.....D..|
00000480: 00 00 e2 42 3d 00 00 00 c2 12 44 fb 00 00 00 e2 |...B=.....D.....|
00000490: 42 3d 00 00 00 c2 13 44 fc 00 00 00 06 2f c8 03 |B=.....D...../..|
000004a0: 86 01 00 00 00 0d 36 32 21 31 07 16 00 02 0e 11 |......62!1......|
000004b0: 00 06 3c 03 07 1e 1b 14 00 07 1c 31 07 1c 00 08 |..<........1....|
000004c0: 08 1b 07 1c 00 07 08 1b 07 1c 08 00 35 0e 00 19 |............5...|
000004d0: 10 29 07 1c 00 07 26 1b 07 1c 00 07 50 1b 07 1c |.)....&.....P...|
000004e0: 00 07 12 1b 07 1c 00 07 10 1b 07 1c 00 07 10 1b |................|
000004f0: 07 1c 00 07 24 1b 07 1c 00 07 14 1b 07 1c 1b 14 |....$...........|
00000500: 00 07 0e 2f 07 1c 1b 14 00 07 28 2f 07 1c 1b 14 |.../......(/....|
00000510: 00 07 0e 2f 07 1c 1b 14 00 07 14 2f 07 1c 1b 14 |.../......./....|
00000520: 00 07 5c 2f 07 1c 1b 14 00 0c 43 06 01 00 00 00 |..\/......C.....|
00000530: 00 02 01 00 3d 00 ca 03 00 00 df 42 ea 00 00 00 |....=......B....|
00000540: 11 ed 34 0e df 42 fd 00 00 00 11 ed 2a 0e df 42 |..4..B......*..B|
00000550: fe 00 00 00 11 ed 20 0e df 42 ff 00 00 00 11 ed |...... ..B......|
00000560: 16 0e df 42 00 01 00 00 11 ed 0c 0e 39 a7 00 00 |...B........9...|
00000570: 00 42 ea 00 00 00 28 c8 03 1e 1c 13 03 0f 07 16 |.B....(.........|
00000580: 30 1b 07 16 30 15 07 16 30 15 07 16 30 15 07 16 |0...0...0...0...|
00000590: 30 15 1b 08 00 05 09 0f 00 0c 43 06 01 cc 03 09 |0.........C.....|
000005a0: 01 09 02 00 02 6f 0a 70 00 01 00 da 03 00 01 00 |.....o.p........|
000005b0: dc 03 00 01 00 82 04 00 01 00 84 04 00 01 00 86 |................|
000005c0: 04 00 01 00 88 04 00 01 00 8a 04 00 01 00 8c 04 |................|
000005d0: 00 01 00 10 00 01 00 08 cb c7 d3 44 38 00 00 00 |...........D8...|
000005e0: c7 d4 44 ed 00 00 00 c7 d5 44 ee 00 00 00 c7 d6 |..D......D......|
000005f0: 44 01 01 00 00 c7 5d 04 00 44 02 01 00 00 c7 5d |D.....]..D.....]|
00000600: 05 00 ec 06 5d 05 00 ee 03 c2 00 44 07 01 00 00 |....]......D....|
00000610: c7 5d 06 00 ec 06 5d 06 00 ee 03 c2 01 44 08 01 |.]....]......D..|
00000620: 00 00 c7 5d 07 00 ec 06 5d 07 00 ee 02 07 44 05 |...]....].....D.|
00000630: 01 00 00 c7 5d 08 00 ec 06 5d 08 00 ee 03 bf 20 |....]....]..... |
00000640: 44 06 01 00 00 29 c8 03 2e 2b 07 0d 05 07 18 21 |D....)...+.....!|
00000650: 17 07 20 21 1f 07 2e 21 2d 07 3e 21 3d 07 16 2b |.. !...!-.>!=..+|
00000660: 15 07 1a 1b 10 3f 29 07 20 1b 16 3f 35 07 22 1b |.....?). ..?5.".|
00000670: 18 3a 39 07 2a 1b 20 00 0c 43 06 01 00 00 00 00 |.:9.*. ..C......|
00000680: 00 00 00 01 00 29 c8 03 02 31 21 00 0c 43 06 01 |.....)...1!..C..|
00000690: 00 00 00 00 00 00 00 01 00 29 c8 03 02 32 2a 00 |.........)...2*.|
000006a0: 0c 43 06 01 d0 03 03 01 03 02 00 00 18 04 92 04 |.C..............|
000006b0: 00 01 00 94 04 00 01 00 96 04 00 01 00 10 00 01 |................|
000006c0: 00 08 cb c7 d3 44 09 01 00 00 c7 d4 44 0a 01 00 |.....D......D...|
000006d0: 00 c7 d5 44 0b 01 00 00 29 c8 03 0e 3a 00 0d 08 |...D....)...:...|
000006e0: 07 22 21 21 07 18 21 17 07 1e 00 0c 43 06 01 00 |."!!..!.....C...|
000006f0: 00 01 00 01 00 00 09 01 10 00 01 00 08 cb c7 42 |...............B|
00000700: 0a 01 00 00 28 c8 03 06 41 24 12 29 1b 15 00 0c |....(...A$.)....|
00000710: 43 06 01 ce 03 03 01 03 03 01 00 27 04 70 00 01 |C..........'.p..|
00000720: 00 98 04 00 01 00 9a 04 00 01 00 10 00 01 00 ce |................|
00000730: 03 03 00 08 cb c7 d3 44 38 00 00 00 c7 d4 44 0c |.......D8.....D.|
00000740: 01 00 00 c7 d5 44 0d 01 00 00 df 42 eb 00 00 00 |.....D.....B....|
00000750: 43 0e 01 00 00 c7 24 01 00 29 c8 03 16 48 07 0d |C.....$..)...H..|
00000760: 05 07 18 21 17 07 22 21 21 07 24 21 23 07 1c 1b |...!.."!!.$!#...|
00000770: 0e 20 0a 00 07 02 39 0c 43 06 01 00 01 00 01 02 |. ....9.C.......|
00000780: 00 00 08 01 9e 04 00 01 00 04 10 01 00 00 d3 9f |................|
00000790: 30 c8 03 08 5c 0c 1c 3e 07 03 07 49 00 0c 43 06 |0...\..>...I..C.|
000007a0: 01 00 00 00 00 02 00 01 0e 00 39 a5 00 00 00 c2 |..........9.....|
000007b0: 00 f0 44 11 01 00 00 29 c8 03 0a 61 1a 03 2b 1b |..D....)...a..+.|
000007c0: 08 00 02 18 03 00 0c 43 06 01 00 00 01 00 01 00 |.......C........|
000007d0: 01 09 01 a4 04 00 00 40 01 b1 e2 f6 02 cb c2 00 |.......@........|
000007e0: 28 c8 03 04 62 13 2c 15 00 0c 43 06 01 00 00 00 |(...b.,...C.....|
000007f0: 00 03 01 0a 5a 00 a4 04 00 01 df 01 16 5d d5 7e |....Z........].~|
00000800: 9f df bf 0c a2 9f c1 00 af e7 c1 01 b0 df bf 13 |................|
00000810: a4 b0 c1 02 af e7 01 b1 67 56 16 9f df bc a2 9f |........gV......|
00000820: c1 03 af e7 c1 04 9f df bf 09 a2 b0 c1 05 af e7 |................|
00000830: c1 06 9f df ba a2 9f c1 07 af e7 c1 08 b0 df bf |................|
00000840: 10 a4 b0 c1 09 af e7 01 ff ff ff 0f af 01 00 00 |................|
00000850: 00 10 9d 28 c8 03 52 64 0f 04 0c 20 0a 07 22 11 |...(..Rd... ..".|
00000860: 0a 07 0f 11 20 0d 45 0c 0a 07 22 11 0a 07 0f 11 |.... .E...".....|
00000870: 22 0d 47 1b 0a 07 22 0c 0a 07 0f 11 1e 0d 43 0c |".G...".......C.|
00000880: 0a 07 22 11 0a 07 0f 11 1e 0d 43 0c 0a 07 22 0c |..".......C...".|
00000890: 0a 07 0f 11 1e 0d 43 0c 0a 07 22 11 0a 07 0f 11 |......C...".....|
000008a0: 22 0d 49 1b 0a 20 1a 07 33 00 06 00 00 e0 ff ff |".I.. ..3.......|
000008b0: ff ef 41 06 00 00 80 47 38 ec e8 41 06 00 00 e0 |..A....G8..A....|
000008c0: ff ff ff ef 41 06 00 00 e0 ff ff ff ef 41 06 00 |....A........A..|
000008d0: 00 80 8d 4c 74 ea 41 06 00 00 e0 ff ff ff ef 41 |...Lt.A........A|
000008e0: 06 00 00 a0 d8 08 ae ef 41 06 00 00 e0 ff ff ff |........A.......|
000008f0: ef 41 06 00 00 20 e1 49 ab e6 41 06 00 00 e0 ff |.A... .I..A.....|
00000900: ff ff ef 41 0c 43 06 01 00 02 05 02 02 01 01 32 |...A.C.........2|
00000910: 07 a6 04 00 01 40 a8 04 00 01 40 aa 04 00 00 40 |.....@....@....@|
00000920: d6 03 00 01 40 60 00 02 40 b2 01 00 03 40 f8 03 |....@`..@....@..|
00000930: 00 04 40 ce 03 03 00 c2 00 c5 04 df 26 00 00 44 |..@.........&..D|
00000940: 16 01 00 00 d4 f6 ec 06 26 00 00 ee 02 d4 d8 07 |........&.......|
00000950: cb df 42 eb 00 00 00 d0 eb cd df 26 00 00 44 17 |..B........&..D.|
00000960: 01 00 00 b7 ce c4 04 f0 29 c8 03 1e 74 1b 17 2d |........)...t..-|
00000970: 07 1c 2b 14 07 1e 2a 2e 18 61 07 1c 1c 1b 07 0c |..+...*..a......|
00000980: 0d 25 07 1c 00 0a 3c 1b 0c 0e 00 0c 43 06 01 f8 |.%....<.....C...|
00000990: 03 00 03 00 04 08 00 d1 01 03 b0 04 00 00 00 b2 |................|
000009a0: 04 00 01 00 b4 04 00 02 00 aa 04 00 01 b2 01 03 |................|
000009b0: 01 60 02 01 d6 03 01 01 a6 04 00 03 a8 04 01 03 |.`..............|
000009c0: f8 03 04 01 ce 03 00 00 df 11 ed 05 0e e0 e1 a5 |................|
000009d0: 6c 8c 00 00 00 df ec 06 df f0 e3 ee 54 e2 e0 93 |l...........T...|
000009e0: e4 48 cb 60 04 00 42 1b 01 00 00 ec 13 60 04 00 |.H.`..B......`..|
000009f0: 43 1b 01 00 00 c7 42 38 00 00 00 24 01 00 0e 60 |C.....B8...$...`|
00000a00: 05 00 43 1c 01 00 00 c7 42 38 00 00 00 24 01 00 |..C.....B8...$..|
00000a10: b6 a7 ec 10 c7 43 f9 00 00 00 60 04 00 24 01 00 |.....C....`..$..|
00000a20: 0e ee 0e c7 43 fc 00 00 00 60 04 00 24 01 00 e3 |....C....`..$...|
00000a30: df ec 96 38 1d 01 00 00 f6 ed 20 39 1d 01 00 00 |...8...... 9....|
00000a40: 42 1e 01 00 00 ec 82 39 1d 01 00 00 43 1e 01 00 |B......9....C...|
00000a50: 00 60 06 00 bf 19 24 02 00 29 ef 6d ff 60 04 00 |.`....$..).m.`..|
00000a60: 42 1f 01 00 00 ec 32 60 07 00 43 f3 00 00 00 60 |B.....2`..C....`|
00000a70: 07 00 42 17 01 00 00 24 01 00 cc 60 07 00 43 f6 |..B....$...`..C.|
00000a80: 00 00 00 bf 64 c8 9c 24 01 00 cd 60 04 00 43 1f |....d..$...`..C.|
00000a90: 01 00 00 c9 24 01 00 0e 29 c8 03 7a 7c 04 03 16 |....$...)..z|...|
00000aa0: 1b 20 07 10 07 03 21 29 12 1e 07 18 19 1d 07 0e |. ....!)........|
00000ab0: 07 0a 0c 0b 0d 1b 11 0c 26 0b 11 0c 1b 1a 07 0a |........&.......|
00000ac0: 1b 0b 17 23 11 1c 1b 12 07 0a 1b 0b 11 1e 07 03 |...#............|
00000ad0: 12 45 07 0a 1b 1e 11 01 23 07 07 0a 1b 12 11 01 |.E......#.......|
00000ae0: 19 3f 11 2e 1b 0e 11 24 1b 0c 26 6b 1b 0c 1b 18 |.?.....$..&k....|
00000af0: 1b 01 12 21 00 04 08 07 11 0c 26 0c 11 1c 1b 1e |...!......&.....|
00000b00: 11 1c 1b 1d 17 2f 11 1c 25 26 07 03 07 09 17 53 |...../..%&.....S|
00000b10: 11 0c 1b 1a 07 01 00 0c 43 06 01 00 00 03 00 03 |........C.......|
00000b20: 01 00 23 03 c0 04 00 00 00 d6 03 00 01 00 c2 04 |..#.............|
00000b30: 00 02 00 ce 03 03 00 b7 cb df 42 eb 00 00 00 cc |..........B.....|
00000b40: b7 cd c9 c8 eb a5 ec 11 c7 c8 c9 48 42 0d 01 00 |...........HB...|
00000b50: 00 eb 9f cb 95 02 ee eb c7 28 c8 03 23 9c 01 21 |.........(..#..!|
00000b60: 0e 1f 07 1c 2b 15 07 08 07 0c 07 0f 12 1b 07 14 |....+...........|
00000b70: 07 0e 07 01 07 06 1b 16 07 2d 0b 32 19 39 07 0d |.........-.2.9..|
00000b80: 00 0c 43 06 01 00 01 02 01 05 00 00 3c 03 c4 04 |..C.........<...|
00000b90: 00 01 00 c6 04 00 00 00 c2 04 00 01 00 b7 cb b7 |................|
00000ba0: cc c8 d3 eb a5 ec 18 c7 39 a5 00 00 00 43 23 01 |........9....C#.|
00000bb0: 00 00 d3 c8 48 24 01 00 9f cb 95 01 ee e4 39 a5 |....H$........9.|
00000bc0: 00 00 00 43 24 01 00 00 39 a5 00 00 00 42 25 01 |...C$...9....B%.|
00000bd0: 00 00 c7 d3 eb 9d 25 02 00 c8 03 2f a5 01 1f 18 |......%..../....|
00000be0: 15 07 08 07 0e 07 11 12 1b 07 0e 1b 08 1b 0a 07 |................|
00000bf0: 10 07 01 07 0f 11 15 0b 3a 19 3b 1b 08 1b 0a 1b |........:.;.....|
00000c00: 08 1b 08 07 0c 07 0e 07 11 07 37 00 0c 43 06 01 |..........7..C..|
00000c10: 00 01 02 01 05 00 00 41 03 cc 04 00 01 00 c6 04 |.......A........|
00000c20: 00 00 00 c2 04 00 01 00 b7 cb b7 cc c8 d3 eb a5 |................|
00000c30: ec 1d c7 39 a5 00 00 00 43 23 01 00 00 d3 c8 48 |...9....C#.....H|
00000c40: 42 0a 01 00 00 24 01 00 9f cb 95 01 ee df 39 a5 |B....$........9.|
00000c50: 00 00 00 43 24 01 00 00 39 a5 00 00 00 42 25 01 |...C$...9....B%.|
00000c60: 00 00 c7 d3 eb 9d 25 02 00 c8 03 31 ad 01 23 18 |......%....1..#.|
00000c70: 1d 07 08 07 18 07 1b 12 1b 07 0e 1b 08 1b 0a 07 |................|
00000c80: 1a 07 01 07 06 1b 1f 11 15 0b 44 19 45 1b 08 1b |..........D.E...|
00000c90: 0a 1b 08 1b 08 07 0c 07 18 07 1b 07 37 00 0c 43 |............7..C|
00000ca0: 06 01 00 01 03 01 05 00 00 56 04 cc 04 00 01 00 |.........V......|
00000cb0: c6 04 00 00 00 ce 04 00 01 00 c2 04 00 02 00 b7 |................|
00000cc0: cb 09 cc b7 cd c9 d3 eb a5 ec 2b d3 c9 48 42 0b |..........+..HB.|
00000cd0: 01 00 00 b7 ac ec 1b c7 39 a5 00 00 00 43 23 01 |........9....C#.|
00000ce0: 00 00 d3 c9 48 42 0b 01 00 00 24 01 00 9f cb 0a |....HB....$.....|
00000cf0: cc 95 02 ee d1 c8 ec 1c 39 a5 00 00 00 43 24 01 |........9....C$.|
00000d00: 00 00 39 a5 00 00 00 42 25 01 00 00 c7 d3 eb 9d |..9....B%.......|
00000d10: 25 02 00 b7 28 c8 03 45 b5 01 26 23 23 07 08 07 |%...(..E..&##...|
00000d20: 18 07 1b 12 13 07 1a 07 01 07 06 20 12 12 2f 07 |........... ../.|
00000d30: 0e 1b 08 1b 0a 07 1a 07 01 07 06 1b 1f 11 15 0d |................|
00000d40: 07 00 02 05 44 00 04 0c 4b 12 0e 1b 08 1b 0a 1b |....D...K.......|
00000d50: 08 1b 08 07 0c 07 18 07 1b 07 37 19 00 00 0c 43 |..........7....C|
00000d60: 06 01 00 01 00 01 03 00 00 1a 01 84 01 00 01 00 |................|
00000d70: d3 bf 64 a7 ec 0b d3 43 28 01 00 00 b7 25 01 00 |..d....C(....%..|
00000d80: d3 43 29 01 00 00 ba 25 01 00 c8 03 13 c7 01 1d |.C)....%........|
00000d90: 03 29 11 0c 12 02 07 0a 20 17 14 0e 07 0a 20 17 |.)...... ..... .|
00000da0: 00 0c 43 06 01 00 01 01 01 03 00 00 3a 02 c0 04 |..C.........:...|
00000db0: 00 01 00 10 00 01 00 08 cb c7 42 2a 01 00 00 43 |..........B*...C|
00000dc0: 0e 01 00 00 d3 24 01 00 0e c7 42 13 01 00 00 42 |.....$....B....B|
00000dd0: f7 00 00 00 ec 1b c7 42 13 01 00 00 43 f7 00 00 |.......B....C...|
00000de0: 00 d3 42 09 01 00 00 42 38 00 00 00 24 01 00 0e |..B....B8...$...|
00000df0: 29 c8 03 1f d1 01 26 0d 43 07 08 1b 10 1b 0c 07 |).....&.C.......|
00000e00: 01 1c 11 1b 0e 26 15 07 08 1b 0e 1b 18 07 0c 1b |.....&..........|
00000e10: 14 1b 21 00 0c 43 06 01 00 00 07 00 04 01 00 e1 |..!..C..........|
00000e20: 01 07 d6 04 00 00 00 b2 04 00 01 00 b4 04 00 02 |................|
00000e30: 00 d8 04 00 03 00 da 04 00 04 00 dc 04 00 05 00 |................|
00000e40: 10 00 01 00 ce 03 03 00 08 c5 06 df 43 f4 00 00 |............C...|
00000e50: 00 c4 06 42 2a 01 00 00 24 01 00 cb c4 06 42 0c |...B*...$.....B.|
00000e60: 01 00 00 b7 48 c7 9d cc df 42 17 01 00 00 43 0e |....H....B....C.|
00000e70: 01 00 00 c8 24 01 00 0e c4 06 42 13 01 00 00 42 |....$.....B....B|
00000e80: f8 00 00 00 ec 27 df 43 f6 00 00 00 bf 64 c8 9c |.....'.C.....d..|
00000e90: 24 01 00 cd c4 06 42 13 01 00 00 43 f8 00 00 00 |$.....B....C....|
00000ea0: c4 06 42 38 00 00 00 c9 24 02 00 0e c4 06 42 0c |..B8....$.....B.|
00000eb0: 01 00 00 eb b9 ab ec 71 df 43 f5 00 00 00 c4 06 |.......q.C......|
00000ec0: 42 2a 01 00 00 24 01 00 d2 b7 ac ec 5c c4 06 42 |B*...$......\..B|
00000ed0: 0c 01 00 00 b8 48 ca 9d c5 04 df 42 17 01 00 00 |.....H.....B....|
00000ee0: 43 0e 01 00 00 c4 04 24 01 00 0e c4 06 42 13 01 |C......$.....B..|
00000ef0: 00 00 42 f8 00 00 00 ec 30 df 43 f6 00 00 00 bf |..B.....0.C.....|
00000f00: 64 c4 04 9c 24 01 00 c5 05 c4 06 42 13 01 00 00 |d...$......B....|
00000f10: 43 f8 00 00 00 c4 06 42 38 00 00 00 04 2f 01 00 |C......B8..../..|
00000f20: 00 9f c4 05 24 02 00 0e 29 c8 03 77 d8 01 28 12 |....$...)..w..(.|
00000f30: 31 07 1c 25 2e 1b 09 21 35 20 14 07 0c 07 03 0d |1..%...!5 ......|
00000f40: 3b 07 1c 1b 0e 1b 0c 07 01 21 23 1b 0e 26 0a 07 |;........!#..&..|
00000f50: 1c 25 26 07 03 07 09 17 53 0c 08 1b 0e 25 24 1b |.%&.....S....%$.|
00000f60: 0e 07 17 22 27 1b 14 0c 10 12 07 07 1c 25 34 1b |..."'........%4.|
00000f70: 09 12 61 0c 18 1c 16 20 14 07 0c 07 03 12 49 07 |..a.... ......I.|
00000f80: 1c 1b 0e 1b 0c 0c 01 21 23 1b 0e 26 18 07 1c 25 |.......!#..&...%|
00000f90: 26 0c 03 07 09 1c 61 0c 08 1b 0e 25 24 34 0c 07 |&.....a....%$4..|
00000fa0: 1a 0c 2f 00 0c 43 06 01 00 01 01 01 04 01 00 30 |../..C.........0|
00000fb0: 02 a6 04 00 01 00 10 00 01 00 ce 03 03 00 08 cb |................|
00000fc0: df 42 17 01 00 00 43 0e 01 00 00 b8 24 01 00 0e |.B....C.....$...|
00000fd0: d3 42 f8 00 00 00 ec 16 d3 43 f8 00 00 00 c7 42 |.B.......C.....B|
00000fe0: 38 00 00 00 04 30 01 00 00 24 02 00 0e 29 c8 03 |8....0...$...)..|
00000ff0: 17 ec 01 29 0d 49 07 1c 1b 0e 20 0a 17 2b 07 0c |...).I.... ..+..|
00001000: 26 0b 07 0c 20 24 34 09 00 0c 43 06 01 00 01 01 |&... $4...C.....|
00001010: 01 04 00 00 48 02 e2 04 00 01 00 10 00 01 00 08 |....H...........|
00001020: cb c7 42 13 01 00 00 42 fa 00 00 00 ec 17 c7 42 |..B....B.......B|
00001030: 13 01 00 00 43 fa 00 00 00 c7 42 38 00 00 00 d3 |....C.....B8....|
00001040: 24 02 00 0e c7 42 13 01 00 00 42 f7 00 00 00 ec |$....B....B.....|
00001050: 16 c7 42 13 01 00 00 43 f7 00 00 00 c7 42 38 00 |..B....C.....B8.|
00001060: 00 00 24 01 00 0e 29 c8 03 21 f3 01 27 12 35 1b |..$...)..!..'.5.|
00001070: 0e 26 15 07 08 1b 0e 20 22 1b 0e 07 17 1d 25 1b |.&..... ".....%.|
00001080: 0e 26 15 07 08 1b 0e 20 20 1b 09 00 0c 43 06 01 |.&.....  ....C..|
00001090: 00 02 07 02 07 02 01 cb 01 09 92 04 00 01 40 e4 |..............@.|
000010a0: 04 00 01 00 de 03 00 00 00 da 03 00 01 00 dc 03 |................|
000010b0: 00 02 40 e6 04 00 03 00 e8 04 00 04 00 ea 04 00 |..@.............|
000010c0: 05 00 10 00 01 00 ce 03 03 00 d0 03 02 00 08 c5 |................|
000010d0: 06 c2 00 ce df 42 ef 00 00 00 cf 42 ed 00 00 00 |.....B.....B....|
000010e0: 39 47 00 00 00 ae ec 09 c7 42 ed 00 00 00 ee 07 |9G.......B......|
000010f0: d3 42 ed 00 00 00 cc c7 42 ee 00 00 00 39 47 00 |.B......B....9G.|
00001100: 00 00 ae ec 09 c7 42 ee 00 00 00 ee 07 d3 42 ee |......B.......B.|
00001110: 00 00 00 cd c8 98 ec 14 d4 07 ab ec 0f 0b b7 4e |...............N|
00001120: 36 01 00 00 b7 4e 37 01 00 00 d8 d4 07 ab ec 13 |6....N7.........|
00001130: ca 07 f1 0e 0b b7 4e 36 01 00 00 b7 4e 37 01 00 |......N6....N7..|
00001140: 00 28 ca d4 f1 0e d4 42 36 01 00 00 d3 42 06 01 |.(.....B6....B..|
00001150: 00 00 a5 ec 03 d4 28 d4 42 37 01 00 00 c0 e8 03 |......(.B7......|
00001160: 9c d4 42 36 01 00 00 9d c5 04 d3 42 05 01 00 00 |..B6.......B....|
00001170: 07 ac ec 0c d3 43 05 01 00 00 24 00 00 ee 02 b7 |.....C....$.....|
00001180: c5 05 c4 06 43 f7 00 00 00 e0 11 d3 c4 04 c4 05 |....C...........|
00001190: 21 03 00 24 01 00 0e 07 28 c8 03 79 fd 01 2e 21 |!..$....(..y...!|
000011a0: 39 07 1c 1c 17 07 0c 1b 1c 1b 07 12 31 07 0c 26 |9...........1..&|
000011b0: 0b 07 12 21 0e 07 0c 1b 2a 1b 07 12 4d 07 0c 26 |...!....*...M..&|
000011c0: 0b 07 12 00 06 22 13 16 18 0c 0a 12 23 4a 00 0c |....."......#J..|
000011d0: 0a 12 09 0c 0e 4e 0d 0a 00 07 10 07 01 0e 05 07 |.....N..........|
000011e0: 08 1b 10 07 12 1b 15 12 05 07 0d 08 10 07 08 2a |...............*|
000011f0: 12 07 14 07 08 1b 0b 12 2b 07 12 20 16 11 16 07 |........+.. ....|
00001200: 12 1b 14 2b 79 0c 08 1b 20 0c 20 07 16 0c 0c 0c |...+y... . .....|
00001210: 23 11 27 1c 1d 00 0c 43 06 01 e6 04 01 03 01 03 |#.'....C........|
00001220: 02 00 5c 04 e4 04 00 01 00 ee 04 00 00 00 f0 04 |..\.............|
00001230: 00 01 00 c2 04 00 02 00 dc 03 02 01 92 04 00 03 |................|
00001240: b7 cb 39 a7 00 00 00 11 21 00 00 cc b7 cd df ec |..9.....!.......|
00001250: 0b c9 e0 42 01 01 00 00 a5 ee 06 c7 c0 e8 03 a5 |...B............|
00001260: ec 1b e0 43 02 01 00 00 24 00 00 0e 39 a7 00 00 |...C....$...9...|
00001270: 00 11 21 00 00 c8 a0 cb 95 02 ee d3 d3 07 ac ec |..!.............|
00001280: 1b d3 43 36 01 00 00 c9 9f 44 36 01 00 00 d3 43 |..C6.....D6....C|
00001290: 37 01 00 00 c7 9f 44 37 01 00 00 29 c8 03 3d 85 |7.....D7...)..=.|
000012a0: 02 04 0e 28 20 08 23 05 12 19 07 08 07 12 1b 15 |...( .#.........|
000012b0: 11 4c 16 10 12 5f 07 12 1b 08 17 02 20 08 11 0a |.L..._...... ...|
000012c0: 07 03 00 02 03 4a 00 04 08 73 0c 0a 12 09 07 08 |.....J...s......|
000012d0: 1b 12 07 05 21 13 07 08 1b 18 07 05 00 0c 43 06 |....!.........C.|
000012e0: 01 00 01 08 01 02 01 03 3e 09 a6 04 00 01 00 60 |........>......`|
000012f0: 00 00 40 b2 01 00 01 40 b0 04 00 02 40 e4 04 00 |..@....@....@...|
00001300: 03 40 f2 04 00 04 40 f4 04 00 05 40 f6 04 00 06 |.@....@....@....|
00001310: 40 10 00 01 00 ce 03 03 00 08 c5 07 c2 00 c5 04 |@...............|
00001320: c2 01 c5 05 c2 02 c5 06 df 43 f0 00 00 00 24 00 |.........C....$.|
00001330: 00 0e c4 07 26 00 00 44 2a 01 00 00 c4 07 d3 44 |....&..D*......D|
00001340: 13 01 00 00 c4 07 42 0d 01 00 00 eb cb b7 cc c4 |......B.........|
00001350: 07 cd c4 04 23 00 00 c8 03 1b ab 02 23 4e 3d 07 |....#.......#N=.|
00001360: 1c 1b 12 17 2d 0c 08 2b 07 0c 1c 2b 06 1b 16 00 |....-..+...+....|
00001370: 07 56 29 0c 0d 00 0c 43 06 01 f2 04 00 01 00 04 |.V)....C........|
00001380: 04 00 41 01 f8 04 05 00 03 b2 01 01 01 60 00 01 |..A..........`..|
00001390: b0 04 02 01 f4 04 05 01 df e0 a5 ec 31 6f 18 00 |............1o..|
000013a0: 00 00 e1 42 0d 01 00 00 df 48 43 07 01 00 00 24 |...B.....HC....$|
000013b0: 00 00 0e 0e ee 16 cb 6f 12 00 00 00 e1 43 fa 00 |.......o.....C..|
000013c0: 00 00 c7 24 01 00 0e 07 72 28 30 e2 28 e1 43 f8 |...$....r(0.(.C.|
000013d0: 00 00 00 24 00 00 0e 07 28 c8 03 2b b6 02 04 03 |...$....(..+....|
000013e0: 10 07 10 07 03 2c 03 07 0a 1b 18 07 01 07 0e 1b |.....,..........|
000013f0: 0c 46 39 07 0a 1b 1a 07 01 1c 21 13 06 07 0d 09 |.F9.......!.....|
00001400: 07 07 0a 1b 1a 1c 23 00 0c 43 06 01 f4 04 00 01 |......#..C......|
00001410: 00 05 05 00 3c 01 f8 04 03 00 03 e4 04 03 01 b0 |....<...........|
00001420: 04 02 01 b2 01 01 01 f6 04 06 01 f4 04 05 01 6f |...............o|
00001430: 1a 00 00 00 e0 43 fb 00 00 00 e0 42 0d 01 00 00 |.....C.....B....|
00001440: e1 48 df 24 02 00 e3 0e ee 16 cb 6f 12 00 00 00 |.H.$.......o....|
00001450: e0 43 fa 00 00 00 c7 24 01 00 0e 07 72 28 30 df |.C.....$....r(0.|
00001460: 07 ab ec 03 e2 28 60 04 00 f0 28 c8 03 29 c4 02 |.....(`...(..)..|
00001470: 04 1d 1e 07 0a 1b 28 07 0a 1b 18 07 01 07 12 07 |......(.........|
00001480: 33 46 3d 07 0a 1b 1a 07 01 1c 21 14 08 0c 0a 11 |3F=.......!.....|
00001490: 16 0c 24 11 20 07 73 00 0c 43 06 01 f6 04 00 01 |..$. .s..C......|
000014a0: 00 04 03 00 32 01 f8 04 03 00 03 b0 04 02 01 b2 |....2...........|
000014b0: 01 01 01 f2 04 04 01 6f 1a 00 00 00 df 42 0d 01 |.......o.....B..|
000014c0: 00 00 e0 93 e4 48 43 08 01 00 00 24 00 00 0e 0e |.....HC....$....|
000014d0: ee 16 cb 6f 12 00 00 00 df 43 fa 00 00 00 c7 24 |...o.....C.....$|
000014e0: 01 00 0e 07 72 28 30 e1 28 c8 03 1f cf 02 04 1d |....r(0.(.......|
000014f0: 10 07 0a 1b 18 07 0a 0c 0b 07 12 1b 12 46 43 07 |.............FC.|
00001500: 0a 1b 1a 07 01 1c 21 13 06 07 0d 00             |......!.....|
```