# Mismatch Report

- Generated: 2025-12-31T18:18:20.114Z
- Artifacts: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/artifacts
- Mismatches: 31 / 276
- Groups: 4

## Groups (by first divergence QuickJS location)

### UNKNOWN@unknown (12)

- box2d — Δ320
- bundle — Δ-88
- crypto — Δ197
- earley-boyer — Δ115
- gbemu-part1 — Δ31
- gbemu-part2 — Δ342
- mandreel — Δ132
- pdfjs — Δ1873
- regexp — Δ0
- test_bignum — Δ9227
- test_ic_atom_free — Δ1296
- typescript-compiler — Δ-1644

### EMIT@parser.c:1777 (10)
- QuickJS: parser.c:1777
- Category: EMIT

- base — Δ0 — 4255 trace diff
- code-load — Δ105735 — 1131 trace diff
- deltablue — Δ11706 — 8700 trace diff
- navier-stokes — Δ7895 — 7888 trace diff
- raytrace — Δ16097 — 11864 trace diff
- repl — Δ19505 — 16645 trace diff
- splay — Δ4156 — 3165 trace diff
- test_bigint — Δ7161 — 3744 trace diff
- test_builtin — Δ76939 — 19112 trace diff
- typescript-input — Δ1243705 — 2 trace diff

### EMIT@parser.c:1799 (8)
- QuickJS: parser.c:1799
- Category: EMIT

- microbench — Δ13208 — 14958 trace diff
- test_argument_scope — Δ3656 — 1889 trace diff
- test_bjson — Δ3000 — 3049 trace diff
- test_for_in2 — Δ732 — 591 trace diff
- test_language — Δ13889 — 9614 trace diff
- test_line_column_num — Δ4440 — 2175 trace diff
- test_loop — Δ4654 — 4960 trace diff
- test_try_catch7 — Δ649 — 496 trace diff

### EMIT@parser.c:1807 (1)
- QuickJS: parser.c:1807
- Category: EMIT

- run — Δ1302 — 467 trace diff

