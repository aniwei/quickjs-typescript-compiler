Module bytecode version: 5
Atom count: 21

=== Outer Function ===
bytecodeLen=62 stackSize=3 varCount=2 argCount=0
     0  check_define_var         229                 pop=0 push=0      40 e5 00 00 00 40
     6  check_define_var         230                 pop=0 push=0      40 e6 00 00 00 40
    12  fclosure8                0                   pop=0 push=1      c2 00
    14  define_func              229                 pop=1 push=0      41 e5 00 00 00 00
    20  fclosure8                1                   pop=0 push=1      c2 01
    22  define_func              230                 pop=1 push=0      41 e6 00 00 00 00
    28  undefined                                    pop=0 push=1      06
    29  put_loc0                 loc=0               pop=1 push=0      cb
    30  catch                    19                  pop=0 push=1      6f 13 00 00 00
    35  get_var                  231                 pop=0 push=1      39 e7 00 00 00
    40  push_atom_value          232                 pop=0 push=1      04 e8 00 00 00
    45  call1                    npop=1              pop=1 push=1      f1
    46  put_loc0                 loc=0               pop=1 push=0      cb
    47  drop                                         pop=1 push=0      0e
    48  goto8                    11                  pop=0 push=0      ee 0b
    50  put_loc1                 loc=1               pop=1 push=0      cc
    51  catch                    7                   pop=0 push=1      6f 07 00 00 00
    56  drop                                         pop=1 push=0      0e
    57  goto8                    2                   pop=0 push=0      ee 02
    59  throw                                        pop=1 push=0      30
    60  get_loc0                 loc=0               pop=0 push=1      c7
    61  return                                       pop=1 push=0      28

=== Inner Function #0 ===
bytecodeLen=121 stackSize=4 varCount=1 argCount=3
     0  special_object           1                   pop=0 push=1      0c 01
     2  put_loc0                 loc=0               pop=1 push=0      cb
     3  get_loc0                 loc=0               pop=0 push=1      c7
     4  get_length                                   pop=1 push=1      eb
     5  push_1                   1                   pop=0 push=1      b8
     6  eq                                           pop=2 push=1      ab
     7  if_false8                3                   pop=1 push=0      ec 03
     9  push_true                                    pop=0 push=1      0a
    10  put_arg1                 arg=1               pop=1 push=0      d8
    11  get_arg0                 arg=0               pop=0 push=1      d3
    12  get_arg1                 arg=1               pop=0 push=1      d4
    13  strict_eq                                    pop=2 push=1      ad
    14  if_false8                2                   pop=1 push=0      ec 02
    16  return_undef                                 pop=0 push=0      29
    17  get_arg0                 arg=0               pop=0 push=1      d3
    18  is_null                                      pop=1 push=1      f5
    19  if_true8                 47                  pop=1 push=0      ed 2f
    21  get_arg1                 arg=1               pop=0 push=1      d4
    22  is_null                                      pop=1 push=1      f5
    23  if_true8                 43                  pop=1 push=0      ed 2b
    25  get_arg0                 arg=0               pop=0 push=1      d3
    26  typeof                                       pop=1 push=1      99
    27  push_atom_value          75                  pop=0 push=1      04 4b 00 00 00
    32  eq                                           pop=2 push=1      ab
    33  if_false8                33                  pop=1 push=0      ec 21
    35  get_arg1                 arg=1               pop=0 push=1      d4
    36  typeof                                       pop=1 push=1      99
    37  push_atom_value          75                  pop=0 push=1      04 4b 00 00 00
    42  eq                                           pop=2 push=1      ab
    43  if_false8                23                  pop=1 push=0      ec 17
    45  get_arg0                 arg=0               pop=0 push=1      d3
    46  get_field2               57                  pop=1 push=2      43 39 00 00 00
    51  call_method              0                   pop=2 push=1      24 00 00
    54  get_arg1                 arg=1               pop=0 push=1      d4
    55  get_field2               57                  pop=1 push=2      43 39 00 00 00
    60  call_method              0                   pop=2 push=1      24 00 00
    63  strict_eq                                    pop=2 push=1      ad
    64  if_false8                2                   pop=1 push=0      ec 02
    66  return_undef                                 pop=0 push=0      29
    67  get_var                  159                 pop=0 push=1      39 9f 00 00 00
    72  push_atom_value          236                 pop=0 push=1      04 ec 00 00 00
    77  get_arg0                 arg=0               pop=0 push=1      d3
    78  add                                          pop=2 push=1      9f
    79  push_atom_value          237                 pop=0 push=1      04 ed 00 00 00
    84  add                                          pop=2 push=1      9f
    85  push_atom_value          238                 pop=0 push=1      04 ee 00 00 00
    90  add                                          pop=2 push=1      9f
    91  get_arg1                 arg=1               pop=0 push=1      d4
    92  add                                          pop=2 push=1      9f
    93  push_atom_value          237                 pop=0 push=1      04 ed 00 00 00
    98  add                                          pop=2 push=1      9f
    99  get_arg2                 arg=2               pop=0 push=1      d5
   100  if_false8                16                  pop=1 push=0      ec 10
   102  push_atom_value          239                 pop=0 push=1      04 ef 00 00 00
   107  get_arg2                 arg=2               pop=0 push=1      d5
   108  add                                          pop=2 push=1      9f
   109  push_atom_value          240                 pop=0 push=1      04 f0 00 00 00
   114  add                                          pop=2 push=1      9f
   115  goto8                    2                   pop=0 push=0      ee 02
   117  push_empty_string                            pop=0 push=1      c3
   118  add                                          pop=2 push=1      9f
   119  call1                    npop=1              pop=1 push=1      f1
   120  throw                                        pop=1 push=0      30

=== Inner Function #1 ===
bytecodeLen=146 stackSize=4 varCount=2 argCount=0
     0  array_from               0                   pop=0 push=1      26 00 00
     3  put_loc1                 loc=1               pop=1 push=0      cc
     4  object                                       pop=0 push=1      0b
     5  push_1                   1                   pop=0 push=1      b8
     6  define_field             243                 pop=2 push=1      4e f3 00 00 00
    11  push_2                   2                   pop=0 push=1      b9
    12  define_field             244                 pop=2 push=1      4e f4 00 00 00
    17  push_3                   3                   pop=0 push=1      ba
    18  define_field             245                 pop=2 push=1      4e f5 00 00 00
    23  for_in_start                                 pop=1 push=1      7e
    24  goto8                    21                  pop=0 push=0      ee 15
    26  set_loc0                 loc=0               pop=1 push=1      cf
    27  push_atom_value          244                 pop=0 push=1      04 f4 00 00 00
    32  strict_eq                                    pop=2 push=1      ad
    33  if_true8                 12                  pop=1 push=0      ed 0c
    35  get_loc1                 loc=1               pop=0 push=1      c8
    36  get_field2               246                 pop=1 push=2      43 f6 00 00 00
    41  get_loc0                 loc=0               pop=0 push=1      c7
    42  call_method              1                   pop=2 push=1      24 01 00
    45  drop                                         pop=1 push=0      0e
    46  for_in_next                                  pop=1 push=3      81
    47  if_false8                234                 pop=1 push=0      ec ea
    49  drop                                         pop=1 push=0      0e
    50  drop                                         pop=1 push=0      0e
    51  get_var                  229                 pop=0 push=1      39 e5 00 00 00
    56  get_loc1                 loc=1               pop=0 push=1      c8
    57  get_field2               57                  pop=1 push=2      43 39 00 00 00
    62  call_method              0                   pop=2 push=1      24 00 00
    65  push_atom_value          247                 pop=0 push=1      04 f7 00 00 00
    70  eq                                           pop=2 push=1      ab
    71  call1                    npop=1              pop=1 push=1      f1
    72  drop                                         pop=1 push=0      0e
    73  array_from               0                   pop=0 push=1      26 00 00
    76  put_loc1                 loc=1               pop=1 push=0      cc
    77  object                                       pop=0 push=1      0b
    78  push_1                   1                   pop=0 push=1      b8
    79  define_field             243                 pop=2 push=1      4e f3 00 00 00
    84  push_2                   2                   pop=0 push=1      b9
    85  define_field             244                 pop=2 push=1      4e f4 00 00 00
    90  push_3                   3                   pop=0 push=1      ba
    91  define_field             245                 pop=2 push=1      4e f5 00 00 00
    96  for_in_start                                 pop=1 push=1      7e
    97  goto8                    21                  pop=0 push=0      ee 15
    99  set_loc0                 loc=0               pop=1 push=1      cf
   100  push_atom_value          245                 pop=0 push=1      04 f5 00 00 00
   105  strict_eq                                    pop=2 push=1      ad
   106  if_true8                 16                  pop=1 push=0      ed 10
   108  get_loc1                 loc=1               pop=0 push=1      c8
   109  get_field2               246                 pop=1 push=2      43 f6 00 00 00
   114  get_loc0                 loc=0               pop=0 push=1      c7
   115  call_method              1                   pop=2 push=1      24 01 00
   118  drop                                         pop=1 push=0      0e
   119  for_in_next                                  pop=1 push=3      81
   120  if_false8                234                 pop=1 push=0      ec ea
   122  drop                                         pop=1 push=0      0e
   123  drop                                         pop=1 push=0      0e
   124  get_var                  229                 pop=0 push=1      39 e5 00 00 00
   129  get_loc1                 loc=1               pop=0 push=1      c8
   130  get_field2               57                  pop=1 push=2      43 39 00 00 00
   135  call_method              0                   pop=2 push=1      24 00 00
   138  push_atom_value          248                 pop=0 push=1      04 f8 00 00 00
   143  eq                                           pop=2 push=1      ab
   144  call1                    npop=1              pop=1 push=1      f1
   145  return_undef                                 pop=0 push=0      29