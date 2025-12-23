__tests__/fixtures/destructuring-nested.js:1:0: function: <eval>
  locals:
    0: var <ret>
  stack_size: 5
  opcodes (162 bytes):
   0 check_define_var  atom=471 (obj) flags=128
   6 check_define_var  atom=472 (x) flags=128
  12 check_define_var  atom=473 (y) flags=128
  18 check_define_var  atom=474 (z) flags=128
  24 define_var  atom=471 (obj) flags=128
  30 define_var  atom=472 (x) flags=128
  36 define_var  atom=473 (y) flags=128
  42 define_var  atom=474 (z) flags=128
  48 object
  49 push_1
  50 define_field  atom=475 (a)
  55 push_2
  56 define_field  atom=476 (b)
  61 get_var  atom=71 (undefined)
  66 define_field  atom=477 (c)
  71 put_var_init  atom=471 (obj)
  76 undefined
  77 dup
  78 is_undefined
  79 if_true8  offset=44
  81 to_object
  82 dup
  83 get_field  atom=475 (a)
  88 put_var_init  atom=472 (x)
  93 dup
  94 get_field  atom=476 (b)
  99 put_var_init  atom=473 (y)
 104 dup
 105 get_field  atom=477 (c)
 110 dup
 111 is_undefined
 112 if_false8  offset=3
 114 drop
 115 push_3
 116 put_var_init  atom=474 (z)
 121 drop
 122 goto8  offset=9
 124 drop
 125 get_var  atom=471 (obj)
 130 goto8  offset=-50
 132 get_var  atom=478 (console)
 137 get_field2  atom=479 (log)
 142 get_var  atom=472 (x)
 147 get_var  atom=473 (y)
 152 get_var  atom=474 (z)
 157 call_method
 160 set_loc0
 161 return
TTT