Module bytecode version: 5
Atom count: 14

=== Outer Function ===
bytecodeLen=16 stackSize=1 varCount=1 argCount=0
     0  check_define_var         228                 pop=0 push=0      40 e4 00 00 00 40
     6  fclosure8                0                   pop=0 push=1      c2 00
     8  define_func              228                 pop=1 push=0      41 e4 00 00 00 00
    14  get_loc0                 loc=0               pop=0 push=1      c7
    15  return                                       pop=1 push=0      28

=== Inner Function #0 ===
bytecodeLen=272 stackSize=10 varCount=11 argCount=1
     0  push_1                   1                   pop=0 push=1      b8
     1  push_2                   2                   pop=0 push=1      b9
     2  push_3                   3                   pop=0 push=1      ba
     3  push_4                   4                   pop=0 push=1      bb
     4  push_5                   5                   pop=0 push=1      bc
     5  array_from               5                   pop=0 push=1      26 05 00
     8  put_loc8                 5                   pop=1 push=0      c5 05
    10  object                                       pop=0 push=1      0b
    11  push_1                   1                   pop=0 push=1      b8
    12  define_field             238                 pop=2 push=1      4e ee 00 00 00
    17  push_2                   2                   pop=0 push=1      b9
    18  define_field             239                 pop=2 push=1      4e ef 00 00 00
    23  push_3                   3                   pop=0 push=1      ba
    24  define_field             240                 pop=2 push=1      4e f0 00 00 00
    29  push_4                   4                   pop=0 push=1      bb
    30  define_field             241                 pop=2 push=1      4e f1 00 00 00
    35  put_loc8                 6                   pop=1 push=0      c5 06
    37  push_0                   0                   pop=0 push=1      b7
    38  put_loc0                 loc=0               pop=1 push=0      cb
    39  get_loc0                 loc=0               pop=0 push=1      c7
    40  get_arg0                 arg=0               pop=0 push=1      d3
    41  lt                                           pop=2 push=1      a5
    42  if_false                 224                 pop=1 push=0      6c e0 00 00 00
    47  goto8                    65                  pop=0 push=0      ee 41
    49  dup                                          pop=1 push=2      11
    50  for_of_start                                 pop=1 push=3      7f
    51  make_loc_ref             232                 pop=0 push=2      7a e8 00 00 00 01 00
    58  for_of_next              2                   pop=3 push=5      82 02
    60  drop                                         pop=1 push=0      0e
    61  put_ref_value                                pop=3 push=0      3e
    62  make_loc_ref             233                 pop=0 push=2      7a e9 00 00 00 02 00
    69  for_of_next              2                   pop=3 push=5      82 02
    71  drop                                         pop=1 push=0      0e
    72  put_ref_value                                pop=3 push=0      3e
    73  for_of_next              0                   pop=3 push=5      82 00
    75  drop                                         pop=1 push=0      0e
    76  drop                                         pop=1 push=0      0e
    77  make_loc_ref             234                 pop=0 push=2      7a ea 00 00 00 03 00
    84  for_of_next              2                   pop=3 push=5      82 02
    86  drop                                         pop=1 push=0      0e
    87  put_ref_value                                pop=3 push=0      3e
    88  make_loc_ref             235                 pop=0 push=2      7a eb 00 00 00 04 00
    95  array_from               0                   pop=0 push=1      26 00 00
    98  push_0                   0                   pop=0 push=1      b7
    99  for_of_next              4                   pop=3 push=5      82 04
   101  if_true8                 5                   pop=1 push=0      ed 05
   103  define_array_el                              pop=3 push=2      53
   104  inc                                          pop=1 push=1      91
   105  goto8                    249                 pop=0 push=0      ee f9
   107  drop                                         pop=1 push=0      0e
   108  drop                                         pop=1 push=0      0e
   109  put_ref_value                                pop=3 push=0      3e
   110  iterator_close                               pop=3 push=0      86
   111  goto8                    5                   pop=0 push=0      ee 05
   113  get_loc8                 5                   pop=0 push=1      c4 05
   115  goto8                    189                 pop=0 push=0      ee bd
   117  drop                                         pop=1 push=0      0e
   118  goto8                    66                  pop=0 push=0      ee 42
   120  dup                                          pop=1 push=2      11
   121  to_object                                    pop=1 push=1      73
   122  dup                                          pop=1 push=2      11
   123  make_loc_ref             238                 pop=0 push=2      7a ee 00 00 00 07 00
   130  rot3l                                        pop=3 push=3      1d
   131  get_field                238                 pop=1 push=1      42 ee 00 00 00
   136  put_ref_value                                pop=3 push=0      3e
   137  dup                                          pop=1 push=2      11
   138  make_loc_ref             239                 pop=0 push=2      7a ef 00 00 00 08 00
   145  rot3l                                        pop=3 push=3      1d
   146  get_field                239                 pop=1 push=1      42 ef 00 00 00
   151  put_ref_value                                pop=3 push=0      3e
   152  dup                                          pop=1 push=2      11
   153  make_loc_ref             240                 pop=0 push=2      7a f0 00 00 00 09 00
   160  rot3l                                        pop=3 push=3      1d
   161  get_field                240                 pop=1 push=1      42 f0 00 00 00
   166  put_ref_value                                pop=3 push=0      3e
   167  dup                                          pop=1 push=2      11
   168  make_loc_ref             241                 pop=0 push=2      7a f1 00 00 00 0a 00
   175  rot3l                                        pop=3 push=3      1d
   176  get_field                241                 pop=1 push=1      42 f1 00 00 00
   181  put_ref_value                                pop=3 push=0      3e
   182  drop                                         pop=1 push=0      0e
   183  goto8                    5                   pop=0 push=0      ee 05
   185  get_loc8                 6                   pop=0 push=1      c4 06
   187  goto8                    188                 pop=0 push=0      ee bc
   189  drop                                         pop=1 push=0      0e
   190  goto8                    66                  pop=0 push=0      ee 42
   192  dup                                          pop=1 push=2      11
   193  to_object                                    pop=1 push=1      73
   194  dup                                          pop=1 push=2      11
   195  make_loc_ref             238                 pop=0 push=2      7a ee 00 00 00 07 00
   202  rot3l                                        pop=3 push=3      1d
   203  get_field                238                 pop=1 push=1      42 ee 00 00 00
   208  put_ref_value                                pop=3 push=0      3e
   209  dup                                          pop=1 push=2      11
   210  make_loc_ref             239                 pop=0 push=2      7a ef 00 00 00 08 00
   217  rot3l                                        pop=3 push=3      1d
   218  get_field                239                 pop=1 push=1      42 ef 00 00 00
   223  put_ref_value                                pop=3 push=0      3e
   224  dup                                          pop=1 push=2      11
   225  make_loc_ref             240                 pop=0 push=2      7a f0 00 00 00 09 00
   232  rot3l                                        pop=3 push=3      1d
   233  get_field                240                 pop=1 push=1      42 f0 00 00 00
   238  put_ref_value                                pop=3 push=0      3e
   239  dup                                          pop=1 push=2      11
   240  make_loc_ref             241                 pop=0 push=2      7a f1 00 00 00 0a 00
   247  rot3l                                        pop=3 push=3      1d
   248  get_field                241                 pop=1 push=1      42 f1 00 00 00
   253  put_ref_value                                pop=3 push=0      3e
   254  drop                                         pop=1 push=0      0e
   255  goto8                    5                   pop=0 push=0      ee 05
   257  get_loc8                 6                   pop=0 push=1      c4 06
   259  goto8                    188                 pop=0 push=0      ee bc
   261  drop                                         pop=1 push=0      0e
   262  inc_loc                  0                   pop=0 push=0      95 00
   264  goto16                   65310               pop=0 push=0      ef 1e ff
   267  get_arg0                 arg=0               pop=0 push=1      d3
   268  push_i8                  12                  pop=0 push=1      bf 0c
   270  mul                                          pop=2 push=1      9c
   271  return                                       pop=1 push=0      28