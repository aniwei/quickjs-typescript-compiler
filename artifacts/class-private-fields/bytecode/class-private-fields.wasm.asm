__tests__/fixtures/class-private-fields.js:1:0: function: <eval>
  locals:
    0: var <ret>
    1: const Counter [level:2 next:-1]
    2: const #count [level:3 next:1]
    3: const <class_fields_init> [level:3 next:2]
  stack_size: 3
  opcodes (134 bytes):
   0 check_define_var  atom=471 (Counter) flags=128
   6 check_define_var  atom=473 (c) flags=128
  12 define_var  atom=471 (Counter) flags=130
  18 define_var  atom=473 (c) flags=128
  24 set_loc_uninitialized
  27 undefined
  28 set_loc_uninitialized
  31 set_loc_uninitialized
  34 push_const8
  36 define_class  atom=471 (Counter) flags=0
  42 private_symbol  atom=472 (#count)
  47 put_loc2
  48 fclosure8
  50 define_method  atom=474 (increment) flags=0
  56 fclosure8
  58 define_method  atom=66 (value) flags=1
  64 fclosure8
  66 set_home_object
  67 put_loc3
  68 drop
  69 set_loc1
  70 close_loc
  73 close_loc
  76 put_var_init  atom=471 (Counter)
  81 get_var  atom=471 (Counter)
  86 dup
  87 call_constructor
  90 put_var_init  atom=473 (c)
  95 get_var  atom=473 (c)
 100 get_field2  atom=474 (increment)
 105 call_method
 108 put_loc0
 109 get_var  atom=475 (console)
 114 get_field2  atom=476 (log)
 119 get_var  atom=473 (c)
 124 get_field  atom=66 (value)
 129 call_method
 132 set_loc0
 133 return
TTT