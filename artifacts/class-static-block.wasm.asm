__tests__/fixtures/class-static-block.js:1:0: function: <eval>
  locals:
    0: var <ret>
    1: const Counter [level:2 next:-1]
    2: const #count [level:3 next:1]
    3: const #bump [level:3 next:2]
    4: const <class_fields_init> [level:3 next:3]
  stack_size: 4
  opcodes (177 bytes):
   0 check_define_var  atom=471 (Counter) flags=128
   6 define_var  atom=471 (Counter) flags=130
  12 set_loc_uninitialized
  15 undefined
  16 set_loc_uninitialized
  19 set_loc_uninitialized
  22 set_loc_uninitialized
  25 push_const8
  27 define_class  atom=471 (Counter) flags=0
  33 swap
  34 private_symbol  atom=472 (#count)
  39 put_loc2
  40 swap
  41 swap
  42 swap
  43 swap
  44 fclosure8
  46 set_home_object
  47 set_name  atom=473 (#bump)
  52 put_loc3
  53 swap
  54 swap
  55 fclosure8
  57 define_method  atom=474 (inc) flags=0
  63 swap
  64 swap
  65 fclosure8
  67 define_method  atom=66 (value) flags=1
  73 swap
  74 undefined
  75 put_loc8
  77 drop
  78 dup
  79 dup
  80 add_brand
  81 set_loc1
  82 dup
  83 fclosure8
  85 set_home_object
  86 call_method
  89 drop
  90 close_loc
  93 close_loc
  96 put_var_init  atom=471 (Counter)
 101 get_var  atom=475 (console)
 106 get_field2  atom=476 (log)
 111 get_var  atom=471 (Counter)
 116 get_field  atom=477 (label)
 121 call_method
 124 put_loc0
 125 get_var  atom=475 (console)
 130 get_field2  atom=476 (log)
 135 get_var  atom=471 (Counter)
 140 get_field2  atom=474 (inc)
 145 call_method
 148 call_method
 151 put_loc0
 152 get_var  atom=475 (console)
 157 get_field2  atom=476 (log)
 162 get_var  atom=471 (Counter)
 167 get_field  atom=66 (value)
 172 call_method
 175 set_loc0
 176 return
TTT