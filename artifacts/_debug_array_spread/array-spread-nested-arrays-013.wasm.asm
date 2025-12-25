__tests__/fixtures/array-spread-nested-arrays-013.js:1:0: function: <eval>
  locals:
    0: var <ret>
  stack_size: 6
  opcodes (98 bytes):
   0 check_define_var  atom=471 (a) flags=128
   6 check_define_var  atom=472 (b) flags=128
  12 define_var  atom=471 (a) flags=128
  18 define_var  atom=472 (b) flags=128
  24 push_1
  25 push_2
  26 array_from
  29 put_var_init  atom=471 (a)
  34 push_0
  35 array_from
  38 push_1
  39 get_var  atom=471 (a)
  44 append
  45 push_i8  13
  47 push_7
  48 mod
  49 define_array_el
  50 inc
  51 push_3
  52 push_4
  53 array_from
  56 append
  57 drop
  58 put_var_init  atom=472 (b)
  63 get_var  atom=473 (console)
  68 get_field2  atom=474 (log)
  73 get_var  atom=472 (b)
  78 get_length
  79 get_var  atom=472 (b)
  84 push_2
  85 get_array_el
  86 get_var  atom=472 (b)
  91 push_3
  92 get_array_el
  93 call_method
  96 set_loc0
  97 return
TTT